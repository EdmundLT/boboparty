type ShopifyFetchParams = {
  query: string;
  variables?: Record<string, unknown>;
  tags?: string[];
  cache?: RequestCache;
  revalidate?: number;
};

type ShopifyError = {
  message: string;
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: ShopifyError[];
};

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";
const SHOPIFY_TIMEOUT_MS = Number(process.env.SHOPIFY_REQUEST_TIMEOUT_MS ?? 10000);

const normalizeShopifyDomain = (domain: string) => {
  const trimmed = domain.trim();
  const withoutProtocol = trimmed.replace(/^https?:\/\//, "");
  return withoutProtocol.split("/")[0];
};

const getShopifyEndpoint = () => {
  if (!SHOPIFY_DOMAIN) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN environment variable.");
  }

  const domain = normalizeShopifyDomain(SHOPIFY_DOMAIN);

  return `https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`;
};

const getShopifyHeaders = () => {
  if (!SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN environment variable.");
  }

  return {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
  };
};

export const shopifyFetch = async <T>({
  query,
  variables,
  tags,
  cache = "force-cache",
  revalidate = 60,
}: ShopifyFetchParams): Promise<T> => {
  const endpoint = getShopifyEndpoint();
  const headers = getShopifyHeaders();
  const nextOptions =
    cache === "no-store" ? undefined : tags || revalidate ? { tags, revalidate } : undefined;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), SHOPIFY_TIMEOUT_MS);

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
      cache,
      next: nextOptions,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`Shopify request failed: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as ShopifyResponse<T>;

  if (json.errors?.length) {
    const message = json.errors.map((error) => error.message).join("; ");
    throw new Error(`Shopify error: ${message}`);
  }

  if (!json.data) {
    throw new Error("Shopify response contained no data.");
  }

  return json.data;
};
