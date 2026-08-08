import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";
import { SITE, whatsappLink } from "@/lib/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[var(--color-forest-deep)] text-[var(--color-cream)]">
      <div className="container-px relative mx-auto grid max-w-7xl gap-12 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/10">
              <Image src="/logo.webp" alt="Perfetto" fill sizes="40px" className="object-contain p-1" />
            </span>
            <p className="font-display text-2xl text-white">
              Perfetto<span className="text-[var(--color-gold-light)]">.</span>
            </p>
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/60">
            Herbal wellness formulated for real concerns — trusted by{" "}
            {SITE.familiesServed} families across Pakistan for {SITE.yearsInBusiness} years.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
              aria-label="Facebook"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={whatsappLink("Hi Perfetto, I have a question about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:bg-white/10"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={16} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-white/40">Shop by Concern</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/product-category/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-white/40">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/shop" className="hover:text-white">Shop All</Link></li>
            <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-white/40">Get in Touch</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp: {SITE.whatsappDisplay}
              </a>
            </li>
            <li className="text-white/50">Cash on Delivery — all across Pakistan</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-px mx-auto max-w-7xl text-center text-xs text-white/40">
          © {new Date().getFullYear()} Perfetto. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
