"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useI18n } from "@/i18n/client";
import { Rich } from "@/i18n/rich";

const spaces = [
  { id: "dining", image: "/images/dining-room.jpg" },
  { id: "hall", image: "/images/interior-dark.jpg" },
  { id: "bar", image: "/images/gold-bar.jpg" },
  { id: "barHall", image: "/images/bar-hall.jpg" },
  { id: "cellar", image: "/images/wine-cellar.jpg" },
  { id: "private", image: "/images/table-setting.jpg" },
  { id: "counter", image: "/images/chef-plating.jpg" },
  { id: "floor", image: "/images/overhead-dining.jpg" },
] as const;

// The pinned horizontal scroll only runs from md up; phones get native swipe + scroll-snap.
const desktopQuery = "(min-width: 768px)";
const subscribeDesktop = (cb: () => void) => {
  const mql = window.matchMedia(desktopQuery);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};

function Panel({ s, i }: { s: (typeof spaces)[number]; i: number }) {
  const { dict } = useI18n();
  const text = dict.home.atmosphere.spaces[s.id];
  return (
    // Width is capped by viewport height so image + caption always fit inside the pinned 100svh frame.
    // svh (not dvh) so the mobile URL bar showing / hiding never resizes the panels mid-scroll.
    // Subgrid shares the image row and caption row across panels, so image bottoms and titles line up.
    <figure className={`row-span-2 grid grid-rows-subgrid snap-start ${i % 2 ? "w-[min(82vw,46svh)]" : "w-[min(82vw,72svh)]"}`}>
      <div className="self-end rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline">
        <div
          className={`relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] ${i % 2 ? "aspect-[4/5]" : "aspect-[5/4]"}`}
        >
          <Image src={s.image} alt={text.title} fill quality={70} sizes="(min-width: 768px) 50vw, 82vw" className="object-cover" />
        </div>
      </div>
      <figcaption className="mt-5 flex flex-col gap-2 px-2">
        <span className="font-display text-2xl text-cream md:text-3xl">{text.title}</span>
        <span className="max-w-[40ch] text-sm leading-relaxed text-smoke">{text.text}</span>
      </figcaption>
    </figure>
  );
}

export function Atmosphere() {
  const { dict, href } = useI18n();
  const t = dict.home.atmosphere;
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  // The server snapshot is false, so SSR and hydration render the native layout and desktop switches
  // after mount (the section is far below the fold, so the swap is never visible).
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(desktopQuery).matches, () => false);
  const pinned = desktop && !reduce;

  useLayoutEffect(() => {
    const el = track.current;
    if (!pinned || !el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, (p) => -p * distance);

  const intro = (
    <div className="row-span-2 flex w-[82vw] flex-col justify-end self-end pb-24 md:w-[34vw] md:pr-8">
      <Eyebrow className="w-max">{t.eyebrow}</Eyebrow>
      <h2 className="mt-6 font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl">
        <Rich text={t.title} />
      </h2>
      <p className="mt-6 max-w-[40ch] leading-relaxed text-smoke">
        {t.intro}
      </p>
      <Link
        href={href("/gallery")}
        className="group mt-10 inline-flex w-max items-center gap-3 text-sm text-cream transition-colors duration-500 ease-silk hover:text-gold-bright"
      >
        {t.link}
        <span className="flex size-9 items-center justify-center rounded-full bg-cream/[0.06] hairline transition-transform duration-500 ease-silk group-hover:translate-x-0.5 group-hover:-translate-y-px">
          <ArrowUpRight size={14} weight="light" />
        </span>
      </Link>
    </div>
  );

  // Mobile and reduced motion: native horizontal scroll-snap, no scroll hijack.
  if (!pinned) {
    return (
      <section ref={section} className="py-28">
        <div className="grid snap-x snap-mandatory grid-flow-col grid-rows-[auto_auto] gap-x-6 overflow-x-auto px-4 pb-6 md:px-10">
          {intro}
          {spaces.map((s, i) => (
            <Panel key={s.id} s={s} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative" style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="grid w-max grid-flow-col grid-rows-[auto_auto] gap-x-6 px-4 will-change-transform md:gap-x-10 md:px-10">
          {intro}
          {spaces.map((s, i) => (
            <Panel key={s.id} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
