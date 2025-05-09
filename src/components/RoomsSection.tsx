
type RoomProps = {
  imageSrc: string;
  title: string;
  description: string;
};

const Room = ({ imageSrc, title, description }: RoomProps) => {
  return (
    <div className="group relative overflow-hidden cursor-pointer">
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-white text-center p-4">
          <h3 className="text-2xl font-serif mb-2">{title}</h3>
          <p className="font-sans">{description}</p>
        </div>
      </div>
    </div>
  );
};

const RoomsSection = () => {
  const rooms = [
    {
      imageSrc: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80",
      title: "Großer Kursraum",
      description: "Perfekt für Gruppenkurse und Workshops"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?auto=format&fit=crop&q=80",
      title: "Hebammenraum",
      description: "Speziell ausgestattet für Hebammenarbeit"
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&q=80",
      title: "Physiotherapieraum",
      description: "Optimale Ausstattung für Physiotherapie"
    }
  ];

  return (
    <section id="rooms" className="py-20 px-6">
      <div className="vertical-line mb-12"></div>
      <h2 className="section-title">02 Räume</h2>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <Room key={index} {...room} />
        ))}
      </div>
    </section>
  );
};

export default RoomsSection;
