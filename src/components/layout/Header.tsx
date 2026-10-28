"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/categories";
import { SITE, whatsappLink } from "@/lib/site";
import CategoryIcon, { TILE_BG } from "@/components/ui/CategoryIcon";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, openDrawer } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="bg-[var(--color-forest-deep)] px-4 py-2 text-center text-xs tracking-wide text-white/85">
        Cash on Delivery all across Pakistan
        <span className="mx-2 text-[var(--color-gold)]">•</span>
        Trusted by {SITE.familiesServed} families
      </div>

      <header
        className={`sticky top-0 z-50 border-b bg-[var(--color-cream)]/95 backdrop-blur-md transition-shadow duration-300 ${
          scrolled
            ? "border-[var(--color-sage-2)] shadow-[0_2px_20px_-6px_rgba(18,61,47,0.15)]"
            : "border-transparent"
        }`}
      >
        <div className="container-px mx-auto flex h-[70px] max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[var(--color-sage)]">
              <Image src="/logo.webp" alt="Perfetto" fill sizes="40px" className="object-contain p-1" />
            </span>
            <span className="font-display text-2xl tracking-wide text-[var(--color-forest)]">
              Perfetto<span className="text-[var(--color-gold)]">.</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-9 md:flex">
            <div className="group">
              <button className="flex items-center gap-1 py-6 text-sm font-medium tracking-wide text-[var(--color-ink)] hover:text-[var(--color-forest)]">
                Shop by Concern
                <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* Mega menu: header ke neeche poori width mein */}
              <div className="invisible absolute inset-x-0 top-full translate-y-2 border-t border-[var(--color-sage-2)] bg-white opacity-0 shadow-[0_30px_60px_-20px_rgba(18,61,47,0.3)] transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="container-px mx-auto max-w-7xl py-7">
                  <div className="grid grid-cols-4 gap-3">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/product-category/${c.slug}`}
                        className="group/item flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-[var(--color-sage)]"
                      >
                        <span
                          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover/item:scale-110 group-hover/item:-rotate-3"
                          style={{ backgroundColor: TILE_BG[c.slug] ?? "#E7EFE4" }}
                        >
                          <CategoryIcon slug={c.slug} className="h-9 w-9" />
                        </span>
                        <span className="min-w-0">
                          <span className="font-display block text-base leading-tight text-[var(--color-ink)]">
                            {c.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-[var(--color-ink)]/50">{c.blurb}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-[var(--color-sage-2)] pt-4">
                    <p className="text-sm text-[var(--color-ink)]/55">
                      Not sure what to pick? Message us on WhatsApp.
                    </p>
                    <Link
                      href="/shop"
                      className="flex items-center gap-2 text-sm font-semibold text-[var(--color-forest)] hover:text-[var(--color-gold-deep)]"
                    >
                      View all products <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative py-1 text-sm font-medium tracking-wide text-[var(--color-ink)]"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--color-gold)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="btn-gold hidden rounded-full bg-[var(--color-forest)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)] lg:inline-block"
            >
              Shop Now
            </Link>
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

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-[var(--color-sage-2)] bg-[var(--color-cream)] md:hidden">
            <div className="container-px flex max-h-[75vh] flex-col gap-1 overflow-y-auto py-4">
              <p className="px-2 pb-2 text-xs uppercase tracking-widest text-[var(--color-ink)]/40">
                Shop by Concern
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/product-category/${c.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl p-2 hover:bg-[var(--color-sage)]"
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: TILE_BG[c.slug] ?? "#E7EFE4" }}
                    >
                      <CategoryIcon slug={c.slug} className="h-7 w-7" />
                    </span>
                    <span className="text-[13px] leading-tight text-[var(--color-ink)]">{c.name}</span>
                  </Link>
                ))}
              </div>
              <div className="my-2 h-px bg-[var(--color-sage-2)]" />
              <div className="flex flex-wrap gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2 text-[var(--color-ink)] hover:bg-[var(--color-sage)]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href="/shop"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[var(--color-forest)] py-3 text-center text-sm font-medium text-white"
                >
                  Shop Now
                </Link>
                <a
                  href={whatsappLink("Hi Perfetto, I have a question.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[var(--color-sage-2)] py-3 text-center text-sm font-medium text-[var(--color-ink)]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}