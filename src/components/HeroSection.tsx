
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="start" className="h-screen overflow-hidden relative">
      <div 
        className="parallax-bg"
        style={{
          backgroundImage: `url('/lovable-uploads/af8970f8-a51e-4f03-b0a6-1e81d2f053dd.png')`,
          transform: `translateY(${offset * 0.5}px)`, // Parallax effect
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-5xl md:text-7xl font-serif tracking-[0.2em] mb-4">WUNDERWERK</h1>
        <p className="text-lg md:text-xl font-sans tracking-widest">NÜRNBERG</p>
      </div>
    </section>
  );
};

export default HeroSection;
