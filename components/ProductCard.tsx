import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import QuickAddButton from "@/components/QuickAddButton";

type ProductCardProps = {
  product: Product;
  baseUrl: string;
  dict?: {
    quickAdd: string;
    adding: string;
    addedToCart: string;
    outOfStock: string;
    inStock: string;
  };
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("zh-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(price);

export default function ProductCard({ product, baseUrl, dict }: ProductCardProps) {
  const imageUrl = product.imageUrls[0];

  return (
    <Link
      href={`${baseUrl}/products/${product.handle}`}
      className="group rounded-lg sm:rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg active:scale-95 transition-all overflow-hidden"
    >
      <div className="relative h-36 sm:h-48 lg:h-56 w-full bg-gradient-to-br from-gray-100 to-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-xs sm:text-sm">
            No image
          </div>
        )}
        {product.stockStatus === "out_of_stock" ? (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-white/95 backdrop-blur-sm px-2 py-1 sm:px-3 text-xs font-semibold text-gray-700 shadow-sm">
            {dict?.outOfStock || "缺貨"}
          </div>
        ) : null}
        {product.stockStatus === "in_stock" && product.defaultVariantId ? (
          <div className="hidden lg:block">
            <QuickAddButton 
              merchandiseId={product.defaultVariantId} 
              productName={product.name}
              dict={dict ? { quickAdd: dict.quickAdd, adding: dict.adding, addedToCart: dict.addedToCart } : undefined}
            />
          </div>
        ) : null}
      </div>
      <div className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 line-clamp-2 leading-snug">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base lg:text-lg font-bold text-blue-600">{formatPrice(product.price)}</span>
          {product.stockStatus === "in_stock" ? (
            <span className="text-xs text-green-600 font-medium">● {dict?.inStock || "有貨"}</span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}
