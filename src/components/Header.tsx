import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setIsOpen(false); // Close menu after clicking
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              onClick={() => scrollToSection('start')}
              variant="ghost"
              className="p-0 hover:bg-transparent"
            >
              <img src="/logos/wunderwerk_text_black_transparent.svg" alt="Wunderwerk Logo" className="h-10" />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button
              onClick={() => scrollToSection('rooms')}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              RÄUME
            </Button>
            <Button
              onClick={() => scrollToSection('testimonials')}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              STIMMEN
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              KONTAKT
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`md:hidden ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
                <Menu className={`h-6 w-6 ${scrolled ? 'text-black' : 'text-white'}`} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white/80 backdrop-blur-md">
              <nav className="flex flex-col space-y-4 mt-8">
                <Button
                  onClick={() => scrollToSection('rooms')}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  RÄUME
                </Button>
                <Button
                  onClick={() => scrollToSection('testimonials')}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  STIMMEN
                </Button>
                <Button
                  onClick={() => scrollToSection('contact')}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  KONTAKT
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
