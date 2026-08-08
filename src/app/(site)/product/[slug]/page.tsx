import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Leaf, Truck, Wallet, Check } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import AddToCartBar from "@/components/product/AddToCartBar";
import ProductCard from "@/components/product/ProductCard";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  effectivePrice,
  formatPKR,
} from "@/lib/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.name} — Perfetto` : "Product — Perfetto" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const price = effectivePrice(product);
  const related = getRelatedProducts(product);

  return (
    <div className="bg-[var(--color-cream)]">
      <div className="container-px mx-auto max-w-7xl py-10">
        <nav className="mb-8 text-sm text-[var(--color-ink)]/50">
          <Link href="/" className="hover:text-[var(--color-forest)]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-[var(--color-forest)]">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-ink)]">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
              {product.categories.join(" · ")}
            </p>
            <h1 className="mt-2 font-display text-4xl text-[var(--color-ink)]">{product.name}</h1>
            <p className="mt-2 text-[var(--color-ink)]/60">{product.tagline}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl text-[var(--color-forest)]">
                {formatPKR(price)}
              </span>
              {product.salePrice && (
                <span className="text-lg text-[var(--color-ink)]/40 line-through">
                  {formatPKR(product.price)}
                </span>
              )}
              <span className="text-sm text-[var(--color-ink)]/50">/ {product.unit}</span>
            </div>

            <p className="mt-6 max-w-lg leading-relaxed text-[var(--color-ink)]/70">
              {product.description}
            </p>

            {product.highlights.length > 0 && (
              <ul className="mt-5 space-y-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-[var(--color-ink)]/70">
                    <Check size={15} className="text-[var(--color-forest)]" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8">
              <AddToCartBar
                slug={product.slug}
                name={product.name}
                price={price}
                image={product.images[0]}
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[var(--color-sage-2)] pt-6 text-center text-xs text-[var(--color-ink)]/60">
              <div className="flex flex-col items-center gap-1.5">
                <Leaf size={20} className="text-[var(--color-forest)]" />
                100% Organic
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck size={20} className="text-[var(--color-forest)]" />
                Fast Delivery
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Wallet size={20} className="text-[var(--color-forest)]" />
                Cash on Delivery
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="mb-8 font-display text-2xl text-[var(--color-ink)]">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
