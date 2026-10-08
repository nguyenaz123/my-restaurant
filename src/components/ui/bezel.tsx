import { cn } from "@/lib/cn";

/** Double-bezel enclosure: an outer tray with a concentric inner core. */
export function Bezel({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={cn("bezel rounded-bezel bg-cream/[0.03] p-1.5 hairline", className)}>
      <div className={cn("bezel-core relative h-full overflow-hidden rounded-bezel-core bg-char inner-glow", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
