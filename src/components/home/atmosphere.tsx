"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Eyebrow } from "@/components/ui/eyebrow";

const spaces = [
  { image: "/images/dining-room.jpg", title: "Phòng ăn chính", text: "48 chỗ ngồi, ghế da và đèn bàn đặt thấp để ánh sáng dồn vào đĩa." },
  { image: "/images/interior-dark.jpg", title: "Sảnh trần cao", text: "Trần cao với đèn thả đồng thau rọi xuống từng bàn." },
  { image: "/images/gold-bar.jpg", title: "Quầy bar", text: "Whisky single malt và cocktail khói trước bữa tối." },
  { image: "/images/bar-hall.jpg", title: "Sảnh bar", text: "Trần gỗ và tủ rượu kéo dài suốt chiều dài sảnh." },
  { image: "/images/wine-cellar.jpg", title: "The Cellar Room", text: "Phòng VIP trong hầm rượu, tối đa 14 khách." },
  { image: "/images/table-setting.jpg", title: "Phòng tiệc riêng", text: "Bàn tiệc dưới ánh nến, ly pha lê và khăn trải trắng." },
  { image: "/images/chef-plating.jpg", title: "Chef's Counter", text: "Sáu ghế quanh quầy bếp, ngồi sát ngọn lửa." },
  { image: "/images/overhead-dining.jpg", title: "Sàn gạch hoa", text: "Gạch hoa trải khắp phòng ăn, đẹp nhất khi nhìn từ trên cao." },
];

function Panel({ s, i }: { s: (typeof spaces)[number]; i: number }) {
  return (
    // Width is capped by viewport height so image + caption always fit inside the pinned 100dvh frame.
    // Subgrid shares the image row and caption row across panels, so image bottoms and titles line up.
    <figure className={`row-span-2 grid grid-rows-subgrid snap-start ${i % 2 ? "w-[min(82vw,46dvh)]" : "w-[min(82vw,72dvh)]"}`}>
      <div className="self-end rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline">
        <div
          className={`relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] ${i % 2 ? "aspect-[4/5]" : "aspect-[5/4]"}`}
        >
          <Image src={s.image} alt={s.title} fill quality={70} sizes="(min-width: 768px) 50vw, 82vw" className="object-cover" />
        </div>
      </div>
      <figcaption className="mt-5 flex flex-col gap-2 px-2">
        <span className="font-display text-2xl text-cream md:text-3xl">{s.title}</span>
        <span className="max-w-[40ch] text-sm leading-relaxed text-smoke">{s.text}</span>
      </figcaption>
    </figure>
  );
}

export function Atmosphere() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (p) => -p * distance);

  const intro = (
    <div className="row-span-2 flex w-[82vw] flex-col justify-end self-end pb-24 md:w-[34vw] md:pr-8">
      <Eyebrow className="w-max">Không gian</Eyebrow>
      <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl">
        Ánh sáng thấp, <span className="italic text-gold">lửa ở trung tâm</span>
      </h2>
      <p className="mt-6 max-w-[40ch] leading-relaxed text-smoke">
        Gỗ óc chó, đá bazan và đồng thau. Mọi góc nhìn đều hướng về lò than.
      </p>
      <Link
        href="/gallery"
        className="group mt-10 inline-flex w-max items-center gap-3 text-sm text-cream transition-colors duration-500 ease-silk hover:text-gold-bright"
      >
        Xem bộ sưu tập
        <span className="flex size-9 items-center justify-center rounded-full bg-cream/[0.06] hairline transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-px">
          <ArrowUpRight size={14} weight="light" />
        </span>
      </Link>
    </div>
  );

  // Mobile and reduced motion: native horizontal scroll-snap, no scroll hijack.
  if (reduce) {
    return (
      <section className="py-28">
        <div className="grid snap-x snap-mandatory grid-flow-col grid-rows-[auto_auto] gap-x-6 overflow-x-auto px-4 pb-6 md:px-10">
          {intro}
          {spaces.map((s, i) => (
            <Panel key={s.title} s={s} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative" style={{ height: `calc(100dvh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="grid w-max grid-flow-col grid-rows-[auto_auto] gap-x-6 px-4 will-change-transform md:gap-x-10 md:px-10">
          {intro}
          {spaces.map((s, i) => (
            <Panel key={s.title} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
