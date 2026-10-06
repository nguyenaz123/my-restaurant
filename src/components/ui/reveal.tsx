"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

/** Heavy fade-up used for every block entering the viewport. */
export function Reveal({ delay = 0, y = 48, children, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
