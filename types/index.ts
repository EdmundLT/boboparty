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
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  imageUrls: string[];
  stockStatus: "in_stock" | "out_of_stock";
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
