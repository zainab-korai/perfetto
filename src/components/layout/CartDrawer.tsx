"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/format";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQty, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[var(--color-cream)] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--color-sage-2)] p-5">
              <p className="font-display text-xl text-[var(--color-ink)]">Your Cart</p>
              <button onClick={closeDrawer} aria-label="Close cart" className="rounded-full p-2 hover:bg-[var(--color-sage)]">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <p className="mt-12 text-center text-[var(--color-ink)]/50">Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.slug} className="flex gap-3">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[var(--color-sage)]">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between">
                          <p className="font-medium text-[var(--color-ink)]">{item.name}</p>
                          <button onClick={() => removeItem(item.slug)} aria-label="Remove" className="text-[var(--color-ink)]/40 hover:text-red-500">
                            <X size={15} />
                          </button>
                        </div>
                        <p className="text-sm text-[var(--color-forest)]">{formatPKR(item.price)}</p>
                        <div className="mt-2 flex w-fit items-center gap-3 rounded-full border border-[var(--color-sage-2)] px-2 py-1">
                          <button onClick={() => updateQty(item.slug, item.qty - 1)} className="text-[var(--color-ink)]/60 hover:text-[var(--color-forest)]">
                            <Minus size={14} />
                          </button>
                          <span className="w-4 text-center text-sm">{item.qty}</span>
                          <button onClick={() => updateQty(item.slug, item.qty + 1)} className="text-[var(--color-ink)]/60 hover:text-[var(--color-forest)]">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--color-sage-2)] p-5">
                <div className="mb-4 flex items-center justify-between text-lg">
                  <span className="text-[var(--color-ink)]/70">Subtotal</span>
                  <span className="font-display font-semibold text-[var(--color-forest)]">{formatPKR(subtotal)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeDrawer}
                  className="btn-gold block rounded-full bg-[var(--color-forest)] py-3.5 text-center font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="mt-2 block text-center text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-forest)]"
                >
                  View full cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
