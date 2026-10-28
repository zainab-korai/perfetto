import Link from "next/link";
import type { ReactNode } from "react";
import { categories } from "@/lib/categories";

// Har icon 48x48 ka drawing hai. Rang tile ke "color" se aata hai.
const F = { fill: "currentColor", fillOpacity: 0.2 } as const;

const ICONS: Record<string, ReactNode> = {
  // Bathroom scale
  "weight-management": (
    <>
      <rect x="8" y="8" width="32" height="32" rx="9" {...F} />
      <path d="M16 22a8 8 0 0 1 16 0" />
      <path d="M24 22l3.5-5" />
      <path d="M17 32h14" />
    </>
  ),
  // Head with long hair
  "hair-care": (
    <>
      <path
        d="M13 21c0-10 5-15 11-15s11 5 11 15c0 8 2 12 5 15-6 1-10-1-12-5h-8c-2 4-6 6-12 5 3-3 5-7 5-15z"
        {...F}
      />
      <circle cx="24" cy="20" r="6" fill="currentColor" fillOpacity="0.35" />
      <path d="M21 29c1.5 1 4.5 1 6 0" />
    </>
  ),
  // Cream jar + sparkle
  "skin-care": (
    <>
      <rect x="9" y="24" width="28" height="15" rx="4" {...F} />
      <rect x="11" y="16" width="24" height="8" rx="3" {...F} />
      <path d="M17 32h12" />
      <path d="M39 6v7M35.5 9.5h7" />
    </>
  ),
  // Bone
  "bones-joints": (
    <>
      <path d="M17 31l14-14" strokeWidth="5" />
      <circle cx="13" cy="30" r="4.5" {...F} />
      <circle cx="18" cy="35" r="4.5" {...F} />
      <circle cx="30" cy="13" r="4.5" {...F} />
      <circle cx="35" cy="18" r="4.5" {...F} />
    </>
  ),
  // Measuring tape
  "weight-loss-products": (
    <>
      <circle cx="21" cy="23" r="13" {...F} />
      <circle cx="21" cy="23" r="5" />
      <path d="M32 31h11v7H24" />
      <path d="M32 31v7M36 31v3M40 31v3" />
    </>
  ),
  // Dumbbell
  "weight-gaining-products": (
    <>
      <path d="M15 24h18" strokeWidth="3" />
      <rect x="10" y="14" width="6" height="20" rx="2.5" {...F} />
      <rect x="32" y="14" width="6" height="20" rx="2.5" {...F} />
      <rect x="5" y="19" width="5" height="10" rx="2" {...F} />
      <rect x="38" y="19" width="5" height="10" rx="2" {...F} />
    </>
  ),
  // Gift box
  "new-arrivals": (
    <>
      <rect x="9" y="22" width="30" height="17" rx="3" {...F} />
      <rect x="7" y="16" width="34" height="7" rx="2" {...F} />
      <path d="M24 16v23" />
      <path d="M24 16c-5-1-8-3-6.5-6s6.5 1 6.5 6c0-5 5-9 6.5-6s-1.5 5-6.5 6z" />
    </>
  ),
  // Shield with cross
  "immune-system": (
    <>
      <path d="M24 6l14 5v11c0 9-6 15-14 19-8-4-14-10-14-19V11z" {...F} />
      <path d="M24 17v13M17.5 23.5h13" />
    </>
  ),
};

const COLORS: Record<string, { bg: string; color: string }> = {
  "weight-management": { bg: "#DDF1DF", color: "#2E7D4F" },
  "hair-care": { bg: "#F1E0F5", color: "#8E44AD" },
  "skin-care": { bg: "#FCE1EA", color: "#C2185B" },
  "bones-joints": { bg: "#DAE6F8", color: "#2F5FA7" },
  "weight-loss-products": { bg: "#FFE6CA", color: "#D9731A" },
  "weight-gaining-products": { bg: "#FFF1BF", color: "#A67C00" },
  "new-arrivals": { bg: "#D8F2EC", color: "#1B7F6B" },
  "immune-system": { bg: "#FFE0DA", color: "#D2493A" },
};

export default function CategoryIcons() {
  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-7 lg:grid-cols-8">
      {categories.map((c) => {
        const col = COLORS[c.slug] ?? { bg: "#E7EFE4", color: "#123D2F" };
        return (
          <Link
            key={c.slug}
            href={`/product-category/${c.slug}`}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <span
              className="flex h-[68px] w-[68px] items-center justify-center rounded-[22px] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-lg sm:h-24 sm:w-24 sm:rounded-3xl"
              style={{ backgroundColor: col.bg, color: col.color }}
            >
              <svg
                viewBox="0 0 48 48"
                className="h-9 w-9 sm:h-12 sm:w-12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {ICONS[c.slug] ?? <circle cx="24" cy="24" r="12" {...F} />}
              </svg>
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