"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getAllProducts, formatPKR } from "@/lib/products";

export default function ValuePacks() {
  const combos = getAllProducts().filter((p) => p.name.toLowerCase().includes("combo") || p.badge === "Bundle Deal");

  if (combos.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-forest)] py-24 text-white">
      <div className="grain absolute inset-0" />
      <div className="container-px relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)]">
            Best Value
          </p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Value Packs & Bundles</h2>
          <p className="mt-4 max-w-lg text-white/60">
            Multi-month courses at a special bundled price — the smart way to
            stay consistent with your wellness routine.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {combos.map((c, i) => {
            const pct = c.salePrice
              ? Math.round(((c.price - c.salePrice) / c.price) * 100)
              : null;
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                {pct && (
                  <span className="absolute right-5 top-5 z-10 rounded-full bg-[var(--color-gold)] px-3 py-1 text-xs font-bold text-[var(--color-forest-deep)]">
                    Save {pct}%
                  </span>
                )}
                <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl bg-white/10">
                  <Image
                    src={c.images[0]}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="font-display text-xl">{c.name}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-semibold text-[var(--color-gold-light)]">
                    {formatPKR(c.salePrice ?? c.price)}
                  </span>
                  {c.salePrice && (
                    <span className="text-sm text-white/40 line-through">{formatPKR(c.price)}</span>
                  )}
                </div>
                <Link
                  href={`/product/${c.slug}`}
                  className="mt-5 inline-block rounded-full border border-white/25 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white hover:text-[var(--color-forest-deep)]"
                >
                  Shop Bundle
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
