"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";

const tabs = [
  { href: "/admin", label: "Orders" },
  { href: "/admin/products", label: "Products" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <p className="font-display text-2xl text-[var(--color-forest)]">
          Perfetto<span className="text-[var(--color-gold)]">.</span> Admin
        </p>
        <div className="mt-3 flex gap-1">
          {tabs.map((t) => {
            const active = t.href === "/admin" ? pathname === "/admin" : pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--color-forest)] text-white"
                    : "text-[var(--color-ink)]/60 hover:bg-[var(--color-sage)]"
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}
