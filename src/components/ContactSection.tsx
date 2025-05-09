
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte fülle alle erforderlichen Felder aus.",
        variant: "destructive",
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Ungültige E-Mail",
        description: "Bitte gib eine gültige E-Mail-Adresse ein.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this data to your server or a service like EmailJS
    // For now, we'll simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Nachricht gesendet!",
        description: "Wir haben deine Nachricht erhalten und werden uns bald bei dir melden.",
      });
    }, 1000);
  };

  return (
    <section id="contact" className="px-6 py-20">
      <div className="vertical-line h-32 mb-16"></div>
      <h2 className="section-title">Kontakt</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-left">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Dein Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-left">E-Mail</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Deine E-Mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1 text-left">Betreff</label>
                <Input 
                  id="subject" 
                  placeholder="Dein Betreff" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-left">Nachricht</label>
                <Textarea 
                  id="message" 
                  placeholder="Deine Nachricht" 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="bg-black hover:bg-gray-800 text-white w-full">
                Nachricht senden
              </Button>
            </form>
          ) : (
            <div className="text-center p-8 border border-gray-200 rounded-lg">
              <div className="mb-4 text-5xl">✓</div>
              <h3 className="text-2xl font-serif mb-2">Vielen Dank!</h3>
              <p className="text-gray-600">Deine Nachricht wurde erfolgreich gesendet. Wir werden uns so schnell wie möglich bei dir melden.</p>
            </div>
          )}
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
    </section>
  );
};

export default ContactSection;
