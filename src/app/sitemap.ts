import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "about/", "sankalpas/", "events/", "calendar/", "contact-us/", "join/", "support/", "privacy/", "accessibility/"].map(path => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: path === "" || path === "events/" || path === "calendar/" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "privacy/" || path === "accessibility/" ? 0.3 : 0.7,
  }));
}
