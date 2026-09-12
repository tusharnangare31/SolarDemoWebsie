import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ children, className = '', hover = true, padding = 'md' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-100 ${
        hover ? 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300' : ''
      } ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

export function CardImage({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-t-2xl ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
