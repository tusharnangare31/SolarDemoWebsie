export interface Product {
  id: number;
  name: string;
  category: 'Solar Panels' | 'Inverters' | 'Batteries' | 'Mounting Structures';
  specs: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'MonoCrystalline 545W Panel',
    category: 'Solar Panels',
    specs: ['545 Wp', 'Mono PERC', '21.3% Efficiency', '25-Year Warranty'],
    description: 'High-efficiency monocrystalline solar panel ideal for residential and commercial installations with limited roof space.',
  },
  {
    id: 2,
    name: 'Bifacial 550W Panel',
    category: 'Solar Panels',
    specs: ['550 Wp', 'Bifacial', '22.1% Efficiency', '30-Year Warranty'],
    description: 'Premium bifacial panel that captures sunlight from both sides for up to 20% additional energy generation.',
  },
  {
    id: 3,
    name: 'PolyCrystalline 335W Panel',
    category: 'Solar Panels',
    specs: ['335 Wp', 'Polycrystalline', '17.2% Efficiency', '25-Year Warranty'],
    description: 'Cost-effective polycrystalline panel suitable for large-scale ground-mounted installations.',
  },
  {
    id: 4,
    name: 'On-Grid Inverter 5kW',
    category: 'Inverters',
    specs: ['5 kW', 'Single Phase', '97.5% Efficiency', 'Wi-Fi Monitoring'],
    description: 'Smart grid-tied inverter with built-in Wi-Fi monitoring for residential solar systems.',
  },
  {
    id: 5,
    name: 'Hybrid Inverter 10kW',
    category: 'Inverters',
    specs: ['10 kW', 'Three Phase', '98.2% Efficiency', 'Battery Compatible'],
    description: 'Versatile hybrid inverter supporting both grid-connected and battery backup operation.',
  },
  {
    id: 6,
    name: 'String Inverter 50kW',
    category: 'Inverters',
    specs: ['50 kW', 'Three Phase', '98.7% Efficiency', 'MPPT Tracking'],
    description: 'Commercial-grade string inverter with multiple MPPT channels for large rooftop systems.',
  },
  {
    id: 7,
    name: 'Lithium Battery 5kWh',
    category: 'Batteries',
    specs: ['5 kWh', 'LiFePO4', '6000+ Cycles', '10-Year Warranty'],
    description: 'Long-lasting lithium iron phosphate battery for reliable home energy storage.',
  },
  {
    id: 8,
    name: 'Lithium Battery 10kWh',
    category: 'Batteries',
    specs: ['10 kWh', 'LiFePO4', '6000+ Cycles', '10-Year Warranty'],
    description: 'High-capacity battery module stackable up to 40kWh for whole-home backup.',
  },
  {
    id: 9,
    name: 'Aluminium Roof Mount',
    category: 'Mounting Structures',
    specs: ['Corrosion Resistant', 'Adjustable Tilt', '25-Year Life', 'Wind Load 150 km/h'],
    description: 'Lightweight aluminium mounting structure for RCC and metal sheet rooftops.',
  },
  {
    id: 10,
    name: 'GI Ground Mount',
    category: 'Mounting Structures',
    specs: ['Hot-Dip Galvanized', 'Fixed Tilt', '25-Year Life', 'Wind Load 180 km/h'],
    description: 'Heavy-duty galvanized iron ground-mounting system for solar farms and open areas.',
  },
];
