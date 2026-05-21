import { dbConnect } from '../lib/dbConnect';
import Course from '../plugins/lms/models/Course';

async function test() {
  try {
    console.log('Connecting...');
    await dbConnect();
    console.log('Fetching courses...');
    const courses = await Course.find({}).limit(1);
    console.log('Courses count:', courses.length);
    console.log('Success!');
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

test();
