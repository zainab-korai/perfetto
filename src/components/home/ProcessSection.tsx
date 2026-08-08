"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, FlaskConical, ShieldCheck, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Leaf,
    title: "Sourced Naturally",
    text: "We start with herbal ingredients chosen for purity, not shortcuts.",
  },
  {
    icon: FlaskConical,
    title: "Carefully Formulated",
    text: "Each formula is developed to target one wellness concern at a time.",
  },
  {
    icon: ShieldCheck,
    title: "Safety First",
    text: "Every batch is made with a strong focus on safety and consistency.",
  },
  {
    icon: PackageCheck,
    title: "Delivered to You",
    text: "Packed with care and delivered nationwide — pay only on arrival.",
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="py-24">
      <div className="container-px mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
            Our Process
          </p>
          <h2 className="mt-3 font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
            From Nature to Your Doorstep
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--color-sage-2)] sm:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-2 hidden w-px bg-[var(--color-gold)] sm:block"
          />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative flex items-start gap-6 sm:pl-0"
                >
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-gold)] bg-[var(--color-cream)] text-[var(--color-forest)]">
                    <Icon size={20} />
                  </span>
                  <div className="pt-1.5">
                    <p className="font-display text-xl text-[var(--color-ink)]">{step.title}</p>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-[var(--color-ink)]/60">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
