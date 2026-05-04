import { createStorefrontApiClient } from "@shopify/storefront-api-client";

type StorefrontClient = ReturnType<typeof createStorefrontApiClient>;

let cachedClient: StorefrontClient | null = null;

export function getStorefrontClient(): StorefrontClient {
  if (cachedClient) return cachedClient;

  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2026-01";

  if (!storeDomain || !accessToken) {
    throw new Error(
      "Shopify env not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN.",
    );
  }

  cachedClient = createStorefrontApiClient({
    storeDomain,
    apiVersion,
    publicAccessToken: accessToken,
  });
  return cachedClient;
}

export type ShopifyRequestVariables = Record<string, unknown>;
