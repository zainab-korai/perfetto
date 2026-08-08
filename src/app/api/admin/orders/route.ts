import { NextRequest, NextResponse } from "next/server";
import { getOrders, updateOrderStatus } from "@/lib/orders";
import type { Order } from "@/lib/types";

export async function GET() {
  const orders = await getOrders();
  return NextResponse.json({ orders });
}

const VALID_STATUSES: Order["status"][] = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const status = body?.status as Order["status"] | undefined;

  if (!id || !status || !VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const updated = await updateOrderStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order: updated });
}
