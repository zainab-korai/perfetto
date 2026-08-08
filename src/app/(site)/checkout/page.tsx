"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Wallet } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/format";
import { computeShipping } from "@/lib/site";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  const shipping = computeShipping();
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto flex max-w-xl flex-col items-center py-32 text-center">
        <h1 className="font-display text-3xl text-[var(--color-ink)]">Your cart is empty</h1>
        <p className="mt-2 text-[var(--color-ink)]/60">Add some products before checking out.</p>
        <Link
          href="/shop"
          className="btn-gold mt-8 rounded-full bg-[var(--color-forest)] px-8 py-3.5 font-medium text-white hover:bg-[var(--color-forest-deep)]"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({ slug: i.slug, qty: i.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      clearCart();
      router.push(`/order-confirmation/${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-px mx-auto max-w-6xl py-14">
      <h1 className="font-display text-4xl text-[var(--color-ink)]">Checkout</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <form onSubmit={onSubmit} className="space-y-5 lg:col-span-3">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)]">Full Name *</label>
              <input
                required
                value={form.name}
                onChange={update("name")}
                className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)]">Phone Number *</label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={update("phone")}
                placeholder="03XX XXXXXXX"
                className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)]">Email (optional)</label>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)]">City *</label>
              <input
                required
                value={form.city}
                onChange={update("city")}
                className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-ink)]">Delivery Address *</label>
              <input
                required
                value={form.address}
                onChange={update("address")}
                className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--color-ink)]">Order Notes (optional)</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={update("notes")}
              className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
            />
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 p-4">
            <Wallet size={20} className="text-[var(--color-gold-deep)]" />
            <div>
              <p className="text-sm font-medium text-[var(--color-ink)]">Cash on Delivery</p>
              <p className="text-xs text-[var(--color-ink)]/60">Pay in cash when your order arrives. No advance payment required.</p>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full rounded-full bg-[var(--color-forest)] py-4 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)] disabled:opacity-50"
          >
            {submitting ? "Placing Order..." : `Place Order — ${formatPKR(total)}`}
          </button>
        </form>

        <div className="h-fit rounded-2xl border border-[var(--color-sage-2)] bg-white p-6 lg:col-span-2">
          <h2 className="font-display text-xl text-[var(--color-ink)]">Order Summary</h2>
          <ul className="mt-5 space-y-4">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-sage)]">
                  <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-forest)] text-[10px] text-white">
                    {item.qty}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--color-ink)]">{item.name}</p>
                </div>
                <p className="text-sm text-[var(--color-ink)]/70">{formatPKR(item.price * item.qty)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-2 border-t border-[var(--color-sage-2)] pt-4 text-sm">
            <div className="flex justify-between text-[var(--color-ink)]/70">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-[var(--color-ink)]/70">
              <span>Delivery Charges</span>
              <span>{formatPKR(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-[var(--color-sage-2)] pt-2 text-base font-semibold text-[var(--color-ink)]">
              <span>Total</span>
              <span>{formatPKR(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
