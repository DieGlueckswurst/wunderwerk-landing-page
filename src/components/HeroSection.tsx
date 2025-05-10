import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const newOffset = window.pageYOffset;
      setOffset(newOffset);

      // Calculate opacity: 1 at 0px scroll, 0 at 50px scroll
      const newOpacity = Math.max(0, 1 - (newOffset / 50));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="start" className="h-screen overflow-hidden relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/hero/studio_clean.png')`,
          transform: `translateY(${offset * 0.5}px)`,
          height: '120%',
          width: '100%',
          top: '-10%'
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <img
          src="/logos/wunderwerk_circle_black_blurr.svg"
          alt="Wunderwerk Circle"
          className="w-80 h-80 -mt-40 transition-opacity duration-300"
          style={{ opacity }}
        />
      </div>
    </section>
  );
};

export default HeroSection;