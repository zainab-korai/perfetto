import { notFound } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import ProductForm from "@/components/admin/ProductForm";
import { getProductById } from "@/lib/products";

export const metadata = { title: "Edit Product — Perfetto Admin" };
export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <AdminNav />
      <h1 className="mb-6 font-display text-2xl text-[var(--color-ink)]">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
