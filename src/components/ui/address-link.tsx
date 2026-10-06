"use client";

import { MapPin } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";

/** Restaurant address that opens Google Maps directions. */
export function AddressLink({ className, full = false }: { className?: string; full?: boolean }) {
  const { dict } = useI18n();
  const c = dict.contact;
  return (
    <a
      href={site.mapsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={format(c.directionsAria, { address: c.addressShort })}
      className={cn(
        "group inline-flex items-start gap-2.5 text-sm text-cream/80 transition-colors duration-500 ease-silk hover:text-gold-bright",
        className,
      )}
    >
      <MapPin size={18} weight="light" className="mt-px shrink-0 text-gold" />
      <span className="underline decoration-cream/20 underline-offset-4 transition-colors duration-500 ease-silk group-hover:decoration-gold-bright/60">
        {full ? `${c.street}, ${c.area}` : c.addressShort}
      </span>
    </a>
  );
}
