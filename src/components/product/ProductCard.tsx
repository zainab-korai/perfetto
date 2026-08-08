"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";
import { effectivePrice, formatPKR } from "@/lib/format";
import { useCart } from "@/lib/cart-context";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const price = effectivePrice(product);
  const onSale = !!product.salePrice;
  const outOfStock = product.stock <= 0;

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), springConfig);
  const glareX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 8) * 0.05, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="group relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-sage-2)] bg-white/70 backdrop-blur-sm shadow-sm transition-shadow duration-500 hover:shadow-2xl"
      >
        <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[var(--color-sage)]">
          {outOfStock ? (
            <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-ink)]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              Out of Stock
            </span>
          ) : (
            (product.badge || onSale) && (
              <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-forest)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                {product.badge || "Sale"}
              </span>
            )
          )}
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${outOfStock ? "opacity-60 grayscale" : ""}`}
          />
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.35), transparent 60%)`,
            }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </Link>
        <div className="flex flex-1 flex-col gap-1 p-4">
          <p className="text-[11px] uppercase tracking-wider text-[var(--color-gold-deep)]">
            {product.categories[0]}
          </p>
          <Link href={`/product/${product.slug}`} className="font-display text-lg leading-tight text-[var(--color-ink)] hover:text-[var(--color-forest)]">
            {product.name}
          </Link>
          <p className="text-sm text-[var(--color-ink)]/60 line-clamp-1">{product.tagline}</p>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-[var(--color-forest)]">{formatPKR(price)}</span>
              {onSale && (
                <span className="text-xs text-[var(--color-ink)]/40 line-through">
                  {formatPKR(product.price)}
                </span>
              )}
            </div>
            {!outOfStock && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(
                    { slug: product.slug, name: product.name, price, image: product.images[0] },
                    1
                  );
                }}
                aria-label={`Add ${product.name} to cart`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-forest)] text-white transition-transform hover:scale-110 hover:bg-[var(--color-gold)]"
              >
                <ShoppingBag size={16} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
