export interface Project {
  id: number;
  title: string;
  location: string;
  capacity: string;
  type: 'Residential' | 'Commercial' | 'Industrial';
  description: string;
  clientType: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Sharma Residence Solar Rooftop',
    location: 'Jaipur, Rajasthan',
    capacity: '10 kW',
    type: 'Residential',
    description: 'Complete rooftop solar installation with net metering for a 4BHK villa.',
    clientType: 'Individual Homeowner',
  },
  {
    id: 2,
    title: 'GreenTech Office Complex',
    location: 'Gurugram, Haryana',
    capacity: '150 kW',
    type: 'Commercial',
    description: 'Commercial rooftop solar system for a 5-storey office building.',
    clientType: 'Corporate Office',
  },
  {
    id: 3,
    title: 'Patel Manufacturing Unit',
    location: 'Ahmedabad, Gujarat',
    capacity: '500 kW',
    type: 'Industrial',
    description: 'Ground-mounted solar plant for a textile manufacturing facility.',
    clientType: 'Manufacturing',
  },
  {
    id: 4,
    title: 'Sunrise Apartments',
    location: 'Pune, Maharashtra',
    capacity: '50 kW',
    type: 'Residential',
    description: 'Shared solar rooftop for a 20-unit apartment complex.',
    clientType: 'Housing Society',
  },
  {
    id: 5,
    title: 'Royal Hotel & Resort',
    location: 'Udaipur, Rajasthan',
    capacity: '200 kW',
    type: 'Commercial',
    description: 'Hybrid solar system with battery backup for a 5-star hotel.',
    clientType: 'Hospitality',
  },
  {
    id: 6,
    title: 'AutoParts Industries',
    location: 'Chennai, Tamil Nadu',
    capacity: '1 MW',
    type: 'Industrial',
    description: 'MW-scale open access solar plant for automobile parts manufacturer.',
    clientType: 'Heavy Industry',
  },
  {
    id: 7,
    title: 'City Mall Solar Installation',
    location: 'Lucknow, UP',
    capacity: '300 kW',
    type: 'Commercial',
    description: 'Rooftop solar with EV charging infrastructure for a shopping mall.',
    clientType: 'Retail',
  },
  {
    id: 8,
    title: 'Kumar Farmhouse',
    location: 'Nashik, Maharashtra',
    capacity: '15 kW',
    type: 'Residential',
    description: 'Off-grid solar system with battery storage for a farmhouse.',
    clientType: 'Individual Homeowner',
  },
  {
    id: 9,
    title: 'Bharat Pharma Labs',
    location: 'Hyderabad, Telangana',
    capacity: '750 kW',
    type: 'Industrial',
    description: 'Solar-plus-storage solution for a pharmaceutical manufacturing plant.',
    clientType: 'Pharmaceutical',
  },
  {
    id: 10,
    title: 'Gupta Residence',
    location: 'Delhi NCR',
    capacity: '5 kW',
    type: 'Residential',
    description: 'Compact rooftop system with PM Surya Ghar subsidy for a 3BHK home.',
    clientType: 'Individual Homeowner',
  },
  {
    id: 11,
    title: 'EduSmart School Campus',
    location: 'Bangalore, Karnataka',
    capacity: '100 kW',
    type: 'Commercial',
    description: 'Solar installation across school building rooftops with smart monitoring.',
    clientType: 'Educational Institution',
  },
  {
    id: 12,
    title: 'Steel Works Plant',
    location: 'Jamshedpur, Jharkhand',
    capacity: '2 MW',
    type: 'Industrial',
    description: 'Large-scale captive solar power plant for steel manufacturing.',
    clientType: 'Heavy Industry',
  },
];
