import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";
import { Rich } from "@/i18n/rich";
import { pageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return { ...dict.gallery.meta, alternates: pageAlternates(await getLocale(), "/gallery") };
}

export default async function GalleryPage() {
  const dict = await getDictionary();
  const t = dict.gallery;
  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={<Rich text={t.title} />}
        intro={t.intro}
        image="/images/dining-room.jpg"
        imageAlt={dict.images["dining-room"]}
        orientation="portrait"
      />
      <MasonryGallery />
    </>
  );
}
