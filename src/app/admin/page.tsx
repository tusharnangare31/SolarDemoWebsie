'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Inbox,
  ShoppingBag,
  Briefcase,
  FileText,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Plus,
  Settings,
  Phone,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { LeadItem, SiteSettings } from '@/lib/db';

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  totalProjects: number;
  totalProducts: number;
  totalArticles: number;
  totalTestimonials: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<LeadItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const [dashRes, setRes] = await Promise.all([
        fetch('/api/dashboard'),
        fetch('/api/settings'),
      ]);
      const dashData = await dashRes.json();
      const setData = await setRes.json();

      if (dashRes.ok) {
        setStats(dashData.stats);
        setRecentLeads(dashData.recentLeads || []);
      }
      if (setRes.ok) {
        setSettings(setData);
      }
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Customer Enquiries',
      value: stats?.totalLeads ?? 0,
      highlight: stats?.newLeads ? `${stats.newLeads} new leads waiting` : 'All reviewed',
      isUrgent: Boolean(stats?.newLeads && stats.newLeads > 0),
      icon: Inbox,
      iconBg: 'bg-blue-50 text-primary',
      href: '/admin/leads',
    },
    {
      title: 'Catalog Equipment',
      value: stats?.totalProducts ?? 0,
      highlight: 'Panels, inverters & batteries',
      icon: ShoppingBag,
      iconBg: 'bg-emerald-50 text-emerald-600',
      href: '/admin/products',
    },
    {
      title: 'Portfolio Projects',
      value: stats?.totalProjects ?? 0,
      highlight: 'Residential & Commercial',
      icon: Briefcase,
      iconBg: 'bg-amber-50 text-amber-600',
      href: '/admin/projects',
    },
    {
      title: 'Published Guides',
      value: stats?.totalArticles ?? 0,
      highlight: 'Solar subsidy & tips',
      icon: FileText,
      iconBg: 'bg-purple-50 text-purple-600',
      href: '/admin/blog',
    },
  ];

  const currentDate = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-8">
      {/* Clean SaaS Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-slate-900 tracking-tight">
              Dashboard
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              Store Control
            </span>
          </div>
          <p className="text-sm text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentDate}</span>
          </p>
        </div>

        {/* Quick actions top pill */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-primary" /> Add Product
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl shadow-sm shadow-primary/25 transition-all"
          >
            <Inbox className="w-3.5 h-3.5" /> View Inquiries
          </Link>
        </div>
      </div>

      {/* 4 Clean Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-heading text-slate-900 tracking-tight">
                  {loading ? '—' : card.value}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span
                  className={`font-medium ${
                    card.isUrgent
                      ? 'text-accent-orange font-semibold flex items-center gap-1'
                      : 'text-slate-400'
                  }`}
                >
                  {card.isUrgent && <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />}
                  {card.highlight}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Grid: Leads Pipeline + Store Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Inquiries (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-heading text-slate-900">
                Latest Customer Enquiries
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Quotes submitted from Website & Solar Calculator
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors"
            >
              All Leads ({stats?.totalLeads ?? 0}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-400 text-xs">Loading inquiries...</div>
          ) : recentLeads.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {recentLeads.map((lead) => {
                const initials = lead.name
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

                return (
                  <div
                    key={lead.id}
                    className="p-4 sm:p-5 hover:bg-slate-50/75 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-200/80">
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm text-slate-900 truncate">
                            {lead.name}
                          </p>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              lead.status === 'New'
                                ? 'bg-blue-50 text-primary border border-blue-100'
                                : lead.status === 'Contacted'
                                ? 'bg-amber-50 text-amber-800 border border-amber-100'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {lead.phone} • {lead.location} • Source:{' '}
                          <span className="font-medium text-slate-700">{lead.source_page}</span>
                          {lead.system_size_estimate && (
                            <span className="ml-1 text-primary font-semibold">
                              ({lead.system_size_estimate})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/91${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)}%2C%20thank%20you%20for%20contacting%20SunTech%20Solar.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <span className="text-[11px] text-slate-400">
                        {new Date(lead.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs">No customer enquiries received yet.</div>
          )}
        </div>

        {/* Store Profile & Fast Editor Links (1 col) */}
        <div className="space-y-6">
          {/* Active Store Details Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold font-heading text-slate-900">
                  Live Shop Profile
                </h3>
              </div>
              <Link
                href="/admin/settings"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Edit
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-slate-400">Store Name</p>
                <p className="font-semibold text-slate-800 text-sm mt-0.5">
                  {settings?.company_name || 'SunTech Solar'}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Customer Helpline</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {settings?.phone || '+91 98765 43210'}
                </p>
              </div>

              <div>
                <p className="text-slate-400">WhatsApp Lead Number</p>
                <p className="font-semibold text-emerald-600 mt-0.5 font-mono">
                  +{settings?.whatsapp_number || '919876543210'}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Shop / Office Address</p>
                <p className="text-slate-700 mt-0.5 line-clamp-2">
                  {settings?.address || 'Jaipur, Rajasthan'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6">
            <h3 className="text-sm font-bold font-heading text-slate-900 mb-3">
              Management Shortcuts
            </h3>
            <div className="space-y-2 text-xs">
              <Link
                href="/admin/products"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium group"
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-primary" /> Manage Products
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </Link>

              <Link
                href="/admin/services"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium group"
              >
                <span className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-emerald-600" /> Edit Solar Services
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </Link>

              <Link
                href="/admin/blog"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium group"
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-purple-600" /> Write Blog Article
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </Link>

              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-medium group"
              >
                <span className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4 text-amber-600" /> Update Website Copy
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
