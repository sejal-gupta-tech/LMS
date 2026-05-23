import mongoose from 'mongoose';
import { dbConnect } from '../lib/dbConnect.ts';

// Helper to slugify text
function slugify(text) {
  return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}

// Generate topic metadata and content templates
function getTopicDetails(lessonSlug, topicName) {
  const t = topicName.toLowerCase();
  
  let overview = `This topic covers the fundamental principles of **${topicName}** in the context of data analytics. You will learn the core logic, syntax or structure, and apply it to our e-commerce project.`;
  let code = `# Example code for ${topicName}\nprint("Running analytics on ElectroMart...")`;
  let scenario = `ElectroMart is optimizing its operations. You need to apply the concepts of ${topicName} to transactional profiles to extract valuable findings.`;
  let task = `Implement the basic calculations or functions of ${topicName} on a test record from the transactional spreadsheet.`;
  let exercise = `Identify the columns or fields in the transaction dataset that will be processed using the logic of ${topicName}.`;
  let project = `Create a script or formula dashboard block that implements ${topicName} to summarize regional sales performance.`;
  let challenge = `Write a script or logical assertion that validates transaction entries using the principles of ${topicName}.`;
  let portfolio = `Save your queries or scripts as a file in your electromart-analytics Git repository.`;
  
  let q1 = `What is a primary objective of ${topicName}?`;
  let options1 = ["To perform data profiling and gain insights", "To slow down database executions", "To delete logs randomly", "None of the above"];
  let ans1 = 0;
  let exp1 = `${topicName} is key to clean, structured, and insightful data analysis.`;

  let q2 = `How does ${topicName} support e-commerce analytics?`;
  let options2 = ["It helps identify sales patterns and customer behavior", "It adds random margins to transactions", "It disables checkout page validations", "It deletes historical database files"];
  let ans2 = 0;
  let exp2 = `Applying ${topicName} ensures business leaders can read accurate trends and optimize checkout pipelines.`;

  let q3 = `Which tool is most commonly associated with ${topicName}?`;
  let options3 = ["Python, Excel, or SQL databases depending on the step", "Web design software", "Physical storage servers", "Video editing platforms"];
  let ans3 = 0;
  let exp3 = `Python (Pandas), Excel, SQL, Power BI, and Tableau are standard industry platforms used to implement data analytics.`;

  // Custom-tailoring based on keywords
  if (t.includes('pandas')) {
    overview = `**Pandas** is the cornerstone of data manipulation in Python. It provides the **DataFrame** object—a 2D tabular data structure resembling an Excel sheet. You will learn to load datasets, inspect columns, view shapes, and slice records.`;
    code = `import pandas as pd\ndf = pd.read_csv("ecommerce_sales.csv")\nprint(df.head())\nprint(df.info())`;
    scenario = `You are a junior analyst at ElectroMart. The CEO has handed you a raw CSV file and wants to know what columns and data types are loaded in memory.`;
    task = `Write a Pandas script to read the transaction data and print the first 5 records to the console using '.head()'.`;
    exercise = `Inspect the output of '.info()'. Which columns are loaded as integers/floats and which are loaded as objects (strings)?`;
    project = `Draft a Python script to check for null values across the transaction fields using 'df.isnull().sum()'.`;
    challenge = `Write a Pandas conditional expression to filter all transactions where Purchase_Amount is greater than $1,000.`;
    portfolio = `Save your script as 'pandas_inspect.py' in your electromart-analytics repository and push the commit.`;
    q1 = `Which Pandas command displays the first few rows of a DataFrame?`;
    options1 = ["df.first()", "df.head()", "df.show()", "df.print()"];
    ans1 = 1;
    exp1 = `The '.head()' function displays the first 5 rows of a DataFrame by default.`;
  } 
  else if (t.includes('numpy')) {
    overview = `**NumPy** (Numerical Python) provides the foundation for mathematical and matrix operations. It introduces the high-performance **ndarray** (N-dimensional array) and optimized linear algebra routines.`;
    code = `import numpy as np\namounts = np.array([1200.0, 85.5, 450.0])\nprint("Mean sales:", np.mean(amounts))\nprint("Double sales:", amounts * 2)`;
    scenario = `ElectroMart needs to run matrix algebra to calculate custom discount multipliers across a list of transactions without loops.`;
    task = `Create a NumPy array from the Purchase_Amount column and calculate the standard deviation using 'np.std()'.`;
    exercise = `Convert the Profit column into a NumPy array and calculate what percentage of transactions returned negative profits.`;
    project = `Perform element-wise multiplication on transaction amounts with a tax rate vector of [1.05, 1.10, 1.08] using NumPy.`;
    challenge = `Filter outlier transactions that are 3 standard deviations away from the mean sales value using NumPy boolean masks.`;
    portfolio = `Save your NumPy array math scripts in a file named 'numpy_matrix.py' and save to your portfolio folder.`;
    q1 = `What is the core data structure introduced by NumPy?`;
    options1 = ["List", "Dictionary", "ndarray", "DataFrame"];
    ans1 = 2;
    exp1 = `The 'ndarray' (N-dimensional array) is the core high-performance structure in NumPy.`;
  }
  else if (t.includes('matplotlib') || t.includes('seaborn')) {
    overview = `**Matplotlib** and **Seaborn** are Python's primary plotting libraries. Matplotlib offers low-level controls, while Seaborn offers statistical templates (like heatmaps, boxplots, and regression lines).`;
    code = `import matplotlib.pyplot as plt\nimport seaborn as sns\nsns.barplot(x="Category", y="Purchase_Amount", data=df)\nplt.title("Revenue by Category")\nplt.show()`;
    scenario = `The marketing team at ElectroMart wants to visualize sales distributions to see if most purchases cluster around lower prices.`;
    task = `Create a Seaborn histogram ('sns.histplot') of the Purchase_Amount column to view the transaction density.`;
    exercise = `Create a boxplot of Profit by Region to identify which region has the highest concentration of profitable checkouts.`;
    project = `Design a dual-axis trend line plotting Revenue vs Profit margins over date intervals using Matplotlib.`;
    challenge = `Create an interactive correlation heatmap of numeric variables in the transaction database using Seaborn.`;
    portfolio = `Save your plotting code as 'seaborn_plots.py' and commit the resulting PNG images into a 'plots/' folder in your git repository.`;
  }
  else if (t.includes('scikit-learn')) {
    overview = `**Scikit-learn** is Python's leading machine learning library. It provides modules for data preprocessing, splitting training/test sets, and implementing models like linear regression.`;
    code = `from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\n# X_train, X_test = train_test_split(X, y, test_size=0.2)`;
    scenario = `ElectroMart wants to predict the profit of a transaction based on the purchase amount. You need to train a simple regression model.`;
    task = `Use Scikit-learn's 'train_test_split' to divide your transaction inputs into an 80/20 train/test split.`;
    exercise = `Train a 'LinearRegression' model where X is 'Purchase_Amount' and y is 'Profit'. What is the slope (coefficient) of the line?`;
    project = `Evaluate your model using mean squared error ('mean_squared_error') and print the score to the sandbox console.`;
    challenge = `Write a pipeline that scales the input features using 'StandardScaler' before fitting the regression model.`;
    portfolio = `Create 'regression_model.py' to document your training coefficients and save to electromart-analytics.`;
  }
  else if (t.includes('csv') || t.includes('excel') || t.includes('json')) {
    overview = `Data analysts work with multiple file formats. You will learn to read and parse CSV files (comma-separated values), Excel grids (.xlsx), and JSON nested structures.`;
    code = `import pandas as pd\ndf_csv = pd.read_csv("ecommerce_sales.csv")\ndf_json = pd.read_json("orders.json")`;
    scenario = `A vendor sends ElectroMart inventory lists in JSON format, and the sales team uses Excel sheets. You must merge them into a unified frame.`;
    task = `Write code to read the CSV sales dataset, then write a second statement reading an Excel worksheet.`;
    exercise = `Load a JSON order record. What keys exist at the root level, and how are nested objects structured?`;
    project = `Read a CSV file, merge it with an Excel datasheet on 'Customer_ID', and write the unified table to a new JSON record.`;
    challenge = `Write code to handle file encoding errors when reading a CSV file containing non-ASCII customer name strings.`;
    portfolio = `Save your reading scripts as 'data_loaders.py' in your electromart-analytics repository.`;
  }
  else if (t.includes('exporting')) {
    overview = `After cleaning or analyzing data in Python, you must save your deliverables. You will learn to export DataFrames to CSV formats and JSON structures.`;
    code = `df_cleaned.to_csv("cleaned_sales.csv", index=False)\ndf_cleaned.to_json("cleaned_sales.json", orient="records")`;
    scenario = `You have removed empty transaction records. The database administrator requests a clean CSV file without line index numbers.`;
    task = `Export your active DataFrame to 'clean_transactions.csv' using the 'index=False' argument to suppress index numbering.`;
    exercise = `Export the customer contact sheet to a JSON file. Verify that the output uses record-oriented list formatting.`;
    project = `Filter all VIP customer profiles and export them to a dedicated sheet file named 'vip_profiles.xlsx'.`;
    challenge = `Write a script that automatically exports monthly sales subsets into partitioned CSV files based on Region values.`;
    portfolio = `Add 'export_subsets.py' to your git repository to document your data delivery scripts.`;
  }
  else if (t.includes('slicing') || t.includes('indexing')) {
    overview = `Slicing and indexing allow you to extract specific rows and columns. You will learn to use '.loc[]' (label-based indexing) and '.iloc[]' (integer position-based indexing).`;
    code = `print(df.iloc[0:5, [0, 4]])\nprint(df.loc[df['Region'] == 'Europe', ['Customer_Name', 'Profit']])`;
    scenario = `The support team needs contact details for the first 10 transactions. You must slice these records out of the master grid.`;
    task = `Use '.iloc' to extract rows 0 to 9 and the columns Customer_Name and Region.`;
    exercise = `Use '.loc' to extract rows where Region is 'North America' and only display the columns Transaction_ID and Purchase_Amount.`;
    project = `Write a function that accepts a region name and returns the transaction ID and Profit of the highest-value sale in that region.`;
    challenge = `Slice the middle 50% of transactions based on sorting by Purchase_Amount, and print their average profitability.`;
    portfolio = `Save your indexing commands as 'slicing_analytics.py' and commit to your portfolio.`;
  }
  else if (t.includes('cleaning') || t.includes('missing') || t.includes('outliers')) {
    overview = `Raw data is noisy. Data Preprocessing involves removing duplicates, handling missing cells (imputation vs deletion), and filtering outlier anomalies.`;
    code = `df_clean = df.drop_duplicates(subset=["Transaction_ID"])\ndf_clean["Profit"] = df_clean["Profit"].fillna(df_clean["Profit"].median())`;
    scenario = `The e-commerce logger had a server glitch, leaving empty values in the Category field and duplicate transaction IDs. You must fix it.`;
    task = `Write a Pandas script to identify and remove all duplicate rows based on the Transaction_ID column.`;
    exercise = `Inspect missing records. Should you drop rows with missing Customer_ID, or impute missing Shipping_Time values with the average?`;
    project = `Detect outliers in Purchase_Amount using the IQR (Interquartile Range) formula and remove rows outside 1.5 times the IQR bounds.`;
    challenge = `Write a preprocessing routine that cleans duplicate IDs, fills missing profits, and flags values beyond 3 standard deviations.`;
    portfolio = `Save your preprocessing steps in a script named 'data_cleaning_pipeline.py' in your git repository.`;
  }
  else if (t.includes('sql') || t.includes('mysql') || t.includes('postgres') || t.includes('queries') || t.includes('join') || t.includes('subquer') || t.includes('window')) {
    overview = `**SQL** (Structured Query Language) is the standard tool for querying relational databases. You will learn queries, filtering, aggregation, and joins.`;
    code = `SELECT Region, SUM(Purchase_Amount) as Total_Sales\nFROM ECommerce_Sales\nWHERE VIP_Status = 'VIP'\nGROUP BY Region\nHAVING SUM(Purchase_Amount) > 1000;`;
    scenario = `ElectroMart stores its master records in a SQL server. You need to write queries to identify top customers and sales by region.`;
    task = `Write a SQL query that retrieves all transactions where Region is 'Europe' and Purchase_Amount is greater than $200.`;
    exercise = `Write a query to JOIN the customers table with the orders table, matching on customer_id, to retrieve Customer_Name and Order_Date.`;
    project = `Write a subquery that identifies transactions with amounts greater than the overall average transaction value.`;
    challenge = `Use a SQL window function ('ROW_NUMBER() OVER (PARTITION BY Region ORDER BY Purchase_Amount DESC)') to find the top transaction in each region.`;
    portfolio = `Save your SQL queries in a file named 'sales_queries.sql' in your electromart-analytics portfolio.`;
    q1 = `Which SQL clause is used to filter records in a group aggregate query?`;
    options1 = ["WHERE", "HAVING", "GROUP BY", "ORDER BY"];
    ans1 = 1;
    exp1 = `The 'HAVING' clause is used to filter groups created by 'GROUP BY', whereas 'WHERE' filters individual rows before aggregation.`;
  }
  else if (t.includes('probability') || t.includes('bayes') || t.includes('statistics') || t.includes('test') || t.includes('calculus') || t.includes('probability') || t.includes('vector') || t.includes('matrix')) {
    overview = `Mathematics and statistics provide the analytical foundation. You will learn descriptive stats (mean, variance), inferential testing, probability rules, and matrix multiplication.`;
    code = `# Mean and standard deviation formulas\nimport numpy as np\nmean = np.mean(dataset)\nstd_dev = np.std(dataset)`;
    scenario = `ElectroMart wants to run an A/B test. You must verify if a new checkout design increased average purchase amounts with statistical significance.`;
    task = `Calculate the Mean, Median, and Variance of the transaction amounts for the selected region.`;
    exercise = `Explain Bayes' Theorem context: What is the probability that a customer is a VIP given they abandoned their shopping cart?`;
    project = `Perform a two-sample t-test to check if the average order values differ significantly between North America and Europe.`;
    challenge = `Write a matrix multiplication code to combine a vector of purchase items with their individual category profit coefficients.`;
    portfolio = `Create a markdown document named 'statistical_analysis.md' explaining your hypothesis, t-test code, and p-value findings.`;
    q1 = `In hypothesis testing, what does a p-value less than 0.05 typically indicate?`;
    options1 = ["Reject the null hypothesis; the result is statistically significant", "Accept the null hypothesis; no significant difference", "The test was calculated incorrectly", "The sample size is too large"];
    ans1 = 0;
    exp1 = `A p-value below the threshold (typically 0.05) indicates that the observed difference is highly unlikely to have occurred by chance, rejecting the null hypothesis.`;
  }
  else if (t.includes('power bi') || t.includes('dax') || t.includes('tableau') || t.includes('dashboard')) {
    overview = `Business Intelligence tools like **Power BI** and **Tableau** transform data into interactive visualizations, calculated fields, DAX measures, and dashboard panels.`;
    code = `// DAX Example Measure\nTotal Revenue = SUM(ECommerce_Sales[Purchase_Amount])\nProfit Margin = DIVIDE([Total Profit], [Total Revenue], 0)`;
    scenario = `The Executive Board at ElectroMart wants an interactive dashboard containing slicers, KPI grids, and region filter panels.`;
    task = `Draft a list of columns required for a custom Tableau or Power BI relational model linking orders with locations.`;
    exercise = `Create a DAX calculated column to classify buyers: VIP if Purchase_Amount is over $1,000, otherwise Standard.`;
    project = `Design a Tableau dashboard mock layout with category bar charts, line trends, and interactive regional filters.`;
    challenge = `Write a DAX measure that calculates the running total of sales over the selected fiscal calendar period.`;
    portfolio = `Save your dashboard layouts and DAX formulas in a file named 'bi_dashboard_roadmap.md' in your git repository.`;
    q1 = `What is the difference between a Calculated Column and a Measure in Power BI?`;
    options1 = ["Columns are calculated at row-level during load; Measures are aggregated dynamically during report interaction", "Measures are calculated at row-level; Columns are aggregated", "There is no difference", "Columns can only store text"];
    ans1 = 0;
    exp1 = `Calculated Columns are evaluated row-by-row and stored in memory. Measures are calculated on-the-fly dynamically depending on dashboard slicers and filters.`;
  }
  
  return {
    overview,
    code,
    scenario,
    task,
    exercise,
    project,
    challenge,
    portfolio,
    q1,
    options1,
    ans1,
    exp1,
    q2,
    options2,
    ans2,
    exp2,
    q3,
    options3,
    ans3,
    exp3
  };
}

async function seed() {
  try {
    await dbConnect();
    console.log('[SEED] Connected to MongoDB.');

    const db = mongoose.connection.db;
    const coursesColl = db.collection('courses');
    const lessonsColl = db.collection('lessons');
    const topicsColl = db.collection('topics');
    const quizzesColl = db.collection('quizzes');
    const questionsColl = db.collection('questions');

    // 1. Find Course
    const course = await coursesColl.findOne({ slug: 'data-analytics-tutorial' });
    if (!course) {
      console.error('Course not found! Make sure database is initialized.');
      process.exit(1);
    }

    // 2. Define target lessons (remaining 11 sections)
    const targetLessons = [
      'data-analysis-libraries',
      'reading-and-loading-datasets',
      'data-preprocessing',
      'data-visualization',
      'sql',
      'mathematics-statistics',
      'exploratory-data-analysis-eda',
      'power-bi',
      'tableau',
      'projects',
      'related-articles'
    ];

    // Find and update each lesson
    for (const slug of targetLessons) {
      const lesson = await lessonsColl.findOne({ course: course._id, slug: slug });
      if (!lesson) {
        console.warn(`[WARN] Lesson not found for slug: ${slug}`);
        continue;
      }
      
      console.log(`[SEED] Seeding topics for Lesson: ${lesson.title.en} (${slug})`);

      // Find topics in this lesson
      const topics = await topicsColl.find({ course: course._id, lesson: lesson._id }).toArray();
      console.log(`Found ${topics.length} topics to update.`);

      for (const topic of topics) {
        console.log(`  -> Processing topic: ${topic.title.en}`);
        const details = getTopicDetails(slug, topic.title.en);

        // Cleanup existing quiz and questions if any
        if (topic.quizzes && topic.quizzes.length > 0) {
          await quizzesColl.deleteMany({ _id: { $in: topic.quizzes } });
          await questionsColl.deleteMany({ quiz: { $in: topic.quizzes } });
        }
        if (topic.quizId) {
          await quizzesColl.deleteOne({ _id: topic.quizId });
          await questionsColl.deleteMany({ quiz: topic.quizId });
        }

        // Generate Quiz and Questions
        const quizId = new mongoose.Types.ObjectId();
        const questionIds = [];

        const quizQuestions = [
          { text: details.q1, options: details.options1, ans: details.ans1, exp: details.exp1 },
          { text: details.q2, options: details.options2, ans: details.ans2, exp: details.exp2 },
          { text: details.q3, options: details.options3, ans: details.ans3, exp: details.exp3 }
        ];

        for (let i = 0; i < quizQuestions.length; i++) {
          const q = quizQuestions[i];
          const questionId = new mongoose.Types.ObjectId();
          await questionsColl.insertOne({
            _id: questionId,
            quiz: quizId,
            text: { en: q.text },
            type: 'single',
            points: 1,
            options: q.options.map(opt => ({ en: opt })),
            correctAnswerIndex: q.ans,
            explanation: { en: q.exp },
            order: i,
            createdAt: new Date(),
            updatedAt: new Date()
          });
          questionIds.push(questionId);
        }

        // Insert Quiz
        const quizSlug = `${topic.slug}-quiz`;
        await quizzesColl.insertOne({
          _id: quizId,
          title: { en: `${topic.title.en} Topic Quiz` },
          slug: quizSlug,
          description: { en: `Verify your understanding of ${topic.title.en}.` },
          course: course._id,
          lesson: lesson._id,
          topic: topic._id,
          passingScore: 80,
          passingMarks: 80,
          totalPoints: questionIds.length,
          questions: questionIds,
          order: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        // Construct HTML content incorporating the 6 standard PBL sections
        const contentHtml = `<div class="space-y-6">
  <p>${details.overview}</p>

  <h3 class="text-xl font-bold mt-6 mb-3">Topic Application Code</h3>
  <pre class="overflow-auto rounded-[1.5rem] border border-slate-800 bg-slate-950 p-5 text-sm font-mono text-cyan-50 shadow-lg"><code>${details.code}</code></pre>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">${details.scenario}</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">${details.task}</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">${details.exercise}</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">${details.project}</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Logic Challenge</h4>
      <p class="text-sm">${details.challenge}</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">${details.portfolio}</p>
    </div>
  </div>
</div>`;

        // Mock KeyPoints, Notes, Resources
        const keyPoints = [
          `${topic.title.en} represents a fundamental component of data analytics workflows.`,
          `Applying this logic helps uncover anomalies, patterns, or predictions in e-commerce fields.`,
          `Always test your functions or statements in isolated sandboxes before committing to master tables.`
        ];

        const notes = [
          `Optimization Tip: Make sure your scripts avoid repetitive loops; utilize vectorized arrays or query indexes.`,
          `Maintain clear descriptions in your data dictionary to help stakeholders understand checkout fields.`
        ];

        const resources = [
          { title: `GeeksforGeeks: ${topic.title.en} Tutorial`, url: `https://www.geeksforgeeks.org/data-analysis/` },
          { title: `Official Documentation Guide`, url: `https://docs.python.org/` }
        ];

        // Update Topic document in database
        await topicsColl.updateOne(
          { _id: topic._id },
          {
            $set: {
              contentHtml: contentHtml,
              content: contentHtml, // fallback
              keyPoints: keyPoints,
              notes: notes,
              resources: resources,
              summary: `Comprehensive analysis, exercises, quizzes, and coding scripts for ${topic.title.en}.`,
              quizId: quizId,
              quizzes: [quizId],
              updatedAt: new Date()
            }
          }
        );
      }
    }

    console.log('[SEED] Completed seeding all remaining sections successfully!');
    process.exit(0);
  } catch (err) {
    console.error('[SEED] Error seeding remaining sections:', err);
    process.exit(1);
  }
}

seed();
