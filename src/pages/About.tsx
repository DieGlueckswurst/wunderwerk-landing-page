
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";

// Interface for our timeline items
interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

const About = () => {
  // Add a class to the body for specific styling
  useEffect(() => {
    document.body.classList.add('about-page');
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  // Sample timeline data - these would be replaced with real content
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      date: "1900",
      title: "Nürnberger Lebkuchen",
      description: "Ich weiß nicht, was davor hier war. Vielleicht eine Lebkuchenbäckerei?",
      image: "/timeline/lebkuchenbaeckerei.png"
    },
    {
      id: 2,
      date: "1945",
      title: "Nürnberg in Ruinen",
      description: "Krieg, nicht gut.",
      image: "/timeline/nuremberg_in_ruins.png"
    },
    {
      id: 3,
      date: "2000",
      title: "Herrenausstatter",
      description: "Schick Schick",
      image: "/timeline/herrenausstatter.png"
    },
    {
      id: 4,
      date: "2024",
      title: "Umbau",
      description: "(noch) voller guter Laune und Motivation",
      image: "/timeline/umbau.png"
    },
    {
      id: 5,
      date: "2025",
      title: "Harte Arbeit muss belohnt werden",
      description: "Das Eis als Rettung langer Arbeitstage.",
      image: "/timeline/eis.png"
    },
    {
      id: 6,
      date: "2025",
      title: "Grand Opening",
      description: "Es ist vollbracht! Das Wunderwerk ist offiziell eröffnet.",
      image: "/timeline/group.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PageHeader title="Über uns" />

      {/* Timeline section - extending to bottom of page with flex-grow */}
      <section className="pt-12 px-6 timeline-section relative flex-grow">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Es war einmal...</p>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            {/* Timeline items */}
            {timelineItems.map((item, index) => (
              <div key={item.id} className="mb-16 md:mb-24 relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Date marker for desktop */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-200 z-10 flex items-center justify-center">
                    <span className="font-bold text-xs leading-none text-center flex items-center justify-center w-full h-full">{item.date}</span>
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-white rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-64 object-cover" 
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1617173296640-e8d5320017bb?q=80&w=1600&h=900&auto=format&fit=crop";
                        }} 
                      />
                      <div className="p-6">
                        {/* Date marker for mobile */}
                        <div className="md:hidden mb-2 inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">
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
      
      <div className="py-12 text-center text-2xl font-serif text-gray-700 footer-message">
        Die Zukunft? Wird wunderbar.
      </div>
    </div>
  );
};

export default About;
