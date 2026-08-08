import { products, categories } from "@/data/products";
import type { Category, Product } from "./types";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsOnSale(): Product[] {
  return products.filter((p) => p.salePrice);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.categories.some((c) => product.categories.includes(c))
    )
    .slice(0, limit);
}

export function categorySlugToName(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)?.name;
}

export function getProductsByCategorySlug(slug: string): Product[] {
  const name = categorySlugToName(slug);
  if (!name) return [];
  return products.filter((p) => p.categories.includes(name));
}

export function effectivePrice(p: Product): number {
  return p.salePrice ?? p.price;
}

export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export { categories };
