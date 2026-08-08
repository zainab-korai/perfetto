"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";

const PREFERRED_SLUGS = [
  "pure-glow",
  "hair-supplement-plus",
  "heightox-60-caps",
  "perfetto-sleep",
  "charcoal-mask",
  "weight-loss-supplement-pro",
];

export default function Gallery({ products }: { products: Product[] }) {
  const preferred = PREFERRED_SLUGS.map((slug) =>
    products.find((p) => p.slug === slug)
  ).filter((p): p is Product => Boolean(p));
  const rest = products.filter((p) => !preferred.some((pp) => pp.slug === p.slug));
  const picks = [...preferred, ...rest].slice(0, 6);

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
            The Collection
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
            Crafted to Be Noticed
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {picks.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-[var(--color-sage)]"
            >
              <Link href={`/product/${product.slug}`} className="block h-full w-full">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-lg text-white">{product.name}</p>
                  <p className="text-xs text-white/70">{product.categories[0]}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
