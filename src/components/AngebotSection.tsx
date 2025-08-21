import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AngebotSection = () => {
  return (
    <section id="angebot" className="px-6 py-[40px]">
      <div className="vertical-line h-32 mb-16"></div>
      <h2 className="section-title">01 Angebot</h2>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-700 mb-12 font-light">
          Vier <span className="font-semibold text-gray-900">einzigartige Räume</span> im Herzen Nürnbergs
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <h3 className="font-serif text-2xl mb-4 text-gray-900">Gesundheit & Therapie</h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700"><strong>Hebammen</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700"><strong>Physiotherapie</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700">Weitere Gesundheitspraktiker</span>
              </div>
            </div>
          </div>
          <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
            <h3 className="font-serif text-2xl mb-4 text-gray-900">Kurse & Schulungen</h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700"><strong>Yoga & Pilates</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700"><strong>Workshops</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700">Gruppenkurse aller Art</span>
              </div>
            </div>
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