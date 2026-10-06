import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/i18n/config";
import { loadDictionary } from "@/i18n/dictionaries";

/** Current locale from the `[lang]` root segment. Server Components only. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary() {
  return loadDictionary(await getLocale());
}
