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
  return <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 absolute"}`}>
      <p className="text-xl md:text-2xl text-center font-serif italic mb-6 max-w-3xl mx-auto">"{text}"</p>
      <p className="text-center font-sans text-lg">{author}</p>
    </div>;
};
const TestimonialsSection = () => {
  const testimonials = [{
    text: "Die Räume im Wunderwerk sind einfach perfekt für meine Yogakurse. Hell, großzügig und mit einer wunderbaren Atmosphäre.",
    author: "Sarah M., Yogalehrerin"
  }, {
    text: "Als Hebamme finde ich hier alles, was ich für meine Arbeit brauche. Die Atmosphäre ist entspannt und professionell zugleich.",
    author: "Claudia K., Hebamme"
  }, {
    text: "Meine Patienten fühlen sich im Wunderwerk sofort wohl. Die Räume sind optimal für meine physiotherapeutische Arbeit ausgestattet.",
    author: "Thomas L., Physiotherapeut"
  }];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };
  const goToPrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
  };
  return <section id="testimonials" className="px-6 py-[40px]">
      <div className="vertical-line h-32 mb-16"></div>
      <h2 className="section-title">Nicht nur wir fühlen uns hier wohl</h2>
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        
        
        <div className="relative h-[160px] flex items-center justify-center mb-0 px-0">
          {testimonials.map((testimonial, index) => <Testimonial key={index} text={testimonial.text} author={testimonial.author} active={currentIndex === index} />)}
          
          {/* Navigation arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black" onClick={goToPrev} aria-label="Previous testimonial">
            <ChevronLeft size={32} />
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black" onClick={goToNext} aria-label="Next testimonial">
            <ChevronRight size={32} />
          </button>
        </div>
        
        {/* Dots navigation */}
        <div className="flex justify-center space-x-1">
          {testimonials.map((_, index) => <button key={index} onClick={() => goToTestimonial(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-black" : "bg-gray-300"}`} aria-label={`Go to testimonial ${index + 1}`} />)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;