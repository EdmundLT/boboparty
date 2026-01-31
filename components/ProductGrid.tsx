import type { Product } from "@/types";
import ProductCard from "@/components/ProductCard";

type ProductGridProps = {
  products: Product[];
  baseUrl: string;
};

export default function ProductGrid({ products, baseUrl }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} baseUrl={baseUrl} />
      ))}
    </div>
  );
}
