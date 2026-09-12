'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Sun, Zap, Award, Users } from 'lucide-react';

const stats = [
  { icon: Sun, value: 500, suffix: '+', label: 'Installations Completed' },
  { icon: Zap, value: 50, suffix: ' MW', label: 'Capacity Installed' },
  { icon: Award, value: 10, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 98, suffix: '%', label: 'Customer Satisfaction' },
];

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start]);

  return count;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="bg-primary py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatItem({
  icon: Icon,
  value,
  suffix,
  label,
  isVisible,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  isVisible: boolean;
}) {
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div className="text-center">
      <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent-orange mx-auto mb-3" />
      <div className="text-3xl md:text-4xl font-bold text-white font-heading">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-blue-200 mt-1">{label}</div>
    </div>
  );
}
