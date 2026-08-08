import type { Metadata } from "next";
import ShopGrid from "@/components/shop/ShopGrid";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop All Products — Perfetto",
  description: "Browse Perfetto's full range of herbal wellness products — weight management, hair care, skin care, and more.",
};

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="bg-[var(--color-cream)]">
      <div className="border-b border-[var(--color-sage-2)] bg-[var(--color-sage)]/40 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
          The Full Range
        </p>
        <h1 className="mt-3 font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
          Shop All Products
        </h1>
      </div>
      <div className="container-px mx-auto max-w-7xl py-14">
        <ShopGrid products={products} />
      </div>
    </div>
  );
}
