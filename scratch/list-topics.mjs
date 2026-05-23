import { dbConnect } from '../lib/dbConnect';
import Course from '../plugins/lms/models/Course';
import Lesson from '../plugins/lms/models/Lesson';
import Topic from '../plugins/lms/models/Topic';

async function list() {
  try {
    await dbConnect();
    const course = await Course.findOne({ slug: 'data-analytics-tutorial' });
    if (!course) {
      console.log('Course not found');
      process.exit(1);
    }
    const lessons = await Lesson.find({ course: course._id }).sort({ order: 1 });
    console.log(`Found ${lessons.length} lessons.`);
    for (const l of lessons) {
      const topics = await Topic.find({ lesson: l._id }).sort({ order: 1 });
      console.log(`- Lesson: ${l.title.en} (Slug: ${l.slug})`);
      for (const t of topics) {
        console.log(`  * Topic: ${t.title.en} (Content length: ${t.contentHtml?.length || t.content?.length || 0})`);
      }
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

list();
