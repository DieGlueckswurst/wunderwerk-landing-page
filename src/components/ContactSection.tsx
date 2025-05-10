import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!name || !email || !message) {
      toast({
        title: "Fehlende Informationen",
        description: "Bitte fülle alle erforderlichen Felder aus.",
        variant: "destructive",
      });
      setIsLoading(false);
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
      setIsLoading(false);
      return;
    }

    try {
      await emailjs.send(
        'service_xlrejj5', // service ID
        'template_v4gzqoc', // template ID
        {
          from_name: name,
          from_email: email,
          subject: subject || 'Neue Kontaktanfrage',
          message: message,
          to_email: 'info@wunderwerk-nuernberg.de',
        },
        'cfytsdgAHM6hq2nyF' // public key
      );

      setIsSubmitted(true);
      toast({
        title: "Nachricht gesendet!",
        description: "Wir haben deine Nachricht erhalten und werden uns bald bei dir melden.",
      });
    } catch (error) {
      toast({
        title: "Fehler beim Senden",
        description: "Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white w-full"
                disabled={isLoading}
              >
                {isLoading ? "Wird gesendet..." : "Nachricht senden"}
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
            <a href="mailto:info@wunderwerk-nuernberg.de" className="mb-2 block">info@wunderwerk-nuernberg.de</a>
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
