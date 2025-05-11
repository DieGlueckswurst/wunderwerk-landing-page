import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import PageHeader from "@/components/PageHeader";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PageHeader title="Impressum" />

      {/* Content section */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose max-w-none">
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
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
              Helmstraße 19<br />
              90419 Nürnberg
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
