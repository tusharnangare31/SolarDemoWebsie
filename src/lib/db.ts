import fs from 'fs/promises';
import path from 'path';

export interface SiteSettings {
  company_name: string;
  tagline: string;
  phone: string;
  phone_alt: string;
  whatsapp_number: string;
  email: string;
  email_sales: string;
  address: string;
  working_hours: string;
  map_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_primary: string;
  hero_cta_secondary: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  social_youtube: string;
  updated_at?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  order_index: number;
  features: string[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  description: string;
  specs: string[];
  image?: string;
  price: number;
  is_enquire_only: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  capacity_kw: string;
  type: 'Residential' | 'Commercial' | 'Industrial';
  client_type: string;
  description: string;
  image?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  system_type: string;
  rating: number;
  message: string;
  photo?: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category: string;
  author: string;
  read_time: string;
  published: boolean;
  created_at: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  order_index: number;
}

export interface SubsidySlab {
  size: string;
  subsidy: string;
  example: string;
}

export interface StateScheme {
  state: string;
  details: string;
}

export interface SchemeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  subsidy_slabs: SubsidySlab[];
  state_schemes: StateScheme[];
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  message?: string;
  source_page: string;
  system_size_estimate?: string;
  monthly_bill?: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Converted' | 'Closed';
  created_at: string;
}

export interface DatabaseSchema {
  site_settings: SiteSettings;
  services: ServiceItem[];
  products: ProductItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
  blog_posts: BlogPostItem[];
  team_members: TeamMemberItem[];
  government_schemes: SchemeItem[];
  enquiries: LeadItem[];
}

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');
const TMP_DB_PATH = path.join('/tmp', 'db.json');

export async function getDb(): Promise<DatabaseSchema> {
  // Check /tmp first for serverless environments with runtime edits
  try {
    const tmpData = await fs.readFile(TMP_DB_PATH, 'utf-8');
    return JSON.parse(tmpData) as DatabaseSchema;
  } catch {
    // Fall back to bundled src/data/db.json
  }

  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error('Error reading db.json:', error);
    throw new Error('Database file could not be read.');
  }
}

export async function saveDb(data: DatabaseSchema): Promise<void> {
  const content = JSON.stringify(data, null, 2);
  let saved = false;

  // Attempt to write to local codebase file
  try {
    await fs.writeFile(DB_PATH, content, 'utf-8');
    saved = true;
  } catch {
    // File system might be read-only in production serverless (e.g. Vercel)
  }

  // Also write to /tmp so serverless lambdas preserve runtime changes
  try {
    await fs.writeFile(TMP_DB_PATH, content, 'utf-8');
    saved = true;
  } catch {
    // Ignore /tmp write failure
  }

  if (!saved) {
    console.warn('Could not persist to disk, changes stored in memory runtime');
  }
}

// Generate unique ID helper
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}
