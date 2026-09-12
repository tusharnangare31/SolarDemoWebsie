'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TestimonialItem } from '@/lib/db';

export default function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const testimonial = testimonials[current];

  return (
    <div
      className="relative max-w-4xl mx-auto"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative border border-gray-100">
        <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/10" />
        <div className="text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating ? 'text-accent-orange fill-accent-orange' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-lg md:text-xl text-gray-700 italic mb-6 leading-relaxed">
            &ldquo;{testimonial.message}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden border border-primary/20">
              {testimonial.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={testimonial.photo}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-primary font-bold text-lg">{testimonial.name[0]}</span>
              )}
            </div>
            <div className="text-left">
              <p className="font-semibold text-dark">{testimonial.name}</p>
              <p className="text-sm text-gray-500">
                {testimonial.location} • {testimonial.system_type}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
              i === current ? 'bg-primary w-8' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
