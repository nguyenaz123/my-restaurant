"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { agingStages } from "@/lib/data";
import { cn } from "@/lib/cn";

const ease = [0.32, 0.72, 0, 1] as const;

export function AgingTimeline() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const stage = agingStages[index];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setIndex((i) => Math.min(agingStages.length - 1, i + 1));
    if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
  };

  return (
    <section aria-labelledby="aging-title" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <h2 id="aging-title" className="max-w-3xl font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl">
          30, 60, 90 ngày. <span className="italic text-gold">Mỗi mốc một tính cách.</span>
        </h2>

        {/* Timeline rail */}
        <div role="tablist" aria-label="Các mốc ủ khô" onKeyDown={onKey} className="relative mt-16 grid grid-cols-3">
          <div aria-hidden className="absolute inset-x-0 top-8 h-px bg-cream/10" />
          <motion.div
            aria-hidden
            className="absolute left-0 top-8 h-px origin-left bg-gradient-to-r from-gold/40 to-gold-bright"
            style={{ width: "100%" }}
            animate={{ scaleX: (index + 0.5) / agingStages.length }}
            transition={{ duration: 0.9, ease }}
          />
          {agingStages.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.days}
                role="tab"
                id={`aging-tab-${s.days}`}
                aria-selected={active}
                aria-controls="aging-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => setIndex(i)}
                className="group relative flex flex-col items-center gap-3 py-6"
              >
                <span
                  className={cn(
                    "relative z-10 flex size-4 items-center justify-center rounded-full transition-colors duration-700 ease-silk",
                    i <= index ? "bg-gold-bright" : "bg-char-2 ring-1 ring-cream/20",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="aging-halo"
                      className="absolute -inset-2 rounded-full ring-1 ring-gold/60"
                      transition={{ type: "spring", stiffness: 200, damping: 26 }}
                    />
                  )}
                </span>
                <span
                  className={cn(
                    "font-display text-5xl font-light transition-colors duration-700 ease-silk md:text-7xl",
                    active ? "text-cream" : "text-cream/25 group-hover:text-cream/60",
                  )}
                >
                  {s.days}
                  <span className="ml-1 text-base italic md:text-xl">ngày</span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="aging-panel"
          role="tabpanel"
          aria-labelledby={`aging-tab-${stage.days}`}
          className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center"
        >
          <div className="rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline lg:col-span-6">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-char">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={stage.days}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)", scale: 1.1 }}
                  animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)", scale: 1 }}
                  exit={{ opacity: 0.4 }}
                  transition={{ duration: 1.1, ease }}
                >
                  <Image src={stage.image} alt={`Thịt bò ở mốc ${stage.days} ngày ủ khô`} fill quality={70} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.days}
                initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease }}
              >
                <h3 className="font-display text-4xl italic text-gold-bright md:text-5xl">{stage.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-cream/80">{stage.summary}</p>
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Hương vị nổi bật">
                  {stage.notes.map((n) => (
                    <li key={n} className="rounded-full bg-cream/[0.05] px-4 py-2 text-sm text-cream hairline">
                      {n}
                    </li>
                  ))}
                </ul>
                <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-cream/10 pt-8 text-sm">
                  <div>
                    <dt className="text-smoke">Kết cấu</dt>
                    <dd className="mt-1 text-cream">{stage.texture}</dd>
                  </div>
                  <div>
                    <dt className="text-smoke">Trọng lượng</dt>
                    <dd className="mt-1 text-cream">{stage.loss}</dd>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
