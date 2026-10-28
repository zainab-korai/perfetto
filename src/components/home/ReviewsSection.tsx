import { MessageCircle } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import { SITE, whatsappLink } from "@/lib/site";

export default function ReviewsSection() {
  // Jab tak lib/reviews.ts khali hai, section nahi dikhega
  if (REVIEWS.length === 0) return null;

  return (
    <section className="mt-20 bg-[var(--color-cream-2)] py-16">
      <div className="container-px mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
            Customer Words
          </p>
          <h2 className="font-display mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-2 max-w-md text-[var(--color-ink)]/60">
            Real messages from customers across Pakistan. Trusted by {SITE.familiesServed} families.
          </p>
        </div>

        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 md:justify-center [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((r, i) => {
            const dark = i === 0;
            return (
              <figure
                key={`${r.name}-${i}`}
                className={`relative flex w-[300px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-sm sm:w-[340px] ${
                  dark
                    ? "bg-[var(--color-forest)] text-white"
                    : "border border-[var(--color-sage-2)] bg-white text-[var(--color-ink)]"
                }`}
              >
                <span
                  aria-hidden
                  className={`font-display absolute right-6 top-1 text-8xl leading-none ${
                    dark ? "text-[var(--color-gold)]/30" : "text-[var(--color-gold)]/25"
                  }`}
                >
                  &rdquo;
                </span>

                <blockquote
                  className={`relative pt-4 text-[15px] leading-relaxed ${
                    dark ? "text-white/90" : "text-[var(--color-ink)]/80"
                  }`}
                >
                  {r.text}
                </blockquote>

                <figcaption className="mt-8 flex items-center gap-3">
                  <span
                    className={`font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl ${
                      dark
                        ? "bg-[var(--color-gold)] text-[var(--color-forest-deep)]"
                        : "bg-[var(--color-forest)] text-[var(--color-gold-light)]"
                    }`}
                  >
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                  <span>
                    <span className={`block text-sm font-semibold ${dark ? "text-white" : "text-[var(--color-forest)]"}`}>
                      {r.name}
                    </span>
                    <span className={`block text-xs ${dark ? "text-white/60" : "text-[var(--color-ink)]/50"}`}>
                      {r.city}
                      {r.product ? ` · ${r.product}` : ""}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}

          <a
            href={whatsappLink("Hi Perfetto! I'd like to share my experience.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[260px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-[var(--color-forest)]/30 p-7 text-center transition-colors hover:border-[var(--color-forest)] hover:bg-white"
          >
            <MessageCircle size={32} className="text-[var(--color-forest)]" />
            <p className="font-display text-xl text-[var(--color-ink)]">Used Perfetto?</p>
            <p className="text-sm text-[var(--color-ink)]/60">Share your experience with us on WhatsApp.</p>
          </a>
        </div>
      </div>
    </section>
  );
}