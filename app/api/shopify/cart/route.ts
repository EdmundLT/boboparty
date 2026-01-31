import { NextResponse } from "next/server";
import { addCartLines, createCart, getCart, removeCartLines, updateCartLines } from "@/lib/cart";

export const runtime = "nodejs";

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

type CartLineUpdateInput = {
  id: string;
  quantity: number;
};

type CartRequestBody = {
  cartId?: string;
  lines?: CartLineInput[];
  lineUpdates?: CartLineUpdateInput[];
  lineIds?: string[];
};

const jsonError = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cartId = url.searchParams.get("cartId");

  if (!cartId) {
    return jsonError("Missing cartId.");
  }

  try {
    const cart = await getCart(cartId);
    return NextResponse.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch cart.";
    return jsonError(message, 500);
  }
}

export async function POST(request: Request) {
  let body: CartRequestBody;

  try {
    body = (await request.json()) as CartRequestBody;
  } catch {
    return jsonError("Invalid JSON body.");
  }

  try {
    if (!body.cartId) {
      const cart = await createCart(body.lines);
      return NextResponse.json({ cart });
    }

    if (!body.lines?.length) {
      return jsonError("Missing cart lines.");
    }

    const cart = await addCartLines(body.cartId, body.lines);
    return NextResponse.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update cart.";
    console.error("Shopify cart POST error:", error);
    return jsonError(message, 500);
  }
}

export async function PUT(request: Request) {
  let body: CartRequestBody;

  try {
    body = (await request.json()) as CartRequestBody;
  } catch {
    return jsonError("Invalid JSON body.");
  }

  if (!body.cartId) {
    return jsonError("Missing cartId.");
  }

  if (!body.lineUpdates?.length) {
    return jsonError("Missing line updates.");
  }

  try {
    const cart = await updateCartLines(body.cartId, body.lineUpdates);
    return NextResponse.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update cart.";
    console.error("Shopify cart PUT error:", error);
    return jsonError(message, 500);
  }
}

export async function DELETE(request: Request) {
  let body: CartRequestBody;

  try {
    body = (await request.json()) as CartRequestBody;
  } catch {
    return jsonError("Invalid JSON body.");
  }

  if (!body.cartId) {
    return jsonError("Missing cartId.");
  }

  if (!body.lineIds?.length) {
    return jsonError("Missing lineIds.");
  }

  try {
    const cart = await removeCartLines(body.cartId, body.lineIds);
    return NextResponse.json({ cart });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update cart.";
    console.error("Shopify cart DELETE error:", error);
    return jsonError(message, 500);
  }
}
