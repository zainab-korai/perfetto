"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/format";

export default function StickyAddToCart({
  slug,
  name,
  price,
  image,
  stock,
  triggerId,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  triggerId: string;
}) {
  const [visible, setVisible] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(trigger);
    return () => observer.disconnect();
  }, [triggerId]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-sage-2)] bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)]"
        >
          <div className="container-px mx-auto flex max-w-7xl items-center justify-between gap-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[var(--color-sage)]">
                <Image src={image} alt={name} fill sizes="44px" className="object-cover" />
              </div>
              <div>
                <p className="line-clamp-1 text-sm font-medium text-[var(--color-ink)]">{name}</p>
                <p className="text-sm text-[var(--color-forest)]">{formatPKR(price)}</p>
              </div>
            </div>
            {stock > 0 ? (
              <button
                onClick={() => addItem({ slug, name, price, image }, 1)}
                className="btn-gold flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-forest-deep)]"
              >
                <ShoppingBag size={15} />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
            ) : (
              <span className="shrink-0 rounded-full bg-[var(--color-ink)]/10 px-5 py-2.5 text-sm font-medium text-[var(--color-ink)]/50">
                Out of Stock
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
