'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Zap } from 'lucide-react';
import { ProjectItem } from '@/lib/db';

export default function ProjectCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(() => {});
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const featured = projects.slice(0, 6);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
      >
        {featured.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-[300px] md:w-[340px] snap-start bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-primary/20 to-accent-green/20 relative overflow-hidden flex items-center justify-center">
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <Zap className="w-16 h-16 text-primary/30 group-hover:scale-110 transition-transform" />
              )}
              <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                {project.type}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-dark text-lg mb-2 line-clamp-1">{project.title}</h3>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
              <div className="flex items-center gap-1 text-primary font-semibold text-sm">
                <Zap className="w-4 h-4" />
                {project.capacity_kw}
              </div>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">{project.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer z-10"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer z-10"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
