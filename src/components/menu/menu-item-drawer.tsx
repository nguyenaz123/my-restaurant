"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Wine, X } from "@phosphor-icons/react";
import { cuts, type MenuItem } from "@/lib/data";
import { ButtonLink } from "@/components/ui/button-link";
import { cta } from "@/lib/site";
import { AddressLink } from "@/components/ui/address-link";

const ease = [0.32, 0.72, 0, 1] as const;

function MarblingScale({ score }: { score: number }) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-7xl font-light leading-none text-cream">{score}</span>
        <span className="text-sm text-smoke">trên thang BMS 12</span>
      </div>
      <div className="mt-5 flex justify-between" role="img" aria-label={`Điểm vân mỡ ${score} trên 12`}>
        {Array.from({ length: 12 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0.2, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.04, ease }}
            className={
              i < score
                ? "h-10 w-1.5 origin-bottom rounded-full bg-gradient-to-t from-gold to-gold-bright"
                : "h-10 w-1.5 origin-bottom rounded-full bg-cream/10"
            }
          />
        ))}
      </div>
    </div>
  );
}

type Props = {
  item: MenuItem | null;
  /** Category photo, used when the item has no cut photo of its own. */
  image: string;
  open: boolean;
  onClose: () => void;
};

/** Side drawer with the details of one menu item. Items linked to a cut also show marbling, aging and the sommelier pick. */
export function MenuItemDrawer({ item, image, open, onClose }: Props) {
  const cut = item?.cut ? cuts.find((c) => c.slug === item.cut) : undefined;
  const portion = cut?.weight ?? item?.meta;

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && item && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="glass fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.aside
                data-lenis-prevent
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col overflow-y-auto bg-char p-2 shadow-[-40px_0_120px_-20px_rgba(13,13,13,0.9)] outline-none md:inset-y-3 md:right-3 md:rounded-[1.75rem] md:hairline"
                initial={{ x: "105%" }}
                animate={{ x: 0 }}
                exit={{ x: "105%" }}
                transition={{ duration: 0.8, ease }}
              >
                <div className="relative aspect-[16/11] shrink-0 overflow-hidden rounded-[calc(1.75rem-0.5rem)]">
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.4, ease }}
                  >
                    <Image src={cut?.image ?? image} alt={item.name} fill quality={70} sizes="576px" className="object-cover" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-char via-char/10 to-transparent" />
                  <Dialog.Close
                    className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full bg-obsidian/60 text-cream backdrop-blur-md hairline transition-transform duration-500 ease-silk hover:rotate-90"
                    aria-label="Đóng"
                  >
                    <X size={18} weight="light" />
                  </Dialog.Close>
                </div>

                <div className="flex flex-1 flex-col gap-10 px-4 pb-6 pt-2 md:px-8">
                  <div>
                    {cut && <p className="text-sm text-smoke">{cut.origin}</p>}
                    <Dialog.Title className="mt-1 font-display text-4xl font-light leading-tight text-cream md:text-5xl">
                      {item.name}
                    </Dialog.Title>
                    {item.signature && (
                      <p className="mt-2 font-display text-lg italic text-gold">Món đặc trưng của nhà hàng</p>
                    )}
                    <p className="mt-4 max-w-[52ch] leading-relaxed text-cream/75">{cut?.tasting ?? item.detail}</p>
                  </div>

                  {cut && <MarblingScale score={cut.bms} />}

                  <dl className="grid grid-cols-2 gap-6">
                    {cut && (
                      <div>
                        <dt className="text-xs uppercase tracking-[0.2em] text-smoke">Ủ khô</dt>
                        <dd className="mt-2 font-display text-4xl font-light text-cream">
                          {cut.agedDays} <span className="text-lg italic text-gold">ngày</span>
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-xs uppercase tracking-[0.2em] text-smoke">{portion ? "Khẩu phần" : "Giá"}</dt>
                      {portion && <dd className="mt-2 text-cream">{portion}</dd>}
                      <dd className={portion ? "text-gold-bright" : "mt-2 text-gold-bright"}>{item.price}</dd>
                    </div>
                  </dl>

                  {cut && (
                    <div className="rounded-[1.25rem] bg-wine/40 p-6 inner-glow">
                      <div className="flex items-center gap-3 text-gold-bright">
                        <Wine size={20} weight="light" />
                        <span className="text-xs uppercase tracking-[0.2em]">Sommelier gợi ý</span>
                      </div>
                      <p className="mt-4 font-display text-2xl text-cream">{cut.sommelier.wine}</p>
                      <p className="text-sm text-smoke">{cut.sommelier.region}</p>
                      <p className="mt-4 leading-relaxed text-cream/80">{cut.sommelier.note}</p>
                    </div>
                  )}

                  <div className="mt-auto flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <ButtonLink href={cta.reserve.href}>{cta.reserve.label}</ButtonLink>
                    <AddressLink />
                  </div>
                </div>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
