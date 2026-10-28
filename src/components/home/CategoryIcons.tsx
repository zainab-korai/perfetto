import Link from "next/link";
import {
  Activity,
  Droplets,
  Gift,
  Leaf,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { categories } from "@/lib/categories";

// Har category ka icon aur rang. Slug wahi hain jo tumhare category URLs mein hain.
const STYLE: Record<string, { icon: LucideIcon; bg: string; color: string }> = {
  "weight-management": { icon: Scale, bg: "#DDF1DF", color: "#2E7D4F" },
  "hair-care": { icon: Sparkles, bg: "#F3E4F6", color: "#8E44AD" },
  "skin-care": { icon: Droplets, bg: "#FCE4EC", color: "#C2185B" },
  "bones-joints": { icon: Activity, bg: "#DCE8F8", color: "#2F5FA7" },
  "weight-loss-products": { icon: TrendingDown, bg: "#FFE8CC", color: "#D9731A" },
  "weight-gaining-products": { icon: TrendingUp, bg: "#FFF3C4", color: "#A67C00" },
  "new-arrivals": { icon: Gift, bg: "#DDF3EE", color: "#1B7F6B" },
  "immune-system": { icon: ShieldCheck, bg: "#FFE1DC", color: "#D2493A" },
};

export default function CategoryIcons() {
  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-6 lg:grid-cols-8">
      {categories.map((c) => {
        const s = STYLE[c.slug] ?? { icon: Leaf, bg: "#E7EFE4", color: "#123D2F" };
        const Icon = s.icon;
        return (
          <Link
            key={c.slug}
            href={`/product-category/${c.slug}`}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg sm:h-20 sm:w-20"
              style={{ backgroundColor: s.bg, color: s.color }}
            >
              <Icon size={32} strokeWidth={1.7} />
            </span>
            <span className="text-[11px] font-medium leading-tight text-[var(--color-ink)] sm:text-sm">
              {c.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}