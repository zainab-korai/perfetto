"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartItem } from "./types";

const STORAGE_KEY = "perfetto_cart_v1";
const EMPTY_ITEMS: CartItem[] = [];

let cartItems: CartItem[] = EMPTY_ITEMS;
const listeners = new Set<() => void>();

function readFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // storage unavailable — ignore
  }
}

function setCartItems(updater: (prev: CartItem[]) => CartItem[]) {
  cartItems = updater(cartItems);
  persist();
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return cartItems;
}

function getServerSnapshot() {
  return EMPTY_ITEMS;
}

if (typeof window !== "undefined") {
  cartItems = readFromStorage();
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback((slug: string) => {
    setCartItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const updateQty = useCallback((slug: string, qty: number) => {
    setCartItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems(() => []), []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    subtotal,
    count,
    isDrawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
