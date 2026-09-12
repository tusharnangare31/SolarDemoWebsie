'use client';

import React, { useEffect, useState } from 'react';
import ContactForm from '../ui/ContactForm';
import { Phone, Sun } from 'lucide-react';

export default function CTABanner() {
  const [phone, setPhone] = useState('+91 98765 43210');

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.phone) setPhone(data.phone);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-primary-dark via-primary to-primary relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-green/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Ready to Go Solar?
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              Join 500+ satisfied customers who have switched to clean, renewable solar energy.
              Get a free site survey and customized proposal today.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent-orange" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Call us today</p>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="text-lg font-semibold hover:text-accent-orange transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Sun className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <p className="text-sm text-blue-200">Free consultation</p>
                  <p className="text-lg font-semibold">No obligation quote</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <ContactForm
              title="Get Your Free Solar Quote"
              subtitle="Fill in your details and we'll get back to you within 24 hours"
              sourcePage="Home Page CTA"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
