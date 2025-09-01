import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ExternalLink } from "lucide-react";
import { teamMembers as teamData } from "@/data/team";
import { getPlaceholderImage } from "@/utils/placeholderImage";

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
}

// Team is now sourced from src/data/team

const About = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('about-page');
    return () => {
      document.body.classList.remove('about-page');
    };
  }, []);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      setActiveFilter(filter);
    } else {
      setActiveFilter('');
    }
  }, [searchParams]);

  const teamMembers = teamData;

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

  const filteredTeamMembers = activeFilter
    ? teamMembers.filter(member => member.category === activeFilter)
    : teamMembers;

  const scrollToContact = () => {
    if (window.location.pathname === '/') {
      const element = document.getElementById('contact');
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 100;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to home page with scroll state
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHeader title="Über uns" />

      <div className="container mx-auto px-6 pt-0 pb-16">
        {/* Call to Action */}
        <div className="text-center mb-12 bg-amber-50 rounded-lg p-8 max-w-6xl mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            Lust, ein Teil von uns zu werden?
          </p>
          <Button
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90"
          >
            Jetzt Kontakt aufnehmen
          </Button>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 gap-2 flex-wrap">
            <Button
              onClick={() => setActiveFilter('')}
              variant={activeFilter === '' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              Alle
            </Button>
            <Button
              onClick={() => setActiveFilter('hebammen')}
              variant={activeFilter === 'hebammen' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              Hebamme
            </Button>
            <Button
              onClick={() => setActiveFilter('physiotherapie')}
              variant={activeFilter === 'physiotherapie' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              Physiotherapie
            </Button>
            <Button
              onClick={() => setActiveFilter('osteopathie')}
              variant={activeFilter === 'osteopathie' ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
            >
              Osteopathie
            </Button>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filteredTeamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-amber-50">
                    <img
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-serif mb-2">{member.name}</h3>
                  <div className="flex flex-col items-center gap-2 mb-4">
                    {member.coFounder && (
                      <Tag>Mitgründerin</Tag>
                    )}
                    {member.role && (
                      <Tag>{member.role}</Tag>
                    )}
                    {member.comingSoon && (
                      <Tag variant="warning">Kommt bald!</Tag>
                    )}
                  </div>
                  {member.website && !member.comingSoon && (
                    <a href={member.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-gray-300 hover:bg-amber-50">
                        Website besuchen
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-amber-50 rounded-lg p-8 max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12">Unsere Geschichte</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            {/* Timeline items */}
            {timelineItems.map((item, index) => (
              <div key={item.id} className="mb-16 md:mb-24 relative">
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Date marker for desktop */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-gray-200 z-10 items-center justify-center">
                    <span className="font-bold text-xs leading-none text-center flex items-center justify-center w-full h-full">{item.date}</span>
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPlaceholderImage(index);
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

          <div className="py-12 text-center">
            <div className="inline-block bg-white border border-gray-200 rounded-lg px-6 py-3 text-2xl font-serif text-gray-700 shadow-sm">
              Die Zukunft? Wird wunderbar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;