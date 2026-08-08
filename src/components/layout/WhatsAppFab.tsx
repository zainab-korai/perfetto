"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/site";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";

export default function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink("Hi Perfetto! I'd like to know more about your products.")}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <WhatsAppIcon size={26} className="relative" />
    </motion.a>
  );
}
