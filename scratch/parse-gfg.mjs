import fs from 'fs';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';

// Ensure MongoDB URI is passed or defined
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("Please set MONGODB_URI");
  process.exit(1);
}

const mdPath = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\ad5d672a-e124-4985-834e-e341c97572da\\.system_generated\\steps\\1093\\content.md';
let fileContent;
try {
  fileContent = fs.readFileSync(mdPath, 'utf8');
} catch (err) {
  console.error("Could not read MD file:", err);
  process.exit(1);
}

const htmlStartIndex = fileContent.indexOf('<!DOCTYPE html>');
if (htmlStartIndex === -1) {
  console.error("Could not find HTML start in file");
  process.exit(1);
}

const htmlContent = fileContent.substring(htmlStartIndex);
const $ = cheerio.load(htmlContent);

// The main content of the article is usually in an article tag or a div with class 'article-content' or similar.
// Let's grab all h2/h3 tags and the paragraphs under them.
const articleDiv = $('.article-content, .text, .text-content, .content').first();
const contentNodes = articleDiv.length ? articleDiv.children() : $('body').children();

let currentLesson = "Introduction";
let currentTopic = "";
let currentHtml = "";

const lessonsMap = new Map(); // lessonName -> [ { title, html } ]

$('h2, h3').each((i, el) => {
  const heading = $(el);
  const title = heading.text().trim();
  
  // If it's an h2, maybe it's a new Lesson
  if (el.tagName.toLowerCase() === 'h2') {
    currentLesson = title;
    if (!lessonsMap.has(currentLesson)) {
      lessonsMap.set(currentLesson, []);
    }
  } else if (el.tagName.toLowerCase() === 'h3') {
    currentTopic = title;
    
    // Find all siblings until next h2 or h3
    let contentHtml = '';
    let nextNode = heading.next();
    while (nextNode.length && !['h2', 'h3'].includes(nextNode.prop('tagName').toLowerCase())) {
      // Just add the outerHTML of the paragraph/list/code
      contentHtml += $.html(nextNode) + '\n';
      nextNode = nextNode.next();
    }
    
    if (!lessonsMap.has(currentLesson)) {
      lessonsMap.set(currentLesson, []);
    }
    
    if (contentHtml.trim() && currentTopic) {
        lessonsMap.get(currentLesson).push({
          title: currentTopic,
          html: contentHtml
        });
    }
  }
});

function slugify(text) {
  return text.toLowerCase().replace(/[^\\w ]+/g, '').replace(/ +/g, '-').substring(0, 50);
}

async function seedGFG() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[SEED] Connected to MongoDB.');

    const db = mongoose.connection.db;
    const coursesColl = db.collection('courses');
    const lessonsColl = db.collection('lessons');
    const topicsColl = db.collection('topics');

    // Create the Course
    const courseSlug = "gfg-data-analysis-" + Date.now().toString().slice(-4);
    const courseResult = await coursesColl.insertOne({
      title: { en: "GeeksforGeeks Data Analysis" },
      slug: courseSlug,
      description: { en: "Comprehensive data analysis tutorial sourced from GeeksforGeeks." },
      category: "Data Science",
      accessType: "free",
      isPaid: false,
      price: 0,
      currency: "USD",
      level: "Beginner",
      isPublished: true,
      modules: [],
      lessons: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    const courseId = courseResult.insertedId;
    let lessonOrder = 0;

    for (const [lessonTitle, topicsList] of lessonsMap.entries()) {
      if (!topicsList.length) continue;
      
      console.log(`Creating Lesson: ${lessonTitle}`);
      const lessonResult = await lessonsColl.insertOne({
        title: { en: lessonTitle },
        slug: slugify(lessonTitle) + "-" + Date.now().toString().slice(-4),
        course: courseId,
        order: lessonOrder++,
        description: { en: `Learn about ${lessonTitle}` },
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      const lessonId = lessonResult.insertedId;

      let topicOrder = 0;
      for (const topicData of topicsList) {
        const wrappedHtml = `<div class="space-y-6 lesson-rich-content text-slate-300">
          <p class="font-bold text-lg border-b border-slate-700 pb-2">${topicData.title}</p>
          ${topicData.html}
        </div>`;

        await topicsColl.insertOne({
          title: { en: topicData.title },
          slug: slugify(topicData.title) + "-" + Date.now().toString().slice(-4),
          course: courseId,
          lesson: lessonId,
          order: topicOrder++,
          content: wrappedHtml,
          contentHtml: wrappedHtml,
          description: { en: `Exploration of ${topicData.title}.` },
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    console.log('[SEED] Finished seeding GFG Data Analysis course!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedGFG();
