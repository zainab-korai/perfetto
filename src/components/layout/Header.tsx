"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/products";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const { count, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-cream)]/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-sage-2)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto flex h-20 max-w-7xl items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-wide text-[var(--color-forest)]">
          Perfetto<span className="text-[var(--color-gold)]">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setCatOpen(true)}
            onMouseLeave={() => setCatOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium tracking-wide text-[var(--color-ink)] hover:text-[var(--color-forest)]">
              Shop by Concern <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full grid w-[560px] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-[var(--color-sage-2)] bg-white p-3 shadow-2xl"
                >
                  {categories.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/product-category/${c.slug}`}
                      className="rounded-xl px-4 py-3 hover:bg-[var(--color-sage)]"
                    >
                      <p className="font-display text-base text-[var(--color-ink)]">{c.name}</p>
                      <p className="text-xs text-[var(--color-ink)]/50">{c.blurb}</p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-[var(--color-ink)] hover:text-[var(--color-forest)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openDrawer}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-sage-2)] text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-gold)] text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-sage-2)] text-[var(--color-forest)] md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--color-sage-2)] bg-[var(--color-cream)] md:hidden"
          >
            <div className="container-px flex flex-col gap-1 py-4">
              <p className="px-2 pb-1 text-xs uppercase tracking-widest text-[var(--color-ink)]/40">
                Shop by Concern
              </p>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/product-category/${c.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-2 text-[var(--color-ink)] hover:bg-[var(--color-sage)]"
                >
                  {c.name}
                </Link>
              ))}
              <div className="my-2 h-px bg-[var(--color-sage-2)]" />
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-2 text-[var(--color-ink)] hover:bg-[var(--color-sage)]"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
