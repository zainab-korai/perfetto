"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // Text/cards ko scroll pe fade-in karne ke liye
    const reveals = Array.from(el.querySelectorAll<HTMLElement>(".pf-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    reveals.forEach((r) => io.observe(r));

    // Parallax: reduce-motion wale users ke liye band
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveals.forEach((r) => r.classList.add("is-in"));
      return () => io.disconnect();
    }

    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-x],[data-y]"));
    let ticking = false;
    let visible = false;

    const update = () => {
      ticking = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // p: -1 jab section neeche se enter hota hai, 0 beech mein, +1 jab ooper se nikalta hai
      let p = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      p = Math.max(-1, Math.min(1, p));
      layers.forEach((l) => {
        const x = parseFloat(l.dataset.x ?? "0") * p;
        const y = parseFloat(l.dataset.y ?? "0") * p;
        l.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!visible || ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const vis = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) update();
    });
    vis.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      io.disconnect();
      vis.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={root} className="relative mt-20 overflow-hidden bg-[var(--color-forest-deep)] py-20 sm:py-28">
      <style>{`
        @keyframes pf-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-14px) } }
        .pf-float { animation: pf-float 6s ease-in-out infinite; }
        .pf-float-slow { animation: pf-float 8s ease-in-out infinite reverse; }
        .pf-reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
        .pf-reveal.is-in { opacity: 1; transform: none; }
      `}</style>

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(201,162,39,0.22),transparent_55%)]" />

      {/* Bada background text (side mein khisakta hai) */}
      <div data-x="-160" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none will-change-transform">
        <p className="font-display whitespace-nowrap text-[26vw] font-semibold leading-none text-white/[0.04]">
          PERFETTO
        </p>
      </div>

      <div className="container-px relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* ---------- Text side ---------- */}
        <div>
          <p className="pf-reveal text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
            Editor&apos;s Pick
          </p>
          <h2 className="pf-reveal font-display mt-3 text-4xl leading-tight text-white sm:text-5xl" style={{ transitionDelay: "80ms" }}>
            {main.name}
          </h2>
          <p className="pf-reveal mt-4 max-w-md text-lg text-white/70" style={{ transitionDelay: "160ms" }}>
            {main.tagline}
          </p>

          {main.highlights.length > 0 && (
            <ul className="mt-6 space-y-3">
              {main.highlights.map((h, i) => (
                <li
                  key={h}
                  className="pf-reveal flex items-start gap-3 text-white/85"
                  style={{ transitionDelay: `${240 + i * 100}ms` }}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--color-gold)]" />
                  {h}
                </li>
              ))}
            </ul>
          )}

          <div className="pf-reveal mt-8 flex items-baseline gap-3" style={{ transitionDelay: "500ms" }}>
            <span className="text-3xl font-semibold text-white">{main.price}</span>
            {main.oldPrice && <span className="text-white/40 line-through">{main.oldPrice}</span>}
          </div>

          <div className="pf-reveal" style={{ transitionDelay: "600ms" }}>
            <Link
              href={`/product/${main.slug}`}
              className="btn-gold mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)] transition-transform hover:-translate-y-0.5"
            >
              Shop This Formula <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* ---------- Parallax stage ---------- */}
        <div className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[540px]">
          {/* Gold ring */}
          <div data-y="70" className="absolute left-[8%] top-[8%] h-[84%] w-[84%] will-change-transform">
            <div className="h-full w-full rounded-full border border-[var(--color-gold)]/30 bg-[radial-gradient(circle,rgba(201,162,39,0.18),transparent_65%)]" />
          </div>

          {/* Gold dots */}
          <div data-y="-120" className="absolute left-[4%] top-[18%] will-change-transform">
            <span className="block h-4 w-4 rounded-full bg-[var(--color-gold)]/70" />
          </div>
          <div data-y="90" data-x="30" className="absolute right-[6%] top-[62%] will-change-transform">
            <span className="block h-6 w-6 rounded-full bg-[var(--color-gold-light)]/50" />
          </div>
          <div data-y="-60" className="absolute right-[18%] top-[2%] will-change-transform">
            <span className="block h-2.5 w-2.5 rounded-full bg-white/40" />
          </div>

          {/* Side product 1 (tez ooper jata hai) */}
          {side[0] && (
            <div data-y="-150" data-x="-24" className="absolute -left-1 top-[52%] z-10 w-[34%] will-change-transform sm:left-0">
              <Link
                href={`/product/${side[0].slug}`}
                className="pf-float-slow block -rotate-6 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={side[0].image} alt={side[0].name} fill sizes="180px" className="object-cover" />
                </div>
              </Link>
            </div>
          )}

          {/* Main product (center, sabse bada) */}
          <div data-y="-90" className="absolute left-[22%] top-[6%] z-20 w-[56%] will-change-transform">
            <Link
              href={`/product/${main.slug}`}
              className="pf-float block overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
            >
              <div className="relative aspect-[3/4]">
                <Image src={main.image} alt={main.name} fill sizes="320px" className="object-cover" />
              </div>
            </Link>
          </div>

          {/* Side product 2 (dheere neeche aata hai) */}
          {side[1] && (
            <div data-y="60" data-x="20" className="absolute -right-1 top-[2%] z-10 w-[30%] will-change-transform sm:right-0">
              <Link
                href={`/product/${side[1].slug}`}
                className="pf-float block rotate-6 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl"
              >
                <div className="relative aspect-[3/4]">
                  <Image src={side[1].image} alt={side[1].name} fill sizes="160px" className="object-cover" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}