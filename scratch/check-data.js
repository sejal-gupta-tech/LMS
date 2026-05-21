import mongoose from 'mongoose';
import { dbConnect } from './lib/dbConnect.js';
import Course from './modules/lms/models/Course.js';

async function checkData() {
  try {
    await dbConnect();
    const count = await Course.countDocuments({});
    console.log(`Total courses: ${count}`);
    process.exit(0);
  } catch (error) {
    console.error('Error checking data:', error);
    process.exit(1);
  }
}

checkData();
