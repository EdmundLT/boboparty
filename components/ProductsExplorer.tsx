"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types";
import ProductGrid from "@/components/ProductGrid";

type ProductsExplorerProps = {
  products: Product[];
  baseUrl: string;
  dict: {
    products: {
      filtersTitle: string;
      searchPlaceholder: string;
      filterButton: string;
      sortLabel: string;
      sortFeatured: string;
      sortPriceLow: string;
      sortPriceHigh: string;
      inStockOnly: string;
      applyFilters: string;
      resetFilters: string;
      resultsLabel: string;
    };
  };
};

type SortValue = "featured" | "price_low" | "price_high";

export default function ProductsExplorer({ products, baseUrl, dict }: ProductsExplorerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortValue, setSortValue] = useState<SortValue>("featured");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const lower = searchTerm.trim().toLowerCase();
      result = result.filter((product) => product.name.toLowerCase().includes(lower));
    }

    if (inStockOnly) {
      result = result.filter((product) => product.stockStatus === "in_stock");
    }

    if (sortValue === "price_low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price_high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [inStockOnly, products, searchTerm, sortValue]);

  const resetFilters = () => {
    setSearchTerm("");
    setInStockOnly(false);
    setSortValue("featured");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <span className="text-gray-400">🔍</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={dict.products.searchPlaceholder}
            className="w-full bg-transparent text-sm text-gray-700 outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700"
          >
            {dict.products.filterButton}
          </button>
          <label className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            {dict.products.inStockOnly}
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span>{dict.products.sortLabel}</span>
            <select
              value={sortValue}
              onChange={(event) => setSortValue(event.target.value as SortValue)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="featured">{dict.products.sortFeatured}</option>
              <option value="price_low">{dict.products.sortPriceLow}</option>
              <option value="price_high">{dict.products.sortPriceHigh}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden lg:block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm h-fit sticky top-24">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{dict.products.filtersTitle}</h3>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              {dict.products.resetFilters}
            </button>
          </div>
          <div className="mt-4 space-y-4">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              {dict.products.inStockOnly}
            </label>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            {dict.products.resultsLabel.replace("{count}", String(filteredProducts.length))}
          </div>
          <ProductGrid products={filteredProducts} baseUrl={baseUrl} />
        </div>
      </div>

      {isMobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
          <div className="w-full rounded-t-3xl bg-white p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{dict.products.filtersTitle}</h3>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              {dict.products.inStockOnly}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                }}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700"
              >
                {dict.products.resetFilters}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm text-white font-semibold"
              >
                {dict.products.applyFilters}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
