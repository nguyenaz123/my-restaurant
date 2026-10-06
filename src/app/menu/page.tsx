import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { MenuTabs } from "@/components/menu/menu-tabs";
import { DonenessVisualizer } from "@/components/menu/doneness-visualizer";
import { WinePairing } from "@/components/menu/wine-pairing";

export const metadata: Metadata = {
  title: "Thực đơn",
  description:
    "Thực đơn Wagyu A5, Black Angus Dry-Aged 30 - 90 ngày, hầm rượu 400 nhãn và món ăn kèm nướng than. Kèm hướng dẫn độ chín và gợi ý vang.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Thực đơn"
        title={
          <>
            Từ buồng ủ <span className="italic text-gold">đến ngọn lửa</span>
          </>
        }
        intro="Thực đơn thay đổi theo lô thịt mỗi tuần. Giá đã bao gồm thuế, chưa gồm phí phục vụ 5%."
        image="/images/sizzling.jpg"
        imageAlt="Lát bò nướng cùng măng tây trên chảo gang nóng"
      />
      <MenuTabs />
      <DonenessVisualizer />
      <WinePairing />
    </>
  );
}
