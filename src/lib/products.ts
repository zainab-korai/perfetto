import "server-only";
import { supabase } from "./supabase";
import { categories, categorySlugToName } from "./categories";
import { effectivePrice, formatPKR } from "./format";
import type { Category, Product, ProductInput } from "./types";

export { categories, categorySlugToName, effectivePrice, formatPKR };

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  sale_price: number | null;
  categories: string[];
  images: string[];
  description: string;
  highlights: string[];
  how_to_use: string | null;
  unit: string;
  stock: number;
  featured: boolean;
  badge: string | null;
}

function rowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    price: row.price,
    salePrice: row.sale_price ?? undefined,
    categories: row.categories as Category[],
    images: row.images,
    description: row.description,
    highlights: row.highlights,
    howToUse: row.how_to_use ?? undefined,
    unit: row.unit,
    stock: row.stock,
    featured: row.featured,
    badge: row.badge ?? undefined,
  };
}

function productToRow(product: ProductInput) {
  return {
    slug: product.slug,
    name: product.name,
    tagline: product.tagline,
    price: product.price,
    sale_price: product.salePrice ?? null,
    categories: product.categories,
    images: product.images,
    description: product.description,
    highlights: product.highlights,
    how_to_use: product.howToUse ?? null,
    unit: product.unit,
    stock: product.stock,
    featured: product.featured ?? false,
    badge: product.badge ?? null,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw new Error(`Failed to load products: ${error.message}`);
  return (data as ProductRow[]).map(rowToProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? rowToProduct(data as ProductRow) : undefined;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? rowToProduct(data as ProductRow) : undefined;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.featured);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.categories.some((c) => product.categories.includes(c))
    )
    .slice(0, limit);
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const name = categorySlugToName(slug);
  if (!name) return [];
  const all = await getAllProducts();
  return all.filter((p) => p.categories.includes(name));
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert(productToRow(input))
    .select("*")
    .single();
  if (error) throw new Error(`Failed to create product: ${error.message}`);
  return rowToProduct(data as ProductRow);
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update({ ...productToRow(input), updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(`Failed to update product: ${error.message}`);
  return rowToProduct(data as ProductRow);
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(`Failed to delete product: ${error.message}`);
}

export async function decrementStock(id: string, qty: number): Promise<void> {
  const { error } = await supabase.rpc("decrement_product_stock", {
    p_id: id,
    p_qty: qty,
  });
  if (error) throw new Error(`Failed to update stock: ${error.message}`);
}
