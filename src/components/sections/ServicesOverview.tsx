'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Home, Building2, Factory, Zap, Wrench, Sun } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { ServiceItem } from '@/lib/db';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Building2,
  Factory,
  Zap,
  Wrench,
  Sun,
};

export default function ServicesOverview() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold tracking-wider text-green-600 uppercase bg-green-50 px-3.5 py-1 rounded-full border border-green-100 mb-3 inline-block">
            Tailored For You
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-slate-900 tracking-tight mt-1 mb-4">
            Our Solar Solutions
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            End-to-end solar energy solutions engineered for maximum performance, long-term savings, and environmental sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Sun;
            return (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Image Banner */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={service.image || '/images/services/residential.svg'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-xs shadow-md flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-heading text-slate-900 mb-2 group-hover:text-green-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600 group-hover:text-green-700 flex items-center gap-1">
                      Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Read details</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
