export type ShopLocation = {
  name: string;
  address: string;
  openingHours: string;
}

export type ProductCategory = {
  slug: string;
  displayName: string;
  imageUrl?: string;
  description?: string;
}

export type Product = {
  id: string;
  handle: string;
  name: string;
  category?: ProductCategory;
  price: number;
  description: string;
  imageUrls: string[];
  stockStatus: "in_stock" | "out_of_stock";
}

export type Money = {
  amount: string;
  currencyCode: string;
}

export type CartLine = {
  id: string;
  quantity: number;
  merchandiseId: string;
  title: string;
  productTitle: string;
  productHandle: string;
  imageUrl?: string;
  price: Money;
}

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotal: Money;
    total: Money;
  };
  lines: CartLine[];
}

export type CustomerFeedback = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: Date;
}

export type ShowcaseItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string;
}

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: BlogContent[];
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export type BlogContent =
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'divider' }
