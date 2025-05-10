import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

const RotatingText = () => {
  const texts = [
    "Hebammen",
    "Physiotherapeuten",
    "Yoga-Kurse",
    "Fortbildungen",
    "Pop-up Events"
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200 - Math.random() * 100);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta]);

  const tick = () => {
    const fullText = texts[currentIndex];

    if (isDeleting) {
      setText(prev => fullText.substring(0, prev.length - 1));
      setDelta(50);
    } else {
      setText(prev => fullText.substring(0, prev.length + 1));
      setDelta(200 - Math.random() * 100);
    }

    if (!isDeleting && text === fullText) {
      setDelta(2000); // Pause at end
      setIsDeleting(true);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setCurrentIndex(prev => (prev + 1) % texts.length);
      setDelta(500); // Pause before starting new word
    }
  };

  return (
    <div className="text-center md:text-left flex flex-col md:flex-row items-center gap-4 md:gap-8">
      <span className="text-white text-2xl md:text-3xl font-sans">Räumlichkeiten für</span>
      <div className="h-12 md:h-16 flex items-center justify-center">
        <span className="text-white text-2xl md:text-3xl font-sans font-bold tracking-wide">{text}</span>
        <span className="text-white text-2xl md:text-3xl font-sans font-bold animate-pulse">|</span>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollPosition / 50);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-1000"
        style={{
          backgroundImage: 'url("/hero/studio_clean.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${window.scrollY * 0.5}px)`
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <img
          src="/logos/wunderwerk_circle_black_blurr.svg"
          alt="Wunderwerk Logo"
          className="w-80 h-80 -mt-40 mb-8"
          style={{ opacity }}
        />
        <RotatingText />
      </div>
    </section>
  );
};

export default HeroSection;