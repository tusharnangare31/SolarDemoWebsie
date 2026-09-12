-- Supabase SQL Schema for Solar EPC Website CMS
-- Run this script in the Supabase SQL Editor

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'SunTech Solar',
  tagline TEXT DEFAULT 'Power Your Future with Clean Solar Energy',
  phone TEXT NOT NULL DEFAULT '+91 98765 43210',
  phone_alt TEXT DEFAULT '+91 98765 43211',
  whatsapp_number TEXT NOT NULL DEFAULT '919876543210',
  email TEXT NOT NULL DEFAULT 'info@suntechsolar.in',
  email_sales TEXT DEFAULT 'sales@suntechsolar.in',
  address TEXT NOT NULL DEFAULT '123, Solar Tower, MG Road, Jaipur, Rajasthan 302001',
  working_hours TEXT DEFAULT 'Mon - Sat: 9:00 AM - 7:00 PM',
  map_url TEXT DEFAULT 'https://maps.google.com',
  hero_title TEXT DEFAULT 'Power Your Future with Solar Energy',
  hero_subtitle TEXT DEFAULT 'Save up to 90% on electricity bills with India''s trusted solar installation company. Residential, commercial & industrial solar solutions with government subsidy assistance.',
  hero_cta_primary TEXT DEFAULT 'Get Free Quote',
  hero_cta_secondary TEXT DEFAULT 'Calculate Savings',
  social_facebook TEXT DEFAULT 'https://facebook.com',
  social_twitter TEXT DEFAULT 'https://twitter.com',
  social_instagram TEXT DEFAULT 'https://instagram.com',
  social_linkedin TEXT DEFAULT 'https://linkedin.com',
  social_youtube TEXT DEFAULT 'https://youtube.com',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sun',
  image TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  specs JSONB DEFAULT '[]'::jsonb,
  image TEXT,
  price NUMERIC DEFAULT 0,
  is_enquire_only BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity_kw TEXT NOT NULL,
  type TEXT NOT NULL, -- 'Residential', 'Commercial', 'Industrial'
  client_type TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  system_type TEXT NOT NULL,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  message TEXT NOT NULL,
  photo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category TEXT NOT NULL,
  author TEXT DEFAULT 'SunTech Solar Team',
  read_time TEXT DEFAULT '5 min read',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Team Members Table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Government Schemes Table
CREATE TABLE IF NOT EXISTS government_schemes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb,
  subsidy_slabs JSONB DEFAULT '[]'::jsonb,
  state_schemes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Enquiries / Leads Table
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  location TEXT NOT NULL,
  message TEXT,
  source_page TEXT NOT NULL DEFAULT 'Contact Page',
  system_size_estimate TEXT,
  monthly_bill TEXT,
  status TEXT NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'Proposal Sent', 'Converted', 'Closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Storage Bucket for Solar Media
INSERT INTO storage.buckets (id, name, public)
VALUES ('solar-media', 'solar-media', true)
ON CONFLICT (id) DO NOTHING;

-- 12. Row Level Security Policies
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read government_schemes" ON government_schemes FOR SELECT USING (true);

-- Anyone can insert a new enquiry (lead)
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) have full CRUD access
CREATE POLICY "Admin full access site_settings" ON site_settings TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access services" ON services TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access products" ON products TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access projects" ON projects TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access testimonials" ON testimonials TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blog_posts" ON blog_posts TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access team_members" ON team_members TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access government_schemes" ON government_schemes TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access enquiries" ON enquiries TO authenticated USING (true) WITH CHECK (true);

-- Storage public read policy
CREATE POLICY "Public media access" ON storage.objects FOR SELECT USING (bucket_id = 'solar-media');
CREATE POLICY "Admin media upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'solar-media');
CREATE POLICY "Admin media delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'solar-media');
