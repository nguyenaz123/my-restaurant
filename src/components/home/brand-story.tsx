"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { useI18n } from "@/i18n/client";

export type ManifestoSegment = { text: string; accent: boolean; word: boolean };

function Word({ segment, range, progress }: { segment: ManifestoSegment; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={segment.accent ? "italic text-gold" : undefined}>
      {segment.text}
    </motion.span>
  );
}

/** `segments` come pre-split from the server (see the home page) so word boundaries match on both sides. */
export function BrandStory({ segments }: { segments: ManifestoSegment[] }) {
  const { dict } = useI18n();
  const t = dict.home.story;
  const textRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] });
  const { scrollYProgress: imgProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const backY = useTransform(imgProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const frontY = useTransform(imgProgress, [0, 1], reduce ? [0, 0] : [140, -100]);

  // Only word-like segments get their own step in the reveal; spaces and punctuation ride along.
  const steps = segments.filter((s) => s.word).length || 1;
  let step = 0;

  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="story-title" className="sr-only">
            {t.title}
          </h2>
          <p
            ref={textRef}
            className="font-display text-3xl font-light leading-[1.25] text-cream md:text-5xl md:leading-[1.15]"
          >
            {segments.map((seg, i) => {
              if (reduce) return seg.accent ? <span key={i} className="italic text-gold">{seg.text}</span> : seg.text;
              const at = seg.word ? step++ : Math.max(0, step - 1);
              return <Word key={i} segment={seg} progress={scrollYProgress} range={[at / steps, (at + 1) / steps]} />;
            })}
          </p>

          <dl className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {t.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <dt className="font-display text-6xl font-light leading-none text-cream">
                  {s.value}
                  <span className="ml-1 text-2xl italic text-gold">{s.unit}</span>
                </dt>
                <dd className="mt-3 max-w-[22ch] text-sm leading-relaxed text-smoke">{s.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Z-axis cascade: two plates at different depths drifting at different speeds. */}
        <div ref={imgRef} className="relative h-[520px] md:h-[680px] lg:col-span-5">
          <motion.div
            style={{ y: backY }}
            className="absolute right-0 top-0 w-[78%] rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline md:rotate-[2deg]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
              <Image
                src="/images/raw-cuts.jpg"
                alt={dict.images["raw-cuts"]}
                fill
                quality={70}
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            style={{ y: frontY }}
            className="absolute bottom-0 left-0 w-[62%] rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline md:-rotate-[3deg]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
              <Image
                src="/images/fire-grill.jpg"
                alt={dict.images["fire-grill"]}
                fill
                quality={70}
                sizes="(min-width: 1024px) 24vw, 62vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
