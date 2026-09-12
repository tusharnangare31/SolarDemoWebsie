import type { Metadata } from 'next';
import { Wrench, CheckCircle, Shield, Clock, PhoneCall } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import ContactForm from '@/components/ui/ContactForm';

export const metadata: Metadata = {
  title: 'Solar Maintenance & AMC Services',
  description: 'Comprehensive solar panel maintenance and Annual Maintenance Contract (AMC) services. Keep your solar system running at peak performance.',
};

const services = [
  'Panel cleaning and washing',
  'Inverter health check and diagnostics',
  'Electrical connection inspection',
  'Performance monitoring and analysis',
  'Mounting structure inspection',
  'Earthing and safety checks',
  'DC cable condition assessment',
  'Thermal imaging for hot spots',
];

const plans = [
  {
    name: 'Basic',
    price: '₹1,500',
    unit: '/kW/year',
    features: ['2 cleaning visits/year', 'Annual inspection', 'Performance report', 'Phone support'],
    recommended: false,
  },
  {
    name: 'Standard',
    price: '₹2,500',
    unit: '/kW/year',
    features: ['4 cleaning visits/year', 'Quarterly inspection', 'Performance optimization', 'Priority support', 'Inverter health check', 'Minor repairs included'],
    recommended: true,
  },
  {
    name: 'Premium',
    price: '₹3,500',
    unit: '/kW/year',
    features: ['6 cleaning visits/year', 'Bi-monthly inspection', 'Real-time monitoring', '24/7 emergency support', 'All repairs included', 'Thermal imaging', 'Annual detailed report'],
    recommended: false,
  },
];

export default function MaintenancePage() {
  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <Wrench className="w-4 h-4 text-accent-orange" />
              <span className="text-sm">Maintenance & AMC</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Solar Maintenance Services</h1>
            <p className="text-lg text-blue-100 leading-relaxed">
              Protect your solar investment with our comprehensive maintenance and AMC plans.
              Regular maintenance ensures 10-15% better performance over the system lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What We Cover" subtitle="Comprehensive maintenance services for all types of solar installations" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div key={service} className="flex items-center gap-3 p-4 bg-light rounded-xl">
                <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                <span className="text-sm text-gray-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AMC Plans */}
      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="AMC Plans" subtitle="Choose a maintenance plan that fits your needs and budget" />
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div key={plan.name} className={`bg-white rounded-2xl p-8 relative ${
                plan.recommended ? 'border-2 border-primary shadow-xl scale-105' : 'border border-gray-200 shadow-sm'
              } hover:shadow-lg transition-shadow`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold font-heading text-dark">{plan.name}</h3>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-gray-500 text-sm">{plan.unit}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                      {feature}
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
            title="Enquire About AMC Plans"
            subtitle="Get a customized AMC quote based on your system size and requirements"
            sourcePage="Solar Maintenance & AMC"
          />
        </div>
      </section>
    </div>
  );
}
