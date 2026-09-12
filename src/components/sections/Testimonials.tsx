import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCarousel from '../ui/TestimonialCarousel';

export default function Testimonials() {
  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Our Customers Say"
          subtitle="Join hundreds of satisfied customers who have made the switch to solar energy"
        />
        <TestimonialCarousel />
      </div>
    </section>
  );
}
