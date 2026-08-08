"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { SITE } from "@/lib/site";
import type { Product } from "@/lib/types";

export default function Hero({ featured }: { featured: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yFront = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const glowX = useMotionValue("50%");
  const glowY = useMotionValue("40%");
  const springGlowX = useSpring(glowX, { stiffness: 60, damping: 20 });
  const springGlowY = useSpring(glowY, { stiffness: 60, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set(`${((e.clientX - rect.left) / rect.width) * 100}%`);
    glowY.set(`${((e.clientY - rect.top) / rect.height) * 100}%`);
  }

  const heroProducts = featured.slice(0, 3);

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative h-[92vh] min-h-[640px] overflow-hidden bg-[var(--color-forest-deep)]"
    >
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,162,39,0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(20,80,60,0.5),transparent_50%)]" />
        <motion.div
          style={{
            background: useTransform(
              [springGlowX, springGlowY],
              ([x, y]) => `radial-gradient(500px circle at ${x} ${y}, rgba(201,162,39,0.18), transparent 70%)`
            ),
          }}
          className="absolute inset-0 hidden lg:block"
        />
        <div className="grain absolute inset-0" />
      </motion.div>

      <div className="container-px relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center gap-10 pt-20 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <motion.div style={{ opacity }} className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-block rounded-full border border-[var(--color-gold)]/40 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[var(--color-gold-light)]"
          >
            Trusted by {SITE.familiesServed} Families · {SITE.yearsInBusiness} Years
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Herbal Wellness,
            <br />
            <span className="text-gradient-gold italic">Perfected.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-lg text-white/70 lg:max-w-none"
          >
            Carefully crafted, chemical-free herbal solutions for weight,
            hair, skin, height and more — made for real concerns, backed by
            thousands of families across Pakistan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Link
              href="/shop"
              className="btn-gold rounded-full bg-[var(--color-gold)] px-8 py-4 font-medium text-[var(--color-forest-deep)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_rgba(201,162,39,0.6)]"
            >
              Shop the Range
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/25 px-8 py-4 font-medium text-white transition-colors hover:bg-white/10"
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yFront }}
          className="relative hidden h-[520px] w-[420px] shrink-0 lg:block"
        >
          {heroProducts.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, scale: 0.85, rotate: i % 2 === 0 ? -6 : 6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: "easeOut" }}
              className="absolute overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm"
              style={{
                width: i === 0 ? 260 : 190,
                height: i === 0 ? 340 : 240,
                top: i === 0 ? 40 : i === 1 ? 0 : 300,
                left: i === 0 ? 90 : i === 1 ? -10 : 210,
                zIndex: i === 0 ? 2 : 1,
              }}
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                className="relative h-full w-full"
              >
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="260px" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="h-9 w-5 rounded-full border border-white/30 p-1"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
