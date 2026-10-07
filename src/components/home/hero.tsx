"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Embers } from "@/components/home/embers";
import { cta } from "@/lib/site";
import { useI18n } from "@/i18n/client";
import { Rich } from "@/i18n/rich";
import heroImg from "../../../public/images/hero-sliced.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { dict } = useI18n();
  const t = dict.home.hero;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const item = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 40, filter: "blur(12px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1.4, delay, ease },
  });

  return (
    // svh, not dvh: the mobile URL bar collapsing / expanding must not resize the hero (and reflow the page) mid-scroll.
    <section ref={ref} className="relative flex min-h-svh items-end overflow-hidden">
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <div className="absolute inset-0 animate-kenburns">
          <Image
            src={heroImg}
            alt={t.imageAlt}
            fill
            preload
            placeholder="blur"
            quality={82}
            sizes="100vw"
            className="object-cover object-[72%_center] md:object-[60%_center]"
          />
        </div>
      </motion.div>

      {/* Chiaroscuro falloff: darkness pools left and bottom so type reads cleanly. */}
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-obsidian/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/50" />
      <Embers />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative mx-auto w-full max-w-[1400px] px-4 pb-16 pt-32 md:px-10 md:pb-24"
      >
        <div className="max-w-2xl">
          <motion.div {...item(0.2)}>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            {...item(0.35)}
            className="mt-6 pb-2 font-display text-5xl font-light leading-[1.02] tracking-tight text-cream sm:text-6xl lg:text-[5.5rem]"
          >
            <Rich text={t.title} />
          </motion.h1>
          <motion.p {...item(0.55)} className="mt-6 max-w-md text-base leading-relaxed text-cream/75 md:text-lg">
            {t.intro}
          </motion.p>
          <motion.div {...item(0.7)} className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href={cta.reserve}>{dict.cta.reserve}</ButtonLink>
            <ButtonLink href={cta.menu} variant="ghost">
              {dict.cta.menu}
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
