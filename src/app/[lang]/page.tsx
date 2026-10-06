import { Hero } from "@/components/home/hero";
import { BrandStory } from "@/components/home/brand-story";
import { Atmosphere } from "@/components/home/atmosphere";
import { ReservationCta } from "@/components/home/reservation-cta";
import { MenuTabs } from "@/components/menu/menu-tabs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button-link";
import { Rich, splitAccent } from "@/i18n/rich";
import { localeMeta } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

/**
 * Splits the manifesto into words for the scroll-linked reveal. Runs on the server
 * because Lao and Chinese have no spaces between words and need Intl.Segmenter,
 * whose output can differ between Node and browser ICU data (a hydration risk).
 */
function segmentManifesto(text: string, intl: string) {
  const segmenter = new Intl.Segmenter(intl, { granularity: "word" });
  return splitAccent(text).flatMap((run, i) =>
    Array.from(segmenter.segment(run), (s) => ({ text: s.segment, accent: i % 2 === 1, word: !!s.isWordLike })),
  );
}

async function MenuHeader() {
  const dict = await getDictionary();
  const t = dict.home.menu;
  return (
    <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h2 id="menu-title" className="mt-6 font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl">
          <Rich text={t.title} />
        </h2>
        <p className="mt-6 max-w-[55ch] leading-relaxed text-smoke">{t.intro}</p>
      </div>
      <ButtonLink href="/menu" variant="ghost" className="w-max">
        {t.full}
      </ButtonLink>
    </div>
  );
}

export default async function HomePage() {
  const locale = await getLocale();
  const dict = await getDictionary();
  return (
    <>
      <Hero />
      <BrandStory segments={segmentManifesto(dict.home.story.manifesto, localeMeta[locale].intl)} />
      <MenuTabs header={<MenuHeader />} />
      <Atmosphere />
      <ReservationCta />
    </>
  );
}
