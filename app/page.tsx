import HeroSection      from "@/components/sections/HeroSection";
import BrandsTeaser     from "@/components/sections/BrandsTeaser";
import CampaignFeature  from "@/components/sections/CampaignFeature";
import ThreeDSection    from "@/components/sections/ThreeDSection";
import NigeriaMoments   from "@/components/sections/NigeriaMoments";
import CokeQuiz         from "@/components/sections/CokeQuiz";
import BrandMoments     from "@/components/sections/BrandMoments";
import BrandsSection    from "@/components/sections/BrandsSection";
import CampaignsSection from "@/components/sections/CampaignsSection";
import ImpactSection    from "@/components/sections/ImpactSection";
import AboutSection     from "@/components/sections/AboutSection";
import Footer           from "@/components/sections/Footer";
import SectionWrapper   from "@/components/ui/SectionWrapper";

export default function Home() {
  return (
    <main>
      {/* Hero — no wrapper, it has its own entrance animation */}
      <HeroSection />

      <SectionWrapper delay={0}>
        <BrandsTeaser />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <CampaignFeature />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <ThreeDSection />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <NigeriaMoments />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <CokeQuiz />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <BrandMoments />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <BrandsSection />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <CampaignsSection />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <ImpactSection />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <AboutSection />
      </SectionWrapper>

      <SectionWrapper delay={0}>
        <Footer />
      </SectionWrapper>
    </main>
  );
}
