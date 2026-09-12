'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ChevronDown, Lock } from 'lucide-react';
import Button from './ui/Button';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Residential Solar', href: '/services/residential' },
      { label: 'Commercial & Industrial', href: '/services/commercial' },
      { label: 'On-Grid / Off-Grid / Hybrid', href: '/services/systems' },
      { label: 'Maintenance & AMC', href: '/services/maintenance' },
    ],
  },
  { label: 'Products', href: '/products' },
  { label: 'Projects', href: '/projects' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'Schemes', href: '/schemes' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [companyName, setCompanyName] = useState('SunTech');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.phone) setPhone(data.phone);
        if (data?.company_name) setCompanyName(data.company_name);
      })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100' : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      {/* Top bar */}
      <div className="bg-slate-900 text-slate-200 text-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-2">
          <p className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            India&apos;s Trusted Solar EPC Company • MNRE Approved
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-green-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-green-400" />
              {phone}
            </a>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full"
            >
              <Lock className="w-3 h-3" /> Admin CMS
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Logo companyName={companyName} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-primary-light flex items-center gap-1"
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>
                {link.children && openDropdown === link.label && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-light hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-green-600 transition-colors"
            >
              <Phone className="w-4 h-4 text-green-600" />
              <span className="hidden xl:inline">{phone}</span>
            </a>
            <Button href="/contact" size="sm" variant="green" className="!rounded-lg px-5 py-2.5 font-semibold text-sm">
              Get a Quote
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <React.Fragment key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-8 py-2.5 text-sm text-gray-600 hover:bg-green-50 hover:text-green-700 rounded-lg transition-colors"
                  >
                    {child.label}
                  </Link>
                ))}
              </React.Fragment>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-700"
              >
                <Phone className="w-5 h-5 text-green-600" />
                {phone}
              </a>
              <Button href="/contact" variant="green" className="w-full !rounded-lg py-3">
                Get a Quote
              </Button>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block text-center py-2 text-xs font-semibold text-gray-500 hover:text-primary"
              >
                Admin CMS Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
