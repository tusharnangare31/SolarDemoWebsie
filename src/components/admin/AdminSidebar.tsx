'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Wrench,
  ShoppingBag,
  Briefcase,
  Star,
  FileText,
  Users,
  Award,
  Inbox,
  LogOut,
  ExternalLink,
  Sun,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface NavGroup {
  group: string;
  items: {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

interface AdminSidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function AdminSidebar({
  mobileOpen = false,
  onCloseMobile,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [newLeadsCount, setNewLeadsCount] = useState<number>(0);
  const [companyName, setCompanyName] = useState('SunTech');

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        if (data?.stats?.newLeads) {
          setNewLeadsCount(data.stats.newLeads);
        }
      })
      .catch(() => {});

    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data?.company_name) setCompanyName(data.company_name);
      })
      .catch(() => {});
  }, [pathname]);

  const navGroups: NavGroup[] = [
    {
      group: 'OVERVIEW',
      items: [
        { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        {
          label: 'Leads & Enquiries',
          href: '/admin/leads',
          icon: Inbox,
          badge: newLeadsCount > 0 ? `${newLeadsCount} new` : undefined,
        },
      ],
    },
    {
      group: 'CATALOG & SERVICES',
      items: [
        { label: 'Products', href: '/admin/products', icon: ShoppingBag },
        { label: 'Services', href: '/admin/services', icon: Wrench },
        { label: 'Projects Portfolio', href: '/admin/projects', icon: Briefcase },
        { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
      ],
    },
    {
      group: 'CONTENT & INFO',
      items: [
        { label: 'Blog Articles', href: '/admin/blog', icon: FileText },
        { label: 'Govt Schemes', href: '/admin/schemes', icon: Award },
        { label: 'Team Members', href: '/admin/team', icon: Users },
        { label: 'Site Settings', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin/login');
      router.refresh();
    } catch {
      toast.error('Failed to log out');
    }
  };

  const content = (
    <div className="h-full flex flex-col justify-between bg-white text-slate-700 w-64 border-r border-slate-200/80 select-none">
      <div className="flex-1 overflow-y-auto px-4 py-5 scrollbar-hide">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <Sun className="w-5 h-5 text-accent-orange" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold font-heading text-slate-900 tracking-tight">
                  {companyName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase">
                  CMS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Control Center</p>
            </div>
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Live Status Pill */}
        <div className="mb-6 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-800">Store Live & Online</span>
          </div>
          <Link
            href="/"
            target="_blank"
            className="text-[11px] text-emerald-700 hover:underline flex items-center gap-0.5 font-medium"
          >
            Visit <ExternalLink className="w-2.5 h-2.5" />
          </Link>
        </div>

        {/* Navigation Groups */}
        <div className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.group}>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-2">
                {group.group}
              </p>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-primary text-white shadow-sm font-semibold shadow-primary/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? 'text-white' : 'text-slate-400'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge ? (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            isActive
                              ? 'bg-white text-primary'
                              : 'bg-accent-orange/15 text-accent-orange'
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : isActive ? (
                        <ChevronRight className="w-3.5 h-3.5 text-white/70" />
                      ) : null}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile / Logout Footer */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/50">
        <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
              <ShieldCheck className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">Admin Owner</p>
              <p className="text-[11px] text-slate-400 truncate">Store Manager</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            title="Sign out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 shrink-0 z-30">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs animate-fade-in"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex z-10 animate-slide-in-left">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
