import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";
import { pageMetadata, localPath } from "@/lib/seo";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import ServiceCards from "@/components/ServiceCards";
import InstagramSection from "@/components/InstagramSection";
import EnquiryCTA from "@/components/EnquiryCTA";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return pageMetadata(lang, "", dict.home.title, dict.home.description);
}
export default async function Home({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const zh = lang === "zh-TW";
  return (
    <div className="bg-[#f7f2e9]">
      <HeroSection dict={dict} baseUrl={zh ? "" : "/en"} />
      <TrustBanner dict={dict} />
      <section id="services" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-bold tracking-widest text-[#a84135]">
              EVERY OCCASION, YOUR WAY
            </p>
            <h2 className="text-3xl font-black text-[#173f5f] sm:text-5xl">
              {zh
                ? "每個場合，都有自己的故事。"
                : "A celebration for every chapter."}
            </h2>
            <p className="mt-5 max-w-2xl leading-8 text-[#66717b]">
              {zh
                ? "生日、百日宴、婚禮或品牌活動，從你的場合出發，找到合適的香港派對佈置服務。"
                : "Birthdays, baby celebrations, weddings or brand events: find the right starting point for your party styling in Hong Kong."}
            </p>
          </div>
          <Link
            href={localPath(lang, "/services")}
            className="shrink-0 font-bold text-[#173f5f] underline underline-offset-4"
          >
            {zh ? "全部服務 →" : "All services →"}
          </Link>
        </div>
        <ServiceCards lang={lang} />
      </section>
      <section className="bg-white px-5 py-12">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            [
              "/gallery",
              zh ? "先找一點靈感" : "Find your inspiration",
              zh
                ? "查看 Instagram 精選，整理喜歡的色調與場景。"
                : "Explore Instagram highlights and collect your favourite colours.",
            ],
            [
              "/planning",
              zh ? "了解預約流程" : "Plan your next steps",
              zh
                ? "由查詢、方案確認到現場佈置，一步步準備。"
                : "From your enquiry to the setup, prepare one step at a time.",
            ],
            [
              "/contact",
              zh ? "到門市聊聊" : "Visit our stores",
              zh
                ? "屯門、葵芳、沙田石門，查詢用品與自取安排。"
                : "Find our Tuen Mun, Kwai Fong and Shek Mun locations.",
            ],
          ].map(([path, title, text], i) => (
            <Link
              key={path}
              href={localPath(lang, path)}
              className="rounded-3xl bg-[#f7f2e9] p-7 transition hover:bg-[#e7efee]"
            >
              <p className="mb-6 text-sm font-bold text-[#a84135]">
                0{i + 1} / NEXT STEP
              </p>
              <h2 className="text-2xl font-black text-[#173f5f]">{title} ↗</h2>
              <p className="mt-4 leading-7 text-[#66717b]">{text}</p>
            </Link>
          ))}
        </div>
      </section>
      <InstagramSection lang={lang} />
      <div id="contact">
        <EnquiryCTA lang={lang} />
      </div>
    </div>
  );
}
