import Image from "next/image";
import type { Product } from "@/types";
import ProductPurchase from "@/components/ProductPurchase";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
};

type ProductDetailProps = {
  product: Product;
  variants: Variant[];
};

export default function ProductDetail({ product, variants }: ProductDetailProps) {
  const primaryImage = product.imageUrls[0];

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="relative h-96 w-full rounded-2xl bg-gray-100 overflow-hidden">
          {primaryImage ? (
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>
        {product.imageUrls.length > 1 ? (
          <div className="grid grid-cols-3 gap-3">
            {product.imageUrls.slice(1, 4).map((url) => (
              <div key={url} className="relative h-24 rounded-lg overflow-hidden bg-gray-100">
                <Image src={url} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Product</p>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          {product.category ? (
            <p className="text-sm text-gray-500 mt-1">{product.category.displayName}</p>
          ) : null}
        </div>

        <p className="text-gray-600 whitespace-pre-line">{product.description}</p>

        <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200 lg:static lg:border-none lg:py-0">
          <ProductPurchase variants={variants} />
        </div>
      </div>
    </div>
  );
}
