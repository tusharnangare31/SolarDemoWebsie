'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Home, Building2, Factory, Zap, Wrench, Sun, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { ServiceItem } from '@/lib/db';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Building2,
  Factory,
  Zap,
  Wrench,
  Sun,
};

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Solar Services"
            subtitle="Complete end-to-end solar solutions tailored to your residential, commercial, and industrial requirements"
          />
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading solar services...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => {
                const Icon = iconMap[service.icon] || Sun;
                return (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 bg-gradient-to-br from-primary/10 to-accent-green/10 flex items-center justify-center relative overflow-hidden">
                        {service.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <Icon className="w-20 h-20 text-primary/40 group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-bold font-heading text-dark mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h2>
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                        <ul className="space-y-2 mb-4">
                          {service.features?.slice(0, 4).map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                              <div className="w-1.5 h-1.5 bg-accent-green rounded-full shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="p-6 pt-0">
                      <span className="inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
