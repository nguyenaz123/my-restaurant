import type { Metadata } from "next";
import { defaultLocale, localeMeta, localizePath, locales, type Locale } from "@/i18n/config";

/** hreflang map for one route: { vi: "/vi/menu", en: "/en/menu", ..., "x-default": "/vi/menu" }. */
export function languageAlternates(path: string) {
  return Object.fromEntries([
    ...locales.map((l) => [localeMeta[l].hreflang, localizePath(l, path)]),
    ["x-default", localizePath(defaultLocale, path)],
  ]) as Record<string, string>;
}

export function pageAlternates(locale: Locale, path: string): Metadata["alternates"] {
  return { canonical: localizePath(locale, path), languages: languageAlternates(path) };
}
