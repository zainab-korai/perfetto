"use client";

import { motion } from "framer-motion";

const items = [
  {
    emoji: "🌿",
    title: "Honest Herbal Formulations",
    text: "We create carefully crafted herbal solutions targeting real concerns like weight management, skin care, hair care, and immunity — all without harmful chemicals or shortcuts.",
  },
  {
    emoji: "🛡️",
    title: "Safe & Responsible Approach",
    text: "Every product is developed with a strong focus on safety, effectiveness, and long-term wellness.",
  },
  {
    emoji: "👁️",
    title: "Transparent Information",
    text: "Clear labeling, honest descriptions, and realistic expectations — no exaggerated claims or gimmicks.",
  },
  {
    emoji: "⚙️",
    title: "Expertly Designed Solutions",
    text: "Each product is formulated to address specific wellness challenges, so you get targeted support for your concerns.",
  },
  {
    emoji: "📈",
    title: "Long-Term Wellness Focus",
    text: "We focus on gradual, sustainable improvement — helping your body achieve results safely and naturally.",
  },
  {
    emoji: "👥",
    title: "Trusted by Thousands Nationwide",
    text: "Serving 15,000+ families across Pakistan over the past half decade, building trust through real results and satisfied customers.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[var(--color-sage)]/50 py-24">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
            Why Choose Us
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--color-ink)]">
            The Perfetto Promise
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-[var(--color-sage-2)] bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
            >
              <span className="text-3xl">{item.emoji}</span>
              <h3 className="mt-4 font-display text-xl text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/60">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
