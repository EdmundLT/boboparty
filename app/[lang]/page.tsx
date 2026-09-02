import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import ServicesOverview from "@/components/ServicesOverview";
import PlanningProcess from "@/components/PlanningProcess";
import WorkShowcase from "@/components/WorkShowcase";
import InstagramGrid from "@/components/InstagramGrid";
import StoreInfo from "@/components/StoreInfo";
import { SHOP_LOCATIONS } from "@/data/stores";
import { INSTAGRAM_FEATURED_POSTS } from "@/data/instagram";
import { SHOWCASE_ITEMS } from "@/data/showcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return {
    title: dict.home.title,
    description: dict.home.description,
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      type: "website",
      locale: lang === "zh-TW" ? "zh_TW" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.title,
      description: dict.home.description,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = lang === 'zh-TW' ? '' : '/en';

  return (
    <div className="min-h-screen bg-[#f7f2e9]">
      <HeroSection dict={dict} baseUrl={baseUrl} />
      <TrustBanner dict={dict} />

      <ServicesOverview lang={lang} />
      <PlanningProcess lang={lang} />
      <WorkShowcase items={SHOWCASE_ITEMS} lang={lang} />

      {/* Instagram Section */}
      <section className="bg-[#e7efee] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="mb-3 text-3xl font-black tracking-[-0.04em] text-[#173f5f] sm:text-4xl lg:text-5xl">{dict.home.instagram.title}</h2>
            <p className="text-base text-[#66717b] sm:text-lg">{dict.home.instagram.subtitle}</p>
          </div>

          <InstagramGrid posts={INSTAGRAM_FEATURED_POSTS} dict={dict} />
        </div>
      </section>

      {/* Store Locations Section */}
      <section id="contact" className="bg-[#f7f2e9] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StoreInfo locations={SHOP_LOCATIONS} dict={dict} />
        </div>
      </section>
    </div>
  );
}
