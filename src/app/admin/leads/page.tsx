'use client';

import React, { useEffect, useState } from 'react';
import {
  Download,
  Search,
  Filter,
  Trash2,
  Loader2,
  X,
  Inbox,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileSpreadsheet,
  CheckCircle,
  Clock,
  Eye,
} from 'lucide-react';
import toast from 'react-hot-toast';
import DeleteModal from '@/components/admin/DeleteModal';
import { LeadItem } from '@/lib/db';

const statusOptions: LeadItem['status'][] = [
  'New',
  'Contacted',
  'Proposal Sent',
  'Converted',
  'Closed',
];

export default function LeadsCRMPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LeadItem | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [sourceFilter, statusFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (sourceFilter !== 'All') params.set('source', sourceFilter);
      if (statusFilter !== 'All') params.set('status', statusFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/leads?${params.toString()}`);
      const data = await res.json();
      if (res.ok) setLeads(data);
    } catch {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: LeadItem['status']) => {
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Lead status updated to ${newStatus}`);
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/leads?id=${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Lead deleted');
        setDeleteTarget(null);
        fetchLeads();
      } else {
        toast.error('Failed to delete lead');
      }
    } catch {
      toast.error('Network error');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      toast.error('No leads available to export');
      return;
    }

    const headers = [
      'ID',
      'Name',
      'Phone',
      'Email',
      'Location',
      'Source',
      'Estimated Capacity',
      'Monthly Bill',
      'Status',
      'Date Submitted',
      'Message',
    ];

    const rows = leads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.phone}"`,
      `"${l.email || ''}"`,
      `"${l.location.replace(/"/g, '""')}"`,
      `"${l.source_page}"`,
      `"${l.system_size_estimate || ''}"`,
      `"${l.monthly_bill || ''}"`,
      `"${l.status}"`,
      `"${new Date(l.created_at).toLocaleString('en-IN')}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `suntech-solar-leads-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV downloaded successfully');
  };

  const filteredLeads = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.location.toLowerCase().includes(q) ||
      (l.email && l.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Leads & Enquiries</h1>
          <p className="text-sm text-gray-500">
            Review and track quote requests submitted via contact forms and calculator
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow shadow-emerald-600/20 hover:shadow-md transition-all cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export to CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Source Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Source:</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-gray-700"
            >
              <option value="All">All Sources</option>
              <option value="Contact Page">Contact Page</option>
              <option value="Solar Calculator">Solar Calculator</option>
              <option value="Home Page CTA">Home Page CTA</option>
              <option value="Residential Solar">Residential Solar</option>
              <option value="Commercial Solar">Commercial Solar</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg outline-none font-medium text-gray-700"
            >
              <option value="All">All Statuses</option>
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div className="py-24 text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading enquiries...</p>
        </div>
      ) : filteredLeads.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/75 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Source & Requirement</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-semibold text-gray-900">{lead.name}</p>
                        <p className="text-xs text-primary font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </p>
                        {lead.email && (
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {lead.email}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <span className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" /> {lead.location}
                      </span>
                    </td>

                    {/* Source & Requirement */}
                    <td className="py-3.5 px-4">
                      <div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-primary font-medium">
                          {lead.source_page}
                        </span>
                        {lead.system_size_estimate && (
                          <p className="text-xs text-gray-500 mt-1">
                            Estimate: <span className="font-semibold text-gray-800">{lead.system_size_estimate}</span>
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, e.target.value as LeadItem['status'])
                        }
                        className={`text-xs px-2.5 py-1 rounded-full font-semibold border-0 outline-none cursor-pointer ${
                          lead.status === 'New'
                            ? 'bg-blue-100 text-blue-800'
                            : lead.status === 'Contacted'
                            ? 'bg-amber-100 text-amber-800'
                            : lead.status === 'Proposal Sent'
                            ? 'bg-purple-100 text-purple-800'
                            : lead.status === 'Converted'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-gray-500 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-100 transition-colors"
                          title="View lead details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(lead)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center text-gray-400">
          <Inbox className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-semibold text-gray-600">No leads match your criteria</p>
          <p className="text-xs text-gray-400 mt-1">Try clearing filters or search query</p>
        </div>
      )}

      {/* Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1.5 rounded-xl hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  selectedLead.status === 'New'
                    ? 'bg-blue-100 text-blue-800'
                    : selectedLead.status === 'Contacted'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {selectedLead.status}
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Submitted from {selectedLead.source_page}
              </span>
            </div>

            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-1">
              {selectedLead.name}
            </h2>

            <div className="space-y-3 mt-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${selectedLead.phone}`} className="font-semibold hover:underline">
                  {selectedLead.phone}
                </a>
              </div>
              {selectedLead.email && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{selectedLead.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{new Date(selectedLead.created_at).toLocaleString('en-IN')}</span>
              </div>
            </div>

            {(selectedLead.system_size_estimate || selectedLead.monthly_bill) && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50/60 border border-blue-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-500">Estimated System:</p>
                  <p className="font-bold text-gray-900 text-sm">{selectedLead.system_size_estimate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Monthly Bill:</p>
                  <p className="font-bold text-gray-900 text-sm">{selectedLead.monthly_bill || 'N/A'}</p>
                </div>
              </div>
            )}

            {selectedLead.message && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Customer Message:
                </p>
                <div className="p-3.5 rounded-xl bg-gray-50 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
              <a
                href={`https://wa.me/91${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedLead.name)}%2C%20thank%20you%20for%20contacting%20SunTech%20Solar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow transition-colors"
              >
                Chat on WhatsApp
              </a>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(deleteTarget)}
        title={`Delete enquiry from "${deleteTarget?.name}"?`}
        message="This lead record will be permanently deleted from your CRM database."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
