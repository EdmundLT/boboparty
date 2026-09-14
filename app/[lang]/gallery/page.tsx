import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { localPath, pageMetadata } from "@/lib/seo";
import PageIntro from "@/components/PageIntro";
import InstagramSection from "@/components/InstagramSection";
import ServiceCards from "@/components/ServiceCards";
const copy = {
  "zh-TW": [
    "派對佈置靈感與 Instagram 作品",
    "從生日會氣球配色到婚禮背景，透過 BoboParty Instagram 精選貼文尋找靈感。整理你喜歡的色調、佈置比例與場景，再按自己的場地和預算討論方案。",
  ],
  en: [
    "Party inspiration & Instagram highlights",
    "Find inspiration in selected BoboParty Instagram posts, from birthday balloons to celebration backdrops. Collect colours, proportions and settings you like, then adapt the ideas to your venue and budget.",
  ],
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return pageMetadata(lang, "/gallery", copy[lang][0], copy[lang][1]);
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return (
    <>
      <PageIntro
        lang={lang}
        eyebrow="Inspiration / 找到你的派對方向"
        title={copy[lang][0]}
        description={copy[lang][1]}
      />
      <InstagramSection lang={lang} />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="mb-4 text-3xl font-black text-[#173f5f]">
          {lang === "en"
            ? "Turn inspiration into a plan"
            : "把靈感變成適合你的方案"}
        </h2>
        <p className="mb-8 max-w-3xl leading-8 text-[#66717b]">
          {lang === "en"
            ? "Save references and note what you like about each: colour, shape or arrangement. A photograph does not show venue access, materials or installation time, so confirm the scope before booking."
            : "收藏參考圖片時，可記下喜歡的是色調、形狀還是擺放方式。照片未必呈現場地出入限制、物料與安裝時間，因此需要按實際環境確認方案。"}
        </p>
        <ServiceCards lang={lang} />
        <Link
          href={localPath(lang, "/blog")}
          className="mt-8 inline-block font-bold text-[#173f5f] underline underline-offset-4"
        >
          {lang === "en"
            ? "Read our party planning articles →"
            : "閱讀派對籌備文章 →"}
        </Link>
      </section>
    </>
  );
}
