import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/content/services";
import { solutions } from "@/content/solutions";
import { useCases } from "@/content/use-cases";
import { insights } from "@/content/insights";

/** Only approved content is listed. Drafts are noindex and excluded here. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const u = (path: string, priority = 0.7, changeFrequency: "weekly" | "monthly" = "monthly") =>
    ({ url: `${site.url}${path}`, lastModified: now, changeFrequency, priority });
  return [
    u("/", 1, "weekly"),
    u("/about", 0.8), u("/about/expertise"), u("/about/responsible-ai"), u("/research", 0.8),
    u("/services", 0.9), ...services.map((s) => u(`/services/${s.slug}`, 0.9)),
    u("/solutions", 0.8), ...solutions.filter((s) => s.status === "approved").map((s) => u(`/solutions/${s.slug}`)),
    u("/use-cases", 0.8, "weekly"), ...useCases.filter((x) => x.status === "approved").map((x) => u(`/use-cases/${x.slug}`)),
    u("/insights", 0.7, "weekly"),
    ...insights.filter((i) => i.status === "approved").map((i) => ({ ...u(`/insights/${i.slug}`, 0.6), lastModified: i.publishedAt ? new Date(i.publishedAt) : now })),
    u("/contact", 0.8), u("/privacy", 0.3), u("/accessibility", 0.3),
  ];
}
