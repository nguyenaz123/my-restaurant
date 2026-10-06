import { useId } from "react";
import type { Locale } from "@/i18n/config";

/*
  Inline SVG flags (3:2), drawn instead of emoji flags because Windows renders
  those as two letters. English uses the United Kingdom flag.
*/

const star = "M0,-1 L0.2245,-0.309 L0.951,-0.309 L0.3633,0.118 L0.5878,0.809 L0,0.382 L-0.5878,0.809 L-0.3633,0.118 L-0.951,-0.309 L-0.2245,-0.309 Z";

function Vietnam() {
  return (
    <>
      <rect width="30" height="20" fill="#da251d" />
      <path d={star} fill="#ffcd00" transform="translate(15 10) scale(6)" />
    </>
  );
}

function UnitedKingdom() {
  // Unique clip ids so several UK flags can share a page.
  const id = useId().replace(/[^\w-]/g, "");
  return (
    <>
      <clipPath id={`${id}-clip`}>
        <path d="M0,0 v20 h30 v-20 z" />
      </clipPath>
      <clipPath id={`${id}-diag`}>
        <path d="M15,10 h15 v10 z v10 h-15 z h-15 v-10 z v-10 h15 z" />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <path d="M0,0 v20 h30 v-20 z" fill="#012169" />
        <path d="M0,0 L30,20 M30,0 L0,20" stroke="#fff" strokeWidth="4" />
        <path d="M0,0 L30,20 M30,0 L0,20" clipPath={`url(#${id}-diag)`} stroke="#c8102e" strokeWidth="2.6" />
        <path d="M15,0 v20 M0,10 h30" stroke="#fff" strokeWidth="6.6" />
        <path d="M15,0 v20 M0,10 h30" stroke="#c8102e" strokeWidth="4" />
      </g>
    </>
  );
}

function Laos() {
  return (
    <>
      <rect width="30" height="20" fill="#ce1126" />
      <rect y="5" width="30" height="10" fill="#002868" />
      <circle cx="15" cy="10" r="4" fill="#fff" />
    </>
  );
}

function China() {
  const small = [
    { x: 10, y: 2, r: 23 },
    { x: 12, y: 4, r: 45 },
    { x: 12, y: 7, r: 69 },
    { x: 10, y: 9, r: 21 },
  ];
  return (
    <>
      <rect width="30" height="20" fill="#ee1c25" />
      <path d={star} fill="#ffff00" transform="translate(5 5) scale(3)" />
      {small.map((s) => (
        <path key={s.r} d={star} fill="#ffff00" transform={`translate(${s.x} ${s.y}) rotate(${s.r}) scale(1)`} />
      ))}
    </>
  );
}

const flags: Record<Locale, () => React.ReactElement> = { vi: Vietnam, en: UnitedKingdom, lo: Laos, zh: China };

export function Flag({ locale, className }: { locale: Locale; className?: string }) {
  const Shape = flags[locale];
  return (
    <svg viewBox="0 0 30 20" aria-hidden className={className} preserveAspectRatio="xMidYMid slice">
      <Shape />
    </svg>
  );
}
