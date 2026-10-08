"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { cta, navLinks, site } from "@/lib/site";
import { AddressLink } from "@/components/ui/address-link";
import { LocaleMenu, LocaleRow } from "@/components/layout/locale-switcher";
import { ThemeMenu, ThemeRow } from "@/components/layout/theme-switcher";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";

const ease = [0.32, 0.72, 0, 1] as const;

function Monogram() {
  const { dict, href } = useI18n();
  return (
    <Link href={href("/")} className="group flex items-center gap-3 pr-2" aria-label={format(dict.nav.homeAria, { name: site.name })}>
      <span className="flex size-9 items-center justify-center rounded-full bg-gold/15 font-display text-lg italic text-gold-bright hairline transition-transform duration-700 ease-silk group-hover:rotate-[-8deg]">
        E
      </span>
      <span className="font-display text-xl tracking-wide text-cream">
        Ember <span className="italic text-gold">&amp;</span> Age
      </span>
    </Link>
  );
}

export function SiteNav() {
  const { dict, href } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const lenis = useLenis();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 240 && y > prev);
  });

  // Close the overlay when the route changes (adjusting state during render).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:pt-6"
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <nav
          aria-label={dict.nav.mainLabel}
          className="site-bar glass flex h-16 w-full max-w-6xl items-center justify-between gap-6 rounded-pill bg-char/70 px-3 pl-4 inner-glow backdrop-blur-md md:backdrop-blur-2xl lg:w-max lg:max-w-none"
        >
          <Monogram />

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const to = href(l.href);
              const active = pathname.startsWith(to);
              return (
                <li key={l.href} className="relative">
                  <Link
                    href={to}
                    className={cn(
                      "relative z-10 block rounded-pill px-4 py-2 text-sm transition-colors duration-500 ease-silk",
                      active ? "text-cream" : "text-smoke hover:text-cream",
                    )}
                  >
                    {dict.nav[l.key]}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-pill bg-cream/[0.07]"
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <LocaleMenu />
            </div>
            <ThemeMenu />
            <Link
              href={href(cta.reserve)}
              className="btn btn-gold group hidden items-center gap-2 rounded-pill bg-gold py-1.5 pl-5 pr-1.5 text-sm font-medium text-obsidian transition-[transform,background-color] duration-500 ease-silk hover:bg-gold-bright active:scale-[0.98] sm:inline-flex"
            >
              {dict.cta.reserve}
              <span className="flex size-8 items-center justify-center rounded-pill bg-obsidian/10 transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-px">
                <ArrowUpRight size={14} weight="light" />
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
              className="relative flex size-11 items-center justify-center rounded-pill bg-cream/[0.06] hairline lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-cream transition-transform duration-500 ease-silk",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-cream transition-transform duration-500 ease-silk",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="glass fixed inset-0 z-30 flex flex-col justify-between bg-obsidian/85 px-6 pb-10 pt-32 backdrop-blur-3xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease } }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="flex flex-col gap-2">
              {[{ href: "/", key: "home" } as const, ...navLinks].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.08 + i * 0.06, ease }}
                  >
                    <Link
                      href={href(l.href)}
                      className={cn(
                        "block py-1 font-display text-5xl leading-tight",
                        pathname === href(l.href) ? "italic text-gold-bright" : "text-cream",
                      )}
                    >
                      {dict.nav[l.key]}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="flex flex-col gap-6"
            >
              <LocaleRow />
              <ThemeRow />
              <Link
                href={href(cta.reserve)}
                className="inline-flex w-max items-center gap-3 rounded-pill bg-gold py-2 pl-6 pr-2 font-medium text-obsidian"
              >
                {dict.cta.reserve}
                <span className="flex size-9 items-center justify-center rounded-pill bg-obsidian/10">
                  <ArrowUpRight size={16} weight="light" />
                </span>
              </Link>
              <div className="flex flex-col gap-3">
                <AddressLink />
                <a href={site.phoneHref} className="text-sm text-smoke">
                  {site.phone}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
