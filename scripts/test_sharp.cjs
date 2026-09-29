const sharp = require('sharp');
const fs = require('fs');

const svg = `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <circle cx="1100" cy="150" r="260" fill="#38bdf8" opacity="0.15"/>
  <text x="80" y="360" font-family="sans-serif" font-size="48" font-weight="bold" fill="#ffffff">Test Image Generation</text>
</svg>`;

sharp(Buffer.from(svg))
  .webp({ quality: 85 })
  .toFile('./public/images/test-sharp.webp')
  .then(info => {
    console.log('Success:', info);
    fs.unlinkSync('./public/images/test-sharp.webp');
  })
  .catch(err => console.error('Error:', err));
