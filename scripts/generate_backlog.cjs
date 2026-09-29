const fs = require('fs');
const path = require('path');
const { generateArticleMarkdown } = require('./article_builder.cjs');
const { generateFeaturedImage } = require('./image_generator.cjs');

// Load all batches
const batch1 = require('./batches/batch1.cjs').articles;
const batch2 = require('./batches/batch2.cjs').articles;
const batch3 = require('./batches/batch3.cjs').articles;
const batch4 = require('./batches/batch4.cjs').articles;
const batch5 = require('./batches/batch5.cjs').articles;
const batch6 = require('./batches/batch6.cjs').articles;
const batch7 = require('./batches/batch7.cjs').articles;

const allArticles = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  ...batch7
];

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const imagesDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function run() {
  console.log(`====================================================`);
  console.log(`Starting PanBloom Content Backlog Generation`);
  console.log(`Total Articles to Generate: ${allArticles.length}`);
  console.log(`Date Range: ${allArticles[0].pubDate} to ${allArticles[allArticles.length - 1].pubDate}`);
  console.log(`====================================================\n`);

  let totalWords = 0;
  const startTime = Date.now();

  for (let i = 0; i < allArticles.length; i++) {
    const art = allArticles[i];
    const heroImage = `/images/${art.slug}.webp`;

    // 1. Build Article Markdown
    const { fullMarkdown, wordCount } = generateArticleMarkdown({
      ...art,
      heroImage
    });

    if (wordCount < 1100) {
      throw new Error(`CRITICAL: Article ${art.slug} has only ${wordCount} words! Minimum 1100 required.`);
    }

    totalWords += wordCount;

    // 2. Save Markdown File
    const mdPath = path.join(blogDir, `${art.slug}.md`);
    fs.writeFileSync(mdPath, fullMarkdown, 'utf8');

    // 3. Generate Featured WebP Image
    await generateFeaturedImage({
      slug: art.slug,
      title: art.title,
      category: art.category,
      author: art.author,
      pubDate: art.pubDate,
      outDir: imagesDir
    });

    const percent = Math.round(((i + 1) / allArticles.length) * 100);
    console.log(`[${i + 1}/${allArticles.length}] (${percent}%) Generated: ${art.slug} | Date: ${art.pubDate} | Words: ${wordCount} | Author: ${art.author}`);
  }

  const durationSec = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n====================================================`);
  console.log(`Generation Completed Successfully in ${durationSec}s!`);
  console.log(`Total Articles Generated: ${allArticles.length}`);
  console.log(`Total Words Written: ${totalWords.toLocaleString()}`);
  console.log(`Average Words per Article: ${Math.round(totalWords / allArticles.length)}`);
  console.log(`All Markdown files written to: src/content/blog/`);
  console.log(`All WebP images written to: public/images/`);
  console.log(`====================================================`);
}

run().catch(err => {
  console.error('Fatal error during backlog generation:', err);
  process.exit(1);
});
