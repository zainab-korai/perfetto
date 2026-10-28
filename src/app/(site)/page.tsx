import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import HomeShowcase from "@/components/home/HomeShowcase";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { effectivePrice, formatPKR } from "@/lib/format";
import { FLAT_SHIPPING, SITE, whatsappLink } from "@/lib/site";

// Homepage cache hota hai aur har 5 minute baad refresh. Isi se site fast khulti hai.
export const revalidate = 300;

/* ==========================================================
   REAL CUSTOMER REVIEWS
   Sirf asli reviews yahan daalo (customer ki ijazat se).
   Jab tak ye list khali hai, reviews section homepage pe nahi dikhega.

   Format:
   { name: "Customer ka naam", city: "Lahore", product: "Hair Oil",
     text: "Customer ne jo likha", image: "/reviews/1.jpg" },

   - text ya image, dono mein se ek ya dono de sakti ho.
   - image: WhatsApp chat ka screenshot, file public/reviews/ folder mein rakho.
   ========================================================== */
type Review = {
  name: string;
  city: string;
  product?: string;
  text?: string;
  image?: string;
};
const REVIEWS: Review[] = [];

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

  const featured = products.filter((p) => p.featured);
  const spot = featured[0] ?? products[0];
  const heroProducts = (featured.length ? featured : products).slice(0, 3);

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
        <div className="container-px relative mx-auto grid max-w-7xl items-center gap-10 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
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

          {/* Product fan (sirf bade screen pe, mobile pe load nahi hota) */}
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
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
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

      {/* ============ "I'M LOOKING FOR" QUICK PICKER ============ */}
      <section className="container-px relative z-10 mx-auto -mt-12 max-w-7xl">
        <div className="rounded-3xl border border-[var(--color-sage-2)] bg-white p-5 shadow-[0_20px_50px_-20px_rgba(18,61,47,0.35)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
            What are you looking for?
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/product-category/${c.slug}`}
                className="rounded-full bg-[var(--color-sage)] px-5 py-2.5 text-sm font-medium text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="container-px mx-auto max-w-7xl pt-10">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
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

      {/* ============ SHOP BY CONCERN (TABS) ============ */}
      <section className="container-px mx-auto max-w-7xl pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
          Shop by Concern
        </p>
        <h2 className="font-display mb-8 mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
          Find What Your Body Needs
        </h2>
        <HomeShowcase products={slim} tabs={tabs} />
      </section>

      {/* ================= BUNDLES ================= */}
      {bundles.length > 0 && (
        <section className="mt-20 bg-[var(--color-sage)] py-16">
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

      {/* ============== EDITOR'S PICK ============== */}
      {spot && (
        <section className="container-px mx-auto max-w-7xl pt-20">
          <div className="grid overflow-hidden rounded-3xl bg-[var(--color-forest-deep)] lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[420px]">
              {spot.images[0] && (
                <Image
                  src={spot.images[0]}
                  alt={spot.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-light)]">
                Editor&apos;s Pick
              </p>
              <h2 className="font-display mt-3 text-4xl text-white">{spot.name}</h2>
              <p className="mt-3 text-white/70">{spot.tagline}</p>
              {(spot.highlights ?? []).length > 0 && (
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {spot.highlights.slice(0, 4).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-gold)]" />
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-white">{formatPKR(effectivePrice(spot))}</span>
                {spot.salePrice && spot.salePrice < spot.price && (
                  <span className="text-white/40 line-through">{formatPKR(spot.price)}</span>
                )}
              </div>
              <Link
                href={`/product/${spot.slug}`}
                className="btn-gold mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)]"
              >
                Shop This Formula <ArrowRight size={18} />
              </Link>
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

      {/* ============== REAL REVIEWS (sirf tab dikhega jab REVIEWS mein data ho) ============== */}
      {REVIEWS.length > 0 && (
        <section className="container-px mx-auto max-w-7xl pt-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
            Customer Words
          </p>
          <h2 className="font-display mb-8 mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
            What Our Customers Say
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <figure
                key={i}
                className="overflow-hidden rounded-2xl border border-[var(--color-sage-2)] bg-white"
              >
                {r.image && (
                  <div className="relative aspect-[3/4] bg-[var(--color-sage)]">
                    <Image
                      src={r.image}
                      alt={`Review from ${r.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover"
                    />
                  </div>
                )}
                <figcaption className="p-5">
                  {r.text && <p className="text-[var(--color-ink)]/80">&ldquo;{r.text}&rdquo;</p>}
                  <p className="mt-3 text-sm font-semibold text-[var(--color-forest)]">
                    {r.name}, {r.city}
                  </p>
                  {r.product && <p className="text-xs text-[var(--color-ink)]/50">Used: {r.product}</p>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

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