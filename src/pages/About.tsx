import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
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
      description: "Was davor hier war? Unklar, vielleicht eine Lebkuchenbäckerei.",
      image: "/timeline/lebkuchenbaeckerei.png"
    },
    {
      id: 2,
      date: "1945",
      title: "Nürnberg in Ruinen",
      description: "Die dunklen Jahre. Nürnberg und das Haus erleben schwere Zeiten.",
      image: "/timeline/nuremberg_in_ruins.png"
    },
    {
      id: 3,
      date: "2000",
      title: "Herrenausstatter",
      description: "Schick Schick! Elegante Herrenmode für den stilbewussten Nürnberger.",
      image: "/timeline/herrenausstatter.png"
    },
    {
      id: 4,
      date: "2024",
      title: "Umbau",
      description: "Voller Elan und Motivation geht es in den Umbau. Aus Alt wird Neu.",
      image: "/timeline/umbau.png"
    },
    {
      id: 5,
      date: "2025",
      title: "Harte Arbeit muss belohnt werden",
      description: "Nach langen Arbeitstagen: Eis als verdiente Belohnung.",
      image: "/timeline/eis.png"
    },
    {
      id: 6,
      date: "2025",
      title: "Grand Opening",
      description: "Mission accomplished! Das Wunderwerk öffnet offiziell seine Türen.",
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

  // Helper function to generate srcSet for retina images
  const getSrcSet = (imagePath: string | undefined) => {
    if (!imagePath || imagePath === '/placeholder.svg') {
      return '/placeholder.svg';
    }

    const extension = imagePath.substring(imagePath.lastIndexOf('.'));
    const basePathWithoutExt = imagePath.substring(0, imagePath.lastIndexOf('.'));

    return `${imagePath} 1x, ${basePathWithoutExt}@2x${extension} 2x, ${basePathWithoutExt}@3x${extension} 3x`;
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHeader title="Über uns" />

      <div className="container mx-auto px-6 pt-0 pb-16">
        {/* Call to Action */}
        <div className="mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-6">
              Lust, ein Teil von uns zu werden?
            </p>
            <Button
              onClick={scrollToContact}
              className="bg-warm hover:bg-warm-hover text-white border-2 border-warm hover:border-warm-hover px-8 py-6 text-base font-medium rounded-lg transition-all"
            >
              Jetzt Kontakt aufnehmen
            </Button>
          </div>
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
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-warm">
                    <img
                      src={member.image || '/placeholder.svg'}
                      alt={member.name}
                      width={96}
                      height={96}
                      srcSet={getSrcSet(member.image)}
                      sizes="96px"
                      className="w-full h-full object-cover"
                      decoding="async"
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
                      <Button variant="outline" className="border-gray-300 hover:bg-warm-hover hover:border-warm-hover hover:text-white transition-all">
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
        <div className="p-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-serif text-center mb-8">Unsere Geschichte</h2>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            {/* Timeline items */}
            {timelineItems.map((item, index) => (
              <div key={item.id} className={`relative ${index === timelineItems.length - 1 ? 'mb-6' : 'mb-6 md:-mb-20'}`}>
                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Date marker for desktop */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-warm z-10 items-center justify-center">
                    <span className="font-bold text-[10px] leading-none text-center flex items-center justify-center w-full h-full">{item.date}</span>
                  </div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full aspect-[4/3] object-cover"
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.src = getPlaceholderImage(index);
                        }}
                      />
                      <div className="p-4">
                        {/* Date marker for mobile */}
                        <div className="md:hidden mb-2 inline-block px-3 py-1 bg-white border-2 border-warm rounded-full text-xs font-bold">
                          {item.date}
                        </div>
                        <h3 className="text-lg font-serif mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="py-6 text-center">
            <button
              type="button"
              onClick={() => {
                confetti({
                  particleCount: 80,
                  spread: 70,
                  origin: { y: 0.8 },
                  colors: ['#9F412F', '#c45c3e', '#e07850', '#f5a962']
                });
              }}
              className="inline-block bg-warm border-2 border-warm text-white rounded-lg px-4 py-2 text-lg font-serif cursor-pointer hover:bg-white hover:text-warm hover:border-warm transition-all"
            >
              Die Zukunft? Wird wunderbar.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
