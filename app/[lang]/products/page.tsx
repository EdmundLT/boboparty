import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";
import { getCollections, getProducts } from "@/lib/products";
import CategoryGrid from "@/components/CategoryGrid";
import ProductsExplorer from "@/components/ProductsExplorer";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = lang === "zh-TW" ? "" : "/en";

  let collections = [];
  let products = [];
  let errorMessage: string | null = null;

  try {
    [collections, products] = await Promise.all([getCollections(), getProducts()]);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unable to load products.";
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900">{dict.products.title}</h1>
          <p className="text-gray-600 mt-2">{dict.products.subtitle}</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {collections.length ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{dict.products.categoriesTitle}</h2>
              <p className="text-gray-600 mt-1">{dict.products.categoriesSubtitle}</p>
            </div>
            <CategoryGrid categories={collections} baseUrl={baseUrl} />
          </div>
        ) : null}

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">{dict.products.allProductsTitle}</h2>
          <ProductsExplorer products={products} baseUrl={baseUrl} dict={dict} />
        </div>
      </section>
    </div>
  );
}
