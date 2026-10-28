"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

export interface ParallaxProduct {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  price: string;
  oldPrice?: string;
  highlights: string[];
}

export default function ParallaxShowcase({
  main,
  side,
}: {
  main: ParallaxProduct;
  side: ParallaxProduct[];
}) {
  const root = useRef<HTMLElement>(null);
  const touchX = useRef<number | null>(null);
  const items = [main, ...side];
  const n = items.length;
  const [active, setActive] = useState(0);

  const cur = items[active];
  const idx1 = n > 1 ? (active + 1) % n : -1;
  const idx2 = n > 2 ? (active + 2) % n : -1;

  // Auto-rotate: har 6 second baad agla product (reduce-motion pe band)
  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 6000);
    return () => clearInterval(t);
  }, [active, n]);

  // Parallax scroll effect
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-x],[data-y]"));
    let ticking = false;
    let visible = false;

    function update() {
      ticking = false;
      if (reduce || !el) return;
      const k = window.innerWidth < 768 ? 0.4 : 1; // mobile pe halka effect
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      p = Math.max(-1, Math.min(1, p));
      layers.forEach((l) => {
        const x = parseFloat(l.dataset.x ?? "0") * p * k;
        const y = parseFloat(l.dataset.y ?? "0") * p * k;
        l.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    }

    const onScroll = () => {
      if (!visible || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const vis = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          update();
        }
      },
      { threshold: 0.15 }
    );

    vis.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      vis.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Swipe support (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null || n < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 45) return;
    setActive((a) => (dx < 0 ? (a + 1) % n : (a - 1 + n) % n));
  };

  return (
    <section
      ref={root}
      className="pf-root relative mt-14 overflow-hidden bg-[var(--color-forest-deep)] py-14 sm:mt-20 sm:py-28"
    >
      <style>{`
        @keyframes pf-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes pf-img { from { opacity: 0; transform: scale(.86) rotate(-5deg); } to { opacity: 1; transform: none; } }
        @keyframes pf-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pf-spin { to { transform: rotate(360deg); } }
        @keyframes pf-bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .pf-anim { animation: pf-in .7s cubic-bezier(.2,.7,.2,1) both; }
        .pf-img { animation: pf-img .8s cubic-bezier(.2,.7,.2,1) both; }
        .pf-float { animation: pf-float 6s ease-in-out infinite; }
        .pf-float-r { animation: pf-float 8s ease-in-out infinite reverse; }
        .pf-spin { animation: pf-spin 18s linear infinite; }
        .pf-bar { transform-origin: left; animation: pf-bar 6s linear both; }
        .pf-root:not(.is-visible) .pf-anim,
        .pf-root:not(.is-visible) .pf-img,
        .pf-root:not(.is-visible) .pf-bar { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .pf-anim, .pf-img, .pf-float, .pf-float-r, .pf-spin, .pf-bar { animation: none !important; }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(201,162,39,0.22),transparent_55%)]" />

      {/* Peeche ka bada text */}
      <div
        data-x="-140"
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none will-change-transform"
      >
        <p className="font-display whitespace-nowrap text-[24vw] font-semibold leading-none text-white/[0.035]">
          PERFETTO
        </p>
      </div>

      <div className="container-px relative mx-auto grid max-w-7xl items-center gap-8 sm:gap-14 lg:grid-cols-2">
        {/* ---------- Text side (mobile pe neeche) ---------- */}
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
            Editor&apos;s Pick
          </p>

          <div key={cur.slug} className="mt-3">
            <h2 className="pf-anim font-display text-3xl leading-tight text-white sm:text-5xl">{cur.name}</h2>
            <p className="pf-anim mt-3 max-w-md text-base text-white/70 sm:mt-4 sm:text-lg" style={{ animationDelay: "90ms" }}>
              {cur.tagline}
            </p>

            {cur.highlights.length > 0 && (
              <ul className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                {cur.highlights.map((h, i) => (
                  <li
                    key={h}
                    className="pf-anim flex items-start gap-3 text-sm text-white/85 sm:text-base"
                    style={{ animationDelay: `${180 + i * 90}ms` }}
                  >
                    <Leaf size={16} className="mt-0.5 shrink-0 text-[var(--color-gold)]" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="pf-anim mt-6 flex items-baseline gap-3 sm:mt-8" style={{ animationDelay: "460ms" }}>
              <span className="text-2xl font-semibold text-white sm:text-3xl">{cur.price}</span>
              {cur.oldPrice && <span className="text-white/40 line-through">{cur.oldPrice}</span>}
            </div>

            <div className="pf-anim" style={{ animationDelay: "540ms" }}>
              <Link
                href={`/product/${cur.slug}`}
                className="btn-gold mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)] transition-transform hover:-translate-y-0.5 sm:mt-6 sm:inline-flex sm:w-auto"
              >
                Shop This Formula <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Pager */}
          {n > 1 && (
            <div className="mt-8 flex items-center gap-4 sm:mt-10">
              <span className="font-display text-sm tracking-widest text-white/60">
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.slug}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${it.name}`}
                    className="relative h-1.5 w-10 overflow-hidden rounded-full bg-white/15 sm:w-12"
                  >
                    {i === active && (
                      <span key={`bar-${active}`} className="pf-bar absolute inset-0 rounded-full bg-[var(--color-gold)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ---------- Parallax stage (mobile pe pehle) ---------- */}
        <div
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="relative order-1 mx-auto h-[360px] w-full max-w-[340px] sm:h-[540px] sm:max-w-[520px] lg:order-2"
        >
          {/* Gold ring */}
          <div data-y="70" className="absolute left-[8%] top-[8%] h-[84%] w-[84%] will-change-transform">
            <div className="h-full w-full rounded-full border border-[var(--color-gold)]/30 bg-[radial-gradient(circle,rgba(201,162,39,0.18),transparent_65%)]" />
          </div>

          {/* Ghoomta hua text badge */}
          <div data-y="-110" data-x="-20" className="absolute -left-1 top-[2%] z-30 will-change-transform sm:left-0 sm:top-[4%]">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-forest)]/80 text-[var(--color-gold-light)] backdrop-blur sm:h-28 sm:w-28">
              <svg viewBox="0 0 120 120" className="pf-spin absolute inset-0 h-full w-full">
                <defs>
                  <path id="pf-circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text fontSize="10" letterSpacing="2.2" fill="currentColor">
                  <textPath href="#pf-circ">HERBAL • TRUSTED • PAKISTAN • </textPath>
                </text>
              </svg>
              <Leaf size={20} />
            </div>
          </div>

          {/* Dots */}
          <div data-y="-120" className="absolute left-[4%] top-[46%] will-change-transform">
            <span className="block h-3 w-3 rounded-full bg-[var(--color-gold)]/70 sm:h-4 sm:w-4" />
          </div>
          <div data-y="90" data-x="30" className="absolute right-[6%] top-[66%] will-change-transform">
            <span className="block h-5 w-5 rounded-full bg-[var(--color-gold-light)]/50 sm:h-6 sm:w-6" />
          </div>

          {/* Side product 1 */}
          {idx1 >= 0 && (
            <div data-y="-150" data-x="-24" className="absolute -left-1 top-[56%] z-10 w-[30%] will-change-transform sm:left-0 sm:top-[54%] sm:w-[32%]">
              <button
                key={`s1-${items[idx1].slug}`}
                onClick={() => setActive(idx1)}
                aria-label={`Show ${items[idx1].name}`}
                className="pf-float-r pf-img block w-full -rotate-6 overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-2xl transition-transform hover:scale-105 sm:rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={items[idx1].image} alt={items[idx1].name} fill sizes="130px" className="object-cover" />
                </div>
              </button>
            </div>
          )}

          {/* Main product */}
          <div data-y="-90" className="absolute left-[22%] top-[8%] z-20 w-[56%] will-change-transform">
            <div key={cur.slug} className="pf-img">
              <Link
                href={`/product/${cur.slug}`}
                className="pf-float relative block overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] sm:rounded-3xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={cur.image} alt={cur.name} fill sizes="260px" className="object-cover" />
                </div>
              </Link>
            </div>
          </div>

          {/* Price badge */}
          <div data-y="-40" data-x="10" className="absolute bottom-[6%] right-[0%] z-30 will-change-transform sm:bottom-[8%] sm:right-[4%]">
            <div
              key={`price-${cur.slug}`}
              className="pf-img flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[var(--color-gold)] text-center text-[var(--color-forest-deep)] shadow-xl sm:h-28 sm:w-28"
            >
              <span className="text-[9px] font-semibold uppercase tracking-wider sm:text-[10px]">Only</span>
              <span className="font-display text-sm font-semibold leading-tight sm:text-lg">{cur.price}</span>
            </div>
          </div>

          {/* Side product 2 */}
          {idx2 >= 0 && (
            <div data-y="60" data-x="20" className="absolute -right-1 top-[2%] z-10 w-[26%] will-change-transform sm:right-0 sm:w-[28%]">
              <button
                key={`s2-${items[idx2].slug}`}
                onClick={() => setActive(idx2)}
                aria-label={`Show ${items[idx2].name}`}
                className="pf-float pf-img block w-full rotate-6 overflow-hidden rounded-xl border border-white/15 bg-white/10 shadow-2xl transition-transform hover:scale-105 sm:rounded-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={items[idx2].image} alt={items[idx2].name} fill sizes="120px" className="object-cover" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}