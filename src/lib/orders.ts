import "server-only";
import { supabase } from "./supabase";
import type { Order } from "./types";

interface OrderRow {
  id: string;
  created_at: string;
  customer: Order["customer"];
  items: Order["items"];
  subtotal: number;
  shipping: number;
  total: number;
  payment_method: Order["paymentMethod"];
  status: Order["status"];
}

function rowToOrder(row: OrderRow): Order {
  return {
    id: row.id,
    createdAt: row.created_at,
    customer: row.customer,
    items: row.items,
    subtotal: row.subtotal,
    shipping: row.shipping,
    total: row.total,
    paymentMethod: row.payment_method,
    status: row.status,
  };
}

async function nextOrderId(): Promise<string> {
  const year = new Date().getFullYear();
  const { count, error } = await supabase
    .from("orders")
    .select("id", { count: "exact", head: true })
    .like("id", `PF-${year}-%`);
  if (error) throw new Error(`Failed to generate order id: ${error.message}`);
  const seq = (count ?? 0) + 1;
  return `PF-${year}-${String(seq).padStart(4, "0")}`;
}

export async function createOrder(
  order: Omit<Order, "id" | "createdAt" | "status">
): Promise<Order> {
  for (let attempt = 0; attempt < 3; attempt++) {
    const id = await nextOrderId();
    const { data, error } = await supabase
      .from("orders")
      .insert({
        id,
        customer: order.customer,
        items: order.items,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        payment_method: order.paymentMethod,
        status: "pending",
      })
      .select("*")
      .single();

    if (!error) return rowToOrder(data as OrderRow);
    // 23505 = unique_violation (rare id collision from concurrent orders) — retry with next id
    if (error.code !== "23505") {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }
  throw new Error("Failed to create order after multiple attempts");
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to load orders: ${error.message}`);
  return (data as OrderRow[]).map(rowToOrder);
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`Failed to load order: ${error.message}`);
  return data ? rowToOrder(data as OrderRow) : undefined;
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<Order | undefined> {
  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(`Failed to update order: ${error.message}`);
  return data ? rowToOrder(data as OrderRow) : undefined;
}
