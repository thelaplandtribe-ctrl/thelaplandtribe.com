import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import ShowcaseSection from "@/components/ShowcaseSection";
import PopularArticles from "@/components/PopularArticles";
import AffichesMurales from "@/components/AffichesMurales";
import NewsletterBand from "@/components/NewsletterBand";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureCards />
      <ShowcaseSection />
      <PopularArticles />
      <AffichesMurales />
      <NewsletterBand />
    </>
  );
}
