"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { gallery, galleryFilters, type GalleryItem, type GalleryTag } from "@/lib/data";
import { cn } from "@/lib/cn";

const ease = [0.32, 0.72, 0, 1] as const;
const ratioClass: Record<GalleryItem["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function MasonryGallery() {
  const [filter, setFilter] = useState<GalleryTag | "all">("all");
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

  return (
    <section aria-label="Bộ sưu tập hình ảnh" className="pb-28 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Lọc hình ảnh">
          {galleryFilters.map((f) => {
            const active = f.id === filter;
            const count = f.id === "all" ? gallery.length : gallery.filter((g) => g.tag === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "group relative rounded-full px-5 py-2.5 text-sm transition-colors duration-500 ease-silk",
                  active ? "text-obsidian" : "bg-cream/[0.04] text-smoke hairline hover:text-cream",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-filter"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                  />
                )}
                <span className="relative">
                  {f.label} <span className={active ? "text-obsidian/60" : "text-cream/30"}>{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.li
                key={item.src}
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
                  className="group block w-full rounded-[1.75rem] bg-cream/[0.03] p-1.5 text-left hairline"
                >
                  <span className={cn("relative block overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-char", ratioClass[item.ratio])}>
                    <Image
                      src={item.src}
                      alt={item.alt}
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
                  <Dialog.Title className="sr-only">{current.alt}</Dialog.Title>
                  <div className="relative h-[72dvh] w-full max-w-6xl">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={current.src}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.6, ease }}
                      >
                        <Image src={current.src} alt={current.alt} fill quality={82} sizes="90vw" className="object-contain" />
                    </motion.div>
                    </AnimatePresence>
                  </div>
                  <p className="max-w-[60ch] text-center text-sm text-cream/70">{current.alt}</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Ảnh trước"
                      className="flex size-12 items-center justify-center rounded-full bg-cream/[0.06] text-cream hairline transition-transform duration-500 ease-silk hover:-translate-x-0.5 active:scale-95"
                    >
                      <CaretLeft size={18} weight="light" />
                    </button>
                    <Dialog.Close
                      aria-label="Đóng"
                      className="flex size-12 items-center justify-center rounded-full bg-gold text-obsidian transition-transform duration-500 ease-silk hover:rotate-90 active:scale-95"
                    >
                      <X size={18} weight="light" />
                    </Dialog.Close>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Ảnh tiếp theo"
                      className="flex size-12 items-center justify-center rounded-full bg-cream/[0.06] text-cream hairline transition-transform duration-500 ease-silk hover:translate-x-0.5 active:scale-95"
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
