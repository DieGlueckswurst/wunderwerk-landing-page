import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
const ContactSection = () => {
  return <section id="contact" className="px-6 py-[16px]">
      <div className="vertical-line h-32 mb-16"></div>
      <h2 className="section-title">04 Kontakt</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-serif mb-6">Schreiben Sie uns</h3>
          <form className="max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-left">Name</label>
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
              <label htmlFor="message" className="block text-sm font-medium mb-1 text-left">Nachricht</label>
              <Textarea id="message" placeholder="Ihre Nachricht" rows={4} />
            </div>
            <Button type="submit" className="bg-black hover:bg-gray-800 text-white w-full">
              Nachricht senden
            </Button>
          </form>
        </div>
        
        <div className="text-center">
          <div className="mb-8">
            <p className="mb-2">info@wunderwerk-nuernberg.de</p>
            <p className="mb-2">+49 (0) 911 123456</p>
            <p>Wunderwerk • Musterstraße 123 • 90402 Nürnberg</p>
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-20">
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">© 2025 Wunderwerk Nürnberg. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-black">Impressum</a>
            <a href="#" className="text-sm text-gray-500 hover:text-black">Datenschutz</a>
            <a href="#" className="text-sm text-gray-500 hover:text-black">AGB</a>
          </div>
        </div>
      </div>
    </section>;
};
export default ContactSection;