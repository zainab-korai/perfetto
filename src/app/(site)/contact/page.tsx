import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Perfetto",
  description: "Get in touch with Perfetto on WhatsApp, Facebook or Instagram.",
};

export default function ContactPage() {
  return (
    <div className="bg-[var(--color-cream)]">
      <div className="border-b border-[var(--color-sage-2)] bg-[var(--color-sage)]/40 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-gold-deep)]">
          Get in Touch
        </p>
        <h1 className="mt-3 font-display text-4xl text-[var(--color-ink)] sm:text-5xl">
          We&apos;d Love to Hear From You
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[var(--color-ink)]/60">
          Questions about a product or your order? Message us — we usually reply within minutes on WhatsApp.
        </p>
      </div>

      <div className="container-px mx-auto grid max-w-6xl gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-[var(--color-ink)]">Reach Us Directly</h2>
          <div className="mt-6 space-y-4">
            <a
              href={whatsappLink("Hi Perfetto, I have a question.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[var(--color-sage-2)] bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <WhatsAppIcon size={22} />
              </span>
              <div>
                <p className="font-medium text-[var(--color-ink)]">WhatsApp</p>
                <p className="text-sm text-[var(--color-ink)]/60">{SITE.whatsappDisplay}</p>
              </div>
            </a>

            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[var(--color-sage-2)] bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-forest)]/10 text-[var(--color-forest)]">
                <FacebookIcon size={20} />
              </span>
              <div>
                <p className="font-medium text-[var(--color-ink)]">Facebook</p>
                <p className="text-sm text-[var(--color-ink)]/60">@perfetto.pk</p>
              </div>
            </a>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-[var(--color-sage-2)] bg-white p-5 transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold-deep)]">
                <InstagramIcon size={20} />
              </span>
              <div>
                <p className="font-medium text-[var(--color-ink)]">Instagram</p>
                <p className="text-sm text-[var(--color-ink)]/60">@perfetto.pk</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-dashed border-[var(--color-sage-2)] p-5">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-sage)] text-[var(--color-forest)]">
                <MessageCircle size={20} />
              </span>
              <div>
                <p className="font-medium text-[var(--color-ink)]">Order Support</p>
                <p className="text-sm text-[var(--color-ink)]/60">
                  All orders are Cash on Delivery — no advance payment needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
