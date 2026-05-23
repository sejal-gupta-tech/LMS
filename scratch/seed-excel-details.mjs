import mongoose from 'mongoose';
import { dbConnect } from '../lib/dbConnect.ts';

const topicsData = [
  {
    slug: 'excel-introduction-5774',
    summary: { en: 'An overview of Microsoft Excel\'s role in modern data analysis, exploring spreadsheet anatomy, formatting, and the grid system.' },
    keyPoints: [
      'Microsoft Excel is the world\'s most popular tool for data storage, cleaning, and basic calculations.',
      'Understanding the Excel Grid (Rows, Columns, Cells) is fundamental to all data tasks.',
      'Excel allows for rapid prototyping of analytical ideas before writing database code.'
    ],
    notes: [
      'Data is stored in cells identified by columns (letters) and rows (numbers), such as A1.',
      'Pressing Ctrl + Z is your best friend when learning: it undoes your last action.'
    ],
    resources: [
      { title: 'GeeksforGeeks Excel Tutorial', url: 'https://www.geeksforgeeks.org/excel-tutorial/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Welcome to the **Excel Section**! Excel is the absolute cornerstone of business intelligence. Before writing python code or SQL queries, almost every business analyst starts by looking at data in Excel.</p>
  
  <blockquote>
    "Excel is the Swiss Army knife of data analytics. It allows you to organize, clean, filter, and calculate numbers in seconds, providing a visual playground to understand your data."
  </blockquote>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Spreadsheet Anatomy</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
    <div class="p-4 border border-blue-100 bg-blue-50/50 rounded-2xl">
      <h4 class="font-bold text-blue-900">Columns (A, B, C...)</h4>
      <p class="text-xs text-slate-600 mt-1">Vertical columns run from left to right. They are labeled with letters.</p>
    </div>
    <div class="p-4 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
      <h4 class="font-bold text-emerald-900">Rows (1, 2, 3...)</h4>
      <p class="text-xs text-slate-600 mt-1">Horizontal rows run from top to bottom. They are labeled with numbers.</p>
    </div>
    <div class="p-4 border border-purple-100 bg-purple-50/50 rounded-2xl">
      <h4 class="font-bold text-purple-900">Cells (A1, B2...)</h4>
      <p class="text-xs text-slate-600 mt-1">The intersection of a row and a column. This is where data lives.</p>
    </div>
  </div>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">The CEO of ElectroMart sends you a raw CSV file containing customer transaction histories. Your first task is to open it in Excel, understand the column layout, and make sure cells align correctly.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Open Excel, create a new blank workbook, and type the column headers: Transaction_ID, Customer_Name, Order_Date, Category, Quantity, Sales, and Profit.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Download the e-commerce dataset template and identify the absolute cell coordinates of the first transaction row (usually row 2).</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Design the visual landing block for your dashboard worksheet. Set up a section labeled "E-COMMERCE METRICS WORKBOOK".</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Double click on the separator between column headers A and B. What does this shortcut do to the column width?</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Save your Excel file as <code>electromart_raw_data.xlsx</code>. Document your setup step in the README file of your portfolio repository.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Excel Introduction Quiz' },
      description: { en: 'Test your knowledge on spreadsheet terminology.' },
      questions: [
        {
          text: { en: 'What is the intersection of a column and a row called in Excel?' },
          options: [{ en: 'Range' }, { en: 'Cell' }, { en: 'Grid' }, { en: 'Workbook' }],
          correctAnswerIndex: 1,
          explanation: { en: 'A cell is the exact point where a row and column intersect, referenced by its column letter and row number (e.g. B5).' }
        },
        {
          text: { en: 'Which coordinate represents column C and row 12?' },
          options: [{ en: '12C' }, { en: 'C-12' }, { en: 'C12' }, { en: 'C:12' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Excel cell addresses are always written with the column letter first, followed immediately by the row number (e.g. C12).' }
        },
        {
          text: { en: 'What is the maximum row limit on a standard Excel worksheet?' },
          options: [{ en: '65,536' }, { en: '1,048,576' }, { en: '500,000' }, { en: 'Unlimited' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Excel sheets support a maximum of 1,048,576 rows and 16,384 columns (up to column XFD).' }
        }
      ]
    }
  },
  {
    slug: 'excel-basic-excel-formulas-5815',
    summary: { en: 'Learn to perform basic mathematical operations using SUM, AVERAGE, COUNT, MIN, and MAX functions.' },
    keyPoints: [
      'All Excel formulas must begin with an equals sign (=).',
      'Common aggregation functions include SUM, AVERAGE, COUNT, MIN, and MAX.',
      'Excel ranges are written using a colon separator, like A1:A10.'
    ],
    notes: [
      'Always check your ranges: Excel might include header cells or blank rows.',
      'COUNT only counts cells containing numbers. Use COUNTA to count cells containing text.'
    ],
    resources: [
      { title: 'Excel Formulas Cheat Sheet', url: 'https://www.customguide.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Formulas allow Excel to calculate values automatically. Without formulas, spreadsheets are just static tables of text.</p>
  
  <blockquote>
    "A formula is an expression that operates on values in a range of cells. In Excel, every formula must begin with an equals sign (=)."
  </blockquote>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Core Math Functions</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>=SUM(range)</strong>
      <p class="text-xs text-slate-600 mt-1">Adds all values in the range. Example: <code>=SUM(A1:A5)</code></p>
    </div>
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>=AVERAGE(range)</strong>
      <p class="text-xs text-slate-600 mt-1">Calculates the mean of the range. Example: <code>=AVERAGE(B1:B10)</code></p>
    </div>
  </div>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">Now that the transaction data is loaded, your manager wants to know the overall sales and average purchase value of customer orders.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write formulas to sum all transaction values in column F (Sales) and calculate the average ticket size using <code>=SUM()</code> and <code>=AVERAGE()</code>.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">If Sales values are in cells F2 to F100, calculate the total revenue using <code>=SUM(F2:F100)</code>. Record the resulting value.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Create a KPI block card in your sheet. Use formulas to display Total Orders, Total Sales, and Average Revenue dynamically.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write a formula to find the single highest order amount in the F2:F100 range. Hint: Use <code>=MAX()</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Take a screenshot of your dynamic KPI cards. Add a new section in your proposal repository showing these aggregated sales metrics.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Basic Excel Formulas Quiz' },
      description: { en: 'Verify your understanding of formula syntax.' },
      questions: [
        {
          text: { en: 'Which character MUST every formula in Excel begin with?' },
          options: [{ en: '+' }, { en: '@' }, { en: '=' }, { en: '#' }],
          correctAnswerIndex: 2,
          explanation: { en: 'All formulas and functions in Excel must start with an equals sign (=). If not, Excel treats it as plain text.' }
        },
        {
          text: { en: 'If cell A1=10, A2=20, and A3=30, what does =AVERAGE(A1:A3) return?' },
          options: [{ en: '60' }, { en: '20' }, { en: '15' }, { en: '30' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The average is the sum (10+20+30=60) divided by the count (3), which is 20.' }
        },
        {
          text: { en: 'What does the formula =COUNT(A1:A5) do?' },
          options: [
            { en: 'Adds all numbers in cells A1 to A5.' },
            { en: 'Counts only the cells in the range that contain numeric values.' },
            { en: 'Counts all cells containing text or numbers.' },
            { en: 'Multiplies cells together.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'COUNT only counts cells containing numbers. Cells with text, spaces, or errors are ignored.' }
        }
      ]
    }
  },
  {
    slug: 'excel-sorting-5856',
    summary: { en: 'Organize raw data in ascending, descending, or custom configurations, covering single-level and multi-level sorts.' },
    keyPoints: [
      'Sorting helps identify minimum/maximum values, alphabetical listings, and custom date orderings.',
      'Single-level sorting reorganizes data based on one column.',
      'Multi-level sorting applies hierarchical sorting across multiple columns.'
    ],
    notes: [
      'Ensure you expand your selection when sorting. If you do not, you will scramble your data rows.',
      'Custom lists can be created to sort non-alphabetical categories.'
    ],
    resources: [
      { title: 'Microsoft Support: Sort data in a range', url: 'https://support.microsoft.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Sorting arranges data in a specific logical sequence—alphabetical, numerical, or chronological. It helps analysts identify extremes, cluster categories, and find trends.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart has transaction records in random order. Your team wants to view the highest revenue transactions first to identify top purchasing behavior.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Apply a single-level descending sort on the Sales column (F) to immediately bubble the largest dollar purchases to the top.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Set up a multi-level sort: first sort by Category (alphabetical, A to Z), and then by Sales (descending, largest to smallest).</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Create a sorted list of your top 10 transactions. Extract their details into a separate table on your report sheet.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">How do you sort items by day of the week (Monday, Tuesday, etc.) without using alphabetical order? Hint: Use custom lists.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Document the sorting criteria and results in your portfolio project folder under a section named <code>Transaction Ranking</code>.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Sorting Quiz' },
      description: { en: 'Test sorting rules.' },
      questions: [
        {
          text: { en: 'What does Excel ask you to do if you select and sort only one column inside a larger table?' },
          options: [
            { en: 'Convert to lowercase' },
            { en: 'Expand the selection' },
            { en: 'Delete duplicate rows' },
            { en: 'Add a chart' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Excel warns you because sorting a single column out of a table will break relationship links between rows.' }
        },
        {
          text: { en: 'If you need to sort data by State, and then by City within each State, which feature should you use?' },
          options: [{ en: 'Single-level Sort' }, { en: 'Filter' }, { en: 'Multi-level Sort' }, { en: 'Data Validation' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Multi-level sorting allows you to specify primary, secondary, and tertiary sorting rules.' }
        },
        {
          text: { en: 'How should you sort product priorities labeled: High, Medium, Low?' },
          options: [{ en: 'Alphabetically Ascending (A to Z)' }, { en: 'Alphabetically Descending (Z to A)' }, { en: 'Custom List Sort' }, { en: 'Numerical Sort' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Alphabetical sort would organize them as High, Low, Medium (H, L, M) which is incorrect. A Custom List Sort maintains their logical order.' }
        }
      ]
    }
  },
  {
    slug: 'excel-filtering-5897',
    summary: { en: 'Learn to isolate specific subsets of data using AutoFilters and advanced custom criteria.' },
    keyPoints: [
      'Filtering temporarily hides rows that do not meet your specified criteria without deleting them.',
      'AutoFilters allow quick filtering by text match, numeric ranges, or colors.',
      'You can filter by multiple criteria on different columns simultaneously.'
    ],
    notes: [
      'Filtered rows have blue row numbers instead of the default black ones.',
      'Clearing a filter returns the sheet to its original state showing all records.'
    ],
    resources: [
      { title: 'Filtering data in Excel', url: 'https://support.microsoft.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Filtering temporarily hides rows that you do not want to see, letting you focus only on relevant data points.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">The ElectroMart operations lead wants to isolate transactions from the "Technology" category with values greater than $500 to evaluate supplier fees.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Apply the filter dropdown on your Category column. Uncheck all except "Technology". Then apply a Number Filter of "Greater Than" 500 on the Sales column.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Filter the transactions to show only orders shipped to "California" (CA) state with a profit margin less than zero. Note the count of these transactions.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Isolate all orders from last quarter. Copy the filtered rows into a new worksheet named "Q4_Performance_Data".</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write down the shortcut keys to toggle the filter dropdown buttons on and off in Excel (Hint: Ctrl + Shift + L).</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Describe your findings about California\'s negative margin orders in a new file <code>UNPROFITABLE_ORDERS.md</code> inside your git repository.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Filtering Quiz' },
      description: { en: 'Validate your understanding of filtering behaviors.' },
      questions: [
        {
          text: { en: 'What happens to the row numbers on the left of the Excel window when a filter is active?' },
          options: [{ en: 'They turn red.' }, { en: 'They disappear entirely.' }, { en: 'They turn blue.' }, { en: 'They become bold and italic.' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Excel changes row headers to blue to visually signify that rows are hidden due to an active filter.' }
        },
        {
          text: { en: 'Does filtering delete data rows permanently?' },
          options: [{ en: 'Yes, if you save the file.' }, { en: 'No, it only temporarily hides them from view.' }, { en: 'Yes, unless you click Undo.' }, { en: 'Only if the cells are blank.' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Filtering is non-destructive. Hiding rows does not affect the actual data, and clearing the filter restores all rows.' }
        },
        {
          text: { en: 'Which filter option should you use to see sales between $5,000 and $10,000?' },
          options: [{ en: 'Text Filter -> Contains' }, { en: 'Number Filter -> Between' }, { en: 'Color Filter -> Custom' }, { en: 'Sort Ascending' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Number Filter -> Between lets you specify minimum and maximum boundaries for numerical ranges.' }
        }
      ]
    }
  },
  {
    slug: 'excel-conditional-formatting-5936',
    summary: { en: 'Format cells dynamically using colors, scales, data bars, and formulas based on cell values.' },
    keyPoints: [
      'Conditional Formatting changes a cell\'s appearance based on conditions.',
      'Visual cues like Data Bars and Color Scales highlight trends instantly.',
      'Custom formula rules allow you to format entire rows based on a single cell\'s value.'
    ],
    notes: [
      'Do not overuse conditional formatting; too many colors make the sheet messy.',
      'Rules are applied in order of precedence: the top rule wins if there is a conflict.'
    ],
    resources: [
      { title: 'Conditional Formatting Rules Guide', url: 'https://www.contextures.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Conditional Formatting applies text formatting, borders, and fills automatically based on criteria you set. It transforms dry sheets into color-coded dashboards.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart warehouse managers are overlooking negative profit transactions, causing financial leaks. You need to alert them visually whenever profit goes below zero.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Select the Profit column (G). In Conditional Formatting, select "Highlight Cells Rules" -> "Less Than", type 0, and choose "Light Red Fill with Dark Red Text".</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Apply a Green-to-Red Color Scale on the Quantity column to immediately spot orders with massive quantities.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Configure a custom formula-based formatting rule to fill the entire row with a light blue background if the customer is marked as "VIP" in column H.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write the exact formula rule used to highlight rows where column H equals "VIP". Hint: <code>=$H2="VIP"</code> (note the absolute column lock).</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Export your color-coded table. Save a screenshot inside your electromart-analytics docs folder as proof of your UI dashboard styling skills.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Conditional Formatting Quiz' },
      description: { en: 'Check formatting rules.' },
      questions: [
        {
          text: { en: 'What is the primary function of Data Bars in Conditional Formatting?' },
          options: [{ en: 'To delete small numbers.' }, { en: 'To display horizontal bars inside cells to visualize their relative sizes.' }, { en: 'To change cell width automatically.' }, { en: 'To insert column charts on separate sheets.' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Data Bars draw in-cell bar visuals, comparing values in the range without taking up separate chart space.' }
        },
        {
          text: { en: 'How are rules resolved if multiple Conditional Formatting rules match the same cell?' },
          options: [{ en: 'The last rule added is used.' }, { en: 'They merge, but if they conflict, the top rule wins.' }, { en: 'The cell turns black.' }, { en: 'Excel picks one at random.' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Rules are evaluated in order of priority. The top rule in the Conditional Formatting Rules Manager takes precedence.' }
        },
        {
          text: { en: 'Which feature color-codes cells using a gradient based on value scales?' },
          options: [{ en: 'Icon Sets' }, { en: 'Color Scales' }, { en: 'Data Validation' }, { en: 'Custom Filters' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Color Scales use continuous gradients (like heatmaps) to visualize numerical spreads.' }
        }
      ]
    }
  },
  {
    slug: 'excel-data-validation-5974',
    summary: { en: 'Control user input by setting rules for integers, dates, text lengths, and dropdown selections.' },
    keyPoints: [
      'Data Validation ensures users enter clean, accurate, and consistent data.',
      'Input Messages explain criteria to users before they type, and Error Alerts warn them after errors.',
      'Dropdown lists are created using the \'List\' validation criteria.'
    ],
    notes: [
      'Data Validation only prevents future invalid entries; it does not retroactively fix existing errors.',
      'You can use the \'Circle Invalid Data\' tool to highlight existing records.'
    ],
    resources: [
      { title: 'Excel Data Validation Tutorial', url: 'https://www.contextures.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>To perform accurate analysis, you need clean data. **Data Validation** restricts the type of values or text that users can type into specific cells, preventing bad data from entering your sheets.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart data entry operators are typing inconsistent region names (e.g. "North", "N. America", "NA"). You must enforce a strict dropdown list showing only valid region codes.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Create a dropdown validation list in column I. Restrict entries to: "North America, Europe, Asia Pacific, Latin America".</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Configure data validation rules in the Quantity column to only allow integers between 1 and 100. Enter an input helper message: "Enter integer between 1 and 100".</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Create a customer feedback rating cell. Restrict entries to whole numbers from 1 to 5, and customize a strict warning error message when invalid scores are entered.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">What happens when a user attempts to paste invalid data from another source into a cell protected by validation? Does Excel block it?</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Save your workbook configuration. Document the validation rules and dropdown constraints inside your project proposal docs.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Data Validation Quiz' },
      description: { en: 'Test validation settings.' },
      questions: [
        {
          text: { en: 'Which criteria option in Data Validation is used to create dropdown menus?' },
          options: [{ en: 'Dropdown' }, { en: 'List' }, { en: 'Custom' }, { en: 'Text Length' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Setting validation criteria to "List" allows you to select a range or type list items separated by commas to create dropdown menus.' }
        },
        {
          text: { en: 'True or False: Data Validation automatically fixes invalid cells that existed before you set up the rules.' },
          options: [{ en: 'True' }, { en: 'False' }],
          correctAnswerIndex: 1,
          explanation: { en: 'False. Data Validation only controls future entries. Pre-existing invalid cells remain unaltered.' }
        },
        {
          text: { en: 'What feature displays a helpful message explaining the entry rules when a user clicks a validated cell?' },
          options: [{ en: 'Error Alert' }, { en: 'Input Message' }, { en: 'Hover Tooltip' }, { en: 'Rule Manager' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Input Messages act as guides that appear when a cell is selected, before any typing takes place.' }
        }
      ]
    }
  },
  {
    slug: 'excel-removing-duplicates-6014',
    summary: { en: 'Detect and remove duplicate rows from datasets to maintain record uniqueness.' },
    keyPoints: [
      'Removing duplicates cleanses datasets by ensuring every row contains unique key data.',
      'You can select specific columns to define what constitutes a duplicate record.',
      'Excel provides a summary pop-up showing how many duplicates were removed.'
    ],
    notes: [
      'Excel permanently deletes duplicate rows. Always save a backup copy first!',
      'Removing duplicates is case-insensitive.'
    ],
    resources: [
      { title: 'Deduplication in Excel', url: 'https://support.microsoft.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Duplicate records lead to skewed averages, inflated sums, and dirty analysis. Excel provides a direct deduplication tool to clean your ranges in one click.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">The ElectroMart sales dataset contains double-recorded clicks due to server lag. This inflates total sales count. You need to purge these duplicate transactions.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Select the entire e-commerce transactions table. Click Data -> Remove Duplicates, select only the <code>Transaction_ID</code> column, and execute.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Run the Remove Duplicates check by selecting both <code>Customer_Name</code> and <code>Order_Date</code>. Observe how many rows are categorized as duplicate.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Extract a clean, unique list of all unique customer names from column B. Place this unique customer directory on a separate worksheet named "Unique_Customers".</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">What Excel function (Excel 365/2021) can extract unique values dynamically as a formula instead of using the Data tab tool? Hint: <code>=UNIQUE()</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Add a new file <code>DEDUPLICATION_LOG.md</code> in your electromart-analytics repository. Record the number of duplicate transactions purged and unique records saved.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Removing Duplicates Quiz' },
      description: { en: 'Test deduplication.' },
      questions: [
        {
          text: { en: 'What does Excel do to duplicate rows when you execute the Remove Duplicates command?' },
          options: [{ en: 'It highlights them in red.' }, { en: 'It permanently deletes them.' }, { en: 'It moves them to a separate worksheet.' }, { en: 'It hides them from view.' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Remove Duplicates permanently purges duplicate rows from the spreadsheet. Always keep backups.' }
        },
        {
          text: { en: 'Is Excel\'s duplicate removal process case-sensitive?' },
          options: [{ en: 'Yes, it treats different casings as separate entries.' }, { en: 'No, it treats "ABC" and "abc" as identical.' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Deduplication is case-insensitive in Excel, matching identical letters regardless of casing.' }
        },
        {
          text: { en: 'What happens if you run Remove Duplicates selecting only the "Customer ID" column inside a multi-column table?' },
          options: [{ en: 'Only rows with identical values in every column are deleted.' }, { en: 'Any row with a duplicate Customer ID is deleted, regardless of differing data.' }, { en: 'The Customer ID column is deleted.' }, { en: 'An error occurs.' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Deduplicating on a key column treats any rows sharing that key value as duplicates, keeping only the first occurrence.' }
        }
      ]
    }
  },
  {
    slug: 'excel-lookup-functions-vlookup-hlookup-index-match-6055',
    summary: { en: 'Retrieve values from reference tables using vertical lookups, horizontal lookups, and dynamic index-matching.' },
    keyPoints: [
      'VLOOKUP searches vertically in the first column of a table and moves right to return values.',
      'HLOOKUP performs lookups horizontally across the first row and moves down.',
      'INDEX & MATCH combined bypasses VLOOKUP limitations by enabling leftward lookups.'
    ],
    notes: [
      'Set VLOOKUP\'s fourth argument to FALSE for exact matches.',
      'INDEX returns the value of a cell at a specific coordinate; MATCH returns the row index.'
    ],
    resources: [
      { title: 'INDEX MATCH vs VLOOKUP Guide', url: 'https://exceljet.net/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Lookup functions allow you to connect tables together. For example, if you have an Order Sheet with "Product ID," you can lookup the "Price" from a separate Inventory Table.</p>
  
  <h3 class="text-xl font-bold mt-6 mb-3">VLOOKUP Syntax</h3>
  <pre><code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code></pre>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart has order logs in one sheet, but customer profiles (VIP status, address) are stored in another sheet. You need to pull VIP categories into your sales records.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write a <code>=VLOOKUP()</code> formula to search for Customer_ID in the profile directory and pull the Customer_Type (VIP or Standard) into column H of your sales sheet.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Create a formula using <code>=INDEX(..., MATCH(...))</code> to retrieve the Customer Email (stored to the left of Customer Name in the profile sheet) for the transaction row.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build an interactive order lookup form block. A user can type a Transaction_ID in cell K2, and formulas below will pull the Customer Name, Sales value, and shipping status dynamically.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">If VLOOKUP returns an <code>#N/A</code> error because the ID is missing, what function can wrap VLOOKUP to show "ID Not Found" instead of the error code? Hint: <code>=IFERROR()</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Document the lookup schema inside a <code>DATA_CONNECTIONS.md</code> file in your electromart-analytics portfolio folder.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Lookup Functions Quiz' },
      description: { en: 'Validate VLOOKUP logic.' },
      questions: [
        {
          text: { en: 'Which parameter should you pass as the fourth argument of VLOOKUP to force an exact match?' },
          options: [{ en: 'TRUE' }, { en: 'FALSE' }, { en: '0' }, { en: 'Either FALSE or 0' }],
          correctAnswerIndex: 3,
          explanation: { en: 'Both FALSE and 0 instruct Excel to look for an exact match. Using TRUE or 1 allows approximate matches, which can lead to calculation errors.' }
        },
        {
          text: { en: 'Can VLOOKUP search for lookup values to the left of the return column?' },
          options: [{ en: 'Yes, always.' }, { en: 'No, it can only search left-to-right.' }, { en: 'Only if the values are numbers.' }, { en: 'Only if sorted.' }],
          correctAnswerIndex: 1,
          explanation: { en: 'VLOOKUP requires the lookup key to be in the first (leftmost) column of the range. INDEX & MATCH is used to solve this limitation.' }
        },
        {
          text: { en: 'Which function returns the relative index position of a matching value within a range?' },
          options: [{ en: 'INDEX' }, { en: 'MATCH' }, { en: 'VLOOKUP' }, { en: 'FIND' }],
          correctAnswerIndex: 1,
          explanation: { en: 'MATCH searches a range and returns the coordinate position (row index) of the item (e.g., row 4).' }
        }
      ]
    }
  },
  {
    slug: 'excel-text-functions-left-right-mid-concatenate-6095',
    summary: { en: 'Manipulate, extract, and join text strings using core text functions.' },
    keyPoints: [
      'LEFT extracts characters from the start, RIGHT from the end, and MID from a specified position.',
      'CONCATENATE (or the & operator) merges multiple strings together.',
      'Text manipulation is ideal for cleaning codes, phone numbers, and full names.'
    ],
    notes: [
      'The & operator is shorter and more flexible than CONCATENATE: ="Hello " & A1 works instantly.',
      'Ensure you account for spaces: joining text without spaces will result in mashed words.'
    ],
    resources: [
      { title: 'Excel Text Functions Reference', url: 'https://support.microsoft.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Data imported from external servers often needs cleaning. Text functions allow you to slice strings, merge columns, and isolate character codes.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">The ElectroMart dataset stores product serial numbers in a single column containing the Product SKU, Warehouse Code, and Date Code separated by dashes (e.g. "TEC-LA-2026"). You need to extract just the Warehouse Code.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write a formula using <code>=MID(A2, 5, 2)</code> to pull out the 2-letter Warehouse Code from the serial numbers in cell A2.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">If Customer Name in column B contains both First Name and Last Name separated by a space, write a formula to join "Dear " with their First Name using the <code>&</code> operator.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Create a full mailing list column. Use concatenation to combine Customer Name, " | ", City, and Country into a clean mailing address block.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write an Excel formula to pull the first 3 characters of the Customer Name in cell B2, capitalize them, and append "-MEMBER". Hint: <code>=UPPER(LEFT(B2, 3)) & "-MEMBER"</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Save your formulas sheet. Document how you cleaned product codes and customer labels in your electromart-analytics docs.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Text Functions Quiz' },
      description: { en: 'Test text formulas.' },
      questions: [
        {
          text: { en: 'If cell A1 contains "ID-5920", which formula returns the numeric part "5920"?' },
          options: [{ en: '=LEFT(A1, 4)' }, { en: '=RIGHT(A1, 4)' }, { en: '=MID(A1, 3, 4)' }, { en: 'Both =RIGHT(A1, 4) and =MID(A1, 4, 4)' }],
          correctAnswerIndex: 1,
          explanation: { en: 'RIGHT(A1, 4) starts from the rightmost character and pulls 4 characters, giving "5920".' }
        },
        {
          text: { en: 'What does the ampersand (&) operator do in Excel formulas?' },
          options: [
            { en: 'Multiplies two cells together.' },
            { en: 'Combines (concatenates) multiple text strings into one.' },
            { en: 'Searches for text in a worksheet.' },
            { en: 'Validates inputs.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'The & character acts as a concatenate operator, joining strings or cell values sequentially.' }
        },
        {
          text: { en: 'What is the output of =LEFT("Data Analyst", 4)?' },
          options: [{ en: 'Analyst' }, { en: 'Data' }, { en: 'Dat' }, { en: 'Data ' }],
          correctAnswerIndex: 1,
          explanation: { en: 'LEFT("Data Analyst", 4) pulls the first 4 characters, which spelling-wise forms "Data".' }
        }
      ]
    }
  },
  {
    slug: 'excel-if-function-6136',
    summary: { en: 'Apply logical tests to route calculations and return conditional values based on TRUE/FALSE outcomes.' },
    keyPoints: [
      'The IF function returns one value if a condition is true, and another if false.',
      'Logical tests use comparison operators: =, <, >, <=, >=, <> (not equal).',
      'Nested IFs evaluate multiple conditions sequentially.'
    ],
    notes: [
      'If you need more than 3 nested IFs, consider using the IFS function or VLOOKUP.',
      'Remember to enclose text outputs in double quotation marks (e.g. "Pass").'
    ],
    resources: [
      { title: 'IF and Nested IF Statements', url: 'https://exceljet.net/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>The **IF** function is the core decision-making tool in Excel. It evaluates whether a condition is met, returning different outputs depending on the outcome.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart wants to classify transactions as "High Value" if the purchase amount is greater than $500. This tag will determine support priorities.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write an <code>=IF()</code> formula in column J: <code>=IF(F2>500, "High Value", "Standard")</code> to tag each row based on Sales in column F.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Use nested IFs to categorize shipping priority: if Shipping_Region is "Europe" or "North America", priority is "Express", otherwise "Standard".</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Create a conditional discount calculation column. If customer type is "VIP" and quantity is > 5, apply a 15% discount, else 0%.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write the exact logical formula combining AND: <code>=IF(AND(H2="VIP", E2>5), 0.15, 0)</code>. Test this in column K.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Document your pricing logic rules inside a new file <code>BUSINESS_RULES.md</code> inside your git repository.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'IF Function Quiz' },
      description: { en: 'Verify logical routing.' },
      questions: [
        {
          text: { en: 'If cell A1 contains 85, what does =IF(A1>=90, "A", IF(A1>=80, "B", "C")) return?' },
          options: [{ en: 'A' }, { en: 'B' }, { en: 'C' }, { en: 'FALSE' }],
          correctAnswerIndex: 1,
          explanation: { en: '85 is not >=90 (first IF fails), but it is >=80 (second IF matches), resulting in "B".' }
        },
        {
          text: { en: 'Which operator represents "not equal to" in Excel IF statements?' },
          options: [{ en: '!=' }, { en: '<>' }, { en: '~=' }, { en: '==' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Excel uses angle brackets pointing away from each other (<>) to represent logical inequality.' }
        },
        {
          text: { en: 'What does the formula =IF(10<5, "Apple") return since no false value is specified?' },
          options: [{ en: 'Apple' }, { en: '0' }, { en: 'FALSE' }, { en: 'Error #VALUE!' }],
          correctAnswerIndex: 2,
          explanation: { en: 'If the condition is false and the false value parameter is omitted, Excel returns the boolean value FALSE by default.' }
        }
      ]
    }
  },
  {
    slug: 'excel-date-functions-6178',
    summary: { en: 'Calculate ages, project timelines, and extract date parts using TODAY, DATEDIF, and date math.' },
    keyPoints: [
      'Excel stores dates as sequential serial numbers starting from January 1, 1900.',
      'TODAY() returns the current system date dynamically.',
      'DATEDIF calculates the difference between two dates in years (\'Y\'), months (\'M\'), or days (\'D\').'
    ],
    notes: [
      'DATEDIF is a hidden function: it will not show up in autocomplete, but works when typed.',
      'Subtracting two date cells gives the number of days between them.'
    ],
    resources: [
      { title: 'Working with Dates in Excel', url: 'https://support.microsoft.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Timestamps and dates are standard in business data. Excel provides date functions to calculate durations, ages, and timelines.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart customers are complaining about slow shipping. You need to calculate the exact shipping delay (Ship_Date minus Order_Date) for every transaction to spot bottlenecks.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write a formula in column L: <code>=D2-C2</code> (assuming D2 is Ship_Date and C2 is Order_Date) to calculate elapsed delivery days. Set column formatting to Number.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Use <code>=YEAR(C2)</code> and <code>=MONTH(C2)</code> to extract the transaction year and month indices into columns M and N to enable seasonal reporting.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a shipping latency report. Calculate average shipping delay for ElectroMart across regions, highlighting regions exceeding 5 days.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write a formula using DATEDIF to calculate how many full months have elapsed since an order was placed compared to the current date today (<code>=TODAY()</code>).</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Document average shipping latencies by region in your proposal. Highlight how shipping delays affect customer review scores.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Date Functions Quiz' },
      description: { en: 'Verify Excel date calculations.' },
      questions: [
        {
          text: { en: 'How does Excel internally represent dates?' },
          options: [{ en: '0' }, { en: '1' }, { en: '19000101' }, { en: '01-Jan-1900' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Excel serializes dates starting with January 1, 1900 as number 1. Every day after adds 1 to the serial number.' }
        },
        {
          text: { en: 'Which code should you pass as the third argument of DATEDIF to find the difference in full months?' },
          options: [{ en: '"Y"' }, { en: '"M"' }, { en: '"D"' }, { en: '"MONTHS"' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The unit parameter "M" calculates the number of complete calendar months between start and end dates.' }
        },
        {
          text: { en: 'If cell A1 contains a project start date and B1 contains the end date, what does =B1-A1 calculate?' },
          options: [
            { en: 'Nothing, it returns a formula error.' },
            { en: 'The number of days between the two dates.' },
            { en: 'The number of years elapsed.' },
            { en: 'A calendar date.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Since dates are numbers under the hood, subtracting start date from end date directly outputs the number of elapsed days.' }
        }
      ]
    }
  },
  {
    slug: 'excel-creating-pivot-tables-6221',
    summary: { en: 'Summarize, group, and aggregate large transactional datasets without writing formulas.' },
    keyPoints: [
      'Pivot Tables aggregate thousands of rows into clean, structured summary tables.',
      'The layout is governed by four drop zones: Filters, Columns, Rows, and Values.',
      'Pivot tables can summarize data by Sum, Count, Average, or Percentage of Totals.'
    ],
    notes: [
      'Pivot tables do not automatically update when source data changes. You must right-click and click \'Refresh\'.',
      'Ensure your source data has header titles on every column.'
    ],
    resources: [
      { title: 'Pivot Table Basics', url: 'https://exceljet.net/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>A **Pivot Table** is Excel's most powerful summarizing tool. It lets you extract insights from large tables without writing a single formula.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart has thousands of rows of cleaned order data. You need to present total revenue by product category and region to investors next hour.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Insert a Pivot Table. Drag "Category" into the Rows field, "Region" into the Columns field, and "Sales" into the Values field (formatted as Sum).</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Double click on the total sales cell for the "Technology" row. What happens to your worksheet? (Hint: Excel extracts details to a new sheet).</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Create a Pivot Table report summarizing average shipping delays across various customer tiers (VIP vs Standard).</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Change the Value Field settings for Sales from "Sum" to "% of Column Total" or "% of Grand Total". Observe the breakdown.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Add your pivot tables summaries (converted to clean tables) inside your electromart-analytics docs folder under a section named <code>Sales Summary Reports</code>.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Pivot Tables Quiz' },
      description: { en: 'Test pivot table basics.' },
      questions: [
        {
          text: { en: 'How do you update a Pivot Table after modifying the underlying source table?' },
          options: [
            { en: 'Save and reopen the workbook.' },
            { en: 'Right-click the Pivot Table and choose "Refresh".' },
            { en: 'Recreate the Pivot Table from scratch.' },
            { en: 'Press Ctrl + Z.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Excel caches pivot data. To force recalculation against modified source data, you must click Refresh.' }
        },
        {
          text: { en: 'Which field box should you drag the "Revenue" field into to sum total sales?' },
          options: [{ en: 'Filters' }, { en: 'Columns' }, { en: 'Rows' }, { en: 'Values' }],
          correctAnswerIndex: 3,
          explanation: { en: 'The Values area calculates and displays numeric totals, averages, or counts.' }
        },
        {
          text: { en: 'What is a critical structural requirement for pivot table source data?' },
          options: [
            { en: 'All cells must be numeric.' },
            { en: 'Every column must have a column header label.' },
            { en: 'The rows must be sorted.' },
            { en: 'There must be exactly 10 columns.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Excel uses column headers as field names. Blank headers prevent pivot tables from building.' }
        }
      ]
    }
  },
  {
    slug: 'excel-charts-6265',
    summary: { en: 'Build and format key chart types to translate spreadsheets into visual stories.' },
    keyPoints: [
      'Bar and Column charts compare categorical items; Line charts track trends over time.',
      'Pie charts represent parts of a whole (ideally with 5 or fewer categories).',
      'Scatter plots are used to show correlation between two numerical variables.'
    ],
    notes: [
      'Dual-axis charts combine columns and lines to show two metrics with different scales.',
      'Keep charts simple: remove gridlines and decorative 3D effects to improve readability.'
    ],
    resources: [
      { title: 'Selecting the Right Chart Type', url: 'https://www.extremepresentation.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Charts represent numerical data visually, helping stakeholders spot trends and outliers in seconds.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart directors want to visually contrast sales trends against profit margins across different quarters to identify high-overhead seasons.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Build a clustered column chart comparing Sales across Product Categories. Format the chart with a clean, flat color palette.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Select both Sales and Profit columns and insert a Dual-Axis Chart. Represent Sales as Columns and Profit Margin as a Line on a secondary axis.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Design a trend monitoring sheet. Create a Line Chart plotting monthly order volume over the last 12 months, removing default gridlines for neat styling.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Add trendlines to your scatter plots. What is the R-squared value on the correlation between discount percentages and net profit?</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Save your formatted sales charts as image files. Add them directly into your portfolio documents under a section named <code>Visual Performance Reports</code>.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Charts Quiz' },
      description: { en: 'Verify chart structures.' },
      questions: [
        {
          text: { en: 'Which chart type is best for showing how sales changed month-over-month over the past year?' },
          options: [{ en: 'Pie Chart' }, { en: 'Line Chart' }, { en: 'Scatter Plot' }, { en: 'Radar Chart' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Line charts connect discrete time points together, making them ideal for tracking time series and trends.' }
        },
        {
          text: { en: 'When should a dual-axis (combination) chart be used?' },
          options: [
            { en: 'When you have a very large pie chart.' },
            { en: 'When plotting two data series with completely different numeric ranges or units.' },
            { en: 'When you want to draw a 3D chart.' },
            { en: 'When comparing names alphabetically.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Dual-axis charts combine columns and lines with secondary Y-axes to show related metrics on differing scales.' }
        },
        {
          text: { en: 'Which chart type is best to demonstrate correlation between two numeric variables (e.g., Temperature and Ice Cream Sales)?' },
          options: [{ en: 'Stacked Bar Chart' }, { en: 'Scatter Plot' }, { en: 'Doughnut Chart' }, { en: 'Clustered Column' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Scatter plots map numerical pairs to coordinate space to visual correlation trends.' }
        }
      ]
    }
  },
  {
    slug: 'excel-dashboards-6310',
    summary: { en: 'Combine charts, pivot tables, slicers, and KPI blocks to build interactive reports.' },
    keyPoints: [
      'An Excel Dashboard is a visual interface that highlights key metrics (KPIs) at a glance.',
      'Slicers act as visual buttons that filter multiple pivot charts and tables simultaneously.',
      'Designing dashboards requires planning layout, standardizing color schemes, and locking cells.'
    ],
    notes: [
      'Use \'Report Connections\' on Slicers to link them to all relevant Pivot Tables.',
      'Hide gridlines on your dashboard sheet to make it look like a standalone application.'
    ],
    resources: [
      { title: 'Excel Dashboard Design Best Practices', url: 'https://chandoo.org/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>A **Dashboard** pulls all key data analytics components (KPIs, Charts, Pivot Tables, Filters) together on a single screen so business managers can make rapid decisions.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart directors request an interactive operational control sheet. Slicers should allow filtering the whole screen by Region and Category in real-time.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Layout your dashboard worksheet. Position 3 KPI cards at the top, two Pivot Charts in the middle, and 2 Slicers (Region, Category) on the left panel.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Link your Slicers using Report Connections to all Pivot Tables in the workbook. Verify that clicking "Europe" updates both charts instantly.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a fully functional management sales dashboard from the ElectroMart CSV. Clean gridlines, lock reference ranges, and standardize colors.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Design a reset button. How can a user clear all active slicer filters instantly in one click? Hint: Click the "Clear Filter" icon at the top right of the Slicer box.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Commit your final <code>electromart_raw_data.xlsx</code> containing the interactive dashboard to your git repository. Add dashboard usage instructions in your README.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Dashboards Quiz' },
      description: { en: 'Test dashboard rules.' },
      questions: [
        {
          text: { en: 'What does "Report Connections" on a Slicer allow you to do?' },
          options: [
            { en: 'Connect your sheet to external web resources.' },
            { en: 'Link a single slicer to filter multiple Pivot Tables/Charts simultaneously.' },
            { en: 'Send the report via email.' },
            { en: 'Convert formulas to values.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Report Connections binds the slicer to multiple underlying tables so filtering synchronizes across the entire dashboard.' }
        },
        {
          text: { en: 'How can you clean up the Excel UI to make dashboards look like professional applications?' },
          options: [
            { en: 'Hide Gridlines (View Tab -> uncheck Gridlines).' },
            { en: 'Change all cell backgrounds to red.' },
            { en: 'Delete all formulas.' },
            { en: 'Hide row numbers and column letters.' },
            { en: 'Both Hide Gridlines and Hide row/column headers.' }
          ],
          correctAnswerIndex: 4,
          explanation: { en: 'Hiding gridlines and cell headers strips away the spreadsheet look, creating a clean dashboard app feel.' }
        },
        {
          text: { en: 'What is a KPI block?' },
          options: [
            { en: 'A formula error alert.' },
            { en: 'An eye-catching, styled card displaying a vital business metric at a glance.' },
            { en: 'A sorting tool.' },
            { en: 'A hidden pivot table.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'KPI (Key Performance Indicator) blocks summarize primary metrics (like Net Profit Margin) in large, clear cards.' }
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
      console.error('Data Analytics Tutorial course not found!');
      process.exit(1);
    }
    const lesson = await lessonsColl.findOne({ course: course._id, slug: 'excel' });
    if (!lesson) {
      console.error('Excel lesson not found!');
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
            content: data.contentHtml,
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
