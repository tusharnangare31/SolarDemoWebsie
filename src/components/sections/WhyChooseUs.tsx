import React from 'react';
import { Shield, Award, Headphones, Users, FileCheck, IndianRupee } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const benefits = [
  {
    icon: Award,
    title: 'MNRE Approved',
    description: 'Government-recognized solar installer with all necessary certifications and licenses.',
  },
  {
    icon: Shield,
    title: '25-Year Warranty',
    description: 'Comprehensive warranty on panels with 10-year inverter warranty for total peace of mind.',
  },
  {
    icon: Headphones,
    title: 'After-Sales Support',
    description: '24/7 customer support with dedicated service teams across all major cities.',
  },
  {
    icon: Users,
    title: 'Certified Engineers',
    description: 'Team of NABCEP and MNRE certified solar engineers with hands-on installation experience.',
  },
  {
    icon: FileCheck,
    title: 'Net Metering Support',
    description: 'Complete assistance with net metering application, DISCOM coordination, and approval.',
  },
  {
    icon: IndianRupee,
    title: 'Subsidy Assistance',
    description: 'End-to-end subsidy processing under PM Surya Ghar Yojana and state schemes.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Choose SunTech Solar"
          subtitle="Trusted by 500+ customers across India for reliable, high-quality solar installations"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-colors">
                <benefit.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold font-heading text-dark mb-1">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
