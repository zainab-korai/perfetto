export const SITE = {
  name: "Perfetto",
  tagline: "Herbal Wellness, Perfected",
  whatsappNumber: "923200776615",
  whatsappDisplay: "+92 320 077 6615",
  facebook: "https://www.facebook.com/share/18SCFPMqTt/",
  instagram: "https://www.instagram.com/perfetto.pk",
  familiesServed: "15,000+",
  yearsInBusiness: "5+",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const FLAT_SHIPPING = 250;

export function computeShipping(): number {
  return FLAT_SHIPPING;
}
