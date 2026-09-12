import React from 'react';

interface LogoProps {
  className?: string;
  companyName?: string;
  light?: boolean;
}

export default function Logo({
  className = '',
  companyName = 'SunTech',
  light = false,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Sun + Leaf Eco Icon */}
      <div className="w-10 h-10 relative shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Sun disc */}
          <circle cx="50" cy="40" r="22" fill="#f59e0b" />
          
          {/* Sun rays */}
          <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
            <line x1="50" y1="8" x2="50" y2="14" />
            <line x1="26" y1="18" x2="31" y2="23" />
            <line x1="74" y1="18" x2="69" y2="23" />
            <line x1="16" y1="40" x2="22" y2="40" />
            <line x1="84" y1="40" x2="78" y2="40" />
            <line x1="27" y1="60" x2="33" y2="55" />
            <line x1="73" y1="60" x2="67" y2="55" />
          </g>

          {/* Green leaves sprouting beneath the sun */}
          {/* Left Leaf */}
          <path
            d="M 50 66 C 30 66 18 52 24 38 C 36 34 50 50 50 66 Z"
            fill="#16a34a"
          />
          <path
            d="M 28 44 C 36 50 44 58 50 66"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Right Leaf */}
          <path
            d="M 50 66 C 70 66 82 52 76 38 C 64 34 50 50 50 66 Z"
            fill="#15803d"
          />
          <path
            d="M 72 44 C 64 50 56 58 50 66"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Small center bud / stalk */}
          <path
            d="M 50 66 L 50 82"
            stroke="#16a34a"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="leading-tight flex flex-col justify-center">
        <span
          className={`text-xl font-bold font-heading tracking-tight ${
            light ? 'text-white' : 'text-slate-900'
          }`}
        >
          {companyName}
        </span>
        <span className="text-sm font-bold tracking-wider text-green-600 uppercase text-[11px] -mt-0.5">
          Solar
        </span>
      </div>
    </div>
  );
}
