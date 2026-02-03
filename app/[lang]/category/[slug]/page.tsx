import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { getCollectionWithProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const data = await getCollectionWithProducts(slug);
    
    if (!data) {
      return {
        title: "Category Not Found",
        description: "The category you are looking for could not be found.",
      };
    }

    const { collection, products } = data;
    const seoTitle = collection.seo?.title || collection.displayName;
    const seoDescription = collection.seo?.description || collection.description || `Shop ${collection.displayName} products`;
    const imageUrl = collection.imageUrl || products[0]?.imageUrls[0];

    return {
      title: seoTitle,
      description: seoDescription,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: imageUrl ? [{ url: imageUrl, alt: collection.displayName }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "Category Error",
      description: "Unable to load category information.",
    };
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = (await params) as { lang: Locale; slug: string };
  const dict = await getDictionary(lang);
  const baseUrl = lang === "zh-TW" ? "" : "/en";

  let data = null;
  let errorMessage: string | null = null;

  try {
    data = await getCollectionWithProducts(slug);
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Unable to load category.";
  }

  if (!data && !errorMessage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
            {dict.products.categoryNotFound}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-sm text-gray-500">{dict.products.categoryLabel}</p>
          <h1 className="text-3xl font-bold text-gray-900">{data?.collection.displayName}</h1>
          {data?.collection.description ? (
            <p className="text-gray-600 mt-2">{data.collection.description}</p>
          ) : null}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {data ? <ProductGrid products={data.products} baseUrl={baseUrl} /> : null}
      </section>
    </div>
  );
}
