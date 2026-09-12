import type { Metadata } from 'next';
import { CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'On-Grid, Off-Grid & Hybrid Solar Systems',
  description: 'Compare on-grid, off-grid, and hybrid solar systems. Find the right solar solution for your needs with our expert guidance.',
};

const systems = [
  {
    title: 'On-Grid (Grid-Tied)',
    description: 'Connected to the electricity grid. Export excess power and earn credits through net metering.',
    bestFor: 'Areas with reliable grid supply, homes and businesses looking to reduce bills',
    pros: ['Lowest cost', 'Net metering credits', 'No battery needed', 'Government subsidy eligible'],
    cons: ['No backup during power cuts', 'Dependent on grid availability'],
    color: 'primary',
  },
  {
    title: 'Off-Grid',
    description: 'Completely independent from the grid. Stores excess energy in batteries for use anytime.',
    bestFor: 'Remote areas, farmhouses, places with no/poor grid connectivity',
    pros: ['Complete energy independence', '24/7 power availability', 'No electricity bills', 'Works in remote areas'],
    cons: ['Higher cost (batteries)', 'Regular battery maintenance', 'Not subsidy eligible'],
    color: 'accent-green',
  },
  {
    title: 'Hybrid',
    description: 'Best of both worlds. Grid-connected with battery backup for uninterrupted power.',
    bestFor: 'Areas with frequent power cuts, critical loads, businesses needing 24/7 power',
    pros: ['Grid + battery backup', 'Uninterrupted power supply', 'Net metering compatible', 'Future-proof solution'],
    cons: ['Higher cost than on-grid', 'More complex installation'],
    color: 'accent-orange',
  },
];

export default function SystemsPage() {
  return (
    <div className="pt-28">
      <section className="py-20 bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Solar System Types</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Understand the differences between on-grid, off-grid, and hybrid solar systems to make the right choice.</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {systems.map((system) => (
              <div key={system.title} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`p-6 bg-${system.color}/10`}>
                  <h2 className="text-xl font-bold font-heading text-dark">{system.title}</h2>
                  <p className="text-gray-600 text-sm mt-2">{system.description}</p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Best For</h4>
                    <p className="text-sm text-gray-700">{system.bestFor}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-accent-green uppercase mb-2">Advantages</h4>
                    <ul className="space-y-1.5">
                      {system.pros.map((pro) => (
                        <li key={pro} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-accent-orange uppercase mb-2">Considerations</h4>
                    <ul className="space-y-1.5">
                      {system.cons.map((con) => (
                        <li key={con} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-accent-orange rounded-full flex-shrink-0" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Not sure which system is right for you?</p>
            <Button href="/contact">Get Expert Advice</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
