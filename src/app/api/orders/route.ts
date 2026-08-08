import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { getProductBySlug, effectivePrice } from "@/lib/products";
import { computeShipping } from "@/lib/site";
import type { CustomerInfo, OrderItem } from "@/lib/types";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const customerInput = body?.customer;
  const itemsInput = body?.items;

  if (
    !customerInput ||
    !isNonEmptyString(customerInput.name) ||
    !isNonEmptyString(customerInput.phone) ||
    !isNonEmptyString(customerInput.address) ||
    !isNonEmptyString(customerInput.city)
  ) {
    return NextResponse.json({ error: "Missing required customer details" }, { status: 400 });
  }

  if (!Array.isArray(itemsInput) || itemsInput.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const items: OrderItem[] = [];
  for (const raw of itemsInput) {
    const product = isNonEmptyString(raw?.slug) ? getProductBySlug(raw.slug) : undefined;
    const qty = Number(raw?.qty);
    if (!product || !Number.isFinite(qty) || qty <= 0 || qty > 50) {
      return NextResponse.json({ error: "Invalid item in cart" }, { status: 400 });
    }
    items.push({
      slug: product.slug,
      name: product.name,
      price: effectivePrice(product),
      qty: Math.floor(qty),
      image: product.images[0],
    });
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = computeShipping();
  const total = subtotal + shipping;

  const customer: CustomerInfo = {
    name: customerInput.name.trim(),
    phone: customerInput.phone.trim(),
    email: isNonEmptyString(customerInput.email) ? customerInput.email.trim() : undefined,
    address: customerInput.address.trim(),
    city: customerInput.city.trim(),
    notes: isNonEmptyString(customerInput.notes) ? customerInput.notes.trim() : undefined,
  };

  const order = await createOrder({
    customer,
    items,
    subtotal,
    shipping,
    total,
    paymentMethod: "COD",
  });

  return NextResponse.json({ order });
}
