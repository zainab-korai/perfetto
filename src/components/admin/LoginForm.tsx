"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Invalid credentials");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-gold)]/15 text-[var(--color-gold-light)]">
        <Lock size={22} />
      </div>
      <h1 className="mt-5 text-center font-display text-2xl text-white">Admin Login</h1>
      <p className="mt-1 text-center text-sm text-white/50">Perfetto Order Dashboard</p>

      <label className="mt-8 block text-sm font-medium text-white/80">Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoFocus
        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[var(--color-gold)]"
      />

      <label className="mt-5 block text-sm font-medium text-white/80">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[var(--color-gold)]"
      />

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-gold mt-7 w-full rounded-full bg-[var(--color-gold)] py-3.5 font-medium text-[var(--color-forest-deep)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
