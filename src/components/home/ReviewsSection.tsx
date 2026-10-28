import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { REVIEWS } from "@/lib/reviews";
import { whatsappLink } from "@/lib/site";

export default function ReviewsSection() {
  // Jab tak lib/reviews.ts khali hai, section nahi dikhega (koi fake/khali cheez nahi)
  if (REVIEWS.length === 0) return null;

  return (
    <section className="mt-20 bg-[var(--color-cream-2)] py-16">
      <div className="container-px mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-deep)]">
          Customer Words
        </p>
        <h2 className="font-display mt-2 text-3xl text-[var(--color-ink)] sm:text-4xl">
          What Our Customers Say
        </h2>
        <p className="mt-2 max-w-xl text-[var(--color-ink)]/60">
          Real messages from real customers across Pakistan.
        </p>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {REVIEWS.map((r, i) =>
            r.image ? (
              /* Screenshot card */
              <figure
                key={i}
                className="w-[250px] shrink-0 snap-start overflow-hidden rounded-3xl border border-[var(--color-sage-2)] bg-white shadow-sm sm:w-[270px]"
              >
                <div className="relative aspect-[9/16] bg-[var(--color-sage)]">
                  <Image
                    src={r.image}
                    alt={`Review from ${r.name}`}
                    fill
                    sizes="270px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="p-4">
                  <p className="text-sm font-semibold text-[var(--color-forest)]">
                    {r.name}, {r.city}
                  </p>
                  {r.product && <p className="text-xs text-[var(--color-ink)]/50">Used: {r.product}</p>}
                </figcaption>
              </figure>
            ) : (
              /* Text card */
              <figure
                key={i}
                className="relative flex w-[290px] shrink-0 snap-start flex-col justify-between rounded-3xl border border-[var(--color-sage-2)] bg-white p-6 shadow-sm sm:w-[320px]"
              >
                <span className="font-display absolute right-5 top-2 text-7xl leading-none text-[var(--color-gold)]/25">
                  &rdquo;
                </span>
                <p className="relative text-[var(--color-ink)]/80">{r.text}</p>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-forest)] font-display text-lg text-[var(--color-gold-light)]">
                    {r.name.charAt(0).toUpperCase()}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-[var(--color-forest)]">{r.name}</span>
                    <span className="block text-xs text-[var(--color-ink)]/50">
                      {r.city}
                      {r.product ? ` · ${r.product}` : ""}
                    </span>
                  </span>
                </figcaption>
              </figure>
            )
          )}

          {/* Last card: naye customers ko review dene ka rasta */}
          <a
            href={whatsappLink("Hi Perfetto! I'd like to share my experience.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[250px] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-3xl bg-[var(--color-forest)] p-6 text-center text-white sm:w-[270px]"
          >
            <MessageCircle size={32} className="text-[var(--color-gold-light)]" />
            <p className="font-display text-xl">Used Perfetto?</p>
            <p className="text-sm text-white/70">Share your experience with us on WhatsApp.</p>
          </a>
        </div>
      </div>
    </section>
  );
}