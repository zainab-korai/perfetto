import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShopGrid from "@/components/shop/ShopGrid";
import { categories, categorySlugToName } from "@/lib/categories";
import { getAllProducts } from "@/lib/products";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = categorySlugToName(slug);
  return {
    title: name ? `${name} — Perfetto` : "Category — Perfetto",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <div className="bg-[var(--color-cream)]">
      <div className="border-b border-[var(--color-sage-2)] bg-[var(--color-sage)]/40 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
          Shop by Concern
        </p>
        <h1 className="mt-3 font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-2 text-[var(--color-ink)]/60">{category.blurb}</p>
      </div>
      <div className="container-px mx-auto max-w-7xl py-14">
        <ShopGrid products={await getAllProducts()} initialCategorySlug={slug} />
      </div>
    </div>
  );
}
