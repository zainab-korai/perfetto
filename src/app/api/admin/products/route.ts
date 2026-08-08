import { NextRequest, NextResponse } from "next/server";
import { createProduct } from "@/lib/products";
import { parseProductInput } from "@/lib/validate-product";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = parseProductInput(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const product = await createProduct(parsed);
    return NextResponse.json({ product });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create product";
    const isDuplicate = message.includes("duplicate key");
    return NextResponse.json(
      { error: isDuplicate ? "A product with this slug already exists" : message },
      { status: isDuplicate ? 409 : 500 }
    );
  }
}
