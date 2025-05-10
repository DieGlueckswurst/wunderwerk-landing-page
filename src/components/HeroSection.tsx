
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
      }, 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-block min-w-[180px] text-center h-[1.2em]">
      <span
        className={`transition-all duration-300 font-avenir text-white ${isVisible
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
  const [offset, setOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const newOffset = window.pageYOffset;
      setOffset(newOffset);

      // Calculate opacity: 1 until 80px scroll, then fade to 0 at 130px scroll
      const newOpacity = Math.max(0, 1 - ((newOffset - 110) / 50));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translateY(${offset * 0.5}px)`,
          height: '120%',
          width: '100%',
          top: '-10%'
        }}
      >
        <img
          src="/hero/studio_clean.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="relative z-10 text-center"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center justify-center">
          <div className="mb-12">
            <img
              src="/logos/wunderwerk_circle_black_blurr.svg"
              alt="Wunderwerk Logo"
              className="w-64 h-64 lg:w-80 lg:h-80"
            />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center text-2xl md:text-3xl lg:text-4xl font-avenir text-white mt-8">
            <span className="mb-2 md:mb-0">Räumlichkeiten für</span>
            <span className="font-bold tracking-wider md:ml-3">
              <RotatingText />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
