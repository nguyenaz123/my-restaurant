# Ember & Age - Steakhouse website

Next.js 16 (App Router) + Tailwind CSS v4 + Motion + Lenis. Concept: "The Art of Fire & Time".

## Chạy dự án

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Đặt `NEXT_PUBLIC_SITE_URL` (ví dụ `https://emberandage.vn`) để canonical URL, Open Graph, sitemap và JSON-LD dùng đúng tên miền.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `src/app/page.tsx` | Trang chủ: Hero, Brand Story, Cut Showcase + drawer, Atmosphere (cuộn ngang), CTA đặt bàn |
| `src/app/craft` | Timeline ủ khô 30/60/90 ngày, bếp trưởng, bento lửa củi |
| `src/app/menu` | Tab thực đơn, bộ trực quan độ chín (slider), gợi ý vang |
| `src/app/gallery` | Masonry có bộ lọc + lightbox (phím mũi tên) |
| `src/app/private-dining` | Phòng riêng, form đặt bàn (react-hook-form + zod + server action), bản đồ |
| `src/lib/data.ts` | Toàn bộ nội dung: phần thịt, thực đơn, độ chín, gallery, phòng |
| `src/lib/site.ts` | Tên, địa chỉ, giờ mở cửa, điều hướng, nhãn CTA |
| `src/app/globals.css` | Design tokens (màu, font, easing), grain overlay |

## Việc còn lại trước khi lên production

- `src/app/private-dining/actions.ts` mới chỉ xác nhận yêu cầu, chưa lưu hay gửi đi. Cần nối với hệ thống đặt bàn hoặc email.
- Ảnh trong `public/images` là ảnh Unsplash dùng làm placeholder. Nên thay bằng ảnh chụp thật của nhà hàng.
- Hero đang dùng ảnh tĩnh với hiệu ứng Ken Burns và than hồng bay. Nếu có video quay chậm, thay vào `src/components/home/hero.tsx`.
- Nội dung (giá, địa chỉ, số điện thoại, tên bếp trưởng) là dữ liệu mẫu.
