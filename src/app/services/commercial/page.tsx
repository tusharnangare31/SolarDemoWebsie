import type { Metadata } from 'next';
import { Building2, CheckCircle, ArrowRight, TrendingUp, IndianRupee, Leaf } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ui/ContactForm';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Commercial & Industrial Solar',
  description: 'Large-scale solar solutions for businesses, factories, and commercial establishments. CAPEX, OPEX, and PPA models available.',
};

const roiCards = [
  { icon: IndianRupee, title: '40% Depreciation', description: 'Accelerated depreciation benefit in the first year reduces your tax liability significantly.' },
  { icon: TrendingUp, title: '25% IRR', description: 'Average internal rate of return on commercial solar investments, outperforming most asset classes.' },
  { icon: Leaf, title: 'Carbon Credits', description: 'Generate verified carbon credits that can be traded or used for ESG compliance reporting.' },
];

const models = [
  { title: 'CAPEX Model', description: 'Own the system outright. Higher upfront investment but maximum long-term savings and asset ownership.', features: ['Complete asset ownership', '40% accelerated depreciation', 'Full savings from Day 1', 'GST input credit available'] },
  { title: 'OPEX / PPA Model', description: 'Zero upfront investment. Pay only for the solar power you consume at a rate lower than grid tariff.', features: ['Zero capital investment', 'Immediate cost savings', 'No maintenance hassle', 'Easy scalability'] },
];

export default function CommercialPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Building2 className="w-4 h-4 text-accent-orange" />
              <span className="text-sm">Commercial & Industrial Solar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Solar Solutions for Business</h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              Reduce operational costs by 30-50% with tailored solar solutions for your business.
              From 50kW rooftops to MW-scale ground-mounted plants.
            </p>
            <Button href="/contact" variant="accent" size="lg" icon={ArrowRight} iconPosition="right">Schedule Consultation</Button>
          </div>
        </div>
      </section>

      {/* ROI */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Superior Returns on Investment" subtitle="Solar delivers exceptional financial and environmental returns for businesses" />
          <div className="grid md:grid-cols-3 gap-8">
            {roiCards.map((card) => (
              <div key={card.title} className="text-center p-8 bg-light rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <card.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-heading text-dark mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Flexible Ownership Models" subtitle="Choose the model that best fits your business needs" />
          <div className="grid md:grid-cols-2 gap-8">
            {models.map((model) => (
              <div key={model.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold font-heading text-dark mb-3">{model.title}</h3>
                <p className="text-gray-600 mb-4">{model.description}</p>
                <ul className="space-y-2">
                  {model.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-accent-green" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm
            title="Request a Commercial Solar Proposal"
            subtitle="Our team will prepare a customized techno-commercial proposal for your business"
            sourcePage="Commercial Solar"
          />
        </div>
      </section>
    </div>
  );
}
