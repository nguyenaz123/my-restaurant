"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { cancelFrame, frame, useReducedMotion, type FrameData } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

function RouteReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);
  return null;
}

/**
 * Drives Lenis from Motion's frame loop instead of its own rAF, so the scroll position
 * and every useScroll-driven parallax are updated in the same frame (no one-frame lag).
 */
function MotionFrameSync() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const update = ({ timestamp }: FrameData) => lenis.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, autoRaf: false, anchors: true }}>
      <MotionFrameSync />
      <RouteReset />
      {children}
    </ReactLenis>
  );
}
