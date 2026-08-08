import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TrustBar from "@/components/home/TrustBar";
import { SITE } from "@/lib/site";
import { getFeaturedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "About Us — Perfetto",
  description: "Learn about Perfetto's mission to bring honest, herbal wellness solutions to families across Pakistan.",
};

export default async function AboutPage() {
  const featured = await getFeaturedProducts();
  const hero = featured[0];

  return (
    <div className="bg-[var(--color-cream)]">
      <section className="relative overflow-hidden bg-[var(--color-forest-deep)] py-28 text-white">
        <div className="grain absolute inset-0" />
        <div className="container-px relative mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-light)]">
            Our Story
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            Wellness, rooted in honesty.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Perfetto was founded to bring carefully crafted herbal solutions
            to real, everyday concerns — weight, hair, skin, immunity and
            more — without harmful chemicals or exaggerated claims.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="py-24">
        <div className="container-px mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[var(--color-sage)]">
            {hero && (
              <Image
                src={hero.images[0]}
                alt="Perfetto herbal wellness"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
              What We Believe
            </p>
            <h2 className="mt-3 font-display text-3xl text-[var(--color-ink)] sm:text-4xl">
              A safe, responsible approach to everyday wellness
            </h2>
            <p className="mt-5 leading-relaxed text-[var(--color-ink)]/70">
              For over {SITE.yearsInBusiness} years, we&apos;ve worked to build
              formulas that people can trust — with clear labeling, honest
              descriptions and realistic expectations. No shortcuts, no
              gimmicks. Just gradual, sustainable wellness that {SITE.familiesServed} families
              across Pakistan have made part of their routine.
            </p>
            <p className="mt-4 leading-relaxed text-[var(--color-ink)]/70">
              Every Perfetto product is developed with a strong focus on
              safety and effectiveness, and formulated to target a specific
              wellness concern — so whatever you&apos;re looking to improve,
              there&apos;s a formula designed for it.
            </p>
            <Link
              href="/shop"
              className="btn-gold mt-8 inline-block rounded-full bg-[var(--color-forest)] px-8 py-3.5 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)]"
            >
              Explore Our Products
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseUs />
    </div>
  );
}
