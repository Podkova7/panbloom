// Helper to assemble comprehensive 1200+ word articles with High E-E-A-T,
// structured subheadings, empirical tables, practical takeaways, and frontmatter.

function generateArticleMarkdown({
  title,
  description,
  pubDate,
  author,
  category,
  heroImage,
  slug,
  lead,
  testEnvironment,
  deepDiveSections, // Array of { heading, paragraphs: [], bulletPoints: [] }
  comparisonTable, // { caption, headers: [], rows: [][] }
  tradeoffs, // { heading, paragraphs: [], warnings: [] }
  practicalSteps, // { heading, intro, steps: [{ title, detail }] }
  editorialVerdict // { heading, summary, verdictTableOrScore, finalWord }
}) {
  const frontmatter = `---
title: '${title.replace(/'/g, "''")}'
description: '${description.replace(/'/g, "''")}'
pubDate: ${pubDate}
author: '${author}'
category: '${category}'
heroImage: '${heroImage}'
---

`;

  let body = '';

  // Lead Section
  body += `${lead}\n\n`;
  body += `---\n\n`;

  // Test Environment / Background
  body += `## Hardware Test Rig & Evaluation Methodology\n\n`;
  body += `${testEnvironment.methodology}\n\n`;
  if (testEnvironment.devices && testEnvironment.devices.length > 0) {
    body += `**Evaluation Testbed:**\n`;
    for (const dev of testEnvironment.devices) {
      body += `- **${dev.name}**: ${dev.specs}\n`;
    }
    body += `\n`;
  }
  body += `${testEnvironment.observations}\n\n`;

  // Deep Dive Sections
  for (const sec of deepDiveSections) {
    body += `## ${sec.heading}\n\n`;
    for (const p of sec.paragraphs) {
      body += `${p}\n\n`;
    }
    if (sec.bulletPoints && sec.bulletPoints.length > 0) {
      for (const bp of sec.bulletPoints) {
        body += `- **${bp.label}**: ${bp.text}\n`;
      }
      body += `\n`;
    }
  }

  // Comparison Table Section
  if (comparisonTable) {
    body += `## Empirical Performance Benchmarks & Comparison\n\n`;
    if (comparisonTable.caption) {
      body += `${comparisonTable.caption}\n\n`;
    }
    const headers = comparisonTable.headers.join(' | ');
    const divider = comparisonTable.headers.map(() => '---').join(' | ');
    body += `| ${headers} |\n| ${divider} |\n`;
    for (const row of comparisonTable.rows) {
      body += `| ${row.join(' | ')} |\n`;
    }
    body += `\n`;
    if (comparisonTable.analysis) {
      body += `${comparisonTable.analysis}\n\n`;
    }
  }

  // Tradeoffs Section
  if (tradeoffs) {
    body += `## ${tradeoffs.heading || 'Key Trade-offs, Friction Points & Common Gotchas'}\n\n`;
    for (const p of tradeoffs.paragraphs) {
      body += `${p}\n\n`;
    }
    if (tradeoffs.warnings && tradeoffs.warnings.length > 0) {
      for (const w of tradeoffs.warnings) {
        body += `> **Important Note**: ${w}\n\n`;
      }
    }
  }

  // Practical Steps
  if (practicalSteps) {
    body += `## ${practicalSteps.heading || 'Step-by-Step Practical Implementation Guide'}\n\n`;
    if (practicalSteps.intro) {
      body += `${practicalSteps.intro}\n\n`;
    }
    practicalSteps.steps.forEach((step, idx) => {
      body += `### Step ${idx + 1}: ${step.title}\n\n${step.detail}\n\n`;
    });
  }

  // Editorial Verdict
  if (editorialVerdict) {
    body += `## ${editorialVerdict.heading || 'PanBloom Editorial Verdict & Recommendation'}\n\n`;
    body += `${editorialVerdict.summary}\n\n`;
    if (editorialVerdict.breakdown) {
      body += `### Final Scorecard & Assessment\n\n`;
      for (const item of editorialVerdict.breakdown) {
        body += `- **${item.metric}**: ${item.rating} — ${item.note}\n`;
      }
      body += `\n`;
    }
    body += `${editorialVerdict.finalWord}\n`;
  }

  const fullMarkdown = frontmatter + body;
  const wordCount = body.trim().split(/\s+/).length;

  return { fullMarkdown, wordCount };
}

module.exports = { generateArticleMarkdown };
