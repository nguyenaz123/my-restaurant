"use client";

import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";

type Props = {
  /** Internal paths are given unprefixed ("/menu"); the current locale is added here. */
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "ghost";
  className?: string;
};

/** Pill CTA with the trailing icon nested in its own circular island. */
export function ButtonLink({ href, children, variant = "gold", className }: Props) {
  const { href: localize } = useI18n();
  const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
  const classes = cn(
    "group inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-medium whitespace-nowrap",
    "transition-[transform,background-color,color] duration-500 ease-silk active:scale-[0.98]",
    variant === "gold"
      ? "bg-gold text-obsidian hover:bg-gold-bright"
      : "bg-cream/[0.06] text-cream inner-glow hover:bg-cream/[0.12]",
    className,
  );
  const icon = (
    <span
      className={cn(
        "flex size-9 items-center justify-center rounded-full transition-transform duration-500 ease-silk",
        "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
        variant === "gold" ? "bg-obsidian/10" : "bg-cream/10",
      )}
    >
      <ArrowUpRight size={16} weight="light" />
    </span>
  );
  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={localize(href)} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
