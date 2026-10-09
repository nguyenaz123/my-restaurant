import type { MetadataRoute } from "next";
import { defaultLocale } from "@/i18n/config";
import { loadDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { themeColors } from "@/lib/theme";

/**
 * Web app manifest, so "Add to Home Screen" opens the site full screen like an app.
 * `start_url` is unprefixed: the proxy sends it to the saved language (or Lao).
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const dict = await loadDictionary(defaultLocale);
  return {
    id: "/",
    name: site.name,
    short_name: site.name,
    description: dict.meta.description,
    lang: defaultLocale,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: themeColors.ember,
    theme_color: themeColors.ember,
    categories: ["food", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
