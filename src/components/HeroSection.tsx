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
  return <section id="start" className="h-screen overflow-hidden relative">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('/lovable-uploads/af8970f8-a51e-4f03-b0a6-1e81d2f053dd.png')`,
      transform: `translateY(${offset * 0.5}px)`,
      // Parallax effect
      height: '120%',
      // Make image taller to allow for parallax movement
      width: '100%',
      top: '-10%' // Offset to allow for upward movement
    }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        
        
      </div>
    </section>;
};
export default HeroSection;