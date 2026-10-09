/**
 * Language-neutral restaurant facts. Display strings (hours, address lines,
 * nav and CTA labels) are in the dictionaries; the structured address here
 * feeds the JSON-LD.
 */
export const site = {
  name: "Beige Tau",
  tagline: "The Art of Fire & Time",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://beigetau.la",
  phone: "+856 20 5888 7461",
  phoneHref: "tel:+8562058887461",
  email: "reserve@beigetau.la",
  address: {
    street: "26 Nam Phou Square, Setthathirath Road, Ban Xiengyeun",
    district: "Chanthabouly",
    city: "Vientiane",
    postalCode: "01000",
    country: "LA",
  },
  /** Nam Phou fountain square, Vientiane (17°57'52"N 102°36'29"E). */
  geo: { lat: 17.96444, lng: 102.60806 },
  /** Google Maps with a pin on `geo`; every address on the site links here. */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=17.96444%2C102.60806",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=17.96444%2C102.60806",
  mapsEmbedUrl: "https://maps.google.com/maps?q=17.96444,102.60806&z=17&output=embed",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "WhatsApp", href: "https://wa.me/8562058887461" },
  ],
} as const;

/** Unprefixed paths; wrap with `localizePath` (or use `ButtonLink`, which does it). */
export const navLinks = [
  { href: "/menu", key: "menu" },
  { href: "/gallery", key: "gallery" },
  { href: "/private-dining", key: "privateDining" },
  { href: "/craft", key: "craft" },
] as const;

export type NavKey = (typeof navLinks)[number]["key"];

/** One destination per intent; labels are `dict.cta[intent]`. */
export const cta = {
  reserve: "/private-dining#reserve",
  menu: "/menu",
} as const;

/** Routes listed in the sitemap and given hreflang alternates. */
export const routes = [
  { path: "/", priority: 1 },
  { path: "/menu", priority: 0.9 },
  { path: "/private-dining", priority: 0.9 },
  { path: "/craft", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
] as const;
