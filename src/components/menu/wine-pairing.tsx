"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cuts } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";
import { Rich } from "@/i18n/rich";

const ease = [0.32, 0.72, 0, 1] as const;

export function WinePairing() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const { dict } = useI18n();
  const t = dict.menu.wine;
  const cut = cuts[i];
  const text = dict.cuts[cut.slug];

  return (
    <section aria-labelledby="wine-title" className="px-2 pb-28 md:px-4 md:pb-40">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[2rem] bg-wine-deep">
        <Image src="/images/wine-cellar.jpg" alt="" fill quality={70} sizes="100vw" className="object-cover opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,14,23,0.5),#2a080e_70%)]" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <h2 id="wine-title" className="font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl">
            <Rich text={t.title} accentClassName="italic text-gold-bright" />
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] leading-relaxed text-cream/70">
            {t.intro}
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-2" role="radiogroup" aria-label={t.groupLabel}>
            {cuts.map((c, idx) => (
              <button
                key={c.slug}
                type="button"
                role="radio"
                aria-checked={idx === i}
                onClick={() => setI(idx)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm transition-all duration-500 ease-silk active:scale-[0.98]",
                  idx === i ? "bg-cream text-obsidian" : "bg-cream/[0.06] text-cream/80 hairline hover:bg-cream/[0.12]",
                )}
              >
                {dict.cuts[c.slug].name}
              </button>
            ))}
          </div>

          <div className="mt-14 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={cut.slug}
                initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="text-sm text-cream/60">{text.region}</p>
                <p className="mt-2 font-display text-5xl font-light text-cream md:text-7xl">{cut.wine}</p>
                <p className="mx-auto mt-6 max-w-[56ch] text-lg leading-relaxed text-cream/80">{text.note}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
