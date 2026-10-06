"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";
import { Flag } from "@/components/layout/flags";
import { LOCALE_COOKIE, localeMeta, locales, switchLocalePath, type Locale } from "@/i18n/config";

const ease = [0.32, 0.72, 0, 1] as const;

/** Remembers the choice so the proxy sends unprefixed visits (e.g. "/") to the same language next time. */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

/** Compact pill in the desktop nav that opens a list of languages. */
export function LocaleMenu() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

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
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="locale-menu"
        aria-label={`${dict.nav.language}: ${localeMeta[locale].label}`}
        className="flex h-11 items-center gap-1.5 rounded-full bg-cream/[0.06] px-4 text-xs font-medium tracking-wide text-cream hairline transition-colors duration-500 ease-silk hover:bg-cream/[0.12]"
      >
        <Flag locale={locale} className="h-3 w-[18px] rounded-[2px]" />
        {localeMeta[locale].short}
        <CaretDown size={12} weight="light" className={cn("transition-transform duration-500 ease-silk", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="locale-menu"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.35, ease }}
            className="glass absolute right-0 top-[calc(100%+0.75rem)] w-48 origin-top-right rounded-[1.25rem] bg-char/90 p-1.5 inner-glow backdrop-blur-2xl"
          >
            {locales.map((l) => (
              <li key={l}>
                <Link
                  href={switchLocalePath(pathname, l)}
                  hrefLang={localeMeta[l].hreflang}
                  lang={localeMeta[l].htmlLang}
                  aria-current={l === locale ? "true" : undefined}
                  onClick={() => {
                    rememberLocale(l);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-between rounded-[0.9rem] px-3.5 py-2.5 text-sm transition-colors duration-500 ease-silk",
                    l === locale ? "bg-cream/[0.07] text-cream" : "text-smoke hover:bg-cream/[0.05] hover:text-cream",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Flag locale={l} className="h-3.5 w-[21px] shrink-0 rounded-[2px]" />
                    {localeMeta[l].label}
                  </span>
                  {l === locale && <Check size={14} weight="light" className="text-gold-bright" />}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Inline row of language pills for the mobile overlay. */
export function LocaleRow({ className }: { className?: string }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  return (
    <nav aria-label={dict.nav.language} className={className}>
      <ul className="flex flex-wrap gap-2">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={switchLocalePath(pathname, l)}
              hrefLang={localeMeta[l].hreflang}
              lang={localeMeta[l].htmlLang}
              aria-current={l === locale ? "true" : undefined}
              onClick={() => rememberLocale(l)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors duration-500 ease-silk",
                l === locale ? "bg-gold text-obsidian" : "bg-cream/[0.06] text-cream/80 hairline hover:text-cream",
              )}
            >
              <Flag locale={l} className="h-3 w-[18px] shrink-0 rounded-[2px]" />
              {localeMeta[l].label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
