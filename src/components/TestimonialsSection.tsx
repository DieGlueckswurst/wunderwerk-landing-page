
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Testimonial = ({
  author,
  text,
  active,
  leaving
}: {
  author: string;
  text: string;
  active: boolean;
  leaving: boolean;
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-300 ease-in-out flex flex-col items-center justify-center
        ${active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
    >
      <p className={`text-xl text-center font-['Avenir_Next'] italic mb-6 max-w-3xl mx-auto md:text-lg ${isMobile ? 'px-6' : 'px-12'}`}>"{text}"</p>
      <p className="text-center font-sans text-base">{author}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [{
    text: "Ich habe hier das Dübeln gelernt. Hoffentlich hält alles.",
    author: "Chris"
  }, {
    text: "Räumlichkeiten mit wahnsinnig schönem Licht.",
    author: "Toni"
  }, {
    text: "Den Namen finde ich fraglich, sonst top.",
    author: "Ina"
  }];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        handleNextTestimonial();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, currentIndex]); // Added currentIndex as dependency

  const handleNextTestimonial = () => {
    setLeavingIndex(currentIndex);

    // Slight delay before changing the actual index
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setLeavingIndex(null);
    }, 150);
  };

  const goToPrev = () => {
    setLeavingIndex(currentIndex);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setLeavingIndex(null);
    }, 150);
  };

  const goToNext = handleNextTestimonial; // Simplify by directly using the existing function

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;

    setLeavingIndex(currentIndex);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setCurrentIndex(index);
      setLeavingIndex(null);
    }, 150);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="px-6 py-20">
      <div className="vertical-line h-48 mb-16"></div>
      <h2 className="section-title">03 Stimmen</h2>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <div
          className={`relative h-[180px] flex items-center justify-center mb-8 ${isMobile ? 'px-8' : 'px-16'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              active={currentIndex === index}
              leaving={leavingIndex === index}
            />
          ))}

          {/* Navigation arrows - Reduced outer padding */}
          <button
            className={`absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-20 ${isMobile ? 'pl-0 pr-2 py-2' : 'pl-0 pr-4 py-4'}`}
            onClick={goToPrev}
            aria-label="Previous testimonial"
            type="button"
          >
            <ChevronLeft size={isMobile ? 24 : 32} />
          </button>

          <button
            className={`absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors z-20 ${isMobile ? 'pr-0 pl-2 py-2' : 'pr-0 pl-4 py-4'}`}
            onClick={goToNext}
            aria-label="Next testimonial"
            type="button"
          >
            <ChevronRight size={isMobile ? 24 : 32} />
          </button>

          {/* Indicator dots */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === index
                  ? "bg-black scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
