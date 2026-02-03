import Link from "next/link";
import Image from "next/image";
import type { ProductCategory } from "@/types";

type ShopByCategoryProps = {
  categories: ProductCategory[];
  baseUrl: string;
  dict: {
    home: {
      categories: {
        title: string;
        subtitle: string;
        productsCount: string;
      };
    };
  };
};

export default function ShopByCategory({ categories, baseUrl, dict }: ShopByCategoryProps) {
  // Show max 6 categories
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            {dict.home.categories.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {dict.home.categories.subtitle}
          </p>
        </div>

        {/* Category Grid */}
        {displayCategories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                href={`${baseUrl}/category/${category.handle}`}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                {/* Image/Gradient Background */}
                <div className="relative h-48 sm:h-64 lg:h-72 bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
                  {category.imageUrl ? (
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl sm:text-7xl">
                      {category.emoji || "🎈"}
                    </div>
                  )}
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-white/90 line-clamp-2 mb-2 drop-shadow hidden sm:block">
                        {category.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium">
                      <span>{dict.home.categories.productsCount}</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="text-6xl mb-4">📂</div>
            <p className="text-lg">No categories available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
