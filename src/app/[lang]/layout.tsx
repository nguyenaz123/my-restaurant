import type { Metadata, Viewport } from "next";
import {
  Be_Vietnam_Pro,
  Bricolage_Grotesque,
  Cormorant_Garamond,
  Lexend,
  Lora,
  Noto_Sans_Lao,
  Noto_Serif_Lao,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Space_Grotesk,
} from "next/font/google";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { CallButton } from "@/components/layout/call-button";
import { LanguageGate } from "@/components/layout/language-gate";
import { ThemeSync } from "@/components/layout/theme-switcher";
import { I18nProvider } from "@/i18n/client";
import { localeMeta, locales } from "@/i18n/config";
import { pageAlternates } from "@/i18n/metadata";
import { getDictionary, getLocale } from "@/i18n/server";
import { site } from "@/lib/site";
import { themeColors, themeInitScript } from "@/lib/theme";
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

// Faces for the alternate themes. Not preloaded: the browser only fetches a face once the
// active `data-theme` puts it in use, so visitors on the default theme download none of them.
// (next/font only accepts literal options, hence the repetition.)
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
}); // retro
const lora = Lora({ variable: "--font-lora", subsets: ["latin", "vietnamese"], display: "swap", preload: false }); // retro
const lexend = Lexend({ variable: "--font-lexend", subsets: ["latin", "vietnamese"], display: "swap", preload: false }); // glass
const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: false,
}); // liquid
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  preload: false,
}); // neobrutal
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "vietnamese"],
  display: "swap",
  preload: false,
}); // memphis
const themeFontVars = [playfair, lora, lexend, beVietnam, spaceGrotesk, bricolage].map((f) => f.variable).join(" ");

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
    // "Add to Home Screen" on iOS: full-screen launch, own name and icon (the manifest covers Android).
    appleWebApp: { capable: true, title: site.name, statusBarStyle: "black-translucent" },
    icons: { apple: "/apple-touch-icon.png" },
    formatDetection: { telephone: false },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: themeColors.ember,
  // Lets the page run under the translucent iOS status bar; fixed chrome pads itself with safe-area insets.
  viewportFit: "cover",
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
    priceRange: "₭₭",
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
      className={`${cormorant.variable} ${jakarta.variable} ${laoSerif.variable} ${laoSans.variable} ${themeFontVars}`}
      // themeInitScript sets data-theme before hydration, so the server markup can't match it.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="grain min-h-svh bg-obsidian">
        <ThemeSync />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-50 rounded-pill bg-gold px-4 py-2 text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
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
