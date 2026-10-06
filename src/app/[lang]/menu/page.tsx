import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { MenuTabs } from "@/components/menu/menu-tabs";
import { DonenessVisualizer } from "@/components/menu/doneness-visualizer";
import { WinePairing } from "@/components/menu/wine-pairing";
import { Rich } from "@/i18n/rich";
import { pageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { ...dict.menu.meta, alternates: pageAlternates(await getLocale(), "/menu") };
}

export default async function MenuPage() {
  const dict = await getDictionary();
  const t = dict.menu;
  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={<Rich text={t.title} />}
        intro={t.intro}
        image="/images/sizzling.jpg"
        imageAlt={dict.images.sizzling}
      />
      <MenuTabs />
      <DonenessVisualizer />
      <WinePairing />
    </>
  );
}
