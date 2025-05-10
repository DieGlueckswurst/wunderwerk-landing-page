import { useState, useEffect } from "react";
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
    <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 absolute"}`}>
      <p className="text-xl text-center font-['Avenir_Next'] italic mb-6 max-w-3xl mx-auto md:text-lg">"{text}"</p>
      <p className="text-center font-sans text-base">{author}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Ich habe hier das Dübeln gelernt. Hoffentlich hält alles.",
      author: "C. K."
    },
    {
      text: "Räumlichkeiten mit wahnsinnig schönem Licht.",
      author: "T. H."
    },
    {
      text: "Den Namen finde ich fraglich, sonst top.",
      author: "I. K."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="px-6 py-20">
      <div className="vertical-line h-48 mb-16"></div>
      <h2 className="section-title">03 Stimmen</h2>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="relative h-[160px] flex items-center justify-center mb-8 px-12">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} text={testimonial.text} author={testimonial.author} active={currentIndex === index} />
          ))}

          {/* Navigation arrows */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            onClick={goToPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            onClick={goToNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;