import AdminNav from "@/components/admin/AdminNav";
import ProductsTable from "@/components/admin/ProductsTable";
import { getAllProducts } from "@/lib/products";

export const metadata = { title: "Products — Perfetto Admin" };
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <AdminNav />
      <ProductsTable initialProducts={products} />
    </div>
  );
}
