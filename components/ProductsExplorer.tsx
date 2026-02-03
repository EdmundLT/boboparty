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
    cart: {
      quickAdd: string;
      adding: string;
      addedToCart: string;
      outOfStock: string;
      inStock: string;
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
    <div className="space-y-4 sm:space-y-6">
      <div className="sticky top-16 z-10 bg-gray-50 -mx-4 px-4 py-3 sm:static sm:mx-0 sm:px-0 sm:py-0 sm:bg-transparent border-b sm:border-0 backdrop-blur-sm bg-gray-50/95 sm:backdrop-blur-none">
        <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
            <span className="text-gray-400 text-lg sm:text-xl">🔍</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={dict.products.searchPlaceholder}
              className="w-full bg-transparent text-sm sm:text-base text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex-1 sm:flex-none rounded-lg border border-gray-200 bg-white px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100"
            >
              <span className="flex items-center justify-center gap-2">
                <span>⚙️</span>
                {dict.products.filterButton}
              </span>
            </button>
            <label className="hidden lg:flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              {dict.products.inStockOnly}
            </label>
            <label className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
              <span className="hidden sm:inline">{dict.products.sortLabel}</span>
              <select
                value={sortValue}
                onChange={(event) => setSortValue(event.target.value as SortValue)}
                className="rounded-lg border border-gray-200 bg-white px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium"
              >
                <option value="featured">{dict.products.sortFeatured}</option>
                <option value="price_low">{dict.products.sortPriceLow}</option>
                <option value="price_high">{dict.products.sortPriceHigh}</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden lg:block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm h-fit sticky top-24">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-gray-900">{dict.products.filtersTitle}</h3>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              {dict.products.resetFilters}
            </button>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(event) => setInStockOnly(event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">{dict.products.inStockOnly}</span>
            </label>
          </div>
        </aside>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="text-xs sm:text-sm font-medium text-gray-600">
              {dict.products.resultsLabel.replace("{count}", String(filteredProducts.length))}
            </div>
            {filteredProducts.length > 0 && (
              <div className="text-xs text-gray-500">
                {searchTerm && `"${searchTerm}"`}
              </div>
            )}
          </div>
          <ProductGrid products={filteredProducts} baseUrl={baseUrl} dict={dict.cart} />
        </div>
      </div>

      {isMobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 animate-in fade-in">
          <div className="w-full max-h-[80vh] rounded-t-3xl bg-white shadow-2xl animate-in slide-in-from-bottom">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{dict.products.filtersTitle}</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="h-8 w-8 rounded-full hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center text-gray-500"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 bg-gray-50 active:bg-gray-100">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(event) => setInStockOnly(event.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">{dict.products.inStockOnly}</span>
                </label>
              </div>
            </div>
            
            <div className="sticky bottom-0 p-4 bg-white border-t flex gap-3">
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setIsMobileFiltersOpen(false);
                }}
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 active:bg-gray-100"
              >
                {dict.products.resetFilters}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-sm text-white font-semibold active:bg-blue-700 shadow-lg shadow-blue-600/30"
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
