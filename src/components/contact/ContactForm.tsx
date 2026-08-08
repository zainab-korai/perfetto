"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const canSend = name.trim().length > 0 && message.trim().length > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    const text = `Hi Perfetto, my name is ${name}.\n\n${message}`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--color-sage-2)] bg-white p-8 shadow-sm"
    >
      <label className="block text-sm font-medium text-[var(--color-ink)]">Your Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
        placeholder="e.g. Ayesha Khan"
      />
      <label className="mt-5 block text-sm font-medium text-[var(--color-ink)]">Message</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        rows={5}
        className="mt-2 w-full rounded-xl border border-[var(--color-sage-2)] px-4 py-3 outline-none focus:border-[var(--color-forest)]"
        placeholder="How can we help?"
      />
      <button
        type="submit"
        disabled={!canSend}
        className="btn-gold mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-forest)] py-3.5 font-medium text-white transition-colors hover:bg-[var(--color-forest-deep)] disabled:opacity-40"
      >
        <Send size={16} /> Send via WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-[var(--color-ink)]/40">
        This opens WhatsApp with your message pre-filled — our fastest way to respond.
      </p>
    </motion.form>
  );
}
