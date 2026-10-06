import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { AgingTimeline } from "@/components/craft/aging-timeline";
import { ChefProfile, FireBento } from "@/components/craft/mastery";
import { ButtonLink } from "@/components/ui/button-link";
import { AddressLink } from "@/components/ui/address-link";
import { cta } from "@/lib/site";
import { Rich } from "@/i18n/rich";
import { pageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { ...dict.craft.meta, alternates: pageAlternates(await getLocale(), "/craft") };
}

export default async function CraftPage() {
  const dict = await getDictionary();
  const t = dict.craft;
  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={<Rich text={t.title} />}
        intro={t.intro}
        image="/images/chef-flambe.jpg"
        imageAlt={dict.images["chef-flambe"]}
      />
      <AgingTimeline />
      <ChefProfile />
      <FireBento />
      <section className="pb-32">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="max-w-xl font-display text-3xl font-light leading-tight text-cream md:text-4xl">{t.closing}</p>
            <AddressLink className="mt-5" />
          </div>
          <ButtonLink href={cta.menu}>{dict.cta.menu}</ButtonLink>
        </div>
      </section>
    </>
  );
}
