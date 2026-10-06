export type Cut = {
  slug: string;
  name: string;
  origin: string;
  image: string;
  bms: number;
  agedDays: number;
  weight: string;
  price: string;
  tasting: string;
  sommelier: { wine: string; region: string; note: string };
};

export const cuts: Cut[] = [
  {
    slug: "tomahawk-a5",
    name: "Tomahawk Wagyu A5",
    origin: "Kagoshima, Nhật Bản",
    image: "/images/hero-sliced.jpg",
    bms: 11,
    agedDays: 21,
    weight: "1.2 kg, cho 2 - 3 người",
    price: "12.800.000₫",
    tasting:
      "Vân mỡ dày như ren, tan ngay ở nhiệt độ cơ thể. Lớp vỏ cháy cạnh từ than nhãn giữ lại vị ngọt của bơ nâu.",
    sommelier: {
      wine: "Opus One 2019",
      region: "Napa Valley, Mỹ",
      note: "Tannin mịn và độ chua sáng cắt qua lớp mỡ Wagyu, để lại hậu vị cassis và tuyết tùng.",
    },
  },
  {
    slug: "ribeye-60",
    name: "Black Angus Ribeye",
    origin: "Creekstone, Kansas",
    image: "/images/raw-cuts.jpg",
    bms: 6,
    agedDays: 60,
    weight: "450 g",
    price: "2.950.000₫",
    tasting: "Sau 60 ngày ủ khô, thớ thịt đậm vị hạt óc chó và phô mai Parmesan già.",
    sommelier: {
      wine: "Barolo Riserva 2016",
      region: "Piemonte, Ý",
      note: "Nebbiolo với hương nấm truffle và hoa hồng khô, khớp với tầng umami của thịt ủ lâu.",
    },
  },
  {
    slug: "porterhouse-45",
    name: "Porterhouse Dry-Aged",
    origin: "Riverine, Úc",
    image: "/images/cast-iron.jpg",
    bms: 4,
    agedDays: 45,
    weight: "900 g, cho 2 người",
    price: "4.600.000₫",
    tasting: "Hai thế giới trên một khúc xương: thăn ngoại chắc thịt và thăn nội mềm như lụa.",
    sommelier: {
      wine: "Château Léoville Barton 2015",
      region: "Saint-Julien, Pháp",
      note: "Cabernet cổ điển Bordeaux, cấu trúc vững đủ để đi cùng phần thăn ngoại đậm vị.",
    },
  },
  {
    slug: "striploin-a5",
    name: "Striploin Wagyu A5",
    origin: "Miyazaki, Nhật Bản",
    image: "/images/medium-rare.jpg",
    bms: 12,
    agedDays: 14,
    weight: "200 g",
    price: "5.400.000₫",
    tasting: "Điểm vân mỡ cao nhất thang đo. Phục vụ từng lát mỏng, nướng nhanh trên lửa lớn.",
    sommelier: {
      wine: "Dom Pérignon 2013",
      region: "Champagne, Pháp",
      note: "Bọt mịn và độ chua của Champagne làm sạch vòm miệng sau mỗi lát Wagyu béo ngậy.",
    },
  },
  {
    slug: "tenderloin-90",
    name: "Filet Mignon 90 ngày",
    origin: "Snake River Farms, Idaho",
    image: "/images/plated-rare.jpg",
    bms: 8,
    agedDays: 90,
    weight: "250 g",
    price: "3.800.000₫",
    tasting: "Phiên bản táo bạo nhất bếp: 90 ngày cho hương phô mai xanh và mật ong rừng.",
    sommelier: {
      wine: "Penfolds Grange 2017",
      region: "South Australia",
      note: "Shiraz đậm đặc với vị sô cô la đen và tiêu, đủ sức đứng cạnh hương ủ khô mạnh.",
    },
  },
];

export type MenuCategory = "wagyu" | "angus" | "wine" | "sides";

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "wagyu", label: "A5 Wagyu" },
  { id: "angus", label: "Black Angus Dry-Aged" },
  { id: "wine", label: "Wine Cellar" },
  { id: "sides", label: "Side Dishes" },
];

export type MenuItem = {
  name: string;
  detail: string;
  meta: string;
  price: string;
  signature?: boolean;
  /** Slug of the matching entry in `cuts`, for the detail drawer. */
  cut?: Cut["slug"];
};

export const menu: Record<MenuCategory, { image: string; intro: string; items: MenuItem[] }> = {
  wagyu: {
    image: "/images/medium-rare.jpg",
    intro: "Wagyu có chứng nhận Hiệp hội Thịt bò Nhật, nhập theo lô nhỏ mỗi tuần.",
    items: [
      { name: "Tomahawk Wagyu A5", detail: "Kagoshima, BMS 11, nướng than nhãn", meta: "1.2 kg", price: "12.800.000₫", signature: true, cut: "tomahawk-a5" },
      { name: "Striploin Wagyu A5", detail: "Miyazaki, BMS 12, cắt lát bàn", meta: "200 g", price: "5.400.000₫", cut: "striploin-a5" },
      { name: "Wagyu Tartare", detail: "Lòng đỏ trứng muối tương, hành tím, bánh mì nướng", meta: "120 g", price: "1.450.000₫" },
      { name: "Wagyu Sando", detail: "Bánh mì sữa Hokkaido, sốt demi-glace", meta: "2 miếng", price: "1.980.000₫" },
    ],
  },
  angus: {
    image: "/images/raw-cuts.jpg",
    intro: "Ủ khô trong buồng đá muối Himalaya tại chỗ, nhiệt độ 2°C, độ ẩm 82%.",
    items: [
      { name: "Ribeye 60 ngày", detail: "Creekstone, vỏ bơ nâu và tỏi đen", meta: "450 g", price: "2.950.000₫", signature: true, cut: "ribeye-60" },
      { name: "Porterhouse 45 ngày", detail: "Riverine, cho 2 người, kèm tủy xương", meta: "900 g", price: "4.600.000₫", cut: "porterhouse-45" },
      { name: "Filet Mignon 90 ngày", detail: "Snake River Farms, sốt tiêu xanh Phú Quốc", meta: "250 g", price: "3.800.000₫", cut: "tenderloin-90" },
      { name: "Bavette 30 ngày", detail: "Nướng lửa lớn, chimichurri lá mùi", meta: "300 g", price: "1.350.000₫" },
    ],
  },
  wine: {
    image: "/images/wine-cellar.jpg",
    intro: "Hầm rượu 400 nhãn, giữ ở 13°C. Sommelier tư vấn tại bàn.",
    items: [
      { name: "Opus One 2019", detail: "Napa Valley, Cabernet blend", meta: "750 ml", price: "16.500.000₫", signature: true },
      { name: "Barolo Riserva 2016", detail: "Piemonte, Nebbiolo", meta: "750 ml", price: "7.200.000₫" },
      { name: "Château Léoville Barton 2015", detail: "Saint-Julien, Bordeaux", meta: "750 ml", price: "9.800.000₫" },
      { name: "Penfolds Grange 2017", detail: "South Australia, Shiraz", meta: "750 ml", price: "21.000.000₫" },
      { name: "Rượu theo ly", detail: "6 nhãn đổi mỗi tuần, rót bằng Coravin", meta: "125 ml", price: "từ 420.000₫" },
    ],
  },
  sides: {
    image: "/images/potatoes-steak.jpg",
    intro: "Món ăn kèm nấu cùng lò than với thịt, để giữ chung một mùi khói.",
    items: [
      { name: "Khoai tây nghiền bơ Échiré", detail: "Tỷ lệ 2 khoai 1 bơ, kiểu Robuchon", meta: "", price: "280.000₫", signature: true },
      { name: "Tủy xương nướng", detail: "Muối hoa Bạc Liêu, bánh mì men chua", meta: "", price: "360.000₫" },
      { name: "Măng tây nướng than", detail: "Sốt hollandaise, vỏ chanh muối", meta: "", price: "240.000₫" },
      { name: "Nấm rừng xào bơ", detail: "Nấm mối, nấm đùi gà, cỏ xạ hương", meta: "", price: "260.000₫" },
      { name: "Mac & cheese truffle", detail: "Gruyère 18 tháng, truffle đen bào", meta: "", price: "420.000₫" },
    ],
  },
};

export type Doneness = {
  id: string;
  label: string;
  vi: string;
  temp: string;
  center: string;
  band: string;
  bandWidth: number;
  texture: string;
  flavor: string;
};

export const doneness: Doneness[] = [
  {
    id: "rare",
    label: "Rare",
    vi: "Tái",
    temp: "50 - 52°C",
    center: "#9e1b2f",
    band: "#7a3a3a",
    bandWidth: 6,
    texture: "Mềm, mọng nước, lõi đỏ thẫm còn mát.",
    flavor: "Vị sắt và vị ngọt nguyên bản của thịt rõ nhất.",
  },
  {
    id: "medium-rare",
    label: "Medium Rare",
    vi: "Tái vừa",
    temp: "55 - 57°C",
    center: "#c23b4a",
    band: "#8a4e48",
    bandWidth: 12,
    texture: "Lõi hồng đỏ ấm, mỡ vừa chảy, thớ thịt đàn hồi.",
    flavor: "Cân bằng giữa vị ngọt thịt và hương khói. Bếp trưởng khuyên dùng.",
  },
  {
    id: "medium",
    label: "Medium",
    vi: "Chín vừa",
    temp: "60 - 63°C",
    center: "#cf6e70",
    band: "#93685d",
    bandWidth: 22,
    texture: "Lõi hồng nhạt, chắc hơn, nước thịt bắt đầu giảm.",
    flavor: "Hương Maillard đậm hơn, hợp với các phần thịt nhiều mỡ.",
  },
  {
    id: "medium-well",
    label: "Medium Well",
    vi: "Chín tới",
    temp: "65 - 68°C",
    center: "#b88779",
    band: "#8d6e60",
    bandWidth: 34,
    texture: "Chỉ còn vệt hồng mảnh ở tâm, thớ thịt chặt.",
    flavor: "Vị nướng chiếm ưu thế, vị ngọt thịt lùi lại phía sau.",
  },
  {
    id: "well-done",
    label: "Well Done",
    vi: "Chín kỹ",
    temp: "71°C trở lên",
    center: "#8f6d5e",
    band: "#7a5a4c",
    bandWidth: 46,
    texture: "Chín đều toàn bộ, săn chắc.",
    flavor: "Đậm khói. Chúng tôi gợi ý chọn Wagyu nếu bạn thích chín kỹ, vì mỡ giữ thịt không bị khô.",
  },
];

export type AgingStage = {
  days: number;
  title: string;
  image: string;
  summary: string;
  notes: string[];
  loss: string;
  texture: string;
};

export const agingStages: AgingStage[] = [
  {
    days: 30,
    title: "Đánh thức",
    image: "/images/raw-cuts.jpg",
    summary:
      "Enzyme tự nhiên bắt đầu phá vỡ mô liên kết. Thịt mềm rõ rệt nhưng vẫn giữ vị bò tươi sạch.",
    notes: ["Bơ tươi", "Hạt dẻ rang", "Vị ngọt sạch"],
    loss: "Hao hụt khoảng 15%",
    texture: "Mềm, mọng",
  },
  {
    days: 60,
    title: "Chuyển hóa",
    image: "/images/carving.jpg",
    summary:
      "Nước bốc hơi, vị cô đặc lại. Lớp vỏ ngoài sẫm màu bảo vệ phần lõi, hương umami phát triển mạnh.",
    notes: ["Óc chó", "Parmesan già", "Nấm porcini"],
    loss: "Hao hụt khoảng 25%",
    texture: "Chắc, đậm",
  },
  {
    days: 90,
    title: "Tinh túy",
    image: "/images/medium-rare.jpg",
    summary:
      "Chỉ những phần thịt có lớp mỡ phủ dày mới đi được đến đây. Hương vị phức tạp như rượu vang lâu năm.",
    notes: ["Phô mai xanh", "Mật ong rừng", "Rượu sherry"],
    loss: "Hao hụt khoảng 35%",
    texture: "Mềm sâu, hơi dẻo",
  },
];

export type GalleryTag = "architecture" | "private" | "light";

export const galleryFilters: { id: GalleryTag | "all"; label: string }[] = [
  { id: "all", label: "Tất cả" },
  { id: "architecture", label: "Kiến trúc" },
  { id: "private", label: "Phòng tiệc riêng" },
  { id: "light", label: "Ánh sáng" },
];

export type GalleryItem = {
  src: string;
  alt: string;
  tag: GalleryTag;
  ratio: "portrait" | "landscape" | "square";
};

export const gallery: GalleryItem[] = [
  { src: "/images/dining-room.jpg", alt: "Phòng ăn chính với đèn bàn ấm và ghế da tối màu", tag: "architecture", ratio: "landscape" },
  { src: "/images/gold-bar.jpg", alt: "Quầy bar với hàng trăm bóng đèn vàng treo trần", tag: "light", ratio: "portrait" },
  { src: "/images/table-setting.jpg", alt: "Bàn tiệc riêng bày đĩa và ly pha lê dưới ánh nến", tag: "private", ratio: "square" },
  { src: "/images/bar-hall.jpg", alt: "Sảnh bar trần gỗ và tủ rượu kéo dài", tag: "architecture", ratio: "landscape" },
  { src: "/images/fire-grill.jpg", alt: "Miếng thịt bò trên lửa than gỗ nhãn", tag: "light", ratio: "portrait" },
  { src: "/images/wine-cellar.jpg", alt: "Kệ rượu vang trong phòng hầm Cellar Room", tag: "private", ratio: "landscape" },
  { src: "/images/overhead-dining.jpg", alt: "Góc nhìn từ trên xuống sàn gạch hoa và các bàn tiệc", tag: "architecture", ratio: "portrait" },
  { src: "/images/whisky.jpg", alt: "Rót whisky qua đá tròn tại quầy bar", tag: "light", ratio: "square" },
  { src: "/images/napkin-table.jpg", alt: "Khăn ăn gấp trên bàn trải khăn trắng", tag: "private", ratio: "portrait" },
  { src: "/images/interior-dark.jpg", alt: "Không gian phòng ăn trần cao với đèn thả", tag: "architecture", ratio: "landscape" },
  { src: "/images/chef-flambe.jpg", alt: "Bếp trưởng đốt lửa flambé trên chảo", tag: "light", ratio: "landscape" },
  { src: "/images/wine-pour.jpg", alt: "Sommelier rót vang đỏ tại bàn trong phòng riêng", tag: "private", ratio: "square" },
  { src: "/images/bonfire.jpg", alt: "Ngọn lửa củi giữa nền tối", tag: "light", ratio: "portrait" },
  { src: "/images/wine-flight.jpg", alt: "Bốn ly vang nếm thử đặt trên mặt thùng gỗ sồi", tag: "private", ratio: "landscape" },
];

export type RoomPhoto = { src: string; alt: string };

export type Room = {
  name: string;
  guests: string;
  /** First photo is the card cover; all of them show in the room's photo dialog. */
  photos: RoomPhoto[];
  description: string;
  features: string[];
};

export const rooms: Room[] = [
  {
    name: "The Cellar Room",
    guests: "8 - 14 khách",
    photos: [
      { src: "/images/wine-cellar.jpg", alt: "Kệ rượu vang bao quanh phòng hầm Cellar Room" },
      { src: "/images/wine-flight.jpg", alt: "Bốn ly vang nếm thử đặt trên mặt thùng gỗ sồi" },
      { src: "/images/wine-pour.jpg", alt: "Sommelier rót vang đỏ tại bàn" },
      { src: "/images/rose-pour.jpg", alt: "Rót vang hồng vào ly pha lê dưới ánh đèn thấp" },
      { src: "/images/wine-grapes.jpg", alt: "Ly vang đỏ cạnh chùm nho và lá nho" },
    ],
    description: "Đặt ngay trong hầm rượu, bao quanh bởi 400 nhãn vang. Phù hợp tiệc kỷ niệm và tiếp khách đối tác.",
    features: ["Sommelier riêng", "Thực đơn nếm 7 món", "Màn hình trình chiếu ẩn"],
  },
  {
    name: "The Ember Room",
    guests: "4 - 8 khách",
    photos: [
      { src: "/images/table-setting.jpg", alt: "Bàn tiệc riêng bày đĩa và ly pha lê dưới ánh nến" },
      { src: "/images/napkin-table.jpg", alt: "Khăn ăn gấp trên bàn trải khăn trắng" },
      { src: "/images/fire-grill.jpg", alt: "Miếng thịt bò trên lửa than gỗ nhãn" },
      { src: "/images/carving.jpg", alt: "Cắt lát bò nướng trên thớt gỗ" },
    ],
    description: "Cửa kính nhìn thẳng vào lò than. Không gian ấm, ánh sáng thấp, cách âm hoàn toàn.",
    features: ["Nhìn trực tiếp bếp lửa", "Cách âm", "Âm nhạc tùy chọn"],
  },
  {
    name: "Chef's Counter",
    guests: "2 - 6 khách",
    photos: [
      { src: "/images/chef-plating.jpg", alt: "Bếp trưởng hoàn thiện món dưới ánh đèn quầy bếp" },
      { src: "/images/kitchen-pass.jpg", alt: "Quầy pass trong bếp với đèn thả và chồng đĩa trắng" },
      { src: "/images/plating-hands.jpg", alt: "Rắc muối hoàn thiện đĩa ăn trên quầy gỗ" },
      { src: "/images/chef-flambe.jpg", alt: "Bếp trưởng đốt lửa flambé trên chảo" },
    ],
    description: "Sáu ghế quanh quầy bếp. Bếp trưởng nấu và kể chuyện từng phần thịt ngay trước mặt bạn.",
    features: ["Bếp trưởng phục vụ", "Món ngoài thực đơn", "Hai suất mỗi tối"],
  },
];
