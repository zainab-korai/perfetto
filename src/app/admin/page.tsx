import OrdersTable from "@/components/admin/OrdersTable";
import LogoutButton from "@/components/admin/LogoutButton";
import { getOrders } from "@/lib/orders";

export const metadata = { title: "Admin Dashboard — Perfetto" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const orders = await getOrders();

  return (
    <div className="container-px mx-auto max-w-7xl py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="font-display text-2xl text-[var(--color-forest)]">
            Perfetto<span className="text-[var(--color-gold)]">.</span> Admin
          </p>
          <p className="text-sm text-[var(--color-ink)]/50">Orders Dashboard</p>
        </div>
        <LogoutButton />
      </div>

      <OrdersTable initialOrders={orders} />
    </div>
  );
}
