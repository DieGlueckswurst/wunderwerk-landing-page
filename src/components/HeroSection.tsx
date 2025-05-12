
import { useState, useEffect, useRef, CSSProperties } from 'react';
import { ChevronDown } from "lucide-react";
import { useIsMobile } from '../hooks/use-mobile';

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
        className={`transition-all duration-300 font-avenir text-white ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {words[currentIndex]}
      </span>
    </div>
  );
};

const HeroSection = () => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const isMobile = useIsMobile();
  const ticking = useRef(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Skip if we're already processing a frame
      if (ticking.current) return;
      
      // Request animation frame to throttle updates
      ticking.current = true;
      
      requestAnimationFrame(() => {
        // Control both the fade effect and translation based on scroll position
        const scrollY = window.scrollY;
        const newOpacity = Math.max(0, 1 - (scrollY / 300));
        
        // Adjust the translation to move elements further up
        const newTranslate = Math.min(200, scrollY / 1.5);
        
        setOpacity(newOpacity);
        setTranslateY(newTranslate);
        
        // Reset the flag so we can process the next event
        ticking.current = false;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNextSection = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });
  };

  // Apply hardware acceleration to improve performance with correct TypeScript types
  const transformStyle: CSSProperties = {
    opacity,
    transform: `translateY(-${translateY}px)`,
    transition: 'transform 0.05s ease-out',
    willChange: 'transform, opacity',
    WebkitBackfaceVisibility: 'hidden',
    WebkitPerspective: 1000,
    backfaceVisibility: 'hidden',
    perspective: 1000
  };

  return (
    <div className="h-screen w-full relative">
      {/* Fixed position wrapper for the hero content */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/hero/studio_clean.webp')`,
            willChange: 'transform',
          }}
        />
        
        {/* Content layer with opacity and translateY transitions */}
        <div 
          className="relative z-10 h-full flex flex-col items-center justify-center"
          style={transformStyle}
        >
          {/* Logo container with fixed width and centered */}
          <div className={`flex justify-center ${isMobile ? 'mb-6 mt-[-60px]' : 'mb-12'}`}>
            <div className={`${isMobile ? 'w-56 h-56' : 'w-64 h-64 lg:w-80 lg:h-80'} flex items-center justify-center`}>
              <img
                src="/logos/wunderwerk_circle_black_blurr.svg"
                alt="Wunderwerk Logo"
                className="w-full h-full"
                loading="eager"
              />
            </div>
          </div>
          <div className={`flex flex-col md:flex-row items-center justify-center text-2xl md:text-3xl lg:text-4xl font-avenir text-white ${isMobile ? 'mt-4' : 'mt-8'}`}>
            <span className="mb-2 md:mb-0">Räumlichkeiten für</span>
            <span className="font-bold tracking-wider md:ml-3">
              <RotatingText />
            </span>
          </div>
        </div>

        {/* Scroll down button - separate from main content for custom animation */}
        <div
          className={`absolute z-10 flex justify-center animate-bounce cursor-pointer ${
            isMobile ? 'bottom-24' : 'bottom-10'
          } left-0 right-0`}
          onClick={scrollToNextSection}
          style={{ 
            opacity,
            transform: `translateY(-${translateY * 0.5}px)`,
            transition: 'transform 0.05s ease-out',
            willChange: 'transform, opacity'
          }}
        >
          <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm hover:bg-opacity-30 transition-all">
            <ChevronDown className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
      
      {/* Spacer element to push content below the hero section */}
      <div className="h-screen w-full" />
    </div>
  );
};

export default HeroSection;
