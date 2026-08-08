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

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <Spotlight />
      <ProcessSection />
      <ValuePacks />
      <Gallery />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
