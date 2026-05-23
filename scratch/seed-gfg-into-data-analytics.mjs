// seed-gfg-into-data-analytics.mjs
import mongoose from 'mongoose';

const MONGODB_URI = process.argv[2] || process.env.MONGODB_URI;

/** Helper to generate markdown for a lesson */
function generateMarkdown(lessonTitle) {
  const hero = `# ${lessonTitle}\n\n` +
    `> **Introduction**\n> Welcome to the **${lessonTitle}** lesson. In this module we will explore the core concepts, real‑world applications, and hands‑on exercises that will empower you to master this topic.\n\n`;

  const theory = `## Detailed Theory\n\n` +
    `### Concepts Overview\n- **Structured Data** – data stored in fixed fields (e.g., relational tables).\n- **Unstructured Data** – free‑form data such as text, images, videos.\n- **Semi‑Structured Data** – JSON, XML, logs that have some hierarchy but no strict schema.\n- **Qualitative Data** – descriptive attributes (e.g., customer feedback).\n- **Quantitative Data** – numeric measurements (e.g., sales amount).\n- **Categorical Data** – discrete categories (e.g., product type).\n- **Numerical Data** – continuous numbers (e.g., price).\n\n` +
    `### Comparison Table\n\n| Type | Structure | Example | Typical Use |\n|------|-----------|---------|-------------|\n| Structured | Fixed schema | SQL table | Transactional systems |\n| Unstructured | No schema | Images, raw text | Media analytics |\n| Semi‑Structured | Flexible schema | JSON logs | Event streaming |\n| Qualitative | Textual | Survey comments | Sentiment analysis |\n| Quantitative | Numeric | Sales amount | Forecasting |\n| Categorical | Discrete | Country codes | Grouping & filtering |\n| Numerical | Continuous | Temperature | Regression models |\n\n`;

  const visuals = `## Visual Learning Blocks\n\n` +
    `![Analytics Pipeline](file:///d:/Project/LMS/public/assets/${lessonTitle.replace(/\s+/g, '-').toLowerCase()}-pipeline.png)\n\n` +
    `> *Flowchart showing data ingestion → cleaning → analysis → visualization.*\n\n`;

  const scenario = `## Real‑World Business Scenario\n\n` +
    `**ElectroMart Sales Dataset** – a fictional e‑commerce platform that records customer purchases, product catalog, and transaction timestamps. This scenario will be used throughout the lesson to illustrate concepts and drive hands‑on tasks.\n\n`;

  const dataset = `## Interactive Dataset Section\n\n` +
    `### Sample CSV Preview\n\n` +
    "```csv\ncustomer_id,order_id,product_id,category,price,quantity,date\n101,5001,2001,Smartphones,699,1,2023-01-15\n102,5002,2003,Laptops,1199,1,2023-01-16\n103,5003,2005,Headphones,199,2,2023-01-17\n```\n\n` +
    `You can download the full dataset from the **Datasets** tab in the UI.\n\n`;

  const coding = `## Coding / Practice Area\n\n` +
    `### Starter Code (JavaScript)\n\n` +
    "```javascript\n// Load the CSV into a DataFrame using Danfo.js (or any preferred library)\nconst df = await dfd.readCSV('https://example.com/electromart-sales.csv');\n\n// Example: Calculate total revenue per product category\nconst revenue = df.groupby(['category']).col(['price', 'quantity']).apply((group) => {\n  const total = group['price'].values.reduce((sum, p, i) => sum + p * group['quantity'].values[i], 0);\n  return total;\n});\nconsole.log('Revenue by category:', revenue);\n```\n\n`;

  const exercises = `## Practical Exercises\n\n` +
    `1. **Beginner** – List the top 5 customers by total spend.\n2. **Intermediate** – Identify products with a sales decline over the last 3 months.\n3. **Project‑Based** – Using the **Global E‑Commerce Sales Analytics** project, map each column of the dataset to its data type (categorical vs. numerical) and update the project schema accordingly.\n\n`;

  const quiz = `## Quiz\n\n` +
    `> **Note:** The actual quiz objects are stored in the database; this markdown provides a fallback display.\n\n` +
    `### Sample Question\n\n` +
    `**Q1:** Which data type best describes the *price* field?\n- A) Categorical\n- B) Numerical\n- C) Qualitative\n- D) Semi‑structured\n\n**Answer:** B) Numerical – *price* is a continuous numeric value.\n\n`;

  const notes = `## Notes & Revision\n\n` +
    `- Structured vs. Unstructured data – schema presence.\n- Categorical data is used for grouping; numerical data for calculations.\n- Always clean CSVs (handle missing values, correct data types) before analysis.\n\n`;

  const interview = `## Interview Preparation\n\n` +
    `1. *What is the difference between structured and semi‑structured data?*\n2. *How would you handle missing values in a large CSV dataset?*\n3. *Explain when you would use a categorical encoding technique.*\n\n`;

  const project = `## Project Integration\n\n` +
    `**Task:** Using the **ElectroMart** dataset, classify each column as *categorical* or *numerical* and document the decision in the **Global E‑Commerce Sales Analytics** project repository. This will contribute to the overall data‑model design for the end‑to‑end analytics pipeline.\n\n`;

  return hero + theory + visuals + scenario + dataset + coding + exercises + quiz + notes + interview + project;
}

/** Helper to generate a set of MCQs for a lesson */
function generateQuiz(lessonTitle) {
  const sampleQuestions = [
    {
      question: `What type of data best describes the "${lessonTitle}" topic?`,
      options: ['Structured', 'Unstructured', 'Semi‑structured', 'Qualitative'],
      answerIndex: 0,
      explanation: `The core of the lesson focuses on structured concepts, so option A is correct.`
    },
    {
      question: 'Which of the following is a numeric (quantitative) data example?',
      options: ['Product category name', 'Customer feedback text', 'Sales amount', 'Image file'],
      answerIndex: 2,
      explanation: 'Sales amount is a numeric measurement.'
    },
    {
      question: 'In the ElectroMart scenario, which column is categorical?',
      options: ['price', 'quantity', 'category', 'date'],
      answerIndex: 2,
      explanation: 'The "category" column contains discrete groups.'
    },
    {
      question: 'Which SQL clause would you use to group revenue by category?',
      options: ['WHERE', 'GROUP BY', 'ORDER BY', 'HAVING'],
      answerIndex: 1,
      explanation: '`GROUP BY` aggregates rows based on a column.'
    },
    {
      question: 'What is the primary purpose of a coding lab in a lesson?',
      options: ['Display static text', 'Provide an interactive sandbox', 'Show images only', 'Collect user feedback'],
      answerIndex: 1,
      explanation: 'A coding lab lets learners run code in‑browser.'
    },
    {
      question: 'Which data type would you assign to a column containing dates?',
      options: ['String', 'Date', 'Number', 'Boolean'],
      answerIndex: 1,
      explanation: 'Dates should be stored as Date objects for proper time‑based operations.'
    },
    {
      question: 'What is a common technique to handle missing values?',
      options: ['Drop rows', 'Impute with mean', 'Both A and B', 'Ignore'],
      answerIndex: 2,
      explanation: 'Both dropping rows and imputation are standard approaches.'
    }
  ];
  return sampleQuestions;
}

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  const lessons = db.collection('lessons');

  const cursor = lessons.find({});
  while (await cursor.hasNext()) {
    const lesson = await cursor.next();
    const title = lesson.title?.en || 'Lesson';
    const markdown = generateMarkdown(title);
    const quiz = generateQuiz(title);
    const update = {
      $set: {
        notes: { markdown },
        quizzes: quiz,
        datasets: [{ name: `${title} Sample Dataset`, url: 'https://example.com/dataset.csv' }],
        codingLab: { starterCode: `// Starter code for ${title}\n`, sandboxUrl: '' }
      }
    };
    await lessons.updateOne({ _id: lesson._id }, update);
    console.log(`Populated full content for lesson: ${title}`);
  }
  await mongoose.disconnect();
}

seed().catch(err => { console.error('Seeding error:', err); process.exit(1); });
