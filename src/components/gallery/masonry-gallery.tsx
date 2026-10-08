"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { gallery, galleryFilters, imageSrc, type GalleryFilter, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";

const ease = [0.32, 0.72, 0, 1] as const;
const ratioClass: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function MasonryGallery() {
  const { dict } = useI18n();
  const t = dict.gallery;
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const items = useMemo(() => (filter === "all" ? gallery : gallery.filter((g) => g.tag === filter)), [filter]);

  const step = useCallback(
    (dir: 1 | -1) => setOpen((o) => (o === null ? o : (o + dir + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const current = open !== null ? items[open] : null;
  const currentAlt = current ? dict.images[current.image] : "";

  return (
    <section aria-label={t.sectionLabel} className="pb-28 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={t.filterLabel}>
          {galleryFilters.map((f) => {
            const active = f === filter;
            const count = f === "all" ? gallery.length : gallery.filter((g) => g.tag === f).length;
            return (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "group relative rounded-pill px-5 py-2.5 text-sm transition-colors duration-500 ease-silk",
                  active ? "text-obsidian" : "bg-cream/[0.04] text-smoke hairline hover:text-cream",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-pill bg-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {t.filters[f]} <span className={active ? "text-obsidian/60" : "text-cream/30"}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.li
                key={item.image}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.94, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.7, ease }}
                className="break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group block w-full bezel rounded-bezel bg-cream/[0.03] p-1.5 text-left hairline"
                >
                  <span className={cn("relative block overflow-hidden bezel-core rounded-bezel-core bg-char", ratioClass[item.ratio])}>
                    <Image
                      src={imageSrc(item.image)}
                      alt={dict.images[item.image]}
                      fill
                      quality={70}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                      className="object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 bg-obsidian/0 transition-colors duration-700 ease-silk group-hover:bg-obsidian/20" />
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <AnimatePresence>
          {current && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="glass fixed inset-0 z-50 bg-obsidian/90 backdrop-blur-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                />
              </Dialog.Overlay>
              <Dialog.Content forceMount asChild aria-describedby={undefined}>
                <motion.div
                  className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 p-4 outline-none md:p-12"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Dialog.Title className="sr-only">{currentAlt}</Dialog.Title>
                  <div className="relative h-[72dvh] w-full max-w-6xl">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={current.image}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.6, ease }}
                      >
                        <Image src={imageSrc(current.image)} alt={currentAlt} fill quality={82} sizes="90vw" className="object-contain" />
                    </motion.div>
                    </AnimatePresence>
                  </div>
                  <p className="max-w-[60ch] text-center text-sm text-cream/70">{currentAlt}</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label={dict.common.prev}
                      className="flex size-12 items-center justify-center rounded-pill bg-cream/[0.06] text-cream hairline transition-transform duration-500 ease-silk hover:-translate-x-0.5 active:scale-95"
                    >
                      <CaretLeft size={18} weight="light" />
                    </button>
                    <Dialog.Close
                      aria-label={dict.common.close}
                      className="flex size-12 items-center justify-center rounded-pill bg-gold text-obsidian transition-transform duration-500 ease-silk hover:rotate-90 active:scale-95"
                    >
                      <X size={18} weight="light" />
                    </Dialog.Close>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label={dict.common.next}
                      className="flex size-12 items-center justify-center rounded-pill bg-cream/[0.06] text-cream hairline transition-transform duration-500 ease-silk hover:translate-x-0.5 active:scale-95"
                    >
                      <CaretRight size={18} weight="light" />
                    </button>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  );
}
