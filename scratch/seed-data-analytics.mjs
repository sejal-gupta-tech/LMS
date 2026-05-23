import mongoose from 'mongoose';

const MONGODB_URI = process.argv[2];

const courseStructure = [
  {
    title: "Foundations",
    description: "Data concepts, analytics types, Data Science vs Data Analytics.",
    topics: ["Introduction", "Data and its Types", "Types of Data Analytics", "Data Science vs. Data Analytics"]
  },
  {
    title: "Excel",
    description: "Data cleaning, formulas, pivot tables, charts & dashboards.",
    topics: [
      "Introduction", "Basic Excel Formulas", "Sorting", "Filtering", "Conditional formatting", 
      "Data Validation", "Removing duplicates", "Lookup functions: VLOOKUP, HLOOKUP, INDEX & MATCH", 
      "Text functions: LEFT, RIGHT, MID, CONCATENATE", "IF Function", "Date Functions", 
      "Creating pivot tables", "Charts", "Dashboards"
    ]
  },
  {
    title: "Python",
    description: "Python basics, variables, data types, loops, functions & collections.",
    topics: ["Introduction", "Download and Install", "Variables", "Data Types", "Operators", "Conditional Statements", "Loops", "Functions", "String", "Lists", "Dictionary"]
  },
  {
    title: "Data Analysis Libraries",
    description: "Pandas, NumPy, Matplotlib, Seaborn & Scikit-learn.",
    topics: ["Pandas: Data manipulation and analysis", "NumPy: Numerical operations and matrix handling", "Matplotlib/Seaborn: Data visualization", "Scikit-learn: Data preprocessing and statistical modeling"]
  },
  {
    title: "Reading and Loading Datasets",
    description: "Import CSV, Excel & JSON files, export & manipulate dataframes.",
    topics: ["Reading CSV, Excel & JSON files", "Exporting dataframes to CSV/JSON", "Slicing, Indexing & Manipulating"]
  },
  {
    title: "Data Preprocessing",
    description: "Data cleaning, missing data, outliers, transformation & feature engineering.",
    topics: ["Introduction", "Data Cleaning", "Handling Missing Data", "Handling outliers", "Data Transformation", "Feature Engineering", "Data Sampling"]
  },
  {
    title: "Data Visualization",
    description: "Charts & graphs using Matplotlib, Seaborn & Plotly.",
    topics: ["Introduction", "Visualization with Matplotlib", "Visualization using Seaborn", "Visualization using Plotly"]
  },
  {
    title: "SQL",
    description: "Querying, filtering, joins, aggregations & query optimization.",
    topics: ["Introduction", "Installing MySQL/PostgreSQL", "CREATE DATABASE", "Queries", "Filtering & Logic", "Aggregate functions", "Joins", "Subqueries", "Window Functions", "Date and Time Functions", "Data Cleaning: Duplicates, Missing values & Type casting", "Performance Basics: Indexes & Query optimization"]
  },
  {
    title: "Mathematics & Statistics",
    description: "Probability, descriptive & inferential statistics, linear algebra & calculus.",
    topics: [
      "Basic probability: Sample space, Types of events, Probability Rules", "Conditional Probability", "Bayes' Theorem", "Probability distributions",
      "Descriptive Statistics : Mean, Median, Mode, Variance, Standard deviation", "Inferential Statistics: Confidence Interval, Hypothesis Testing, Central Limit Theorem", "Skewness and Kurtosis", "Tests: T-test, F-Test, Z-test, Chi-square Test", "Correlation: Pearson, Spearman",
      "Vectors", "Matrices", "Dot Product", "Linear Mapping", "Solving systems of linear equations", "Calculus: Differentiation, Gradient, Chain Rule"
    ]
  },
  {
    title: "Exploratory Data Analysis (EDA)",
    description: "Univariate, bivariate & multivariate analysis, correlation & clustering.",
    topics: ["Introduction", "Univariate, Bivariate and Multivariate data analysis", "Visualization: Histograms, Boxplots, Q-Q plots", "Correlation and Covariance", "Cross-tabulation", "Cluster Analysis, Factor & Canonical Correlation Analysis"]
  },
  {
    title: "Power BI",
    description: "Data modeling, DAX calculations, interactive dashboards & reports.",
    topics: ["Introduction", "Data Sources and its type", "Power Query", "Data Modeling", "Merging & Appending queries", "Data Analysis Expressions (DAX)", "Creating measures using DAX", "Calculated columns using DAX", "Data Visualization With Multiple Charts", "Filters in Power BI", "Slicer In Power BI", "Dashboards", "Publishing & Sharing reports", "Row-Level Security (RLS)"]
  },
  {
    title: "Tableau",
    description: "Data connections, calculated fields, visualizations & dashboards.",
    topics: ["Introduction", "Connecting to data sources", "Data Types", "Calculated fields", "Set in Tableau", "Operators", "Visualization", "Filtering in Visualization", "Dashboard in Tableau", "Layout & formatting in Dashboard"]
  },
  {
    title: "Projects",
    description: "Practical projects with source code to apply learned concepts.",
    topics: ["Data Analytics Projects [With Source code]"]
  },
  {
    title: "Related Articles",
    description: "Additional resources and learning references for advanced understanding.",
    topics: ["Python For Data Analytics", "SQL For Data Analytics", "Excel for Data Analytics", "Power BI / Tableau", "Mathematics & Statistics for Data Analysis", "Data analysis using R"]
  }
];

function slugify(text) {
  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const courses = db.collection('courses');
    const lessons = db.collection('lessons');
    const topics = db.collection('topics');

    // 1. Find or Create Course
    let course = await courses.findOne({ "title.en": "Data Analytics Tutorial" });
    if (!course) {
      console.log('Course not found, creating new one...');
      const insertResult = await courses.insertOne({
        title: { en: "Data Analytics Tutorial" },
        slug: "data-analytics-tutorial",
        description: { en: "Comprehensive tutorial covering foundations, tools (Excel, SQL, Python), and advanced analytics concepts." },
        category: "Data Science",
        accessType: "free",
        isPaid: false,
        price: 0,
        currency: "USD",
        level: "Beginner",
        isPublished: true,
        modules: [],
        lessons: [],
        createdAt: new Date(),
        updatedAt: new Date()
      });
      course = await courses.findOne({ _id: insertResult.insertedId });
    } else {
      console.log('Found existing course. Cleaning up old lessons/topics for fresh start...');
      await lessons.deleteMany({ course: course._id });
      await topics.deleteMany({ course: course._id });
    }

    const allLessonIds = [];

    // 2. Loop through sections (which become Lessons)
    for (let i = 0; i < courseStructure.length; i++) {
      const section = courseStructure[i];
      console.log(`Creating Section (Lesson): ${section.title}`);

      // Create Lesson (Section)
      const lessonResult = await lessons.insertOne({
        title: { en: section.title },
        slug: slugify(section.title),
        course: course._id,
        order: i,
        description: { en: section.description },
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      const lessonId = lessonResult.insertedId;
      allLessonIds.push(lessonId);

      // Create Topics for this Lesson
      for (let j = 0; j < section.topics.length; j++) {
        const topicName = section.topics[j];
        await topics.insertOne({
          title: { en: topicName },
          slug: `${slugify(section.title)}-${slugify(topicName)}-${Date.now().toString().slice(-4)}`,
          course: course._id,
          lesson: lessonId,
          order: j,
          content: `Welcome to the "${topicName}" topic of the ${section.title} section.`,
          description: { en: `In-depth exploration of ${topicName}.` },
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // 3. Finalize Course
    await courses.updateOne(
      { _id: course._id },
      { 
        $set: { 
          lessons: allLessonIds,
          totalLessons: allLessonIds.length,
          updatedAt: new Date()
        } 
      }
    );

    console.log('Seed completed successfully!');
    console.log(`Created ${allLessonIds.length} sections and associated topics.`);
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
