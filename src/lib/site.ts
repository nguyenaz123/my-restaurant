export const site = {
  name: "Ember & Age",
  tagline: "The Art of Fire & Time",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://emberandage.vn",
  description:
    "Steakhouse bò ủ khô 30 - 90 ngày, nướng trên than gỗ nhãn tại Quận 1, Sài Gòn. Wagyu A5, Black Angus Dry-Aged và hầm rượu 400 nhãn.",
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
  addressShort: "26 Đông Du, Quận 1, TP. Hồ Chí Minh",
  geo: { lat: 10.7769, lng: 106.7046 },
  mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=10.7769,106.7046",
  hours: [
    { days: "Thứ Ba - Chủ Nhật", time: "17:30 - 23:00" },
    { days: "Thứ Hai", time: "Nghỉ để ủ thịt" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Zalo", href: "https://zalo.me" },
  ],
} as const;

export const navLinks = [
  { href: "/menu", label: "Thực đơn" },
  { href: "/gallery", label: "Không gian" },
  { href: "/private-dining", label: "Phòng riêng" },
  { href: "/craft", label: "Nghệ thuật" },
] as const;

/** One label per intent, used everywhere on the site. */
export const cta = {
  reserve: { href: "/private-dining#reserve", label: "Đặt bàn" },
  menu: { href: "/menu", label: "Xem thực đơn" },
} as const;
