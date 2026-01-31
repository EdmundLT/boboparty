import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";
import { getProductByHandle } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = (await params) as { lang: Locale; id: string };
  const dict = await getDictionary(lang);

  let data = null;
  let errorMessage: string | null = null;

  try {
    data = await getProductByHandle(id);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unable to load product.";
  }

  if (!data && !errorMessage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            {dict.products.productNotFound}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 mb-6">
            {errorMessage}
          </div>
        ) : null}
        {data ? <ProductDetail product={data.product} variants={data.variants} /> : null}
      </section>
    </div>
  );
}
