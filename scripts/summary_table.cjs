const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

const aiPhotoSlugs = new Set([
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

const stats = {};
files.forEach(f => {
  const c = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const cat = (c.match(/category:\s*['"]?([^'"\r\n]+)['"]?/) || [])[1];
  const slug = f.replace(/\.md$/, '');
  stats[cat] = stats[cat] || { total: 0, aiPhotoOrArt: 0, bespokeTextlessArt: 0, titleTextInside: 0 };
  stats[cat].total++;
  if (aiPhotoSlugs.has(slug)) {
    stats[cat].aiPhotoOrArt++;
  } else {
    stats[cat].bespokeTextlessArt++;
  }
});

console.table(stats);
