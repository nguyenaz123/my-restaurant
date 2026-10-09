/**
 * Locale registry. Safe to import from the proxy, server and client code.
 * Every route lives under `/[lang]`; visitors without a NEXT_LOCALE cookie land
 * on `defaultLocale` (Lao) and pick another language from the first-visit popup.
 */
export const locales = ["lo", "vi", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "lo";

/** Cookie written by the language switcher; it wins over Accept-Language. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export const localeMeta: Record<
  Locale,
  { label: string; short: string; htmlLang: string; hreflang: string; ogLocale: string; intl: string }
> = {
  vi: { label: "Tiếng Việt", short: "VI", htmlLang: "vi", hreflang: "vi", ogLocale: "vi_VN", intl: "vi-VN" },
  en: { label: "English", short: "EN", htmlLang: "en", hreflang: "en", ogLocale: "en_US", intl: "en-GB" },
  lo: { label: "ພາສາລາວ", short: "ລາວ", htmlLang: "lo", hreflang: "lo", ogLocale: "lo_LA", intl: "lo-LA" },
  zh: { label: "简体中文", short: "中文", htmlLang: "zh-Hans", hreflang: "zh-Hans", ogLocale: "zh_CN", intl: "zh-CN" },
};

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Prefixes an internal path with the locale: ("en", "/menu#x") -> "/en/menu#x". External links pass through. */
export function localizePath(locale: Locale, path: string) {
  if (!path.startsWith("/")) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Swaps the locale segment of the current pathname, keeping the rest of the route. */
export function switchLocalePath(pathname: string, to: Locale) {
  const [, first, ...rest] = pathname.split("/");
  const tail = first && hasLocale(first) ? rest : [first, ...rest].filter(Boolean);
  return localizePath(to, `/${tail.join("/")}`);
}
