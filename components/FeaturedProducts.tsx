import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

type FeaturedProductsProps = {
  products: Product[];
  baseUrl: string;
  dict: {
    home: {
      featured: {
        title: string;
        subtitle: string;
        viewAll: string;
      };
    };
  };
};

export default function FeaturedProducts({ products, baseUrl, dict }: FeaturedProductsProps) {
  // Show max 8 products
  const displayProducts = products.slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              {dict.home.featured.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {dict.home.featured.subtitle}
            </p>
          </div>
          <Link
            href={`${baseUrl}/products`}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-150 active:scale-95"
          >
            <span>{dict.home.featured.viewAll}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Product Grid */}
        {displayProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} baseUrl={baseUrl} />
              ))}
            </div>

            {/* Mobile View All Button */}
            <div className="mt-8 sm:hidden">
              <Link
                href={`${baseUrl}/products`}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 text-base font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-150 active:scale-95"
              >
                <span>{dict.home.featured.viewAll}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="text-6xl mb-4">🎈</div>
            <p className="text-lg">No featured products available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
