import type { Locale } from "@/i18n/config";
import type { Dictionary } from "./vi";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  vi: () => import("./vi").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
  lo: () => import("./lo").then((m) => m.default),
  zh: () => import("./zh").then((m) => m.default),
};

/** Loads one locale's dictionary. Use `getDictionary()` in Server Components; this is for Server Actions. */
export const loadDictionary = (locale: Locale) => dictionaries[locale]();
