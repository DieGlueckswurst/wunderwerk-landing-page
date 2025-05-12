import { useEffect, useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  // Use a simpler, more consistent approach to parallax scrolling
  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      // Use a consistent damping factor for all devices
      const damping = 0.12; // Lower value = smoother but slower transitions
      
      // Gradually approach the target scroll position
      const currentScroll = window.pageYOffset;
      scrollY.current = scrollY.current + (currentScroll - scrollY.current) * damping;
      
      // Update the parallax offset
      setOffset(scrollY.current);
      
      // Calculate opacity based on scroll position
      // Fade out between 80px and 140px of scrolling
      const newOpacity = Math.max(0, 1 - ((scrollY.current - 80) / 60));
      setOpacity(newOpacity);
    }
    
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Initial scroll position
    scrollY.current = window.pageYOffset;
    
    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
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
          transform: `translate3d(0, ${offset * 0.4}px, 0)`, // Reduced parallax effect for more subtlety
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
