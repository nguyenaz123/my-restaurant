"use client";

import { motion, useReducedMotion } from "motion/react";
import { Phone } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";

/** Floating call button shown on every page. The label slides out on hover / focus. */
export function CallButton() {
  const reduce = useReducedMotion();
  const { dict } = useI18n();
  return (
    <motion.a
      href={site.phoneHref}
      aria-label={format(dict.contact.callAria, { phone: site.phone })}
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-20 flex items-center rounded-pill bg-gold p-1.5 text-obsidian shadow-[0_18px_40px_-12px_color-mix(in_oklab,var(--color-gold)_55%,transparent)] transition-colors duration-500 ease-silk hover:bg-gold-bright active:scale-[0.97] md:bottom-8 md:right-8"
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.2 }}
    >
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-700 ease-silk group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden whitespace-nowrap">
          <span className="block pl-4 pr-2 text-sm font-medium">{site.phone}</span>
        </span>
      </span>
      <span className="relative flex size-12 items-center justify-center rounded-pill bg-obsidian/10">
        {!reduce && (
          <span aria-hidden className="absolute inset-0 animate-ping rounded-pill bg-gold/40 [animation-duration:2.4s]" />
        )}
        <Phone size={22} weight="light" className="relative" />
      </span>
    </motion.a>
  );
}
