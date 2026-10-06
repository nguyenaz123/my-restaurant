import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { localizePath } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/server";

export async function SiteFooter() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const t = dict.footer;
  return (
    <footer className="relative overflow-hidden border-t border-cream/[0.06] bg-obsidian">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 pb-10 pt-24 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <p className="font-display text-3xl leading-tight text-cream">
            {t.tagline}
            <br />
            <span className="italic text-gold">{t.taglineAccent}</span>
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-6">
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-smoke">{t.address}</h2>
          <address className="space-y-1 text-sm not-italic leading-relaxed text-cream/80">
            <p>{dict.contact.street}</p>
            <p>{dict.contact.area}</p>
            <p className="pt-2">
              <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="text-gold transition-colors duration-500 ease-silk hover:text-gold-bright">
                {dict.contact.directions}
              </a>
            </p>
            <p className="pt-3">
              <a href={site.phoneHref} className="transition-colors duration-500 ease-silk hover:text-gold-bright">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="transition-colors duration-500 ease-silk hover:text-gold-bright">
                {site.email}
              </a>
            </p>
          </address>
        </div>

        <div className="md:col-span-2">
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-smoke">{t.hours}</h2>
          <dl className="space-y-3 text-sm text-cream/80">
            {dict.contact.hours.map((h) => (
              <div key={h.days}>
                <dt className="text-cream">{h.days}</dt>
                <dd className="text-smoke">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <nav aria-label={t.navLabel} className="md:col-span-2">
          <h2 className="mb-4 text-xs uppercase tracking-[0.2em] text-smoke">{t.explore}</h2>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={localizePath(locale, l.href)} className="text-cream/80 transition-colors duration-500 ease-silk hover:text-gold-bright">
                  {dict.nav[l.key]}
                </Link>
              </li>
            ))}
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cream/80 transition-colors duration-500 ease-silk hover:text-gold-bright"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-4 pb-6 text-xs text-smoke md:flex-row md:justify-between md:px-10">
        <p>
          © {new Date().getFullYear()} {site.name}. {t.drink}
        </p>
        <p>{t.groups}</p>
      </div>

      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap px-4 pb-4 text-center font-display text-[19vw] leading-[0.8] text-cream/[0.035] md:text-[16vw]"
      >
        Ember &amp; Age
      </p>
    </footer>
  );
}
