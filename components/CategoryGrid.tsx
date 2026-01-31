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
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`${baseUrl}/category/${category.slug}`}
          className="group rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div className="relative h-44 w-full bg-gray-100">
            {category.imageUrl ? (
              <Image
                src={category.imageUrl}
                alt={category.displayName}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400 text-sm">
                No image
              </div>
            )}
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900">{category.displayName}</h3>
            {category.description ? (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {category.description}
              </p>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
