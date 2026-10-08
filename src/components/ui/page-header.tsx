"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AddressLink } from "@/components/ui/address-link";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Inner-page header: type on the left, a tall plate on the right that drifts on scroll. */
export function PageHeader({ eyebrow, title, intro, image, imageAlt }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);

  const enter = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 36, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 1.3, delay, ease },
  });

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
      <div className="mx-auto grid max-w-[1400px] items-end gap-12 px-4 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <motion.div {...enter(0.1)}>
            <Eyebrow>{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            {...enter(0.25)}
            className="mt-6 pb-1 font-display text-5xl font-light leading-[1.05] text-cream md:text-7xl"
          >
            {title}
          </motion.h1>
          <motion.p {...enter(0.4)} className="mt-6 max-w-[48ch] text-lg leading-relaxed text-smoke">
            {intro}
          </motion.p>
          <motion.div {...enter(0.5)} className="mt-8">
            <AddressLink />
          </motion.div>
        </div>
        <motion.div
          className="lg:col-span-5 lg:col-start-8"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
        >
          <div className="bezel rounded-bezel bg-cream/[0.03] p-1.5 hairline">
            <div className="relative aspect-[4/3] overflow-hidden bezel-core rounded-bezel-core lg:aspect-[4/5]">
              <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
                <Image src={image} alt={imageAlt} fill preload quality={70} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
