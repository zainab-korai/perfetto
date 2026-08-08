"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function AddToCartBar({
  slug,
  name,
  price,
  image,
}: {
  slug: string;
  name: string;
  price: number;
  image: string;
}) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-4 rounded-full border border-[var(--color-sage-2)] px-4 py-2.5">
        <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
          <Minus size={16} />
        </button>
        <span className="w-5 text-center font-medium">{qty}</span>
        <button onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={() => addItem({ slug, name, price, image }, qty)}
        className="btn-gold flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-7 py-3.5 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
      >
        <ShoppingBag size={17} /> Add to Cart
      </button>
      <button
        onClick={() => {
          addItem({ slug, name, price, image }, qty);
          router.push("/checkout");
        }}
        className="rounded-full border border-[var(--color-forest)] px-7 py-3.5 font-medium text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
      >
        Buy Now
      </button>
    </div>
  );
}
