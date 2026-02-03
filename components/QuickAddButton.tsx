"use client";

import { useState } from "react";
import type { Cart } from "@/types";
import { showToast } from "@/components/Toast";

type QuickAddButtonProps = {
  merchandiseId: string;
  productName: string;
  dict?: {
    quickAdd: string;
    adding: string;
    addedToCart: string;
  };
};

const CART_ID_KEY = "boboparty_cart_id";

export default function QuickAddButton({ 
  merchandiseId, 
  productName,
  dict = {
    quickAdd: "快速加入",
    adding: "加入中...",
    addedToCart: "已加入購物車！",
  },
}: QuickAddButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);

    try {
      const cartId = typeof window !== "undefined" ? localStorage.getItem(CART_ID_KEY) : null;
      const response = await fetch("/api/shopify/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartId || undefined,
          lines: [{ merchandiseId, quantity: 1 }],
        }),
      });

      const payload = (await response.json()) as { cart?: Cart; error?: string };
      if (!response.ok || !payload.cart) {
        throw new Error(payload.error || "Unable to add to cart.");
      }

      localStorage.setItem(CART_ID_KEY, payload.cart.id);
      window.dispatchEvent(new Event("cart-updated"));
      showToast(`${productName} ${dict.addedToCart}`, "success");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to add to cart.";
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleQuickAdd}
      disabled={isLoading}
      className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-blue-600 shadow-lg hover:bg-white active:scale-95 disabled:opacity-50 transition-all duration-150 opacity-0 group-hover:opacity-100"
      aria-label={`Quick add ${productName} to cart`}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
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
          {dict.adding}
        </span>
      ) : (
        dict.quickAdd
      )}
    </button>
  );
}
