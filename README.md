# Beige Tau - Steakhouse website

Next.js 16 (App Router) + Tailwind CSS v4 + Motion + Lenis. Concept: "The Art of Fire & Time".

## Chạy dự án

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

Trang có 4 ngôn ngữ: Tiếng Việt (`/vi`, mặc định), English (`/en`), ລາວ (`/lo`), 简体中文 (`/zh`). Truy cập `/` sẽ được chuyển tới ngôn ngữ đã chọn trước đó (cookie `NEXT_LOCALE`) hoặc theo ngôn ngữ trình duyệt.

Đặt `NEXT_PUBLIC_SITE_URL` (ví dụ `https://beigetau.la`) để canonical URL, Open Graph, sitemap và JSON-LD dùng đúng tên miền.

## Cấu trúc

| Đường dẫn | Nội dung |
|---|---|
| `src/app/[lang]/page.tsx` | Trang chủ: Hero, Brand Story, Cut Showcase + drawer, Atmosphere (cuộn ngang), CTA đặt bàn |
| `src/app/[lang]/craft` | Timeline ủ khô 30/60/90 ngày, bếp trưởng, bento lửa củi |
| `src/app/[lang]/menu` | Tab thực đơn, bộ trực quan độ chín (slider), gợi ý vang |
| `src/app/[lang]/gallery` | Masonry có bộ lọc + lightbox (phím mũi tên) |
| `src/app/[lang]/private-dining` | Phòng riêng, form đặt bàn (react-hook-form + zod + server action), bản đồ |
| `src/proxy.ts` | Chuyển URL không có tiền tố ngôn ngữ tới `/vi`, `/en`, `/lo` hoặc `/zh` |
| `src/i18n/dictionaries/*.ts` | Toàn bộ chữ hiển thị theo từng ngôn ngữ (`vi.ts` là bản gốc) |
| `src/lib/data.ts` | Dữ liệu không phụ thuộc ngôn ngữ: id, ảnh, giá, độ chín, phòng |
| `src/lib/site.ts` | Tên, số điện thoại, toạ độ, đường dẫn điều hướng |
| `src/app/globals.css` | Design tokens (màu, font, easing), grain overlay, chỉnh font cho chữ Lào/Trung |

## Việc còn lại trước khi lên production

- `src/app/private-dining/actions.ts` mới chỉ xác nhận yêu cầu, chưa lưu hay gửi đi. Cần nối với hệ thống đặt bàn hoặc email.
- Ảnh trong `public/images` là ảnh Unsplash dùng làm placeholder. Nên thay bằng ảnh chụp thật của nhà hàng.
- Hero đang dùng ảnh tĩnh với hiệu ứng Ken Burns và than hồng bay. Nếu có video quay chậm, thay vào `src/components/home/hero.tsx`.
- Nội dung (giá, địa chỉ, số điện thoại, tên bếp trưởng) là dữ liệu mẫu.
- Bản dịch tiếng Lào và tiếng Trung cần người bản ngữ rà soát trước khi lên production.
