import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The theme-swappable radius tokens from globals.css, so `rounded-pill` etc. merge like built-in radii.
const twMerge = extendTailwindMerge({
  extend: {
    theme: { radius: ["pill", "bezel", "bezel-core", "panel", "panel-core", "field", "menu", "menu-item"] },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
