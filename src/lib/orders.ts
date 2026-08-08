import { promises as fs } from "fs";
import path from "path";
import type { Order } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "orders.json");

let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf-8");
  }
}

async function readAll(): Promise<Order[]> {
  await ensureFile();
  const raw = await fs.readFile(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as Order[];
  } catch {
    return [];
  }
}

function nextId(existing: Order[]): string {
  const year = new Date().getFullYear();
  const seq = existing.length + 1;
  return `PF-${year}-${String(seq).padStart(4, "0")}`;
}

export async function createOrder(
  order: Omit<Order, "id" | "createdAt" | "status">
): Promise<Order> {
  const task = writeQueue.then(async () => {
    const all = await readAll();
    const full: Order = {
      ...order,
      id: nextId(all),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    all.unshift(full);
    await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
    return full;
  });
  writeQueue = task.catch(() => undefined);
  return task;
}

export async function getOrders(): Promise<Order[]> {
  return readAll();
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  const all = await readAll();
  return all.find((o) => o.id === id);
}

export async function updateOrderStatus(
  id: string,
  status: Order["status"]
): Promise<Order | undefined> {
  const task = writeQueue.then(async () => {
    const all = await readAll();
    const idx = all.findIndex((o) => o.id === id);
    if (idx === -1) return undefined;
    all[idx] = { ...all[idx], status };
    await fs.writeFile(DATA_FILE, JSON.stringify(all, null, 2), "utf-8");
    return all[idx];
  });
  writeQueue = task.catch(() => undefined);
  return task;
}
