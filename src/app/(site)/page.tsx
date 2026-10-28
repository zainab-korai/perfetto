import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Leaf, MessageCircle, ShieldCheck, Truck, Users } from "lucide-react";
import HomeShowcase from "@/components/home/HomeShowcase";
import CategoryIcons from "@/components/home/CategoryIcons";
import ParallaxShowcase from "@/components/home/ParallaxShowcase";
import ReviewsSection from "@/components/home/ReviewsSection";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { effectivePrice, formatPKR } from "@/lib/format";
import { FLAT_SHIPPING, SITE, whatsappLink } from "@/lib/site";

// Homepage cache hota hai aur har 5 minute baad refresh. Isi se site fast khulti hai.
export const revalidate = 300;

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

export default async function Home() {
  const products = await getAllProducts();

  const pool = products.filter((p) => p.featured);
  const base = pool.length ? pool : products;
  const heroProducts = base.slice(0, 3);

  // Parallax section ke liye: 1 bada + 2 side products
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

  // Client component ko sirf zaroori data bhejte hain (page halka rehta hai)
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

  // Bundles: jin products pe sale hai, sabse zyada bachat wale pehle
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

  const steps = [
    { n: "1", title: "Choose your product", text: "Pick by concern or browse the best sellers." },
    { n: "2", title: "Place your order", text: "Add to cart and enter your address. Takes one minute." },
    { n: "3", title: "Pay on delivery", text: "Receive your parcel at home and pay the rider." },
  ];

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[var(--color-forest-deep)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(201,162,39,0.28),transparent_42%),radial-gradient(circle_at_88%_80%,rgba(20,80,60,0.6),transparent_50%)]" />
        <div className="container-px relative mx-auto grid max-w-7xl items-center gap-10 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-20">
          <div className="text-center lg:text-left">
            <p className="mb-5 inline-block rounded-full border border-[var(--color-gold)]/40 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
              Trusted by {SITE.familiesServed} Families
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Herbal Wellness,
              <br />
              <span className="text-gradient-gold italic">Perfected.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-lg text-white/70 lg:mx-0">
              Chemical-free herbal formulas for weight, hair, skin, height and more, made for real
              concerns.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/shop"
                className="btn-gold rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)] transition-transform hover:-translate-y-0.5"
              >
                Shop Now
              </Link>
              <a
                href={whatsappLink("Hi Perfetto! I'd like some advice on which product to choose.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 font-medium text-white transition-colors hover:bg-white/10"
              >
                <MessageCircle size={18} /> Ask on WhatsApp
              </a>
            </div>
          </div>

          {/* Product fan (sirf bade screen pe) */}
          {heroProducts.length > 0 && (
            <div className="relative mx-auto hidden h-[420px] w-full max-w-[440px] lg:block">
              {heroProducts.map((p, i) => {
                const pos = [
                  "left-[4%] top-[14%] -rotate-6 z-10",
                  "left-[30%] top-0 rotate-3 z-20",
                  "left-[52%] top-[26%] rotate-6 z-10",
                ][i];
                return (
                  <Link
                    key={p.slug}
                    href={`/product/${p.slug}`}
                    className={`absolute w-[46%] overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl transition-transform duration-300 hover:-translate-y-2 hover:rotate-0 ${pos}`}
                  >
                    <div className="relative aspect-[3/4]">
                      {p.images[0] && (
                        <Image src={p.images[0]} alt={p.name} fill sizes="200px" className="object-cover" />
                      )}
                    </div>
                    <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-2 pt-8 text-center text-xs font-medium text-white">
                      {p.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ============ SHOP BY CONCERN (ICON GRID) ============ */}
      <section className="container-px mx-auto max-w-7xl pt-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
            Shop by Concern
          </p>
          <h2 className="font-display mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
            Find What Your Body Needs
          </h2>
        </div>
        <CategoryIcons />
      </section>

      {/* ================= TRUST ================= */}
      <section className="container-px mx-auto max-w-7xl pt-14">
        <div className="grid grid-cols-2 gap-5 rounded-3xl border border-[var(--color-sage-2)] bg-white p-6 lg:grid-cols-4">
          {trust.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <Icon size={20} />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-ink)]">{title}</p>
                <p className="text-xs text-[var(--color-ink)]/55">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PRODUCTS WITH TABS ============ */}
      <section className="container-px mx-auto max-w-7xl pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
          Browse Products
        </p>
        <h2 className="font-display mb-8 mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
          Best Sellers & More
        </h2>
        <HomeShowcase products={slim} tabs={tabs} />
      </section>

      {/* ============ PARALLAX PRODUCT SHOWCASE ============ */}
      {mainP && mainP.images[0] && (
        <ParallaxShowcase main={toParallax(mainP)} side={sideP.filter((p) => p.images[0]).map(toParallax)} />
      )}

      {/* ================= BUNDLES ================= */}
      {bundles.length > 0 && (
        <section className="bg-[var(--color-sage)] py-16">
          <div className="container-px mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
              Best Value
            </p>
            <h2 className="font-display mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
              Bundles & Courses, Bigger Savings
            </h2>
            <p className="mt-2 max-w-xl text-[var(--color-ink)]/60">
              Complete courses at a special price. The smart way to stay consistent.
            </p>

            <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
              {bundles.map((p) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl sm:w-[280px]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-cream-2)]">
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-forest)] px-3 py-1 text-[11px] font-bold uppercase text-white">
                      Save {formatPKR(p.price - p.salePrice!)}
                    </span>
                    {p.images[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="280px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg leading-tight text-[var(--color-ink)]">{p.name}</h3>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-[var(--color-forest)]">
                        {formatPKR(effectivePrice(p))}
                      </span>
                      <span className="text-sm text-[var(--color-ink)]/40 line-through">
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

      {/* ============== HOW TO ORDER ============== */}
      <section className="container-px mx-auto max-w-7xl pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
          Easy Ordering
        </p>
        <h2 className="font-display mb-8 mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
          Order in 3 Simple Steps
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex items-start gap-4 rounded-2xl border border-[var(--color-sage-2)] bg-white p-6"
            >
              <span className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-xl text-[var(--color-gold-light)]">
                {s.n}
              </span>
              <div>
                <h3 className="font-display text-lg text-[var(--color-ink)]">{s.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-ink)]/60">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== REAL REVIEWS (lib/reviews.ts se) ============== */}
      <ReviewsSection />

      {/* ================= FAQ ================= */}
      <section className="container-px mx-auto max-w-3xl pt-20">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
          Good to Know
        </p>
        <h2 className="font-display mb-8 mt-2 text-center text-3xl text-[var(--color-ink)] sm:text-4xl">
          Common Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-[var(--color-sage-2)] bg-white px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--color-ink)] [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 text-[var(--color-forest)] transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/65">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="container-px mx-auto mt-20 max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-forest-deep)] px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,39,0.25),transparent_50%)]" />
          <div className="relative">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Ready to start your wellness journey?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Order today, pay on delivery. Delivered across Pakistan.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="btn-gold rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)]"
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
      </section>
    </>
  );
}