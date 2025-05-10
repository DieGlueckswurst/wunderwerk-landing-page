import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const getRoomData = (roomId: string) => {
  const rooms = {
    studio: {
      title: "Studio",
      description: "Unser Studio ist der perfekte Ort für Gruppenkurse aller Art. Mit 60 Quadratmetern bietet es ausreichend Platz für bis zu 20 Personen. Die flexible Ausstattung ermöglicht verschiedenste Kursformate - von Yoga und Pilates bis hin zu Workshops und Seminaren.",
      features: ["60 m² Fläche", "Platz für bis zu 20 Personen", "Yoga-Matten & Zubehör", "Moderne Soundanlage", "Tageslicht & angenehme Beleuchtung"],
      imageSrc: "/rooms/studio/studio_unfinished.png"
    },
    kugelwohl: {
      title: "Kugelwohl",
      description: "Unser Raum Kugelwohl wurde speziell für Hebammen und ihre Arbeit konzipiert. Die intime Atmosphäre schafft einen sicheren Raum für Schwangere und junge Mütter. Die professionelle Ausstattung unterstützt deine Arbeit optimal.",
      features: ["18 m² Fläche", "Spezielle Ausstattung für Hebammenarbeit", "Angenehme, warme Atmosphäre", "Wickeltisch & Stillecke", "Babywaage & weitere Fachutensilien"],
      imageSrc: "/rooms/kugel_wohl/chaos.png"
    },
    werkstadt: {
      title: "Werkstadt",
      description: "Die Werkstadt ist ideal für Physiotherapeuten und andere Gesundheitspraktiker. Mit professioneller Ausstattung und ergonomischen Behandlungsliegen bietet dieser Raum alles, was du für deine therapeutische Arbeit benötigst.",
      features: ["15 m² Fläche", "2 professionelle Behandlungsliegen", "Umfangreiches Therapie-Equipment", "Ruhebereich für Patienten"],
      imageSrc: "/rooms/werkstadt/werkstadt_unfinished.png"
    },
    café: {
      title: "Café",
      description: "Unser Café-Raum bietet eine einzigartige Atmosphäre für kreative Events und kulturelle Veranstaltungen. Mit seiner gemütlichen Ausstattung ist er ideal für kleine Ausstellungen, Pop-up Events und intime Konzerte. Die Kombination aus modernem Design und behaglicher Atmosphäre schafft den perfekten Rahmen für unvergessliche Momente.",
      features: ["28 m² Fläche", "Große, lichtdurchflutete Fenster", "Gemütliche Wohnzimmer-Atmosphäre", "Barbereich"],
      imageSrc: "/rooms/cafe/cafe_ambiente.png"
    }
  };

  return rooms[roomId as keyof typeof rooms] || null;
};

const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const roomData = getRoomData(roomId || "");

  if (!roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4">Raum nicht gefunden</h2>
          <Button onClick={() => navigate('/')} className="bg-black text-white">
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-6 py-12">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-8 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2" />
          Zurück zur Übersicht
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="h-[500px] overflow-hidden rounded-lg">
            <img
              src={roomData.imageSrc}
              alt={roomData.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-serif mb-4">{roomData.title}</h1>
            <p className="text-lg mb-8">{roomData.description}</p>

            <h2 className="text-2xl font-serif mb-4">Ausstattung</h2>
            <ul className="space-y-2 mb-8">
              {roomData.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-black rounded-full mr-3"></div>
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              onClick={() => navigate('/#contact')}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Jetzt anfragen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
