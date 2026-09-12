import type { Metadata } from 'next';
import { Home, CheckCircle, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ui/ContactForm';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Residential Solar Installation',
  description: 'Rooftop solar panel installation for homes. Save up to 90% on electricity bills with government subsidies under PM Surya Ghar Yojana.',
};

const benefits = [
  'Save up to 90% on electricity bills',
  'Government subsidy up to ₹78,000',
  '25-year panel performance warranty',
  'Net metering for excess power export',
  'Increase your property value by 3-4%',
  'Reduce 7.5 tonnes CO₂ annually (5kW system)',
];

const process = [
  { step: '01', title: 'Free Site Survey', description: 'Our engineers visit your home to assess rooftop area, shading, and electrical setup.' },
  { step: '02', title: 'Custom Design', description: 'We design the optimal system size and layout based on your consumption and roof specifications.' },
  { step: '03', title: 'Installation', description: 'Professional installation completed in 1-3 days with minimal disruption to your daily life.' },
  { step: '04', title: 'Net Metering & Subsidy', description: 'We handle DISCOM application, meter installation, and subsidy claim processing end-to-end.' },
];

export default function ResidentialPage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Home className="w-4 h-4 text-accent-orange" />
              <span className="text-sm">Residential Solar</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Solar Power for Your Home</h1>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              Transform your rooftop into a power plant. Our residential solar solutions are designed
              for Indian homes, with complete subsidy assistance and net metering support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/contact" variant="accent" size="lg" icon={ArrowRight} iconPosition="right">Get Free Quote</Button>
              <Button href="/calculator" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">Calculate Savings</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Benefits of Home Solar" subtitle="Why thousands of Indian homeowners are switching to solar" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 rounded-xl hover:bg-light transition-colors">
                <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="How It Works" subtitle="From consultation to commissioning in 4 simple steps" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="relative">
                <div className="text-5xl font-bold font-heading text-primary/10 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold font-heading text-dark mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm
            title="Get a Free Solar Proposal"
            subtitle="Tell us about your home and we'll design the perfect solar system for you"
            sourcePage="Residential Solar"
          />
        </div>
      </section>
    </div>
  );
}
