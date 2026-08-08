import AdminNav from "@/components/admin/AdminNav";
import ProductForm from "@/components/admin/ProductForm";

export const metadata = { title: "Add Product — Perfetto Admin" };

export default function NewProductPage() {
  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <AdminNav />
      <h1 className="mb-6 font-display text-2xl text-[var(--color-ink)]">Add Product</h1>
      <ProductForm />
    </div>
  );
}
