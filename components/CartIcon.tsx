"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CartIconProps = {
  baseUrl: string;
};

const CART_ID_KEY = "boboparty_cart_id";

export default function CartIcon({ baseUrl }: CartIconProps) {
  const [itemCount, setItemCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const updateCartCount = async () => {
      const cartId = localStorage.getItem(CART_ID_KEY);
      if (!cartId) {
        setItemCount(0);
        return;
      }

      try {
        const response = await fetch(`/api/shopify/cart?cartId=${encodeURIComponent(cartId)}`);
        if (response.ok) {
          const data = await response.json();
          // Handle expired carts
          if (data.expired || !data.cart) {
            localStorage.removeItem(CART_ID_KEY);
            setItemCount(0);
            return;
          }
          setItemCount(data.cart.totalQuantity || 0);
        }
      } catch {
        setItemCount(0);
      }
    };

    updateCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      updateCartCount();
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  return (
    <Link
      href={`${baseUrl}/cart`}
      className="relative rounded-full border border-[#173f5f]/10 bg-white/60 p-2 text-[#173f5f] transition-colors hover:border-[#173f5f]/30 hover:bg-white"
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      {itemCount > 0 && (
        <span
            className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#ef6f61] text-xs font-bold text-white shadow-lg ${
            isAnimating ? "animate-bounce" : ""
          }`}
        >
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
