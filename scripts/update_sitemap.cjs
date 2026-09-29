const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const sitemapDest = path.join(__dirname, '..', 'public', 'sitemap.xml');
const siteUrl = 'https://panbloom.com';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/about/', priority: '0.8', changefreq: 'monthly' },
  { path: '/editorial-policy/', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy/', priority: '0.6', changefreq: 'monthly' },
  { path: '/terms/', priority: '0.6', changefreq: 'monthly' },
  { path: '/cookie-policy/', priority: '0.6', changefreq: 'monthly' },
  { path: '/authors/', priority: '0.8', changefreq: 'weekly' }
];

const categories = [
  'game-reviews',
  'app-reviews',
  'game-guides',
  'app-tips',
  'comparisons',
  'news',
  'best-picks'
];

const categoryPages = categories.map((slug) => ({
  path: `/category/${slug}/`,
  priority: '0.85',
  changefreq: 'daily'
}));

// Authors
const authorSlugs = [
  'sophia-lin',
  'marcus-vance',
  'devon-brooks',
  'claire-montgomery',
  'sylvie-fox',
  'olivia-williams',
  'daniel-clark',
  'andrew-wright',
  'michael-wilson',
  'julian-vance',
  'elena-rostova',
  'panbloom-editorial'
];

const authorPages = authorSlugs.map((slug) => ({
  path: `/author/${slug}/`,
  priority: '0.75',
  changefreq: 'weekly'
}));

// Read all blog posts
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
const blogPages = files.map(file => {
  const slug = file.replace(/\.md$/, '');
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  
  // Extract pubDate
  const dateMatch = content.match(/pubDate:\s*([^\r\n]+)/);
  let pubDate = today;
  if (dateMatch) {
    pubDate = dateMatch[1].trim().replace(/['"]/g, '');
  }

  return {
    path: `/blog/${slug}/`,
    priority: '0.9',
    changefreq: 'weekly',
    lastmod: pubDate
  };
});

const allUrls = [
  ...staticPages.map(p => ({
    loc: `${siteUrl}${p.path}`,
    priority: p.priority,
    changefreq: p.changefreq,
    lastmod: today
  })),
  ...categoryPages.map(p => ({
    loc: `${siteUrl}${p.path}`,
    priority: p.priority,
    changefreq: p.changefreq,
    lastmod: today
  })),
  ...authorPages.map(p => ({
    loc: `${siteUrl}${p.path}`,
    priority: p.priority,
    changefreq: p.changefreq,
    lastmod: today
  })),
  ...blogPages.map(p => ({
    loc: `${siteUrl}${p.path}`,
    priority: p.priority,
    changefreq: p.changefreq,
    lastmod: p.lastmod
  }))
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync(sitemapDest, sitemapXml, 'utf8');
console.log(`Updated sitemap.xml with ${allUrls.length} total URLs!`);
