"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Plus, Trash2, UploadCloud, X } from "lucide-react";
import { ALL_CATEGORIES } from "@/lib/types";
import type { Category, Product, ProductInput } from "@/lib/types";

interface FormState {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  price: string;
  salePrice: string;
  categories: Category[];
  images: string[];
  highlights: string[];
  unit: string;
  stock: string;
  featured: boolean;
  badge: string;
}

function toFormState(p?: Product): FormState {
  return {
    name: p?.name ?? "",
    slug: p?.slug ?? "",
    tagline: p?.tagline ?? "",
    description: p?.description ?? "",
    price: p?.price?.toString() ?? "",
    salePrice: p?.salePrice?.toString() ?? "",
    categories: p?.categories ?? [],
    images: p?.images ?? [],
    highlights: p?.highlights?.length ? p.highlights : [""],
    unit: p?.unit ?? "",
    stock: p?.stock?.toString() ?? "0",
    featured: p?.featured ?? false,
    badge: p?.badge ?? "",
  };
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ProductForm({ product }: { product?: Product }) {
  const isEdit = !!product;
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>(toFormState(product));
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onNameChange(name: string) {
    update("name", name);
    if (!slugTouched) update("slug", slugify(name));
  }

  function toggleCategory(cat: Category) {
    setForm((f) => ({
      ...f,
      categories: f.categories.includes(cat)
        ? f.categories.filter((c) => c !== cat)
        : [...f.categories, cat],
    }));
  }

  async function onFilesSelected(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        update("images", [...form.images, data.url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removeImage(url: string) {
    update("images", form.images.filter((i) => i !== url));
  }

  function updateHighlight(i: number, value: string) {
    const next = [...form.highlights];
    next[i] = value;
    update("highlights", next);
  }

  function removeHighlight(i: number) {
    update("highlights", form.highlights.filter((_, idx) => idx !== i));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const price = Number(form.price);
    const salePrice = form.salePrice ? Number(form.salePrice) : undefined;
    const stock = Number(form.stock);

    if (!form.name.trim()) return setError("Name is required");
    if (!form.slug.trim()) return setError("Slug is required");
    if (!price || price <= 0) return setError("Enter a valid price");
    if (salePrice !== undefined && (salePrice <= 0 || salePrice >= price)) {
      return setError("Sale price must be less than the regular price");
    }
    if (form.categories.length === 0) return setError("Select at least one category");
    if (form.images.length === 0) return setError("Upload at least one product image");
    if (Number.isNaN(stock) || stock < 0) return setError("Enter a valid stock quantity");

    const payload: ProductInput = {
      name: form.name.trim(),
      slug: slugify(form.slug),
      tagline: form.tagline.trim(),
      description: form.description.trim(),
      price,
      salePrice,
      categories: form.categories,
      images: form.images,
      highlights: form.highlights.map((h) => h.trim()).filter(Boolean),
      unit: form.unit.trim(),
      stock,
      featured: form.featured,
      badge: form.badge.trim() || undefined,
    };

    setSubmitting(true);
    try {
      const res = await fetch(
        isEdit ? `/api/admin/products/${product!.id}` : "/api/admin/products",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Product Name *</label>
          <input
            value={form.name}
            onChange={(e) => onNameChange(e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Slug *</label>
          <input
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              update("slug", e.target.value);
            }}
            className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 font-mono text-sm outline-none focus:border-[var(--color-forest)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)]">Tagline</label>
        <input
          value={form.tagline}
          onChange={(e) => update("tagline", e.target.value)}
          placeholder="Short one-line description shown on product cards"
          className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)]">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={4}
          className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Price (Rs) *</label>
          <input
            type="number"
            min={0}
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Sale Price (Rs)</label>
          <input
            type="number"
            min={0}
            value={form.salePrice}
            onChange={(e) => update("salePrice", e.target.value)}
            placeholder="Optional"
            className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Stock *</label>
          <input
            type="number"
            min={0}
            value={form.stock}
            onChange={(e) => update("stock", e.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Unit</label>
          <input
            value={form.unit}
            onChange={(e) => update("unit", e.target.value)}
            placeholder="e.g. 60 Capsules, 1 Bottle"
            className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--color-ink)]">Badge</label>
          <input
            value={form.badge}
            onChange={(e) => update("badge", e.target.value)}
            placeholder="e.g. Best Seller, New, Bundle Deal"
            className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2.5 outline-none focus:border-[var(--color-forest)]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)]">Categories *</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                form.categories.includes(cat)
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-sage-2)] text-[var(--color-ink)]/70"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)]">Highlights</label>
        <div className="mt-2 space-y-2">
          {form.highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={h}
                onChange={(e) => updateHighlight(i, e.target.value)}
                placeholder="e.g. Herbal formulation"
                className="w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-2 text-sm outline-none focus:border-[var(--color-forest)]"
              />
              <button
                type="button"
                onClick={() => removeHighlight(i)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-sage-2)] text-[var(--color-ink)]/50 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update("highlights", [...form.highlights, ""])}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-forest)]"
          >
            <Plus size={14} /> Add highlight
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-ink)]">Product Images *</label>
        <div className="mt-2 flex flex-wrap gap-3">
          {form.images.map((url) => (
            <div key={url} className="relative h-24 w-24 overflow-hidden rounded-xl border border-[var(--color-sage-2)]">
              <Image src={url} alt="" fill sizes="96px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[var(--color-sage-2)] text-[var(--color-ink)]/50 hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] disabled:opacity-50"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
            <span className="text-[11px]">{uploading ? "Uploading" : "Upload"}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={(e) => onFilesSelected(e.target.files)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update("featured", e.target.checked)}
          className="h-4 w-4 rounded border-[var(--color-sage-2)] accent-[var(--color-forest)]"
        />
        <span className="text-sm text-[var(--color-ink)]">Feature on homepage</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 border-t border-[var(--color-sage-2)] pt-6">
        <button
          type="submit"
          disabled={submitting || uploading}
          className="btn-gold rounded-full bg-[var(--color-forest)] px-7 py-3 font-medium text-white hover:bg-[var(--color-forest-deep)] disabled:opacity-50"
        >
          {submitting ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="rounded-full border border-[var(--color-sage-2)] px-7 py-3 font-medium text-[var(--color-ink)]/70"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}