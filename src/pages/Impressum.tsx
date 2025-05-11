
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back button */}
      <div className="fixed top-20 left-6 z-40">
        <Link to="/">
          <Button variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Header section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-0">Impressum</h1>
        </div>
      </section>

      {/* Content section */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose max-w-none">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
              Christian Konnerth<br />
              Wunderwerk<br />
              Pfarrgasse 9<br />
              90402 Nürnberg
            </p>
            
            <h2>Kontakt</h2>
            <p>
              E-Mail: info@wunderwerk-nuernberg.de
            </p>
            
            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p>
              Christian Konnerth<br />
              Pfarrgasse 9<br />
              90402 Nürnberg
            </p>
            
            <h2>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. 
              Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu 
              überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. 
              Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. 
              Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impressum;
