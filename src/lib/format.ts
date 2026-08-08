import type { Product } from "./types";

export function effectivePrice(p: Product): number {
  return p.salePrice ?? p.price;
}

export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}
