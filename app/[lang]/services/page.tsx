import type { Locale } from "@/i18n.config";
import { pageMetadata } from "@/lib/seo";
import PageIntro from "@/components/PageIntro";
import ServiceCards from "@/components/ServiceCards";
import EnquiryCTA from "@/components/EnquiryCTA";
const copy = {
  "zh-TW": [
    "香港派對佈置服務",
    "由生日會、百日宴到婚禮及公司開幕，從活動場合找到適合你的佈置方向。探索氣球藝術、背景設計與 DIY 用品建議，再按場地、預算及時間確認方案。",
  ],
  en: [
    "Party styling services in Hong Kong",
    "From birthdays and baby celebrations to weddings and company openings, find a starting point for your event. Explore balloon styling, backdrops and DIY advice, then shape a plan around your venue, budget and timing.",
  ],
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return pageMetadata(lang, "/services", copy[lang][0], copy[lang][1]);
}
export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return (
    <>
      <PageIntro
        lang={lang}
        eyebrow="Services / 場合與佈置"
        title={copy[lang][0]}
        description={copy[lang][1]}
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="mb-8 text-2xl font-black text-[#173f5f]">
          {lang === "en" ? "What are you celebrating?" : "這次，你想慶祝甚麼？"}
        </h2>
        <ServiceCards lang={lang} />
      </section>
      <EnquiryCTA lang={lang} />
    </>
  );
}
