const sharp = require('sharp');
const path = require('path');

// Category accent palettes
const CATEGORY_PALETTES = {
  'App Tips': {
    gradStart: '#090d1a',
    gradMid: '#0f172a',
    gradEnd: '#0369a1',
    accent: '#38bdf8',
    glow: '#0284c7',
    badgeBg: '#0284c7',
    badgeText: '#ffffff'
  },
  'App Reviews': {
    gradStart: '#0f0e1c',
    gradMid: '#1e1b4b',
    gradEnd: '#4338ca',
    accent: '#818cf8',
    glow: '#6366f1',
    badgeBg: '#4f46e5',
    badgeText: '#ffffff'
  },
  'Game Reviews': {
    gradStart: '#140c1d',
    gradMid: '#2e1065',
    gradEnd: '#701a75',
    accent: '#f472b6',
    glow: '#db2777',
    badgeBg: '#be185d',
    badgeText: '#ffffff'
  },
  'Game Guides': {
    gradStart: '#071612',
    gradMid: '#064e3b',
    gradEnd: '#047857',
    accent: '#34d399',
    glow: '#10b981',
    badgeBg: '#059669',
    badgeText: '#ffffff'
  },
  'Comparisons': {
    gradStart: '#160c1d',
    gradMid: '#3b0764',
    gradEnd: '#1e1b4b',
    accent: '#c084fc',
    glow: '#9333ea',
    badgeBg: '#7e22ce',
    badgeText: '#ffffff'
  },
  'News': {
    gradStart: '#1c100a',
    gradMid: '#431407',
    gradEnd: '#9a3412',
    accent: '#fb923c',
    glow: '#ea580c',
    badgeBg: '#c2410c',
    badgeText: '#ffffff'
  },
  'Best Picks': {
    gradStart: '#191508',
    gradMid: '#451a03',
    gradEnd: '#b45309',
    accent: '#fbbf24',
    glow: '#d97706',
    badgeBg: '#d97706',
    badgeText: '#ffffff'
  }
};

function escapeXml(unsafe) {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine = 34) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines.slice(0, 3); // Max 3 lines
}

async function generateFeaturedImage({ slug, title, category, author, pubDate, outDir }) {
  // Delegate to sleek editorial non-text generator
  const { generateImageForSlug } = require('./generate_all_artwork.cjs');
  const destPath = path.join(outDir, `${slug}.webp`);
  if (generateImageForSlug) {
    await generateImageForSlug(slug, category, destPath);
  }
  return destPath;
}

module.exports = { generateFeaturedImage, CATEGORY_PALETTES };

