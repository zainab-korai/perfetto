import Image from "next/image";
import Link from "next/link";
import { Leaf, ShieldCheck, Truck, Users } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/lib/categories";
import { effectivePrice, formatPKR } from "@/lib/format";
import { SITE, whatsappLink } from "@/lib/site";
import type { Category, Product } from "@/lib/types";

// Page cache hoga aur har 5 minute baad refresh. Isi se site fast khulti hai.
export const revalidate = 300;

/* ---------- chhote helper pieces (isi file mein) ---------- */

function SectionHead({
  eyebrow,
  title,
  href,
  linkText = "View All",
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
          {eyebrow}
        </p>
        <h2 className="font-display mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 rounded-full border border-[var(--color-forest)] px-5 py-2 text-sm font-medium text-[var(--color-forest)] transition-colors hover:bg-[var(--color-forest)] hover:text-white"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}

function Card({ p }: { p: Product }) {
  const price = effectivePrice(p);
  const onSale = !!p.salePrice && p.salePrice < p.price;
  const off = onSale ? Math.round((1 - p.salePrice! / p.price) * 100) : 0;
  const out = p.stock <= 0;

  return (
    <Link
      href={`/product/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--color-sage-2)] bg-white transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--color-sage)]">
        {out ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-ink)]/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            Out of Stock
          </span>
        ) : onSale ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-gold)] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--color-forest-deep)]">
            Save {off}%
          </span>
        ) : p.badge ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[var(--color-forest)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {p.badge}
          </span>
        ) : null}
        {p.images[0] && (
          <Image
            src={p.images[0]}
            alt={p.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 300px"
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              out ? "opacity-60 grayscale" : ""
            }`}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-[11px] uppercase tracking-wider text-[var(--color-gold-deep)]">
          {p.categories[0]}
        </p>
        <h3 className="font-display text-base leading-tight text-[var(--color-ink)] sm:text-lg">
          {p.name}
        </h3>
        <p className="line-clamp-1 text-sm text-[var(--color-ink)]/60">{p.tagline}</p>
        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="font-semibold text-[var(--color-forest)]">{formatPKR(price)}</span>
          {onSale && (
            <span className="text-xs text-[var(--color-ink)]/40 line-through">
              {formatPKR(p.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ---------- homepage ---------- */

export default async function Home() {
  const products = await getAllProducts();

  const featured = products.filter((p) => p.featured);
  const bestSellers = (featured.length ? featured : products).slice(0, 8);

  const offers = products
    .filter((p) => p.salePrice && p.salePrice < p.price)
    .sort((a, b) => b.price - b.salePrice! - (a.price - a.salePrice!))
    .slice(0, 4);

  const newArrivals = products
    .filter((p) => p.categories.includes("New Arrivals" as Category))
    .slice(0, 4);

  const heroProducts = (featured.length ? featured : products).slice(0, 3);

  const trust = [
    { icon: Truck, title: "Cash on Delivery", text: "Pay when it arrives" },
    { icon: Users, title: `${SITE.familiesServed} Families`, text: "Trust Perfetto" },
    { icon: Leaf, title: "Herbal Formulas", text: "Made with care" },
    { icon: ShieldCheck, title: "Safety First", text: "Consistent batches" },
  ];

  const promises = [
    {
      title: "Honest Herbal Formulations",
      text: "Carefully crafted herbal solutions for real concerns like weight, skin, hair and immunity.",
    },
    {
      title: "Safe & Responsible",
      text: "Every product is developed with a strong focus on safety and consistency.",
    },
    {
      title: "Transparent Information",
      text: "Clear labeling and honest descriptions, with realistic expectations.",
    },
    {
      title: "Trusted Nationwide",
      text: `Serving ${SITE.familiesServed} families across Pakistan for ${SITE.yearsInBusiness} years.`,
    },
  ];

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-[var(--color-forest-deep)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,162,39,0.25),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(20,80,60,0.55),transparent_50%)]" />
        <div className="container-px relative mx-auto grid max-w-7xl items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:py-24">
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
                className="rounded-full border border-white/25 px-8 py-4 font-medium text-white transition-colors hover:bg-white/10"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>

          {heroProducts.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {heroProducts.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/product/${p.slug}`}
                  className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
                    i === 1 ? "mt-8" : ""
                  }`}
                >
                  <div className="relative aspect-[3/4]">
                    {p.images[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 1024px) 30vw, 200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-8 text-center text-xs font-medium text-white sm:text-sm">
                    {p.name}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section className="border-b border-[var(--color-sage-2)] bg-white">
        <div className="container-px mx-auto grid max-w-7xl grid-cols-2 gap-6 py-6 lg:grid-cols-4">
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

      {/* ============ SHOP BY CONCERN ============ */}
      <section className="container-px mx-auto max-w-7xl pt-16">
        <SectionHead eyebrow="Shop by Concern" title="Find What Your Body Needs" href="/shop" />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {categories.map((c) => {
            const img = products.find((p) => p.categories.includes(c.name as Category))?.images[0];
            return (
              <Link
                key={c.slug}
                href={`/product-category/${c.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-forest)]"
              >
                {img && (
                  <Image
                    src={img}
                    alt={c.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 300px"
                    className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-forest-deep)] via-[var(--color-forest-deep)]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="font-display text-lg leading-tight text-white sm:text-xl">{c.name}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-white/65">{c.blurb}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============ BEST SELLERS ============ */}
      <section className="container-px mx-auto max-w-7xl pt-20">
        <SectionHead eyebrow="Most Loved" title="Best Selling Formulas" href="/shop" />
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <Card key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {/* ============ OFFERS & BUNDLES ============ */}
      {offers.length > 0 && (
        <section className="mt-20 bg-[var(--color-sage)] py-16">
          <div className="container-px mx-auto max-w-7xl">
            <SectionHead eyebrow="Best Value" title="Latest Offers & Bundles" href="/shop" />
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {offers.map((p) => (
                <Card key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ NEW ARRIVALS ============ */}
      {newArrivals.length > 0 && (
        <section className="container-px mx-auto max-w-7xl pt-20">
          <SectionHead
            eyebrow="Just In"
            title="New Arrivals"
            href="/product-category/new-arrivals"
          />
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <Card key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* ============ WHY PERFETTO ============ */}
      <section className="container-px mx-auto max-w-7xl pt-20">
        <SectionHead eyebrow="Why Choose Us" title="The Perfetto Promise" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promises.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[var(--color-sage-2)] bg-white p-6"
            >
              <span className="mb-4 block h-1 w-10 rounded-full bg-[var(--color-gold)]" />
              <h3 className="font-display text-lg text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/65">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="container-px mx-auto mt-20 max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--color-forest-deep)] px-6 py-14 text-center sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(201,162,39,0.25),transparent_50%)]" />
          <div className="relative">
            <h2 className="font-display text-3xl text-white sm:text-4xl">
              Ready to start your wellness journey?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Order today, pay on delivery. No advance payment, delivered across Pakistan.
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