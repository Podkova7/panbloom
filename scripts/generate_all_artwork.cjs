const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Visual themes for the 12 motifs
function renderBase(theme) {
  return `
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${theme.bgStart}"/>
        <stop offset="50%" stop-color="${theme.bgMid}"/>
        <stop offset="100%" stop-color="${theme.bgEnd}"/>
      </linearGradient>
      <radialGradient id="glow1" cx="65%" cy="35%" r="55%">
        <stop offset="0%" stop-color="${theme.accent1}" stop-opacity="0.32"/>
        <stop offset="100%" stop-color="${theme.bgMid}" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glow2" cx="35%" cy="65%" r="50%">
        <stop offset="0%" stop-color="${theme.accent2}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="${theme.bgStart}" stop-opacity="0"/>
      </radialGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.035)" stroke-width="1"/>
        <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.06)"/>
      </pattern>
      <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.2)"/>
        <stop offset="100%" stop-color="rgba(255,255,255,0.02)"/>
      </linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#bgGrad)"/>
    <rect width="1280" height="720" fill="url(#grid)"/>
    <circle cx="820" cy="280" r="420" fill="url(#glow1)"/>
    <circle cx="360" cy="460" r="380" fill="url(#glow2)"/>
  `;
}

// 1. Controller Gaming
function visualControllerGaming(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(240, 190)">
      <!-- Left Grip -->
      <path d="M 40 40 C 20 40 0 70 0 120 L 0 220 C 0 280 30 310 60 310 L 130 310 L 130 40 Z" fill="#1b162b" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <circle cx="65" cy="120" r="32" fill="#130f1f" stroke="${theme.accent1}" stroke-width="2.5"/>
      <circle cx="65" cy="120" r="10" fill="${theme.accent1}" opacity="0.8"/>
      <!-- D-Pad -->
      <rect x="57" y="195" width="16" height="50" rx="3" fill="#29203d" stroke="rgba(255,255,255,0.15)"/>
      <rect x="40" y="212" width="50" height="16" rx="3" fill="#29203d" stroke="rgba(255,255,255,0.15)"/>
      <!-- Central Phone Frame -->
      <rect x="130" y="20" width="540" height="290" rx="24" fill="#0c0817" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <rect x="142" y="32" width="516" height="266" rx="16" fill="#171026"/>
      <!-- Screen HUD -->
      <circle cx="400" cy="165" r="70" fill="none" stroke="${theme.accent2}" stroke-width="2" stroke-dasharray="16 8"/>
      <circle cx="400" cy="165" r="35" fill="none" stroke="${theme.accent1}" stroke-width="1.5"/>
      <line x1="400" y1="75" x2="400" y2="120" stroke="${theme.accent1}" stroke-width="2"/>
      <line x1="400" y1="210" x2="400" y2="255" stroke="${theme.accent1}" stroke-width="2"/>
      <line x1="310" y1="165" x2="355" y2="165" stroke="${theme.accent1}" stroke-width="2"/>
      <line x1="445" y1="165" x2="490" y2="165" stroke="${theme.accent1}" stroke-width="2"/>
      <!-- Right Grip -->
      <path d="M 670 40 L 740 40 C 770 40 800 70 800 120 L 800 220 C 800 280 770 310 740 310 L 670 310 Z" fill="#1b162b" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <circle cx="735" cy="120" r="10" fill="#29203d" stroke="${theme.accent2}" stroke-width="1.5"/>
      <circle cx="750" cy="135" r="10" fill="#29203d" stroke="${theme.accent1}" stroke-width="1.5"/>
      <circle cx="735" cy="150" r="10" fill="#29203d" stroke="#10b981" stroke-width="1.5"/>
      <circle cx="720" cy="135" r="10" fill="#29203d" stroke="#f59e0b" stroke-width="1.5"/>
      <circle cx="735" cy="225" r="32" fill="#130f1f" stroke="${theme.accent2}" stroke-width="2.5"/>
      <circle cx="735" cy="225" r="10" fill="${theme.accent2}" opacity="0.8"/>
    </g>
  </svg>`;
}

// 2. Thermal Cooling
function visualThermalCooling(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Fan Outer Housing -->
      <circle cx="0" cy="0" r="220" fill="#0d1527" stroke="${theme.accent1}" stroke-width="3"/>
      <circle cx="0" cy="0" r="190" fill="#111c33" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
      <!-- Concentric Thermal Rings -->
      <circle cx="0" cy="0" r="280" fill="none" stroke="${theme.accent2}" stroke-width="2" stroke-dasharray="14 10" opacity="0.4"/>
      <circle cx="0" cy="0" r="340" fill="none" stroke="${theme.accent1}" stroke-width="1.5" stroke-dasharray="6 8" opacity="0.25"/>
      <!-- Frost Blades -->
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(deg => `
        <path d="M 0 0 C 40 -80 120 -110 150 -60 C 130 -20 60 10 0 0" fill="${theme.accent1}" opacity="0.75" transform="rotate(${deg})"/>
      `).join('')}
      <!-- Central Peltier Core Hub -->
      <circle cx="0" cy="0" r="60" fill="#090e1a" stroke="rgba(255,255,255,0.3)" stroke-width="2"/>
      <circle cx="0" cy="0" r="35" fill="${theme.accent2}"/>
      <circle cx="0" cy="0" r="15" fill="#ffffff"/>
      <!-- Heat Dissipation Waves -->
      <path d="M -380 -140 Q -320 -180 -260 -140 T -140 -140" stroke="#f43f5e" stroke-width="3" fill="none" opacity="0.6"/>
      <path d="M 140 140 Q 200 180 260 140 T 380 140" stroke="${theme.accent1}" stroke-width="3" fill="none" opacity="0.6"/>
    </g>
  </svg>`;
}

// 3. Display Refresh & Calibration
function visualDisplayCalibration(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Smooth Sine Pulse Wave -->
      <path d="M -500 0 Q -375 -180 -250 0 T 0 0 T 250 0 T 500 0" stroke="${theme.accent1}" stroke-width="4" fill="none"/>
      <path d="M -500 0 Q -375 140 -250 0 T 0 0 T 250 0 T 500 0" stroke="${theme.accent2}" stroke-width="2.5" fill="none" opacity="0.6"/>
      <!-- Touch Sampling Grid Coordinates -->
      <circle cx="0" cy="0" r="180" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <circle cx="0" cy="0" r="120" fill="none" stroke="${theme.accent1}" stroke-width="1.5" stroke-dasharray="10 6"/>
      <circle cx="0" cy="0" r="60" fill="none" stroke="${theme.accent2}" stroke-width="2"/>
      <!-- Frame Pacing Tick Marks -->
      ${Array.from({length: 24}).map((_, i) => {
        const angle = (i * 360 / 24) * Math.PI / 180;
        const x1 = Math.cos(angle) * 190;
        const y1 = Math.sin(angle) * 190;
        const x2 = Math.cos(angle) * 210;
        const y2 = Math.sin(angle) * 210;
        return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${i % 2 === 0 ? theme.accent1 : 'rgba(255,255,255,0.3)'}" stroke-width="2"/>`;
      }).join('')}
      <!-- Gyro Aiming Crosshair Core -->
      <line x1="-30" y1="0" x2="30" y2="0" stroke="#ffffff" stroke-width="3"/>
      <line x1="0" y1="-30" x2="0" y2="30" stroke="#ffffff" stroke-width="3"/>
      <circle cx="0" cy="0" r="8" fill="${theme.accent1}"/>
    </g>
  </svg>`;
}

// 4. Battery & Power
function visualBatteryPower(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Battery Glass Shell -->
      <rect x="-260" y="-140" width="480" height="280" rx="36" fill="#09141c" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
      <!-- Battery Anode Terminal -->
      <rect x="220" y="-55" width="40" height="110" rx="14" fill="#1e293b" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
      <!-- Energized Battery Cells -->
      <rect x="-235" y="-115" width="95" height="230" rx="18" fill="${theme.accent1}" opacity="0.85"/>
      <rect x="-125" y="-115" width="95" height="230" rx="18" fill="${theme.accent1}" opacity="0.85"/>
      <rect x="-15" y="-115" width="95" height="230" rx="18" fill="${theme.accent1}" opacity="0.85"/>
      <rect x="95" y="-115" width="95" height="230" rx="18" fill="${theme.accent2}" opacity="0.85"/>
      <!-- Magnetic Wireless Coils -->
      <circle cx="0" cy="0" r="240" fill="none" stroke="${theme.accent1}" stroke-width="2" stroke-dasharray="14 10" opacity="0.35"/>
      <circle cx="0" cy="0" r="280" fill="none" stroke="${theme.accent2}" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.25"/>
      <!-- High Power Lightning Bolt Core -->
      <path d="M 20 -70 L -50 15 L 0 15 L -20 70 L 50 -15 L 0 -15 Z" fill="#ffffff" filter="drop-shadow(0 0 12px ${theme.accent1})"/>
    </g>
  </svg>`;
}

// 5. Audio & Music
function visualAudioMusic(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Hi-Res Concentric Soundfield Waves -->
      <circle cx="0" cy="0" r="260" fill="none" stroke="${theme.accent1}" stroke-width="2" stroke-dasharray="16 10" opacity="0.3"/>
      <circle cx="0" cy="0" r="200" fill="none" stroke="${theme.accent2}" stroke-width="1.5" opacity="0.4"/>
      <circle cx="0" cy="0" r="140" fill="none" stroke="${theme.accent1}" stroke-width="2.5"/>
      <!-- Equalizer Frequency Bars -->
      ${Array.from({length: 31}).map((_, i) => {
        const x = -300 + i * 20;
        const h = 40 + Math.sin(i * 0.4) * 110 + Math.cos(i * 0.8) * 50;
        return `<rect x="${x}" y="${-h/2}" width="10" height="${h}" rx="5" fill="${i % 2 === 0 ? theme.accent1 : theme.accent2}" opacity="0.85"/>`;
      }).join('')}
      <!-- Analog Control Dials -->
      <circle cx="-380" cy="0" r="55" fill="#131929" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <line x1="-380" y1="0" x2="-350" y2="-20" stroke="${theme.accent1}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="380" cy="0" r="55" fill="#131929" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <line x1="380" y1="0" x2="410" y2="-20" stroke="${theme.accent2}" stroke-width="4" stroke-linecap="round"/>
    </g>
  </svg>`;
}

// 6. Security, Privacy & VPN
function visualSecurityPrivacy(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Outer Hexagonal Enclave Shield -->
      <polygon points="0,-230 190,-115 190,115 0,230 -190,115 -190,-115" fill="none" stroke="${theme.accent1}" stroke-width="3" stroke-dasharray="16 8"/>
      <polygon points="0,-190 155,-95 155,95 0,190 -155,95 -155,-95" fill="#0d1a29" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <!-- Inner Cryptographic Padlock / Key Vault -->
      <!-- Lock Shackle -->
      <path d="M -50 -20 L -50 -70 C -50 -105 50 -105 50 -70 L 50 -20" fill="none" stroke="${theme.accent1}" stroke-width="12" stroke-linecap="round"/>
      <!-- Lock Body -->
      <rect x="-80" y="-20" width="160" height="130" rx="20" fill="#16263b" stroke="${theme.accent2}" stroke-width="3"/>
      <!-- Keyhole -->
      <circle cx="0" cy="30" r="18" fill="${theme.accent1}"/>
      <polygon points="-8,30 8,30 14,75 -14,75" fill="${theme.accent1}"/>
      <!-- Biometric Orbit Rings -->
      <circle cx="0" cy="0" r="280" fill="none" stroke="${theme.accent2}" stroke-width="1.5" stroke-dasharray="8 12" opacity="0.3"/>
    </g>
  </svg>`;
}

// 7. Creative Stylus & Design
function visualCreativeStylus(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Smooth Bezier Curves -->
      <path d="M -400 120 C -200 -220 200 -220 400 120" fill="none" stroke="${theme.accent1}" stroke-width="4"/>
      <path d="M -350 -100 C -150 180 150 180 350 -100" fill="none" stroke="${theme.accent2}" stroke-width="3" opacity="0.7"/>
      <!-- Bezier Anchor Points -->
      <rect x="-408" y="112" width="16" height="16" fill="#ffffff" stroke="${theme.accent1}" stroke-width="2"/>
      <rect x="392" y="112" width="16" height="16" fill="#ffffff" stroke="${theme.accent1}" stroke-width="2"/>
      <circle cx="0" cy="-145" r="8" fill="${theme.accent1}"/>
      <line x1="-120" y1="-145" x2="120" y2="-145" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="4 4"/>
      <circle cx="-120" cy="-145" r="6" fill="#ffffff"/>
      <circle cx="120" cy="-145" r="6" fill="#ffffff"/>
      <!-- Stylus Silhouette -->
      <g transform="translate(40, -40) rotate(-45)">
        <rect x="-12" y="-180" width="24" height="260" rx="12" fill="#ffffff" stroke="rgba(0,0,0,0.15)" stroke-width="2"/>
        <path d="M -12 80 L 0 120 L 12 80 Z" fill="#e2e8f0"/>
        <circle cx="0" cy="120" r="3" fill="#0f172a"/>
        <rect x="-10" y="-120" width="20" height="40" rx="4" fill="${theme.accent2}"/>
      </g>
    </g>
  </svg>`;
}

// 8. Storage & Cloud
function visualStorageCloud(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Cloud Outline -->
      <path d="M -160 40 C -220 40 -260 -10 -220 -60 C -220 -130 -140 -160 -80 -120 C -40 -180 80 -180 120 -120 C 180 -140 240 -80 220 -10 C 260 30 210 90 160 80 L -150 80" fill="#0e1726" stroke="${theme.accent1}" stroke-width="3"/>
      <!-- External SSD Silhouette below -->
      <rect x="-140" y="100" width="280" height="100" rx="16" fill="#1e293b" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      <circle cx="-100" cy="150" r="6" fill="${theme.accent2}"/>
      <rect x="90" y="140" width="30" height="20" rx="4" fill="#0f172a"/>
      <!-- Sync Transfer Beams -->
      <path d="M 0 -20 L 0 50 M -12 40 L 0 52 L 12 40" stroke="${theme.accent2}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="280" fill="none" stroke="${theme.accent1}" stroke-width="1.5" stroke-dasharray="12 10" opacity="0.3"/>
    </g>
  </svg>`;
}

// 9. Web Browsing
function visualWebBrowsing(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Modern Browser Window Glass Cards -->
      <rect x="-280" y="-170" width="560" height="340" rx="20" fill="#0b1329" stroke="rgba(255,255,255,0.18)" stroke-width="2"/>
      <!-- Browser Top Bar -->
      <rect x="-280" y="-170" width="560" height="50" rx="20" fill="#131e3d"/>
      <circle cx="-250" cy="-145" r="6" fill="#f43f5e"/>
      <circle cx="-230" cy="-145" r="6" fill="#f59e0b"/>
      <circle cx="-210" cy="-145" r="6" fill="#10b981"/>
      <!-- URL Bar Capsule -->
      <rect x="-160" y="-157" width="360" height="26" rx="13" fill="#090f21" stroke="rgba(255,255,255,0.1)"/>
      <circle cx="-140" cy="-144" r="5" fill="${theme.accent1}"/>
      <!-- Layout Card Rows -->
      <rect x="-240" y="-90" width="220" height="110" rx="12" fill="#152244" stroke="rgba(255,255,255,0.08)"/>
      <rect x="20" y="-90" width="220" height="110" rx="12" fill="#152244" stroke="rgba(255,255,255,0.08)"/>
      <rect x="-240" y="45" width="480" height="90" rx="12" fill="#152244" stroke="rgba(255,255,255,0.08)"/>
    </g>
  </svg>`;
}

// 10. Hardware Chips & AI
function visualHardwareChips(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Main SoC Silicon Die -->
      <rect x="-150" y="-150" width="300" height="300" rx="24" fill="#0a101f" stroke="${theme.accent1}" stroke-width="3"/>
      <!-- Metallic Heat Spreader -->
      <rect x="-120" y="-120" width="240" height="240" rx="16" fill="#141f36" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <!-- Micro-circuit Transistor Traces -->
      ${[ -80, -40, 0, 40, 80 ].map(offset => `
        <line x1="${offset}" y1="-150" x2="${offset}" y2="-210" stroke="${theme.accent1}" stroke-width="2"/>
        <circle cx="${offset}" cy="-210" r="4" fill="${theme.accent2}"/>
        <line x1="${offset}" y1="150" x2="${offset}" y2="210" stroke="${theme.accent1}" stroke-width="2"/>
        <circle cx="${offset}" cy="210" r="4" fill="${theme.accent2}"/>
        <line x1="-150" y1="${offset}" x2="-210" y2="${offset}" stroke="${theme.accent1}" stroke-width="2"/>
        <circle cx="-210" cy="${offset}" r="4" fill="${theme.accent2}"/>
        <line x1="150" y1="${offset}" x2="210" y2="${offset}" stroke="${theme.accent1}" stroke-width="2"/>
        <circle cx="210" cy="${offset}" r="4" fill="${theme.accent2}"/>
      `).join('')}
      <!-- Neural NPU Core Core -->
      <rect x="-60" y="-60" width="120" height="120" rx="12" fill="${theme.accent1}" opacity="0.25"/>
      <circle cx="0" cy="0" r="45" fill="${theme.accent2}" opacity="0.6"/>
      <circle cx="0" cy="0" r="18" fill="#ffffff"/>
    </g>
  </svg>`;
}

// 11. Camera & Photography
function visualCameraOptics(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Camera Lens Elements -->
      <circle cx="0" cy="0" r="220" fill="#090e17" stroke="rgba(255,255,255,0.2)" stroke-width="3"/>
      <circle cx="0" cy="0" r="190" fill="#0f192b" stroke="${theme.accent1}" stroke-width="2"/>
      <circle cx="0" cy="0" r="140" fill="#142138" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <circle cx="0" cy="0" r="90" fill="#192a47" stroke="${theme.accent2}" stroke-width="2"/>
      <circle cx="0" cy="0" r="45" fill="#060910"/>
      <!-- Aperture Blades -->
      ${[0, 60, 120, 180, 240, 300].map(deg => `
        <line x1="0" y1="0" x2="60" y2="40" stroke="${theme.accent1}" stroke-width="2" transform="rotate(${deg})"/>
      `).join('')}
      <!-- Optical Glass Glare Reflection -->
      <ellipse cx="-50" cy="-60" rx="80" ry="35" fill="rgba(255,255,255,0.18)" transform="rotate(-30)"/>
    </g>
  </svg>`;
}

// 12. System & Productivity
function visualSystemProductivity(theme) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    ${renderBase(theme)}
    <g transform="translate(640, 360)">
      <!-- Isometric Floating Stack of Glass Cards -->
      <g transform="translate(0, -60)">
        <polygon points="0,-120 220,0 0,120 -220,0" fill="#0f1a30" stroke="${theme.accent1}" stroke-width="2.5"/>
        <line x1="-120" y1="-20" x2="0" y2="40" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
        <line x1="0" y1="40" x2="120" y2="-20" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
      </g>
      <g transform="translate(0, 40)">
        <polygon points="0,-120 220,0 0,120 -220,0" fill="#162544" stroke="${theme.accent2}" stroke-width="2" opacity="0.85"/>
      </g>
      <g transform="translate(0, 140)">
        <polygon points="0,-120 220,0 0,120 -220,0" fill="#1d3057" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" opacity="0.6"/>
      </g>
      <!-- Glowing Vector Node Beacon at Summit -->
      <circle cx="0" cy="-180" r="14" fill="${theme.accent1}"/>
      <circle cx="0" cy="-180" r="30" fill="none" stroke="${theme.accent1}" stroke-width="2" stroke-dasharray="6 4"/>
    </g>
  </svg>`;
}

// Category palette definitions
const PALETTES = {
  'App Tips': { bgStart: '#090d1a', bgMid: '#0f172a', bgEnd: '#0369a1', accent1: '#38bdf8', accent2: '#0284c7' },
  'Game Reviews': { bgStart: '#140c1d', bgMid: '#2e1065', bgEnd: '#701a75', accent1: '#f472b6', accent2: '#db2777' },
  'Game Guides': { bgStart: '#071612', bgMid: '#064e3b', bgEnd: '#047857', accent1: '#34d399', accent2: '#10b981' },
  'Comparisons': { bgStart: '#160c1d', bgMid: '#3b0764', bgEnd: '#1e1b4b', accent1: '#c084fc', accent2: '#9333ea' },
  'News': { bgStart: '#1c100a', bgMid: '#431407', bgEnd: '#9a3412', accent1: '#fb923c', accent2: '#ea580c' },
  'Best Picks': { bgStart: '#191508', bgMid: '#451a03', bgEnd: '#b45309', accent1: '#fbbf24', accent2: '#d97706' }
};

// Categorize slug to motif function
function getMotifFunction(slug) {
  if (slug.includes('controller') || slug.includes('gamesir') || slug.includes('gamepad') || slug.includes('grip')) {
    return visualControllerGaming;
  }
  if (slug.includes('cooler') || slug.includes('thermal') || slug.includes('throttling')) {
    return visualThermalCooling;
  }
  if (slug.includes('refresh') || slug.includes('gyroscope') || slug.includes('120hz') || slug.includes('sampling')) {
    return visualDisplayCalibration;
  }
  if (slug.includes('charging') || slug.includes('battery') || slug.includes('gan') || slug.includes('qi2') || slug.includes('temperature-effects')) {
    return visualBatteryPower;
  }
  if (slug.includes('audio') || slug.includes('spotify') || slug.includes('music') || slug.includes('podcast') || slug.includes('sound')) {
    return visualAudioMusic;
  }
  if (slug.includes('vpn') || slug.includes('password') || slug.includes('security') || slug.includes('privacy') || 
      slug.includes('biometric') || slug.includes('enclave') || slug.includes('dns') || slug.includes('private-space') || 
      slug.includes('mdm') || slug.includes('advertising') || slug.includes('sandboxing') || slug.includes('zero-trust') ||
      slug.includes('telemetry')) {
    return visualSecurityPrivacy;
  }
  if (slug.includes('procreate') || slug.includes('stylus') || slug.includes('pencil') || slug.includes('vector') || 
      slug.includes('color-grading') || slug.includes('illustration')) {
    return visualCreativeStylus;
  }
  if (slug.includes('cloud') || slug.includes('sync') || slug.includes('ssd') || slug.includes('storage') || slug.includes('backup')) {
    return visualStorageCloud;
  }
  if (slug.includes('browser') || slug.includes('rendering') || slug.includes('webkit') || slug.includes('ad-blocking')) {
    return visualWebBrowsing;
  }
  if (slug.includes('chip') || slug.includes('flagship') || slug.includes('gpu') || slug.includes('llm') || slug.includes('5g') || slug.includes('npu')) {
    return visualHardwareChips;
  }
  if (slug.includes('camera') || slug.includes('photo')) {
    return visualCameraOptics;
  }
  return visualSystemProductivity;
}

// Articles mapping
const batch1 = require('./batches/batch1.cjs').articles;
const batch2 = require('./batches/batch2.cjs').articles;
const batch3 = require('./batches/batch3.cjs').articles;
const batch4 = require('./batches/batch4.cjs').articles;
const batch5 = require('./batches/batch5.cjs').articles;
const batch6 = require('./batches/batch6.cjs').articles;
const batch7 = require('./batches/batch7.cjs').articles;

const allArticles = [...batch1, ...batch2, ...batch3, ...batch4, ...batch5, ...batch6, ...batch7];

// Exclude already upgraded ones
const upgradedSlugs = new Set([
  'arc-search-mobile-browser-review', 'death-stranding-iphone-review', 'honkai-star-rail-relic-farming-guide',
  'ios-android-privacy-hardening-guide', 'lumafusion-android-tablet-review', 'mobile-battery-health-preservation-guide',
  'notion-calendar-mobile-review', 'retroarch-mobile-shader-controller-setup-guide', 'subway-surfers-city-review',
  'zenless-zone-zero-mobile-review', 'mobile-audio-synthesis-sound-design-next-gen-daw-plugins',
  'mobile-hand-drawn-animation-toonsquid-vs-callipeg-ipados', 'mobile-privacy-standard-biometric-enclave-sandboxing-audit',
  'computational-photography-beta-teardown-multi-frame-neural-processing', 'encrypted-knowledge-graphs-obsidian-mobile-sync-vs-logseq',
  'next-gen-local-file-sharing-cross-platform-airdrop-competitors', 'encrypted-cloud-storage-teardown-proton-drive-cryptomator-tresorit',
  'modern-vector-illustration-apps-mobile-beta-teardown', 'ai-mobile-browsers-arc-search-opera-one-brave-leo',
  'davinci-resolve-ipados-vs-final-cut-pro-editing-review', 'next-wave-generative-mobile-video-beta-analysis',
  'autonomous-on-device-ai-agents-mobile-assistants-future', 'decentralized-mobile-social-networks-bluesky-nostr-atproto'
]);

async function run() {
  console.log('Generating sleek editorial non-text visuals for all remaining articles...');
  const targetArticles = allArticles.filter(a => !upgradedSlugs.has(a.slug));
  console.log(`Articles to process: ${targetArticles.length}`);

  let count = 0;
  for (const art of targetArticles) {
    const palette = PALETTES[art.category] || PALETTES['App Tips'];
    const motifFn = getMotifFunction(art.slug);
    const svg = motifFn(palette);
    const dest = path.join(imagesDir, `${art.slug}.webp`);

    await sharp(Buffer.from(svg))
      .webp({ quality: 86, effort: 4 })
      .toFile(dest);

    count++;
    console.log(`[${count}/${targetArticles.length}] Processed: ${art.slug} (${art.category})`);
  }

  console.log(`\nSuccessfully converted all ${count} remaining images to textless editorial artwork!`);
}

async function generateImageForSlug(slug, category, destPath) {
  const palette = PALETTES[category] || PALETTES['App Tips'];
  const motifFn = getMotifFunction(slug);
  const svg = motifFn(palette);
  await sharp(Buffer.from(svg))
    .webp({ quality: 86, effort: 4 })
    .toFile(destPath);
  return destPath;
}

if (require.main === module) {
  run().catch(err => {
    console.error('Error generating artwork:', err);
    process.exit(1);
  });
}

module.exports = { generateImageForSlug, PALETTES };

