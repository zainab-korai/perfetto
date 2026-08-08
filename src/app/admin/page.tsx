import OrdersTable from "@/components/admin/OrdersTable";
import AdminNav from "@/components/admin/AdminNav";
import { getOrders } from "@/lib/orders";

export const metadata = { title: "Admin Dashboard — Perfetto" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const orders = await getOrders();

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <AdminNav />
      <OrdersTable initialOrders={orders} />
    </div>
  );
}
