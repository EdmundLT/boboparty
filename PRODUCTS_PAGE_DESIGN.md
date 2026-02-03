# Products Page - Mobile & Desktop Design

## Overview
A fully responsive, mobile-first products catalog with advanced filtering, search, and category browsing capabilities powered by Shopify Storefront API.

---

## Mobile Design (≤768px)

### Key Features
- **Sticky search bar** at top (position: sticky, top: 64px)
- **2-column product grid** for optimal mobile viewing
- **Bottom sheet filter modal** with smooth animations
- **Large tap targets** (min 44px) for all interactive elements
- **Compact category cards** (2 columns)
- **Active state feedback** on all buttons (scale transform)

### Layout Breakdown

#### 1. Hero Section
- Gradient background (blue-50 to purple-50)
- Responsive text sizes:
  - Title: `text-2xl` → `text-3xl`
  - Subtitle: `text-sm` → `text-base`
- Padding: `py-8` on mobile, `py-12` on desktop

#### 2. Sticky Search & Controls
- Position: `sticky top-16 z-10`
- Background: `backdrop-blur-sm bg-gray-50/95`
- Search input with emoji icon 🔍
- Mobile filter button with emoji ⚙️
- Sort dropdown (compact on mobile)

#### 3. Category Grid
- 2 columns on mobile (`grid-cols-2`)
- Compact gaps (`gap-3`)
- Card heights: `h-32` on mobile
- Emoji fallback (🎈) when no image
- Description hidden on mobile

#### 4. Product Grid
- 2 columns on mobile (`grid-cols-2`)
- Compact spacing (`gap-3`)
- Product cards:
  - Image height: `h-36`
  - Compact padding: `p-3`
  - Font sizes: `text-xs` for title
  - Green dot indicator for in-stock items

#### 5. Filter Modal
- Full-width bottom sheet
- Rounded top corners (`rounded-t-3xl`)
- Backdrop: `bg-black/50`
- Animations: fade-in + slide-in-from-bottom
- Sticky action buttons at bottom
- Large checkbox areas for easy tapping

---

## Desktop Design (≥1024px)

### Key Features
- **Left sidebar filters** (280px, sticky)
- **3-column product grid** (4 columns on XL screens)
- **4-column category grid**
- **Hover effects** on cards (scale, shadow)
- **Better spacing** and larger text

### Layout Breakdown

#### 1. Two-Column Layout
```
[Sidebar (280px)] [Content (flexible)]
```

#### 2. Sidebar Filters
- Fixed width: 280px
- Sticky position: `top-24`
- Clean card design with hover states
- Visual checkboxes with backgrounds

#### 3. Category Grid
- 3 columns default, 4 on XL screens
- Larger card heights: `h-44`
- Description visible
- Smooth hover scale effect

#### 4. Product Grid
- 3 columns default, 4 on XL screens
- Taller product images: `h-56`
- Larger text sizes
- Stock indicator visible

---

## Component Architecture

### ProductsPage (`app/[lang]/products/page.tsx`)
- Server component
- Dynamic rendering (`force-dynamic`)
- Fetches collections + products from Shopify
- Error handling with user-friendly messages

### CategoryGrid (`components/CategoryGrid.tsx`)
- Responsive grid (2/3/4 columns)
- Image optimization with Next.js Image
- Emoji fallback for missing images
- Active state animations

### ProductCard (`components/ProductCard.tsx`)
- Compact mobile design
- Stock status badges
- Price formatting (HKD)
- Smooth hover effects

### ProductsExplorer (`components/ProductsExplorer.tsx`)
- Client component with state management
- Search functionality
- Sort options (Featured/Price)
- Stock filter
- Responsive filter UI (sidebar vs modal)

### ProductGrid (`components/ProductGrid.tsx`)
- Responsive grid wrapper
- Empty state with emoji 🔍
- Consistent spacing

---

## Responsive Breakpoints

```css
Mobile:   < 640px  (2 columns)
Tablet:   640-1023px (2 columns)
Desktop:  1024-1279px (3 columns)
XL:       ≥1280px (4 columns)
```

---

## Color Palette

### Primary
- Blue: `blue-600` (CTAs, prices)
- Purple: Used in gradients

### Neutrals
- Gray-50: Background
- Gray-100-200: Borders, cards
- Gray-600-900: Text

### Status Colors
- Green-600: In stock
- Red-200/700: Errors
- Blue-50/Purple-50: Hero gradient

---

## Performance Optimizations

1. **Dynamic rendering** - Prevents build-time API calls
2. **Next.js Image** - Automatic optimization
3. **Sticky positioning** - Native browser feature
4. **CSS transitions** - Hardware-accelerated
5. **Minimal JavaScript** - Most UI is CSS-driven

---

## Accessibility

- Semantic HTML (`nav`, `section`, `button`)
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels where needed
- Sufficient color contrast (WCAG AA)
- Large tap targets (44px minimum)

---

## Future Enhancements

### Suggested Features
- [ ] Price range slider
- [ ] Multi-select category filter
- [ ] Pagination or infinite scroll
- [ ] Quick view modal
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Recently viewed items
- [ ] Loading skeletons
- [ ] Image zoom on hover (desktop)
- [ ] Voice search (mobile)

---

## Testing Checklist

### Mobile
- [ ] Search works on sticky bar
- [ ] Filter modal opens/closes smoothly
- [ ] Product cards tap correctly
- [ ] Category cards scroll horizontally if needed
- [ ] Sort dropdown works
- [ ] Stock filter applies

### Desktop
- [ ] Sidebar stays sticky on scroll
- [ ] Hover effects work on all cards
- [ ] Search filters instantly
- [ ] Grid layout adjusts on window resize
- [ ] All buttons have hover states

### Cross-browser
- [ ] Safari (iOS/macOS)
- [ ] Chrome (Android/Desktop)
- [ ] Firefox
- [ ] Edge

---

## Component Props Reference

### CategoryGrid
```typescript
{
  categories: ProductCategory[];
  baseUrl: string;
}
```

### ProductCard
```typescript
{
  product: Product;
  baseUrl: string;
}
```

### ProductsExplorer
```typescript
{
  products: Product[];
  baseUrl: string;
  dict: {
    products: {
      filtersTitle: string;
      searchPlaceholder: string;
      // ... other i18n strings
    };
  };
}
```

---

## i18n Strings Required

```json
{
  "products": {
    "title": "Products",
    "subtitle": "Browse our latest party supplies",
    "categoriesTitle": "Shop by Category",
    "categoriesSubtitle": "Explore themed collections",
    "allProductsTitle": "All Products",
    "filtersTitle": "Filters",
    "searchPlaceholder": "Search products",
    "filterButton": "Filters",
    "sortLabel": "Sort",
    "sortFeatured": "Featured",
    "sortPriceLow": "Price: Low to High",
    "sortPriceHigh": "Price: High to Low",
    "inStockOnly": "In stock only",
    "applyFilters": "Apply",
    "resetFilters": "Reset",
    "resultsLabel": "Showing {count} items"
  }
}
```

---

Built with Next.js 16, Tailwind CSS, and Shopify Storefront API.
