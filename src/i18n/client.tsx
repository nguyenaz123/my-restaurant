"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { localizePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/vi";

type I18n = {
  locale: Locale;
  dict: Dictionary;
  /** Locale-prefixed internal path. */
  href: (path: string) => string;
};

const I18nContext = createContext<I18n | null>(null);

/** Set once in the `[lang]` layout; client components read the dictionary through `useI18n`. */
export function I18nProvider({ locale, dict, children }: { locale: Locale; dict: Dictionary; children: ReactNode }) {
  const value = useMemo(() => ({ locale, dict, href: (path: string) => localizePath(locale, path) }), [locale, dict]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
}
