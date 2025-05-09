
import { useState, useEffect } from "react";

const Testimonial = ({ author, text, active }: { author: string; text: string; active: boolean }) => {
  return (
    <div className={`transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0 absolute"}`}>
      <p className="text-xl md:text-2xl text-center font-serif italic mb-6 max-w-3xl mx-auto">"{text}"</p>
      <p className="text-center font-sans text-lg">{author}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Die Räume im Wunderwerk sind einfach perfekt für meine Yogakurse. Hell, großzügig und mit einer wunderbaren Atmosphäre.",
      author: "Sarah M., Yogalehrerin"
    },
    {
      text: "Als Hebamme finde ich hier alles, was ich für meine Arbeit brauche. Die Atmosphäre ist entspannt und professionell zugleich.",
      author: "Claudia K., Hebamme"
    },
    {
      text: "Meine Patienten fühlen sich im Wunderwerk sofort wohl. Die Räume sind optimal für meine physiotherapeutische Arbeit ausgestattet.",
      author: "Thomas L., Physiotherapeut"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 px-6">
      <div className="vertical-line mb-12"></div>
      <h2 className="section-title">03 Kunden</h2>
      
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h3 className="text-2xl md:text-3xl font-serif mb-12">Nicht nur wir finden die Räume toll</h3>
        
        <div className="relative h-[200px] flex items-center justify-center">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={index} 
              text={testimonial.text} 
              author={testimonial.author} 
              active={currentIndex === index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
