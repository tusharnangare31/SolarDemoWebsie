import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import BrandStrip from '../ui/BrandStrip';

export default function Partners() {
  return (
    <section className="py-20 bg-slate-50/50 border-y border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-green-600 uppercase bg-green-50 px-3.5 py-1 rounded-full border border-green-100 mb-3 inline-block">
            Tier-1 Global Brands
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-1 mb-3">
            Our Trusted Partners
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            We partner with the world&apos;s leading solar module and inverter manufacturers to guarantee 25-year reliability.
          </p>
        </div>
        <BrandStrip />
      </div>
    </section>
  );
}
