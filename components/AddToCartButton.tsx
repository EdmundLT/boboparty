"use client";

import { useState } from "react";
import type { Cart } from "@/types";
import { showToast } from "@/components/Toast";

type AddToCartButtonProps = {
  merchandiseId: string;
  quantity?: number;
  disabled?: boolean;
  onAdded?: (cart: Cart) => void;
  dict?: {
    addToCart: string;
    adding: string;
    added: string;
    outOfStock: string;
    addedToCart: string;
  };
};

const CART_ID_KEY = "boboparty_cart_id";

export default function AddToCartButton({
  merchandiseId,
  quantity = 1,
  disabled = false,
  onAdded,
  dict = {
    addToCart: "加入購物車",
    adding: "加入中...",
    added: "已加入！",
    outOfStock: "缺貨",
    addedToCart: "已加入購物車！",
  },
}: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsSuccess(false);

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
      
      // Trigger cart update event
      window.dispatchEvent(new Event("cart-updated"));
      
      // Show success state
      setIsSuccess(true);
      showToast(dict.addedToCart, "success");
      
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 2000);
      
      onAdded?.(payload.cart);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to add to cart.";
      setErrorMessage(message);
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isLoading || disabled || isSuccess}
        className={`w-full rounded-xl px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2 ${
          isSuccess
            ? "bg-green-600 shadow-green-600/30 focus:ring-green-500"
            : "bg-blue-600 shadow-blue-600/30 hover:bg-blue-700 active:scale-95 focus:ring-blue-500"
        } disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{dict.adding}</span>
          </>
        ) : isSuccess ? (
          <>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{dict.added}</span>
          </>
        ) : disabled ? (
          dict.outOfStock
        ) : (
          dict.addToCart
        )}
      </button>
      {errorMessage ? (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3">
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  );
}
