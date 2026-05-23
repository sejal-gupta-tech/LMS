import fs from 'fs';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import path from 'path';

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not set');
  process.exit(1);
}

// ---- 1. Load original course structure (from seed-data-analytics.mjs) ----
const seedPath = path.resolve('scratch', 'seed-data-analytics.mjs');
let courseStructure = [];
try {
  // Dynamically import the file; it exports nothing, but we can require it to get the variable via eval
  const content = fs.readFileSync(seedPath, 'utf8');
  // Extract the array literal assigned to courseStructure using regex
  const match = content.match(/const\s+courseStructure\s*=\s*(\[.*?\]);/s);
  if (match) {
    // eslint-disable-next-line no-eval
    courseStructure = eval(match[1]); // turn string into actual array of objects
  } else {
    console.error('Could not parse courseStructure from seed file');
    process.exit(1);
  }
} catch (e) {
  console.error('Error reading seed-data-analytics.mjs:', e);
  process.exit(1);
}

// ---- 2. Parse GFG article (same as earlier script) ----
const mdPath = 'C:/Users/hp/.gemini/antigravity-ide/brain/ad5d672a-e124-4985-834e-e341c97572da/.system_generated/steps/1093/content.md';
let raw = fs.readFileSync(mdPath, 'utf8');
const htmlStart = raw.indexOf('<!DOCTYPE html>');
if (htmlStart === -1) {
  console.error('HTML not found in markdown');
  process.exit(1);
}
const html = raw.substring(htmlStart);
const $ = cheerio.load(html);

// Build map: h2 => lessons, h3 => topics
const gfgMap = new Map();
let curLesson = '';
$('h2, h3').each((_, el) => {
  const tag = el.tagName.toLowerCase();
  const title = $(el).text().trim();
  if (tag === 'h2') {
    curLesson = title;
    if (!gfgMap.has(curLesson)) gfgMap.set(curLesson, []);
  } else if (tag === 'h3') {
    let content = '';
    let nxt = $(el).next();
    while (nxt.length && !['h2', 'h3'].includes(nxt.prop('tagName').toLowerCase())) {
      content += $.html(nxt) + '\n';
      nxt = nxt.next();
    }
    if (content.trim()) {
      gfgMap.get(curLesson).push({title, html: content});
    }
  }
});

function slugify(text) {
  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-').substring(0, 50);
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const courses = db.collection('courses');
  const lessons = db.collection('lessons');
  const topics = db.collection('topics');

  // Find the Data Analytics Tutorial course (by slug)
  const course = await courses.findOne({slug: 'data-analytics-tutorial'});
  if (!course) {
    console.error('Target course not found');
    process.exit(1);
  }
  console.log('Seeding combined content into:', course.title?.en || course.slug);

  // Clean current lessons/topics
  await lessons.deleteMany({course: course._id});
  await topics.deleteMany({course: course._id});

  let lessonOrder = 0;
  // ---- 2a. Insert original lessons (from seed-data-analytics) ----
  for (const sec of courseStructure) {
    const lessonRes = await lessons.insertOne({
      title: {en: sec.title},
      slug: slugify(sec.title) + '-' + Date.now().toString().slice(-4),
      course: course._id,
      order: lessonOrder++,
      description: {en: sec.description},
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const lessonId = lessonRes.insertedId;
    let topicOrder = 0;
    for (const t of sec.topics) {
      await topics.insertOne({
        title: {en: t},
        slug: slugify(t) + '-' + Date.now().toString().slice(-4),
        course: course._id,
        lesson: lessonId,
        order: topicOrder++,
        content: `Welcome to the "${t}" topic of the ${sec.title} section.`,
        description: {en: `Topic ${t}`},
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  // ---- 2b. Insert GFG lessons as additional lessons after the original ones ----
  for (const [lessonTitle, topicsList] of gfgMap.entries()) {
    if (!topicsList.length) continue;
    const lessonRes = await lessons.insertOne({
      title: {en: lessonTitle},
      slug: slugify(lessonTitle) + '-' + Date.now().toString().slice(-4),
      course: course._id,
      order: lessonOrder++,
      description: {en: `GeeksforGeeks content: ${lessonTitle}`},
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    const lessonId = lessonRes.insertedId;
    let topicOrder = 0;
    for (const t of topicsList) {
      const wrappedHtml = `<div class="space-y-6 lesson-rich-content text-slate-300">
        <p class="font-bold text-lg border-b border-slate-700 pb-2">${t.title}</p>
        ${t.html}
      </div>`;
      await topics.insertOne({
        title: {en: t.title},
        slug: slugify(t.title) + '-' + Date.now().toString().slice(-4),
        course: course._id,
        lesson: lessonId,
        order: topicOrder++,
        content: wrappedHtml,
        contentHtml: wrappedHtml,
        description: {en: `GeeksforGeeks topic ${t.title}`},
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  console.log('✅ Combined seeding complete');
  process.exit(0);
}

main().catch(err => { console.error('Error:', err); process.exit(1); });
