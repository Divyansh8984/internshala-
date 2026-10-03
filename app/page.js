import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FeatureSection from "@/components/FeatureSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <AboutSection />
        <FeatureSection />
        <ShowcaseSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
