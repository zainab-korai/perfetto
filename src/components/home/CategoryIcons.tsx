import Link from "next/link";
import { categories } from "@/lib/categories";
import CategoryIcon, { TILE_BG } from "@/components/ui/CategoryIcon";

export default function CategoryIcons() {
  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-8 lg:grid-cols-8">
      {categories.map((c, i) => (
        <Link
          key={c.slug}
          href={`/product-category/${c.slug}`}
          className="icon-tile group flex flex-col items-center gap-3 text-center"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <span
            className="flex h-[72px] w-[72px] items-center justify-center rounded-[24px] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl sm:h-[104px] sm:w-[104px] sm:rounded-[30px]"
            style={{ backgroundColor: TILE_BG[c.slug] ?? "#E7EFE4" }}
          >
            <CategoryIcon slug={c.slug} className="h-11 w-11 sm:h-16 sm:w-16" />
          </span>
          <span className="text-[11px] font-medium leading-tight text-[var(--color-ink)] sm:text-sm">
            {c.name}
          </span>
        </Link>
      ))}
    </div>
  );
}