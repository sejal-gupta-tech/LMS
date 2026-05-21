import mongoose from 'mongoose';

const MONGODB_URI = process.argv[2];

const aiCourse = {
  title: "AI & Machine Learning",
  slug: "ai-machine-learning",
  description: "Learn the fundamentals of AI, machine learning algorithms, and deep learning.",
  lessons: [
    { title: "Introduction to AI", order: 1, description: "Basic concepts of AI and its history." },
    { title: "Python Fundamentals for AI", order: 2, description: "Essential Python for ML and Data Science." },
    { title: "Machine Learning Basics", order: 3, description: "Understanding supervised and unsupervised learning." },
    { title: "Supervised Learning Algorithms", order: 4, description: "Linear regression, logistic regression, and more." }
  ]
};

async function restoreAI() {
  try {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    const courses = db.collection('courses');
    const lessons = db.collection('lessons');

    const courseResult = await courses.insertOne({
      title: { 
        en: aiCourse.title,
        hi: aiCourse.title,
        fr: aiCourse.title,
        es: aiCourse.title
      },
      slug: aiCourse.slug,
      description: { en: aiCourse.description },
      category: "Software Engineering",
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      lessons: []
    });

    const courseId = courseResult.insertedId;
    const lessonIds = [];

    for (const l of aiCourse.lessons) {
      const res = await lessons.insertOne({
        title: { en: l.title },
        slug: l.title.toLowerCase().replace(/ /g, '-'),
        course: courseId,
        order: l.order,
        description: { en: l.description },
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      lessonIds.push(res.insertedId);
    }

    await courses.updateOne({ _id: courseId }, { $set: { lessons: lessonIds, totalLessons: lessonIds.length } });

    console.log('Restored AI & Machine Learning course');
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

restoreAI();
