"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { getFeaturedProducts, effectivePrice, formatPKR } from "@/lib/products";

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);

  const product = getFeaturedProducts()[1] ?? getFeaturedProducts()[0];
  if (!product) return null;
  const price = effectivePrice(product);

  return (
    <section ref={ref} className="py-24">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-[var(--color-sage)] lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden lg:min-h-[520px]">
            <motion.div style={{ scale }} className="absolute inset-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
                Editor&apos;s Pick
              </p>
              <h2 className="mt-3 font-display text-3xl text-[var(--color-ink)] sm:text-4xl lg:text-5xl">
                {product.name}
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-[var(--color-ink)]/70">
                {product.description}
              </p>
              {product.highlights.length > 0 && (
                <ul className="mt-6 space-y-2">
                  {product.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-[var(--color-ink)]/70">
                      <Check size={15} className="text-[var(--color-forest)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-7 flex items-center gap-4">
                <span className="font-display text-2xl text-[var(--color-forest)]">
                  {formatPKR(price)}
                </span>
                {product.salePrice && (
                  <span className="text-[var(--color-ink)]/40 line-through">
                    {formatPKR(product.price)}
                  </span>
                )}
              </div>
              <Link
                href={`/product/${product.slug}`}
                className="btn-gold group mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-8 py-4 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
              >
                Shop This Formula
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
