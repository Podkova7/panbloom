const fs = require('fs');
const path = require('path');

const batch1 = require('./batches/batch1.cjs').articles;
const batch2 = require('./batches/batch2.cjs').articles;
const batch3 = require('./batches/batch3.cjs').articles;
const batch4 = require('./batches/batch4.cjs').articles;
const batch5 = require('./batches/batch5.cjs').articles;
const batch6 = require('./batches/batch6.cjs').articles;
const batch7 = require('./batches/batch7.cjs').articles;

const all = [...batch1, ...batch2, ...batch3, ...batch4, ...batch5, ...batch6, ...batch7];

const doneSlugs = new Set([
  'mobile-audio-synthesis-sound-design-next-gen-daw-plugins',
  'mobile-hand-drawn-animation-toonsquid-vs-callipeg-ipados',
  'mobile-privacy-standard-biometric-enclave-sandboxing-audit',
  'computational-photography-beta-teardown-multi-frame-neural-processing',
  'encrypted-knowledge-graphs-obsidian-mobile-sync-vs-logseq',
  'next-gen-local-file-sharing-cross-platform-airdrop-competitors',
  'encrypted-cloud-storage-teardown-proton-drive-cryptomator-tresorit',
  'modern-vector-illustration-apps-mobile-beta-teardown',
  'ai-mobile-browsers-arc-search-opera-one-brave-leo',
  'davinci-resolve-ipados-vs-final-cut-pro-editing-review'
]);

const remaining = all.filter(a => !doneSlugs.has(a.slug));

console.log(`Total backlog articles: ${all.length}`);
console.log(`Completed articles: ${doneSlugs.size}`);
console.log(`Remaining articles: ${remaining.length}`);

// Group by category
const byCat = {};
remaining.forEach(a => {
  byCat[a.category] = (byCat[a.category] || []).concat(a);
});

for (const [cat, arts] of Object.entries(byCat)) {
  console.log(`\n=== Category: ${cat} (${arts.length} articles) ===`);
  arts.forEach((a, i) => {
    console.log(`  ${i+1}. [${a.slug}] ${a.title}`);
  });
}
