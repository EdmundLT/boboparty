"use client";

import { useState } from "react";
import type { Cart } from "@/types";

type AddToCartButtonProps = {
  merchandiseId: string;
  quantity?: number;
  disabled?: boolean;
  onAdded?: (cart: Cart) => void;
};

const CART_ID_KEY = "boboparty_cart_id";

export default function AddToCartButton({
  merchandiseId,
  quantity = 1,
  disabled = false,
  onAdded,
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const cartId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null;
      const response = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartId || undefined,
          lines: [{ merchandiseId, quantity }],
        }),
      });

      const payload = (await response.json()) as { cart?: Cart; error?: string };
      if (!response.ok || !payload.cart) {
        throw new Error(payload.error || "Unable to add to cart.");
      }

      localStorage.setItem(CART_ID_KEY, payload.cart.id);
      onAdded?.(payload.cart);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to add to cart.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isLoading || disabled}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-70"
      >
        {isLoading ? "Adding..." : disabled ? "Out of stock" : "Add to cart"}
      </button>
      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
}
