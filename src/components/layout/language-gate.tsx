"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowRight, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";
import { Rich } from "@/i18n/rich";
import { LOCALE_COOKIE, localeMeta, locales, switchLocalePath } from "@/i18n/config";
import { rememberLocale } from "@/components/layout/locale-switcher";
import { Flag } from "@/components/layout/flags";

const ease = [0.32, 0.72, 0, 1] as const;

const hasChosen = () => {
  try {
    return document.cookie.split("; ").some((c) => c.startsWith(`${LOCALE_COOKIE}=`));
  } catch {
    return true;
  }
};

/**
 * First-visit language picker. Shown once, while no language has been chosen
 * (no NEXT_LOCALE cookie); any choice, or closing it, sets the cookie.
 */
export function LanguageGate() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const t = dict.languageGate;

  // Opened after mount (the cookie is only readable in the browser), with a beat so the hero lands first.
  useEffect(() => {
    if (hasChosen()) return;
    const timer = setTimeout(() => setOpen(true), reduce ? 0 : 900);
    return () => clearTimeout(timer);
  }, [reduce]);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    return () => lenis?.start();
  }, [open, lenis]);

  const onOpenChange = (next: boolean) => {
    // Dismissing keeps the current language and counts as a choice.
    if (!next) rememberLocale(locale);
    setOpen(next);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="glass fixed inset-0 z-[70] bg-obsidian/75 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              aria-describedby="language-gate-intro"
              // Focus the dialog itself rather than the close button, so no focus ring flashes on open;
              // Tab still moves straight into the options.
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                panel.current?.focus();
              }}
            >
              {/* Full-screen flex wrapper centres the card; motion owns `transform`, so no translate centring. */}
              <div
                ref={panel}
                data-lenis-prevent
                onClick={(e) => e.target === e.currentTarget && onOpenChange(false)}
                className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto p-4 outline-none"
              >
              <motion.div
                className="w-full max-w-lg"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="bezel rounded-bezel bg-cream/[0.04] p-1.5 hairline">
                  <div className="relative bezel-core rounded-bezel-core bg-char px-6 pb-6 pt-8 inner-glow md:px-8 md:pt-10">
                    <Dialog.Close
                      aria-label={t.close}
                      className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-pill bg-cream/[0.06] text-cream hairline transition-transform duration-500 ease-silk hover:rotate-90"
                    >
                      <X size={16} weight="light" />
                    </Dialog.Close>

                    <span className="flex size-11 items-center justify-center rounded-full bg-gold/15 font-display text-xl italic text-gold-bright hairline">
                      E
                    </span>
                    <Dialog.Title className="mt-6 pr-8 font-display text-3xl font-light leading-tight text-cream md:text-4xl">
                      <Rich text={t.title} accentClassName="italic text-gold whitespace-nowrap" />
                    </Dialog.Title>
                    <p id="language-gate-intro" className="mt-3 max-w-[42ch] text-sm leading-relaxed text-smoke">
                      {t.intro}
                    </p>

                    <ul className="mt-8 grid gap-2">
                      {locales.map((l, i) => {
                        const current = l === locale;
                        return (
                          <motion.li
                            key={l}
                            initial={reduce ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 + i * 0.07, ease }}
                          >
                            <Link
                              href={switchLocalePath(pathname, l)}
                              hrefLang={localeMeta[l].hreflang}
                              lang={localeMeta[l].htmlLang}
                              onClick={() => {
                                rememberLocale(l);
                                setOpen(false);
                              }}
                              className={cn(
                                "group flex items-center gap-4 rounded-field p-3 pr-4 transition-colors duration-500 ease-silk",
                                current ? "bg-gold/10 ring-1 ring-gold/40" : "bg-cream/[0.03] hairline hover:bg-cream/[0.07]",
                              )}
                            >
                              <span className="relative h-8 w-12 shrink-0 overflow-hidden rounded-md shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-cream)_12%,transparent)]">
                                <Flag locale={l} className="size-full" />
                              </span>
                              <span className="flex flex-1 flex-col">
                                <span className="text-base text-cream">{localeMeta[l].label}</span>
                                {current && <span className="text-xs text-gold-bright">{t.current}</span>}
                              </span>
                              <ArrowRight
                                size={16}
                                weight="light"
                                className="text-smoke transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:text-cream"
                              />
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </motion.div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
