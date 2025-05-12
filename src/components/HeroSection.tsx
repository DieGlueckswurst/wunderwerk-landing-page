
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true); // Default to visible
  const isMobile = useIsMobile();
  const frameId = useRef<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Simplify scroll indicator logic - show it by default
  useEffect(() => {
    // Only hide on very small screens where there might not be enough space
    const checkSpaceForButton = () => {
      // Use a very small threshold to show button in most cases
      const smallScreenThreshold = 400; // Extremely small screens
      
      if (window.innerHeight < smallScreenThreshold) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };
    
    checkSpaceForButton();
    window.addEventListener('resize', checkSpaceForButton);
    
    return () => {
      window.removeEventListener('resize', checkSpaceForButton);
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      // Schedule new animation frame
      frameId.current = requestAnimationFrame(() => {
        // Calculate scroll progress as a value between 0 and 1
        const scrollY = window.scrollY;
        // Use a smaller maxScroll value for faster fading
        const maxScroll = window.innerHeight * 0.5; 
        const newProgress = Math.min(1, scrollY / maxScroll);
        setScrollProgress(newProgress);
        frameId.current = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
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

  // Calculate opacity and transform values based on scroll progress
  const opacity = 1 - scrollProgress;
  const translateY = scrollProgress * 200; // Max translation of 200px

  // Optimized transform style for better mobile performance
  const contentStyle: CSSProperties = {
    opacity,
    transform: `translate3d(0, -${translateY}px, 0)`,
    willChange: 'transform, opacity'
  };
  
  // Apply less aggressive transform to the scroll button
  const scrollButtonStyle: CSSProperties = {
    opacity,
    transform: `translate3d(0, -${translateY * 0.5}px, 0)`
  };

  return (
    <div ref={heroRef} className="h-screen w-full relative">
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
        
        {/* Content layer with optimized transitions */}
        <div 
          ref={contentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center"
          style={contentStyle}
        >
          {/* Logo container with fixed width and centered */}
          <div className={`flex justify-center ${isMobile ? 'mb-6 mt-[5px]' : 'mb-12'}`}>
            <div className={`${isMobile ? 'w-56 h-56' : 'w-64 h-64 lg:w-80 lg:h-80'} flex items-center justify-center`}>
              <img
                src="/logos/wunderwerk_circle_black_blurr.svg"
                alt="Wunderwerk Logo"
                className="w-full h-full"
                loading="eager"
              />
            </div>
          </div>
          <div className={`flex flex-col md:flex-row items-center justify-center text-2xl md:text-3xl lg:text-4xl font-avenir text-white ${isMobile ? 'mt-8' : 'mt-8'}`}>
            <span className="mb-2 md:mb-0">Räumlichkeiten für</span>
            <span className="font-bold tracking-wider md:ml-3">
              <RotatingText />
            </span>
          </div>
        </div>

        {/* Scroll down button - simplified to show by default */}
        {showScrollIndicator && (
          <div
            className={`absolute z-10 flex justify-center animate-bounce cursor-pointer ${
              isMobile ? 'bottom-16' : 'bottom-8'
            } left-0 right-0`}
            onClick={scrollToNextSection}
            style={scrollButtonStyle}
          >
            <div className="bg-white bg-opacity-20 rounded-full p-2 backdrop-blur-sm hover:bg-opacity-30 transition-all">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Spacer element to push content below the hero section */}
      <div className="h-screen w-full" />
    </div>
  );
};

export default HeroSection;
