import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

const RotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const words = [
    "Hebammen",
    "Physiotherapeuten",
    "Yoga-Kurse",
    "Fortbildungen",
    "Pop-up Events"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300); // Half of the total animation duration
    }, 3000); // Show each word for 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[1.5em] inline-block">
      <span
        className={`absolute left-0 transition-all duration-600 font-avenir text-white ${isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4"
          }`}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero/studio_clean.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`relative z-10 text-center transition-all duration-1000 mt-32 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <div className="mb-12">
          <img
            src="/logos/wunderwerk_circle_black_blurr.svg"
            alt="Wunderwerk Logo"
            className="w-32 h-32 md:w-48 md:h-48 mx-auto"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-2xl md:text-3xl lg:text-4xl font-avenir text-white">
          <span>Räumlichkeiten für</span>
          <span className="font-bold tracking-wider">
            <RotatingText />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;