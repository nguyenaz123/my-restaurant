/**
 * Language-neutral content: ids, images, prices, numbers. Every visible string
 * for these records lives in the dictionaries (`src/i18n/dictionaries`), keyed
 * by the ids below, so adding a record means adding it here and in each locale.
 */

export const cutSlugs = ["tomahawk-a5", "ribeye-60", "porterhouse-45", "striploin-a5", "tenderloin-90"] as const;
export type CutSlug = (typeof cutSlugs)[number];

export type Cut = {
  slug: CutSlug;
  image: string;
  bms: number;
  agedDays: number;
  /** Wine names are labels, so they are not translated. */
  wine: string;
};

export const cuts: Cut[] = [
  { slug: "tomahawk-a5", image: "/images/hero-sliced.jpg", bms: 11, agedDays: 21, wine: "Opus One 2019" },
  { slug: "ribeye-60", image: "/images/raw-cuts.jpg", bms: 6, agedDays: 60, wine: "Barolo Riserva 2016" },
  { slug: "porterhouse-45", image: "/images/cast-iron.jpg", bms: 4, agedDays: 45, wine: "Château Léoville Barton 2015" },
  { slug: "striploin-a5", image: "/images/medium-rare.jpg", bms: 12, agedDays: 14, wine: "Dom Pérignon 2013" },
  { slug: "tenderloin-90", image: "/images/plated-rare.jpg", bms: 8, agedDays: 90, wine: "Penfolds Grange 2017" },
];

export type MenuCategory = "wagyu" | "angus" | "wine" | "sides";
export const menuCategories: MenuCategory[] = ["wagyu", "angus", "wine", "sides"];

export const menuItemIds = [
  "tomahawk-a5",
  "striploin-a5",
  "wagyu-tartare",
  "wagyu-sando",
  "ribeye-60",
  "porterhouse-45",
  "tenderloin-90",
  "bavette-30",
  "opus-one",
  "barolo",
  "leoville-barton",
  "grange",
  "by-the-glass",
  "echire-mash",
  "bone-marrow",
  "asparagus",
  "wild-mushrooms",
  "truffle-mac",
] as const;
export type MenuItemId = (typeof menuItemIds)[number];

export type MenuItem = {
  id: MenuItemId;
  /** Price in LAK (kip). */
  price: number;
  /** Shown as "from {price}". */
  priceFrom?: boolean;
  /** Portion label that reads the same in every language; the dictionary can override it. */
  meta?: string;
  signature?: boolean;
  /** Slug of the matching entry in `cuts`, for the detail drawer. */
  cut?: CutSlug;
};

export const menu: Record<MenuCategory, { image: string; items: MenuItem[] }> = {
  wagyu: {
    image: "/images/medium-rare.jpg",
    items: [
      { id: "tomahawk-a5", meta: "1.2 kg", price: 2_950_000, signature: true, cut: "tomahawk-a5" },
      { id: "striploin-a5", meta: "200 g", price: 1_250_000, cut: "striploin-a5" },
      { id: "wagyu-tartare", meta: "120 g", price: 320_000 },
      { id: "wagyu-sando", price: 390_000 },
    ],
  },
  angus: {
    image: "/images/raw-cuts.jpg",
    items: [
      { id: "ribeye-60", meta: "450 g", price: 690_000, signature: true, cut: "ribeye-60" },
      { id: "porterhouse-45", meta: "900 g", price: 1_150_000, cut: "porterhouse-45" },
      { id: "tenderloin-90", meta: "250 g", price: 790_000, cut: "tenderloin-90" },
      { id: "bavette-30", meta: "300 g", price: 350_000 },
    ],
  },
  wine: {
    image: "/images/wine-cellar.jpg",
    items: [
      { id: "opus-one", meta: "750 ml", price: 3_900_000, signature: true },
      { id: "barolo", meta: "750 ml", price: 1_650_000 },
      { id: "leoville-barton", meta: "750 ml", price: 2_200_000 },
      { id: "grange", meta: "750 ml", price: 4_800_000 },
      { id: "by-the-glass", meta: "125 ml", price: 120_000, priceFrom: true },
    ],
  },
  sides: {
    image: "/images/potatoes-steak.jpg",
    items: [
      { id: "echire-mash", price: 75_000, signature: true },
      { id: "bone-marrow", price: 95_000 },
      { id: "asparagus", price: 65_000 },
      { id: "wild-mushrooms", price: 70_000 },
      { id: "truffle-mac", price: 110_000 },
    ],
  },
};

export const donenessIds = ["rare", "medium-rare", "medium", "medium-well", "well-done"] as const;
export type DonenessId = (typeof donenessIds)[number];

export type Doneness = {
  id: DonenessId;
  /** International steak term, shown in every language. */
  label: string;
  temp: string;
  center: string;
  band: string;
  bandWidth: number;
};

export const doneness: Doneness[] = [
  { id: "rare", label: "Rare", temp: "50 - 52°C", center: "#9e1b2f", band: "#7a3a3a", bandWidth: 6 },
  { id: "medium-rare", label: "Medium Rare", temp: "55 - 57°C", center: "#c23b4a", band: "#8a4e48", bandWidth: 12 },
  { id: "medium", label: "Medium", temp: "60 - 63°C", center: "#cf6e70", band: "#93685d", bandWidth: 22 },
  { id: "medium-well", label: "Medium Well", temp: "65 - 68°C", center: "#b88779", band: "#8d6e60", bandWidth: 34 },
  { id: "well-done", label: "Well Done", temp: "≥ 71°C", center: "#8f6d5e", band: "#7a5a4c", bandWidth: 46 },
];

export type AgingDays = 30 | 60 | 90;
export const agingStages: { days: AgingDays; image: string }[] = [
  { days: 30, image: "/images/raw-cuts.jpg" },
  { days: 60, image: "/images/carving.jpg" },
  { days: 90, image: "/images/medium-rare.jpg" },
];

export type GalleryTag = "architecture" | "private" | "light";
export type GalleryFilter = GalleryTag | "all";
export const galleryFilters: GalleryFilter[] = ["all", "architecture", "private", "light"];

/** Image ids are the file names in /public/images; `dict.images[id]` holds the alt text. */
export type GalleryItem = {
  image: ImageId;
  tag: GalleryTag;
  ratio: "portrait" | "landscape" | "square";
};

export const gallery: GalleryItem[] = [
  { image: "dining-room", tag: "architecture", ratio: "landscape" },
  { image: "gold-bar", tag: "light", ratio: "portrait" },
  { image: "table-setting", tag: "private", ratio: "square" },
  { image: "bar-hall", tag: "architecture", ratio: "landscape" },
  { image: "fire-grill", tag: "light", ratio: "portrait" },
  { image: "wine-cellar", tag: "private", ratio: "landscape" },
  { image: "overhead-dining", tag: "architecture", ratio: "portrait" },
  { image: "whisky", tag: "light", ratio: "square" },
  { image: "napkin-table", tag: "private", ratio: "portrait" },
  { image: "interior-dark", tag: "architecture", ratio: "landscape" },
  { image: "chef-flambe", tag: "light", ratio: "landscape" },
  { image: "wine-pour", tag: "private", ratio: "square" },
  { image: "bonfire", tag: "light", ratio: "portrait" },
  { image: "wine-flight", tag: "private", ratio: "landscape" },
];

export const imageIds = [
  "dining-room",
  "gold-bar",
  "table-setting",
  "bar-hall",
  "fire-grill",
  "wine-cellar",
  "overhead-dining",
  "whisky",
  "napkin-table",
  "interior-dark",
  "chef-flambe",
  "wine-pour",
  "bonfire",
  "wine-flight",
  "rose-pour",
  "wine-grapes",
  "carving",
  "chef-plating",
  "kitchen-pass",
  "plating-hands",
  "hero-sliced",
  "raw-cuts",
  "sizzling",
] as const;
export type ImageId = (typeof imageIds)[number];

export const imageSrc = (id: ImageId) => `/images/${id}.jpg`;

export type RoomId = "cellar" | "ember" | "counter";

export type Room = {
  id: RoomId;
  /** Room names are brand names and stay in English everywhere. */
  name: string;
  /** First photo is the card cover; all of them show in the room's photo dialog. */
  photos: ImageId[];
};

export const rooms: Room[] = [
  { id: "cellar", name: "The Cellar Room", photos: ["wine-cellar", "wine-flight", "wine-pour", "rose-pour", "wine-grapes"] },
  { id: "ember", name: "The Ember Room", photos: ["table-setting", "napkin-table", "fire-grill", "carving"] },
  { id: "counter", name: "Chef's Counter", photos: ["chef-plating", "kitchen-pass", "plating-hands", "chef-flambe"] },
];
