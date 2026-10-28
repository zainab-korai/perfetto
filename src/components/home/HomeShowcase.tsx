"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPKR } from "@/lib/format";

export interface ShowcaseProduct {
  slug: string;
  name: string;
  tagline: string;
  price: number; // final price jo customer dega
  oldPrice?: number; // cut wali price (agar sale hai)
  image: string;
  categories: string[];
  badge?: string;
  stock: number;
  featured: boolean;
}

export interface ShowcaseTab {
  slug: string;
  name: string;
  blurb: string;
}

export default function HomeShowcase({
  products,
  tabs,
}: {
  products: ShowcaseProduct[];
  tabs: ShowcaseTab[];
}) {
  const [active, setActive] = useState("best");
  const { addItem } = useCart();

  const visibleTabs = useMemo(
    () => tabs.filter((t) => products.some((p) => p.categories.includes(t.name))),
    [tabs, products]
  );

  const list = useMemo(() => {
    if (active === "best") {
      const f = products.filter((p) => p.featured);
      return (f.length ? f : products).slice(0, 8);
    }
    const t = tabs.find((x) => x.slug === active);
    return products.filter((p) => p.categories.includes(t?.name ?? "")).slice(0, 8);
  }, [active, products, tabs]);

  const activeTab = tabs.find((t) => t.slug === active);
  const viewAllHref = active === "best" ? "/shop" : `/product-category/${active}`;

  const pill = (isActive: boolean) =>
    `shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
        : "border-[var(--color-sage-2)] bg-white text-[var(--color-ink)] hover:border-[var(--color-forest)]"
    }`;

  return (
    <div>
      {/* Tabs */}
      <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
        <div className="flex gap-2 sm:flex-wrap">
          <button onClick={() => setActive("best")} className={pill(active === "best")}>
            Best Sellers
          </button>
          {visibleTabs.map((t) => (
            <button key={t.slug} onClick={() => setActive(t.slug)} className={pill(active === t.slug)}>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 min-h-[1.25rem] text-sm text-[var(--color-ink)]/60">
        {active === "best" ? "Our most loved formulas, picked by customers." : activeTab?.blurb}
      </p>

      {/* Products */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {list.map((p) => {
          const out = p.stock <= 0;
          const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
          return (
            <div
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-sage-2)] bg-white transition-shadow duration-300 hover:shadow-xl"
            >
              <Link href={`/product/${p.slug}`} className="relative block aspect-square overflow-hidden bg-[var(--color-sage)]">
                {out ? (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-ink)]/75 px-3 py-1 text-[11px] font-semibold uppercase text-white">
                    Out of Stock
                  </span>
                ) : off > 0 ? (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-gold)] px-3 py-1 text-[11px] font-bold uppercase text-[var(--color-forest-deep)]">
                    Save {off}%
                  </span>
                ) : p.badge ? (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-forest)] px-3 py-1 text-[11px] font-semibold uppercase text-white">
                    {p.badge}
                  </span>
                ) : null}
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                      out ? "opacity-60 grayscale" : ""
                    }`}
                  />
                )}
              </Link>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <Link
                  href={`/product/${p.slug}`}
                  className="font-display text-base leading-tight text-[var(--color-ink)] hover:text-[var(--color-forest)] sm:text-lg"
                >
                  {p.name}
                </Link>
                <p className="line-clamp-1 text-sm text-[var(--color-ink)]/60">{p.tagline}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-semibold text-[var(--color-forest)]">{formatPKR(p.price)}</span>
                  {p.oldPrice && (
                    <span className="text-xs text-[var(--color-ink)]/40 line-through">
                      {formatPKR(p.oldPrice)}
                    </span>
                  )}
                </div>
                <button
                  disabled={out}
                  onClick={() =>
                    addItem({ slug: p.slug, name: p.name, price: p.price, image: p.image }, 1)
                  }
                  className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-forest-deep)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ShoppingBag size={15} />
                  {out ? "Sold Out" : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {list.length === 0 && (
        <p className="py-10 text-center text-[var(--color-ink)]/50">Products coming soon.</p>
      )}

      <div className="mt-8 text-center">
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-forest)] px-7 py-3 text-sm font-medium text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
        >
          View all {active === "best" ? "products" : activeTab?.name} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}