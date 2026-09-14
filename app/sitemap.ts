import type { MetadataRoute } from "next";
import services from "@/data/services.json";
import { getBlogPosts } from "@/lib/blogs";
import { absoluteUrl } from "@/lib/seo";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts("zh-TW");
  const paths = [
    "",
    "/services",
    "/gallery",
    "/planning",
    "/contact",
    "/about",
    "/blog",
    ...services.map((s) => `/services/${s.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.flatMap((path) =>
    (["zh-TW", "en"] as const).map((lang) => ({
      url: absoluteUrl(lang, path),
      alternates: {
        languages: {
          "zh-Hant-HK": absoluteUrl("zh-TW", path),
          en: absoluteUrl("en", path),
        },
      },
    })),
  );
}
