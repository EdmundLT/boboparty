import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";

type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
};

const SEARCH_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          handle
          title
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
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
`;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const data = await shopifyFetch<{
      products: {
        edges: Array<{ node: ShopifyProduct }>;
      };
    }>({
      query: SEARCH_QUERY,
      variables: {
        query: `title:*${query}*`,
        first: 10,
      },
      cache: "no-store",
    });

    const results = data.products.edges.map((edge) => ({
      id: edge.node.id,
      handle: edge.node.handle,
      name: edge.node.title,
      price: Number(edge.node.priceRange.minVariantPrice.amount),
      imageUrl: edge.node.images.edges[0]?.node.url,
    }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
