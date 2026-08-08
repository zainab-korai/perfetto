"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { categories as allCategories } from "@/lib/categories";
import { effectivePrice } from "@/lib/format";
import type { Product } from "@/lib/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export default function ShopGrid({
  products,
  initialCategorySlug,
}: {
  products: Product[];
  initialCategorySlug?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategorySlug ?? null
  );
  const [sort, setSort] = useState<SortKey>("featured");

  const activeCategoryName = allCategories.find((c) => c.slug === activeCategory)?.name;

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategoryName) {
      list = list.filter((p) => p.categories.includes(activeCategoryName));
    }
    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
        break;
      case "price-desc":
        sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    }
    return sorted;
  }, [products, activeCategoryName, sort]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !activeCategory
                ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                : "border-[var(--color-sage-2)] text-[var(--color-ink)]/70 hover:border-[var(--color-forest)]"
            }`}
          >
            All
          </button>
          {allCategories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActiveCategory(c.slug)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                activeCategory === c.slug
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-sage-2)] text-[var(--color-ink)]/70 hover:border-[var(--color-forest)]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          className="rounded-full border border-[var(--color-sage-2)] bg-white px-4 py-1.5 text-sm text-[var(--color-ink)]/80 outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-[var(--color-ink)]/50">No products found.</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
        >
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </motion.div>
      )}
    </div>
  );
}
