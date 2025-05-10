import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-5 px-6 md:px-12 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <img
            src="/logos/wunderwerk_text_black_transparent.svg"
            alt="Wunderwerk Logo"
            className={cn(
              "h-8 w-auto transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0"
            )}
          />
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Button
            onClick={() => scrollToSection('start')}
            variant="ghost"
            className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black"
          >
            START
          </Button>
          <Button
            onClick={() => scrollToSection('info')}
            variant="ghost"
            className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black"
          >
            INFO
          </Button>
          <Button
            onClick={() => scrollToSection('rooms')}
            variant="ghost"
            className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black"
          >
            RÄUME
          </Button>
          <Button
            onClick={() => scrollToSection('testimonials')}
            variant="ghost"
            className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black"
          >
            STIMMEN
          </Button>
          <Button
            onClick={() => scrollToSection('contact')}
            variant="ghost"
            className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black"
          >
            KONTAKT
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "md:hidden",
                scrolled ? "bg-white" : "bg-transparent border-transparent hover:bg-transparent"
              )}
              size="icon"
            >
              <span className="sr-only">Open menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              <Button
                onClick={() => scrollToSection('start')}
                variant="ghost"
                className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black justify-start"
              >
                START
              </Button>
              <Button
                onClick={() => scrollToSection('info')}
                variant="ghost"
                className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black justify-start"
              >
                INFO
              </Button>
              <Button
                onClick={() => scrollToSection('rooms')}
                variant="ghost"
                className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black justify-start"
              >
                RÄUME
              </Button>
              <Button
                onClick={() => scrollToSection('testimonials')}
                variant="ghost"
                className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black justify-start"
              >
                STIMMEN
              </Button>
              <Button
                onClick={() => scrollToSection('contact')}
                variant="ghost"
                className="font-sans text-sm tracking-wider hover:bg-transparent hover:text-black justify-start"
              >
                KONTAKT
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
