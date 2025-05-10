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
            <Link to="/" className="flex items-center">
              <img src="/logos/wunderwerk_circle_black.svg" alt="Wunderwerk Logo" className="h-10" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/#rooms" className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>
              RÄUME
            </Link>
            <Link to="/#testimonials" className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>
              STIMMEN
            </Link>
            <Link to="/#contact" className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}>
              KONTAKT
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`md:hidden ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
                <Menu className={`h-6 w-6 ${scrolled ? 'text-black' : 'text-white'}`} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white/80 backdrop-blur-md">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/#rooms" className="font-sans text-black hover:text-gray-600 transition-colors">
                  RÄUME
                </Link>
                <Link to="/#testimonials" className="font-sans text-black hover:text-gray-600 transition-colors">
                  STIMMEN
                </Link>
                <Link to="/#contact" className="font-sans text-black hover:text-gray-600 transition-colors">
                  KONTAKT
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
