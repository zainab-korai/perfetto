"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="flex items-center gap-2 rounded-full border border-[var(--color-sage-2)] px-4 py-2 text-sm text-[var(--color-ink)]/70 hover:border-[var(--color-forest)] hover:text-[var(--color-forest)]"
    >
      <LogOut size={15} /> Logout
    </button>
  );
}
