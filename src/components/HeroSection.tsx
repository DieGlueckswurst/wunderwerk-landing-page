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

const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 768;

const HeroSection = () => {
  const [opacity, setOpacity] = useState(1);
  const [mobileOffset, setMobileOffset] = useState(0);
  const [mobile, setMobile] = useState(false);
  const targetOffset = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const checkMobile = () => setMobile(isMobile());
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Fade out content as you scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - ((scrollY - 110) / 50));
      setOpacity(newOpacity);
      if (mobile) {
        targetOffset.current = scrollY * 0.4;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobile]);

  // Smooth parallax for mobile
  useEffect(() => {
    if (!mobile) return;
    const animate = () => {
      setMobileOffset(prev => {
        const next = prev + (targetOffset.current - prev) * 0.15;
        return Math.abs(next - targetOffset.current) < 0.1 ? targetOffset.current : next;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => rafRef.current && cancelAnimationFrame(rafRef.current);
  }, [mobile]);

  const scrollToNextSection = () => {
    const heroHeight = window.innerHeight;
    window.scrollTo({
      top: heroHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden hero-bg`}
      style={!mobile ? undefined : { background: 'none' }}
    >
      {/* Mobile parallax image */}
      {mobile && (
        <img
          src="/hero/studio_clean.webp"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
          style={{ transform: `translateY(${mobileOffset}px)`, transition: 'transform 0.1s linear' }}
          draggable={false}
        />
      )}
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
