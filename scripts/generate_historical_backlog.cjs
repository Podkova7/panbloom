const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const { generateArticleMarkdown } = require('./article_builder.cjs');

// 1. Load the 20 historical articles
const part1 = require('./batches/historical_part1.cjs').articles;
const part2 = require('./batches/historical_part2.cjs').articles;

const allHistoricalArticles = [...part1, ...part2];

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const imagesDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Helper to download an editorial photograph from Unsplash and convert to 1280x720 16:9 WebP
function downloadAndSavePhoto(photoId, dest) {
  return new Promise((resolve, reject) => {
    const url = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1280&h=720&q=85`;
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect if present
        https.get(res.headers.location, (redirectRes) => {
          if (redirectRes.statusCode !== 200) {
            return reject(new Error(`Failed to download redirected photo: ${redirectRes.statusCode}`));
          }
          const chunks = [];
          redirectRes.on('data', (c) => chunks.push(c));
          redirectRes.on('end', async () => {
            try {
              const buf = Buffer.concat(chunks);
              await sharp(buf)
                .resize(1280, 720, { fit: 'cover' })
                .webp({ quality: 85, effort: 4 })
                .toFile(dest);
              resolve(dest);
            } catch (err) {
              reject(err);
            }
          });
        }).on('error', reject);
        return;
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${photoId}: HTTP ${res.statusCode}`));
      }

      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', async () => {
        try {
          const buf = Buffer.concat(chunks);
          await sharp(buf)
            .resize(1280, 720, { fit: 'cover' })
            .webp({ quality: 85, effort: 4 })
            .toFile(dest);
          resolve(dest);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

// Fallback high-end geometric visual generator in case of network timeout
async function generateFallbackImage(slug, category, dest) {
  const { generateImageForSlug } = require('./generate_all_artwork.cjs');
  if (generateImageForSlug) {
    await generateImageForSlug(slug, category, dest);
  }
}

async function run() {
  console.log(`========================================================`);
  console.log(`PANBLOOM HISTORICAL BACKLOG AUTOMATION ENGINE`);
  console.log(`Target: 20 High E-E-A-T Articles (1100+ words each)`);
  console.log(`Schedule: One per week going backwards from 2025-03-16`);
  console.log(`========================================================\n`);

  if (allHistoricalArticles.length !== 20) {
    throw new Error(`Expected exactly 20 articles, but found ${allHistoricalArticles.length}`);
  }

  let totalWordCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < allHistoricalArticles.length; i++) {
    const art = allHistoricalArticles[i];
    const heroImage = `/images/${art.slug}.webp`;
    const imageDest = path.join(imagesDir, `${art.slug}.webp`);
    const mdDest = path.join(blogDir, `${art.slug}.md`);

    console.log(`--- [Iteration ${i + 1}/20] Processing: ${art.slug} ---`);

    // 1. Generate Article Markdown
    const { fullMarkdown, wordCount } = generateArticleMarkdown({
      ...art,
      heroImage
    });

    if (wordCount < 1100) {
      throw new Error(`CRITICAL QUALITY FAILURE: Article ${art.slug} has only ${wordCount} words! Minimum 1100 required.`);
    }

    totalWordCount += wordCount;

    // 2. Write Markdown file to src/content/blog/
    fs.writeFileSync(mdDest, fullMarkdown, 'utf8');
    console.log(`  [Markdown] Saved to src/content/blog/${art.slug}.md (${wordCount.toLocaleString()} words)`);

    // 3. Generate Featured WebP Image
    try {
      if (art.photoId) {
        await downloadAndSavePhoto(art.photoId, imageDest);
        console.log(`  [Image] Downloaded & processed Unsplash editorial photo -> ${art.slug}.webp`);
      } else {
        await generateFallbackImage(art.slug, art.category, imageDest);
        console.log(`  [Image] Generated vector editorial artwork -> ${art.slug}.webp`);
      }
    } catch (imgErr) {
      console.warn(`  [Image Warning] Unsplash download failed (${imgErr.message}), generating vector fallback...`);
      await generateFallbackImage(art.slug, art.category, imageDest);
      console.log(`  [Image] Fallback artwork created -> ${art.slug}.webp`);
    }

    console.log(`  [Status] Completed: ${art.pubDate} | Author: ${art.author} | Category: ${art.category}\n`);
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`========================================================`);
  console.log(`HISTORICAL BACKLOG COMPLETED SUCCESSFULLY IN ${durationSec}s!`);
  console.log(`Total Articles Generated: ${allHistoricalArticles.length}`);
  console.log(`Total Word Count: ${totalWordCount.toLocaleString()} words`);
  console.log(`Average Word Count: ${Math.round(totalWordCount / allHistoricalArticles.length)} words/article`);
  console.log(`Date Range: ${allHistoricalArticles[0].pubDate} -> ${allHistoricalArticles[allHistoricalArticles.length - 1].pubDate}`);
  console.log(`All Markdown files created in: src/content/blog/`);
  console.log(`All Featured WebP images created in: public/images/`);
  console.log(`========================================================`);
}

run().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
