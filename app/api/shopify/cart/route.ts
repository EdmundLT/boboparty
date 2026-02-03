import { NextResponse } from "next/server";
import { addCartLines, createCart, getCart, removeCartLines, updateCartLines } from "@/lib/cart";

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
    // If cart not found, return empty cart info instead of error
    if (message.includes("not found") || message.includes("不存在")) {
      return NextResponse.json({ 
        cart: null,
        expired: true 
      });
    }
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

    try {
      const cart = await addCartLines(body.cartId, body.lines);
      return NextResponse.json({ cart });
    } catch (addError) {
      // If cart doesn't exist (expired or invalid), create a new one
      const errorMessage = addError instanceof Error ? addError.message : "";
      if (errorMessage.includes("不存在") || errorMessage.toLowerCase().includes("not found") || errorMessage.toLowerCase().includes("does not exist")) {
        const cart = await createCart(body.lines);
        return NextResponse.json({ cart });
      }
      throw addError;
    }
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
