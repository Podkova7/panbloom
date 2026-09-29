const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const imgDir = path.join(__dirname, '..', 'public', 'images');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

console.log('Total blog markdown files:', files.length);

let minWords = 999999;
let maxWords = 0;
let errors = 0;
const dates = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(blogDir, f), 'utf8');
  const pubDateMatch = content.match(/pubDate:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/);
  const authorMatch = content.match(/author:\s*['"]?([^'"\r\n]+)['"]?/);
  const categoryMatch = content.match(/category:\s*['"]?([^'"\r\n]+)['"]?/);
  const heroMatch = content.match(/heroImage:\s*['"]?([^'"\r\n]+)['"]?/);
  
  if (!pubDateMatch || !authorMatch || !categoryMatch || !heroMatch) {
    console.error('Frontmatter missing in:', f);
    errors++;
  } else {
    dates.push(pubDateMatch[1]);
    const imgFile = path.basename(heroMatch[1]);
    if (!fs.existsSync(path.join(imgDir, imgFile))) {
      console.error('Image missing for:', f, '->', heroMatch[1]);
      errors++;
    }
  }

  // Count words in body
  const body = content.replace(/^---[\s\S]*?---/, '');
  const words = body.trim().split(/\s+/).length;
  if (words < minWords) minWords = words;
  if (words > maxWords) maxWords = words;
  if (words < 1100) {
    console.error('File below 1100 words:', f, words);
    errors++;
  }
});

dates.sort();
console.log('Earliest pubDate:', dates[0]);
console.log('Latest pubDate:', dates[dates.length - 1]);
console.log('Min words in any file:', minWords);
console.log('Max words in any file:', maxWords);
console.log('Total errors:', errors);
console.log(`Unique dates count: ${new Set(dates).size} out of ${dates.length}`);
