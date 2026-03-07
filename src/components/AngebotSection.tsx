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
        <p className="text-lg text-gray-700 mb-12 font-normal antialiased">
          <span className="font-medium text-gray-900">Gesundheit</span> und <span className="font-medium text-gray-900">Wohlfühlen</span> – für <span className="font-medium text-gray-900">Groß & Klein</span>, im Herzen <span className="font-medium text-gray-900">Nürnbergs</span>.
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          <Button
            onClick={() => handleCategoryClick('hebammen')}
            variant="outline"
            className="h-16 min-w-[200px] text-lg font-medium border-2 border-gray-200 bg-white text-black hover:border-warm hover:bg-warm/10 hover:text-black transition-all active:bg-warm/15"
          >
            Hebammen-Betreuung
          </Button>

          <Button
            onClick={() => handleCategoryClick('physiotherapie')}
            variant="outline"
            className="h-16 min-w-[200px] text-lg font-medium border-2 border-gray-200 bg-white text-black hover:border-warm hover:bg-warm/10 hover:text-black transition-all active:bg-warm/15"
          >
            Physiotherapie
          </Button>

          <Button
            onClick={() => handleCategoryClick('osteopathie')}
            variant="outline"
            className="h-16 min-w-[200px] text-lg font-medium border-2 border-gray-200 bg-white text-black hover:border-warm hover:bg-warm/10 hover:text-black transition-all active:bg-warm/15"
          >
            Osteopathie
          </Button>

          <Button
            onClick={() => handleCategoryClick('kurse')}
            variant="outline"
            className="h-16 min-w-[200px] text-lg font-medium border-2 border-gray-200 bg-white text-black hover:border-warm hover:bg-warm/10 hover:text-black transition-all active:bg-warm/15"
          >
            Kurse
          </Button>

          <Button
            onClick={() => handleCategoryClick('raumlichkeiten')}
            variant="outline"
            className="h-16 min-w-[200px] text-lg font-medium border-2 border-gray-200 bg-white text-black hover:border-warm hover:bg-warm/10 hover:text-black transition-all active:bg-warm/15"
          >
            Räumlichkeiten
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AngebotSection;