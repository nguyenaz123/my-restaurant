import { ButtonLink } from "@/components/ui/button-link";
import { getDictionary } from "@/i18n/server";

export default async function NotFound() {
  const dict = await getDictionary();
  return (
    <section className="flex min-h-[100dvh] items-center">
      <div className="mx-auto w-full max-w-[1400px] px-4 md:px-10">
        <p className="font-display text-8xl font-light italic text-gold md:text-[10rem]">404</p>
        <h1 className="mt-4 max-w-xl font-display text-4xl font-light text-cream md:text-5xl">{dict.notFound.title}</h1>
        <p className="mt-4 max-w-[44ch] text-smoke">{dict.notFound.text}</p>
        <div className="mt-10">
          <ButtonLink href="/">{dict.notFound.home}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
