
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AngebotSection from "@/components/AngebotSection";
import RoomsSection from "@/components/RoomsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AngebotSection />
      <RoomsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
