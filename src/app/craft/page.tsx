import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { AgingTimeline } from "@/components/craft/aging-timeline";
import { ChefProfile, FireBento } from "@/components/craft/mastery";
import { ButtonLink } from "@/components/ui/button-link";
import { cta } from "@/lib/site";
import { AddressLink } from "@/components/ui/address-link";

export const metadata: Metadata = {
  title: "Nghệ thuật ủ khô & lửa củi",
  description:
    "Quy trình ủ khô bò 30, 60, 90 ngày trong buồng đá muối Himalaya và kỹ thuật nướng than gỗ nhãn của bếp trưởng Julien Marchand.",
  alternates: { canonical: "/craft" },
};

export default function CraftPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Craft"
        title={
          <>
            Thời gian là nguyên liệu <span className="italic text-gold">đắt nhất</span>
          </>
        }
        intro="Không có công thức bí mật. Chỉ có buồng ủ lạnh, ngọn lửa than nhãn và sự kiên nhẫn được đo bằng tuần."
        image="/images/chef-flambe.jpg"
        imageAlt="Bếp trưởng đốt lửa flambé, ngọn lửa bùng lên trên chảo"
      />
      <AgingTimeline />
      <ChefProfile />
      <FireBento />
      <section className="pb-32">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start gap-8 px-4 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="max-w-xl font-display text-3xl font-light leading-tight text-cream md:text-4xl">
              Đã đến lúc nếm thử thành quả của thời gian.
            </p>
            <AddressLink className="mt-5" />
          </div>
          <ButtonLink href={cta.menu.href}>{cta.menu.label}</ButtonLink>
        </div>
      </section>
    </>
  );
}
