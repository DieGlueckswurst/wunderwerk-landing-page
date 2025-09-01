import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AngebotSection = () => {
  const navigate = useNavigate();

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

  const handleCategoryClick = (category: string) => {
    switch (category) {
      case 'hebammen':
        navigate('/about?filter=hebammen');
        break;
      case 'physiotherapie':
        navigate('/about?filter=physiotherapie');
        break;
      case 'osteopathie':
        navigate('/about?filter=osteopathie');
        break;
      case 'kurse':
        navigate('/kurse');
        break;
      case 'raumlichkeiten':
        scrollToSection('rooms');
        break;
    }
  };

  return (
    <section id="angebot" className="px-6 py-[40px]">
      <div className="vertical-line h-32 mb-16"></div>
      <h2 className="section-title">01 Angebot</h2>

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xl text-gray-700 mb-12 font-light">
          <span className="font-semibold text-gray-900">Gesundheit</span> und <span className="font-semibold text-gray-900">Wohlfühlen</span> – für <span className="font-semibold text-gray-900">Groß & Klein</span>, im Herzen <span className="font-semibold text-gray-900">Nürnbergs</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto justify-center">
          <Button
            onClick={() => handleCategoryClick('hebammen')}
            variant="outline"
            className="h-16 text-lg font-medium border-2 border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-all"
          >
            Hebammen-Betreuung
          </Button>

          <Button
            onClick={() => handleCategoryClick('physiotherapie')}
            variant="outline"
            className="h-16 text-lg font-medium border-2 border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-all"
          >
            Physiotherapie
          </Button>

          <Button
            onClick={() => handleCategoryClick('osteopathie')}
            variant="outline"
            className="h-16 text-lg font-medium border-2 border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-all"
          >
            Osteopathie
          </Button>

          <Button
            onClick={() => handleCategoryClick('kurse')}
            variant="outline"
            className="h-16 text-lg font-medium border-2 border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-all"
          >
            Kurse
          </Button>

          <Button
            onClick={() => handleCategoryClick('raumlichkeiten')}
            variant="outline"
            className="h-16 text-lg font-medium border-2 border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-all md:col-span-2 lg:col-span-1"
          >
            Räumlichkeiten
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AngebotSection;