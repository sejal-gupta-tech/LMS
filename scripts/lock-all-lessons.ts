// lock-all-lessons.ts
// Run this script to lock every lesson in the LMS (prevent editing/access)
import mongoose from 'mongoose';
import Lesson from '../../plugins/lms/models/Lesson';

async function lockAllLessons() {
  try {
    // Connect to DB (use existing env variable)
    const mongoUri = process.env.DATABASE_URL;
if (!mongoUri) {
  throw new Error('DATABASE_URL environment variable not set');
}
await mongoose.connect(mongoUri);
const result = await Lesson.updateMany({}, { locked: true, lockedAt: new Date() });
console.log(`Locked ${result.modifiedCount} lessons.`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error locking lessons:', err);
    process.exit(1);
  }
}

lockAllLessons();
