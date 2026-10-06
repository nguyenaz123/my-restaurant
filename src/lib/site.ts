/**
 * Language-neutral restaurant facts. Display strings (hours, address lines,
 * nav and CTA labels) are in the dictionaries; the structured address here
 * feeds the JSON-LD.
 */
export const site = {
  name: "Ember & Age",
  tagline: "The Art of Fire & Time",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emberandage.vn",
  phone: "+84 28 3823 7461",
  phoneHref: "tel:+842838237461",
  email: "reserve@emberandage.vn",
  address: {
    street: "26 Đông Du, Phường Bến Nghé",
    district: "Quận 1",
    city: "Thành phố Hồ Chí Minh",
    postalCode: "700000",
    country: "VN",
  },
  geo: { lat: 10.7769, lng: 106.7046 },
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=10.7769,106.7046",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Zalo", href: "https://zalo.me" },
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
