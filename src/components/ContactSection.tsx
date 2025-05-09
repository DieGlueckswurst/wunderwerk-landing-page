
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="vertical-line mb-12"></div>
      <h2 className="section-title">04 Kontakt</h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-serif mb-6">Schreiben Sie uns</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <Input id="name" placeholder="Ihr Name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">E-Mail</label>
                <Input id="email" type="email" placeholder="Ihre E-Mail" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Betreff</label>
              <Input id="subject" placeholder="Ihr Betreff" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Nachricht</label>
              <Textarea id="message" placeholder="Ihre Nachricht" rows={4} />
            </div>
            <Button type="submit" className="bg-black hover:bg-gray-800 text-white w-full md:w-auto">
              Nachricht senden
            </Button>
          </form>
        </div>
        
        <div>
          <h3 className="text-2xl font-serif mb-6">Kontaktdaten</h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3" />
              <p>info@wunderwerk-nuernberg.de</p>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3" />
              <p>+49 (0) 911 123456</p>
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 mt-1" />
              <p>Wunderwerk<br />Musterstraße 123<br />90402 Nürnberg</p>
            </div>
          </div>
          
          <h3 className="text-2xl font-serif mb-4">Newsletter abonnieren</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input placeholder="E-Mail-Adresse" className="flex-grow" />
            <Button className="bg-black hover:bg-gray-800 text-white whitespace-nowrap">
              Jetzt abonnieren
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-20">
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Wunderwerk Nürnberg. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-black">Impressum</a>
            <a href="#" className="text-sm text-gray-500 hover:text-black">Datenschutz</a>
            <a href="#" className="text-sm text-gray-500 hover:text-black">AGB</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
