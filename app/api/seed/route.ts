import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Course from '@/modules/lms/models/Course';

export async function GET() {
  try {
    await dbConnect();
    
    const count = await Course.countDocuments({});
    if (count > 0) {
      return NextResponse.json({ success: true, message: 'Database already has data', count });
    }

    const sampleCourses = [
      {
        title: { en: 'Advanced React Native' },
        slug: 'advanced-react-native',
        description: { en: 'Learn to build cross-platform mobile apps with React Native and Expo.' },
        category: 'Mobile Development',
        instructorName: 'Prince Singh',
        difficultyLevel: 'Advanced',
        skillsEarned: ['React Native', 'Mobile Development', 'JavaScript'],
        isPublished: true
      },
      {
        title: { en: 'Fullstack Next.js Development' },
        slug: 'fullstack-nextjs-development',
        description: { en: 'Master server-side rendering, API routes, and database integration with Next.js.' },
        category: 'Web Development',
        instructorName: 'Sejal Gupta',
        difficultyLevel: 'Intermediate',
        skillsEarned: ['Next.js', 'React', 'MongoDB'],
        isPublished: true
      }
    ];

    await Course.insertMany(sampleCourses);

    return NextResponse.json({ success: true, message: 'Database seeded successfully', count: sampleCourses.length });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
