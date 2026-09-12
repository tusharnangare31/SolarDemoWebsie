import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');
const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

// Helper to create directory
async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

// Generate Solar Panel SVG
function createPanelSVG(title, subtitle, badge, color1 = '#0f2b5c', color2 = '#1e3a8a') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}"/>
      <stop offset="100%" stop-color="${color2}"/>
    </linearGradient>
    <linearGradient id="cell" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e40af"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="sun" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- Subtle Grid Pattern -->
  <g opacity="0.08" stroke="#ffffff" stroke-width="1">
    <line x1="0" y1="100" x2="800" y2="100"/>
    <line x1="0" y1="200" x2="800" y2="200"/>
    <line x1="0" y1="300" x2="800" y2="300"/>
    <line x1="0" y1="400" x2="800" y2="400"/>
    <line x1="0" y1="500" x2="800" y2="500"/>
    <line x1="100" y1="0" x2="100" y2="600"/>
    <line x1="200" y1="0" x2="200" y2="600"/>
    <line x1="300" y1="0" x2="300" y2="600"/>
    <line x1="400" y1="0" x2="400" y2="600"/>
    <line x1="500" y1="0" x2="500" y2="600"/>
    <line x1="600" y1="0" x2="600" y2="600"/>
    <line x1="700" y1="0" x2="700" y2="600"/>
  </g>

  <!-- Solar Panel Graphic Frame -->
  <g transform="translate(180, 80)">
    <!-- Aluminum Frame Outer -->
    <rect x="0" y="0" width="440" height="340" rx="12" fill="#334155" stroke="#94a3b8" stroke-width="4"/>
    <rect x="12" y="12" width="416" height="316" rx="6" fill="#090d16"/>
    
    <!-- 4x3 Solar Cells Array -->
    ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `
      <rect x="${22 + c * 100}" y="${22 + r * 100}" width="94" height="94" rx="4" fill="url(#cell)" opacity="0.9"/>
      <line x1="${22 + c * 100}" y1="${69 + r * 100}" x2="${116 + c * 100}" y2="${69 + r * 100}" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
      <line x1="${69 + c * 100}" y1="${22 + r * 100}" x2="${69 + c * 100}" y2="${116 + r * 100}" stroke="#ffffff" stroke-width="1" opacity="0.3"/>
    `).join('')).join('')}

    <!-- Glass Glare Reflection -->
    <path d="M 20 20 L 220 20 L 300 324 L 20 324 Z" fill="#ffffff" opacity="0.06"/>
  </g>

  <!-- Sun Rays Graphic -->
  <g transform="translate(680, 70)">
    <circle cx="0" cy="0" r="32" fill="url(#sun)" filter="drop-shadow(0 0 16px rgba(245,158,11,0.6))"/>
    <line x1="0" y1="-44" x2="0" y2="-54" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
    <line x1="31" y1="-31" x2="38" y2="-38" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
    <line x1="44" y1="0" x2="54" y2="0" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
    <line x1="31" y1="31" x2="38" y2="38" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Bottom Details Overlay -->
  <rect x="0" y="470" width="800" height="130" fill="#0b132b" opacity="0.95"/>
  <text x="50" y="520" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="24" fill="#ffffff">${title}</text>
  <text x="50" y="555" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#93c5fd">${subtitle}</text>

  <!-- Badge Pill -->
  <g transform="translate(620, 505)">
    <rect x="0" y="0" width="130" height="34" rx="17" fill="#22c55e"/>
    <text x="65" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">${badge}</text>
  </g>
</svg>`;
}

// Generate Inverter / Electronics SVG
function createInverterSVG(title, subtitle, badge) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="inv-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="box" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#inv-bg)"/>

  <!-- Inverter Body -->
  <g transform="translate(250, 70)">
    <!-- Main Shell -->
    <rect x="0" y="0" width="300" height="360" rx="16" fill="url(#box)" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.5))"/>
    
    <!-- Top Display -->
    <rect x="40" y="40" width="220" height="90" rx="8" fill="#0f172a"/>
    <text x="60" y="80" font-family="Courier, monospace" font-weight="bold" font-size="20" fill="#22c55e">GRID: 230V OK</text>
    <text x="60" y="105" font-family="Courier, monospace" font-size="15" fill="#38bdf8">PWR: 5.2 kW | 98%</text>

    <!-- LED Status Dots -->
    <circle cx="70" cy="165" r="6" fill="#22c55e"/>
    <text x="85" y="169" font-family="sans-serif" font-size="11" font-weight="bold" fill="#475569">POWER</text>

    <circle cx="160" cy="165" r="6" fill="#3b82f6"/>
    <text x="175" y="169" font-family="sans-serif" font-size="11" font-weight="bold" fill="#475569">SOLAR</text>

    <circle cx="230" cy="165" r="6" fill="#10b981"/>
    <text x="245" y="169" font-family="sans-serif" font-size="11" font-weight="bold" fill="#475569">WIFI</text>

    <!-- Air vents grill -->
    ${[0, 1, 2, 3, 4, 5].map(i => `
      <rect x="50" y="${200 + i * 16}" width="200" height="6" rx="3" fill="#cbd5e1"/>
    `).join('')}

    <!-- Brand emblem -->
    <rect x="110" y="315" width="80" height="22" rx="4" fill="#0056b3"/>
    <text x="150" y="330" font-family="sans-serif" font-weight="bold" font-size="11" fill="#ffffff" text-anchor="middle">SUNTECH</text>
  </g>

  <!-- Bottom Details Overlay -->
  <rect x="0" y="470" width="800" height="130" fill="#090d16" opacity="0.95"/>
  <text x="50" y="520" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="24" fill="#ffffff">${title}</text>
  <text x="50" y="555" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">${subtitle}</text>

  <!-- Badge Pill -->
  <g transform="translate(620, 505)">
    <rect x="0" y="0" width="130" height="34" rx="17" fill="#0284c7"/>
    <text x="65" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">${badge}</text>
  </g>
</svg>`;
}

// Generate Battery SVG
function createBatterySVG(title, subtitle, badge) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="bat-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#27272a"/>
    </linearGradient>
    <linearGradient id="bat-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#22c55e"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#bat-bg)"/>

  <!-- Battery Unit -->
  <g transform="translate(260, 80)">
    <!-- Battery Outer Case -->
    <rect x="0" y="0" width="280" height="340" rx="16" fill="#3f3f46" stroke="#71717a" stroke-width="2"/>
    
    <!-- Front Faceplate -->
    <rect x="15" y="15" width="250" height="310" rx="8" fill="#18181b"/>

    <!-- LED Charge Gauge (4 bars) -->
    <text x="35" y="60" font-family="sans-serif" font-weight="bold" font-size="13" fill="#a1a1aa">BATTERY LEVEL (100%)</text>
    <rect x="35" y="75" width="45" height="12" rx="3" fill="#22c55e"/>
    <rect x="85" y="75" width="45" height="12" rx="3" fill="#22c55e"/>
    <rect x="135" y="75" width="45" height="12" rx="3" fill="#22c55e"/>
    <rect x="185" y="75" width="45" height="12" rx="3" fill="#22c55e"/>

    <!-- LiFePO4 Chemistry badge -->
    <rect x="35" y="120" width="210" height="120" rx="8" fill="#27272a"/>
    <text x="140" y="170" font-family="sans-serif" font-weight="bold" font-size="28" fill="#22c55e" text-anchor="middle">LiFePO4</text>
    <text x="140" y="200" font-family="sans-serif" font-size="13" fill="#d4d4d8" text-anchor="middle">48V • 6,000+ Deep Cycles</text>

    <!-- Power button -->
    <circle cx="140" cy="285" r="18" fill="#0056b3"/>
    <path d="M 140 275 L 140 285" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 134 279 A 8 8 0 1 0 146 279" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>

  <!-- Bottom Details Overlay -->
  <rect x="0" y="470" width="800" height="130" fill="#090d16" opacity="0.95"/>
  <text x="50" y="520" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="24" fill="#ffffff">${title}</text>
  <text x="50" y="555" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#a1a1aa">${subtitle}</text>

  <!-- Badge Pill -->
  <g transform="translate(620, 505)">
    <rect x="0" y="0" width="130" height="34" rx="17" fill="#f59e0b"/>
    <text x="65" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">${badge}</text>
  </g>
</svg>`;
}

// Generate Mounting Structure SVG
function createMountingSVG(title, subtitle, badge) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="mount-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="url(#mount-bg)"/>

  <!-- Structural Frame Graphic -->
  <g transform="translate(180, 90)">
    <!-- Base Rails -->
    <line x1="20" y1="320" x2="420" y2="320" stroke="#94a3b8" stroke-width="12" stroke-linecap="round"/>
    
    <!-- Angled Stanchions -->
    <polygon points="60,320 180,100 200,100 80,320" fill="#cbd5e1"/>
    <polygon points="260,320 380,100 400,100 280,320" fill="#cbd5e1"/>

    <!-- Tilted Mounting Rail -->
    <rect x="130" y="80" width="310" height="24" rx="4" transform="rotate(-15 130 80)" fill="#38bdf8"/>
    
    <!-- Clamps & Fasteners -->
    <circle cx="170" cy="110" r="8" fill="#f8fafc"/>
    <circle cx="280" cy="80" r="8" fill="#f8fafc"/>
    <circle cx="390" cy="50" r="8" fill="#f8fafc"/>

    <!-- Wind Load Arrow -->
    <g transform="translate(30, 80)">
      <path d="M 0 0 L 50 0 M 35 -10 L 50 0 L 35 10" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
      <text x="60" y="6" font-family="sans-serif" font-weight="bold" font-size="14" fill="#f59e0b">180 KM/H WIND RESISTANT</text>
    </g>
  </g>

  <!-- Bottom Details Overlay -->
  <rect x="0" y="470" width="800" height="130" fill="#090d16" opacity="0.95"/>
  <text x="50" y="520" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="24" fill="#ffffff">${title}</text>
  <text x="50" y="555" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">${subtitle}</text>

  <!-- Badge Pill -->
  <g transform="translate(620, 505)">
    <rect x="0" y="0" width="130" height="34" rx="17" fill="#64748b"/>
    <text x="65" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="13" fill="#ffffff" text-anchor="middle">${badge}</text>
  </g>
</svg>`;
}

// Generate Project Installation SVG
function createProjectSVG(title, location, capacity, type) {
  const typeColor = type === 'Residential' ? '#22c55e' : type === 'Commercial' ? '#0284c7' : '#f59e0b';
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284c7"/>
      <stop offset="60%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#bae6fd"/>
    </linearGradient>
    <linearGradient id="p-cell" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f2b5c"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
  </defs>
  
  <!-- Sky -->
  <rect width="800" height="420" fill="url(#sky)"/>
  
  <!-- Sun in sky -->
  <circle cx="680" cy="90" r="50" fill="#fef08a" opacity="0.9"/>
  <circle cx="680" cy="90" r="65" fill="#fef08a" opacity="0.4"/>

  <!-- Building / Rooftop Structure -->
  <rect x="100" y="220" width="600" height="250" fill="#475569"/>
  <polygon points="80,220 720,220 640,140 160,140" fill="#334155"/>

  <!-- Rooftop Solar Arrays (Perspective) -->
  <g transform="translate(180, 155)">
    <polygon points="0,50 440,50 400,0 40,0" fill="#0f172a"/>
    ${[0, 1, 2].map(r => [0, 1, 2, 3, 4, 5].map(c => `
      <polygon points="${20 + c * 60},${45 - r * 14} ${75 + c * 60},${45 - r * 14} ${70 + c * 60},${35 - r * 14} ${15 + c * 60},${35 - r * 14}" fill="url(#p-cell)" stroke="#93c5fd" stroke-width="1"/>
    `).join('')).join('')}
  </g>

  <!-- Windows on Building -->
  ${[0, 1].map(r => [0, 1, 2, 3, 4, 5].map(c => `
    <rect x="${150 + c * 85}" y="${250 + r * 70}" width="50" height="45" rx="4" fill="#94a3b8" opacity="0.8"/>
  `).join('')).join('')}

  <!-- Ground -->
  <rect x="0" y="420" width="800" height="50" fill="#15803d"/>

  <!-- Bottom Details Overlay -->
  <rect x="0" y="470" width="800" height="130" fill="#0f172a"/>
  <text x="50" y="515" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="22" fill="#ffffff">${title}</text>
  <text x="50" y="550" font-family="system-ui, -apple-system, sans-serif" font-size="14" fill="#94a3b8">📍 ${location}</text>

  <!-- Sector & Capacity Pills -->
  <g transform="translate(600, 495)">
    <rect x="0" y="0" width="150" height="30" rx="15" fill="${typeColor}"/>
    <text x="75" y="20" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="12" fill="#ffffff" text-anchor="middle">${type} • ${capacity}</text>
  </g>
</svg>`;
}

// Generate Service Hero SVG
function createServiceSVG(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="srv-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#003d82"/>
      <stop offset="100%" stop-color="#0056b3"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#srv-bg)"/>

  <!-- Geometric Decorative Lines -->
  <g opacity="0.1" stroke="#ffffff" stroke-width="2">
    <circle cx="700" cy="100" r="180" fill="none"/>
    <circle cx="700" cy="100" r="260" fill="none"/>
    <circle cx="100" cy="400" r="140" fill="none"/>
  </g>

  <!-- Central Icon Graphic (Solar Array + Battery) -->
  <g transform="translate(320, 100)">
    <!-- Sunburst -->
    <circle cx="80" cy="80" r="50" fill="#f59e0b" opacity="0.9"/>
    <!-- Solar Panels -->
    <polygon points="0,170 160,170 140,110 20,110" fill="#1e40af" stroke="#ffffff" stroke-width="2"/>
    <line x1="80" y1="110" x2="80" y2="170" stroke="#ffffff" stroke-width="2"/>
    <line x1="10" y1="140" x2="150" y2="140" stroke="#ffffff" stroke-width="1.5"/>
  </g>

  <!-- Bottom Details Overlay -->
  <rect x="0" y="360" width="800" height="140" fill="#090d16" opacity="0.95"/>
  <text x="50" y="415" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="28" fill="#ffffff">${title}</text>
  <text x="50" y="450" font-family="system-ui, -apple-system, sans-serif" font-size="15" fill="#93c5fd">${subtitle}</text>
</svg>`;
}

// Generate Blog Post Cover SVG
function createBlogSVG(title, category) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="blog-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#blog-bg)"/>

  <!-- Energy Chart Graphics -->
  <g transform="translate(80, 100)" opacity="0.3">
    <path d="M 0 180 Q 150 40 300 120 T 640 60" fill="none" stroke="#22c55e" stroke-width="4"/>
    <path d="M 0 220 Q 150 100 300 160 T 640 100" fill="none" stroke="#38bdf8" stroke-width="3"/>
  </g>

  <g transform="translate(620, 80)">
    <circle cx="0" cy="0" r="40" fill="#f59e0b"/>
    <path d="M -15 -5 L 0 -20 L 15 -5" stroke="#ffffff" stroke-width="4" fill="none" stroke-linecap="round"/>
    <line x1="0" y1="-20" x2="0" y2="15" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Bottom Details Overlay -->
  <rect x="0" y="340" width="800" height="160" fill="#090d16" opacity="0.96"/>
  
  <!-- Category Tag -->
  <g transform="translate(50, 370)">
    <rect x="0" y="0" width="130" height="26" rx="13" fill="#3b82f6" opacity="0.3"/>
    <text x="65" y="17" font-family="sans-serif" font-weight="bold" font-size="11" fill="#60a5fa" text-anchor="middle">${category.toUpperCase()}</text>
  </g>

  <text x="50" y="435" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="22" fill="#ffffff">${title.length > 50 ? title.substring(0, 48) + '...' : title}</text>
  <text x="50" y="468" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#94a3b8">SunTech Solar Knowledge Hub • Published Guide</text>
</svg>`;
}

// Generate Avatar SVG
function createAvatarSVG(initials, name, role) {
  const colors = [
    ['#0056b3', '#0284c7'],
    ['#059669', '#10b981'],
    ['#d97706', '#f59e0b'],
    ['#7c3aed', '#8b5cf6'],
    ['#dc2626', '#ef4444'],
  ];
  const charCode = (initials.charCodeAt(0) || 0) % colors.length;
  const [c1, c2] = colors[charCode];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="av-grad-${initials}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#av-grad-${initials})"/>
  
  <circle cx="200" cy="160" r="80" fill="#ffffff" opacity="0.2"/>
  <text x="200" y="190" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="72" fill="#ffffff" text-anchor="middle">${initials}</text>
  
  <!-- Name & Role -->
  <rect x="0" y="300" width="400" height="100" fill="#090d16" opacity="0.9"/>
  <text x="200" y="340" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="18" fill="#ffffff" text-anchor="middle">${name}</text>
  <text x="200" y="365" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#cbd5e1" text-anchor="middle">${role}</text>
</svg>`;
}

async function main() {
  console.log('Generating dummy solar images...');

  // Ensure directories exist
  await ensureDir(path.join(IMAGES_DIR, 'services'));
  await ensureDir(path.join(IMAGES_DIR, 'products'));
  await ensureDir(path.join(IMAGES_DIR, 'projects'));
  await ensureDir(path.join(IMAGES_DIR, 'testimonials'));
  await ensureDir(path.join(IMAGES_DIR, 'blog'));
  await ensureDir(path.join(IMAGES_DIR, 'team'));

  // 1. Services
  await fs.writeFile(
    path.join(IMAGES_DIR, 'services', 'residential.svg'),
    createServiceSVG('Residential Rooftop Solar', 'Up to 90% Bill Reduction & PM Surya Ghar Subsidy')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'services', 'commercial.svg'),
    createServiceSVG('Commercial & Industrial Solar', 'High-Yield Turnkey Solar Plants with Accelerated Depreciation')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'services', 'systems.svg'),
    createServiceSVG('On-Grid, Off-Grid & Hybrid', 'Battery Storage with Zero Power Outages')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'services', 'maintenance.svg'),
    createServiceSVG('Solar Maintenance & AMC', 'Quarterly Health Inspections & Panel Cleaning')
  );

  // 2. Products
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'panel-mono.svg'),
    createPanelSVG('MonoCrystalline 545W Panel', 'Tier-1 Mono PERC Cell Technology • 25-Yr Warranty', '545 Wp')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'panel-bifacial.svg'),
    createPanelSVG('Bifacial 550W Panel', 'Dual-Sided Sunlight Capture • Up to 20% Extra Yield', '550 Wp', '#0f2347', '#173673')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'panel-poly.svg'),
    createPanelSVG('PolyCrystalline 335W Panel', 'Cost-Effective Commercial Multi-Busbar Solar Module', '335 Wp', '#1e3a8a', '#2563eb')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'inverter-5kw.svg'),
    createInverterSVG('On-Grid Inverter 5kW', 'Smart Grid-Tied Inverter with Built-in Wi-Fi Monitoring', '5 kW')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'inverter-10kw.svg'),
    createInverterSVG('Hybrid Inverter 10kW', 'Three Phase Battery-Compatible Solar Inverter', '10 kW')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'inverter-50kw.svg'),
    createInverterSVG('String Inverter 50kW', 'Multi-MPPT High Efficiency Commercial Inverter', '50 kW')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'battery-5kwh.svg'),
    createBatterySVG('Lithium Battery 5kWh', 'LiFePO4 Chemistry • 6,000+ Deep Cycles • 10-Yr Warranty', '5 kWh')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'battery-10kwh.svg'),
    createBatterySVG('Lithium Battery 10kWh', 'High-Capacity Whole Home & Commercial Backup System', '10 kWh')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'mount-roof.svg'),
    createMountingSVG('Aluminium Roof Mount', 'Corrosion Resistant Aluminum 6063-T6 Structure', 'Roof Mount')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'products', 'mount-ground.svg'),
    createMountingSVG('GI Ground Mount', 'Hot-Dip Galvanized Iron Structure for Solar Farms', 'Ground Mount')
  );

  // 3. Projects
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'residential-1.svg'),
    createProjectSVG('Sharma Residence Solar Rooftop', 'Jaipur, Rajasthan', '10 kW', 'Residential')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'commercial-1.svg'),
    createProjectSVG('GreenTech Office Complex', 'Gurugram, Haryana', '150 kW', 'Commercial')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'industrial-1.svg'),
    createProjectSVG('Patel Manufacturing Unit', 'Ahmedabad, Gujarat', '500 kW', 'Industrial')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'residential-2.svg'),
    createProjectSVG('Sunrise Apartments Society', 'Pune, Maharashtra', '50 kW', 'Residential')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'commercial-2.svg'),
    createProjectSVG('Royal Hotel & Resort Hybrid', 'Udaipur, Rajasthan', '200 kW', 'Commercial')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'industrial-2.svg'),
    createProjectSVG('AutoParts Industries MW Plant', 'Chennai, Tamil Nadu', '1 MW', 'Industrial')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'commercial-3.svg'),
    createProjectSVG('City Mall Solar & EV Station', 'Lucknow, UP', '300 kW', 'Commercial')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'projects', 'residential-3.svg'),
    createProjectSVG('Kumar Farmhouse Off-Grid', 'Nashik, Maharashtra', '15 kW', 'Residential')
  );

  // 4. Testimonials
  await fs.writeFile(path.join(IMAGES_DIR, 'testimonials', 'avatar-1.svg'), createAvatarSVG('RA', 'Rakesh Agarwal', 'Jaipur'));
  await fs.writeFile(path.join(IMAGES_DIR, 'testimonials', 'avatar-2.svg'), createAvatarSVG('SD', 'Sunita Devi', 'Pune'));
  await fs.writeFile(path.join(IMAGES_DIR, 'testimonials', 'avatar-3.svg'), createAvatarSVG('ME', 'Mohit Enterprises', 'Ahmedabad'));
  await fs.writeFile(path.join(IMAGES_DIR, 'testimonials', 'avatar-4.svg'), createAvatarSVG('KS', 'Dr. Kavita Sharma', 'Delhi NCR'));
  await fs.writeFile(path.join(IMAGES_DIR, 'testimonials', 'avatar-5.svg'), createAvatarSVG('HG', 'Hotel Grandeur', 'Udaipur'));

  // 5. Blog
  await fs.writeFile(
    path.join(IMAGES_DIR, 'blog', 'blog-1.svg'),
    createBlogSVG('Top 5 Benefits of Rooftop Solar for Indian Homes', 'Solar Benefits')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'blog', 'blog-2.svg'),
    createBlogSVG('Complete Guide to Solar Subsidies in India (PM Surya Ghar)', 'Government Schemes')
  );
  await fs.writeFile(
    path.join(IMAGES_DIR, 'blog', 'blog-3.svg'),
    createBlogSVG('Essential Solar Panel Maintenance Tips for Maximum Output', 'Maintenance')
  );

  // 6. Team
  await fs.writeFile(path.join(IMAGES_DIR, 'team', 'ceo.svg'), createAvatarSVG('RS', 'Rajesh Sharma', 'Founder & CEO'));
  await fs.writeFile(path.join(IMAGES_DIR, 'team', 'cto.svg'), createAvatarSVG('PP', 'Priya Patel', 'Chief Technology Officer'));
  await fs.writeFile(path.join(IMAGES_DIR, 'team', 'ops.svg'), createAvatarSVG('AK', 'Amit Kumar', 'Head of Operations'));
  await fs.writeFile(path.join(IMAGES_DIR, 'team', 'sales.svg'), createAvatarSVG('SR', 'Sneha Reddy', 'Sales Director'));
  await fs.writeFile(path.join(IMAGES_DIR, 'team', 'eng.svg'), createAvatarSVG('VS', 'Vikram Singh', 'Head of Engineering'));
  await fs.writeFile(path.join(IMAGES_DIR, 'team', 'support.svg'), createAvatarSVG('MJ', 'Meera Joshi', 'Customer Success Manager'));

  console.log('All dummy images generated successfully.');

  // Update src/data/db.json to point to the new SVG dummy paths (only if not already an uploaded path)
  const dbData = JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));

  // Services
  dbData.services = dbData.services.map(s => ({
    ...s,
    image: s.image && !s.image.startsWith('/uploads/') ? `/images/services/${s.slug}.svg` : s.image
  }));

  // Products
  const prodSlugMap = {
    'prod-1': 'panel-mono',
    'prod-2': 'panel-bifacial',
    'prod-3': 'panel-poly',
    'prod-4': 'inverter-5kw',
    'prod-5': 'inverter-10kw',
    'prod-6': 'inverter-50kw',
    'prod-7': 'battery-5kwh',
    'prod-8': 'battery-10kwh',
    'prod-9': 'mount-roof',
    'prod-10': 'mount-ground',
  };
  dbData.products = dbData.products.map(p => {
    // Preserve uploaded images
    if (p.image && p.image.startsWith('/uploads/')) return p;
    const slug = prodSlugMap[p.id] || 'panel-mono';
    return { ...p, image: `/images/products/${slug}.svg` };
  });

  // Projects
  const projSlugMap = {
    'proj-1': 'residential-1',
    'proj-2': 'commercial-1',
    'proj-3': 'industrial-1',
    'proj-4': 'residential-2',
    'proj-5': 'commercial-2',
    'proj-6': 'industrial-2',
    'proj-7': 'commercial-3',
    'proj-8': 'residential-3',
  };
  dbData.projects = dbData.projects.map(p => {
    if (p.image && p.image.startsWith('/uploads/')) return p;
    const slug = projSlugMap[p.id] || 'residential-1';
    return { ...p, image: `/images/projects/${slug}.svg` };
  });

  // Testimonials
  const testMap = {
    'test-1': 'avatar-1',
    'test-2': 'avatar-2',
    'test-3': 'avatar-3',
    'test-4': 'avatar-4',
    'test-5': 'avatar-5',
  };
  dbData.testimonials = dbData.testimonials.map(t => {
    if (t.photo && t.photo.startsWith('/uploads/')) return t;
    const slug = testMap[t.id] || 'avatar-1';
    return { ...t, photo: `/images/testimonials/${slug}.svg` };
  });

  // Blog
  const blogMap = {
    'blog-1': 'blog-1',
    'blog-2': 'blog-2',
    'blog-3': 'blog-3',
  };
  dbData.blog_posts = dbData.blog_posts.map(b => {
    if (b.cover_image && b.cover_image.startsWith('/uploads/')) return b;
    const slug = blogMap[b.id] || 'blog-1';
    return { ...b, cover_image: `/images/blog/${slug}.svg` };
  });

  // Team
  const teamMap = {
    'team-1': 'ceo',
    'team-2': 'cto',
    'team-3': 'ops',
    'team-4': 'sales',
    'team-5': 'eng',
    'team-6': 'support',
  };
  dbData.team_members = dbData.team_members.map(tm => {
    if (tm.photo && tm.photo.startsWith('/uploads/')) return tm;
    const slug = teamMap[tm.id] || 'ceo';
    return { ...tm, photo: `/images/team/${slug}.svg` };
  });

  await fs.writeFile(DB_PATH, JSON.stringify(dbData, null, 2), 'utf-8');
  console.log('db.json successfully updated with dummy image paths.');
}

main().catch(err => {
  console.error('Error generating images:', err);
  process.exit(1);
});
