"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Cart } from "@/types";

type CartDict = {
  empty: string;
  emptySubtitle: string;
  continueShopping: string;
  orderSummary: string;
  subtotal: string;
  shipping: string;
  shippingCalculated: string;
  total: string;
  proceedToCheckout: string;
  secureCheckout: string;
  promoCode: string;
  enterCode: string;
  apply: string;
  remove: string;
  decreaseQuantity: string;
  increaseQuantity: string;
};

type CartClientProps = {
  baseUrl: string;
  dict?: CartDict;
};

const CART_ID_KEY = "boboparty_cart_id";

const formatMoney = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat("zh-HK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(amount));

export default function CartClient({ 
  baseUrl = "",
  dict = {
    empty: "您的購物車是空的",
    emptySubtitle: "開始購物，將喜歡的商品加入購物車",
    continueShopping: "繼續購物",
    orderSummary: "訂單摘要",
    subtotal: "小計",
    shipping: "運費",
    shippingCalculated: "結帳時計算",
    total: "總計",
    proceedToCheckout: "前往結帳",
    secureCheckout: "由 Shopify 提供安全結帳",
    promoCode: "有促銷代碼？",
    enterCode: "輸入代碼",
    apply: "套用",
    remove: "移除",
    decreaseQuantity: "減少數量",
    increaseQuantity: "增加數量",
  },
}: CartClientProps) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadCart = async (cartId: string) => {
    const response = await fetch(`/api/shopify/cart?cartId=${encodeURIComponent(cartId)}`);
    const payload = (await response.json()) as { cart?: Cart | null; error?: string; expired?: boolean };

    // If cart expired or not found, clear localStorage
    if (payload.expired || !payload.cart) {
      localStorage.removeItem(CART_ID_KEY);
      return null;
    }

    if (!response.ok) {
      throw new Error(payload.error || "Unable to load cart.");
    }

    return payload.cart;
  };

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (!cartId) {
      setIsLoading(false);
      return;
    }

    loadCart(cartId)
      .then((nextCart) => setCart(nextCart))
      .catch((error) =>
        setErrorMessage(error instanceof Error ? error.message : "Unable to load cart."),
      )
      .finally(() => setIsLoading(false));

    // Listen for cart updates from AddToCartButton
    const handleCartUpdate = () => {
      const updatedCartId = localStorage.getItem(CART_ID_KEY);
      if (updatedCartId) {
        loadCart(updatedCartId)
          .then((nextCart) => {
            setCart(nextCart);
            setErrorMessage(null);
          })
          .catch((error) =>
            setErrorMessage(error instanceof Error ? error.message : "Unable to load cart."),
          );
      }
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => window.removeEventListener("cart-updated", handleCartUpdate);
  }, []);

  const updateLineQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/shopify/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart.id,
          lineUpdates: [{ id: lineId, quantity }],
        }),
      });
      const payload = (await response.json()) as { cart?: Cart; error?: string };
      if (!response.ok || !payload.cart) {
        throw new Error(payload.error || "Unable to update cart.");
      }
      setCart(payload.cart);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update cart.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeLine = async (lineId: string) => {
    if (!cart) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/shopify/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cart.id,
          lineIds: [lineId],
        }),
      });
      const payload = (await response.json()) as { cart?: Cart; error?: string };
      if (!response.ok || !payload.cart) {
        throw new Error(payload.error || "Unable to update cart.");
      }
      setCart(payload.cart);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update cart.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
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
          <p className="text-gray-600 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
        {errorMessage}
      </div>
    );
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 sm:p-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{dict.empty}</h3>
        <p className="text-gray-600 mb-6">{dict.emptySubtitle}</p>
        <a
          href={`${baseUrl}/products`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all"
        >
          {dict.continueShopping}
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-xl">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
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
        </div>
      )}
      <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8 lg:space-y-0">
        <div className="space-y-4">
          {cart.lines.map((line) => (
            <div
              key={line.id}
              className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center shadow-sm hover:shadow-md transition-shadow"
            >
            <div className="relative h-24 w-24 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
              {line.imageUrl ? (
                <Image src={line.imageUrl} alt={line.productTitle} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">{line.productTitle}</p>
              <p className="text-xs sm:text-sm text-gray-500">{line.title}</p>
              <p className="text-sm sm:text-base font-medium text-gray-900">
                {formatMoney(line.price.amount, line.price.currencyCode)}
              </p>
            </div>
            <div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => updateLineQuantity(line.id, Math.max(1, line.quantity - 1))}
                  disabled={isLoading}
                  className="h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 active:scale-90 disabled:opacity-50 transition-all"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold text-gray-900">{line.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateLineQuantity(line.id, line.quantity + 1)}
                  disabled={isLoading}
                  className="h-9 w-9 rounded-lg border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 active:scale-90 disabled:opacity-50 transition-all"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeLine(line.id)}
                disabled={isLoading}
                className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline disabled:opacity-50 transition-colors"
              >
                {dict.remove}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5 h-fit lg:sticky lg:top-24 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900">{dict.orderSummary}</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-sm">{dict.subtotal}</span>
            <span className="font-medium">{formatMoney(cart.cost.subtotal.amount, cart.cost.subtotal.currencyCode)}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600">
            <span className="text-sm">{dict.shipping}</span>
            <span className="text-sm text-gray-500">{dict.shippingCalculated}</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-lg font-bold text-gray-900">
            <span>{dict.total}</span>
            <span>{formatMoney(cart.cost.total.amount, cart.cost.total.currencyCode)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href={cart.checkoutUrl}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 px-6 py-4 text-base text-white font-semibold shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <span>{dict.proceedToCheckout}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>{dict.secureCheckout}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              <span>{dict.promoCode}</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-3 space-y-2">
              <input
                type="text"
                placeholder={dict.enterCode}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="button"
                className="w-full rounded-lg border-2 border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-95 transition-all"
              >
                {dict.apply}
              </button>
            </div>
          </details>
        </div>
      </div>
      </div>
    </div>
  );
}
