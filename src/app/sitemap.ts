import type { MetadataRoute } from "next";
import { site, routes } from "@/lib/site";
import { localizePath, locales } from "@/i18n/config";
import { languageAlternates } from "@/i18n/metadata";

/** One entry per locale and route, each carrying the hreflang alternates of its siblings. */
export default function sitemap(): MetadataRoute.Sitemap {
  const absolute = (map: Record<string, string>) =>
    Object.fromEntries(Object.entries(map).map(([lang, path]) => [lang, `${site.url}${path}`]));

  return routes.flatMap((r) =>
    locales.map((locale) => ({
      url: `${site.url}${localizePath(locale, r.path)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: r.priority,
      alternates: { languages: absolute(languageAlternates(r.path)) },
    })),
  );
}
