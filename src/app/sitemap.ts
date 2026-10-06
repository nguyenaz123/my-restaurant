import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/menu", priority: 0.9 },
    { path: "/private-dining", priority: 0.9 },
    { path: "/craft", priority: 0.7 },
    { path: "/gallery", priority: 0.6 },
  ];
  return routes.map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
