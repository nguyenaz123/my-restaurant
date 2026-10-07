import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Noto_Sans_Lao, Noto_Serif_Lao, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { CallButton } from "@/components/layout/call-button";
import { LanguageGate } from "@/components/layout/language-gate";
import { I18nProvider } from "@/i18n/client";
import { localeMeta, locales } from "@/i18n/config";
import { pageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";
import { site } from "@/lib/site";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

// Lao glyphs are missing from Cormorant / Jakarta, so these sit behind them in the font stacks.
// No preload: their unicode-range means only Lao pages download them.
const laoSerif = Noto_Serif_Lao({ variable: "--font-lao-serif", subsets: ["lao"], display: "swap", preload: false });
const laoSans = Noto_Sans_Lao({ variable: "--font-lao-sans", subsets: ["lao"], display: "swap", preload: false });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  const og = localeMeta[locale].ogLocale;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} | ${dict.meta.title}`,
      template: `%s | ${site.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    alternates: pageAlternates(locale, "/"),
    openGraph: {
      type: "website",
      locale: og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      siteName: site.name,
      title: `${site.name} | ${site.tagline}`,
      description: dict.meta.description,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: dict.meta.description,
    url: `${site.url}/${locale}`,
    inLanguage: localeMeta[locale].htmlLang,
    image: [`${site.url}/opengraph-image.jpg`],
    telephone: site.phone,
    email: site.email,
    servesCuisine: ["Steakhouse", "Dry-aged beef", "Wagyu"],
    priceRange: "₫₫₫₫",
    acceptsReservations: true,
    menu: `${site.url}/${locale}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "17:30",
        closes: "23:00",
      },
    ],
  };

  return (
    <html
      lang={localeMeta[locale].htmlLang}
      className={`${cormorant.variable} ${jakarta.variable} ${laoSerif.variable} ${laoSans.variable}`}
    >
      <body className="grain min-h-svh bg-obsidian">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-gold px-4 py-2 text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {dict.meta.skipLink}
        </a>
        <I18nProvider locale={locale} dict={dict}>
          <SmoothScroll>
            <SiteNav />
            <main id="main">{children}</main>
            <SiteFooter />
            <CallButton />
            <LanguageGate />
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
