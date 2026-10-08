import Image from "next/image";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { cta, site } from "@/lib/site";
import { AddressLink } from "@/components/ui/address-link";
import { Rich } from "@/i18n/rich";
import { getDictionary } from "@/i18n/server";

export async function ReservationCta() {
  const dict = await getDictionary();
  const t = dict.home.reserve;
  return (
    <section aria-labelledby="reserve-title" className="px-2 py-28 md:px-4 md:py-40">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-panel bg-wine-deep">
        <Image
          src="/images/wine-pour.jpg"
          alt=""
          fill
          quality={70}
          sizes="100vw"
          className="object-cover opacity-45 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-wine/80 via-wine-deep/70 to-obsidian/90" />

        <div className="relative grid gap-14 px-6 py-24 md:px-16 md:py-32 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 id="reserve-title" className="font-display text-5xl font-light leading-[1.02] text-cream md:text-7xl">
              <Rich text={t.title} accentClassName="italic text-gold-bright" />
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-cream/75">
              {t.intro}
            </p>
            <div className="mt-10">
              <ButtonLink href={cta.reserve}>{dict.cta.reserve}</ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9">
            <div className="bezel rounded-bezel bg-cream/[0.05] p-1.5 hairline">
              <div className="bezel-core rounded-bezel-core bg-obsidian/70 p-7 inner-glow">
                <AddressLink full className="mb-6 border-b border-cream/10 pb-6 text-cream" />
                <dl className="space-y-5 text-sm">
                  {dict.contact.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-6">
                      <dt className="text-smoke">{h.days}</dt>
                      <dd className="text-cream">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={site.phoneHref}
                  className="group mt-7 flex items-center justify-between rounded-pill bg-cream/[0.06] py-2 pl-5 pr-2 text-cream hairline transition-colors duration-500 ease-silk hover:bg-cream/[0.1]"
                >
                  <span className="text-sm">{site.phone}</span>
                  <span className="flex size-9 items-center justify-center rounded-pill bg-gold text-obsidian transition-transform duration-500 ease-silk group-hover:scale-105">
                    <Phone size={16} weight="light" />
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
