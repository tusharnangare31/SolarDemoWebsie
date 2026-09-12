'use client';

import React, { useState, useEffect } from 'react';
import { Sun, CheckCircle, IndianRupee, ArrowRight, Info, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { SchemeItem } from '@/lib/db';

const defaultEligibilityChecks = [
  'I am a residential electricity consumer',
  'I have a valid electricity connection with a DISCOM',
  'My rooftop has adequate shadow-free area (min 100 sq ft)',
  'I plan to install a grid-connected solar system',
  'I will use an MNRE-empaneled vendor for installation',
];

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState<boolean[]>(
    new Array(defaultEligibilityChecks.length).fill(false)
  );

  useEffect(() => {
    fetch('/api/schemes')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setSchemes(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allChecked = checked.every(Boolean);

  const toggleCheck = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const scheme = schemes[0];

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-accent-green/90 to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
            <Sun className="w-4 h-4 text-accent-orange" />
            <span className="text-sm">Government Schemes</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Solar Subsidies & Schemes
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Take advantage of central and state government subsidies to make solar energy more affordable
          </p>
        </div>
      </section>

      {/* PM Surya Ghar */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={scheme?.title || 'PM Surya Ghar Muft Bijli Yojana'}
            subtitle={
              scheme?.subtitle ||
              'Central government scheme to provide free electricity through rooftop solar to 1 crore homes'
            }
          />

          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading scheme guidelines...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-xl font-bold font-heading text-dark mb-4">Scheme Highlights</h3>
                <ul className="space-y-3">
                  {scheme?.highlights?.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-green mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subsidy table */}
              <div className="bg-light rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-bold font-heading text-dark mb-4 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  Subsidy Structure
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 text-gray-600">System Size</th>
                        <th className="text-left py-3 text-gray-600">Subsidy</th>
                        <th className="text-left py-3 text-gray-600">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheme?.subsidy_slabs?.map((slab, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-3 font-medium text-dark">{slab.size}</td>
                          <td className="py-3 text-accent-green font-semibold">{slab.subsidy}</td>
                          <td className="py-3 text-gray-600">{slab.example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* State subsidies */}
      {scheme?.state_schemes && scheme.state_schemes.length > 0 && (
        <section className="py-20 bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="State-Specific Subsidies"
              subtitle="Additional incentives available from state governments"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {scheme.state_schemes.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-dark mb-2">{item.state}</h3>
                  <p className="text-sm text-gray-600">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Eligibility Checklist */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Check Your Eligibility"
            subtitle="Answer the questions below to see if you qualify for solar subsidies"
          />
          <div className="bg-light rounded-2xl p-8 border border-gray-100">
            <div className="space-y-4">
              {defaultEligibilityChecks.map((check, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() => toggleCheck(i)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <span className="text-gray-700 group-hover:text-dark transition-colors">
                    {check}
                  </span>
                </label>
              ))}
            </div>

            <div
              className={`mt-8 p-6 rounded-xl text-center transition-all ${
                allChecked
                  ? 'bg-accent-green/10 border border-accent-green/30'
                  : 'bg-gray-100'
              }`}
            >
              {allChecked ? (
                <>
                  <CheckCircle className="w-10 h-10 text-accent-green mx-auto mb-2" />
                  <p className="text-lg font-semibold text-accent-green">
                    You qualify for central & state solar subsidies!
                  </p>
                  <p className="text-sm text-gray-600 mt-1 mb-4">
                    Contact our team to get end-to-end DISCOM net metering and subsidy processing.
                  </p>
                  <Button href="/contact" icon={ArrowRight} iconPosition="right">
                    Apply Through SunTech
                  </Button>
                </>
              ) : (
                <>
                  <Info className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm font-medium">
                    Check all boxes that apply to see your subsidy qualification status
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
