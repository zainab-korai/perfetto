"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/products";
import { computeShipping } from "@/lib/site";

export default function CartPage() {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const shipping = computeShipping();

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto flex max-w-2xl flex-col items-center py-32 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
          <ShoppingBag size={32} />
        </div>
        <h1 className="mt-6 font-display text-3xl text-[var(--color-ink)]">Your cart is empty</h1>
        <p className="mt-2 text-[var(--color-ink)]/60">
          Looks like you haven&apos;t added anything yet. Let&apos;s fix that.
        </p>
        <Link
          href="/shop"
          className="btn-gold mt-8 rounded-full bg-[var(--color-forest)] px-8 py-3.5 font-medium text-white hover:bg-[var(--color-forest-deep)]"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-5xl py-14">
      <h1 className="font-display text-4xl text-[var(--color-ink)]">Your Cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item, i) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 rounded-2xl border border-[var(--color-sage-2)] bg-white p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[var(--color-sage)]">
                <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <Link href={`/product/${item.slug}`} className="font-display text-lg text-[var(--color-ink)] hover:text-[var(--color-forest)]">
                      {item.name}
                    </Link>
                    <p className="text-sm text-[var(--color-forest)]">{formatPKR(item.price)}</p>
                  </div>
                  <button onClick={() => removeItem(item.slug)} className="text-[var(--color-ink)]/40 hover:text-red-500" aria-label="Remove item">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 rounded-full border border-[var(--color-sage-2)] px-3 py-1.5">
                    <button onClick={() => updateQty(item.slug, item.qty - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span className="w-4 text-center text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.slug, item.qty + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                  <p className="font-medium text-[var(--color-ink)]">{formatPKR(item.price * item.qty)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-fit rounded-2xl border border-[var(--color-sage-2)] bg-white p-6">
          <h2 className="font-display text-xl text-[var(--color-ink)]">Order Summary</h2>
          <div className="mt-5 flex justify-between text-sm text-[var(--color-ink)]/70">
            <span>Subtotal</span>
            <span>{formatPKR(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-[var(--color-ink)]/70">
            <span>Delivery Charges</span>
            <span>{formatPKR(shipping)}</span>
          </div>
          <div className="mt-4 flex justify-between border-t border-[var(--color-sage-2)] pt-4 text-lg font-semibold text-[var(--color-ink)]">
            <span>Total</span>
            <span>{formatPKR(subtotal + shipping)}</span>
          </div>
          <Link
            href="/checkout"
            className="btn-gold mt-6 block rounded-full bg-[var(--color-forest)] py-3.5 text-center font-medium text-white hover:bg-[var(--color-forest-deep)]"
          >
            Proceed to Checkout
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-sm text-[var(--color-ink)]/60 hover:text-[var(--color-forest)]">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
