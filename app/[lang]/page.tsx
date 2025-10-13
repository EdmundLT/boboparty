import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n.config";
import HeroSection from "@/components/HeroSection";
import Carousel from "@/components/Carousel";
import InstagramGrid from "@/components/InstagramGrid";
import StoreInfo from "@/components/StoreInfo";
import { SHOWCASE_ITEMS } from "@/data/showcase";
import { SHOP_LOCATIONS } from "@/data/stores";
import { INSTAGRAM_FEATURED_POSTS } from "@/data/instagram";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = lang === 'zh-TW' ? '' : '/en';

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection dict={dict} baseUrl={baseUrl} />

      {/* Showcase Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{dict.home.showcase.title}</h2>
            <p className="text-xl text-gray-600">{dict.home.showcase.subtitle}</p>
          </div>

          <Carousel items={SHOWCASE_ITEMS} dict={dict} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{lang === 'zh-TW' ? '專業佈置' : 'Professional Setup'}</h3>
              <p className="text-gray-600">
                {lang === 'zh-TW' ? '經驗豐富的團隊為您打造完美派對佈置' : 'Experienced team creating perfect party decorations'}
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{lang === 'zh-TW' ? '快速服務' : 'Fast Service'}</h3>
              <p className="text-gray-600">
                {lang === 'zh-TW' ? '三間實體店舖，提供快捷便利的服務' : 'Three physical stores for quick and convenient service'}
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{lang === 'zh-TW' ? '優質保證' : 'Quality Guaranteed'}</h3>
              <p className="text-gray-600">
                {lang === 'zh-TW' ? '精選優質派對用品，確保最佳效果' : 'Carefully selected quality party supplies for best results'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{dict.home.instagram.title}</h2>
            <p className="text-xl text-gray-600">{dict.home.instagram.subtitle}</p>
          </div>

          <InstagramGrid posts={INSTAGRAM_FEATURED_POSTS} dict={dict} />
        </div>
      </section>

      {/* Store Locations Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StoreInfo locations={SHOP_LOCATIONS} dict={dict} />
        </div>
      </section>
    </div>
  );
}
