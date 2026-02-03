"use client";

import { useMemo, useState } from "react";
import type { Cart } from "@/types";
import AddToCartButton from "@/components/AddToCartButton";

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: {
    amount: string;
    currencyCode: string;
  };
};

type ProductPurchaseProps = {
  variants: Variant[];
  onAdded?: (cart: Cart) => void;
  dict?: {
    addToCart: string;
    adding: string;
    added: string;
    outOfStock: string;
    addedToCart: string;
  };
};

const formatPrice = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat("en-HK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(amount));

export default function ProductPurchase({ variants, onAdded, dict }: ProductPurchaseProps) {
  const initialVariant = variants[0];
  const [selectedId, setSelectedId] = useState(initialVariant?.id ?? "");

  const selectedVariant = useMemo(
    () => variants.find((variant) => variant.id === selectedId) ?? initialVariant,
    [initialVariant, selectedId, variants],
  );

  if (!selectedVariant) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        This product is currently unavailable.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {variants.length > 1 ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            {variants.map((variant) => (
              <option key={variant.id} value={variant.id} disabled={!variant.availableForSale}>
                {variant.title} · {formatPrice(variant.price.amount, variant.price.currencyCode)}
                {!variant.availableForSale ? " (Out of stock)" : ""}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-900">
          {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
        </p>
      )}

      <AddToCartButton
        merchandiseId={selectedVariant.id}
        onAdded={onAdded}
        quantity={1}
        disabled={!selectedVariant.availableForSale}
        dict={dict}
      />
    </div>
  );
}
