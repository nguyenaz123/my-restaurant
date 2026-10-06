"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Reveal } from "@/components/ui/reveal";

const manifesto =
  "Chúng tôi không vội. Mỗi phần thịt nằm trong buồng ủ đá muối từ 30 đến 90 ngày, rồi mới gặp ngọn lửa than gỗ nhãn. Thời gian làm thịt mềm. Lửa đánh thức hương vị.";

const highlight = new Set(["thời", "gian", "lửa", "Lửa", "Thời"]);

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const clean = word.replace(/[.,]/g, "");
  return (
    <motion.span style={{ opacity }} className={highlight.has(clean) ? "italic text-gold" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

const stats = [
  { value: "90", unit: "ngày", label: "ủ khô tối đa trong buồng đá muối Himalaya" },
  { value: "2", unit: "°C", label: "nhiệt độ buồng ủ, độ ẩm giữ ở 82%" },
  { value: "400", unit: "nhãn", label: "vang trong hầm rượu giữ ở 13°C" },
];

export function BrandStory() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.85", "end 0.45"] });
  const { scrollYProgress: imgProgress } = useScroll({ target: imgRef, offset: ["start end", "end start"] });
  const backY = useTransform(imgProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const frontY = useTransform(imgProgress, [0, 1], reduce ? [0, 0] : [140, -100]);

  const words = manifesto.split(" ");

  return (
    <section aria-labelledby="story-title" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-4 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="story-title" className="sr-only">
            Câu chuyện của chúng tôi
          </h2>
          <p
            ref={textRef}
            className="font-display text-3xl font-light leading-[1.25] text-cream md:text-5xl md:leading-[1.15]"
          >
            {reduce
              ? manifesto
              : words.map((w, i) => (
                  <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
                ))}
          </p>

          <dl className="mt-20 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {stats.map((s, i) => (
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
                alt="Hai miếng thăn bò sống với lớp mỡ trắng ngà trên thớt gỗ"
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
                alt="Miếng bò trên vỉ nướng giữa ngọn lửa than"
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
