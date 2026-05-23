import fs from 'fs';
import * as cheerio from 'cheerio';
const mdPath = 'C:/Users/hp/.gemini/antigravity-ide/brain/ad5d672a-e124-4985-834e-e341c97572da/.system_generated/steps/1093/content.md';
const content = fs.readFileSync(mdPath, 'utf8');
const $ = cheerio.load(content);
const articleDiv = $('.text').children('div').first();
console.log('Total children of inner div:', articleDiv.children().length);
const tagCounts = {};
articleDiv.children().each((i, el) => {
  const tag = el.tagName.toLowerCase();
  tagCounts[tag] = (tagCounts[tag] || 0) + 1;
});
console.log('Tag counts:', tagCounts);

console.log('--- First 10 children ---');
articleDiv.children().slice(0, 10).each((i, el) => {
  console.log(i, el.tagName, $(el).text().substring(0, 50).replace(/\n/g, ' '));
});
