import Counter from "@/components/ui/Counter";

const stats = [
  { to: 15000, suffix: "+", label: "Families Served" },
  { to: 5, suffix: "+", label: "Years of Trust" },
  { to: 22, suffix: "", label: "Herbal Formulas" },
  { to: 100, suffix: "%", label: "Cash on Delivery" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-[var(--color-sage-2)] bg-white/60 py-10">
      <div className="container-px mx-auto grid max-w-6xl grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl text-[var(--color-forest)] sm:text-4xl">
              <Counter to={s.to} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-[var(--color-ink)]/50">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
