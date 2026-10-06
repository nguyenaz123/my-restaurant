import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { MasonryGallery } from "@/components/gallery/masonry-gallery";

export const metadata: Metadata = {
  title: "Không gian & Bộ sưu tập",
  description: "Kiến trúc, phòng tiệc riêng và ánh sáng tại Ember & Age: gỗ óc chó, đá bazan, đồng thau và lò than ở trung tâm.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ambiance"
        title={
          <>
            Nơi bóng tối <span className="italic text-gold">giữ lấy ánh lửa</span>
          </>
        }
        intro="Chúng tôi thiết kế ánh sáng như một nhiếp ảnh gia: một nguồn sáng ấm, phần còn lại để bóng tối kể chuyện."
        image="/images/dining-room.jpg"
        imageAlt="Phòng ăn chính với đèn bàn ấm và ghế da tối màu"
      />
      <MasonryGallery />
    </>
  );
}
