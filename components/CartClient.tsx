"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Cart } from "@/types";

const CART_ID_KEY = "boboparty_cart_id";

const formatMoney = (amount: string, currencyCode: string) =>
  new Intl.NumberFormat("en-HK", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(Number(amount));

export default function CartClient() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadCart = async (cartId: string) => {
    const response = await fetch(`/api/shopify/cart?cartId=${encodeURIComponent(cartId)}`);
    const payload = (await response.json()) as { cart?: Cart; error?: string };

    if (!response.ok || !payload.cart) {
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
    return <div className="text-gray-500">Loading cart...</div>;
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
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {cart.lines.map((line) => (
          <div
            key={line.id}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-100">
              {line.imageUrl ? (
                <Image src={line.imageUrl} alt={line.productTitle} fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                  No image
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-gray-900">{line.productTitle}</p>
              <p className="text-sm text-gray-500">{line.title}</p>
              <p className="text-sm text-gray-700">
                {formatMoney(line.price.amount, line.price.currencyCode)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => updateLineQuantity(line.id, Math.max(1, line.quantity - 1))}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-8 text-center">{line.quantity}</span>
              <button
                type="button"
                onClick={() => updateLineQuantity(line.id, line.quantity + 1)}
                className="h-8 w-8 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeLine(line.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
        <div className="flex items-center justify-between text-gray-700">
          <span>Subtotal</span>
          <span>{formatMoney(cart.cost.subtotal.amount, cart.cost.subtotal.currencyCode)}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold text-gray-900">
          <span>Total</span>
          <span>{formatMoney(cart.cost.total.amount, cart.cost.total.currencyCode)}</span>
        </div>
        <a
          href={cart.checkoutUrl}
          className="block w-full rounded-lg bg-blue-600 px-4 py-3 text-center text-white font-semibold hover:bg-blue-700"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
}
