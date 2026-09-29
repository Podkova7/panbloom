const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const imgDir = path.join(__dirname, '..', 'public', 'images');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

// Slugs that have been upgraded to AI photographic / 3D images (or original photography)
const upgradedSlugs = new Set([
  // Original 10 from initial setup
  'arc-search-mobile-browser-review',
  'death-stranding-iphone-review',
  'honkai-star-rail-relic-farming-guide',
  'ios-android-privacy-hardening-guide',
  'lumafusion-android-tablet-review',
  'mobile-battery-health-preservation-guide',
  'notion-calendar-mobile-review',
  'retroarch-mobile-shader-controller-setup-guide',
  'subway-surfers-city-review',
  'zenless-zone-zero-mobile-review',
  // Newly generated AI images (App Reviews + News)
  'mobile-audio-synthesis-sound-design-next-gen-daw-plugins',
  'mobile-hand-drawn-animation-toonsquid-vs-callipeg-ipados',
  'mobile-privacy-standard-biometric-enclave-sandboxing-audit',
  'computational-photography-beta-teardown-multi-frame-neural-processing',
  'encrypted-knowledge-graphs-obsidian-mobile-sync-vs-logseq',
  'next-gen-local-file-sharing-cross-platform-airdrop-competitors',
  'encrypted-cloud-storage-teardown-proton-drive-cryptomator-tresorit',
  'modern-vector-illustration-apps-mobile-beta-teardown',
  'ai-mobile-browsers-arc-search-opera-one-brave-leo',
  'davinci-resolve-ipados-vs-final-cut-pro-editing-review',
  'next-wave-generative-mobile-video-beta-analysis',
  'autonomous-on-device-ai-agents-mobile-assistants-future',
  'decentralized-mobile-social-networks-bluesky-nostr-atproto'
]);

const categories = {};

files.forEach(f => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const cat = (content.match(/category:\s*['"]?([^'"\r\n]+)['"]?/) || [])[1] || 'Uncategorized';
  const title = (content.match(/title:\s*['"]?([^'"\r\n]+)['"]?/) || [])[1] || f;
  const slug = f.replace(/\.md$/, '');
  const heroMatch = content.match(/heroImage:\s*['"]?([^'"\r\n]+)['"]?/);
  const imgName = heroMatch ? path.basename(heroMatch[1]) : `${slug}.webp`;
  const imgPath = path.join(imgDir, imgName);
  const size = fs.existsSync(imgPath) ? fs.statSync(imgPath).size : 0;
  
  const isUpgraded = upgradedSlugs.has(slug);

  if (!categories[cat]) {
    categories[cat] = {
      total: 0,
      upgraded: 0,
      hasTextTitle: 0,
      articles: []
    };
  }

  categories[cat].total++;
  if (isUpgraded) {
    categories[cat].upgraded++;
  } else {
    categories[cat].hasTextTitle++;
  }

  categories[cat].articles.push({
    slug,
    title,
    isUpgraded,
    sizeBytes: size,
    imgName
  });
});

console.log(JSON.stringify(categories, null, 2));
