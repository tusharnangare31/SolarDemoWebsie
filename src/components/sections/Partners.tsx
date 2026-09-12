import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import BrandStrip from '../ui/BrandStrip';

export default function Partners() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Trusted Partners"
          subtitle="We work with the world's leading solar equipment manufacturers"
        />
        <BrandStrip />
      </div>
    </section>
  );
}
