'use client';

import React, { useEffect, useState } from 'react';
import { Award, Save, Loader2, Plus, Trash2, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { SchemeItem, SubsidySlab, StateScheme } from '@/lib/db';

export default function SchemesManagerPage() {
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/schemes');
      const data = await res.json();
      if (res.ok) setSchemes(data);
    } catch {
      toast.error('Failed to load schemes');
    } finally {
      setLoading(false);
    }
  };

  const updateScheme = (index: number, field: keyof SchemeItem, value: unknown) => {
    const updated = [...schemes];
    updated[index] = { ...updated[index], [field]: value };
    setSchemes(updated);
  };

  const handleSave = async (scheme: SchemeItem) => {
    setSaving(true);
    try {
      const res = await fetch('/api/schemes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheme),
      });

      if (res.ok) {
        toast.success('Government scheme details saved!');
      } else {
        toast.error('Failed to update scheme');
      }
    } catch {
      toast.error('Network error saving scheme');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
        <p className="text-sm text-gray-500">Loading government schemes...</p>
      </div>
    );
  }

  const scheme = schemes[0];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">Government Schemes</h1>
          <p className="text-sm text-gray-500">
            Configure PM Surya Ghar Yojana subsidies and state-specific incentives
          </p>
        </div>
        {scheme && (
          <button
            onClick={() => handleSave(scheme)}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl shadow shadow-primary/20 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Scheme'}
          </button>
        )}
      </div>

      {scheme && (
        <div className="space-y-6">
          {/* General Information */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Award className="w-5 h-5 text-accent-green" />
              <h2 className="text-lg font-bold font-heading text-gray-900">Scheme Overview</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Scheme Name
                </label>
                <input
                  type="text"
                  value={scheme.title}
                  onChange={(e) => updateScheme(0, 'title', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={scheme.subtitle}
                  onChange={(e) => updateScheme(0, 'subtitle', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Summary Description
              </label>
              <textarea
                rows={3}
                value={scheme.description}
                onChange={(e) => updateScheme(0, 'description', e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Key Highlights */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold font-heading text-gray-900">
              Key Scheme Highlights (One per line)
            </h2>
            <textarea
              rows={4}
              value={scheme.highlights?.join('\n')}
              onChange={(e) =>
                updateScheme(
                  0,
                  'highlights',
                  e.target.value.split('\n').map((l) => l.trim()).filter(Boolean)
                )
              }
              className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono"
            />
          </div>

          {/* Subsidy Slabs */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h2 className="text-lg font-bold font-heading text-gray-900">Subsidy Slabs Table</h2>
              <button
                type="button"
                onClick={() => {
                  const newSlabs = [...(scheme.subsidy_slabs || [])];
                  newSlabs.push({ size: '3 kW to 5 kW', subsidy: 'Flat ₹78,000', example: 'Example' });
                  updateScheme(0, 'subsidy_slabs', newSlabs);
                }}
                className="text-xs font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Slab
              </button>
            </div>

            <div className="space-y-3">
              {scheme.subsidy_slabs?.map((slab, i) => (
                <div key={i} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <input
                    type="text"
                    value={slab.size}
                    placeholder="System Size"
                    onChange={(e) => {
                      const newSlabs = [...scheme.subsidy_slabs];
                      newSlabs[i].size = e.target.value;
                      updateScheme(0, 'subsidy_slabs', newSlabs);
                    }}
                    className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg outline-none"
                  />
                  <input
                    type="text"
                    value={slab.subsidy}
                    placeholder="Subsidy Amount"
                    onChange={(e) => {
                      const newSlabs = [...scheme.subsidy_slabs];
                      newSlabs[i].subsidy = e.target.value;
                      updateScheme(0, 'subsidy_slabs', newSlabs);
                    }}
                    className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg outline-none font-semibold text-accent-green"
                  />
                  <input
                    type="text"
                    value={slab.example}
                    placeholder="Example text"
                    onChange={(e) => {
                      const newSlabs = [...scheme.subsidy_slabs];
                      newSlabs[i].example = e.target.value;
                      updateScheme(0, 'subsidy_slabs', newSlabs);
                    }}
                    className="flex-1 px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg outline-none text-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newSlabs = scheme.subsidy_slabs.filter((_, idx) => idx !== i);
                      updateScheme(0, 'subsidy_slabs', newSlabs);
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
