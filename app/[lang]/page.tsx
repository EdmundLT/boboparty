import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n.config";
import HeroSection from "@/components/HeroSection";
import TrustBanner from "@/components/TrustBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import ShopByCategory from "@/components/ShopByCategory";
import InstagramGrid from "@/components/InstagramGrid";
import StoreInfo from "@/components/StoreInfo";
import { getProducts, getCollections } from "@/lib/products";
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

  // Fetch products and categories from Shopify
  const [products, collections] = await Promise.all([
    getProducts(12), // Get 12 products, we'll show top 8
    getCollections(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection dict={dict} baseUrl={baseUrl} />
      <TrustBanner dict={dict} />

      {/* Featured Products Section */}
      <FeaturedProducts products={products} baseUrl={baseUrl} dict={dict} />

      {/* Shop by Category Section */}
      <ShopByCategory categories={collections} baseUrl={baseUrl} dict={dict} />

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {lang === 'zh-TW' ? '為什麼選擇我們' : 'Why Choose Us'}
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {lang === 'zh-TW' ? '專業團隊，優質產品，貼心服務' : 'Professional team, quality products, attentive service'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{lang === 'zh-TW' ? '專業佈置' : 'Professional Setup'}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {lang === 'zh-TW' ? '經驗豐富的團隊為您打造完美派對佈置，讓每個細節都充滿驚喜' : 'Experienced team creating perfect party decorations with attention to every detail'}
              </p>
            </div>

            <div className="group bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{lang === 'zh-TW' ? '快速服務' : 'Fast Service'}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {lang === 'zh-TW' ? '三間實體店舖，提供快捷便利的服務，隨時為您準備' : 'Three physical stores for quick and convenient service whenever you need'}
              </p>
            </div>

            <div className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{lang === 'zh-TW' ? '優質保證' : 'Quality Guaranteed'}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {lang === 'zh-TW' ? '精選優質派對用品，每件商品都經過嚴格品質把關' : 'Carefully selected quality party supplies with strict quality control'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">{dict.home.instagram.title}</h2>
            <p className="text-base sm:text-lg text-gray-600">{dict.home.instagram.subtitle}</p>
          </div>

          <InstagramGrid posts={INSTAGRAM_FEATURED_POSTS} dict={dict} />
        </div>
      </section>

      {/* Store Locations Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StoreInfo locations={SHOP_LOCATIONS} dict={dict} />
        </div>
      </section>
    </div>
  );
}
