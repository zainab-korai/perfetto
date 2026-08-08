"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, RefreshCw } from "lucide-react";
import type { Order } from "@/lib/types";
import { formatPKR } from "@/lib/products";

const STATUS_OPTIONS: Order["status"][] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

const STATUS_COLORS: Record<Order["status"], string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersTable({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");

  const filtered = useMemo(
    () => (statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter)),
    [orders, statusFilter]
  );

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, o) => sum + o.total, 0);
    const pending = orders.filter((o) => o.status === "pending").length;
    return { total: orders.length, revenue, pending };
  }, [orders]);

  async function refresh() {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } finally {
      setRefreshing(false);
    }
  }

  async function updateStatus(id: string, status: Order["status"]) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-sage-2)] bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-[var(--color-ink)]/50">Total Orders</p>
          <p className="mt-1 font-display text-3xl text-[var(--color-ink)]">{stats.total}</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-sage-2)] bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-[var(--color-ink)]/50">Pending</p>
          <p className="mt-1 font-display text-3xl text-amber-600">{stats.pending}</p>
        </div>
        <div className="rounded-2xl border border-[var(--color-sage-2)] bg-white p-5">
          <p className="text-xs uppercase tracking-wider text-[var(--color-ink)]/50">Total Revenue</p>
          <p className="mt-1 font-display text-3xl text-[var(--color-forest)]">{formatPKR(stats.revenue)}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              statusFilter === "all"
                ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                : "border-[var(--color-sage-2)] text-[var(--color-ink)]/70"
            }`}
          >
            All
          </button>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-full border px-4 py-1.5 text-sm capitalize ${
                statusFilter === s
                  ? "border-[var(--color-forest)] bg-[var(--color-forest)] text-white"
                  : "border-[var(--color-sage-2)] text-[var(--color-ink)]/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 rounded-full border border-[var(--color-sage-2)] px-4 py-1.5 text-sm text-[var(--color-ink)]/70 hover:border-[var(--color-forest)]"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[var(--color-ink)]/50">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-sage-2)] bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[var(--color-sage)]/50 text-xs uppercase tracking-wider text-[var(--color-ink)]/50">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Delivery Address</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <FragmentRow
                  key={order.id}
                  order={order}
                  expanded={expanded === order.id}
                  onToggle={() => setExpanded(expanded === order.id ? null : order.id)}
                  onStatusChange={(s) => updateStatus(order.id, s)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FragmentRow({
  order,
  expanded,
  onToggle,
  onStatusChange,
}: {
  order: Order;
  expanded: boolean;
  onToggle: () => void;
  onStatusChange: (s: Order["status"]) => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className="cursor-pointer border-t border-[var(--color-sage-2)] hover:bg-[var(--color-sage)]/20"
      >
        <td className="px-5 py-4">
          <span className="flex items-center gap-2 font-mono text-xs text-[var(--color-forest)]">
            <ChevronDown size={14} className={`shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} />
            {order.id}
          </span>
          <p className="mt-1 text-xs text-[var(--color-ink)]/40">
            {new Date(order.createdAt).toLocaleString("en-PK")}
          </p>
        </td>
        <td className="px-5 py-4">
          <p className="font-medium text-[var(--color-ink)]">{order.customer.name}</p>
          <p className="text-xs text-[var(--color-ink)]/50">{order.customer.phone}</p>
        </td>
        <td className="max-w-[220px] px-5 py-4 text-[var(--color-ink)]/70">
          <p className="truncate">{order.customer.address}</p>
          <p className="text-xs text-[var(--color-ink)]/50">{order.customer.city}</p>
        </td>
        <td className="px-5 py-4 text-[var(--color-ink)]/70">
          {order.items.reduce((s, i) => s + i.qty, 0)} pcs
        </td>
        <td className="px-5 py-4 font-medium text-[var(--color-ink)]">{formatPKR(order.total)}</td>
        <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
          <select
            value={order.status}
            onChange={(e) => onStatusChange(e.target.value as Order["status"])}
            className={`rounded-full border-0 px-3 py-1 text-xs font-medium capitalize outline-none ${STATUS_COLORS[order.status]}`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </td>
        <td className="px-5 py-4" />
      </tr>
      <AnimatePresence>
        {expanded && (
          <tr>
            <td colSpan={7} className="border-t border-[var(--color-sage-2)] bg-[var(--color-cream)] p-0">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid gap-6 p-6 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-[var(--color-ink)]/40">
                      Customer Details
                    </p>
                    <p className="text-sm text-[var(--color-ink)]">{order.customer.name}</p>
                    <p className="text-sm text-[var(--color-ink)]/70">{order.customer.phone}</p>
                    {order.customer.email && (
                      <p className="text-sm text-[var(--color-ink)]/70">{order.customer.email}</p>
                    )}
                    <p className="mt-2 text-sm text-[var(--color-ink)]/70">
                      {order.customer.address}, {order.customer.city}
                    </p>
                    {order.customer.notes && (
                      <div className="mt-3">
                        <p className="mb-1 text-xs uppercase tracking-wider text-[var(--color-ink)]/40">
                          Order Notes
                        </p>
                        <p className="rounded-lg bg-white p-3 text-sm text-[var(--color-ink)]/70">
                          &ldquo;{order.customer.notes}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-[var(--color-ink)]/40">
                      Items
                    </p>
                    <ul className="space-y-1.5">
                      {order.items.map((item) => (
                        <li key={item.slug} className="flex justify-between text-sm text-[var(--color-ink)]/80">
                          <span>{item.name} × {item.qty}</span>
                          <span>{formatPKR(item.price * item.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 space-y-1 border-t border-[var(--color-sage-2)] pt-2 text-sm">
                      <div className="flex justify-between text-[var(--color-ink)]/60">
                        <span>Subtotal</span>
                        <span>{formatPKR(order.subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-[var(--color-ink)]/60">
                        <span>Delivery Charges</span>
                        <span>{formatPKR(order.shipping)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-[var(--color-ink)]">
                        <span>Total</span>
                        <span>{formatPKR(order.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </td>
          </tr>
        )}
      </AnimatePresence>
    </>
  );
}
