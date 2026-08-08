import Hero from "@/components/home/Hero";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import TrustBar from "@/components/home/TrustBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Spotlight from "@/components/home/Spotlight";
import ProcessSection from "@/components/home/ProcessSection";
import ValuePacks from "@/components/home/ValuePacks";
import Gallery from "@/components/home/Gallery";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CtaBanner from "@/components/home/CtaBanner";
import { getAllProducts } from "@/lib/products";

export default async function Home() {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <Hero featured={featured} />
      <MarqueeStrip />
      <TrustBar />
      <CategoryGrid products={products} />
      <FeaturedProducts products={products} />
      <Spotlight featured={featured} />
      <ProcessSection />
      <ValuePacks products={products} />
      <Gallery products={products} />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
