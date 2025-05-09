
import { useState } from "react";
import { Button } from "@/components/ui/button";

type RoomProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const Room = ({
  imageSrc,
  title,
  description
}: RoomProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative overflow-hidden cursor-pointer h-[400px]"
      onClick={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
      />
      
      {/* Tap indicator - only visible when not hovered */}
      {!isHovered && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      )}
      
      {/* Content overlay - only visible when hovered/tapped */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/50 transition-opacity duration-300 flex flex-col items-center justify-center">
          <div className="text-white text-center p-4">
            <h3 className="text-2xl font-serif mb-2">{title}</h3>
            <p className="font-sans mb-6">{description}</p>
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              Mehr erfahren
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const RoomsSection = () => {
  const rooms = [
    {
      imageSrc: "/lovable-uploads/bab182be-2f74-43af-a2ec-6a8f266035a5.png",
      title: "Studio",
      description: "Perfekt für Gruppenkurse und Workshops"
    }, 
    {
      imageSrc: "/lovable-uploads/b946643a-5502-49bf-a6ee-2e8f84a5c90e.png",
      title: "Kugelwohl",
      description: "Speziell ausgestattet für Hebammenarbeit"
    }, 
    {
      imageSrc: "/lovable-uploads/200e60c3-25ee-435c-bfa5-5ced63f102ed.png",
      title: "Werkstadt",
      description: "Optimale Ausstattung für Physiotherapie"
    }
  ];
  
  return (
    <section id="rooms" className="px-6 py-20">
      <div className="vertical-line h-48 mb-16"></div>
      <h2 className="section-title">02 Räume</h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, index) => <Room key={index} {...room} />)}
      </div>
    </section>
  );
};

export default RoomsSection;
