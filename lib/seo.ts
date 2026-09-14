import type { Metadata } from "next";
import type { Locale } from "@/i18n.config";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://bobopartyhk.com"
).replace(/\/$/, "");
export const localPath = (lang: Locale, path = "") =>
  `${lang === "en" ? "/en" : ""}${path}` || "/";
export const absoluteUrl = (lang: Locale, path = "") =>
  `${SITE_URL}${localPath(lang, path)}`;
export function pageMetadata(
  lang: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const fullTitle = `${title} | BoboParty`;
  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: absoluteUrl(lang, path),
      languages: {
        "zh-Hant-HK": absoluteUrl("zh-TW", path),
        en: absoluteUrl("en", path),
        "x-default": absoluteUrl("zh-TW", path),
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(lang, path),
      siteName: "BoboParty",
      locale: lang === "en" ? "en_HK" : "zh_HK",
      alternateLocale: lang === "en" ? "zh_HK" : "en_HK",
      type: "website",
      images: [{ url: `${SITE_URL}/hero1.jpg`, alt: "BoboParty" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${SITE_URL}/hero1.jpg`],
    },
  };
}
