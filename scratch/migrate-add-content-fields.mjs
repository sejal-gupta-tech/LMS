// migrate-add-content-fields.mjs
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

async function migrate() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const lessons = db.collection('lessons');

  // Ensure content fields exist for all lessons (overwrites if present)
  await lessons.updateMany(
    {},
    {
      $set: {
        quizzes: [],
        notes: { markdown: '' },
        datasets: [],
        codingLab: { starterCode: '', sandboxUrl: '' }
      }
    }
  );

  console.log('Migration complete: added content fields to lessons');
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
