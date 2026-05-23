import mongoose from 'mongoose';
import { dbConnect } from '../lib/dbConnect.ts';
import Topic from '../plugins/lms/models/Topic.ts';
import Lesson from '../plugins/lms/models/Lesson.ts';
import Course from '../plugins/lms/models/Course.ts';

async function run() {
  await dbConnect();
  const course = await Course.findOne({ slug: 'data-analytics-tutorial' });
  if (!course) {
    console.log('Course not found');
    process.exit(1);
  }
  const lesson = await Lesson.findOne({ course: course._id, slug: 'python' });
  if (!lesson) {
    console.log('Lesson not found');
    process.exit(1);
  }
  const topics = await Topic.find({ lesson: lesson._id });
  for (const t of topics) {
    console.log(`ID: ${t._id}, Slug: ${t.slug}, Title: ${t.title.en}`);
  }
  process.exit(0);
}
run();
