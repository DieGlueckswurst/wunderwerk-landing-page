import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const getRoomData = (roomId: string) => {
  const rooms = {
    studio: {
      title: "Studio",
      description: "Unser Studio ist der perfekte Ort für Gruppenkurse aller Art. Mit 60 Quadratmetern bietet es ausreichend Platz für bis zu 20 Personen. Die flexible Ausstattung ermöglicht verschiedenste Kursformate - von Yoga und Pilates bis hin zu Workshops und Seminaren.",
      features: ["60 m² Fläche", "Platz für bis zu 20 Personen", "Yoga-Matten & Zubehör", "Moderne Soundanlage", "Tageslicht & angenehme Beleuchtung"],
      images: [
        "/rooms/studio/studio_unfinished.png",
        "/rooms/studio/es_werde_licht.png"
      ]
    },
    kugelwohl: {
      title: "Kugelwohl",
      description: "Unser Raum Kugelwohl wurde speziell für Hebammen und ihre Arbeit konzipiert. Die intime Atmosphäre schafft einen sicheren Raum für Schwangere und junge Mütter. Die professionelle Ausstattung unterstützt deine Arbeit optimal.",
      features: ["18 m² Fläche", "Spezielle Ausstattung für Hebammenarbeit", "Angenehme, warme Atmosphäre", "Wickeltisch & Stillecke", "Babywaage & weitere Fachutensilien"],
      images: ["/rooms/kugel_wohl/chaos.png"]
    },
    werkstadt: {
      title: "Werkstadt",
      description: "Die Werkstadt ist ideal für Physiotherapeuten und andere Gesundheitspraktiker. Mit professioneller Ausstattung und ergonomischen Behandlungsliegen bietet dieser Raum alles, was du für deine therapeutische Arbeit benötigst.",
      features: ["15 m² Fläche", "2 professionelle Behandlungsliegen", "Umfangreiches Therapie-Equipment", "Ruhebereich für Patienten"],
      images: ["/rooms/werkstadt/werkstadt_unfinished.png"]
    },
    café: {
      title: "Café",
      description: "Unser Café-Raum bietet eine einzigartige Atmosphäre für kreative Events und kulturelle Veranstaltungen. Mit seiner gemütlichen Ausstattung ist er ideal für kleine Ausstellungen, Pop-up Events und intime Konzerte. Die Kombination aus modernem Design und behaglicher Atmosphäre schafft den perfekten Rahmen für unvergessliche Momente.",
      features: ["28 m² Fläche", "Große, lichtdurchflutete Fenster", "Gemütliche Wohnzimmer-Atmosphäre", "Barbereich"],
      images: ["/rooms/cafe/cafe_ambiente.png"]
    }
  };

  return rooms[roomId as keyof typeof rooms] || null;
};

const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % roomData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + roomData.images.length) % roomData.images.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header section styled like About page */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl flex items-center gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="rounded-full"
            size="icon"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-0 flex-1">{roomData.title}</h1>
        </div>
      </section>
      <div className="container mx-auto px-6 pt-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative h-[500px] overflow-hidden rounded-lg">
            <img
              src={roomData.images[currentImageIndex]}
              alt={`${roomData.title} - Bild ${currentImageIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIsFullscreenOpen(true)}
            />
            {roomData.images.length > 1 && (
              <>
                <Button
                  onClick={prevImage}
                  variant="ghost"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
                >
                  ←
                </Button>
                <Button
                  onClick={nextImage}
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90"
                >
                  →
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {roomData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
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
              onClick={() => {
                const mailtoLink = `mailto:info@wunderwerk-muenchen.de?subject=Raumanfrage: ${roomData.title}`;
                window.location.href = mailtoLink;
              }}
              className="bg-black hover:bg-gray-800 text-white"
            >
              Jetzt anfragen
            </Button>
          </div>
        </div>
      </div>

      {/* Fullscreen Image View */}
      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95 border-none [&>button]:hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setIsFullscreenOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={roomData.images[currentImageIndex]}
              alt={`${roomData.title} - Bild ${currentImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            {roomData.images.length > 1 && (
              <>
                <Button
                  onClick={prevImage}
                  variant="ghost"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                >
                  ←
                </Button>
                <Button
                  onClick={nextImage}
                  variant="ghost"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                >
                  →
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {roomData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoomDetail;
