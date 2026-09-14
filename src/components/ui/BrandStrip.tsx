import React from 'react';

interface PartnerBrand {
  name: string;
  logo: React.ReactNode;
}

const partnerBrands: PartnerBrand[] = [
  {
    name: 'Tata Power Solar',
    logo: (
      <div className="flex items-center gap-2.5">
        <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
          <circle cx="16" cy="16" r="15" fill="#00569b" />
          <path d="M8 12h16M16 12v12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-sm tracking-tight text-[#00569b]">TATA POWER</span>
          <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase">SOLAR</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Adani Solar',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <path d="M4 22C4 12 12 4 22 4" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M10 26C10 18 16 12 24 12" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="8" r="4" fill="#f59e0b" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-base tracking-tight text-slate-800">adani</span>
          <span className="text-[10px] font-semibold tracking-wider text-blue-600 uppercase -mt-0.5">Solar</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Havells',
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-extrabold text-xs shadow-xs">
          H
        </div>
        <span className="font-extrabold text-base tracking-wider text-rose-600">HAVELLS</span>
      </div>
    ),
  },
  {
    name: 'Luminous',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none">
          <path d="M14 2L18 10L26 14L18 18L14 26L10 18L2 14L10 10L14 2Z" fill="#f59e0b" />
        </svg>
        <span className="font-extrabold text-base tracking-tight text-blue-800">LUMINOUS</span>
      </div>
    ),
  },
  {
    name: 'Waaree',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#16a34a" strokeWidth="2.5" />
          <circle cx="16" cy="16" r="7" fill="#f59e0b" />
          <path d="M16 2v4M16 26v4M2 16h4M26 16h4" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-black text-sm tracking-widest text-emerald-700">WAAREE</span>
          <span className="text-[9px] font-medium text-slate-500">One with the Sun</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Vikram Solar',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 30 30" className="w-7 h-7" fill="none">
          <path d="M6 6L15 24L24 6" stroke="#1d4ed8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15" cy="11" r="3.5" fill="#f59e0b" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-sm tracking-tight text-blue-900">VIKRAM</span>
          <span className="text-[10px] font-bold tracking-widest text-amber-600 uppercase">SOLAR</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Growatt',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none">
          <path d="M4 14C4 8.477 8.477 4 14 4C19.523 4 24 8.477 24 14C24 19.523 19.523 24 14 24" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="14" cy="14" r="4" fill="#16a34a" />
        </svg>
        <span className="font-extrabold text-base tracking-tight text-emerald-600">Growatt</span>
      </div>
    ),
  },
  {
    name: 'Canadian Solar',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 30 30" className="w-7 h-7" fill="none">
          <path d="M15 3L18 10L24 11L20 16L22 22L15 19L8 22L10 16L6 11L12 10L15 3Z" fill="#dc2626" />
        </svg>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-sm tracking-tight text-slate-900">Canadian</span>
          <span className="text-[11px] font-extrabold text-rose-600 -mt-0.5">Solar</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Jinko Solar',
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
          J
        </div>
        <span className="font-extrabold text-base tracking-tight text-slate-800">
          Jinko<span className="text-emerald-600">Solar</span>
        </span>
      </div>
    ),
  },
  {
    name: 'Fronius',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 26 26" className="w-6 h-6" fill="none">
          <circle cx="13" cy="13" r="11" fill="#dc2626" />
          <path d="M9 8h8M9 13h5M9 18h3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="font-black text-base tracking-wider text-rose-700 uppercase">Fronius</span>
      </div>
    ),
  },
  {
    name: 'Microtek',
    logo: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-blue-700 flex items-center justify-center text-amber-400 font-black text-xs">
          M
        </div>
        <span className="font-extrabold text-base tracking-tight text-blue-900">MICROTEK</span>
      </div>
    ),
  },
  {
    name: 'Sungrow',
    logo: (
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 28 28" className="w-6 h-6" fill="none">
          <circle cx="14" cy="14" r="10" stroke="#f97316" strokeWidth="2.5" />
          <circle cx="14" cy="14" r="5" fill="#f97316" />
        </svg>
        <span className="font-extrabold text-base tracking-wider text-orange-600 uppercase">SUNGROW</span>
      </div>
    ),
  },
];

export default function BrandStrip() {
  const doubled = [...partnerBrands, ...partnerBrands];

  return (
    <div className="relative overflow-hidden py-4 group">
      {/* Soft gradient masks at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="flex gap-6 items-center animate-[marquee_35s_linear_infinite] group-hover:[animation-play-state:paused]">
        {doubled.map((brand, i) => (
          <div
            key={`${brand.name}-${i}`}
            className="flex-shrink-0 h-16 px-6 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-xs hover:shadow-md hover:border-green-300 hover:scale-105 transition-all duration-300 cursor-default"
          >
            {brand.logo}
          </div>
        ))}
      </div>
    </div>
  );
}

