import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 110);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, isMobile: boolean = false) => {
    const element = document.getElementById(id);
    if (element) {
      const targetPosition = element.offsetTop - 100;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800; // Consistent duration across all devices
      let startTime: number | null = null;

      const scroll = () => {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      };

      // Custom smooth scroll function
      const smoothScroll = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smoother animation
        const easeInOutCubic = (t: number) => t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

        if (timeElapsed < duration) {
          requestAnimationFrame(smoothScroll);
        }
      };

      if (isMobile) {
        // Close the sheet first, then scroll
        setIsOpen(false);
        setTimeout(() => {
          startTime = null;
          requestAnimationFrame(smoothScroll);
        }, 300); // Wait for sheet closing animation
      } else {
        startTime = null;
        requestAnimationFrame(smoothScroll);
      }
    }
  };

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId, window.innerWidth < 768); // Pass isMobile flag
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
      setIsOpen(false);
    }
  };

  const handleAboutClick = () => {
    navigate('/about');
    setIsOpen(false);
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    }
  }, [location]);

  // Handle logo click (app bar icon)
  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button
              onClick={handleLogoClick}
              variant="ghost"
              className="p-0 hover:bg-transparent"
            >
              <img
                src="/logos/wunderwerk_text_black_transparent.svg"
                alt="Wunderwerk Logo"
                className={`h-8 transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
              />
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button
              onClick={() => handleSectionClick('info')}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              INFO
            </Button>
            <Button
              onClick={() => handleSectionClick('rooms')}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              RÄUME
            </Button>
            <Button
              onClick={() => handleSectionClick('testimonials')}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              STIMMEN
            </Button>
            <Button
              onClick={() => handleSectionClick('contact')}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              KONTAKT
            </Button>
            <Button
              onClick={handleAboutClick}
              variant="ghost"
              className={`font-sans hover:text-gray-600 transition-colors ${scrolled ? 'text-black' : 'text-white'}`}
            >
              ÜBER
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            // Reset any active states when the sheet closes
            if (!open) {
              const button = document.querySelector('[data-sheet-trigger]');
              if (button) {
                button.classList.remove('active', 'hover:bg-gray-100');
              }
            }
          }}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-sheet-trigger
                className={`md:hidden touch-none select-none ${scrolled ? 'bg-white' : 'bg-transparent'
                  } ${isOpen ? 'bg-gray-100' : ''}`}
              >
                <Menu className={`h-6 w-6 ${scrolled ? 'text-black' : 'text-white'}`} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white/80 backdrop-blur-md">
              <nav className="flex flex-col space-y-4 mt-8">
                <Button
                  onClick={() => handleSectionClick('info')}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  INFO
                </Button>
                <Button
                  onClick={() => handleSectionClick('rooms')}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  RÄUME
                </Button>
                <Button
                  onClick={() => handleSectionClick('testimonials')}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  STIMMEN
                </Button>
                <Button
                  onClick={() => handleSectionClick('contact')}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  KONTAKT
                </Button>
                <Button
                  onClick={handleAboutClick}
                  variant="ghost"
                  className="font-sans text-black hover:text-gray-600 transition-colors justify-start"
                >
                  ÜBER
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
