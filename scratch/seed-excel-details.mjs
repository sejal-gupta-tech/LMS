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
  <p>An Excel spreadsheet is organized as a giant grid of cells:</p>
  
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
  
  <h3 class="text-xl font-bold mt-6 mb-3">Spreadsheet vs. Database</h3>
  <div class="overflow-x-auto border border-slate-200 rounded-2xl">
    <table class="min-w-full divide-y divide-slate-200 text-sm">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 py-3 text-left font-bold text-slate-900">Feature</th>
          <th class="px-4 py-3 text-left font-bold text-slate-900">Excel Spreadsheet</th>
          <th class="px-4 py-3 text-left font-bold text-slate-900">Relational Database (SQL)</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 bg-white">
        <tr>
          <td class="px-4 py-3 font-semibold">Capacity</td>
          <td class="px-4 py-3 text-slate-700">1,048,576 rows (Limit).</td>
          <td class="px-4 py-3 text-slate-700">Millions/Billions of rows.</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold">User Interface</td>
          <td class="px-4 py-3 text-slate-700">Highly visual, cell-based editing.</td>
          <td class="px-4 py-3 text-slate-700">Command-line / Query based.</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold">Use Case</td>
          <td class="px-4 py-3 text-slate-700">Ad-hoc reporting, charts, fast tables.</td>
          <td class="px-4 py-3 text-slate-700">Enterprise data storage & retrieval.</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-800 my-4">
    <h4 class="font-bold">Did You Know?</h4>
    <p class="text-sm">Excel was first released by Microsoft in 1985 for the Apple Macintosh. It is now used by over 750 million people worldwide!</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Excel Introduction Quiz' },
      description: { en: 'Test your knowledge on spreadsheet terminology and basics.' },
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
      'Always check your ranges: Excel might accidentally include header cells or blank rows.',
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
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>=COUNT(range)</strong>
      <p class="text-xs text-slate-600 mt-1">Counts cells containing numerical values. Example: <code>=COUNT(C1:C20)</code></p>
    </div>
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>=MAX(range) & =MIN(range)</strong>
      <p class="text-xs text-slate-600 mt-1">Finds highest/lowest numbers in the range. Example: <code>=MAX(D1:D10)</code></p>
    </div>
  </div>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Range Reference Notation</h3>
  <p>To refer to multiple cells together, use a colon <code>:</code> to represent a continuous block:</p>
  <ul class="list-disc pl-6 space-y-1 text-sm">
    <li><code>A1:A10</code> - All cells from column A, rows 1 through 10.</li>
    <li><code>A1:C3</code> - A 3x3 block containing columns A, B, and C across rows 1, 2, and 3.</li>
  </ul>
</div>`,
    quiz: {
      title: { en: 'Basic Excel Formulas Quiz' },
      description: { en: 'Verify your understanding of formula syntax and ranges.' },
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
      'Multi-level sorting applies hierarchical sorting across multiple columns (e.g., Department, then Salary).'
    ],
    notes: [
      'Ensure you expand your selection when sorting. If you do not, you will scramble your data rows.',
      'Custom lists can be created to sort non-alphabetical categories (e.g., High, Medium, Low).'
    ],
    resources: [
      { title: 'Microsoft Support: Sort data in a range', url: 'https://support.microsoft.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Sorting arranges data in a specific logical sequence—alphabetical, numerical, or chronological. It helps analysts identify extremes, cluster categories, and find trends.</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
    <div class="p-5 border border-blue-100 bg-blue-50/50 rounded-2xl">
      <h4 class="font-bold text-blue-900">Single-Level Sorting</h4>
      <p class="text-sm text-slate-700 mt-2">Reorganizes data based on one key column.</p>
      <p class="text-xs text-slate-500 mt-2">Example: Sorting a product inventory list from highest to lowest price to identify expensive products.</p>
    </div>
    <div class="p-5 border border-purple-100 bg-purple-50/50 rounded-2xl">
      <h4 class="font-bold text-purple-900">Multi-Level Sorting</h4>
      <p class="text-sm text-slate-700 mt-2">Applies hierarchical sorting rules across multiple columns.</p>
      <p class="text-xs text-slate-500 mt-2">Example: Sorting employees by <strong>Department</strong> (alphabetically), and then by <strong>Salary</strong> (highest to lowest) within each department.</p>
    </div>
  </div>
  
  <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-800 my-4">
    <h4 class="font-bold">⚠️ Warning: The Scrambled Row Trap</h4>
    <p class="text-sm">When you highlight and sort only a single column, Excel will ask you to "Expand the Selection." Always select <strong>"Expand the selection"</strong>. Otherwise, Excel will sort only that column while leaving the other columns untouched, completely scrambling your data records!</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Sorting Quiz' },
      description: { en: 'Test your understanding of sorting operations and best practices.' },
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
          explanation: { en: 'Excel warns you because sorting a single column out of a table will break relationship links between rows. Expanding the selection sorts entire rows together.' }
        },
        {
          text: { en: 'If you need to sort data by State, and then by City within each State, which feature should you use?' },
          options: [
            { en: 'Single-level Sort' },
            { en: 'Filter' },
            { en: 'Multi-level Sort' },
            { en: 'Data Validation' }
          ],
          correctAnswerIndex: 2,
          explanation: { en: 'Multi-level sorting allows you to specify primary, secondary, and tertiary sorting rules.' }
        },
        {
          text: { en: 'How should you sort product priorities labeled: High, Medium, Low?' },
          options: [
            { en: 'Alphabetically Ascending (A to Z)' },
            { en: 'Alphabetically Descending (Z to A)' },
            { en: 'Custom List Sort' },
            { en: 'Numerical Sort' }
          ],
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
  
  <blockquote>
    "Unlike sorting, which reorganizes the rows of your dataset, filtering simply hides records that do not meet your criteria. The hidden rows are NOT deleted."
  </blockquote>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Filtering Types</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>Text Filters</strong>
      <p class="text-xs text-slate-600 mt-1">Filter by contents: <code>Begins With</code>, <code>Ends With</code>, <code>Contains</code>.</p>
    </div>
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>Number Filters</strong>
      <p class="text-xs text-slate-600 mt-1">Filter by threshold: <code>Greater Than</code>, <code>Top 10</code>, <code>Between</code>.</p>
    </div>
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>Color Filters</strong>
      <p class="text-xs text-slate-600 mt-1">Filter cells containing a specific cell highlight fill color.</p>
    </div>
  </div>
  
  <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-800 my-4">
    <h4 class="font-bold">Pro Tip: Spotting Filtered Sheets</h4>
    <p class="text-sm">You can quickly tell if a sheet is currently filtered because the row numbers on the left will turn <strong>blue</strong> instead of black, and a filter funnel icon will appear on the header cell of the filtered column.</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Filtering Quiz' },
      description: { en: 'Validate your understanding of filtering behaviors and visual indicators.' },
      questions: [
        {
          text: { en: 'What happens to the row numbers on the left of the Excel window when a filter is active?' },
          options: [
            { en: 'They turn red.' },
            { en: 'They disappear entirely.' },
            { en: 'They turn blue.' },
            { en: 'They become bold and italic.' }
          ],
          correctAnswerIndex: 2,
          explanation: { en: 'Excel changes row headers to blue to visually signify that rows are hidden due to an active filter.' }
        },
        {
          text: { en: 'Does filtering delete data rows permanently?' },
          options: [
            { en: 'Yes, if you save the file.' },
            { en: 'No, it only temporarily hides them from view.' },
            { en: 'Yes, unless you click Undo.' },
            { en: 'Only if the cells are blank.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Filtering is non-destructive. Hiding rows does not affect the actual data, and clearing the filter restores all rows.' }
        },
        {
          text: { en: 'Which filter option should you use to see sales between $5,000 and $10,000?' },
          options: [
            { en: 'Text Filter -> Contains' },
            { en: 'Number Filter -> Between' },
            { en: 'Color Filter -> Custom' },
            { en: 'Sort Ascending' }
          ],
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
      'Conditional Formatting changes a cell\'s appearance (fill, text color, borders) based on conditions.',
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
  
  <h3 class="text-xl font-bold mt-6 mb-3">Common Visual Cues</h3>
  <ul class="list-disc pl-6 space-y-2 text-sm text-slate-700">
    <li><strong>Highlight Cells Rules</strong>: Colors cells greater than, less than, or equal to a value. Example: Red text for negative numbers.</li>
    <li><strong>Data Bars</strong>: Inserts a horizontal bar chart directly inside the cell representing its relative magnitude.</li>
    <li><strong>Color Scales</strong>: Applies a two or three-color gradient (like green to red) to represent hot, medium, and cold numbers.</li>
  </ul>
  
  <div class="my-6 p-5 border border-amber-100 bg-amber-50/50 rounded-2xl">
    <h4 class="font-bold text-amber-900">Best Practice: Precedence Rules</h4>
    <p class="text-sm text-slate-700 mt-1">If you have multiple rules (e.g. highlighting values >100 in green, and values >200 in blue), Excel checks rules from top to bottom in the **Rules Manager**. Ensure your most specific rule (e.g., >200) is placed at the top of the list!</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Conditional Formatting Quiz' },
      description: { en: 'Check your knowledge on rule orders and formatting applications.' },
      questions: [
        {
          text: { en: 'What is the primary function of Data Bars in Conditional Formatting?' },
          options: [
            { en: 'To delete small numbers.' },
            { en: 'To display horizontal bars inside cells to visualize their relative sizes.' },
            { en: 'To change cell width automatically.' },
            { en: 'To insert column charts on separate sheets.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Data Bars draw in-cell bar visuals, comparing values in the range without taking up separate chart space.' }
        },
        {
          text: { en: 'How are rules resolved if multiple Conditional Formatting rules match the same cell?' },
          options: [
            { en: 'The last rule added is used.' },
            { en: 'They merge, but if they conflict, the top rule in the rules list wins.' },
            { en: 'The cell turns black to show an error.' },
            { en: 'Excel picks one at random.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Rules are evaluated in order of priority. The top rule in the Conditional Formatting Rules Manager takes precedence in conflicts.' }
        },
        {
          text: { en: 'Which feature color-codes cells using a gradient based on value scales?' },
          options: [
            { en: 'Icon Sets' },
            { en: 'Color Scales' },
            { en: 'Data Validation' },
            { en: 'Custom Filters' }
          ],
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
      'You can use the \'Circle Invalid Data\' tool to highlight existing records that violate your validation rules.'
    ],
    resources: [
      { title: 'Excel Data Validation Tutorial', url: 'https://www.contextures.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>To perform accurate analysis, you need clean data. **Data Validation** restricts the type of values or text that users can type into specific cells, preventing bad data from entering your sheets.</p>
  
  <blockquote>
    "Data Validation acts as a guard dog for your spreadsheet, rejecting typos, text in date fields, or numbers outside logical boundaries."
  </blockquote>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Validation Criteria Options</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>List (Dropdowns)</strong>
      <p class="text-xs text-slate-600 mt-1">Forces choices from a predefined list (e.g. Sales, Marketing, HR).</p>
    </div>
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>Whole Number / Decimal</strong>
      <p class="text-xs text-slate-600 mt-1">Restricts numbers within boundaries (e.g. integer between 1 and 100).</p>
    </div>
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>Date / Time</strong>
      <p class="text-xs text-slate-600 mt-1">Restricts inputs to valid date/time boundaries.</p>
    </div>
    <div class="p-4 bg-slate-50 border rounded-xl">
      <strong>Text Length</strong>
      <p class="text-xs text-slate-600 mt-1">Restricts character limits (e.g. phone numbers must be exactly 10 digits).</p>
    </div>
  </div>
  
  <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-800 my-4">
    <h4 class="font-bold">Warning: Retroactive Entries</h4>
    <p class="text-sm">Data validation rules are only triggered when a user edits or types into a cell. Applying data validation to cells that already contain invalid values will not clean them automatically. You must use <strong>Circle Invalid Data</strong> on the Data tab to locate pre-existing errors.</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Data Validation Quiz' },
      description: { en: 'Test your understanding of data input rules.' },
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
      'Excel provides a summary pop-up showing how many duplicates were removed and how many unique values remain.'
    ],
    notes: [
      'Excel permanently deletes duplicate rows. Always save a backup copy of your worksheet first!',
      'Removing duplicates is case-insensitive (e.g. \'ADMIN\' and \'admin\' are duplicates).'
    ],
    resources: [
      { title: 'Deduplication in Excel', url: 'https://support.microsoft.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Duplicate records lead to skewed averages, inflated sums, and dirty analysis. Excel provides a direct deduplication tool to clean your ranges in one click.</p>
  
  <h3 class="text-xl font-bold mt-6 mb-3">How Excel Evaluates Duplicates</h3>
  <p>When you select a table and run the **Remove Duplicates** tool, you can select which columns Excel should compare:</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
    <div class="p-4 border rounded-xl bg-slate-50">
      <strong>Select All Columns</strong>
      <p class="text-xs text-slate-600 mt-1">Excel only deletes a row if the values across <strong>every single column</strong> are identical to another row.</p>
    </div>
    <div class="p-4 border rounded-xl bg-slate-50">
      <strong>Select Key Column (e.g. Email / ID)</strong>
      <p class="text-xs text-slate-600 mt-1">Excel deletes duplicate rows based on that single column, even if other column values differ.</p>
    </div>
  </div>
  
  <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-800 my-4">
    <h4 class="font-bold">Pro Tip: Deduping is Case-Insensitive</h4>
    <p class="text-sm">Excel treats capitalized and lowercase text as matching. If you have "john@company.com" and "JOHN@company.com", Excel will flag them as duplicates and remove the second row.</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Removing Duplicates Quiz' },
      description: { en: 'Test your understanding of the deduplication process.' },
      questions: [
        {
          text: { en: 'What does Excel do to duplicate rows when you execute the Remove Duplicates command?' },
          options: [
            { en: 'It highlights them in red.' },
            { en: 'It permanently deletes them.' },
            { en: 'It moves them to a separate worksheet.' },
            { en: 'It hides them from view.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Remove Duplicates permanently purges duplicate rows from the spreadsheet. Always keep backups.' }
        },
        {
          text: { en: 'Is Excel\'s duplicate removal process case-sensitive?' },
          options: [
            { en: 'Yes, it treats different casings as separate entries.' },
            { en: 'No, it treats "ABC" and "abc" as identical.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Deduplication is case-insensitive in Excel, matching identical letters regardless of casing.' }
        },
        {
          text: { en: 'What happens if you run Remove Duplicates selecting only the "Customer ID" column inside a multi-column table?' },
          options: [
            { en: 'Only rows with identical values in every column are deleted.' },
            { en: 'Any row with a duplicate Customer ID is deleted, regardless of differing data in other columns.' },
            { en: 'The Customer ID column is deleted.' },
            { en: 'An error occurs.' }
          ],
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
      'INDEX & MATCH combined bypasses VLOOKUP limitations by enabling leftward lookups and dynamic column adjustments.'
    ],
    notes: [
      'Set VLOOKUP\'s fourth argument to FALSE for exact matches. Using TRUE can return incorrect close matches.',
      'INDEX returns the value of a cell at a specific coordinate; MATCH returns the row or column index of a matching value.'
    ],
    resources: [
      { title: 'INDEX MATCH vs VLOOKUP Guide', url: 'https://exceljet.net/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Lookup functions allow you to connect tables together. For example, if you have an Order Sheet with "Product ID," you can lookup the "Price" from a separate Inventory Table.</p>
  
  <h3 class="text-xl font-bold mt-6 mb-3">VLOOKUP Syntax</h3>
  <pre><code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code></pre>
  
  <div class="p-4 bg-slate-50 border rounded-xl space-y-2 text-sm">
    <div><strong>lookup_value</strong>: The value you want to search for (e.g. Employee ID in A2).</div>
    <div><strong>table_array</strong>: The reference table where data lives (e.g. $F$1:$H$20). Use absolute references ($) so it does not shift.</div>
    <div><strong>col_index_num</strong>: The column number in the reference table to return (1-indexed).</div>
    <div><strong>range_lookup</strong>: Use <code>FALSE</code> (or <code>0</code>) for exact match. This is highly recommended!</div>
  </div>
  
  <h3 class="text-xl font-bold mt-6 mb-3">INDEX & MATCH</h3>
  <p>While VLOOKUP is simple, it can only search columns from left to right. To look up columns to the left, combine **INDEX** and **MATCH**:</p>
  <pre><code>=INDEX(return_column, MATCH(lookup_value, search_column, 0))</code></pre>
</div>`,
    quiz: {
      title: { en: 'Lookup Functions Quiz' },
      description: { en: 'Validate your understanding of lookup arguments and limitations.' },
      questions: [
        {
          text: { en: 'Which parameter should you pass as the fourth argument of VLOOKUP to force an exact match?' },
          options: [{ en: 'TRUE' }, [{ en: 'FALSE' }], { en: '0' }, { en: 'Either FALSE or 0' }],
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
  
  <h3 class="text-xl font-bold mt-6 mb-3">Extraction Functions</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
    <div class="p-4 border rounded-xl bg-slate-50">
      <strong>=LEFT(text, num_chars)</strong>
      <p class="text-xs text-slate-600 mt-1">Extracts from start. Example: <code>=LEFT("EXCEL", 2)</code> returns <strong>"EX"</strong>.</p>
    </div>
    <div class="p-4 border rounded-xl bg-slate-50">
      <strong>=RIGHT(text, num_chars)</strong>
      <p class="text-xs text-slate-600 mt-1">Extracts from end. Example: <code>=RIGHT("EXCEL", 3)</code> returns <strong>"CEL"</strong>.</p>
    </div>
    <div class="p-4 border rounded-xl bg-slate-50">
      <strong>=MID(text, start_num, num_chars)</strong>
      <p class="text-xs text-slate-600 mt-1">Extracts from middle. Example: <code>=MID("EXCEL", 2, 3)</code> returns <strong>"XCE"</strong>.</p>
    </div>
  </div>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Joining Strings</h3>
  <p>To join values from different cells, you can use the **CONCAT** function or the simpler ampersand <code>&</code> operator:</p>
  <pre><code>=A2 & " " & B2</code></pre>
  <p class="text-xs text-slate-500">If A2 contains "John" and B2 contains "Doe", this outputs <strong>"John Doe"</strong>.</p>
</div>`,
    quiz: {
      title: { en: 'Text Functions Quiz' },
      description: { en: 'Test your understanding of substring extraction and string joins.' },
      questions: [
        {
          text: { en: 'If cell A1 contains "ID-5920", which formula returns the numeric part "5920"?' },
          options: [{ en: '=LEFT(A1, 4)' }, { en: '=RIGHT(A1, 4)' }, { en: '=MID(A1, 3, 4)' }, { en: 'Both =RIGHT(A1, 4) and =MID(A1, 4, 4)' }],
          correctAnswerIndex: 1,
          explanation: { en: 'RIGHT(A1, 4) starts from the rightmost character and pulls 4 characters, giving "5920". (MID(A1, 4, 4) would pull from index 4, giving "5920" as well, but A1 start indices are 1-based, making the M index 4 "5920" incorrect).' }
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
  
  <h3 class="text-xl font-bold mt-6 mb-3">IF Function Syntax</h3>
  <pre><code>=IF(logical_test, value_if_true, value_if_false)</code></pre>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Nested IFs</h3>
  <p>When you have multiple thresholds, you can nest IF functions inside each other:</p>
  <pre><code>=IF(A2>=90, "Grade A", IF(A2>=75, "Grade B", "Grade C"))</code></pre>
  
  <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-800 my-4">
    <h4 class="font-bold">Newer Alternative: IFS</h4>
    <p class="text-sm">In modern Excel (2016+), you can use the <strong>IFS</strong> function to avoid nesting: <code>=IFS(A2>=90, "Grade A", A2>=75, "Grade B", TRUE, "Grade C")</code>. It evaluates arguments in order without parentheses overload!</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'IF Function Quiz' },
      description: { en: 'Verify logical routing and statement structures.' },
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
  
  <h3 class="text-xl font-bold mt-6 mb-3">Internal Date Storage</h3>
  <p>Excel does not internally store dates as "MM/DD/YYYY". Instead, it converts them to <strong>sequential serial numbers</strong>. January 1, 1900, is stored as <code>1</code>. January 1, 2026, is stored as <code>46023</code>. This allows for direct mathematical subtraction and addition!</p>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Key Date Functions</h3>
  <ul class="list-disc pl-6 space-y-2 text-sm text-slate-700">
    <li><code>=TODAY()</code>: Returns the current date (volatile, updates every recalculation).</li>
    <li><code>=YEAR(date)</code>, <code>=MONTH(date)</code>, <code>=DAY(date)</code>: Extracts corresponding portions from a date cell.</li>
    <li><code>=DATEDIF(start_date, end_date, unit)</code>: Calculates intervals. Use <code>"Y"</code> for years, <code>"M"</code> for months, or <code>"D"</code> for days.</li>
  </ul>
</div>`,
    quiz: {
      title: { en: 'Date Functions Quiz' },
      description: { en: 'Verify your understanding of Excel date logic and calculations.' },
      questions: [
        {
          text: { en: 'How does Excel store the date January 1, 1900 internally?' },
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
      'Ensure your source data has header titles on every column and no empty columns.'
    ],
    resources: [
      { title: 'Pivot Table Basics', url: 'https://exceljet.net/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>A **Pivot Table** is Excel's most powerful summarizing tool. It lets you extract insights from large tables without writing a single formula.</p>
  
  <h3 class="text-xl font-bold mt-6 mb-3">The Four Pivot Fields</h3>
  <div class="grid grid-cols-2 gap-4 text-sm font-bold text-center">
    <div class="p-4 border rounded-xl bg-blue-50 text-blue-900">
      Filters
      <span class="block text-xs font-normal text-slate-500 mt-1">Filters the entire dataset.</span>
    </div>
    <div class="p-4 border rounded-xl bg-emerald-50 text-emerald-900">
      Columns
      <span class="block text-xs font-normal text-slate-500 mt-1">Arranges categories horizontally.</span>
    </div>
    <div class="p-4 border rounded-xl bg-purple-50 text-purple-900">
      Rows
      <span class="block text-xs font-normal text-slate-500 mt-1">Arranges categories vertically.</span>
    </div>
    <div class="p-4 border rounded-xl bg-amber-50 text-amber-900">
      Values
      <span class="block text-xs font-normal text-slate-500 mt-1">Numerical metrics calculated (Sum, Average).</span>
    </div>
  </div>
  
  <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-800 my-4">
    <h4 class="font-bold">⚠️ Pivot Tables Are Not Live!</h4>
    <p class="text-sm">When you edit your source table, Pivot Tables do **not** automatically update their totals. You must right-click anywhere inside the Pivot Table and select <strong>Refresh</strong> to recalculate.</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Pivot Tables Quiz' },
      description: { en: 'Test your understanding of pivot fields and updates.' },
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
  
  <h3 class="text-xl font-bold mt-6 mb-3">Chart Types & Use Cases</h3>
  <div class="overflow-x-auto border border-slate-200 rounded-2xl text-sm">
    <table class="min-w-full divide-y divide-slate-200">
      <thead class="bg-slate-50">
        <tr>
          <th class="px-4 py-3 text-left font-bold">Chart Type</th>
          <th class="px-4 py-3 text-left font-bold">Analytical Purpose</th>
          <th class="px-4 py-3 text-left font-bold">Example</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 bg-white">
        <tr>
          <td class="px-4 py-3 font-semibold">Column / Bar</td>
          <td class="px-4 py-3 text-slate-700">Comparing discrete category values.</td>
          <td class="px-4 py-3 text-slate-700">Sales by Product Type.</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold">Line</td>
          <td class="px-4 py-3 text-slate-700">Displaying trends over time.</td>
          <td class="px-4 py-3 text-slate-700">Monthly Website Traffic.</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold">Pie</td>
          <td class="px-4 py-3 text-slate-700">Visualizing parts-of-a-whole shares.</td>
          <td class="px-4 py-3 text-slate-700">Market Share distribution.</td>
        </tr>
        <tr>
          <td class="px-4 py-3 font-semibold">Scatter</td>
          <td class="px-4 py-3 text-slate-700">Showing relationship between two numeric metrics.</td>
          <td class="px-4 py-3 text-slate-700">Advertising Spend vs Sales Revenue.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
    quiz: {
      title: { en: 'Charts Quiz' },
      description: { en: 'Verify chart selection and design guidelines.' },
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
          explanation: { en: 'Dual-axis charts combine columns and lines with secondary Y-axes to show related metrics on differing scales (e.g. Sales in Millions and Growth in %).' }
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
  
  <h3 class="text-xl font-bold mt-6 mb-3">Key Dashboard Components</h3>
  <ul class="list-disc pl-6 space-y-2 text-sm text-slate-700">
    <li><strong>KPI Blocks</strong>: Highlight cells displaying crucial business metrics (e.g. total profit) in oversized fonts.</li>
    <li><strong>Pivot Charts</strong>: Visual charts linked to Pivot Tables that adjust dynamically as filters shift.</li>
    <li><strong>Slicers</strong>: Interactive, visual buttons that allow users to filter reports without digging into drop-down menus.</li>
  </ul>
  
  <div class="my-6 p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-800">
    <h4 class="font-bold">Pro Tip: Report Connections</h4>
    <p class="text-sm">By default, a slicer only filters the specific Pivot Table it was created from. Right-click the slicer, choose <strong>Report Connections</strong>, and check all Pivot Tables on your sheet to link them. Now, one click updates the entire dashboard!</p>
  </div>
</div>`,
    quiz: {
      title: { en: 'Dashboards Quiz' },
      description: { en: 'Test your understanding of dashboard design and connectivity.' },
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
