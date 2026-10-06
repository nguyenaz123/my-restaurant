import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100dvh] items-center">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-10">
        <p className="font-display text-8xl font-light italic text-gold md:text-[10rem]">404</p>
        <h1 className="mt-4 max-w-xl font-display text-4xl font-light text-cream md:text-5xl">
          Trang này đã cháy thành than.
        </h1>
        <p className="mt-4 max-w-[44ch] text-smoke">Đường dẫn không còn tồn tại. Hãy quay về và bắt đầu lại từ ngọn lửa.</p>
        <div className="mt-10">
          <ButtonLink href="/">Về trang chủ</ButtonLink>
        </div>
      </div>
    </section>
  );
}
