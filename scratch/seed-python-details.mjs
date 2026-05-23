import mongoose from 'mongoose';
import { dbConnect } from '../lib/dbConnect.ts';

const topicsData = [
  {
    slug: 'python-introduction-6395',
    summary: { en: 'Learn why Python is the leading programming language for data science, machine learning, and data analytics.' },
    keyPoints: [
      'Python is an open-source, high-level, interpreted programming language with simple syntax.',
      'Its massive ecosystem includes libraries like Pandas, NumPy, and Matplotlib.',
      'Data Analysts use Python to clean, analyze, and visualize complex datasets.'
    ],
    notes: [
      'Python is case-sensitive: \'data\' and \'Data\' are different variables.',
      'Python uses indentation (spaces) to define blocks of code instead of curly braces.'
    ],
    resources: [
      { title: 'GeeksforGeeks Python Tutorial', url: 'https://www.geeksforgeeks.org/python-programming-language/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Welcome to the **Python Section**! Python is the undisputed king of data science and analytics. Its simple syntax makes it easy to learn, while its powerful libraries allow you to clean and analyze millions of rows of data with just a few lines of code.</p>
  
  <blockquote>
    "Python is an interpreted, high-level, general-purpose programming language. Its design philosophy emphasizes code readability."
  </blockquote>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Why Python for Data Analytics?</h3>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
    <div class="p-4 border border-blue-100 bg-blue-50/50 rounded-2xl">
      <h4 class="font-bold text-blue-900">1. Clean Syntax</h4>
      <p class="text-xs text-slate-600 mt-1">Python reads like English, making it perfect for beginners to learn logic.</p>
    </div>
    <div class="p-4 border border-emerald-100 bg-emerald-50/50 rounded-2xl">
      <h4 class="font-bold text-emerald-900">2. Data Libraries</h4>
      <p class="text-xs text-slate-600 mt-1">Pandas, NumPy, and Scikit-Learn handle all your data manipulation and ML tasks.</p>
    </div>
    <div class="p-4 border border-purple-100 bg-purple-50/50 rounded-2xl">
      <h4 class="font-bold text-purple-900">3. Visualization</h4>
      <p class="text-xs text-slate-600 mt-1">Matplotlib and Seaborn build beautiful graphs and charts instantly.</p>
    </div>
  </div>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart has collected millions of transactions that are too large for Excel. You need to write a Python script that loads this e-commerce transaction data dynamically and scans for negative margins.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Create a new Python file named <code>main.py</code>. Add a comment line describing your project name: <code># ElectroMart Sales Analytics pipeline</code>.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Draft a block diagram showing how your Python script will load, transform, and print columns from your e-commerce dataset.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a mock Python list containing 3 dictionary objects. Each dictionary must represent one order with fields: Transaction_ID, Sales, and Profit.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write the Python code to print "Hello ElectroMart Analyst!" using the <code>print()</code> function. Run it in your terminal.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Create a file named <code>main.py</code> inside your elektromart-analytics git repository. Add your print statement and push the changes to GitHub.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Python Introduction Quiz' },
      description: { en: 'Test your understanding of Python basics.' },
      questions: [
        {
          text: { en: 'Why is Python preferred for Data Analytics?' },
          options: [
            { en: 'It is the only language that runs on web browsers.' },
            { en: 'It has a rich ecosystem of specialized data libraries like Pandas.' },
            { en: 'It is a compiled language.' },
            { en: 'It doesn\'t require memory.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Python\'s extensive package libraries (Pandas, NumPy, Seaborn) make it the primary choice for data manipulation and analysis.' }
        },
        {
          text: { en: 'True or False: Python is case-sensitive.' },
          options: [{ en: 'True' }, { en: 'False' }],
          correctAnswerIndex: 0,
          explanation: { en: 'True. In Python, casing matters. "my_var" and "My_Var" represent different identifiers.' }
        },
        {
          text: { en: 'What does Python use to define code blocks instead of curly braces?' },
          options: [{ en: 'Semicolons' }, { en: 'Parentheses' }, { en: 'Indentation (spaces/tabs)' }, { en: 'Keywords' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Python uses whitespace indentation to define code scope and groupings.' }
        }
      ]
    }
  },
  {
    slug: 'python-download-and-install-6437',
    summary: { en: 'Step-by-step setup guide for the Python interpreter, VS Code, and package installation using pip.' },
    keyPoints: [
      'The Python interpreter reads and executes your Python code scripts.',
      'Visual Studio Code (VS Code) is a lightweight, powerful IDE for writing Python code.',
      'pip is Python\'s default package manager, used to install libraries like Pandas.'
    ],
    notes: [
      'Always check the \'Add Python to PATH\' checkbox during installation on Windows.',
      'Use virtual environments (venv) to avoid dependency conflicts between projects.'
    ],
    resources: [
      { title: 'Download Python Official Site', url: 'https://www.python.org/downloads/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>To write and run Python scripts on your machine, you need to set up your environment: the Python Interpreter and a Code Editor.</p>
  
  <h3 class="text-xl font-bold mt-6 mb-3">1. Install the Interpreter</h3>
  <p>Go to python.org, download the latest version, and run the installer. **CRITICAL STEP**: On Windows, check the box that says <strong>"Add Python to PATH"</strong> before clicking Install.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">Before you can parse ElectroMart\'s transaction lists, you need to set up the Python environment and download the dependencies required for e-commerce data structures.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Verify your Python interpreter setup. Open your terminal and run <code>python --version</code> and <code>pip --version</code>.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Install the Pandas library to handle e-commerce data structures: run <code>pip install pandas</code> in your console.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Set up a virtual environment named <code>mart_env</code> using <code>python -m venv mart_env</code>. Activate it and install pandas in it.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write down the command to deactivate the virtual environment when you are done. Hint: <code>deactivate</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Create a file named <code>requirements.txt</code> in your elektromart-analytics repository listing the library dependencies (e.g. pandas).</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Download and Install Quiz' },
      description: { en: 'Test setup commands.' },
      questions: [
        {
          text: { en: 'What is the default package manager for Python?' },
          options: [{ en: 'npm' }, { en: 'pip' }, { en: 'apt' }, { en: 'composer' }],
          correctAnswerIndex: 1,
          explanation: { en: 'pip is Python\'s standard tool for downloading, updating, and managing third-party library packages.' }
        },
        {
          text: { en: 'Which checkbox must be checked during Windows Python installation?' },
          options: [
            { en: 'Add Python to PATH' },
            { en: 'Install for all users' },
            { en: 'Enable debug symbols' },
            { en: 'Disable path limit' }
          ],
          correctAnswerIndex: 0,
          explanation: { en: 'Adding Python to PATH registers the environment variables so you can execute python commands from any terminal shell.' }
        },
        {
          text: { en: 'What does the command "pip install pandas" do?' },
          options: [
            { en: 'Launches a browser search.' },
            { en: 'Downloads and installs the Pandas data manipulation library onto your system.' },
            { en: 'Formats your spreadsheet.' },
            { en: 'Checks Python syntax.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'This command instructs pip to retrieve the pandas library files from the PyPI repository and install them locally.' }
        }
      ]
    }
  },
  {
    slug: 'python-variables-6478',
    summary: { en: 'Learn how to store, name, and update data values dynamically using Python variables.' },
    keyPoints: [
      'A variable is a named storage location in memory that holds data.',
      'Variables are created the moment you assign a value to them using the = operator.',
      'Variable names must start with a letter or underscore, and cannot contain spaces.'
    ],
    notes: [
      'Python variables use dynamic typing: you do not need to declare their data type beforehand.',
      'Use snake_case for naming variables (e.g. user_age) to follow Python PEP 8 guidelines.'
    ],
    resources: [
      { title: 'Variables in Python', url: 'https://www.geeksforgeeks.org/variables-in-python/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Variables are containers for storing data values. In Python, you do not declare a variable's type; you simply assign a value to it, and Python figures out the type automatically.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart requires variables to store KPIs like tax rates, total sales, and company name before running formulas.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Declare three variables: <code>company_name</code> assigned to "ElectroMart", <code>tax_rate</code> to 0.18, and <code>is_active</code> to True.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Write Python statements to update the <code>tax_rate</code> variable from 0.18 to 0.12. Print the updated value using <code>print(tax_rate)</code>.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Write a script that stores an order detail: <code>item_price = 450</code> and <code>qty = 3</code>. Compute the total cost as a new variable <code>total_cost</code> and print it.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Declare two variables <code>x = 10</code> and <code>y = 20</code>. Write the Python code to swap their values so x becomes 20 and y becomes 10 (Hint: <code>x, y = y, x</code>).</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Add variable declarations for ElectroMart KPIs inside your <code>main.py</code> file. Commit and push the updates.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Variables Quiz' },
      description: { en: 'Check variable naming.' },
      questions: [
        {
          text: { en: 'Which operator is used to assign a value to a variable?' },
          options: [{ en: '==' }, { en: '=' }, { en: ':' }, { en: '->' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The single equals sign (=) is the assignment operator. Double equals (==) is used for comparison.' }
        },
        {
          text: { en: 'Which of the following is a valid variable name in Python?' },
          options: [{ en: 'total cost' }, { en: 'total-cost' }, { en: 'total_cost' }, { en: 'total$cost' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Variables can only contain letters, numbers, and underscores. Underlined snake_case (total_cost) is the correct convention.' }
        },
        {
          text: { en: 'What happens if you run the code: age = 20; age = 21; print(age)?' },
          options: [{ en: 'It raises an error.' }, { en: 'It prints 20.' }, { en: 'It prints 21.' }, { en: 'It prints 20 and 21.' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Variables are mutable and hold only the latest assigned value. The value 20 is overwritten by 21.' }
        }
      ]
    }
  },
  {
    slug: 'python-data-types-6523',
    summary: { en: 'Explore core data types including strings, integers, floats, and booleans, and how to cast them.' },
    keyPoints: [
      'Primary data types in Python are integers (int), decimals (float), text (str), and booleans (bool).',
      'The type() function returns the data type of any variable.',
      'Type casting allows converting a variable from one data type to another.'
    ],
    notes: [
      'Converting float to int truncates the decimal part (e.g. int(5.9) returns 5).',
      'Empty strings, 0, and None evaluate to False in boolean checks.'
    ],
    resources: [
      { title: 'Python Data Types Reference', url: 'https://www.w3schools.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Every value in Python has a data type. Understanding types is essential for calculations and formatting.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart\'s database exports values as strings (e.g. "450" for sales, "5" for quantity). Before doing math, you must convert these strings into numbers.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Declare a string variable <code>sales_str = "450"</code>. Cast it to an integer using <code>sales_int = int(sales_str)</code>. Check its class using <code>type()</code>.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Convert a float product weight <code>weight = 12.8</code> into an integer. Observe the value and note why it changes to 12.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a user profile data class script. Gather inputs for Name (string), Age (integer), and Credit_Score (float). Output a combined profile summary block.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">What is the output of <code>bool("")</code> and <code>bool("VIP")</code>? Run this in Python interpreter and explain the outcome.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Document Python data types and casting rules inside a file named <code>DATA_TYPES_NOTES.md</code> in your electromart-analytics portfolio folder.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Data Types Quiz' },
      description: { en: 'Validate data types.' },
      questions: [
        {
          text: { en: 'Which Python function reveals the data type of a variable?' },
          options: [{ en: 'check_type()' }, { en: 'type()' }, { en: 'datatype()' }, { en: 'print()' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The type() function is a built-in Python tool that returns the class name of the variable.' }
        },
        {
          text: { en: 'What is the data type of the value "True" (with quotation marks)?' },
          options: [{ en: 'bool' }, { en: 'str' }, { en: 'int' }, { en: 'Boolean' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Because it is wrapped in double quotes, it is treated as a text string (str), not a boolean literal.' }
        },
        {
          text: { en: 'What is the output of int(8.9)?' },
          options: [{ en: '9' }, { en: '8.0' }, { en: '8' }, { en: 'Error' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Casting a float to an int cuts off the decimal section entirely, yielding 8.' }
        }
      ]
    }
  },
  {
    slug: 'python-operators-6564',
    summary: { en: 'Learn to perform arithmetic calculations, comparison checks, and logical statements in Python.' },
    keyPoints: [
      'Arithmetic operators perform calculations (+, -, *, /, %, //, **).',
      'Comparison operators return boolean values True or False (==, !=, >, <, >=, <=).',
      'Logical operators combine multiple conditions (and, or, not).'
    ],
    notes: [
      'Double slash (//) represents floor division, rounding down to the nearest whole number.',
      'Double asterisk (**) represents exponentiation.'
    ],
    resources: [
      { title: 'Operators in Python', url: 'https://www.geeksforgeeks.org/python-operators/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Operators perform operations on variables and values. Python includes arithmetic, comparison, and logical operators.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart needs to automatically calculate order profit margin percentages: <code>(sales - cost) / sales * 100</code>.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write arithmetic statements to compute profit margin for sales of 600 and costs of 450. Print the margin percentage.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Evaluate a boolean check: is <code>sales > 500</code> and is <code>tax_rate <= 0.15</code>? Combine them using logical operator <code>and</code>.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Write a checkout calculator script. Calculate tax (18%), discount (10% if order > 1000), and print the net pay amount.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write Python operators to evaluate if a number is even. Hint: Use modulo operator <code>x % 2 == 0</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Implement checkout calculator formulas inside <code>main.py</code>. Commit your math operators code to your Git repo.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Operators Quiz' },
      description: { en: 'Check operator outcomes.' },
      questions: [
        {
          text: { en: 'What is the output of 10 % 3?' },
          options: [{ en: '3' }, { en: '1' }, { en: '3.33' }, { en: '0' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The modulo operator % calculates the remainder. 10 divided by 3 has a remainder of 1.' }
        },
        {
          text: { en: 'Which operator checks if two values are equal in Python?' },
          options: [{ en: '=' }, { en: '===' }, { en: '==' }, { en: 'is' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Python uses double equals (==) to evaluate logical equality.' }
        },
        {
          text: { en: 'What is the output of 2 ** 3?' },
          options: [{ en: '6' }, { en: '8' }, { en: '9' }, { en: '5' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The double asterisk ** calculates power. 2 raised to the power of 3 is 8.' }
        }
      ]
    }
  },
  {
    slug: 'python-conditional-statements-6606',
    summary: { en: 'Control program flow by implementing logic checks using if, elif, and else blocks.' },
    keyPoints: [
      'Conditional statements make decisions based on logical tests.',
      'The if block runs if the condition is True. elif checks additional conditions, and else runs if all previous conditions are False.',
      'Indentation is mandatory to group code under conditions.'
    ],
    notes: [
      'Always add a colon (:) at the end of conditional headers.',
      'Use indentation consistently (4 spaces) to avoid IndentationError.'
    ],
    resources: [
      { title: 'Python if-else conditional flow', url: 'https://realpython.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Conditional statements control code execution paths by checking criteria. They are the primary branching tools in scripts.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart wants to label orders as "VIP Purchase" if Sales exceed $1000, "High Value" if Sales exceed $500, and "Regular" otherwise.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write an <code>if-elif-else</code> conditional statement block in Python to check the variable <code>order_amount = 750</code> and print the corresponding label.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Configure logic checks to ensure shipping costs are calculated: if region is "Domestic", ship fee is $5. If region is "International", ship fee is $25. Otherwise, print "Region Invalid".</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a customer login portal validation. Verify if <code>username == "admin"</code> and <code>password == "mart123"</code>. Alert access granted or denied.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write an expression to check if a year is leap. (Divisible by 4, not by 100 unless also divisible by 400).</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Incorporate your order category logic inside <code>main.py</code>. Commit the branching scripts to GitHub.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Conditional Statements Quiz' },
      description: { en: 'Verify logical condition evaluations.' },
      questions: [
        {
          text: { en: 'What does "elif" stand for in Python?' },
          options: [{ en: 'else if' }, { en: 'elif' }, { en: 'either if' }, { en: 'extra if' }],
          correctAnswerIndex: 0,
          explanation: { en: '"elif" is short for "else if," enabling you to chain multiple logical checks sequentially.' }
        },
        {
          text: { en: 'Which character must terminate conditional headers?' },
          options: [{ en: ';' }, { en: ':' }, { en: ',' }, { en: 'No character' }],
          correctAnswerIndex: 1,
          explanation: { en: 'In Python, all compound statement headers (including if, elif, else, for, while, def) must end with a colon (:).' }
        },
        {
          text: { en: 'What error is raised if you forget to indent code inside an if block?' },
          options: [{ en: 'NameError' }, { en: 'IndentationError' }, { en: 'TypeError' }, { en: 'SyntaxError' }],
          correctAnswerIndex: 1,
          explanation: { en: 'Forgetting to indent blocks in Python raises an IndentationError.' }
        }
      ]
    }
  },
  {
    slug: 'python-loops-6648',
    summary: { en: 'Automate repetitive calculations using for and while loops, including break/continue controls.' },
    keyPoints: [
      'Loops repeat a block of code multiple times.',
      'for loops iterate over sequences. while loops repeat as long as a condition is True.',
      'break exits the loop immediately, while continue skips the rest of the current iteration.'
    ],
    notes: [
      'Ensure while loops have an updating condition to avoid infinite loops.',
      'The range(start, stop) function generates numbers stopping before \'stop\'.'
    ],
    resources: [
      { title: 'Python loops explanation', url: 'https://www.w3schools.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Loops allow you to automate repeating tasks, such as scanning every customer row or modifying lists.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart needs to process a list of 5 transaction values: <code>[100, 250, 600, 50, 900]</code>. You need to calculate total sales and count orders exceeding $500.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Write a <code>for</code> loop to iterate over the sales list. Accumulate the sum in a variable <code>total</code> and print it.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Implement a <code>while</code> loop that simulates customer checkout retries: start with <code>attempts = 3</code>, and print "Trying card..." until attempts hit zero.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a multi-product stock auditor. Loop through inventories. If an item\'s stock falls below 5, print a "REORDER REQUIRED" warning alert.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write code to generate the multiplication table (1 to 10) for any input number using a loop. Print the formatted output.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Add loop scripts to scan transaction values in your main program. Commit and save the code.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Loops Quiz' },
      description: { en: 'Test loop logic.' },
      questions: [
        {
          text: { en: 'Which keyword immediately terminates loop execution and jumps outside the loop?' },
          options: [{ en: 'continue' }, { en: 'break' }, { en: 'exit' }, { en: 'stop' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The "break" statement breaks out of the loop immediately, ignoring any remaining loop cycles.' }
        },
        {
          text: { en: 'How many numbers are generated by range(0, 3)?' },
          options: [{ en: '2' }, { en: '3' }, { en: '4' }, { en: '0' }],
          correctAnswerIndex: 1,
          explanation: { en: 'range(0, 3) generates numbers 0, 1, and 2. It stops right before the boundary (3), yielding 3 numbers.' }
        },
        {
          text: { en: 'What does the "continue" statement do inside a loop?' },
          options: [
            { en: 'Terminates the loop.' },
            { en: 'Skips the remaining code in the current cycle and jumps to the next iteration.' },
            { en: 'Restarts the entire loop.' },
            { en: 'Calculates the next iteration.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'The continue statement skips the rest of the current loop body and proceeds immediately with the next logical cycle.' }
        }
      ]
    }
  },
  {
    slug: 'python-functions-6690',
    summary: { en: 'Write modular, reusable blocks of code using Python def statements, arguments, and return values.' },
    keyPoints: [
      'A function is a reusable block of code that only runs when called.',
      'Functions are defined using the def keyword, followed by parameters.',
      'The return statement sends a calculated result back to the caller.'
    ],
    notes: [
      'Variables declared inside a function have local scope.',
      'Functions can have default parameter values.'
    ],
    resources: [
      { title: 'Defining functions in Python', url: 'https://realpython.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Instead of copying and pasting code, group instructions into reusable **functions**. This makes your scripts cleaner, modular, and easier to test.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart calculates tax repeatedly. You need to write a reusable function to compute net price: <code>price + (price * tax_rate)</code>.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Define a function <code>calculate_total(price, tax_rate=0.18)</code>. Let it return the total value, and test it with a price of 250.</p>
    </div>

    <div class="p-5 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Create a Python function <code>check_fraud(order_amount)</code> that returns True if the amount is greater than $5000, and False otherwise.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a custom currency formatter function: it takes a decimal amount and returns a string prefixed with "$" (e.g. "$450.00").</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write a recursive function or simple loop to calculate the factorial of a number (e.g. factorial(5) is 120).</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Write your tax calculation and currency formatter functions inside a helper module file <code>utils.py</code>. Commit the updates.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Functions Quiz' },
      description: { en: 'Test function signatures.' },
      questions: [
        {
          text: { en: 'Which keyword is used to declare a function in Python?' },
          options: [{ en: 'function' }, { en: 'func' }, { en: 'def' }, { en: 'declare' }],
          correctAnswerIndex: 2,
          explanation: { en: 'def (short for define) is the built-in keyword for declaring custom functions.' }
        },
        {
          text: { en: 'What does a function return if there is no "return" statement in the body?' },
          options: [{ en: 'None' }, { en: '0' }, { en: 'False' }, { en: 'Error' }],
          correctAnswerIndex: 0,
          explanation: { en: 'In Python, if a function finishes without encountering a return statement, it implicitly returns None.' }
        },
        {
          text: { en: 'What is a default parameter in Python?' },
          options: [
            { en: 'A parameter that can accept any data type.' },
            { en: 'A parameter that assumes a pre-specified value if omitted.' },
            { en: 'A parameter that cannot be changed.' },
            { en: 'The first parameter of any function.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Default parameters assign fallback values so function calls can omit those arguments safely.' }
        }
      ]
    }
  },
  {
    slug: 'python-string-6731',
    summary: { en: 'Manipulate text data using string slicing, indexing, formatting, and standard string methods.' },
    keyPoints: [
      'Strings are sequences of characters enclosed in single or double quotes.',
      'Python strings are immutable, meaning they cannot be modified after creation.',
      'Slicing extracts sub-segments of a string using index notation [start:stop:step].'
    ],
    notes: [
      'Negative indices start from the end: -1 is the last character.',
      'Use f-strings for clean variable formatting.'
    ],
    resources: [
      { title: 'Python String Methods', url: 'https://www.w3schools.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>Strings represent textual data. Python offers rich indexing and slicing syntax to extract parts of strings.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart stores order codes containing SKU and region: "ITEM102_NORTH". You need to extract just the item code ("ITEM102") and check if the region is capitalized.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Declare <code>code = "ITEM102_NORTH"</code>. Slice the string to extract the first 7 characters using <code>code[0:7]</code>.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Use the string method <code>split("_")</code> on the code string to separate SKU and Region into a list.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a customer greeting script. Take user inputs, clean leading/trailing whitespaces with <code>strip()</code>, and print an f-string welcome message.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write Python statements to verify if a string is a palindrome (reads same forward and backward). Hint: compare <code>text == text[::-1]</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Add string cleaning methods for product names to your <code>utils.py</code> module. Push updates to GitHub.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'String Quiz' },
      description: { en: 'Check string slicing.' },
      questions: [
        {
          text: { en: 'Which slice returns "PY" from text = "PYTHON"?' },
          options: [{ en: 'text[0:1]' }, { en: 'text[0:2]' }, { en: 'text[1:2]' }, { en: 'text[:1]' }],
          correctAnswerIndex: 1,
          explanation: { en: 'text[0:2] pulls characters at index 0 and 1, stopping before index 2. This returns "PY".' }
        },
        {
          text: { en: 'Can you edit a character in a string directly?' },
          options: [
            { en: 'Yes, strings are mutable.' },
            { en: 'No, strings are immutable.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Python strings are immutable. You cannot modify individual characters directly.' }
        },
        {
          text: { en: 'What is the syntax for f-string formatting in Python?' },
          options: [
            { en: 'f"Hello {name}"' },
            { en: 'format("Hello %s", name)' },
            { en: '"Hello {name}".format()' },
            { en: 'f("Hello %name")' },
          ],
          correctAnswerIndex: 0,
          explanation: { en: 'Prefixing a string with "f" tells Python to evaluate expressions inside curly braces dynamically.' }
        }
      ]
    }
  },
  {
    slug: 'python-lists-6773',
    summary: { en: 'Create and manipulate ordered, mutable collections of items using Python lists.' },
    keyPoints: [
      'Lists store multiple items in a single variable, enclosed in square brackets [].',
      'Lists are ordered, mutable, and allow duplicate values.',
      'Common list methods include append(), insert(), remove(), and pop().'
    ],
    notes: [
      'Like strings, lists are 0-indexed.',
      'You can slice lists just like strings.'
    ],
    resources: [
      { title: 'Lists in Python', url: 'https://www.geeksforgeeks.org/python-lists/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>A **List** is Python's standard array collection. It lets you store multiple items in a single variable, and unlike strings, lists are mutable.</p>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart tracks hot-selling categories: "Electronics", "Home", "Fashion". You need to add "Books" to the list and remove outdated categories.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Declare a list <code>categories = ["Electronics", "Home", "Fashion"]</code>. Call <code>categories.append("Books")</code> to append "Books" to the end.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Slice the categories list to pull out the first two items: <code>categories[0:2]</code>. Print and inspect the output.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a transactional queue list. Append 3 transaction IDs to a list. Use <code>pop(0)</code> to simulate processing orders in FIFO order.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write Python code to reverse a list in-place using a method call. Hint: use <code>list.reverse()</code>.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Add transaction lists management features to your <code>main.py</code> file. Commit and sync to GitHub.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Lists Quiz' },
      description: { en: 'Test list methods.' },
      questions: [
        {
          text: { en: 'Which method adds an element to the end of a list?' },
          options: [{ en: 'add()' }, { en: 'append()' }, { en: 'insert()' }, { en: 'extend()' }],
          correctAnswerIndex: 1,
          explanation: { en: 'The append() method modifies the list in-place by adding a single element to the very end.' }
        },
        {
          text: { en: 'If values = [10, 20, 30], what is the output of values.pop(0)?' },
          options: [{ en: '10' }, { en: '[20, 30]' }, { en: '30' }, { en: 'Error' }],
          correctAnswerIndex: 0,
          explanation: { en: 'pop(index) removes and returns the element at the specified index. pop(0) removes 10.' }
        },
        {
          text: { en: 'Are lists ordered or unordered collections in Python?' },
          options: [
            { en: 'Ordered.' },
            { en: 'Unordered.' }
          ],
          correctAnswerIndex: 0,
          explanation: { en: 'Lists are ordered sequences. They maintain the insertion order of elements.' }
        }
      ]
    }
  },
  {
    slug: 'python-dictionary-6813',
    summary: { en: 'Store and retrieve data records efficiently using key-value pairs inside Python dictionaries.' },
    keyPoints: [
      'A dictionary stores data in unordered, mutable key-value pairs, enclosed in curly braces {}.',
      'Keys must be unique and immutable, while values can be anything.',
      'Values are retrieved by matching their keys inside square brackets: dict[key].'
    ],
    notes: [
      'Keys are case-sensitive.',
      'Use dict.get(key, default) to lookup keys without raising a KeyError if the key is missing.'
    ],
    resources: [
      { title: 'Python Dictionaries Guide', url: 'https://realpython.com/' }
    ],
    contentHtml: `<div class="space-y-6">
  <p>A **Dictionary** is a key-value lookup map. Dictionaries are incredibly fast for retrieval operations and are ideal for storing structured records.</p>
  
  <h3 class="text-xl font-bold mt-6 mb-3">Key-Value Structure</h3>
  <pre><code># Create dictionary
student = {
    "name": "Alex",
    "grade": 92
}</code></pre>

  <!-- PBL Elements -->
  <div class="space-y-4 border-t border-slate-200 pt-6">
    <div class="p-4 bg-sky-50 border-l-4 border-sky-500 rounded-r-xl text-sky-900">
      <h4 class="font-bold">💼 Real-world Scenario</h4>
      <p class="text-sm">ElectroMart requires storing detailed customer profiles (Name, Purchases, VIP Status) as structured records for instant key-based retrieval.</p>
    </div>

    <div class="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl text-purple-900">
      <h4 class="font-bold">🛠️ Practical Task</h4>
      <p class="text-sm">Create a dictionary <code>customer = {"name": "Alice", "sales": 450, "vip": True}</code>. Print the customer name using <code>customer["name"]</code>.</p>
    </div>

    <div class="p-4 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl text-emerald-900">
      <h4 class="font-bold">📊 Dataset Exercise</h4>
      <p class="text-sm">Use <code>.get()</code> to retrieve the customer\'s "email" address from the customer dictionary, returning "Email Missing" if not defined.</p>
    </div>

    <div class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl text-blue-900">
      <h4 class="font-bold">🚀 Mini Project</h4>
      <p class="text-sm">Build a products catalog catalog. Store product price, cost, and stock as dictionary fields. Write code to update stock after a purchase.</p>
    </div>

    <div class="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900">
      <h4 class="font-bold">🧩 Coding Challenge</h4>
      <p class="text-sm">Write Python statements to print all keys and values from your customer dictionary using <code>customer.items()</code> and a loop.</p>
    </div>

    <div class="p-4 bg-slate-50 border-l-4 border-slate-500 rounded-r-xl text-slate-900">
      <h4 class="font-bold">📁 Portfolio Task</h4>
      <p class="text-sm">Define your e-commerce product catalogs using dictionaries inside <code>main.py</code>. Commit the changes to your project repository.</p>
    </div>
  </div>
</div>`,
    quiz: {
      title: { en: 'Dictionary Quiz' },
      description: { en: 'Verify dictionary access syntax.' },
      questions: [
        {
          text: { en: 'Which character pairs enclose a dictionary in Python?' },
          options: [{ en: '[]' }, { en: '()' }, { en: '{}' }, { en: '<>' }],
          correctAnswerIndex: 2,
          explanation: { en: 'Dictionaries use curly braces {} with key-value pairs (separated by colons) to define the lookup map.' }
        },
        {
          text: { en: 'What occurs if you try to retrieve a missing key using standard brackets (e.g. my_dict["missing"])?' },
          options: [
            { en: 'Returns None.' },
            { en: 'Raises a KeyError.' },
            { en: 'Raises a TypeError.' },
            { en: 'Creates the key with a blank value.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Direct bracket lookup on a non-existent key throws a KeyError. To avoid this error, use dict.get().' }
        },
        {
          text: { en: 'Can dictionary keys be duplicate?' },
          options: [
            { en: 'Yes, duplicate keys are allowed.' },
            { en: 'No, keys must be unique. Re-assigning an existing key overwrites its value.' }
          ],
          correctAnswerIndex: 1,
          explanation: { en: 'Keys must be unique. If you assign a value to a key that already exists, it updates the existing key\'s value.' }
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
    const lesson = await lessonsColl.findOne({ course: course._id, slug: 'python' });
    if (!lesson) {
      console.error('Python lesson not found!');
      process.exit(1);
    }

    for (const data of topicsData) {
      console.log(`[SEED] Seeding details for topic slug: ${data.slug}`);
      const baseSlug = data.slug.substring(0, data.slug.lastIndexOf('-'));
      const topicDoc = await topicsColl.findOne({ course: course._id, lesson: lesson._id, slug: { $regex: new RegExp('^' + baseSlug) } });
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
