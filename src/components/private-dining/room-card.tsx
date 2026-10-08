"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { CaretLeft, CaretRight, Images, X } from "@phosphor-icons/react";
import { imageSrc, type Room } from "@/lib/data";
import { Bezel } from "@/components/ui/bezel";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";
import { format } from "@/i18n/format";

const ease = [0.32, 0.72, 0, 1] as const;

function RoomFeatures({ room }: { room: Room }) {
  const { dict } = useI18n();
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {dict.privateDining.rooms[room.id].features.map((f) => (
        <li key={f} className="rounded-pill bg-cream/[0.05] px-3 py-1.5 text-xs text-cream/80 hairline">
          {f}
        </li>
      ))}
    </ul>
  );
}

function RoomPhotos({ room, open, onOpenChange }: { room: Room; open: boolean; onOpenChange: (o: boolean) => void }) {
  const { dict } = useI18n();
  const [index, setIndex] = useState(0);
  const count = room.photos.length;
  const step = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count]);

  // Always start from the cover photo when the dialog opens (adjusting state during render).
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setIndex(0);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const photo = room.photos[index];
  const alt = dict.images[photo];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
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
                data-lenis-prevent
                className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 p-4 outline-none md:p-10"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="flex w-full max-w-6xl items-end justify-between gap-4">
                  <div>
                    <Dialog.Title className="font-display text-3xl text-cream md:text-4xl">{room.name}</Dialog.Title>
                    <p className="mt-1 text-sm text-gold-bright">{dict.privateDining.rooms[room.id].guests}</p>
                  </div>
                  <Dialog.Close
                    aria-label={dict.common.close}
                    className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-gold text-obsidian transition-transform duration-500 ease-silk hover:rotate-90 active:scale-95"
                  >
                    <X size={18} weight="light" />
                  </Dialog.Close>
                </div>

                <div className="relative h-[58dvh] w-full max-w-6xl">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={photo}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <Image src={imageSrc(photo)} alt={alt} fill quality={82} sizes="90vw" className="object-contain" />
                  </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex w-full max-w-6xl items-center justify-between gap-4">
                  <p className="text-sm text-cream/70">
                    <span className="text-cream">{index + 1}</span> / {count}
                    <span className="ml-3 hidden sm:inline">{alt}</span>
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label={dict.common.prev}
                      className="flex size-12 items-center justify-center rounded-pill bg-cream/[0.06] text-cream hairline transition-transform duration-500 ease-silk hover:-translate-x-0.5 active:scale-95"
                    >
                      <CaretLeft size={18} weight="light" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label={dict.common.next}
                      className="flex size-12 items-center justify-center rounded-pill bg-cream/[0.06] text-cream hairline transition-transform duration-500 ease-silk hover:translate-x-0.5 active:scale-95"
                    >
                      <CaretRight size={18} weight="light" />
                    </button>
                  </div>
                </div>

                <ul className="flex max-w-full gap-2 overflow-x-auto pb-1">
                  {room.photos.map((p, i) => (
                    <li key={p} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={format(dict.privateDining.viewPhoto, { n: i + 1, alt: dict.images[p] })}
                        aria-current={i === index}
                        className={cn(
                          "relative block h-16 w-24 overflow-hidden rounded-xl transition-opacity duration-500 ease-silk",
                          i === index ? "opacity-100 ring-1 ring-gold" : "opacity-45 hover:opacity-80",
                        )}
                      >
                        <Image src={imageSrc(p)} alt="" fill quality={50} sizes="96px" className="object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/** Room card; clicking anywhere on it opens a dialog with all of the room's photos. */
export function RoomCard({ room, lead = false }: { room: Room; lead?: boolean }) {
  const { dict } = useI18n();
  const t = dict.privateDining;
  const text = t.rooms[room.id];
  const [open, setOpen] = useState(false);
  const cover = room.photos[0];

  const badge = (
    <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-pill bg-obsidian/60 px-3 py-1.5 text-xs text-cream backdrop-blur-md hairline transition-colors duration-500 ease-silk group-hover:bg-gold group-hover:text-obsidian">
      <Images size={14} weight="light" />
      {format(t.photoCount, { n: room.photos.length })}
    </span>
  );

  const image = (
    <Image
      src={imageSrc(cover)}
      alt={dict.images[cover]}
      fill
      quality={70}
      sizes={lead ? "(min-width: 1024px) 56vw, 100vw" : "(min-width: 1024px) 18vw, (min-width: 640px) 42vw, 100vw"}
      className="object-cover transition-transform duration-[1400ms] ease-silk group-hover:scale-[1.04]"
    />
  );

  // The ::after overlay on the name button makes the whole card clickable without nesting the card in a button.
  const trigger = (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => setOpen(true)}
      className="text-left transition-colors duration-500 ease-silk after:absolute after:inset-0 after:z-10 after:content-[''] group-hover:text-gold-bright"
    >
      {room.name}
      <span className="sr-only">{format(t.viewPhotos, { n: room.photos.length })}</span>
    </button>
  );

  return (
    <>
      {lead ? (
        <Bezel className="group">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
            {image}
            {badge}
          </div>
          <div className="p-7 md:p-9">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="font-display text-4xl text-cream">{trigger}</h3>
              <span className="text-sm text-gold-bright">{text.guests}</span>
            </div>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-cream/75">{text.description}</p>
            <RoomFeatures room={room} />
          </div>
        </Bezel>
      ) : (
        <Bezel className="group" innerClassName="grid sm:grid-cols-[42%_1fr]">
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-auto">
            {image}
            {badge}
          </div>
          <div className="p-6 md:p-7">
            <h3 className="font-display text-3xl text-cream">{trigger}</h3>
            <p className="mt-1 text-sm text-gold-bright">{text.guests}</p>
            <p className="mt-3 text-sm leading-relaxed text-cream/75">{text.description}</p>
            <RoomFeatures room={room} />
          </div>
        </Bezel>
      )}

      <RoomPhotos room={room} open={open} onOpenChange={setOpen} />
    </>
  );
}
