"use client";

import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Thermometer } from "@phosphor-icons/react";
import { doneness } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";
import { Rich } from "@/i18n/rich";

const ease = [0.32, 0.72, 0, 1] as const;
const RECOMMENDED = 1;

// Soft intramuscular fat flecks. They stay visible at every doneness level.
const marbling = [
  { top: "24%", left: "22%", w: "18%", h: "5%", r: -18 },
  { top: "40%", left: "52%", w: "22%", h: "4%", r: 12 },
  { top: "58%", left: "28%", w: "14%", h: "6%", r: 30 },
  { top: "30%", left: "68%", w: "10%", h: "7%", r: -40 },
  { top: "66%", left: "56%", w: "16%", h: "4%", r: -8 },
  { top: "48%", left: "14%", w: "9%", h: "5%", r: 50 },
  { top: "18%", left: "46%", w: "8%", h: "4%", r: 8 },
];

const SHAPE = "48% 52% 46% 54% / 58% 50% 50% 42%";

/**
 * Stylised ribeye cross-section. Each doneness level changes the centre colour
 * and widens the grey-brown cooked band; the band is produced by scaling the
 * centre layer (transform only) rather than animating its size.
 */
function SteakSection({ level }: { level: number }) {
  const { dict } = useI18n();
  const d = doneness[level];
  const scale = 1 - d.bandWidth / 100;
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-[520px]" role="img" aria-label={format(dict.menu.doneness.sectionAria, { label: d.label })}>
      {/* contact shadow */}
      <div className="absolute inset-x-[10%] bottom-[-4%] h-[16%] rounded-[50%] bg-obsidian blur-2xl" />
      {/* fat cap peeking out along the upper edge */}
      <div
        className="absolute inset-0 -translate-x-[2.5%] -translate-y-[5%] bg-[linear-gradient(160deg,#f3e6cf,#cfb48b_45%,#8a6a4a)]"
        style={{ borderRadius: SHAPE }}
      />
      {/* seared crust */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_30%,#6b3d27,#3a1f13_55%,#1f100a)] shadow-[inset_0_0_24px_rgba(0,0,0,0.7)]"
        style={{ borderRadius: SHAPE }}
      />
      {/* cooked band, darker toward the crust */}
      <motion.div
        className="absolute inset-[3.5%] overflow-hidden"
        style={{ borderRadius: SHAPE }}
        animate={{ backgroundColor: d.band }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(40,20,12,0.55))]" />
      </motion.div>
      {/* centre */}
      <motion.div
        className="absolute inset-[3.5%] overflow-hidden"
        style={{ borderRadius: SHAPE }}
        animate={{ scale, backgroundColor: d.center }}
        transition={{ duration: 0.9, ease }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_48%,rgba(255,235,225,0.16),transparent_45%,rgba(30,10,8,0.22))]" />
      </motion.div>
      {/* marbling sits above both layers so it never shrinks with the centre */}
      <div className="absolute inset-[3.5%] overflow-hidden" style={{ borderRadius: SHAPE }}>
        {marbling.map((m, i) => (
          <span
            key={i}
            className="absolute rounded-[50%] bg-[#f4e3cf] opacity-25 blur-[3px]"
            style={{ top: m.top, left: m.left, width: m.w, height: m.h, transform: `rotate(${m.r}deg)` }}
          />
        ))}
      </div>
      {/* juice sheen */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_35%)]"
        style={{ borderRadius: SHAPE }}
      />
    </div>
  );
}

export function DonenessVisualizer() {
  const [level, setLevel] = useState(RECOMMENDED);
  const reduce = useReducedMotion();
  const { dict } = useI18n();
  const t = dict.menu.doneness;
  const d = doneness[level];
  const text = t.levels[d.id];

  return (
    <section aria-labelledby="doneness-title" className="py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <div className="rounded-[2rem] bg-cream/[0.03] p-1.5 hairline">
          <div className="grid gap-14 overflow-hidden rounded-[calc(2rem-0.375rem)] bg-char px-6 py-14 inner-glow md:px-14 md:py-20 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <SteakSection level={level} />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <h2 id="doneness-title" className="font-display text-4xl font-light leading-[1.05] text-cream md:text-5xl">
                <Rich text={t.title} />
              </h2>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-smoke">
                {t.intro}
              </p>

              <Slider.Root
                className="relative mt-12 flex h-8 w-full touch-none select-none items-center"
                min={0}
                max={doneness.length - 1}
                step={1}
                value={[level]}
                onValueChange={([v]) => setLevel(v)}
                aria-label={t.sliderLabel}
              >
                <Slider.Track className="relative h-[3px] grow overflow-hidden rounded-full bg-[linear-gradient(90deg,#9e1b2f,#c23b4a,#cf6e70,#b88779,#8f6d5e)]">
                  <Slider.Range className="absolute h-full" />
                </Slider.Track>
                <Slider.Thumb
                  aria-valuetext={`${d.label}, ${d.temp}`}
                  className="block size-7 cursor-grab rounded-full bg-cream shadow-[0_0_0_6px_rgba(197,160,89,0.25)] transition-transform duration-300 ease-silk hover:scale-110 active:cursor-grabbing active:scale-95"
                />
              </Slider.Root>

              <div className="mt-4 grid grid-cols-5 text-center text-[11px] md:text-xs">
                {doneness.map((x, i) => (
                  <button
                    key={x.id}
                    type="button"
                    onClick={() => setLevel(i)}
                    className={cn(
                      "py-1 transition-colors duration-500 ease-silk",
                      i === level ? "text-cream" : "text-smoke/70 hover:text-cream",
                    )}
                  >
                    {x.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={d.id}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease }}
                  className="mt-12"
                  aria-live="polite"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <p className="font-display text-4xl text-cream">
                      {d.label}{" "}
                      {text.name !== d.label && <span className="text-2xl italic text-gold">{text.name}</span>}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-gold-bright">
                      <Thermometer size={18} weight="light" />
                      {format(t.core, { temp: d.temp })}
                    </p>
                  </div>
                  <dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-smoke">{t.texture}</dt>
                      <dd className="mt-1 leading-relaxed text-cream/85">{text.texture}</dd>
                    </div>
                    <div>
                      <dt className="text-smoke">{t.flavor}</dt>
                      <dd className="mt-1 leading-relaxed text-cream/85">{text.flavor}</dd>
                    </div>
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
