import { Hero } from "@/components/home/hero";
import { BrandStory } from "@/components/home/brand-story";
import { Atmosphere } from "@/components/home/atmosphere";
import { ReservationCta } from "@/components/home/reservation-cta";
import { MenuTabs } from "@/components/menu/menu-tabs";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button-link";

function MenuHeader() {
  return (
    <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Eyebrow>Thực đơn</Eyebrow>
        <h2 id="menu-title" className="mt-6 font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl">
          Từ buồng ủ <span className="italic text-gold">đến ngọn lửa</span>
        </h2>
        <p className="mt-6 max-w-[55ch] leading-relaxed text-smoke">
          Thực đơn thay đổi theo lô thịt mỗi tuần. Giá đã bao gồm thuế, chưa gồm phí phục vụ 5%.
        </p>
      </div>
      <ButtonLink href="/menu" variant="ghost" className="w-max">
        Thực đơn đầy đủ
      </ButtonLink>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStory />
      <MenuTabs header={<MenuHeader />} />
      <Atmosphere />
      <ReservationCta />
    </>
  );
}
