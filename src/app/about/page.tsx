'use client';

import React, { useEffect, useState } from 'react';
import { Target, Eye, CheckCircle, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { TeamMemberItem } from '@/lib/db';

const certifications = [
  { name: 'MNRE Approved', description: 'Ministry of New and Renewable Energy approved channel partner' },
  { name: 'BIS Certified', description: 'Bureau of Indian Standards certified products and installations' },
  { name: 'ISO 9001:2015', description: 'Quality management system certification' },
  { name: 'ISO 14001:2015', description: 'Environmental management system certification' },
  { name: 'NABCEP Certified', description: 'North American Board of Certified Energy Practitioners' },
  { name: 'CEA Compliance', description: 'Central Electricity Authority safety standards compliance' },
];

export default function AboutPage() {
  const [team, setTeam] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/team')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setTeam(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-28">
      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-dark mb-6">
                Powering India&apos;s <span className="text-primary">Solar Revolution</span>
              </h1>
              <p className="text-gray-600 leading-relaxed mb-4">
                Founded in 2014, SunTech Solar has been at the forefront of India&apos;s renewable energy transition.
                What started as a small team of passionate engineers has grown into one of the most trusted
                solar EPC companies in the country.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                With over 500 successful installations and 50+ MW of solar capacity deployed across
                residential, commercial, and industrial sectors, we have helped thousands of customers
                reduce their electricity bills and carbon footprint.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our mission is simple: make solar energy accessible, affordable, and reliable for every
                Indian home and business. We handle everything from system design to installation,
                net metering, and subsidy processing — so you don&apos;t have to.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-accent-green/10 rounded-3xl h-80 lg:h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold font-heading text-primary">10+</div>
                <div className="text-lg text-gray-600 mt-2 font-medium">Years of Excellence</div>
                <p className="text-xs text-gray-500 mt-1">MNRE Channel Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To accelerate India&apos;s transition to clean energy by providing world-class solar solutions
                that are affordable, reliable, and accessible to every home and business. We are committed
                to excellence in engineering, installation quality, and customer service.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-accent-green/10 rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-7 h-7 text-accent-green" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be India&apos;s most trusted solar energy company, powering 1 million homes by 2030.
                We envision a future where every rooftop generates clean energy, every community is
                energy-independent, and every generation inherits a healthier planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Meet Our Leadership & Team"
            subtitle="Experienced professionals dedicated to delivering the best solar engineering"
          />
          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading team members...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center group">
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent-green/20 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden border-2 border-primary/10">
                    {member.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-primary">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold font-heading text-dark">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Certifications & Licenses"
            subtitle="Industry-recognized certifications ensuring quality and compliance"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white rounded-xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-accent-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-accent-green" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
