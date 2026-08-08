import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ValuePacks from "@/components/home/ValuePacks";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CtaBanner from "@/components/home/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
      <FeaturedProducts />
      <ValuePacks />
      <WhyChooseUs />
      <CtaBanner />
    </>
  );
}
