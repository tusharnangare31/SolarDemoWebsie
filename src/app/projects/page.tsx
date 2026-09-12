'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Zap, Building2, Home, Factory, Loader2 } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { ProjectItem } from '@/lib/db';

const filters = ['All', 'Residential', 'Commercial', 'Industrial'] as const;

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Residential: Home,
  Commercial: Building2,
  Industrial: Factory,
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.type === activeFilter);

  return (
    <div className="pt-28">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary-dark to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Our Projects</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Explore our portfolio of 500+ successful solar installations across India
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          {loading ? (
            <div className="py-24 text-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-500">Loading solar portfolio...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((project) => {
                const Icon = typeIcons[project.type] || Building2;
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <div className="h-44 bg-gradient-to-br from-primary/10 to-accent-green/10 flex items-center justify-center relative overflow-hidden">
                      {project.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <Icon className="w-14 h-14 text-primary/30 group-hover:scale-110 transition-transform" />
                      )}
                      <span
                        className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-xs ${
                          project.type === 'Residential'
                            ? 'bg-emerald-50 text-emerald-700'
                            : project.type === 'Commercial'
                            ? 'bg-blue-50 text-primary'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {project.type}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-dark mb-2 line-clamp-1">{project.title}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {project.location}
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 text-primary font-bold">
                          <Zap className="w-4 h-4" />
                          {project.capacity_kw}
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {project.client_type}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
