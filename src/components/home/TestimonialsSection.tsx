'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    text: "Afridrop Solutions transformed our backyard with a stunning swimming pool. Their team was professional, efficient, and delivered exactly what we wanted. We couldn't be happier with the results!",
    name: "David Mukasa",
    role: "Homeowner, Kampala",
    rating: 5,
    image: "/assets/Images/testimonial2.webp"
  },
  {
    id: 2,
    text: "Outstanding service from start to finish! The pool maintenance team keeps our commercial pool in perfect condition year-round. Their expertise and reliability are unmatched in Uganda.",
    name: "Sarah Namugga",
    role: "Hotel Manager, Entebbe",
    rating: 5,
    image: "/assets/Images/Manger.webp"
  },
  {
    id: 3,
    text: "The water treatment services provided by Afridrop Solutions have been exceptional. Our pool water is always crystal clear and safe. I highly recommend their professional services to anyone.",
    name: "James Okello",
    role: "Resort Owner, Jinja",
    rating: 4.5,
    image: "/assets/Images/testimonial1.webp"
  }
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % TESTIMONIALS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="py-20 bg-[#00477A] text-white relative overflow-hidden">
        {/* Decorative background elements can go here */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Clients Say</h2>
          <p className="text-[#E0F5FA] text-lg">
            Hear from our satisfied clients about their experience working with us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center transition-all duration-500 min-h-[400px] flex flex-col justify-center items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            
            {/* Stars - Single rendering */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <Star
                    key={index}
                    className={`w-6 h-6 ${
                      ratingValue <= TESTIMONIALS[currentSlide].rating
                        ? "fill-[#FFD700] text-[#FFD700]"
                        : ratingValue - 0.5 <= TESTIMONIALS[currentSlide].rating
                        ? "fill-[#FFD700] text-[#FFD700] opacity-50"
                        : "text-gray-400"
                    }`}
                  />
                );
              })}
            </div>

            <p className="text-xl md:text-2xl leading-relaxed italic mb-8 font-light">
              "{TESTIMONIALS[currentSlide].text}"
            </p>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#009FCE]">
                <Image
                  src={TESTIMONIALS[currentSlide].image}
                  alt={TESTIMONIALS[currentSlide].name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">{TESTIMONIALS[currentSlide].name}</h3>
                <p className="text-[#E0F5FA] text-sm">{TESTIMONIALS[currentSlide].role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
