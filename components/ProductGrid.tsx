import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

type ProductGridProps = {
  products: Product[];
  baseUrl: string;
  dict?: {
    quickAdd: string;
    adding: string;
    addedToCart: string;
    outOfStock: string;
    inStock: string;
  };
};

export default function ProductGrid({ products, baseUrl, dict }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 bg-white p-8 sm:p-10 text-center">
        <div className="text-5xl mb-3">🔍</div>
        <p className="text-sm sm:text-base text-gray-500 font-medium">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} baseUrl={baseUrl} dict={dict} />
      ))}
    </div>
  );
}
