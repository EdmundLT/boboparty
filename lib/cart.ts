import type { Cart, CartLine, Money } from "@/types";
import { shopifyFetch } from "@/lib/shopify";

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyImage = {
  url: string;
  altText: string | null;
};

type ShopifyCartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      images: { edges: { node: ShopifyImage }[] };
    };
    price: ShopifyMoney;
  };
};

type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
  };
  lines: { edges: { node: ShopifyCartLine }[] };
};

type CartLineInput = {
  merchandiseId: string;
  quantity: number;
};

type CartLineUpdateInput = {
  id: string;
  quantity: number;
};

const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const mapMoney = (money: ShopifyMoney): Money => ({
  amount: money.amount,
  currencyCode: money.currencyCode,
});

const mapCart = (cart: ShopifyCart): Cart => {
  const lines: CartLine[] = cart.lines.edges.map((edge) => {
    const line = edge.node;
    const imageUrl = line.merchandise.product.images.edges[0]?.node.url;

    return {
      id: line.id,
      quantity: line.quantity,
      merchandiseId: line.merchandise.id,
      title: line.merchandise.title,
      productTitle: line.merchandise.product.title,
      productHandle: line.merchandise.product.handle,
      imageUrl,
      price: mapMoney(line.merchandise.price),
    };
  });

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    cost: {
      subtotal: mapMoney(cart.cost.subtotalAmount),
      total: mapMoney(cart.cost.totalAmount),
    },
    lines,
  };
};

const CREATE_CART_MUTATION = `
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const ADD_LINES_MUTATION = `
  mutation AddCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const UPDATE_LINES_MUTATION = `
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const REMOVE_LINES_MUTATION = `
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

const GET_CART_QUERY = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

const assertNoErrors = (errors: { message: string }[]) => {
  if (errors.length) {
    throw new Error(errors.map((error) => error.message).join("; "));
  }
};

export const createCart = async (lines?: CartLineInput[]) => {
  const data = await shopifyFetch<{
    cartCreate: { cart: ShopifyCart | null; userErrors: { message: string }[] };
  }>({
    query: CREATE_CART_MUTATION,
    variables: { lines },
    cache: "no-store",
  });

  assertNoErrors(data.cartCreate.userErrors);

  if (!data.cartCreate.cart) {
    throw new Error("Shopify cart was not created.");
  }

  return mapCart(data.cartCreate.cart);
};

export const addCartLines = async (cartId: string, lines: CartLineInput[]) => {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: ShopifyCart | null; userErrors: { message: string }[] };
  }>({
    query: ADD_LINES_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });

  assertNoErrors(data.cartLinesAdd.userErrors);

  if (!data.cartLinesAdd.cart) {
    throw new Error("Unable to add lines to cart.");
  }

  return mapCart(data.cartLinesAdd.cart);
};

export const updateCartLines = async (cartId: string, lines: CartLineUpdateInput[]) => {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: ShopifyCart | null; userErrors: { message: string }[] };
  }>({
    query: UPDATE_LINES_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });

  assertNoErrors(data.cartLinesUpdate.userErrors);

  if (!data.cartLinesUpdate.cart) {
    throw new Error("Unable to update cart lines.");
  }

  return mapCart(data.cartLinesUpdate.cart);
};

export const removeCartLines = async (cartId: string, lineIds: string[]) => {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: ShopifyCart | null; userErrors: { message: string }[] };
  }>({
    query: REMOVE_LINES_MUTATION,
    variables: { cartId, lineIds },
    cache: "no-store",
  });

  assertNoErrors(data.cartLinesRemove.userErrors);

  if (!data.cartLinesRemove.cart) {
    throw new Error("Unable to remove cart lines.");
  }

  return mapCart(data.cartLinesRemove.cart);
};

export const getCart = async (cartId: string) => {
  const data = await shopifyFetch<{
    cart: ShopifyCart | null;
  }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });

  if (!data.cart) {
    throw new Error("Cart not found.");
  }

  return mapCart(data.cart);
};
