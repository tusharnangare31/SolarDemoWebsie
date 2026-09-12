import React from 'react';

const brands = [
  'Tata Solar', 'Adani Solar', 'Havells', 'Luminous', 'Microtek',
  'Growatt', 'Fronius', 'Jinko Solar', 'Canadian Solar', 'Vikram Solar',
];

export default function BrandStrip() {
  return (
    <div className="overflow-hidden py-4">
      <div className="flex gap-12 items-center animate-[marquee_30s_linear_infinite]">
        {[...brands, ...brands].map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            className="flex-shrink-0 h-12 px-6 bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <span className="text-gray-500 font-semibold text-sm whitespace-nowrap">{brand}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

