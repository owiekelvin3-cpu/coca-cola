import HeroSection from "@/components/sections/HeroSection";
import CampaignShowcase from "@/components/sections/CampaignShowcase";
import BrandMoments from "@/components/sections/BrandMoments";
import BrandsTeaser from "@/components/sections/BrandsTeaser";
import ImpactTeaser from "@/components/sections/ImpactTeaser";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CampaignShowcase />
      <BrandMoments />
      <BrandsTeaser />
      <ImpactTeaser />
      <Footer />
    </main>
  );
}
