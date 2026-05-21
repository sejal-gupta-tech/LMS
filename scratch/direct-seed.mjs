import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = 'lms_core';

if (!MONGODB_URI) {
  console.error('MONGODB_URI is missing');
  process.exit(1);
}

const CourseSchema = new mongoose.Schema({
  title: { type: Object, required: true },
  slug: { type: String, required: true },
  description: { type: Object, required: true },
  category: { type: String, required: true },
  instructorName: { type: String },
  difficultyLevel: { type: String },
  skillsEarned: [{ type: String }],
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema);

const sampleCourses = [
  {
    title: { en: 'Advanced React Native', hi: 'उन्नत रिएक्ट नेटिव' },
    slug: 'advanced-react-native',
    description: { en: 'Learn to build cross-platform mobile apps with React Native and Expo.', hi: 'रिएक्ट नेटिव और एक्सपो के साथ क्रॉस-प्लेटफ़ॉर्म मोबाइल ऐप बनाना सीखें।' },
    category: 'Mobile Development',
    instructorName: 'Prince Singh',
    difficultyLevel: 'Advanced',
    skillsEarned: ['React Native', 'Mobile Development', 'JavaScript'],
    isPublished: true
  },
  {
    title: { en: 'Fullstack Next.js Development', hi: 'फुलस्टैक नेक्स्ट.जेएस डेवलपमेंट' },
    slug: 'fullstack-nextjs-development',
    description: { en: 'Master server-side rendering, API routes, and database integration with Next.js.', hi: 'नेक्स्ट.जेएस के साथ सर्वर-साइड रेंडरिंग, एपीआई रूट और डेटाबेस इंटीग्रेशन में महारत हासिल करें।' },
    category: 'Web Development',
    instructorName: 'Sejal Gupta',
    difficultyLevel: 'Intermediate',
    skillsEarned: ['Next.js', 'React', 'MongoDB'],
    isPublished: true
  },
  {
    title: { en: 'UI/UX Design Fundamentals', hi: 'यूआई/यूएक्स डिजाइन फंडामेंटल्स' },
    slug: 'ui-ux-design-fundamentals',
    description: { en: 'Learn the principles of user interface and user experience design.', hi: 'यूजर इंटरफेस और यूजर एक्सपीरियंस डिजाइन के सिद्धांतों को जानें।' },
    category: 'Design',
    instructorName: 'Design Expert',
    difficultyLevel: 'Beginner',
    skillsEarned: ['Figma', 'UI Design', 'UX Research'],
    isPublished: true
  }
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB_NAME });
    console.log('Connected!');

    console.log('Clearing existing courses...');
    await Course.deleteMany({});

    console.log('Inserting sample courses...');
    await Course.insertMany(sampleCourses);

    console.log('Seeding successful!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
