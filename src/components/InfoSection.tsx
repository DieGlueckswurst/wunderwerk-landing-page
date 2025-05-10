
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const InfoSection = () => {
  return <section id="info" className="px-6 py-[40px]">
    <div className="vertical-line h-32 mb-16"></div>
    <h2 className="section-title">01 Info</h2>

    <div className="max-w-3xl mx-auto text-center">
      <p className="text-lg mb-8">
        Das Wunderwerk bietet einzigartige Räumlichkeiten im Herzen Nürnbergs, perfekt für Kurse und Gesundheitsprofis.
        Unsere gemütlich modern eingerichteten Räume schaffen eine professionelle und angenehme Atmosphäre für deine Arbeit.
      </p>
      <p className="text-lg mb-10">
        Ein großer Raum eignet sich ideal für Kurse, während zwei speziell ausgestattete Räume perfekt für Hebammen
        und Physiotherapeuten sind. Außerdem bieten wir einen gemütlichen Café-Raum für kulturelle Veranstaltungen, oder einfaches Zusammenkommen.
      </p>
      
      <Link to="/about">
        <Button variant="outline" className="border-gray-300 hover:bg-gray-50 transition-all group">
          <span>Mehr über uns erfahren</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  </section>;
};

export default InfoSection;
