"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { menu, menuCategories, type MenuCategory, type MenuItem } from "@/lib/data";
import { cn } from "@/lib/cn";
import { MenuItemDrawer } from "@/components/menu/menu-item-drawer";

const ease = [0.32, 0.72, 0, 1] as const;

/** `header` replaces the visually hidden heading; it must render an element with id="menu-title". */
export function MenuTabs({ header }: { header?: React.ReactNode }) {
  const [cat, setCat] = useState<MenuCategory>("wagyu");
  const [active, setActive] = useState<MenuItem | null>(null);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const data = menu[cat];

  return (
    <section id="menu" aria-labelledby="menu-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        {header ?? (
          <h2 id="menu-title" className="sr-only">
            Thực đơn
          </h2>
        )}

        <div
          role="tablist"
          aria-label="Danh mục thực đơn"
          className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 md:mx-0 md:w-max md:rounded-full md:bg-cream/[0.03] md:p-1.5 md:hairline"
        >
          {menuCategories.map((c) => {
            const active = c.id === cat;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                aria-controls="menu-panel"
                onClick={() => setCat(c.id)}
                className={cn(
                  "relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-colors duration-500 ease-silk",
                  active ? "text-obsidian" : "text-smoke hover:text-cream",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                  />
                )}
                <span className="relative">{c.label}</span>
              </button>
            );
          })}
        </div>

        <div id="menu-panel" role="tabpanel" className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline lg:sticky lg:top-28">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-char lg:aspect-[4/5]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={cat}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease }}
                  >
                    <Image src={data.image} alt="" fill quality={70} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease }}
              >
                <p className="max-w-[50ch] leading-relaxed text-smoke">{data.intro}</p>
                <ul className="mt-10 space-y-9">
                  {data.items.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.05 + i * 0.06, ease }}
                      className="group relative"
                    >
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-2xl text-cream md:text-3xl">
                          {/* The ::after overlay makes the whole row clickable while the button holds only the name. */}
                          <button
                            type="button"
                            aria-haspopup="dialog"
                            onClick={() => {
                              setActive(item);
                              setOpen(true);
                            }}
                            className="text-left transition-colors duration-500 ease-silk after:absolute after:inset-0 after:content-[''] group-hover:text-gold-bright"
                          >
                            {item.name}
                          </button>
                        </h3>
                        <span aria-hidden className="mb-1.5 flex-1 border-b border-dotted border-cream/20" />
                        <span className="whitespace-nowrap text-gold-bright">{item.price}</span>
                      </div>
                      <p className="mt-1.5 text-sm text-smoke">
                        {item.detail}
                        {item.meta && <span className="text-cream/50">, {item.meta}</span>}
                      </p>
                      {item.signature && (
                        <p className="mt-2 font-display text-base italic text-gold">Món đặc trưng của nhà hàng</p>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <MenuItemDrawer item={active} image={data.image} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
