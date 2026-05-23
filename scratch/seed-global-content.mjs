// seed-global-content.mjs
import mongoose from 'mongoose';

const MONGODB_URI = process.argv[2] || process.env.MONGODB_URI;

function sampleQuiz(lessonTitle) {
  return [{
    question: `What is the main purpose of ${lessonTitle}?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    answerIndex: 0
  }];
}

function sampleNotes(lessonTitle) {
  return `## ${lessonTitle}\n\n**Overview**\n\nThis section provides an in-depth exploration of **${lessonTitle}**. It covers fundamental concepts, practical examples, and real‑world applications.\n\n### Key Concepts\n- Concept 1\n- Concept 2\n- Concept 3\n\n### Practical Example\n\`\`\`javascript\n// Example code snippet for ${lessonTitle}\nconsole.log('Hello ${lessonTitle}!');\n\`\`\`\n\n### Interview Tip\nBe prepared to discuss how ${lessonTitle} can be applied in data‑driven projects.\n`
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const lessons = db.collection('lessons');

  const cursor = lessons.find({});
  while (await cursor.hasNext()) {
    const lesson = await cursor.next();
    const title = lesson.title?.en || 'Lesson';
    const update = {
      $set: {
        quizzes: sampleQuiz(title),
        notes: { markdown: sampleNotes(title) },
        datasets: [{ name: `${title} Sample Dataset`, url: 'https://example.com/dataset.csv' }],
        codingLab: { starterCode: `// Starter code for ${title}\n`, sandboxUrl: '' }
      }
    };
    await lessons.updateOne({ _id: lesson._id }, update);
    console.log(`Populated content for lesson: ${title}`);
  }
  await mongoose.disconnect();
}

seed().catch(err => { console.error('Seeding error:', err); process.exit(1); });
