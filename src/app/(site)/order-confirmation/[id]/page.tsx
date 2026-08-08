import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { getOrderById } from "@/lib/orders";
import { formatPKR } from "@/lib/format";
import { whatsappLink } from "@/lib/site";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) notFound();

  return (
    <div className="container-px mx-auto max-w-2xl py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)]">
        <CheckCircle2 size={40} />
      </div>
      <h1 className="mt-6 font-display text-4xl text-[var(--color-ink)]">Order Placed!</h1>
      <p className="mt-2 text-[var(--color-ink)]/60">
        Thank you, {order.customer.name}. Your order has been received and will be delivered via Cash on Delivery.
      </p>
      <p className="mt-1 font-mono text-sm text-[var(--color-forest)]">Order ID: {order.id}</p>

      <div className="mt-10 rounded-2xl border border-[var(--color-sage-2)] bg-white p-6 text-left">
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li key={item.slug} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-sage)]">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--color-ink)]">{item.name}</p>
                <p className="text-xs text-[var(--color-ink)]/50">Qty: {item.qty}</p>
              </div>
              <p className="text-sm text-[var(--color-ink)]/70">{formatPKR(item.price * item.qty)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 space-y-2 border-t border-[var(--color-sage-2)] pt-4 text-sm">
          <div className="flex justify-between text-[var(--color-ink)]/70">
            <span>Subtotal</span>
            <span>{formatPKR(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-[var(--color-ink)]/70">
            <span>Delivery Charges</span>
            <span>{formatPKR(order.shipping)}</span>
          </div>
          <div className="flex justify-between border-t border-[var(--color-sage-2)] pt-2 text-base font-semibold text-[var(--color-ink)]">
            <span>Total</span>
            <span>{formatPKR(order.total)}</span>
          </div>
        </div>
        <div className="mt-6 border-t border-[var(--color-sage-2)] pt-4 text-sm text-[var(--color-ink)]/70">
          <p className="font-medium text-[var(--color-ink)]">Delivering to</p>
          <p>{order.customer.address}, {order.customer.city}</p>
          <p>{order.customer.phone}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="rounded-full border border-[var(--color-forest)] px-7 py-3 font-medium text-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-white"
        >
          Continue Shopping
        </Link>
        <a
          href={whatsappLink(`Hi Perfetto, I just placed order ${order.id} and wanted to confirm.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold rounded-full bg-[var(--color-forest)] px-7 py-3 font-medium text-white hover:bg-[var(--color-forest-deep)]"
        >
          Confirm on WhatsApp
        </a>
      </div>
    </div>
  );
}
