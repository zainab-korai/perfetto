"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/lib/categories";
import type { Product } from "@/lib/types";

export default function CategoryGrid({ products }: { products: Product[] }) {
  return (
    <section className="py-24">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
            Shop by Concern
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
            Find What Your Body Needs
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c, i) => {
            const sample = products.find((p) => p.categories.includes(c.name));
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              >
                <Link
                  href={`/product-category/${c.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--color-forest)]"
                >
                  {sample && (
                    <Image
                      src={sample.images[0]}
                      alt={c.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover opacity-70 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-display text-lg text-white">{c.name}</p>
                    <p className="mt-0.5 text-xs text-white/60">{c.blurb}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
