import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonial = ({
  author,
  text,
  active
}: {
  author: string;
  text: string;
  active: boolean;
}) => {
  return (
    <div
      className={`transition-all duration-300 ease-in-out ${active
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-2 absolute pointer-events-none"
        }`}
    >
      <p className="text-xl text-center font-['Avenir_Next'] italic mb-6 max-w-3xl mx-auto md:text-lg">"{text}"</p>
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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isManualNavigationRef = useRef(false);

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isManualNavigationRef.current && !isHovered) {
        setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
      }
    }, 4000); // Reduced from 6000 to 3500ms
  };

  useEffect(() => {
    // Add initial delay before starting rotation
    const initialDelay = setTimeout(() => {
      startInterval();
    }, 1000); // Reduced from 2000 to 1000ms

    return () => {
      clearTimeout(initialDelay);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonials.length]);

  const goToPrev = () => {
    isManualNavigationRef.current = true;
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
    startInterval();
    setTimeout(() => {
      isManualNavigationRef.current = false;
    }, 3500); // Reduced from 6000 to 3500ms
  };

  const goToNext = () => {
    isManualNavigationRef.current = true;
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    startInterval();
    setTimeout(() => {
      isManualNavigationRef.current = false;
    }, 3500); // Reduced from 6000 to 3500ms
  };

  return (
    <section id="testimonials" className="px-6 py-20">
      <div className="vertical-line h-48 mb-16"></div>
      <h2 className="section-title">03 Stimmen</h2>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <div
          className="relative h-[140px] flex items-center justify-center mb-8 px-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              active={currentIndex === index}
            />
          ))}

          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={32} />
          </button>

          {/* Indicator dots */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  isManualNavigationRef.current = true;
                  setCurrentIndex(index);
                  startInterval();
                  setTimeout(() => {
                    isManualNavigationRef.current = false;
                  }, 3500);
                }}
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