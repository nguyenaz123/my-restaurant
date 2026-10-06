import type { Metadata } from "next";
import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Bezel } from "@/components/ui/bezel";
import { ReservationForm } from "@/components/contact/reservation-form";
import { RoomCard } from "@/components/private-dining/room-card";
import { rooms } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Phòng riêng & Đặt bàn",
  description:
    "Đặt bàn và phòng ăn riêng tại Ember & Age: The Cellar Room tối đa 14 khách, The Ember Room và Chef's Counter. 26 Đông Du, Quận 1.",
  alternates: { canonical: "/private-dining" },
};

export default function PrivateDiningPage() {
  const [lead, ...others] = rooms;

  return (
    <>
      <PageHeader
        eyebrow="Private Dining"
        title={
          <>
            Đóng cửa lại, <span className="italic text-gold">để bữa tối là của riêng bạn</span>
          </>
        }
        intro="Ba không gian riêng cho từ 2 đến 14 khách, mỗi phòng có thực đơn và người phục vụ riêng."
        image="/images/table-setting.jpg"
        imageAlt="Bàn tiệc riêng bày ly pha lê và đĩa sứ dưới ánh nến"
      />

      <section aria-labelledby="rooms-title" className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-4 md:px-10">
          <h2 id="rooms-title" className="sr-only">
            Các phòng riêng
          </h2>
          <div className="grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <RoomCard room={lead} lead />
            </Reveal>

            <div className="grid gap-6 lg:col-span-5">
              {others.map((room, i) => (
                <Reveal key={room.name} delay={0.1 + i * 0.1}>
                  <RoomCard room={room} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="reserve" aria-labelledby="reserve-form-title" className="scroll-mt-28 py-20 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-14 px-4 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="reserve-form-title" className="font-display text-4xl font-light leading-[1.05] text-cream md:text-5xl">
              Giữ một chỗ <span className="italic text-gold">bên ngọn lửa</span>
            </h2>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-smoke">
              Với nhóm từ 6 khách hoặc phòng riêng, vui lòng đặt trước ít nhất 48 giờ.
            </p>

            <ul className="mt-10 space-y-6 text-sm">
              <li className="flex gap-4">
                <MapPin size={22} weight="light" className="shrink-0 text-gold" />
                <span className="text-cream/85">
                  {site.address.street}
                  <br />
                  {site.address.district}, {site.address.city}
                </span>
              </li>
              <li className="flex gap-4">
                <Clock size={22} weight="light" className="shrink-0 text-gold" />
                <span className="text-cream/85">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: <span className="text-smoke">{h.time}</span>
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex gap-4">
                <Phone size={22} weight="light" className="shrink-0 text-gold" />
                <a href={site.phoneHref} className="text-cream/85 transition-colors duration-500 ease-silk hover:text-gold-bright">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-4">
                <EnvelopeSimple size={22} weight="light" className="shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="text-cream/85 transition-colors duration-500 ease-silk hover:text-gold-bright">
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-10 rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-char">
                <iframe
                  title={`Bản đồ đến ${site.name}`}
                  src={`https://maps.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full [filter:grayscale(1)_invert(0.92)_contrast(0.85)_sepia(0.25)]"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Bezel innerClassName="p-6 md:p-10">
              <ReservationForm />
            </Bezel>
          </div>
        </div>
      </section>
    </>
  );
}
