"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container-px mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[var(--color-gold)] via-[var(--color-gold-light)] to-[var(--color-gold)] px-8 py-16 text-center shadow-2xl"
        >
          <h2 className="font-display text-3xl text-[var(--color-forest-deep)] sm:text-4xl">
            Ready to start your wellness journey?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-forest-deep)]/70">
            Order today, pay on delivery. No advance payment, no risk — just
            herbal wellness delivered to your door.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-[var(--color-forest-deep)] px-9 py-4 font-medium text-white transition-transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            Start Shopping
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
