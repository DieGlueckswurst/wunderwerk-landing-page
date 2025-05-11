
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Datenschutz = () => {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-0">Datenschutz</h1>
        </div>
      </section>

      {/* Content section */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose max-w-none">
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
              wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert 
              werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text 
              aufgeführten Datenschutzerklärung.
            </p>

            <h3>Datenerfassung auf dieser Website</h3>
            <p>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten finden Sie im Impressum dieser Website.
            </p>

            <p>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>

            <p>
              <strong>Wofür nutzen wir Ihre Daten?</strong><br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <p>
              <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten 
              personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten 
              zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
              jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung 
              der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </p>

            <h2>2. Kontaktformular und EmailJS</h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive 
              der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen 
              bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            
            <p>
              Für das Kontaktformular nutzen wir den Dienst EmailJS. EmailJS übermittelt die Formularinhalte per E-Mail und 
              speichert diese Informationen vorübergehend auf seinen Servern. Weitere Informationen zum Umgang mit Nutzerdaten 
              finden Sie in der Datenschutzerklärung von EmailJS.
            </p>

            <h2>3. Verantwortlicher</h2>
            <p>
              Christian Konnerth<br />
              Wunderwerk<br />
              Pfarrgasse 9<br />
              90402 Nürnberg<br />
              E-Mail: info@wunderwerk-nuernberg.de
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datenschutz;
