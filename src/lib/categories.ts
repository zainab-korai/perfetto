import { ALL_CATEGORIES } from "./types";
import type { Category } from "./types";

const CATEGORY_BLURBS: Record<Category, string> = {
  "Weight Management": "Gainers, loss formulas & bundles",
  "Hair Care": "Oils, supplements & combos",
  "Skin Care": "Masks & glow supplements",
  "Bones & Joints": "Height & joint support",
  "Weight Loss Products": "Natural weight loss formulas",
  "Weight Gaining Products": "Healthy weight gain formulas",
  "New Arrivals": "Freshly added to the range",
  "Immune System": "Everyday immunity support",
};

export const categories = ALL_CATEGORIES.map((name) => ({
  name,
  slug: name
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-"),
  blurb: CATEGORY_BLURBS[name],
}));

export function categorySlugToName(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)?.name;
}
