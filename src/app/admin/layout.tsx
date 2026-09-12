'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ExternalLink, ChevronRight, Home, Shield } from 'lucide-react';
import AdminSidebar from '@/components/admin/AdminSidebar';

const pageTitles: Record<string, string> = {
  '/admin': 'Dashboard Overview',
  '/admin/leads': 'Leads & Enquiries CRM',
  '/admin/products': 'Products Catalog',
  '/admin/services': 'Services Manager',
  '/admin/projects': 'Projects Portfolio',
  '/admin/testimonials': 'Customer Testimonials',
  '/admin/blog': 'Blog Articles',
  '/admin/schemes': 'Government Schemes',
  '/admin/team': 'Team Members',
  '/admin/settings': 'Site Settings',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render full screen without sidebar
  if (pathname === '/admin/login') {
    return <div className="min-h-screen bg-slate-50">{children}</div>;
  }

  const currentTitle = pageTitles[pathname] || pathname.replace('/admin/', '').replace('-', ' ');

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          {/* Left: Mobile hamburger & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
              <Link
                href="/admin"
                className="hover:text-slate-700 flex items-center gap-1 transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-900 font-semibold">{currentTitle}</span>
            </nav>
          </div>

          {/* Right: View Website button & profile tag */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-primary bg-slate-100 hover:bg-slate-200/70 rounded-xl transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>Live Website</span>
            </Link>

            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div className="hidden md:block text-left text-xs leading-tight">
                <p className="font-bold text-slate-800">Shop Admin</p>
                <p className="text-[11px] text-slate-400">Solar Store Manager</p>
              </div>
            </div>
          </div>
        </header>

        {/* Demo Mode Notice Banner */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 sm:px-8 py-2.5 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
            <span className="font-bold">Public Demo / Showcase Mode:</span>
            <span className="text-amber-800 text-xs hidden md:inline">
              Content editing and deletion are locked in view-only mode so visitors can safely inspect the dashboard architecture without altering live data.
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[11px] font-bold tracking-wide shrink-0">
            Read-Only
          </span>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
