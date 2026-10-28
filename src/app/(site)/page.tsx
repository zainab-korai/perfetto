import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Leaf, MessageCircle, ShieldCheck, Truck, Users } from "lucide-react";
import HomeShowcase from "@/components/home/HomeShowcase";
import CategoryIcons from "@/components/home/CategoryIcons";
import ParallaxShowcase from "@/components/home/ParallaxShowcase";
import ReviewsSection from "@/components/home/ReviewsSection";
import Reveal from "@/components/home/Reveal";
import CountUp from "@/components/home/CountUp";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { effectivePrice, formatPKR } from "@/lib/format";
import { FLAT_SHIPPING, SITE, whatsappLink } from "@/lib/site";

// Homepage cache hota hai aur har 5 minute baad refresh. Isi se site fast khulti hai.
export const revalidate = 300;

const MARQUEE = [
  "100% Organic Herbal Formulas",
  "Cash on Delivery Nationwide",
  `Trusted by ${SITE.familiesServed} Families`,
  `${SITE.yearsInBusiness} Years of Herbal Wellness`,
  "Fast, Discreet Delivery",
  "No Harmful Chemicals",
];

const FAQS = [
  {
    q: "Is Cash on Delivery available?",
    a: "Yes. You can order from anywhere in Pakistan and pay when the parcel reaches you. No advance payment needed.",
  },
  {
    q: "What are the delivery charges?",
    a: `Delivery is a flat Rs ${FLAT_SHIPPING} per order. The final amount is always shown at checkout before you confirm.`,
  },
  {
    q: "I am not sure which product to choose. What should I do?",
    a: "Message us on WhatsApp, tell us your concern, and our team will guide you to the right product.",
  },
  {
    q: "How do I use the product?",
    a: "Every product page has a How to Use section. If you have a medical condition or take regular medication, please consult your doctor before starting any supplement.",
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">{children}</p>
  );
}

export default async function Home() {
  const products = await getAllProducts();

  const pool = products.filter((p) => p.featured);
  const base = pool.length ? pool : products;
  const heroProducts = base.slice(0, 3);

  // Parallax section: 1 bada + 2 side products
  const mainP = base[0];
  const sideP = base.filter((p) => p.slug !== mainP?.slug).slice(0, 2);
  const toParallax = (p: (typeof products)[number]) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    image: p.images[0] ?? "",
    price: formatPKR(effectivePrice(p)),
    oldPrice: p.salePrice && p.salePrice < p.price ? formatPKR(p.price) : undefined,
    highlights: (p.highlights ?? []).slice(0, 3),
  });

  // Client component ko sirf zaroori data bhejte hain
  const slim = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    price: effectivePrice(p),
    oldPrice: p.salePrice && p.salePrice < p.price ? p.price : undefined,
    image: p.images[0] ?? "",
    categories: p.categories as string[],
    badge: p.badge,
    stock: p.stock,
    featured: !!p.featured,
  }));

  const tabs = categories.map((c) => ({ slug: c.slug, name: c.name, blurb: c.blurb }));

  const bundles = products
    .filter((p) => p.salePrice && p.salePrice < p.price)
    .sort((a, b) => b.price - b.salePrice! - (a.price - a.salePrice!))
    .slice(0, 6);

  const trust = [
    { icon: Truck, title: "Cash on Delivery", text: "Pay when it arrives" },
    { icon: Users, title: `${SITE.familiesServed} Families`, text: "Trust Perfetto" },
    { icon: Leaf, title: "Herbal Formulas", text: "Made with care" },
    { icon: ShieldCheck, title: "Safety First", text: "Consistent batches" },
  ];

  const familiesNum = parseInt(SITE.familiesServed.replace(/[^0-9]/g, ""), 10) || 0;
  const yearsNum = parseInt(SITE.yearsInBusiness.replace(/[^0-9]/g, ""), 10) || 0;
  const stats = [
    { end: familiesNum, suffix: "+", label: "Families Served" },
    { end: yearsNum, suffix: "+", label: "Years of Trust" },
    { end: products.length, suffix: "", label: "Herbal Formulas" },
    { end: categories.length, suffix: "", label: "Wellness Concerns" },
  ];

  const steps = [
    { n: "1", title: "Choose your product", text: "Pick by concern or browse the best sellers." },
    { n: "2", title: "Place your order", text: "Add to cart and enter your address. Takes one minute." },
    { n: "3", title: "Pay on delivery", text: "Receive your parcel at home and pay the rider." },
  ];

  const h2 = "font-display mt-2 text-2xl text-[var(--color-ink)] sm:text-4xl";

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[var(--color-forest-deep)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(201,162,39,0.2),transparent_42%),radial-gradient(circle_at_88%_80%,rgba(20,80,60,0.6),transparent_50%)]" />
        <div className="animate-blob pointer-events-none absolute -left-24 top-10 h-60 w-60 rounded-full bg-[var(--color-gold)]/20 blur-3xl sm:h-72 sm:w-72" />
        <div
          className="animate-blob pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl sm:h-80 sm:w-80"
          style={{ animationDelay: "-6s" }}
        />

        <div className="container-px relative mx-auto grid max-w-7xl items-center gap-8 pb-12 pt-10 sm:gap-10 sm:pb-20 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <p
              className="hero-in mb-4 inline-block rounded-full border border-[var(--color-gold)]/40 bg-white/5 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[var(--color-gold-light)] sm:mb-5 sm:px-4 sm:text-xs sm:tracking-[0.2em]"
              style={{ animationDelay: "100ms" }}
            >
              Trusted by {SITE.familiesServed} Families
            </p>
            <h1
              className="hero-in font-display text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "250ms" }}
            >
              Herbal Wellness,
              <br />
              <span className="shimmer-text italic">Perfected.</span>
            </h1>
            <p
              className="hero-in mx-auto mt-4 max-w-md text-base text-white/70 sm:mt-6 sm:text-lg lg:mx-0"
              style={{ animationDelay: "420ms" }}
            >
              Chemical-free herbal formulas for weight, hair, skin, height and more, made for real
              concerns.
            </p>
            <div
              className="hero-in mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4 lg:justify-start"
              style={{ animationDelay: "580ms" }}
            >
              <Link
                href="/shop"
                className="btn-gold pulse-ring rounded-full bg-[var(--color-gold)] px-8 py-4 text-center font-medium text-[var(--color-forest-deep)] transition-transform hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
              <a
                href={whatsappLink("Hi Perfetto! I'd like some advice on which product to choose.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 font-medium text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle size={18} /> Ask on WhatsApp
              </a>
            </div>

            {/* Mobile pe products ki row */}
            {heroProducts.length > 0 && (
              <div
                className="hero-in mx-auto mt-9 grid max-w-sm grid-cols-3 gap-3 lg:hidden"
                style={{ animationDelay: "720ms" }}
              >
                {heroProducts.map((p, i) => (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    className={`relative block overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl ${
                      i === 1 ? "-translate-y-3" : ""
                    }`}
                  >
                    <div className="relative aspect-[3/4]">
                      {p.images[0] && (
                        <Image src={p.images[0]} alt={p.name} fill sizes="120px" className="object-cover" />
                      )}
                    </div>
                    <p className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-black/80 to-transparent px-1.5 pb-1.5 pt-6 text-center text-[10px] font-medium text-white">
                      {p.name}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Product fan + floating chips (sirf bade screen pe) */}
          {heroProducts.length > 0 && (
            <div
              className="hero-in relative mx-auto hidden h-[430px] w-full max-w-[460px] lg:block"
              style={{ animationDelay: "500ms" }}
            >
              {heroProducts.map((p, i) => {
                const pos = [
                  "left-[2%] top-[16%] -rotate-6 z-10",
                  "left-[28%] top-[2%] rotate-3 z-20",
                  "left-[54%] top-[28%] rotate-6 z-10",
                ][i];
                return (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    className={`absolute w-[46%] overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl transition-transform duration-300 hover:scale-105 hover:rotate-0 ${pos}`}
                  >
                    <div className="animate-float" style={{ animationDelay: `${-i * 1.7}s` }}>
                      <div className="relative aspect-[3/4]">
                        {p.images[0] && (
                          <Image src={p.images[0]} alt={p.name} fill sizes="200px" className="object-cover" />
                        )}
                      </div>
                    </div>
                    <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2 pt-8 text-center text-xs font-medium text-white">
                      {p.name}
                    </p>
                  </Link>
                );
              })}
              <div
                className="animate-float absolute -left-4 bottom-4 z-30 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[var(--color-forest)] shadow-xl"
                style={{ animationDelay: "-2s" }}
              >
                <Truck size={14} /> Cash on Delivery
              </div>
              <div
                className="animate-float absolute -right-2 top-2 z-30 flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-4 py-2 text-xs font-semibold text-[var(--color-forest-deep)] shadow-xl"
                style={{ animationDelay: "-4s" }}
              >
                <Users size={14} /> {SITE.familiesServed} Families
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= MARQUEE ================= */}
      <div className="overflow-hidden border-y border-white/10 bg-[var(--color-forest-deep)] py-3">
        <div className="marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span
              key={i}
              className="mx-5 flex items-center gap-3 whitespace-nowrap text-xs tracking-wide text-white/70 sm:mx-6 sm:text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* ============ SHOP BY CONCERN (ICON GRID) ============ */}
      <section className="container-px mx-auto max-w-7xl pt-12 sm:pt-16">
        <Reveal>
          <div className="mb-8 text-center sm:mb-10">
            <Eyebrow>Shop by Concern</Eyebrow>
            <h2 className={h2}>Find What Your Body Needs</h2>
          </div>
        </Reveal>
        <Reveal delay={100} variant="scale">
          <CategoryIcons />
        </Reveal>
      </section>

      {/* ================= TRUST ================= */}
      <section className="container-px mx-auto max-w-7xl pt-10 sm:pt-14">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-[var(--color-sage-2)] bg-white p-4 sm:gap-5 sm:p-6 lg:grid-cols-4">
            {trust.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-2.5 sm:gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)] sm:h-11 sm:w-11">
                  <Icon size={18} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-tight text-[var(--color-ink)] sm:text-sm">{title}</p>
                  <p className="text-[11px] text-[var(--color-ink)]/55 sm:text-xs">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ PRODUCTS WITH TABS ============ */}
      <section className="container-px mx-auto max-w-7xl pt-14 sm:pt-20">
        <Reveal>
          <Eyebrow>Browse Products</Eyebrow>
          <h2 className={`${h2} mb-6 sm:mb-8`}>Best Sellers & More</h2>
        </Reveal>
        <Reveal delay={100}>
          <HomeShowcase products={slim} tabs={tabs} />
        </Reveal>
      </section>

      {/* ============ PARALLAX PRODUCT SHOWCASE ============ */}
      {mainP && mainP.images[0] && (
        <ParallaxShowcase main={toParallax(mainP)} side={sideP.filter((p) => p.images[0]).map(toParallax)} />
      )}

      {/* ================= BUNDLES ================= */}
      {bundles.length > 0 && (
        <section className="bg-[var(--color-sage)] py-12 sm:py-16">
          <div className="container-px mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Best Value</Eyebrow>
              <h2 className={h2}>Bundles & Courses, Bigger Savings</h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--color-ink)]/60 sm:text-base">
                Complete courses at a special price. The smart way to stay consistent.
              </p>
            </Reveal>

            <div className="-mx-5 mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-8 sm:gap-4 sm:px-0 [&::-webkit-scrollbar]:hidden">
              {bundles.map((p) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className="group w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:w-[280px]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream-2)]">
                    <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-[var(--color-forest)] px-2.5 py-1 text-[10px] font-bold uppercase text-white sm:left-3 sm:top-3 sm:px-3 sm:text-[11px]">
                      Save {formatPKR(p.price - p.salePrice!)}
                    </span>
                    {p.images[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="p-3.5 sm:p-4">
                    <h3 className="font-display line-clamp-2 text-base leading-tight text-[var(--color-ink)] sm:text-lg">
                      {p.name}
                    </h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-semibold text-[var(--color-forest)] sm:text-lg">
                        {formatPKR(effectivePrice(p))}
                      </span>
                      <span className="text-xs text-[var(--color-ink)]/40 line-through sm:text-sm">
                        {formatPKR(p.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============== COUNTING NUMBERS ============== */}
      <section className="container-px mx-auto max-w-7xl pt-14 sm:pt-20">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-forest)] px-5 py-10 sm:px-12 sm:py-12">
            <div className="animate-blob pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-gold)]/20 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-6 text-center sm:gap-8 lg:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-[var(--color-gold-light)] sm:text-5xl">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="mt-1.5 text-xs text-white/70 sm:mt-2 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============== HOW TO ORDER ============== */}
      <section className="container-px mx-auto max-w-7xl pt-14 sm:pt-20">
        <Reveal>
          <Eyebrow>Easy Ordering</Eyebrow>
          <h2 className={`${h2} mb-6 sm:mb-8`}>Order in 3 Simple Steps</h2>
        </Reveal>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 140}>
              <div className="flex h-full items-start gap-4 rounded-2xl border border-[var(--color-sage-2)] bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-6">
                <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-lg text-[var(--color-gold-light)] sm:h-12 sm:w-12 sm:text-xl">
                  {s.n}
                </span>
                <div>
                  <h3 className="font-display text-base text-[var(--color-ink)] sm:text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-ink)]/60">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============== REAL REVIEWS (lib/reviews.ts se, khali ho to nahi dikhta) ============== */}
      <ReviewsSection />

      {/* ================= FAQ ================= */}
      <section className="container-px mx-auto max-w-3xl pt-14 sm:pt-20">
        <Reveal>
          <div className="mb-6 text-center sm:mb-8">
            <Eyebrow>Good to Know</Eyebrow>
            <h2 className={h2}>Common Questions</h2>
          </div>
        </Reveal>
        <div className="space-y-2.5 sm:space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <details className="group rounded-2xl border border-[var(--color-sage-2)] bg-white px-4 py-3.5 transition-shadow open:shadow-md sm:px-5 sm:py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[var(--color-ink)] sm:text-base [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-[var(--color-forest)] transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/65">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="container-px mx-auto mt-14 max-w-7xl sm:mt-20">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-3xl bg-[var(--color-forest-deep)] px-5 py-12 text-center sm:px-12 sm:py-16">
            <div className="animate-blob pointer-events-none absolute -left-10 top-0 h-60 w-60 rounded-full bg-[var(--color-gold)]/20 blur-3xl" />
            <div
              className="animate-blob pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-emerald-400/15 blur-3xl"
              style={{ animationDelay: "-7s" }}
            />
            <div className="relative">
              <h2 className="font-display text-2xl text-white sm:text-5xl">
                Ready to start your <span className="shimmer-text italic">wellness journey?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-white/70 sm:mt-4 sm:text-base">
                Order today, pay on delivery. Delivered across Pakistan.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:justify-center sm:gap-4">
                <Link
                  href="/shop"
                  className="btn-gold pulse-ring rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)]"
                >
                  Start Shopping
                </Link>
                <a
                  href={whatsappLink("Hi Perfetto! I'd like to know more about your products.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/25 px-8 py-4 font-medium text-white hover:bg-white/10"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}