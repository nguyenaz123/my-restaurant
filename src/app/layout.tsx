import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { CallButton } from "@/components/layout/call-button";
import { site } from "@/lib/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Steakhouse bò ủ khô & lửa than tại Sài Gòn`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: ["steakhouse Sài Gòn", "bò ủ khô", "dry-aged steak", "Wagyu A5", "nhà hàng bít tết Quận 1", "phòng ăn riêng"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  url: site.url,
  image: [`${site.url}/opengraph-image.jpg`],
  telephone: site.phone,
  email: site.email,
  servesCuisine: ["Steakhouse", "Dry-aged beef", "Wagyu"],
  priceRange: "₫₫₫₫",
  acceptsReservations: true,
  menu: `${site.url}/menu`,
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="grain min-h-[100dvh] bg-obsidian">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-gold px-4 py-2 text-obsidian focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Bỏ qua đến nội dung
        </a>
        <SmoothScroll>
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
          <CallButton />
        </SmoothScroll>
      </body>
    </html>
  );
}
