import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex rounded-pill bg-gold/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-gold-bright hairline",
        className,
      )}
    >
      {children}
    </span>
  );
}
