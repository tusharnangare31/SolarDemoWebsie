import { Home, Building2, Factory, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  features: string[];
  image?: string;
}

export const services: Service[] = [
  {
    id: 'residential',
    title: 'Residential Solar',
    description: 'Power your home with clean, renewable solar energy. Reduce electricity bills by up to 90% with our rooftop solar solutions designed for Indian homes.',
    icon: Home,
    href: '/services/residential',
    features: [
      'Rooftop solar panel installation',
      'Net metering setup assistance',
      'Government subsidy processing',
      '25-year performance warranty',
      'Smart monitoring system',
      'Free site survey & design',
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial & Industrial',
    description: 'Slash operational costs and achieve sustainability goals with large-scale solar solutions for businesses, factories, and commercial establishments.',
    icon: Building2,
    href: '/services/commercial',
    features: [
      'Custom system design & engineering',
      'Rooftop & ground-mounted systems',
      'Power Purchase Agreements (PPA)',
      'CAPEX & OPEX models available',
      'Accelerated depreciation benefits',
      'Remote monitoring & analytics',
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial Solar',
    description: 'Heavy-duty solar power plants for manufacturing units and large industries. Maximize energy independence with MW-scale installations.',
    icon: Factory,
    href: '/services/commercial',
    features: [
      'MW-scale solar power plants',
      'Open access & captive models',
      'Hybrid energy solutions',
      'Battery energy storage (BESS)',
      'Carbon credit generation',
      'Complete EPC turnkey solutions',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance & AMC',
    description: 'Keep your solar system running at peak performance with our comprehensive annual maintenance contracts and repair services.',
    icon: Wrench,
    href: '/services/maintenance',
    features: [
      'Preventive & corrective maintenance',
      'Panel cleaning services',
      'Inverter health monitoring',
      'Performance optimization',
      'Emergency repair support',
      'Quarterly inspection reports',
    ],
  },
];
