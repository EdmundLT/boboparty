import type { Product, ProductCategory } from "@/types";
import { shopifyFetch } from "@/lib/shopify";

type ShopifyImage = {
  url: string;
  altText: string | null;
};

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
};

type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  availableForSale: boolean;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyVariant }[] };
};

type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
};

const mapProduct = (product: ShopifyProduct, category?: ProductCategory): Product => {
  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant ? Number(firstVariant.price.amount) : 0;
  const imageUrls = product.images.edges.map((edge) => edge.node.url);

  return {
    id: product.id,
    handle: product.handle,
    name: product.title,
    category,
    price,
    description: product.description,
    imageUrls,
    stockStatus: product.availableForSale ? "in_stock" : "out_of_stock",
  };
};

const mapCollection = (collection: ShopifyCollection): ProductCategory => ({
  slug: collection.handle,
  displayName: collection.title,
  imageUrl: collection.image?.url,
  description: collection.description || undefined,
});

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          images(first: 6) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

const COLLECTION_WITH_PRODUCTS_QUERY = `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            availableForSale
            images(first: 6) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
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

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const getProducts = async (first = 24) => {
  const data = await shopifyFetch<{
    products: { edges: { node: ShopifyProduct }[] };
  }>({
    query: PRODUCTS_QUERY,
    variables: { first },
    tags: ["products"],
  });

  return data.products.edges.map((edge) => mapProduct(edge.node));
};

export const getCollections = async (first = 12) => {
  const data = await shopifyFetch<{
    collections: { edges: { node: ShopifyCollection }[] };
  }>({
    query: COLLECTIONS_QUERY,
    variables: { first },
    tags: ["collections"],
  });

  return data.collections.edges.map((edge) => mapCollection(edge.node));
};

export const getCollectionWithProducts = async (handle: string, first = 24) => {
  const data = await shopifyFetch<{
    collectionByHandle: (ShopifyCollection & {
      products: { edges: { node: ShopifyProduct }[] };
    }) | null;
  }>({
    query: COLLECTION_WITH_PRODUCTS_QUERY,
    variables: { handle, first },
    tags: [`collection:${handle}`],
  });

  if (!data.collectionByHandle) {
    return null;
  }

  const collection = mapCollection(data.collectionByHandle);
  const products = data.collectionByHandle.products.edges.map((edge) =>
    mapProduct(edge.node, collection),
  );

  return { collection, products };
};

export const getProductByHandle = async (handle: string) => {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [`product:${handle}`],
  });

  if (!data.productByHandle) {
    return null;
  }

  return {
    product: mapProduct(data.productByHandle),
    variants: data.productByHandle.variants.edges.map((edge) => edge.node),
  };
};
