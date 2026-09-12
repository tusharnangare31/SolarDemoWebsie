'use client';

import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ui/ContactForm';
import { SiteSettings } from '@/lib/db';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.company_name) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const phone = settings?.phone || '+91 98765 43210';
  const phoneAlt = settings?.phone_alt || '+91 98765 43211';
  const email = settings?.email || 'info@suntechsolar.in';
  const emailSales = settings?.email_sales || 'sales@suntechsolar.in';
  const address = settings?.address || '123, Solar Tower, MG Road, Jaipur, Rajasthan 302001';
  const hours = settings?.working_hours || 'Mon - Sat: 9:00 AM - 7:00 PM';

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [address],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [phone, phoneAlt],
      links: [`tel:${phone.replace(/\s+/g, '')}`, `tel:${phoneAlt.replace(/\s+/g, '')}`],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [email, emailSales],
      links: [`mailto:${email}`, `mailto:${emailSales}`],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [hours, 'Sunday: 10:00 AM - 4:00 PM'],
    },
  ];

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Get a free solar consultation and customized quote for your home or business
          </p>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm
                title="Send Us a Message"
                subtitle="Fill in your details and our team will get back to you within 24 hours"
                sourcePage="Contact Page"
              />
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((info) => (
                <div key={info.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-sm text-gray-600">
                          {info.links?.[i] ? (
                            <a href={info.links[i]} className="hover:text-primary transition-colors">
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="h-64 bg-gradient-to-br from-primary/5 to-accent-green/5 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-10 h-10 text-primary/30 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-700">Office Location</p>
                    <p className="text-xs text-gray-500 max-w-xs px-4 mt-0.5">{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
