import Image from "next/image";
import { Fire, Knife, Thermometer } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";

export function ChefProfile() {
  return (
    <section aria-labelledby="chef-title" className="py-28 md:py-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-4 md:px-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="rounded-[1.75rem] bg-cream/[0.03] p-1.5 hairline">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
              <Image
                src="/images/chef-plating.jpg"
                alt="Bếp trưởng Julien Marchand hoàn thiện đĩa thịt dưới đèn đồng"
                fill
                quality={70}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <h2 id="chef-title" className="sr-only">
            Bếp trưởng
          </h2>
          <blockquote className="font-display text-3xl font-light leading-[1.25] text-cream md:text-[2.75rem]">
            <p>
              “Lửa than không cho phép bạn sai. Bạn phải lắng nghe tiếng mỡ chảy và biết{" "}
              <span className="italic text-gold">chính xác lúc nào nên dừng.</span>”
            </p>
          </blockquote>
          <div className="mt-10">
            <p className="text-cream">Julien Marchand</p>
            <p className="text-sm text-smoke">Bếp trưởng, 14 năm đứng bếp tại Lyon và Melbourne</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FireBento() {
  return (
    <section aria-labelledby="fire-title" className="pb-28 md:pb-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <h2 id="fire-title" className="max-w-3xl font-display text-4xl font-light leading-[1.05] text-cream md:text-6xl">
          Lửa củi và <span className="italic text-gold">con dao của người thợ</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-[340px_340px]">
          <Reveal className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] lg:col-span-7 lg:row-span-2">
            <Image
              src="/images/fire-grill.jpg"
              alt="Ngọn lửa than nhãn liếm quanh miếng thịt bò trên vỉ"
              fill
              quality={70}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col justify-between rounded-[1.75rem] bg-wine/50 p-8 inner-glow lg:col-span-5">
            <Fire size={32} weight="light" className="text-gold-bright" />
            <div>
              <h3 className="font-display text-3xl text-cream">Than gỗ nhãn Hưng Yên</h3>
              <p className="mt-3 max-w-[44ch] leading-relaxed text-cream/75">
                Gỗ nhãn cháy chậm, ít khói, để lại hương ngọt nhẹ. Lò đạt trên 700°C để tạo lớp vỏ cháy cạnh trong vài phút.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.16} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-5">
            <div className="flex flex-col justify-between rounded-[1.75rem] bg-char-2 p-7 inner-glow">
              <Knife size={28} weight="light" className="text-gold-bright" />
              <div>
                <h3 className="font-display text-2xl text-cream">Pha lóc tại chỗ</h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  Cả tảng thịt được cắt mỗi sáng, theo đúng thớ, đúng độ dày đặt hàng.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-[1.75rem] bg-char-2 p-7 inner-glow">
              <Thermometer size={28} weight="light" className="text-gold-bright" />
              <div>
                <h3 className="font-display text-2xl text-cream">Nghỉ thịt</h3>
                <p className="mt-2 text-sm leading-relaxed text-smoke">
                  Mỗi miếng nghỉ trên giá đồng bằng nửa thời gian nướng trước khi ra bàn.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
