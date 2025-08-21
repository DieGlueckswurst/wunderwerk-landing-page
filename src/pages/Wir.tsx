import { useEffect } from 'react';
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";
import { ExternalLink } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  proficiency: string;
  description: string;
  website: string;
  image: string;
}

const Wir = () => {
  useEffect(() => {
    document.body.classList.add('wir-page');
    return () => {
      document.body.classList.remove('wir-page');
    };
  }, []);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Anna Müller",
      proficiency: "Hebamme & Geburtsvorbereitung",
      description: "Erfahrene Hebamme mit über 10 Jahren Praxis. Spezialisiert auf Schwangerschaftsbegleitung und Geburtsvorbereitung.",
      website: "https://anna-mueller-hebamme.de",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&h=400&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      name: "Michael Schmidt",
      proficiency: "Physiotherapeut",
      description: "Spezialist für manuelle Therapie und Sportphysiotherapie. Langjährige Erfahrung in der Rehabilitation.",
      website: "https://physiotherapie-schmidt.de",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&h=400&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      name: "Sarah Weber",
      proficiency: "Yoga & Pilates Lehrerin",
      description: "Zertifizierte Yoga- und Pilates-Lehrerin. Bietet Kurse für alle Levels und therapeutisches Yoga an.",
      website: "https://sarah-yoga-pilates.de",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      name: "Thomas Klein",
      proficiency: "Business Coach & Trainer",
      description: "Erfahrener Business Coach und Seminarleiter. Spezialisiert auf Führungskräfte-Entwicklung und Team-Workshops.",
      website: "https://thomas-klein-coaching.de",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHeader title="Wir" />

      <div className="container mx-auto px-6 pt-0 pb-16">
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lernen Sie die Profis kennen, die das Wunderwerk mit Leben füllen. 
            Jeder bringt seine einzigartige Expertise und Leidenschaft mit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.proficiency}</p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{member.description}</p>
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm"
                >
                  Website besuchen
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wir;