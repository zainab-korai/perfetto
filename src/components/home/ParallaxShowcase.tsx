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

  // Parallax + section visible hone par animations start
  useEffect(() => {
    const el = root.current;
    if (!el) return;

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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-x],[data-y]"));
    let ticking = false;
    let visible = false;

    function update() {
      ticking = false;
      if (reduce || !el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      p = Math.max(-1, Math.min(1, p));
      layers.forEach((l) => {
        const x = parseFloat(l.dataset.x ?? "0") * p;
        const y = parseFloat(l.dataset.y ?? "0") * p;
        l.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    }
    const onScroll = () => {
      if (!visible || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

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

  return (
    <section ref={root} className="pf-root relative mt-20 overflow-hidden bg-[var(--color-forest-deep)] py-20 sm:py-28">
      <style>{`
        @keyframes pf-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        @keyframes pf-img { from { opacity: 0; transform: scale(.86) rotate(-5deg); } to { opacity: 1; transform: none; } }
        @keyframes pf-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
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
      <div data-x="-140" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none will-change-transform">
        <p className="font-display whitespace-nowrap text-[24vw] font-semibold leading-none text-white/[0.035]">
          PERFETTO
        </p>
      </div>

      <div className="container-px relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* ---------- Text side ---------- */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
            Editor&apos;s Pick
          </p>

          <div key={cur.slug} className="mt-3">
            <h2 className="pf-anim font-display text-4xl leading-tight text-white sm:text-5xl">{cur.name}</h2>
            <p className="pf-anim mt-4 max-w-md text-lg text-white/70" style={{ animationDelay: "90ms" }}>
              {cur.tagline}
            </p>

            {cur.highlights.length > 0 && (
              <ul className="mt-6 space-y-3">
                {cur.highlights.map((h, i) => (
                  <li
                    key={h}
                    className="pf-anim flex items-start gap-3 text-white/85"
                    style={{ animationDelay: `${180 + i * 90}ms` }}
                  >
                    <Leaf size={16} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="pf-anim mt-8 flex items-baseline gap-3" style={{ animationDelay: "460ms" }}>
              <span className="text-3xl font-semibold text-white">{cur.price}</span>
              {cur.oldPrice && <span className="text-white/40 line-through">{cur.oldPrice}</span>}
            </div>

            <div className="pf-anim" style={{ animationDelay: "540ms" }}>
              <Link
                href={`/product/${cur.slug}`}
                className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)] transition-transform hover:-translate-y-0.5"
              >
                Shop This Formula <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Pager */}
          {n > 1 && (
            <div className="mt-10 flex items-center gap-4">
              <span className="font-display text-sm tracking-widest text-white/60">
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.slug}
                    onClick={() => setActive(i)}
                    aria-label={`Show ${it.name}`}
                    className="relative h-1.5 w-12 overflow-hidden rounded-full bg-white/15"
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

        {/* ---------- Parallax stage ---------- */}
        <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[540px]">
          {/* Gold ring */}
          <div data-y="70" className="absolute left-[8%] top-[8%] h-[84%] w-[84%] will-change-transform">
            <div className="h-full w-full rounded-full border border-[var(--color-gold)]/30 bg-[radial-gradient(circle,rgba(201,162,39,0.18),transparent_65%)]" />
          </div>

          {/* Ghoomta hua text badge */}
          <div data-y="-110" data-x="-20" className="absolute -left-2 top-[4%] z-30 will-change-transform sm:left-0">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-forest)]/80 text-[var(--color-gold-light)] backdrop-blur sm:h-28 sm:w-28">
              <svg viewBox="0 0 120 120" className="pf-spin absolute inset-0 h-full w-full">
                <defs>
                  <path id="pf-circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text fontSize="10" letterSpacing="2.2" fill="currentColor">
                  <textPath href="#pf-circ">HERBAL • TRUSTED • PAKISTAN • </textPath>
                </text>
              </svg>
              <Leaf size={22} />
            </div>
          </div>

          {/* Dots */}
          <div data-y="-120" className="absolute left-[4%] top-[46%] will-change-transform">
            <span className="block h-4 w-4 rounded-full bg-[var(--color-gold)]/70" />
          </div>
          <div data-y="90" data-x="30" className="absolute right-[6%] top-[66%] will-change-transform">
            <span className="block h-6 w-6 rounded-full bg-[var(--color-gold-light)]/50" />
          </div>
          <div data-y="-60" className="absolute right-[22%] top-[0%] will-change-transform">
            <span className="block h-2.5 w-2.5 rounded-full bg-white/40" />
          </div>

          {/* Side product 1 (click karo to bada ho jata hai) */}
          {idx1 >= 0 && (
            <div data-y="-150" data-x="-24" className="absolute -left-1 top-[54%] z-10 w-[32%] will-change-transform sm:left-0">
              <button
                key={`s1-${items[idx1].slug}`}
                onClick={() => setActive(idx1)}
                aria-label={`Show ${items[idx1].name}`}
                className="pf-float-r pf-img block w-full -rotate-6 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl transition-transform hover:scale-105"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={items[idx1].image} alt={items[idx1].name} fill sizes="170px" className="object-cover" />
                </div>
              </button>
            </div>
          )}

          {/* Main product */}
          <div data-y="-90" className="absolute left-[22%] top-[8%] z-20 w-[56%] will-change-transform">
            <div key={cur.slug} className="pf-img">
              <Link
                href={`/product/${cur.slug}`}
                className="pf-float relative block overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={cur.image} alt={cur.name} fill sizes="320px" className="object-cover" />
                </div>
              </Link>
            </div>
          </div>

          {/* Price badge */}
          <div data-y="-40" data-x="10" className="absolute bottom-[8%] right-[2%] z-30 will-change-transform sm:right-[4%]">
            <div key={`price-${cur.slug}`} className="pf-img flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[var(--color-gold)] text-center text-[var(--color-forest-deep)] shadow-xl sm:h-28 sm:w-28">
              <span className="text-[10px] font-semibold uppercase tracking-wider">Only</span>
              <span className="font-display text-base font-semibold leading-tight sm:text-lg">{cur.price}</span>
            </div>
          </div>

          {/* Side product 2 */}
          {idx2 >= 0 && (
            <div data-y="60" data-x="20" className="absolute -right-1 top-[2%] z-10 w-[28%] will-change-transform sm:right-0">
              <button
                key={`s2-${items[idx2].slug}`}
                onClick={() => setActive(idx2)}
                aria-label={`Show ${items[idx2].name}`}
                className="pf-float pf-img block w-full rotate-6 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl transition-transform hover:scale-105"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={items[idx2].image} alt={items[idx2].name} fill sizes="150px" className="object-cover" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}