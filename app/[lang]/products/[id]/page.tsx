import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import { getProductByHandle } from "@/lib/products";
import ProductDetail from "@/components/ProductDetail";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const data = await getProductByHandle(id);
    
    if (!data) {
      return {
        title: "Product Not Found",
        description: "The product you are looking for could not be found.",
      };
    }

    const { product } = data;
    const seoTitle = product.seo?.title || product.name;
    const seoDescription = product.seo?.description || product.description;
    const imageUrl = product.imageUrls[0];
    const price = new Intl.NumberFormat("en-HK", {
      style: "currency",
      currency: "HKD",
      maximumFractionDigits: 0,
    }).format(product.price);

    return {
      title: seoTitle,
      description: seoDescription,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: imageUrl ? [{ url: imageUrl, alt: product.name }] : [],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: imageUrl ? [imageUrl] : [],
      },
      other: {
        "product:price:amount": product.price.toString(),
        "product:price:currency": "HKD",
        "og:price:amount": product.price.toString(),
        "og:price:currency": "HKD",
      },
    };
  } catch (error) {
    return {
      title: "Product Error",
      description: "Unable to load product information.",
    };
  }
}

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
        {data ? <ProductDetail product={data.product} variants={data.variants} dict={dict.cart} /> : null}
      </section>
    </div>
  );
}
