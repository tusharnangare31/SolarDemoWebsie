export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export const team: TeamMember[] = [
  {
    name: 'Rajesh Sharma',
    role: 'Founder & CEO',
    description: '15+ years in renewable energy. Former solar division head at a leading EPC company.',
  },
  {
    name: 'Priya Patel',
    role: 'Chief Technology Officer',
    description: 'B.Tech + M.Tech in Solar Energy. Leads system design and R&D initiatives.',
  },
  {
    name: 'Amit Kumar',
    role: 'Head of Operations',
    description: '10+ years managing solar installations across India. Certified PV installer.',
  },
  {
    name: 'Sneha Reddy',
    role: 'Sales Director',
    description: 'Expert in commercial solar sales. Has closed 100+ MW of solar projects.',
  },
  {
    name: 'Vikram Singh',
    role: 'Head of Engineering',
    description: 'Specializes in MW-scale solar plant design and grid integration.',
  },
  {
    name: 'Meera Joshi',
    role: 'Customer Success Manager',
    description: 'Ensures seamless post-installation experience and manages AMC operations.',
  },
];
