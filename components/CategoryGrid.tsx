import Image from "next/image";
import Link from "next/link";
import type { ProductCategory } from "@/types";

type CategoryGridProps = {
  categories: ProductCategory[];
  baseUrl: string;
};

export default function CategoryGrid({ categories, baseUrl }: CategoryGridProps) {
  if (!categories.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`${baseUrl}/category/${category.slug}`}
          className="group rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all active:scale-95 overflow-hidden"
        >
          <div className="relative h-32 sm:h-44 w-full bg-gradient-to-br from-gray-100 to-gray-50">
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.displayName}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-4xl sm:text-5xl">🎈</span>
              </div>
            )}
          </div>
          <div className="p-3 sm:p-5">
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900 line-clamp-1">{category.displayName}</h3>
            {category.description ? (
              <p className="hidden sm:block mt-2 text-sm text-gray-600 line-clamp-2">
                {category.description}
              </p>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
