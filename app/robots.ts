import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/cart",
        "/checkout",
        "/en/cart",
        "/en/checkout",
        "/zh-TW/cart",
        "/zh-TW/checkout",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
