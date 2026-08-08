import "server-only";
import { ALL_CATEGORIES } from "./types";
import type { ProductInput } from "./types";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export function parseProductInput(body: unknown): ProductInput | { error: string } {
  const b = body as Record<string, unknown>;

  if (!isNonEmptyString(b?.slug)) return { error: "Slug is required" };
  if (!isNonEmptyString(b?.name)) return { error: "Name is required" };
  if (typeof b?.price !== "number" || b.price <= 0) return { error: "Price must be a positive number" };
  if (
    b?.salePrice !== undefined &&
    b?.salePrice !== null &&
    (typeof b.salePrice !== "number" || b.salePrice <= 0 || b.salePrice >= b.price)
  ) {
    return { error: "Sale price must be a positive number less than the regular price" };
  }
  if (!Array.isArray(b?.categories) || b.categories.length === 0) {
    return { error: "Select at least one category" };
  }
  for (const c of b.categories) {
    if (!ALL_CATEGORIES.includes(c as never)) return { error: `Invalid category: ${c}` };
  }
  if (!Array.isArray(b?.images) || b.images.length === 0) {
    return { error: "At least one product image is required" };
  }
  if (typeof b?.stock !== "number" || b.stock < 0) return { error: "Stock must be 0 or more" };

  return {
    slug: b.slug.trim().toLowerCase().replace(/\s+/g, "-"),
    name: b.name.trim(),
    tagline: isNonEmptyString(b.tagline) ? b.tagline.trim() : "",
    price: b.price,
    salePrice: b.salePrice ? Number(b.salePrice) : undefined,
    categories: b.categories as ProductInput["categories"],
    images: b.images as string[],
    description: isNonEmptyString(b.description) ? b.description.trim() : "",
    highlights: Array.isArray(b.highlights) ? (b.highlights as string[]).filter(isNonEmptyString) : [],
    howToUse: isNonEmptyString(b.howToUse) ? b.howToUse.trim() : undefined,
    unit: isNonEmptyString(b.unit) ? b.unit.trim() : "",
    stock: Math.floor(b.stock),
    featured: Boolean(b.featured),
    badge: isNonEmptyString(b.badge) ? b.badge.trim() : undefined,
  };
}
