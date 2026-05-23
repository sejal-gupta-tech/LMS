import mongoose from 'mongoose';
import { dbConnect } from '../lib/dbConnect.ts';

const topicsData = [
  {
    slug: 'foundations-introduction-5569',
    summary: {
      en: 'Learn the core definition of data analytics, explore the modern data pipeline, and understand how organizations use data to drive real-world actions.'
    },
    keyPoints: [
      'Data Analytics is the science of analyzing raw data to make conclusions and find patterns.',
      'The modern data journey follows a pipeline: Collection ➔ Cleaning ➔ Analysis ➔ Visualization ➔ Decision.',
      'Data is only valuable when it is transformed into actionable business insights.',
      'Organizations like Netflix and Spotify use analytics to personalize user experiences and recommend content.'
    ],
    notes: [
      'Garbage in, garbage out: High-quality analysis requires clean, high-quality data.',
      'Always start with a business question in mind before diving into data analysis.'
    ],
    resources: [
      { title: 'GeeksforGeeks Data Analysis Tutorial', url: 'https://www.geeksforgeeks.org/data-analysis/data-analysis-tutorial/' },
      { title: 'Introduction to Data Science (Coursera)', url: 'https://www.coursera.org/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Welcome to the world of <strong>Data Analytics</strong>! In today’s digital era, data is often called the "new oil" or "digital gold." But raw data, much like crude oil, isn't very useful on its own. It needs to be processed, refined, and analyzed to unlock its true value.</p>
  
  <blockquote>
    "Data Analytics is the systematic process of collecting, cleaning, transforming, and modeling raw data to discover useful information, draw conclusions, and support decision-making."
  </blockquote>
  
  <h3 class="text-xl font-bold mt-6 mb-3">The Modern Data Pipeline</h3>
  <p>Data doesn't just appear in charts. It goes through a structured lifecycle to turn from raw observations into business actions:</p>
  
  <div class="my-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col justify-center items-center">
    <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-2xl">
      <defs>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3b82f6" />
          <stop offset="100%" stop-color="#1d4ed8" />
        </linearGradient>
        <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#06b6d4" />
          <stop offset="100%" stop-color="#0e7490" />
        </linearGradient>
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981" />
          <stop offset="100%" stop-color="#047857" />
        </linearGradient>
        <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="100%" stop-color="#4338ca" />
        </linearGradient>
        <linearGradient id="violetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8b5cf6" />
          <stop offset="100%" stop-color="#6d28d9" />
        </linearGradient>
      </defs>
      
      <!-- Step 1: Collect -->
      <rect x="10" y="20" width="120" height="60" rx="12" fill="url(#blueGrad)" />
      <text x="70" y="55" fill="white" font-weight="bold" font-size="14" text-anchor="middle">1. Collect</text>
      
      <!-- Arrow 1 -->
      <path d="M 140 50 L 160 50" stroke="#94a3b8" stroke-width="3" fill="none" />
      <polygon points="160,50 152,45 152,55" fill="#94a3b8" />
      
      <!-- Step 2: Clean -->
      <rect x="170" y="20" width="120" height="60" rx="12" fill="url(#cyanGrad)" />
      <text x="230" y="55" fill="white" font-weight="bold" font-size="14" text-anchor="middle">2. Clean</text>
      
      <!-- Arrow 2 -->
      <path d="M 300 50 L 320 50" stroke="#94a3b8" stroke-width="3" fill="none" />
      <polygon points="320,50 312,45 312,55" fill="#94a3b8" />
      
      <!-- Step 3: Analyze -->
      <rect x="330" y="20" width="120" height="60" rx="12" fill="url(#indigoGrad)" />
      <text x="390" y="55" fill="white" font-weight="bold" font-size="14" text-anchor="middle">3. Analyze</text>
      
      <!-- Arrow 3 -->
      <path d="M 460 50 L 480 50" stroke="#94a3b8" stroke-width="3" fill="none" />
      <polygon points="480,50 472,45 472,55" fill="#94a3b8" />
      
      <!-- Step 4: Visualize -->
      <rect x="490" y="20" width="120" height="60" rx="12" fill="url(#violetGrad)" />
      <text x="550" y="55" fill="white" font-weight="bold" font-size="14" text-anchor="middle">4. Visualize</text>
      
      <!-- Arrow 4 -->
      <path d="M 620 50 L 640 50" stroke="#94a3b8" stroke-width="3" fill="none" />
      <polygon points="640,50 632,45 632,55" fill="#94a3b8" />
      
      <!-- Step 5: Act -->
      <rect x="650" y="20" width="140" height="60" rx="12" fill="url(#emeraldGrad)" />
      <text x="720" y="55" fill="white" font-weight="bold" font-size="14" text-anchor="middle">5. Decision / Act</text>
    </svg>
    <div class="mt-2 text-xs font-semibold text-slate-500 tracking-wider uppercase">The 5 Stages of the Data Journey</div>
  </div>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Why Data Analytics is Essential</h3>
  <p>Every major tech company uses data analytics to stay ahead. Here's a brief example of data in action:</p>
  <ul class="list-disc pl-6 space-y-2">
    <li><strong>Netflix</strong> analyzes viewing history, search terms, and time spent on shows to recommend what you should watch next. Over 80% of what Netflix users watch is driven by recommendations!</li>
    <li><strong>Spotify</strong> creates personalized playlists like "Discover Weekly" by analyzing what music you skip, save, and listen to repeatedly.</li>
    <li><strong>Amazon</strong> predicts which products you're likely to buy and pre-allocates them to nearby warehouses to shorten delivery times.</li>
  </ul>
  
  <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-800 my-4">
    <h4 class="font-bold">Real-World Impact</h4>
    <p class="text-sm">Without analysis, data is just noise. Analytics provides the clarity needed to make confident, fact-backed business decisions.</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Introduction to Data Analytics Quiz' },
      description: { en: 'Check your basic understanding of data analytics definitions, pipeline, and applications.' },
      questions: [
        {
          text: { en: 'What is the correct definition of Data Analytics?' },
          options: [
            { en: 'The process of writing complex database engines from scratch.' },
            { en: 'The systematic process of collecting, cleaning, transforming, and modeling raw data to discover insights and make decisions.' },
            { en: 'Designing decorative user interfaces for websites.' },
            { en: 'Managing physical server hardware and storage units.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Data Analytics involves the entire lifecycle of raw data (from collection to modeling) to extract actionable insights.' }
        },
        {
          text: { en: 'Which step in the data pipeline is responsible for removing incorrect, duplicate, or formatted values?' },
          options: [
            { en: 'Collection' },
            { en: 'Cleaning' },
            { en: 'Visualization' },
            { en: 'Action' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Data Cleaning involves filtering out errors, duplicates, and missing values to ensure accurate analysis.' }
        },
        {
          text: { en: 'In the Netflix recommendation system example, what acts as the primary input "data"?' },
          options: [
            { en: "Netflix's corporate financial statements." },
            { en: 'User viewing history, search queries, and duration watched.' },
            { en: 'Movie production budget records.' },
            { en: 'Local weather reports where users live.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Netflix recommends content by analyzing individual user engagement data like viewing history, search queries, and watch time.' }
        }
      ]
    }
  },
  {
    slug: 'foundations-data-and-its-types-5610',
    summary: {
      en: 'Understand the core categories of data: Quantitative (numerical) and Qualitative (categorical), and how they are broken down into discrete, continuous, nominal, and ordinal types.'
    },
    keyPoints: [
      'Data is categorized into Qualitative (Categorical) and Quantitative (Numerical).',
      'Qualitative data describes qualities or categories and is split into Nominal and Ordinal.',
      'Quantitative data describes measurable quantities and is split into Discrete and Continuous.',
      'Nominal data has no inherent order (e.g., colors), while Ordinal data has a natural rank (e.g., feedback scale).',
      'Discrete data represents countable whole values, while Continuous data represents measurable decimal values.'
    ],
    notes: [
      'Choosing the correct data type is critical because it dictates what statistical methods and charts you can use.',
      'Some categorical data might use numbers (like ZIP codes or IDs), but they are still qualitative since math operations on them do not make sense.'
    ],
    resources: [
      { title: 'GeeksforGeeks: Types of Data', url: 'https://www.geeksforgeeks.org/data-and-its-types/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>To analyze data effectively, you must first understand what type of data you are dealing with. Different data types require different tools, statistical calculations, and visualizations.</p>
  
  <p>At the highest level, data is split into two primary families: <strong>Qualitative (Categorical)</strong> and <strong>Quantitative (Numerical)</strong>.</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-5 border border-blue-100 bg-blue-50/50 rounded-2xl">
      <h4 class="text-lg font-bold text-blue-900 mb-2">🏷️ Qualitative (Categorical)</h4>
      <p class="text-sm text-slate-700">Represents descriptions, qualities, or characteristics that cannot be easily measured by numbers.</p>
      <div class="mt-4 space-y-2">
        <div class="p-3 bg-white border border-blue-100 rounded-xl">
          <strong class="text-blue-800 text-sm">Nominal Data</strong>
          <p class="text-xs text-slate-500 mt-1">Categories with no natural ordering. Examples: Marital status, eye color, country names, zip codes.</p>
        </div>
        <div class="p-3 bg-white border border-blue-100 rounded-xl">
          <strong class="text-blue-800 text-sm">Ordinal Data</strong>
          <p class="text-xs text-slate-500 mt-1">Categories with a clear, logical order or rank. Examples: Customer satisfaction (Poor, Fair, Good), education level (High School, Bachelors, PhD).</p>
        </div>
      </div>
    </div>
    
    <div class="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
      <h4 class="text-lg font-bold text-emerald-900 mb-2">🔢 Quantitative (Numerical)</h4>
      <p class="text-sm text-slate-700">Represents measurable quantities expressed in numerical values that you can perform arithmetic on.</p>
      <div class="mt-4 space-y-2">
        <div class="p-3 bg-white border border-emerald-100 rounded-xl">
          <strong class="text-emerald-800 text-sm">Discrete Data</strong>
          <p class="text-xs text-slate-500 mt-1">Countable, distinct whole numbers. Examples: Number of children, website page views, cars in a parking lot.</p>
        </div>
        <div class="p-3 bg-white border border-emerald-100 rounded-xl">
          <strong class="text-emerald-800 text-sm">Continuous Data</strong>
          <p class="text-xs text-slate-500 mt-1">Measurable values that can take any decimal number in a range. Examples: Person's height, water temperature, product weight, stock price.</p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-800 my-4">
    <h4 class="font-bold">⚠️ Key Trap for Beginners</h4>
    <p class="text-sm">Just because data contains numbers doesn't mean it's Quantitative. For example, a credit card number or a ZIP code (e.g. 90210) contains digits, but adding or average-scaling them makes no sense. Therefore, they are considered <strong>Nominal Qualitative Data</strong>.</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Data and its Types Quiz' },
      description: { en: 'Test your understanding of the difference between qualitative/quantitative data, and their respective subdivisions.' },
      questions: [
        {
          text: { en: 'A feedback form asks you to rate your experience as "Satisfied, Neutral, or Dissatisfied." What type of data is this?' },
          options: [
            { en: 'Nominal Qualitative' },
            { en: 'Ordinal Qualitative' },
            { en: 'Discrete Quantitative' },
            { en: 'Continuous Quantitative' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Feedback ratings have a clear order or ranking but are descriptive words, making them Ordinal Qualitative data.' }
        },
        {
          text: { en: 'Which of the following is an example of Continuous Quantitative data?' },
          options: [
            { en: 'The number of student enrollments in a class.' },
            { en: 'The exact temperature of a laptop processor (e.g. 55.4°C).' },
            { en: 'The product category (e.g., Electronics, Fashion).' },
            { en: 'A country code (e.g., +1, +91).' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: "The temperature of a processor can take any fractional value and represents a continuous scale of physical measurement." }
        },
        {
          text: { en: 'Why are ZIP codes considered Qualitative data instead of Quantitative data?' },
          options: [
            { en: 'Because they only contain letters in some countries.' },
            { en: 'Because performing mathematical operations (like calculating an average ZIP code) yields no meaningful numerical insight.' },
            { en: 'Because they represent geographical distance.' },
            { en: 'Because they change frequently.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'ZIP codes are identifiers. Performing arithmetic on them has no logical meaning, which places them in the Qualitative (Nominal) category.' }
        }
      ]
    }
  },
  {
    slug: 'foundations-types-of-data-analytics-5650',
    summary: {
      en: 'Learn how the four types of analytics build upon one another: from explaining what happened in the past, to diagnosing why it occurred, predicting what will happen, and recommending how to respond.'
    },
    keyPoints: [
      'The four types of analytics are Descriptive, Diagnostic, Predictive, and Prescriptive.',
      'Descriptive Analytics answers: "What happened?" using charts and reports.',
      'Diagnostic Analytics answers: "Why did it happen?" using drill-downs and root-cause analysis.',
      'Predictive Analytics answers: "What is likely to happen?" using statistical modeling and machine learning.',
      'Prescriptive Analytics answers: "How should we react?" using optimization and rule engines.'
    ],
    notes: [
      'As you move from Descriptive to Prescriptive, both the difficulty of implementation and the value delivered to the business increase.',
      'Most organizations start by mastering Descriptive analytics before trying to implement Predictive or Prescriptive systems.'
    ],
    resources: [
      { title: 'GeeksforGeeks: Types of Data Analytics', url: 'https://www.geeksforgeeks.org/types-of-data-analytics/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Data analytics can be divided into four distinct phases. Each phase provides a different level of value and complexity, answering a different core question for a business.</p>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
    <!-- Card 1 -->
    <div class="p-5 border border-blue-100 bg-blue-50/50 rounded-2xl">
      <div class="text-blue-600 text-2xl font-bold">1. Descriptive</div>
      <div class="text-slate-800 font-extrabold text-md mt-1">"What happened?"</div>
      <p class="text-xs text-slate-500 mt-2">Analyzes historical data to describe the current state. Uses dashboards, reports, and simple charts.</p>
      <p class="text-xs text-blue-700 font-bold mt-2">Example: A report showing sales dropped by 10% last month.</p>
    </div>
    
    <!-- Card 2 -->
    <div class="p-5 border border-purple-100 bg-purple-50/50 rounded-2xl">
      <div class="text-purple-600 text-2xl font-bold">2. Diagnostic</div>
      <div class="text-slate-800 font-extrabold text-md mt-1">"Why did it happen?"</div>
      <p class="text-xs text-slate-500 mt-2">Dives deeper to find anomalies and correlations. Uses data mining, drill-downs, and root-cause analysis.</p>
      <p class="text-xs text-purple-700 font-bold mt-2">Example: Discovering that the sales drop was caused by a bug in the mobile app checkout.</p>
    </div>
    
    <!-- Card 3 -->
    <div class="p-5 border border-amber-100 bg-amber-50/50 rounded-2xl">
      <div class="text-amber-600 text-2xl font-bold">3. Predictive</div>
      <div class="text-slate-800 font-extrabold text-md mt-1">"What will happen?"</div>
      <p class="text-xs text-slate-500 mt-2">Uses statistical models, forecasting, and machine learning to estimate future outcomes.</p>
      <p class="text-xs text-amber-700 font-bold mt-2">Example: Predicting a 15% increase in website traffic during the upcoming holiday season.</p>
    </div>
    
    <!-- Card 4 -->
    <div class="p-5 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
      <div class="text-emerald-600 text-2xl font-bold">4. Prescriptive</div>
      <div class="text-slate-800 font-extrabold text-md mt-1">"What should we do?"</div>
      <p class="text-xs text-slate-500 mt-2">Recommends the best course of action. Uses algorithms, simulations, and decision automation engines.</p>
      <p class="text-xs text-emerald-700 font-bold mt-2">Example: A system automatically purchasing extra server space when website traffic exceeds a threshold.</p>
    </div>
  </div>
  
  <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-800 my-4">
    <h4 class="font-bold">The Analytics Hierarchy</h4>
    <p class="text-sm">These methods build on top of one another. You cannot diagnose a trend without first describing it, and you cannot predict the future without understanding what factors drive your past results.</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Types of Data Analytics Quiz' },
      description: { en: 'Check your capability to identify and distinguish the 4 key types of analytics.' },
      questions: [
        {
          text: { en: "A company dashboard displays last quarter's customer acquisition rate. What type of analytics is this displaying?" },
          options: [
            { en: 'Descriptive' },
            { en: 'Diagnostic' },
            { en: 'Predictive' },
            { en: 'Prescriptive' }
          ],
          correctAnswerIndex: 0,
          explanation: { en: 'Summarizing historical facts like customer rates is the main purpose of Descriptive Analytics.' }
        },
        {
          text: { en: 'If a data analyst is running correlations and database queries to figure out why customer churn spiked in October, they are performing:' },
          options: [
            { en: 'Descriptive Analytics' },
            { en: 'Diagnostic Analytics' },
            { en: 'Predictive Analytics' },
            { en: 'Prescriptive Analytics' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Diagnostic analytics tries to explain the root causes and correlations behind past anomalies.' }
        },
        {
          text: { en: 'A machine learning model identifies flight delay trends and automatically adjusts ticket prices to maximize profit. What types of analytics are represented here?' },
          options: [
            { en: 'ONLY Descriptive' },
            { en: 'Descriptive and Diagnostic' },
            { en: 'Predictive and Prescriptive' },
            { en: 'Diagnostic and Descriptive' }
          ],
          correctAnswerIndex: 2,
          explanation: { en: 'Identifying delay trends is Predictive (forecasting future events), and adjusting ticket prices automatically is Prescriptive (deciding the action to take).' }
        }
      ]
    }
  },
  {
    slug: 'foundations-data-science-vs-data-analytics-5690',
    summary: {
      en: 'Understand the clear distinctions between Data Science and Data Analytics: how Data Science focuses on building models and algorithms, while Data Analytics focuses on answering specific business questions.'
    },
    keyPoints: [
      'Data Science is a broader field focused on building algorithms, machine learning models, and exploring unknown questions.',
      'Data Analytics is a focused discipline aimed at solving specific business problems and interpreting existing data.',
      'Data Scientists write complex code, create predictive models, and design algorithms.',
      'Data Analysts clean datasets, write SQL queries, create visualizations, and report to stakeholders.'
    ],
    notes: [
      'In many organizations, the roles overlap. However, the core difference is that Data Analysts look back at historical data to solve defined questions, while Data Scientists look forward and create new ways to model data.'
    ],
    resources: [
      { title: 'GeeksforGeeks: Data Science vs Data Analytics', url: 'https://www.geeksforgeeks.org/difference-between-data-science-and-data-analytics/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>While the terms "Data Science" and "Data Analytics" are often used interchangeably, they represent different scopes of work, tools, and objectives.</p>
  
  <p>In short: <strong>Data Scientists</strong> build the systems, algorithms, and predictive models, while <strong>Data Analysts</strong> use those systems and data to extract business insights and guide daily decisions.</p>
  
  <div class="overflow-x-auto my-6 border border-slate-200 rounded-2xl">
    <table class="min-w-full divide-y divide-slate-200 text-sm">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 py-3 text-left font-bold text-slate-900">Feature</th>
          <th class="px-4 py-3 text-left font-bold text-slate-900">Data Science</th>
          <th class="px-4 py-3 text-left font-bold text-slate-900">Data Analytics</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 bg-white">
        <tr>
          <td class="px-4 py-3 font-semibold text-slate-900">Core Goal</td>
          <td class="px-4 py-3 text-slate-700">Find new questions and build machine learning systems.</td>
          <td class="px-4 py-3 text-slate-700">Answer specific, pre-defined business questions.</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold text-slate-900">Focus Time</td>
          <td class="px-4 py-3 text-slate-700">Future-oriented (prediction, system automation).</td>
          <td class="px-4 py-3 text-slate-700">Past & Present-oriented (historical insights).</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold text-slate-900">Primary Skills</td>
          <td class="px-4 py-3 text-slate-700">Advanced coding, Machine Learning, Deep Learning, Statistics.</td>
          <td class="px-4 py-3 text-slate-700">SQL, Data visualization, Business Communication, Excel.</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold text-slate-900">Common Tools</td>
          <td class="px-4 py-3 text-slate-700">Python, R, PyTorch, Jupyter, Spark.</td>
          <td class="px-4 py-3 text-slate-700">SQL, Power BI, Tableau, Excel, Python (Pandas).</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold text-slate-900">Scope</td>
          <td class="px-4 py-3 text-slate-700">Broad, exploratory, unstructured data.</td>
          <td class="px-4 py-3 text-slate-700">Focused, structured databases.</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-800 my-4">
    <h4 class="font-bold">Summary Metaphor</h4>
    <p class="text-sm">Think of a <strong>Data Scientist</strong> as a team of engineers building a Formula 1 racing car from scratch. Think of a <strong>Data Analyst</strong> as the driver who knows exactly how to pilot that car to win the race!</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Data Science vs. Data Analytics Quiz' },
      description: { en: 'Identify key procedural, tools-based and organizational differences between data science and data analytics roles.' },
      questions: [
        {
          text: { en: 'Which of the following is primarily the responsibility of a Data Scientist rather than a Data Analyst?' },
          options: [
            { en: 'Creating a monthly sales dashboard for executives in Power BI.' },
            { en: 'Writing a SQL query to find top-selling products.' },
            { en: 'Training a Deep Learning neural network model to recognize objects in images.' },
            { en: 'Cleaning a CSV file of duplicate records using Excel.' }
          ],
          correctAnswerIndex: 2,
          explanation: { en: 'Designing and training machine learning/deep learning algorithms is a core competency of Data Science.' }
        },
        {
          text: { en: 'What is the typical focus timeline for Data Analysts?' },
          options: [
            { en: 'Discovering entirely new fields of physics.' },
            { en: 'Past and present historical trends to answer defined questions.' },
            { en: 'Creating futuristic automated operating systems.' },
            { en: 'Designing user interfaces for database apps.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Data Analysts primarily analyze past (historical) data trends to resolve pre-defined queries.' }
        },
        {
          text: { en: 'If you want to build interactive charts and communicate business insights directly to managers, which role aligns best?' },
          options: [
            { en: 'Data Scientist' },
            { en: 'Database Administrator' },
            { en: 'Data Analyst' },
            { en: 'Machine Learning Engineer' }
          ],
          correctAnswerIndex: 2,
          explanation: { en: 'Data Analysts specialize in translating data trends into visual charts and communicating actionable insights to stakeholders.' }
        }
      ]
    }
  }
];

async function seed() {
  try {
    await dbConnect();
    console.log('[SEED] Connected to MongoDB.');

    const db = mongoose.connection.db;
    const topicsColl = db.collection('topics');
    const quizzesColl = db.collection('quizzes');
    const questionsColl = db.collection('questions');
    const coursesColl = db.collection('courses');
    const lessonsColl = db.collection('lessons');

    // Find course and lesson
    const course = await coursesColl.findOne({ slug: 'data-analytics-tutorial' });
    if (!course) {
      console.error('Data Analytics Tutorial course not found! Run the base seed-data-analytics.mjs first.');
      process.exit(1);
    }
    const lesson = await lessonsColl.findOne({ course: course._id, slug: 'foundations' });
    if (!lesson) {
      console.error('Foundations lesson not found! Run the base seed-data-analytics.mjs first.');
      process.exit(1);
    }

    for (const data of topicsData) {
      console.log(`[SEED] Seeding details for topic slug: ${data.slug}`);
      const topicDoc = await topicsColl.findOne({ course: course._id, lesson: lesson._id, slug: data.slug });
      if (!topicDoc) {
        console.warn(`[SEED] Topic with slug ${data.slug} not found in DB. Skipping.`);
        continue;
      }

      // Cleanup existing quizzes and questions for this topic
      if (topicDoc.quizzes && topicDoc.quizzes.length > 0) {
        console.log(`[SEED] Cleaning up existing quizzes/questions for topic ${topicDoc.slug}...`);
        await quizzesColl.deleteMany({ _id: { $in: topicDoc.quizzes } });
        await questionsColl.deleteMany({ quiz: { $in: topicDoc.quizzes } });
      }
      if (topicDoc.quizId) {
        await quizzesColl.deleteOne({ _id: topicDoc.quizId });
        await questionsColl.deleteMany({ quiz: topicDoc.quizId });
      }

      // Create new Quiz document
      const quizId = new mongoose.Types.ObjectId();
      const questionIds = [];

      // Create Questions
      for (let i = 0; i < data.quiz.questions.length; i++) {
        const qData = data.quiz.questions[i];
        const qId = new mongoose.Types.ObjectId();
        
        await questionsColl.insertOne({
          _id: qId,
          quiz: quizId,
          text: qData.text,
          type: 'single',
          points: 1,
          options: qData.options,
          correctAnswerIndex: qData.correctAnswerIndex,
          explanation: qData.explanation,
          order: i,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        questionIds.push(qId);
      }

      // Insert Quiz
      const quizSlug = `${topicDoc.slug}-quiz`;
      await quizzesColl.insertOne({
        _id: quizId,
        title: data.quiz.title,
        slug: quizSlug,
        description: data.quiz.description,
        course: course._id,
        lesson: lesson._id,
        topic: topicDoc._id,
        passingScore: 80,
        passingMarks: 80,
        totalPoints: questionIds.length,
        questions: questionIds,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Update Topic with contentHtml, keyPoints, notes, resources, summary, quizId, quizzes
      await topicsColl.updateOne(
        { _id: topicDoc._id },
        {
          $set: {
            contentHtml: data.contentHtml,
            content: data.contentHtml, // fallback for safety
            keyPoints: data.keyPoints,
            notes: data.notes,
            resources: data.resources,
            summary: data.summary,
            quizId: quizId,
            quizzes: [quizId],
            updatedAt: new Date()
          }
        }
      );
      console.log(`[SEED] Successfully updated topic and associated quiz for ${data.slug}.`);
    }

    console.log('[SEED] Seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[SEED] Error during seeding:', error);
    process.exit(1);
  }
}

seed();
