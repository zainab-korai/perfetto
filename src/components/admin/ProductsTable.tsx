"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPKR } from "@/lib/format";

export default function ProductsTable({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete(product: Product) {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    setDeletingSlug(product.slug);
    const res = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Failed to delete product");
    }
    setDeletingSlug(null);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[var(--color-ink)]/50">{products.length} products</p>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-full bg-[var(--color-forest)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-forest-deep)]"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="py-20 text-center text-[var(--color-ink)]/50">No products yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-sage-2)] bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[var(--color-sage)]/50 text-xs uppercase tracking-wider text-[var(--color-ink)]/50">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3">Featured</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-[var(--color-sage-2)] hover:bg-[var(--color-sage)]/20">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[var(--color-sage)]">
                        {p.images[0] && (
                          <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-ink)]">{p.name}</p>
                        <p className="text-xs text-[var(--color-ink)]/40">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[var(--color-ink)]/70">{p.categories.join(", ")}</td>
                  <td className="px-5 py-3">
                    <span className="font-medium text-[var(--color-forest)]">
                      {formatPKR(p.salePrice ?? p.price)}
                    </span>
                    {p.salePrice && (
                      <span className="ml-2 text-xs text-[var(--color-ink)]/40 line-through">
                        {formatPKR(p.price)}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={
                        p.stock <= 0
                          ? "text-red-600"
                          : p.stock <= 10
                            ? "text-amber-600"
                            : "text-[var(--color-ink)]/70"
                      }
                    >
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {p.featured && (
                      <span className="rounded-full bg-[var(--color-gold)]/20 px-2.5 py-1 text-xs font-medium text-[var(--color-gold-deep)]">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-sage-2)] text-[var(--color-ink)]/60 hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
                        aria-label={`Edit ${p.name}`}
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p)}
                        disabled={deletingSlug === p.slug}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-sage-2)] text-[var(--color-ink)]/60 hover:border-red-400 hover:text-red-500 disabled:opacity-40"
                        aria-label={`Delete ${p.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
