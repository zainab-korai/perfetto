export type Category =
  | "Immune System"
  | "Bones & Joints"
  | "Skin Care"
  | "Hair Care"
  | "Weight Management"
  | "Weight Loss Products"
  | "Weight Gaining Products"
  | "New Arrivals";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  salePrice?: number;
  categories: Category[];
  images: string[];
  description: string;
  highlights: string[];
  howToUse?: string;
  unit: string;
  featured?: boolean;
  badge?: string;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
}

export interface OrderItem {
  slug: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "COD";
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
}
