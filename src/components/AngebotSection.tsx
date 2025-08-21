import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AngebotSection = () => {
  return (
    <section id="angebot" className="px-6 py-[40px]">
      <div className="vertical-line h-32 mb-16"></div>
      <h2 className="section-title">01 Angebot</h2>

      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg mb-8">
          Das Wunderwerk ist der ideale Ort für Gesundheitsprofis und Kursleiter im Herzen Nürnbergs.
          Unsere vier einzigartigen Räume bieten die perfekte Atmosphäre für deine Arbeit.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-serif text-xl mb-3">Gesundheit & Therapie</h3>
            <p className="text-gray-600">
              Speziell ausgestattete Räume für Hebammen, Physiotherapeuten und andere Gesundheitspraktiker
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-serif text-xl mb-3">Kurse & Schulungen</h3>
            <p className="text-gray-600">
              Flexibles Studio für Yoga, Pilates, Workshops und Gruppenkurse aller Art
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/rooms">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 transition-all group">
              <span>Räume entdecken</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/wir">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 transition-all group">
              <span>Unser Team</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AngebotSection;