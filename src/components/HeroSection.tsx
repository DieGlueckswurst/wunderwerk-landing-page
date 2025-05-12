
import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const scrollY = useRef(0);

  // Smoother parallax animation with requestAnimationFrame
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // Gradually update the offset for smoother transitions
      scrollY.current = window.pageYOffset;
      setOffset(scrollY.current);
      
      // Calculate opacity: 1 until 80px scroll, then fade to 0 at 130px scroll
      const newOpacity = Math.max(0, 1 - ((scrollY.current - 110) / 50));
      setOpacity(newOpacity);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Use passive event listener for better performance
    const handleScroll = () => {
      scrollY.current = window.pageYOffset;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  const scrollToNextSection = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${offset * 0.5}px, 0)`,
          height: '120%',
          width: '100%',
          top: '-10%',
          backfaceVisibility: 'hidden',
        }}
      >
        <img
          src="/hero/studio_clean.webp"
          alt="Hero Background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <div
        className="relative z-10 text-center w-full"
        style={{ opacity }}
      >
        {/* Logo container with fixed width and centered */}
        <div className="flex justify-center mb-12">
          <div className="w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
            <img
              src="/logos/wunderwerk_circle_black_blurr.svg"
              alt="Wunderwerk Logo"
              className="w-full h-full"
              loading="eager"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center text-2xl md:text-3xl lg:text-4xl font-avenir text-white mt-8">
          <span className="mb-2 md:mb-0">Räumlichkeiten für</span>
          <span className="font-bold tracking-wider md:ml-3">
            <RotatingText />
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-0 right-0 z-10 flex justify-center animate-bounce cursor-pointer"
        onClick={scrollToNextSection}
        style={{ opacity }}
      >
        <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm hover:bg-opacity-30 transition-all">
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
