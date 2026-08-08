const messages = [
  "100% Organic Herbal Formulas",
  "Cash on Delivery Nationwide",
  "Trusted by 15,000+ Families",
  "5+ Years of Herbal Wellness",
  "Fast, Discreet Delivery",
  "No Harmful Chemicals",
];

export default function MarqueeStrip() {
  const loop = [...messages, ...messages];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-[var(--color-forest-deep)] py-3">
      <div className="marquee-track">
        {loop.map((m, i) => (
          <span
            key={i}
            className="mx-6 flex items-center gap-3 whitespace-nowrap text-sm tracking-wide text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}
