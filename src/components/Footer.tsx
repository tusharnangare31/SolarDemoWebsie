'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Phone, Mail, MapPin, Globe, MessageCircle, Camera, Briefcase, Play, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { SiteSettings } from '@/lib/db';
import Logo from './Logo';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Solar Calculator', href: '/calculator' },
  { label: 'Government Schemes', href: '/schemes' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Residential Solar', href: '/services/residential' },
  { label: 'Commercial Solar', href: '/services/commercial' },
  { label: 'On-Grid / Off-Grid', href: '/services/systems' },
  { label: 'Solar Maintenance', href: '/services/maintenance' },
  { label: 'Products', href: '/products' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.company_name) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  const phone = settings?.phone || '+91 98765 43210';
  const mail = settings?.email || 'info@suntechsolar.in';
  const address = settings?.address || '123, Solar Tower, MG Road, Jaipur, Rajasthan 302001';
  const companyName = settings?.company_name || 'SunTech';

  const socialLinks = [
    { icon: Globe, href: settings?.social_facebook || '#', label: 'Facebook' },
    { icon: MessageCircle, href: settings?.social_twitter || '#', label: 'Twitter' },
    { icon: Camera, href: settings?.social_instagram || '#', label: 'Instagram' },
    { icon: Briefcase, href: settings?.social_linkedin || '#', label: 'LinkedIn' },
    { icon: Play, href: settings?.social_youtube || '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-dark text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo companyName={companyName} light={true} />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India&apos;s trusted solar EPC company providing end-to-end solar solutions for residential,
              commercial, and industrial customers. MNRE approved with 10+ years of experience.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors text-gray-400 hover:text-white"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold font-heading text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold font-heading text-lg mb-4">Our Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-accent-orange transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-white font-semibold font-heading text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-4 h-4 text-accent-orange mt-0.5 flex-shrink-0" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-accent-orange flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-accent-orange transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-accent-orange flex-shrink-0" />
                <a href={`mailto:${mail}`} className="hover:text-accent-orange transition-colors">
                  {mail}
                </a>
              </li>
            </ul>

            <h4 className="text-white font-semibold text-sm mb-2">Newsletter</h4>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm text-white placeholder-gray-500 border border-gray-700 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-primary rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {companyName} Solar. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="/admin" className="text-xs text-gray-500 hover:text-white transition-colors border border-gray-800 px-2 py-1 rounded">
              CMS Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
