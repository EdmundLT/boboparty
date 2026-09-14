import type { Locale } from "@/i18n.config";
import { pageMetadata } from "@/lib/seo";
import { getDictionary } from "@/lib/get-dictionary";
import { SHOP_LOCATIONS } from "@/data/stores";
import PageIntro from "@/components/PageIntro";
import StoreInfo from "@/components/StoreInfo";
import EnquiryCTA from "@/components/EnquiryCTA";
const copy = {
  "zh-TW": [
    "聯絡 BoboParty｜屯門、葵芳及沙田門市",
    "查看 BoboParty 香港三間門市地址與營業時間，查詢氣球佈置、派對用品與自取安排。前往屯門華都商場、葵涌廣場或石門京瑞廣場前，可先透過 WhatsApp 確認所需款式。",
  ],
  en: [
    "Contact BoboParty & Hong Kong stores",
    "Find BoboParty stores in Tuen Mun, Kwai Fong and Shek Mun. Enquire about balloon decoration, party supplies and collection, and confirm specific items on WhatsApp before visiting.",
  ],
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return pageMetadata(lang, "/contact", copy[lang][0], copy[lang][1]);
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return (
    <>
      <PageIntro
        lang={lang}
        eyebrow="Contact / 到店聊聊"
        title={copy[lang][0]}
        description={copy[lang][1]}
      />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="mb-8 text-3xl font-black text-[#173f5f]">
          {lang === "en" ? "Visit a store" : "分店位置與營業時間"}
        </h2>
        <StoreInfo locations={SHOP_LOCATIONS} dict={dict} />
        <p className="mt-7 text-sm leading-7 text-[#66717b]">
          {lang === "en"
            ? "For holiday opening hours, specific stock or a collection appointment, please confirm with the team before travelling."
            : "假期營業時間、指定款式庫存與自取安排，請於出發前向團隊確認。"}
        </p>
      </section>
      <EnquiryCTA lang={lang} />
    </>
  );
}
