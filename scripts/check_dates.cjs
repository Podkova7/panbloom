const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));

let latestDateStr = '';
let latestFile = '';

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  const match = content.match(/pubDate:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/);
  if (match) {
    const d = match[1];
    if (!latestDateStr || d > latestDateStr) {
      latestDateStr = d;
      latestFile = file;
    }
  }
}

console.log('Latest file:', latestFile);
console.log('Latest pubDate:', latestDateStr);

const targetDateStr = '2026-09-30';
const latestDate = new Date(latestDateStr + 'T00:00:00Z');
const targetDate = new Date(targetDateStr + 'T00:00:00Z');

const diffMs = targetDate.getTime() - latestDate.getTime();
const diffDays = diffMs / (1000 * 60 * 60 * 24);
const diffWeeks = diffDays / 7;

console.log(`Difference in days: ${diffDays}`);
console.log(`Difference in weeks (float): ${diffWeeks.toFixed(2)}`);
console.log(`Floor weeks: ${Math.floor(diffWeeks)}, Ceil weeks: ${Math.ceil(diffWeeks)}`);

// Let's generate weekly intervals:
let current = new Date(latestDate.getTime());
const generatedDates = [];
while (true) {
  current = new Date(current.getTime() + 7 * 24 * 60 * 60 * 1000);
  if (current > targetDate) break;
  generatedDates.push(current.toISOString().split('T')[0]);
}

console.log(`Weekly dates count up to ${targetDateStr}: ${generatedDates.length}`);
console.log('First 5 weekly dates:', generatedDates.slice(0, 5));
console.log('Last 5 weekly dates:', generatedDates.slice(-5));
