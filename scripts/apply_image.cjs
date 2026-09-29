const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const [,, srcPath, slug] = process.argv;

if (!srcPath || !slug) {
  console.error('Usage: node scripts/apply_image.cjs <srcPath> <slug>');
  process.exit(1);
}

const destPath = path.join(__dirname, '..', 'public', 'images', `${slug}.webp`);

sharp(srcPath)
  .resize(1280, 720, { fit: 'cover' })
  .webp({ quality: 85, effort: 4 })
  .toFile(destPath)
  .then(() => {
    console.log(`Updated: ${destPath}`);
  })
  .catch(err => {
    console.error(`Error processing ${slug}:`, err);
    process.exit(1);
  });
