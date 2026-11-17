import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

// Add new public routes here so search engines can find them.
const routes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/privacy", priority: 0.2 },
  { path: "/sms-terms", priority: 0.2 },
  { path: "/services", priority: 0.9 },
  ...services.map((s) => ({ path: s.href, priority: 0.9 })),
  { path: "/pricing", priority: 0.8 },
  { path: "/industries", priority: 0.8 },
  ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.8 })),
  { path: "/about", priority: 0.6 },
  { path: "/book", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
