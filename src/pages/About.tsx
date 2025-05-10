
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

// Interface for our timeline items
interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

const About = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample timeline data - these would be replaced with real content
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      date: "2018",
      title: "Die Idee",
      description: "Die Idee zum Wunderwerk entsteht aus einem Bedürfnis nach flexiblen Räumen für Gesundheitsprofis.",
      image: "/timeline/timeline-1.jpg"
    },
    {
      id: 2,
      date: "2019",
      title: "Planung",
      description: "Die ersten Pläne werden gezeichnet und das Konzept nimmt Gestalt an.",
      image: "/timeline/timeline-2.jpg"
    },
    {
      id: 3,
      date: "2020",
      title: "Renovierung",
      description: "Die Räumlichkeiten werden komplett renoviert und nach unseren Vorstellungen gestaltet.",
      image: "/timeline/timeline-3.jpg"
    },
    {
      id: 4,
      date: "2021",
      title: "Eröffnung",
      description: "Wunderwerk öffnet seine Türen und begrüßt die ersten Kunden und Therapeuten.",
      image: "/timeline/timeline-4.jpg"
    },
    {
      id: 5,
      date: "2023",
      title: "Erweiterung",
      description: "Das Angebot wird erweitert und neue Kooperationen werden geschlossen.",
      image: "/timeline/timeline-5.jpg"
    },
    {
      id: 6,
      date: "Heute",
      title: "Gemeinschaft",
      description: "Wunderwerk ist zu einem festen Bestandteil der lokalen Gesundheitsgemeinschaft geworden.",
      image: "/timeline/timeline-6.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Back button with scrolled effect */}
      <div className={`fixed top-20 left-6 z-40 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
        <Link to="/">
          <Button variant="outline" className="rounded-full" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      {/* Hero section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6">Über Wunderwerk</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Unsere Geschichte, Vision und wie wir zu dem wurden, was wir heute sind.
          </p>
        </div>
      </section>
      
      {/* Timeline section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
            
            {/* Timeline items */}
            {timelineItems.map((item, index) => (
              <div key={item.id} className="mb-16 md:mb-24 relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Date marker for desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-200 z-10 flex items-center justify-center">
                    <span className="font-bold text-sm">{item.date}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1617173296640-e8d5320017bb?q=80&w=1600&h=900&auto=format&fit=crop";
                        }}
                      />
                      <div className="p-6">
                        {/* Date marker for mobile */}
                        <div className="md:hidden mb-2 inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-bold">
                          {item.date}
                        </div>
                        <h3 className="text-xl font-serif mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
