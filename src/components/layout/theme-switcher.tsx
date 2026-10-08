"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Cube, Drop, Fire, Shapes, Square, VinylRecord, type Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";
import { THEME_STORAGE_KEY, defaultTheme, isTheme, themeColors, themeSwatches, themes, type Theme } from "@/lib/theme";

const ease = [0.32, 0.72, 0, 1] as const;

const icons: Record<Theme, Icon> = {
  ember: Fire,
  retro: VinylRecord,
  glass: Cube,
  liquid: Drop,
  neobrutal: Square,
  memphis: Shapes,
};

// The source of truth is `<html data-theme>` (set before paint by themeInitScript),
// so the store just reads it and notifies subscribers when we change it.
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getTheme(): Theme {
  const t = document.documentElement.dataset.theme;
  return isTheme(t) ? t : defaultTheme;
}

/** Writes the theme to the DOM only: `<html data-theme>`, the browser chrome colour, and subscribers. */
function paintTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === defaultTheme) delete root.dataset.theme;
  else root.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", themeColors[theme]);
  listeners.forEach((l) => l());
}

function applyTheme(theme: Theme) {
  paintTheme(theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the switch still works for this visit.
  }
}

function savedTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(t) ? t : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

/**
 * Re-applies the saved theme whenever the root layout mounts. Switching language changes the
 * `[lang]` root param, so the root layout remounts, and React 19 strips every attribute it
 * doesn't render from the `<html>` singleton, `data-theme` included. themeInitScript only runs
 * on a full page load, so this covers client-side navigations. A layout effect runs after
 * React's DOM mutations and before paint, so the default theme never flashes.
 */
export function ThemeSync() {
  useLayoutEffect(() => paintTheme(savedTheme()), []);
  return null;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => defaultTheme);
  const reduce = useReducedMotion();

  /** Swaps the theme; where supported, the new one is revealed as a circle growing from `origin`. */
  const setTheme = (next: Theme, origin?: HTMLElement | null) => {
    if (next === getTheme()) return;
    if (reduce || !document.startViewTransition) {
      applyTheme(next);
      return;
    }
    const rect = origin?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(0.32, 0.72, 0, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
  };

  return { theme, setTheme };
}

/** Three overlapping chips previewing a theme's background, accent and text colours. */
function Swatch({ theme }: { theme: Theme }) {
  return (
    <span aria-hidden className="flex shrink-0 -space-x-1.5">
      {themeSwatches[theme].map((c, i) => (
        <span
          key={i}
          className="size-4 rounded-full shadow-[0_0_0_1.5px_var(--color-char),0_0_0_2.5px_color-mix(in_oklab,var(--color-cream)_20%,transparent)]"
          style={{ background: c }}
        />
      ))}
    </span>
  );
}

/** Nav button showing the current theme's icon; opens a list of all themes. */
export function ThemeMenu({ className }: { className?: string }) {
  const { dict } = useI18n();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const CurrentIcon = icons[theme];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn("relative", className)}>
      <button
        ref={trigger}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="theme-menu"
        aria-label={`${dict.theme.label}: ${dict.theme.names[theme]}`}
        title={`${dict.theme.label}: ${dict.theme.names[theme]}`}
        className={cn(
          "group flex size-11 items-center justify-center rounded-pill bg-cream/[0.06] text-cream hairline",
          "transition-[background-color,transform] duration-500 ease-silk hover:bg-cream/[0.12] active:scale-[0.96]",
        )}
      >
        <CurrentIcon size={18} weight="light" className="transition-transform duration-700 ease-silk group-hover:rotate-[-14deg]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="theme-menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            className="glass absolute right-0 top-[calc(100%+0.75rem)] w-60 origin-top-right rounded-menu bg-char/95 p-1.5 inner-glow backdrop-blur-2xl"
          >
            {themes.map((t) => {
              const Icon = icons[t];
              return (
                <li key={t}>
                  <button
                    type="button"
                    aria-pressed={t === theme}
                    onClick={() => {
                      setTheme(t, trigger.current);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-menu-item px-3.5 py-2.5 text-left text-sm transition-colors duration-500 ease-silk",
                      t === theme ? "bg-cream/[0.07] text-cream" : "text-smoke hover:bg-cream/[0.05] hover:text-cream",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={16} weight="light" className="shrink-0" />
                      {dict.theme.names[t]}
                    </span>
                    <span className="flex items-center gap-2">
                      {t === theme && <Check size={14} weight="light" className="text-gold-bright" />}
                      <Swatch theme={t} />
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Labelled row of theme pills for the mobile overlay. */
export function ThemeRow({ className }: { className?: string }) {
  const { dict } = useI18n();
  const { theme, setTheme } = useTheme();
  return (
    <div role="group" aria-label={dict.theme.label} className={className}>
      <ul className="flex flex-wrap gap-2">
        {themes.map((t) => {
          const Icon = icons[t];
          return (
            <li key={t}>
              <button
                type="button"
                aria-pressed={t === theme}
                onClick={(e) => setTheme(t, e.currentTarget)}
                className={cn(
                  "flex items-center gap-2 rounded-pill px-4 py-2 text-sm transition-colors duration-500 ease-silk",
                  t === theme ? "bg-gold text-obsidian" : "bg-cream/[0.06] text-cream/80 hairline hover:text-cream",
                )}
              >
                <Icon size={16} weight="light" />
                {dict.theme.names[t]}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
