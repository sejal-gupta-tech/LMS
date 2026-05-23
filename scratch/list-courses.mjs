import { dbConnect } from '../lib/dbConnect';
import Course from '../plugins/lms/models/Course';

async function list() {
  try {
    await dbConnect();
    const courses = await Course.find({});
    console.log(JSON.stringify(courses.map(c => ({ id: c._id, title: c.title, slug: c.slug })), null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

list();
