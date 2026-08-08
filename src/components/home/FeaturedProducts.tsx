"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export default function FeaturedProducts({ products: allProducts }: { products: Product[] }) {
  const products = allProducts.slice(0, 8);

  return (
    <section className="bg-[var(--color-cream-2)] py-24">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
              Most Loved
            </p>
            <h2 className="mt-3 font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
              Best Selling Formulas
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-2 text-sm font-medium text-[var(--color-forest)]"
          >
            View All Products
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
