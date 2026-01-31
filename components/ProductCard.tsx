import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  baseUrl: string;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductCard({ product, baseUrl }: ProductCardProps) {
  const imageUrl = product.imageUrls[0];

  return (
    <Link
      href={`${baseUrl}/product/${product.handle}`}
      className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="relative h-56 w-full bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          <span className="text-sm font-semibold text-blue-600">{formatPrice(product.price)}</span>
        </div>
        <p className="text-xs text-gray-500">
          {product.stockStatus === "in_stock" ? "In stock" : "Out of stock"}
        </p>
      </div>
    </Link>
  );
}
