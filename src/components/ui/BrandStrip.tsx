import React from 'react';

interface PartnerBrand {
  name: string;
  src: string;
}

const partnerBrands: PartnerBrand[] = [
  { name: 'Tata Power Solar', src: '/images/partners/tata-power.svg' },
  { name: 'Adani Solar', src: '/images/partners/adani-solar.svg' },
  { name: 'Waaree Energies', src: '/images/partners/waaree.svg' },
  { name: 'Havells', src: '/images/partners/havells.svg' },
  { name: 'Luminous', src: '/images/partners/luminous.svg' },
  { name: 'Canadian Solar', src: '/images/partners/canadian-solar.svg' },
  { name: 'Jinko Solar', src: '/images/partners/jinko-solar.svg' },
  { name: 'Growatt', src: '/images/partners/growatt.svg' },
  { name: 'Fronius', src: '/images/partners/fronius.svg' },
  { name: 'Sungrow', src: '/images/partners/sungrow.svg' },
  { name: 'Schneider Electric', src: '/images/partners/schneider-electric.svg' },
  { name: 'ABB', src: '/images/partners/abb.svg' },
  { name: 'Tesla Solar', src: '/images/partners/tesla-solar.svg' },
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
            <img
              src={brand.src}
              alt={brand.name}
              className="h-8 max-w-[140px] w-auto object-contain transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
