import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import { ExternalLink } from "lucide-react";
import { teamMembers as teamData, type TeamCategory } from "@/data/team";
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
      date: "2000",
      title: "Herrenausstatter",
      description: "Schick Schick! Elegante Herrenmode für den stilbewussten Nürnberger.",
      image: "/timeline/herrenausstatter.png"
    },
    {
      id: 3,
      date: "2024",
      title: "Umbau",
      description: "Voller Elan und Motivation geht es in den Umbau. Aus Alt wird Neu.",
      image: "/timeline/umbau.png"
    },
    {
      id: 4,
      date: "2025",
      title: "Harte Arbeit muss belohnt werden",
      description: "Nach langen Arbeitstagen: Eis als verdiente Belohnung.",
      image: "/timeline/eis.png"
    },
    {
      id: 5,
      date: "2025",
      title: "Grand Opening",
      description: "Mission accomplished! Das Wunderwerk öffnet offiziell seine Türen.",
      image: "/timeline/group.png"
    }
  ];

  const filteredTeamMembers = activeFilter
    ? teamMembers.filter(member => member.categories.includes(activeFilter as TeamCategory))
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
    <div className="min-h-screen bg-background">
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
              className="px-8 py-6 text-base font-medium rounded-lg transition-all"
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
              className={`rounded-full ${activeFilter === '' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Alle
            </Button>
            <Button
              onClick={() => setActiveFilter('hebammen')}
              variant={activeFilter === 'hebammen' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'hebammen' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Hebamme
            </Button>
            <Button
              onClick={() => setActiveFilter('physiotherapie')}
              variant={activeFilter === 'physiotherapie' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'physiotherapie' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Physiotherapie
            </Button>
            <Button
              onClick={() => setActiveFilter('osteopathie')}
              variant={activeFilter === 'osteopathie' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'osteopathie' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Osteopathie
            </Button>
            <Button
              onClick={() => setActiveFilter('yoga')}
              variant={activeFilter === 'yoga' ? 'default' : 'outline'}
              size="sm"
              className={`rounded-full ${activeFilter === 'yoga' ? 'bg-white text-black hover:bg-gray-100 hover:text-black border border-gray-200' : ''}`}
            >
              Yoga
            </Button>
          </div>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filteredTeamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 p-6 text-center flex flex-col">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[hsl(var(--background))]">
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
                <h3 className="text-lg font-serif mb-2">{member.name}</h3>
                <div className="flex flex-col items-center gap-2 flex-1 justify-center">
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
                {member.website && !member.comingSoon ? (
                  <div className="mt-4">
                    <a href={member.website} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="border-2 border-gray-200 bg-white text-black hover:border-warm hover:bg-warm/10 hover:text-black transition-all">
                        Website besuchen
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </a>
                  </div>
                ) : (
                  <div className="mt-4 h-9" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="p-6 max-w-6xl mx-auto mt-20">
          <h2 className="text-4xl font-serif text-center mb-12">Unsere Geschichte</h2>

          <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2 -mx-2">
            <div className="flex gap-10 min-w-max px-4">
              {timelineItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center w-[260px] flex-shrink-0 snap-center"
                >
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden w-full hover:shadow-md transition-shadow mb-5">
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
                      <h3 className="text-lg font-serif font-semibold mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-500 mb-2">{item.date}</span>
                  <div className="flex items-center w-full">
                    <div className={`flex-1 h-0.5 bg-gray-200 ${index === 0 ? 'invisible' : ''}`} />
                    <div className="w-4 h-4 rounded-full bg-warm flex-shrink-0" />
                    <div className="flex-1 h-0.5 bg-gray-200" />
                  </div>
                </div>
              ))}
              {/* Zukunft als letzter Punkt der Zeitreihe */}
              <div className="flex flex-col items-center w-[260px] flex-shrink-0 snap-center">
                <div className="flex-1 flex items-center justify-center mb-5">
                  <button
                    type="button"
                    onClick={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const x = (rect.left + rect.width / 2) / window.innerWidth;
                      const y = (rect.top + rect.height / 2) / window.innerHeight;
                      confetti({
                        particleCount: 80,
                        spread: 70,
                        origin: { x, y },
                        colors: ['#d4a090', '#e0b5a8', '#e8c9bf', '#f0ddd6']
                      });
                    }}
                    className="bg-warm border-2 border-warm text-white rounded-lg px-5 py-4 text-base font-serif cursor-pointer hover:bg-white hover:text-warm hover:border-warm transition-all text-center"
                  >
                    Die Zukunft? Wird wunderbar.
                  </button>
                </div>
                <span className="text-sm font-medium text-transparent mb-2" aria-hidden="true">&nbsp;</span>
                <div className="flex items-center w-full">
                  <div className="flex-1 h-0.5 bg-gray-200" />
                  <div className="w-4 h-4 rounded-full bg-warm flex-shrink-0" />
                  <div className="flex-1 h-0.5 bg-gray-200 invisible" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
