import { createClient } from "@supabase/supabase-js";
import { products } from "../src/data/products";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;

if (!url || !key) {
  console.error("Missing SUPABASE_URL or SUPABASE_SECRET_KEY in environment");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

const DEFAULT_STOCK = 50;

async function main() {
  const rows = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    price: p.price,
    sale_price: p.salePrice ?? null,
    categories: p.categories,
    images: p.images,
    description: p.description,
    highlights: p.highlights,
    how_to_use: p.howToUse ?? null,
    unit: p.unit,
    stock: DEFAULT_STOCK,
    featured: p.featured ?? false,
    badge: p.badge ?? null,
  }));

  const { data, error } = await supabase
    .from("products")
    .upsert(rows, { onConflict: "slug" })
    .select("slug");

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${data.length} products.`);
}

main();
