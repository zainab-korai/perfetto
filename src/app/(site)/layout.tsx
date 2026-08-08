import { CartProvider } from "@/lib/cart-context";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import ScrollProgress from "@/components/layout/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ScrollProgress />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppFab />
    </CartProvider>
  );
}
