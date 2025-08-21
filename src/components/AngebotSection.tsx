import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AngebotSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="angebot" className="px-6 py-[40px]">
      <div className="vertical-line h-32 mb-16"></div>
      <h2 className="section-title">01 Angebot</h2>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-700 mb-12 font-light">
          Drei <span className="font-semibold text-gray-900">Bereiche</span> für deine perfekte Raumnutzung
        </p>
        
        <Accordion type="multiple" className="w-full space-y-4 mb-12">
          <AccordionItem value="gesundheit" className="bg-amber-50 rounded-lg border border-amber-100">
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
              <h3 className="font-serif text-xl text-gray-900">Gesundheit & Therapie</h3>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700"><strong>Hebammen</strong> - Geburtsvorbereitungskurse, Nachsorge</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700"><strong>Physiotherapie</strong> - Einzelbehandlungen, Gruppentherapie</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700">Weitere Gesundheitspraktiker</span>
                </div>
                <Button 
                  onClick={() => scrollToSection('rooms')}
                  variant="outline" 
                  className="mt-4 border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <span>Zu den Räumen</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="kurse" className="bg-amber-50 rounded-lg border border-amber-100">
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
              <h3 className="font-serif text-xl text-gray-900">Kurse & Schulungen</h3>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700"><strong>Yoga & Pilates</strong> - Morgenyoga, Powerpilates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700"><strong>Workshops</strong> - Kreative Kurse, Persönlichkeitsentwicklung</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700">Gruppenkurse & Seminare</span>
                </div>
                <Button 
                  onClick={() => scrollToSection('rooms')}
                  variant="outline" 
                  className="mt-4 border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <span>Zu den Räumen</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sonstiges" className="bg-amber-50 rounded-lg border border-amber-100">
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
              <h3 className="font-serif text-xl text-gray-900">Sonstiges</h3>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700"><strong>Schnorchel-Theoriekurs</strong> - Trockenübungen für Anfänger</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700"><strong>Origami für Erwachsene</strong> - Komplizierte Kraniche falten</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700"><strong>Sockenstricken 2.0</strong> - Moderne Techniken</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-gray-700">Und alles andere, was Spaß macht!</span>
                </div>
                <Button 
                  onClick={() => scrollToSection('rooms')}
                  variant="outline" 
                  className="mt-4 border-gray-300 hover:bg-gray-50 transition-all group"
                >
                  <span>Zu den Räumen</span>
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex justify-center">
          <Link to="/wir">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50 transition-all group">
              <span>Unser Team kennenlernen</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AngebotSection;