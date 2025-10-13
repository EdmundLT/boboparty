

***

# BoBoParty.HK Technical Specification Document

## Project Summary

Revamp and migrate the BoBoParty.HK E-commerce website from its current platform to **Next.js**. The new system should offer clean component/module separation, scalable routing, SEO support, multilingual capability, and compatibility with standard E-commerce integrations.

***

## 1. Top-Level Page Route Map

| Route Pattern | Description | Data Contract / Props | Notes |
| :-- | :-- | :-- | :-- |
| `/` | Landing/Home page | Store locations, banners, featured categories |  |
| `/products` | Top-level product catalogue | List of categories, featured products | `/products?cat=x` filter |
| `/category/[slug]` | Category-specific product listing | Category metadata, product list (paginated) | E.g., `/category/wedding` |
| `/product/[id]` | Detailed product view | Product, variant, images, description | `/product/1234` |
| `/aboutstore` | Store/company information | Store addresses, business hours |  |
| `/returnpolicy` | Return and refund policies | Markdown/HTML content |  |
| `/customer_feedback` | User feedback form | Feedback form fields, submission handling |  |
| `/storereviews` | Store and product user reviews | Review array |  |
| `/login` | User login page | OAuth/local fields |  |
| `/register` | User registration page | Registration form |  |
| `/cart` | Shopping cart | Cart items, subtotal, update endpoints | (No payment in scope) |
| `/checkout` | Order info, delivery method selection | Shipping info, options, order summary | (No payment in scope) |


***

## 2. Core Data Models

### ShopLocation

```typescript
type ShopLocation = {
  name: string;              // e.g. "屯門華都商場"
  address: string;           // e.g. "屯門華都商場 1樓24號舖"
  openingHours: string;      // e.g. "13:00-21:00"
}
```

- Static list, used in homepage, about page, and delivery info


### ProductCategory

```typescript
type ProductCategory = {
  slug: string;                   // e.g. "balloons"
  displayName: string;            // e.g. "氣球 Balloon"
  imageUrl?: string;
  description?: string;
}
```


### Product

```typescript
type Product = {
  id: string;
  name: string;                   // e.g. "氣球套裝系列-HS81"
  category: ProductCategory;
  price: number;
  description: string;
  imageUrls: string[];
  stockStatus: "in_stock" | "out_of_stock";
}
```


***

## 3. Sitewide Components

- **Navbar**: Dynamic, supports category dropdowns, login/register, language/currency switch
- **Footer**: Store contacts, addresses, policy links, social icons
- **ProductGrid**: Paginated gallery for category listings
- **ProductCard**: Used in grids; shows image, name, price
- **ProductDetail**: Gallery, variants, description, add-to-cart
- **StoreInfo**: Flexible card for all shop location data with open hours
- **FeedbackForm**: Modal/page for contact/feedback
- **ReviewList**: For product and store reviews
- **StoreBanner**: Notices, promo messages

***

## 4. User Flows (Excluding Payment)

### A. Product Browsing

1. User lands on `/` or `/products`.
2. User filters by category using `/category/[slug]`.
3. Product list is shown—each `ProductCard` links to `/product/[id]`.

### B. Store Info Access

- User can view all store locations, opening hours, store WhatsApp, and contact options via `/aboutstore`.
- All address and hours presented using `StoreInfo` data.


### C. Order and Pickup

1. User adds product(s) to basket (`/cart`), reviews in `/cart`.
2. Proceeds to `/checkout`.
3. Enters shipping contact info, and selects delivery:
    - 門市自取 (in-store pickup at any location)
    - 代客call 貨Van (freight collect; instructions shown)
    - 順豐速遞到付 (courier collect; contact info required)
4. (Payment step is out-of-scope)

### D. Customer Feedback

- Form at `/customer_feedback` for input/complaints
- Reviews displayed at `/storereviews`

***

## 5. Store Address Static Data

```json
[
  {
    "name": "屯門華都商場",
    "address": "屯門華都商場 1樓24號舖",
    "openingHours": "每日 13:00-21:00"
  },
  {
    "name": "葵芳葵涌廣場",
    "address": "葵芳葵涌廣場 1樓B69號舖",
    "openingHours": "每日 12:00-22:00"
  },
  {
    "name": "沙田石門京瑞廣場一期",
    "address": "沙田石門京瑞廣場一期地下G39B號舖",
    "openingHours": "每日 12:00-21:00"
  }
]
```

Customer Contact: WhatsApp 65344590

***

## 6. SEO \& Multi-Language

- All main routes: SEO-optimized, keyword-filled title/tag support
- All customer-facing content support zh-Hant (default) \& English; possible URL prefixes for locales (e.g., `/zh-Hant/`, `/en/`)

***

## 7. Out of Scope

- Payment gateway/processing logic and integration
- Admin backoffice management
- Full authentication, role management
- SMS/email notification flows (except form stubs)

***

**This document is structured for LLM-driven codebase generation, rapid onboarding, and ensures a maintainable Next.js-based E-commerce portal aligned to BoBoParty.HK’s physical business requirements.**
<span style="display:none">[^3_1]</span>

<div align="center">⁂</div>

[^3_1]: https://boboparty-hk.com/

