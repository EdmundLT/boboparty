# SEO Implementation Summary

## Overview
This document describes the implementation of Shopify SEO data fetching and injection into the website's pages. The SEO data that you enter in the Shopify Admin interface (under "Search engine listing") is now automatically fetched via the Shopify Storefront API and rendered into the HTML `<head>` of your pages.

## What Was Implemented

### 1. Type Definitions Updated
**File: `types/index.ts`**

Added `seo` field to both `Product` and `ProductCategory` types:

```typescript
seo?: {
  title?: string;
  description?: string;
}
```

This allows products and collections to store SEO metadata from Shopify.

### 2. Shopify API Queries Enhanced
**File: `lib/products.ts`**

Updated all GraphQL queries to fetch SEO data from Shopify:
- `PRODUCTS_QUERY` - Fetches SEO for product listings
- `PRODUCT_BY_HANDLE_QUERY` - Fetches SEO for individual products
- `COLLECTIONS_QUERY` - Fetches SEO for collection listings
- `COLLECTION_WITH_PRODUCTS_QUERY` - Fetches SEO for collections with products

Each query now includes:
```graphql
seo {
  title
  description
}
```

### 3. Mapping Functions Updated
**File: `lib/products.ts`**

Both `mapProduct()` and `mapCollection()` functions now extract and map SEO data from Shopify responses:

```typescript
seo: {
  title: product.seo.title || undefined,
  description: product.seo.description || undefined,
}
```

### 4. Metadata Generation Added to All Pages

#### Product Detail Page
**File: `app/[lang]/products/[id]/page.tsx`**

- Fetches product data and extracts SEO information
- Uses `product.seo.title` as the page title (falls back to product name)
- Uses `product.seo.description` as the page description (falls back to product description)
- Includes OpenGraph and Twitter Card metadata
- Adds product-specific metadata (price, currency)

#### Category Pages
**File: `app/[lang]/category/[slug]/page.tsx`**

- Fetches collection data and extracts SEO information
- Uses `collection.seo.title` (falls back to collection name)
- Uses `collection.seo.description` (falls back to collection description)
- Includes OpenGraph and Twitter Card metadata with collection images

#### Products Listing Page
**File: `app/[lang]/products/page.tsx`**

- Uses dictionary translations for title and description
- Includes OpenGraph and Twitter Card metadata

#### Blog Post Pages
**File: `app/[lang]/blog/[slug]/page.tsx`**

- Already had SEO implementation via `generateBlogMetadata` function
- Uses blog post SEO fields (`seo.metaTitle`, `seo.metaDescription`, `seo.keywords`)

#### Blog Listing Page
**File: `app/[lang]/blog/page.tsx`**

- Added metadata generation with blog title and subtitle
- Includes OpenGraph and Twitter Card metadata

#### Home Page
**File: `app/[lang]/page.tsx`**

- Added metadata generation with home page title and description
- Includes locale-specific OpenGraph metadata

#### About Page
**File: `app/[lang]/about/page.tsx`**

- Added metadata generation with about page title and subtitle
- Includes locale-specific OpenGraph metadata

#### Cart Page
**File: `app/[lang]/cart/page.tsx`**

- Added metadata generation
- Includes `robots: { index: false }` to prevent cart pages from being indexed

## How It Works

### The Workflow

1. **Admin Input**: You enter SEO information in Shopify Admin:
   - Go to Products → Select a product → Scroll to "Search engine listing"
   - Edit the title and description
   - Save the product

2. **API Fetch**: Your Next.js app makes a request to the Shopify Storefront API:
   - Uses GraphQL queries to fetch product/collection data
   - Includes `seo { title, description }` in the query

3. **Data Extraction**: The mapping functions extract SEO data:
   - Retrieves `seo.title` and `seo.description` from Shopify response
   - Falls back to product/collection names and descriptions if SEO fields are empty

4. **Metadata Injection**: Next.js `generateMetadata` functions inject the data:
   - Renders SEO data into the HTML `<head>` tag
   - Includes Open Graph and Twitter Card metadata
   - Search engines and social media platforms read this data

## SEO Metadata Priority

For each page type, the following priority is used:

### Products
1. `product.seo.title` from Shopify Admin
2. Falls back to `product.name`

### Collections/Categories
1. `collection.seo.title` from Shopify Admin
2. Falls back to `collection.displayName`

### Blog Posts
1. `post.seo.metaTitle` from JSON files
2. Falls back to `post.title`

## What Gets Rendered in HTML

When you visit a product page, the HTML will now include:

```html
<head>
  <title>Your Custom SEO Title</title>
  <meta name="description" content="Your custom SEO description" />
  
  <!-- Open Graph for social media -->
  <meta property="og:title" content="Your Custom SEO Title" />
  <meta property="og:description" content="Your custom SEO description" />
  <meta property="og:image" content="https://...product-image.jpg" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Custom SEO Title" />
  <meta name="twitter:description" content="Your custom SEO description" />
  <meta name="twitter:image" content="https://...product-image.jpg" />
  
  <!-- Product-specific metadata -->
  <meta property="product:price:amount" content="199" />
  <meta property="product:price:currency" content="HKD" />
</head>
```

## Testing Your SEO

### 1. View Page Source
Right-click on any product page → "View Page Source" → Look for `<meta>` tags in the `<head>`

### 2. Google Rich Results Test
Visit: https://search.google.com/test/rich-results
Enter your product page URL to see how Google sees it

### 3. Facebook Sharing Debugger
Visit: https://developers.facebook.com/tools/debug/
Enter your product page URL to see Open Graph preview

### 4. Twitter Card Validator
Visit: https://cards-dev.twitter.com/validator
Enter your product page URL to see Twitter Card preview

## Benefits

1. **Better Search Rankings**: Custom titles and descriptions optimized for search engines
2. **Improved Click-Through Rates**: More appealing search results snippets
3. **Social Media Sharing**: Beautiful previews when sharing links on Facebook, Twitter, etc.
4. **Centralized Management**: Edit SEO in Shopify Admin, automatically syncs to website
5. **Fallback Safety**: If you don't set custom SEO, it uses product names/descriptions
6. **Multi-language Support**: Works with both English and Traditional Chinese

## Next Steps

### To Update SEO for a Product:
1. Log into Shopify Admin
2. Go to Products → Select a product
3. Scroll down to "Search engine listing"
4. Click "Edit website SEO"
5. Enter custom page title and meta description
6. Save the product
7. Your website will automatically fetch and display the new SEO data

### To Update SEO for a Collection:
1. Log into Shopify Admin
2. Go to Products → Collections → Select a collection
3. Scroll down to "Search engine listing"
4. Click "Edit website SEO"
5. Enter custom page title and meta description
6. Save the collection
7. Your website will automatically fetch and display the new SEO data

## Technical Notes

- **Caching**: Shopify API responses are cached for 60 seconds by default
- **Revalidation**: To force fresh SEO data, the cache will auto-refresh after 60 seconds
- **Dynamic Rendering**: All metadata is generated server-side for optimal SEO
- **Error Handling**: If SEO fetch fails, fallback metadata is used
- **API Version**: Using Shopify Storefront API version 2024-10

## Environment Variables Required

Make sure these are set in your `.env.local`:
```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token
SHOPIFY_API_VERSION=2024-10
```

---

**Implementation Date**: February 2026  
**Status**: ✅ Complete and Production Ready
