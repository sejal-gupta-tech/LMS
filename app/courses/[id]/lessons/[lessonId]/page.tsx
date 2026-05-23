'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  PlayCircle,
  Sparkles,
  Video,
  Layers3,
  PanelLeftOpen,
  BadgeInfo,
  Medal,
  RotateCcw,
  Download,
  Code,
  LayoutDashboard,
  Database,
  Trophy,
  ExternalLink,
  Loader2,
  Folder
} from 'lucide-react';
import { QuizComponent } from '@/modules/lms/components/courses/QuizComponent';
import { getContentLocale, getLocaleFromPathname, getLocalePath, translateCommon } from '@/lib/i18n';
import { readJsonResponse, unwrapApiData } from '@/lib/api';

// Dynamically imported Recharts components to prevent SSR issues
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line
} from 'recharts';

type Topic = {
  _id: string;
  title: string;
  slug?: string;
  content?: string;
  contentHtml?: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  keyPoints?: string[];
  notes?: string[];
  resources?: { title: string; url: string }[];
  codeExample?: string;
  summary?: string;
  quizId?: Quiz;
  order?: number;
  quizzes?: Quiz[];
};

type LessonQuizQuestion = {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex?: number;
  explanation?: string;
};

type Quiz = {
  _id: string;
  title: string;
  description?: string;
  questions?: LessonQuizQuestion[];
  passingMarks?: number;
};

type Lesson = {
  _id: string;
  slug?: string;
  courseId?: string;
  course?: string;
  title: string;
  content?: string;
  description?: string;
  topics?: Topic[];
  quizzes?: Quiz[];
  duration?: number;
};

type Course = {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  thumbnail?: string;
};

// Static E-Commerce Dataset representing the project
const MOCK_DATASET = [
  { Transaction_ID: 'TXN1001', Customer_ID: 'CUST501', Customer_Name: 'Alice Smith', Category: 'Electronics', Purchase_Amount: 1200.00, Profit: 300.00, Region: 'North America', VIP_Status: 'VIP', Order_Date: '2026-05-01', Shipping_Time_Days: 2 },
  { Transaction_ID: 'TXN1002', Customer_ID: 'CUST502', Customer_Name: 'Bob Jones', Category: 'Fashion', Purchase_Amount: 85.50, Profit: 25.00, Region: 'Europe', VIP_Status: 'Standard', Order_Date: '2026-05-02', Shipping_Time_Days: 4 },
  { Transaction_ID: 'TXN1003', Customer_ID: 'CUST503', Customer_Name: 'Charlie Brown', Category: 'Home & Kitchen', Purchase_Amount: 450.00, Profit: 90.00, Region: 'Asia-Pacific', VIP_Status: 'VIP', Order_Date: '2026-05-03', Shipping_Time_Days: 3 },
  { Transaction_ID: 'TXN1004', Customer_ID: 'CUST504', Customer_Name: 'Diana Prince', Category: 'Electronics', Purchase_Amount: 2500.00, Profit: 750.00, Region: 'North America', VIP_Status: 'VIP', Order_Date: '2026-05-04', Shipping_Time_Days: 1 },
  { Transaction_ID: 'TXN1005', Customer_ID: 'CUST505', Customer_Name: 'Evan Wright', Category: 'Office Supplies', Purchase_Amount: 120.00, Profit: 40.00, Region: 'Europe', VIP_Status: 'Standard', Order_Date: '2026-05-05', Shipping_Time_Days: 5 },
  { Transaction_ID: 'TXN1006', Customer_ID: 'CUST506', Customer_Name: 'Fiona Gallagher', Category: 'Fashion', Purchase_Amount: 320.00, Profit: 110.00, Region: 'Europe', VIP_Status: 'VIP', Order_Date: '2026-05-06', Shipping_Time_Days: 3 },
  { Transaction_ID: 'TXN1007', Customer_ID: 'CUST507', Customer_Name: 'George Clark', Category: 'Home & Kitchen', Purchase_Amount: 95.00, Profit: -15.00, Region: 'North America', VIP_Status: 'Standard', Order_Date: '2026-05-07', Shipping_Time_Days: 6 },
  { Transaction_ID: 'TXN1008', Customer_ID: 'CUST508', Customer_Name: 'Hannah Abbott', Category: 'Office Supplies', Purchase_Amount: 45.00, Profit: 15.00, Region: 'Asia-Pacific', VIP_Status: 'Standard', Order_Date: '2026-05-08', Shipping_Time_Days: 2 },
  { Transaction_ID: 'TXN1009', Customer_ID: 'CUST509', Customer_Name: 'Ian Malcolm', Category: 'Electronics', Purchase_Amount: 1800.00, Profit: 450.00, Region: 'Asia-Pacific', VIP_Status: 'VIP', Order_Date: '2026-05-09', Shipping_Time_Days: 4 },
  { Transaction_ID: 'TXN1010', Customer_ID: 'CUST510', Customer_Name: 'Julia Roberts', Category: 'Fashion', Purchase_Amount: 150.00, Profit: 45.00, Region: 'North America', VIP_Status: 'Standard', Order_Date: '2026-05-10', Shipping_Time_Days: 3 },
  { Transaction_ID: 'TXN1011', Customer_ID: 'CUST511', Customer_Name: 'Kevin Bacon', Category: 'Home & Kitchen', Purchase_Amount: 600.00, Profit: 180.00, Region: 'Europe', VIP_Status: 'VIP', Order_Date: '2026-05-11', Shipping_Time_Days: 2 },
  { Transaction_ID: 'TXN1012', Customer_ID: 'CUST512', Customer_Name: 'Laura Croft', Category: 'Office Supplies', Purchase_Amount: 85.00, Profit: 30.00, Region: 'North America', VIP_Status: 'Standard', Order_Date: '2026-05-12', Shipping_Time_Days: 1 },
  { Transaction_ID: 'TXN1013', Customer_ID: 'CUST513', Customer_Name: 'Michael Scott', Category: 'Electronics', Purchase_Amount: 950.00, Profit: -50.00, Region: 'North America', VIP_Status: 'Standard', Order_Date: '2026-05-13', Shipping_Time_Days: 5 },
  { Transaction_ID: 'TXN1014', Customer_ID: 'CUST514', Customer_Name: 'Nancy Wheeler', Category: 'Fashion', Purchase_Amount: 220.00, Profit: 70.00, Region: 'Europe', VIP_Status: 'VIP', Order_Date: '2026-05-14', Shipping_Time_Days: 3 },
  { Transaction_ID: 'TXN1015', Customer_ID: 'CUST515', Customer_Name: 'Oscar Martinez', Category: 'Office Supplies', Purchase_Amount: 310.00, Profit: 120.00, Region: 'Asia-Pacific', VIP_Status: 'Standard', Order_Date: '2026-05-15', Shipping_Time_Days: 2 },
  { Transaction_ID: 'TXN1016', Customer_ID: 'CUST516', Customer_Name: 'Pam Beesly', Category: 'Home & Kitchen', Purchase_Amount: 175.00, Profit: 55.00, Region: 'Europe', VIP_Status: 'Standard', Order_Date: '2026-05-16', Shipping_Time_Days: 4 },
  { Transaction_ID: 'TXN1017', Customer_ID: 'CUST517', Customer_Name: 'Quentin Tarantino', Category: 'Electronics', Purchase_Amount: 3200.00, Profit: 960.00, Region: 'Asia-Pacific', VIP_Status: 'VIP', Order_Date: '2026-05-17', Shipping_Time_Days: 2 },
  { Transaction_ID: 'TXN1018', Customer_ID: 'CUST518', Customer_Name: 'Rachel Green', Category: 'Fashion', Purchase_Amount: 410.00, Profit: 160.00, Region: 'North America', VIP_Status: 'VIP', Order_Date: '2026-05-18', Shipping_Time_Days: 3 },
  { Transaction_ID: 'TXN1019', Customer_ID: 'CUST519', Customer_Name: 'Steve Rogers', Category: 'Home & Kitchen', Purchase_Amount: 850.00, Profit: 250.00, Region: 'North America', VIP_Status: 'VIP', Order_Date: '2026-05-19', Shipping_Time_Days: 2 },
  { Transaction_ID: 'TXN1020', Customer_ID: 'CUST520', Customer_Name: 'Tony Stark', Category: 'Electronics', Purchase_Amount: 5000.00, Profit: 2000.00, Region: 'North America', VIP_Status: 'VIP', Order_Date: '2026-05-20', Shipping_Time_Days: 1 }
];

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6'];

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractIframeSrc(html: string) {
  const match = html.match(/<iframe[^>]*src=["']([^"']+)["'][^>]*>/i);
  return match?.[1] || '';
}

function toYouTubeEmbedUrl(input: string) {
  if (!input) return '';
  try {
    const url = new URL(input);
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtu.be') {
      const id = url.pathname.replace('/', '').trim();
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : '';
    }
    if (host.includes('youtube.com')) {
      const videoId = url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop();
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : '';
    }
    return '';
  } catch {
    return '';
  }
}

// Extract PBL elements from seeded HTML
function extractPblTasks(html: string) {
  if (!html) return [];
  const regex = /<div\s+class="p-4\s+bg-[a-z]+-50[\s\S]*?">\s*<h4[^>]*>([\s\S]*?)<\/h4>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/div>/gi;
  const tasks: { title: string; description: string; emoji: string }[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const rawTitle = match[1].replace(/<[^>]+>/g, '').trim();
    const rawDesc = match[2].replace(/<[^>]+>/g, '').trim();
    const emojiMatch = rawTitle.match(/^([^\w\s])\s*(.*)$/u) || rawTitle.match(/^([\uD800-\uDBFF][\uDCC0-\uDFFF])\s*(.*)$/u);
    const emoji = emojiMatch ? emojiMatch[1] : '📝';
    const cleanTitle = emojiMatch ? emojiMatch[2] : rawTitle;
    tasks.push({
      title: cleanTitle,
      description: rawDesc,
      emoji: emoji
    });
  }
  return tasks;
}

// Client-side Python Simulation Interpreter
const executePythonMock = (codeStr: string): string => {
  const lines = codeStr.split('\n');
  const consoleLogs: string[] = [];
  const variables: Record<string, any> = {};

  try {
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if (!line || line.startsWith('#')) continue;

      // Handle simple print statements
      if (line.startsWith('print(') && line.endsWith(')')) {
        const content = line.substring(6, line.length - 1).trim();
        // Check if string literal
        if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
          consoleLogs.push(content.substring(1, content.length - 1));
        } else if (content === 'df.head()') {
          consoleLogs.push(
`   Transaction_ID Customer_ID       Category  Purchase_Amount   Profit         Region
0        TXN1001     CUST501    Electronics          1200.00   300.00  North America
1        TXN1002     CUST502        Fashion            85.50    25.00         Europe
2        TXN1003     CUST503 Home & Kitchen           450.00    90.00   Asia-Pacific
3        TXN1004     CUST504    Electronics          2500.00   750.00  North America
4        TXN1005     CUST505 Office Supplies           120.00    40.00         Europe`);
        } else if (content === 'df.describe()') {
          consoleLogs.push(
`       Purchase_Amount      Profit
count        20.000000   20.000000
mean        954.550000  332.000000
std        1399.704400  531.065800
min          45.000000  -50.000000
50%         430.000000  115.000000
max        5000.000000 2000.000000`);
        } else {
          // Evaluate variables
          if (variables[content] !== undefined) {
            consoleLogs.push(String(variables[content]));
          } else {
            try {
              let jsExpr = content;
              Object.keys(variables).forEach(varName => {
                const r = new RegExp(`\\b${varName}\\b`, 'g');
                jsExpr = jsExpr.replace(r, variables[varName]);
              });
              const val = new Function(`return (${jsExpr})`)();
              consoleLogs.push(String(val));
            } catch {
              consoleLogs.push(`NameError: name '${content}' is not defined`);
            }
          }
        }
        continue;
      }

      // Handle assignments
      if (line.includes('=')) {
        const parts = line.split('=');
        const varName = parts[0].trim();
        let varValueExpr = parts.slice(1).join('=').trim();
        
        if ((varValueExpr.startsWith('"') && varValueExpr.endsWith('"')) || (varValueExpr.startsWith("'") && varValueExpr.endsWith("'"))) {
          variables[varName] = varValueExpr.substring(1, varValueExpr.length - 1);
        } else {
          Object.keys(variables).forEach(v => {
            const r = new RegExp(`\\b${v}\\b`, 'g');
            varValueExpr = varValueExpr.replace(r, variables[v]);
          });
          try {
            variables[varName] = new Function(`return (${varValueExpr})`)();
          } catch {
            variables[varName] = varValueExpr;
          }
        }
        continue;
      }
      
      // Handle simple ranges
      if (line.startsWith('for ') && line.includes(' in range(') && line.endsWith(':')) {
        const forMatch = line.match(/for\s+(\w+)\s+in\s+range\((\d+)\)\s*:/);
        if (forMatch) {
          const iterVar = forMatch[1];
          const count = parseInt(forMatch[2]);
          const bodyLines = [];
          let j = i + 1;
          while (j < lines.length && (lines[j].startsWith(' ') || lines[j].startsWith('\t') || !lines[j].trim())) {
            if (lines[j].trim()) bodyLines.push(lines[j].trim());
            j++;
          }
          i = j - 1;
          
          for (let c = 0; c < count; c++) {
            variables[iterVar] = c;
            for (let b = 0; b < bodyLines.length; b++) {
              let bodyLine = bodyLines[b];
              if (bodyLine.startsWith('print(') && bodyLine.endsWith(')')) {
                const content = bodyLine.substring(6, bodyLine.length - 1).trim();
                let jsExpr = content;
                Object.keys(variables).forEach(v => {
                  const r = new RegExp(`\\b${v}\\b`, 'g');
                  jsExpr = jsExpr.replace(r, variables[v]);
                });
                try {
                  const val = new Function(`return (${jsExpr})`)();
                  consoleLogs.push(String(val));
                } catch {
                  consoleLogs.push(jsExpr);
                }
              }
            }
          }
          continue;
        }
      }
      
      if (line === 'df.head()') {
        consoleLogs.push(
`   Transaction_ID Customer_ID       Category  Purchase_Amount   Profit         Region
0        TXN1001     CUST501    Electronics          1200.00   300.00  North America
1        TXN1002     CUST502        Fashion            85.50    25.00         Europe
2        TXN1003     CUST503 Home & Kitchen           450.00    90.00   Asia-Pacific
3        TXN1004     CUST504    Electronics          2500.00   750.00  North America
4        TXN1005     CUST505 Office Supplies           120.00    40.00         Europe`);
      } else if (line === 'df.describe()') {
        consoleLogs.push(
`       Purchase_Amount      Profit
count        20.000000   20.000000
mean        954.550000  332.000000
std        1399.704400  531.065800
min          45.000000  -50.000000
50%         430.000000  115.000000
max        5000.000000 2000.000000`);
      } else {
        try {
          let jsExpr = line;
          Object.keys(variables).forEach(v => {
            const r = new RegExp(`\\b${v}\\b`, 'g');
            jsExpr = jsExpr.replace(r, variables[v]);
          });
          const val = new Function(`return (${jsExpr})`)();
          if (val !== undefined) consoleLogs.push(String(val));
        } catch {
          // ignore
        }
      }
    }
  } catch (err: any) {
    consoleLogs.push(`SyntaxError: ${err.message}`);
  }

  if (consoleLogs.length === 0) {
    return '>>> Program exited with code 0 (no output)';
  }
  return consoleLogs.join('\n');
};

const getTopicStarterCode = (topicTitle: string, lessonTitle: string) => {
  const titleLower = (topicTitle || '').toLowerCase();
  const lessonLower = (lessonTitle || '').toLowerCase();

  if (lessonLower.includes('python')) {
    if (titleLower.includes('introduction') || titleLower.includes('download')) {
      return `# Python Introduction Setup\nprint("Welcome to ElectroMart Python Analytics Workspace!")\nimport pandas as pd\nprint("Pandas loaded successfully.")`;
    }
    if (titleLower.includes('variable')) {
      return `# KPI Variable Assignment\nrevenue = 18765.20\ncustomer_count = 20\n\navg_order = revenue / customer_count\nprint("Total Revenue: $" + str(revenue))\nprint("Average Order Value: $" + str(avg_order))`;
    }
    if (titleLower.includes('type')) {
      return `# Verifying Column Data Types\nprint("Checking e-commerce schema types:")\nprint("Transaction_ID: object (string)")\nprint("Purchase_Amount: float64 (numeric)")\nprint("VIP_Status: bool (flag)")`;
    }
    if (titleLower.includes('operator')) {
      return `# Arithmetic margins\nsales = 2500.00\nprofit = 750.00\nmargin = (profit / sales) * 100\nprint("Calculated Margin: " + str(margin) + "%")`;
    }
    if (titleLower.includes('conditional')) {
      return `# Filtering high-value transactions\namount = 1200.00\nif amount > 1000.00:\n    print("Alert: High-Value VIP Transaction detected!")\nelse:\n    print("Standard transaction.")`;
    }
    if (titleLower.includes('loop')) {
      return `# Looping through transactions\nprint("Scanning transactions:")\nfor i in range(5):\n    print("Record TXN100" + str(i+1) + " validated.")`;
    }
    if (titleLower.includes('list')) {
      return `# Collecting VIP Transaction IDs\nvip_list = ["TXN1001", "TXN1004", "TXN1006"]\nprint("Active VIP List size: " + str(len(vip_list)))\nprint("VIP Customer 1 ID: " + vip_list[0])`;
    }
    return `# E-Commerce Sales Data Analysis\nimport pandas as pd\ndf = pd.read_csv("ecommerce_sales.csv")\n\nprint("--- FIRST 5 RECORDS ---")\nprint(df.head())\n\nprint("\\n--- STATISTICAL SUMMARY ---")\nprint(df.describe())`;
  }

  if (lessonLower.includes('excel')) {
    if (titleLower.includes('formula')) {
      return `# Excel Formula Simulation\n# Calculate SUM and AVERAGE of Purchase_Amount\nprint("Excel SUM(D2:D21) => $19,091.00")\nprint("Excel AVERAGE(D2:D21) => $954.55")`;
    }
    if (titleLower.includes('lookup')) {
      return `# Excel VLOOKUP Simulator\n# VLOOKUP("TXN1004", E-Commerce_Grid, 3, FALSE)\nprint("Searching Customer Name for TXN1004...")\nprint("VLOOKUP Result => 'Diana Prince'")`;
    }
    if (titleLower.includes('if')) {
      return `# Excel IF logic\n# =IF(E2 > 1000, "VIP", "Standard")\nprint("Excel VIP Classifier:")\nprint("Row 2 (TXN1001, $1200.00) => " + ("VIP" if 1200 > 1000 else "Standard"))`;
    }
    return `# Excel analysis setup for ElectroMart\nprint("Excel Grid columns loaded: Transaction_ID, Customer_ID, Category, Purchase_Amount, Profit, Region")\nprint("Formula bar active. Ready for analysis.")`;
  }

  return `# Data Foundations logic challenge\n# Define the modern data pipeline stages\npipeline = ["Collection", "Cleaning", "Analysis", "Visualization", "Action"]\nprint("Modern Data Pipeline:")\nfor idx, stage in enumerate(pipeline):\n    print(str(idx+1) + ". " + stage)`;
};

const DEMO_USER_ID = '000000000000000000000001';

function SkeletonCard({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-3xl bg-slate-800 ${className}`} />;
}

export default function LessonLearningPage() {
  const params = useParams<Record<string, string>>();
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const contentLocale = getContentLocale(locale);
  const t = (key: string) => translateCommon(locale, key);

  const courseId = params.courseSlug || params.id;
  const lessonId = params.lessonSlug || params.lessonId;
  const isLegacyRoute = Boolean(params.id || params.lessonId);

  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [lessonQuiz, setLessonQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedTopicIds, setCompletedTopicIds] = useState<string[]>([]);

  // PBL Interaction States
  const [activeTab, setActiveTab] = useState<'concept' | 'playground' | 'dashboard' | 'dataset' | 'portfolio'>('concept');
  const [portfolioSyncStage, setPortfolioSyncStage] = useState<'idle' | 'syncing' | 'completed'>('idle');
  const [gitLogs, setGitLogs] = useState<string[]>([]);
  const [commitMessage, setCommitMessage] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [pythonCode, setPythonCode] = useState<string>('');
  const [consoleOutput, setConsoleOutput] = useState<string>('>>> Console ready. Click "Run" to test your script.');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(0);
  const [datasetPage, setDatasetPage] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isLessonMapCollapsed, setIsLessonMapCollapsed] = useState<boolean>(false);
  const [isMilestonesCollapsed, setIsMilestonesCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const fetchLesson = async () => {
      setLoading(true);
      setError(null);

      try {
        const [courseRes, lessonRes] = await Promise.all([
          fetch(`/api/lms/courses/${courseId}?lang=${contentLocale}`),
          fetch(`/api/lms/lesson/${lessonId}?lang=${contentLocale}`),
        ]);

        const [coursePayload, lessonPayload] = await Promise.all([
          readJsonResponse(courseRes),
          readJsonResponse(lessonRes),
        ]);

        const resolvedCourse = unwrapApiData<Course>(coursePayload);
        const resolvedLesson = unwrapApiData<Lesson>(lessonPayload);

        if (!courseRes.ok || !lessonRes.ok || !resolvedLesson) {
          throw new Error(
            (resolvedLesson as any)?.error ||
              (lessonPayload as any)?.error ||
              'Failed to load lesson'
          );
        }

        const nextTopics = Array.isArray(resolvedLesson.topics)
          ? [...resolvedLesson.topics].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          : [];
        const nextQuiz = resolvedLesson.quizzes?.[0] || null;

        if (!cancelled) {
          setCourse(resolvedCourse || null);
          setLesson(resolvedLesson);
          setTopics(nextTopics);
          
          const activeTopicFromParams = params.topicSlug
            ? nextTopics.find((t) => t.slug === params.topicSlug || t._id === params.topicSlug)
            : null;
          setActiveTopicId(activeTopicFromParams?._id ?? nextTopics[0]?._id ?? null);
          
          setLessonQuiz(nextQuiz);
          setShowQuiz(false);

          if (isLegacyRoute && resolvedCourse?.slug && resolvedLesson?.slug && !params.topicSlug) {
            router.replace(
              getLocalePath(locale, `/courses/${resolvedCourse.slug}/${resolvedLesson.slug}`)
            );
          }

          const storageKey = `lms-progress:${courseId}:${lessonId}`;
          try {
            const saved = window.localStorage.getItem(storageKey);
            const parsed = saved ? JSON.parse(saved) : [];
            if (Array.isArray(parsed)) {
              setCompletedTopicIds(parsed.filter((item) => typeof item === 'string'));
            }
          } catch {
            setCompletedTopicIds([]);
          }
        }
      } catch (fetchError: any) {
        if (!cancelled) {
          setError(fetchError?.message || 'Something went wrong');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    if (courseId && lessonId) {
      fetchLesson();
    }

    return () => {
      cancelled = true;
    };
  }, [contentLocale, courseId, isLegacyRoute, lessonId, locale, router, params.topicSlug]);

  // Handle milestones loading on active topic changes
  useEffect(() => {
    if (!courseId || !lessonId || !activeTopicId) return;
    const key = `lms-pbl-milestones:${courseId}:${lessonId}:${activeTopicId}`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        setCompletedMilestones(JSON.parse(saved));
      } else {
        setCompletedMilestones({});
      }
    } catch {
      setCompletedMilestones({});
    }
    setActiveMilestoneIdx(0);
    setShowConfetti(false);
  }, [courseId, lessonId, activeTopicId]);

  useEffect(() => {
    if (!topics.length) return;
    const storageKey = `lms-progress:${courseId}:${lessonId}`;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(completedTopicIds));
    } catch {
      // ignore persistence
    }
  }, [completedTopicIds, courseId, lessonId, topics.length]);

  const activeTopic = useMemo(() => {
    if (!topics.length) return null;
    return topics.find((topic) => topic._id === activeTopicId) || topics[0];
  }, [activeTopicId, topics]);

  // Load appropriate starter code and git details when active topic updates
  useEffect(() => {
    if (activeTopic) {
      setPythonCode(getTopicStarterCode(activeTopic.title, lesson?.title || ''));
      setConsoleOutput('>>> Console ready. Click "Run Code" to execute.');
      setCommitMessage(`feat: complete ${activeTopic.title || 'analysis'} milestone`);
      setPortfolioSyncStage('idle');
      setGitLogs([
        `$ git status`,
        `On branch main`,
        `Your branch is up to date with 'origin/main'.`,
        ``,
        `Changes not staged for commit:`,
        `  (use "git add <file>..." to update what will be committed)`,
        `  (use "git restore <file>..." to discard changes in working directory)`,
        `\tmodified:   analytics.py`,
        `\tmodified:   README.md`,
        ``,
        `no changes added to commit (use "git add" and/or "git commit -a")`
      ]);
    }
  }, [activeTopicId, lesson?.title, activeTopic]);

  useEffect(() => {
    if (activeTopic && activeTopic.slug && course?.slug && lesson?.slug) {
      const targetPath = `/courses/${course.slug}/${lesson.slug}/${activeTopic.slug}`;
      const expectedPath = getLocalePath(locale, targetPath);
      if (pathname !== expectedPath) {
        window.history.replaceState(null, '', expectedPath);
      }
    }
  }, [activeTopic, course?.slug, lesson?.slug, locale, pathname]);

  const currentTopicIndex = topics.findIndex((topic) => topic._id === activeTopic?._id);
  const nextTopic = currentTopicIndex >= 0 ? topics[currentTopicIndex + 1] : null;
  const previousTopic = currentTopicIndex > 0 ? topics[currentTopicIndex - 1] : null;
  const activeTopicQuiz = activeTopic?.quizId || activeTopic?.quizzes?.[0] || lessonQuiz || null;

  const activeTopicHtml = activeTopic?.contentHtml || activeTopic?.content || '';
  const cleanedTopicHtml = activeTopicHtml.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
  const topicVideoSrc = activeTopic?.videoUrl ? toYouTubeEmbedUrl(activeTopic.videoUrl) || activeTopic.videoUrl : extractIframeSrc(activeTopicHtml);
  
  // Extract project milestones
  const activePblTasks = useMemo(() => {
    const parsed = extractPblTasks(activeTopicHtml);
    if (parsed.length > 0) return parsed;
    
    // Fallback if no PBL sections are found in the topic
    return [
      { title: 'Real-world Scenario', description: `Understand how the concepts of ${activeTopic?.title || 'this topic'} are applied to ElectroMart's customer checkout data.`, emoji: '💼' },
      { title: 'Practical Task', description: `Practice applying the variables, calculations, or steps of ${activeTopic?.title || 'this topic'} on sample data records.`, emoji: '🛠️' },
      { title: 'Dataset Exercise', description: `Identify the appropriate data fields and values inside ecommerce_sales.csv matching this topic.`, emoji: '📊' },
      { title: 'Mini Project', description: `Build a small deliverable documenting the calculations or analysis performed for this topic.`, emoji: '🚀' },
      { title: 'Coding Challenge', description: `Write a script or formulas implementing the logic of ${activeTopic?.title || 'this topic'} in the Coding Playground.`, emoji: '🧩' },
      { title: 'Portfolio Task', description: `Document your work and commit the progress to your Git repository folder.`, emoji: '📁' }
    ];
  }, [activeTopicHtml, activeTopic?.title]);

  const conceptHtml = useMemo(() => {
    if (!cleanedTopicHtml) return '';
    // Strip PBL element containers out of standard Concept Study view for tidier layout
    const parts = cleanedTopicHtml.split(/<!-- PBL Elements -->|<div class="space-y-4 border-t border-slate-200 pt-6">/i);
    return parts[0].trim();
  }, [cleanedTopicHtml]);

  const topicSummary = activeTopic?.summary || activeTopic?.description || 'Build data analytics projects interactively.';

  const completedCount = completedTopicIds.length;
  const totalTopics = topics.length || 1;
  const progressPercentage = Math.min(100, Math.round((completedCount / totalTopics) * 100));
  const allTopicsComplete = topics.length > 0 && completedCount >= topics.length;
  const durationEstimate = lesson?.duration ?? Math.max(topics.length * 8, 8);
  const activeTopicTitle = activeTopic?.title || lesson?.title || 'Lesson';
  const hasTopicVideo = Boolean(activeTopic?.videoUrl || topicVideoSrc);
  const embeddedVideoSrc = topicVideoSrc || activeTopic?.videoUrl || '';

  const markComplete = async (topicId: string | null) => {
    if (!topicId) return;
    setCompletedTopicIds((current) => (current.includes(topicId) ? current : [...current, topicId]));

    try {
      await fetch('/api/lms/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: DEMO_USER_ID,
          courseId,
          lessonId,
          completed: true,
        }),
      });
    } catch {
      // keep local progress
    }
  };

  const toggleMilestone = (index: number) => {
    const next = { ...completedMilestones, [index]: !completedMilestones[index] };
    setCompletedMilestones(next);
    
    if (courseId && lessonId && activeTopicId) {
      const key = `lms-pbl-milestones:${courseId}:${lessonId}:${activeTopicId}`;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
    }

    // Automatically check if all milestones completed to set topic completion!
    const allCompleted = activePblTasks.every((_, idx) => next[idx]);
    if (allCompleted) {
      if (activeTopicId) {
        markComplete(activeTopicId);
      }
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  };

  const handleMilestoneCardClick = (title: string, index: number) => {
    setActiveMilestoneIdx(index);
    const name = title.toLowerCase();
    if (name.includes('scenario')) {
      setActiveTab('concept');
    } else if (name.includes('task') || name.includes('challenge') || name.includes('logic')) {
      setActiveTab('playground');
    } else if (name.includes('exercise')) {
      setActiveTab('dataset');
    } else if (name.includes('project')) {
      setActiveTab('dashboard');
    } else if (name.includes('portfolio')) {
      setActiveTab('portfolio');
    }
  };

  const jumpToResumePoint = () => {
    const nextIncomplete = topics.find((topic) => !completedTopicIds.includes(topic._id));
    if (nextIncomplete) {
      setActiveTopicId(nextIncomplete._id);
      setShowQuiz(false);
      return;
    }

    if (activeTopicQuiz) {
      setShowQuiz(true);
    }
  };

  const goToNextTopic = () => {
    if (activeTopic) {
      markComplete(activeTopic._id);
    }

    if (nextTopic) {
      setActiveTopicId(nextTopic._id);
      setShowQuiz(false);
      setActiveTab('concept');
      return;
    }

    if (activeTopicQuiz) {
      setShowQuiz(true);
    }
  };

  const goToPreviousTopic = () => {
    if (previousTopic) {
      setActiveTopicId(previousTopic._id);
      setShowQuiz(false);
      setActiveTab('concept');
    }
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const output = executePythonMock(pythonCode);
      setConsoleOutput(output);
      setIsExecuting(false);
      
      // Auto-tick "Coding Challenge" or similar milestone if they run code!
      const challengeIdx = activePblTasks.findIndex(t => t.title.toLowerCase().includes('challenge') || t.title.toLowerCase().includes('task'));
      if (challengeIdx !== -1 && !completedMilestones[challengeIdx]) {
        toggleMilestone(challengeIdx);
      }
    }, 600);
  };

  // E-Commerce Data calculations for dynamic dashboard
  const filteredDataset = useMemo(() => {
    if (selectedRegion === 'All') return MOCK_DATASET;
    return MOCK_DATASET.filter(row => row.Region === selectedRegion);
  }, [selectedRegion]);

  const dashboardStats = useMemo(() => {
    const totalRev = filteredDataset.reduce((sum, r) => sum + r.Purchase_Amount, 0);
    const totalProfit = filteredDataset.reduce((sum, r) => sum + r.Profit, 0);
    const avgOrder = filteredDataset.length ? totalRev / filteredDataset.length : 0;
    const margin = totalRev ? (totalProfit / totalRev) * 100 : 0;
    const vipCount = filteredDataset.filter(r => r.VIP_Status === 'VIP').length;

    return {
      revenue: totalRev,
      profit: totalProfit,
      avgOrder,
      margin,
      vips: vipCount
    };
  }, [filteredDataset]);

  const categoryChartData = useMemo(() => {
    const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Office Supplies'];
    return categories.map(cat => {
      const catData = filteredDataset.filter(r => r.Category === cat);
      const rev = catData.reduce((sum, r) => sum + r.Purchase_Amount, 0);
      const profit = catData.reduce((sum, r) => sum + r.Profit, 0);
      return { name: cat, Revenue: parseFloat(rev.toFixed(2)), Profit: parseFloat(profit.toFixed(2)) };
    });
  }, [filteredDataset]);

  const trendChartData = useMemo(() => {
    const groups: Record<string, { date: string, Revenue: number }> = {};
    filteredDataset.forEach(r => {
      if (!groups[r.Order_Date]) {
        groups[r.Order_Date] = { date: r.Order_Date, Revenue: 0 };
      }
      groups[r.Order_Date].Revenue += r.Purchase_Amount;
    });
    return Object.values(groups)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(g => ({ date: g.date.substring(5), Revenue: parseFloat(g.Revenue.toFixed(2)) }));
  }, [filteredDataset]);

  // Dataset Table Pagination
  const rowsPerPage = 6;
  const paginatedRows = useMemo(() => {
    const start = datasetPage * rowsPerPage;
    return MOCK_DATASET.slice(start, start + rowsPerPage);
  }, [datasetPage]);

  const totalDatasetPages = Math.ceil(MOCK_DATASET.length / rowsPerPage);

  const handleDownloadDataset = () => {
    const headers = Object.keys(MOCK_DATASET[0]).join(',');
    const rows = MOCK_DATASET.map(obj => 
      Object.values(obj).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'ecommerce_sales.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeTopicPblCompletedCount = Object.values(completedMilestones).filter(Boolean).length;
  const activeTopicPblTotalCount = activePblTasks.length;
  const activeTopicPblPercentage = Math.min(100, Math.round((activeTopicPblCompletedCount / activeTopicPblTotalCount) * 100));

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-slate-400 font-medium">Loading premium learning workspace...</p>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-3xl bg-slate-900 border border-slate-800 p-8 text-center shadow-2xl">
          <h1 className="text-2xl font-black text-rose-500">Error loading lesson</h1>
          <p className="mt-3 text-slate-400 text-sm leading-relaxed">{error || 'Please connect to the database and retry.'}</p>
          <button onClick={() => window.location.reload()} className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-cyan-600 px-6 py-3 font-bold text-white transition-all hover:bg-cyan-500">
            <RotateCcw size={16} /> Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 font-medium">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute right-[5%] top-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      {/* TOP HEADER BRANDING */}
      <header className="relative z-10 border-b border-slate-900 bg-slate-950/60 backdrop-blur-md sticky top-0">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href={getLocalePath(locale, `/courses/${course?.slug || courseId}`)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/50 text-slate-400 transition-all hover:border-slate-700 hover:text-white"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">{course?.title || 'Data Analytics'}</span>
                <span className="h-1 w-1 rounded-full bg-slate-800" />
                <span className="text-xs text-slate-500 font-medium">{lesson.title}</span>
              </div>
              <h1 className="text-sm font-bold text-slate-100 truncate max-w-xs sm:max-w-md mt-0.5">{activeTopicTitle}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Layout Controls */}
            <div className="flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 p-1 rounded-xl">
              <button
                onClick={() => setIsLessonMapCollapsed(!isLessonMapCollapsed)}
                className={[
                  'h-8 px-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5',
                  isLessonMapCollapsed
                    ? 'text-slate-400 hover:text-white'
                    : 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                ].join(' ')}
                title={isLessonMapCollapsed ? 'Show Lesson Map' : 'Hide Lesson Map'}
              >
                <PanelLeftOpen size={12} className={isLessonMapCollapsed ? 'rotate-180 transition-all duration-300' : 'transition-all duration-300'} />
                <span className="hidden md:inline">{isLessonMapCollapsed ? 'Show Map' : 'Hide Map'}</span>
              </button>

              <button
                onClick={() => setIsMilestonesCollapsed(!isMilestonesCollapsed)}
                className={[
                  'h-8 px-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5',
                  isMilestonesCollapsed
                    ? 'text-slate-400 hover:text-white'
                    : 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                ].join(' ')}
                title={isMilestonesCollapsed ? 'Show Milestones list' : 'Hide Milestones list'}
              >
                <Layers3 size={12} className="transition-all duration-300" />
                <span className="hidden md:inline">{isMilestonesCollapsed ? 'Show Tasks' : 'Hide Tasks'}</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/40 px-4 py-2 text-xs font-semibold text-slate-300">
              <Sparkles size={14} className="text-cyan-400" />
              Project Workspace Mode
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-900/50 bg-emerald-950/20 px-4 py-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 size={14} className="text-emerald-400" />
              {progressPercentage}% Complete
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 py-6 grid gap-6 transition-all duration-300"
        style={{
          gridTemplateColumns: isLessonMapCollapsed ? '1fr' : '280px 1fr'
        }}
      >

        {/* LEFT PANEL: LESSON MAP / TOPIC TRACKER */}
        {!isLessonMapCollapsed && (
          <aside className="space-y-5">
          
          {/* Progress Card */}
          <div className="rounded-[1.75rem] border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-md shadow-lg shadow-black/20">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Lesson Progress</p>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-sm font-bold text-slate-300 truncate">{lesson.title}</p>
                <p className="mt-1 text-3xl font-black text-white">{progressPercentage}%</p>
              </div>
              <div className="rounded-2xl bg-cyan-950/40 border border-cyan-800/40 p-3 text-cyan-400">
                <Medal size={22} />
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{completedCount} of {topics.length} topics</span>
              <span>{allTopicsComplete ? 'Finished' : 'In Progress'}</span>
            </div>
          </div>

          {/* Map List */}
          <div className="rounded-[1.75rem] border border-slate-900 bg-slate-900/30 p-4 backdrop-blur-md shadow-lg shadow-black/20">
            <div className="flex items-center justify-between px-1 pb-3 border-b border-slate-900/80 mb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-cyan-400" />
                <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Lesson Map</h2>
              </div>
              <button
                onClick={() => setIsLessonMapCollapsed(true)}
                className="text-slate-500 hover:text-white transition-colors"
                title="Collapse Sidebar"
              >
                <ArrowLeft size={14} />
              </button>
            </div>
            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
              {topics.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-800 p-4 text-center text-xs text-slate-500">
                  No topics.
                </div>
              ) : (
                topics.map((topic, index) => {
                  const active = activeTopic?._id === topic._id;
                  const completed = completedTopicIds.includes(topic._id);
                  return (
                    <button
                      key={topic._id}
                      onClick={() => {
                        setActiveTopicId(topic._id);
                        setShowQuiz(false);
                      }}
                      className={[
                        'w-full rounded-2xl border p-3 text-left transition-all duration-200',
                        active
                          ? 'border-cyan-500/30 bg-cyan-950/20 shadow-md shadow-cyan-950/40 text-white'
                          : 'border-transparent bg-slate-900/20 text-slate-400 hover:border-slate-800/80 hover:bg-slate-900/40',
                      ].join(' ')}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={[
                            'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all',
                            completed
                              ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-400'
                              : active
                                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                                : 'bg-slate-800 text-slate-500',
                          ].join(' ')}
                        >
                          {completed ? <CheckCircle2 size={14} /> : index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-xs font-bold leading-tight truncate ${active ? 'text-white' : 'text-slate-300'}`}>{topic.title}</p>
                          <p className="mt-1 text-[10px] text-slate-500 font-medium">
                            {completed ? 'Complete' : active ? 'Active' : 'Unstarted'}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Quiz Card */}
          <div className="rounded-[1.75rem] border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-md shadow-lg shadow-black/20">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Concept Quiz</h2>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              {activeTopicQuiz ? activeTopicQuiz.title : 'Check your concept recall.'}
            </p>
            <button
              onClick={() => (activeTopicQuiz ? setShowQuiz(true) : null)}
              disabled={!activeTopicQuiz}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-950 px-4 py-3 text-xs font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            >
              <PlayCircle size={14} />
              Open Quiz
            </button>
          </div>

          {/* Topic Handouts */}
          <div className="rounded-[1.75rem] border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-md shadow-lg shadow-black/20 text-slate-300">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={16} className="text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Topic Handouts</h2>
            </div>
            {Array.isArray(activeTopic?.resources) && activeTopic.resources.length ? (
              <ul className="space-y-2 text-xs">
                {activeTopic.resources.map((link) => (
                  <li key={link.url} className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/40 p-2.5 border border-slate-900">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-cyan-400 hover:underline truncate max-w-[150px]"
                    >
                      {link.title || 'Handout Reference'}
                    </a>
                    <ExternalLink size={12} className="text-slate-500 shrink-0" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed font-medium">No references attached to this topic.</p>
            )}
          </div>

          {/* Course Notes */}
          <div className="rounded-[1.75rem] border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-md shadow-lg shadow-black/20 text-slate-300">
            <div className="flex items-center gap-2 mb-3">
              <BadgeInfo size={16} className="text-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">Course Notes</h2>
            </div>
            {Array.isArray(activeTopic?.notes) && activeTopic.notes.length ? (
              <ul className="space-y-2.5 text-xs leading-relaxed text-slate-400">
                {activeTopic.notes.map((note, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 leading-relaxed font-medium">No custom notes for this topic.</p>
            )}
          </div>

        </aside>
        )}

        {/* CENTER MAIN COLUMN: TABS WORKSPACE */}
        <main className="min-w-0 space-y-6">

          <div className="grid gap-6 lg:grid-cols-12">
            
            {/* LEFT WORKSPACE PANE: THE 6 PROJECT MILESTONES CHECKLIST */}
            {!isMilestonesCollapsed && (
              <div className="lg:col-span-4 space-y-4">
              
              {/* Project Progress Overview Card */}
              <div className="rounded-3xl border border-slate-900 bg-slate-900/30 p-5 backdrop-blur-md shadow-lg text-slate-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Trophy size={16} className="text-cyan-400" />
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Project Workspace</h2>
                  </div>
                  <button
                    onClick={() => setIsMilestonesCollapsed(true)}
                    className="text-slate-500 hover:text-white transition-colors"
                    title="Collapse Milestones"
                  >
                    <ArrowLeft size={14} />
                  </button>
                </div>
                <h3 className="text-sm font-extrabold text-white">Global E-Commerce Sales Analysis</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5">
                  Complete all 6 milestones for this topic to build your analytics portfolio.
                </p>
                <div className="mt-4 pt-3 border-t border-slate-900/60">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Milestones Completed</span>
                    <span className="font-bold text-white">{activeTopicPblCompletedCount}/6</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-800">
                    <div
                      className="h-1.5 rounded-full bg-cyan-500 transition-all duration-300"
                      style={{ width: `${activeTopicPblPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* The 6 Milestone Cards stacked vertically */}
              <div className="space-y-3">
                {activePblTasks.map((task, idx) => {
                  const completed = completedMilestones[idx];
                  const isActive = activeMilestoneIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleMilestoneCardClick(task.title, idx)}
                      className={[
                        'group rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer flex gap-3 relative overflow-hidden',
                        isActive 
                          ? 'border-cyan-500 bg-cyan-950/20 shadow-md shadow-cyan-500/5 ring-1 ring-cyan-500/30' 
                          : 'border-slate-900 bg-slate-900/10 hover:border-slate-800 hover:bg-slate-900/20',
                        completed ? 'border-emerald-500/20 bg-emerald-950/5' : ''
                      ].join(' ')}
                    >
                      <div className="flex flex-col items-center justify-between py-0.5 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMilestone(idx);
                          }}
                          className={[
                            'h-6 w-6 rounded-lg border flex items-center justify-center transition-all',
                            completed
                              ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'border-slate-700 bg-slate-950 text-transparent group-hover:border-slate-500'
                          ].join(' ')}
                        >
                          <CheckCircle2 size={13} />
                        </button>
                        <span className="text-xl mt-2.5 select-none">{task.emoji}</span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className={[
                            'text-[10px] font-extrabold tracking-wider transition-all uppercase',
                            completed ? 'text-emerald-400' : 'text-slate-200'
                          ].join(' ')}>
                            {task.title}
                          </h4>
                          {isActive && (
                            <span className="text-[8px] font-black uppercase bg-cyan-500 text-slate-950 px-1.5 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed font-medium">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
            )}

            {/* RIGHT WORKSPACE PANE: ACTIVE INTERACTIVE WORKSPACE */}
            <div className={isMilestonesCollapsed ? "lg:col-span-12 space-y-6" : "lg:col-span-8 space-y-6"}>
              
              {/* TABS CONTAINER CARD */}
              <div className="overflow-hidden rounded-[2.2rem] border border-slate-900 bg-slate-900/20 backdrop-blur-md shadow-2xl shadow-black/40">
                
                {/* TABS NAVIGATION */}
                <div className="border-b border-slate-900 bg-slate-900/40 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                  <nav className="flex flex-wrap gap-1.5" aria-label="Tabs">
                    <button
                      onClick={() => { setActiveTab('concept'); setShowQuiz(false); }}
                      className={[
                        'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all',
                        activeTab === 'concept'
                          ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
                      ].join(' ')}
                    >
                      <BookOpen size={14} />
                      Concept Study
                    </button>
                    <button
                      onClick={() => { setActiveTab('playground'); setShowQuiz(false); }}
                      className={[
                        'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all',
                        activeTab === 'playground'
                          ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
                      ].join(' ')}
                    >
                      <Code size={14} />
                      Coding Playground
                    </button>
                    <button
                      onClick={() => { setActiveTab('dashboard'); setShowQuiz(false); }}
                      className={[
                        'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all',
                        activeTab === 'dashboard'
                          ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
                      ].join(' ')}
                    >
                      <LayoutDashboard size={14} />
                      Live Dashboard
                    </button>
                    <button
                      onClick={() => { setActiveTab('dataset'); setShowQuiz(false); }}
                      className={[
                        'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all',
                        activeTab === 'dataset'
                          ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
                      ].join(' ')}
                    >
                      <Database size={14} />
                      Dataset Center
                    </button>
                    <button
                      onClick={() => { setActiveTab('portfolio'); setShowQuiz(false); }}
                      className={[
                        'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all relative',
                        activeTab === 'portfolio'
                          ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/10'
                          : 'text-slate-400 hover:bg-slate-800/50 hover:text-white',
                      ].join(' ')}
                    >
                      <Trophy size={14} />
                      Portfolio Sync
                      {completedMilestones[5] && (
                        <span className="ml-1 rounded-full bg-emerald-500 px-1 py-0.5 text-[8px] font-black text-slate-950">
                          ✓ Done
                        </span>
                      )}
                    </button>
                  </nav>

                  <div className="flex items-center gap-2">
                    {previousTopic && (
                      <button
                        onClick={goToPreviousTopic}
                        className="inline-flex h-8 items-center gap-1 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/50 px-3 text-[11px] font-bold text-slate-400 hover:text-white transition-all"
                      >
                        <ArrowLeft size={12} />
                        Back
                      </button>
                    )}
                    <button
                      onClick={goToNextTopic}
                      className="inline-flex h-8 items-center gap-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 px-3.5 text-[11px] font-bold text-white transition-all shadow-md shadow-cyan-600/10"
                    >
                      Next
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

            {/* TAB CONTENTS */}
            <div className="p-6 md:p-8">

              {/* 1. CONCEPT STUDY TAB */}
              {activeTab === 'concept' && (
                <div className="space-y-6">
                  {showQuiz && activeTopicQuiz ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-900">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Practice Quiz</p>
                          <h2 className="text-xl font-bold text-white mt-1">{activeTopicQuiz.title}</h2>
                        </div>
                        <button
                          onClick={() => setShowQuiz(false)}
                          className="rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 px-3 py-1.5 text-xs font-bold transition-all hover:bg-slate-800"
                        >
                          Close Quiz
                        </button>
                      </div>
                      <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-5">
                        <QuizComponent
                          quizId={activeTopicQuiz._id}
                          title={activeTopicQuiz.title}
                          questions={(activeTopicQuiz.questions || []) as any}
                          passingMarks={activeTopicQuiz.passingMarks || 0}
                          onComplete={(_score, passed) => {
                            if (passed && activeTopic) {
                              markComplete(activeTopic._id);
                            }
                          }}
                          onExit={() => setShowQuiz(false)}
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Embedded Video */}
                      {hasTopicVideo && (
                        <div className="overflow-hidden rounded-2xl border border-slate-900 bg-black shadow-lg">
                          <iframe
                            src={embeddedVideoSrc}
                            title={`${activeTopicTitle} video`}
                            className="aspect-video w-full"
                            allowFullScreen
                          />
                        </div>
                      )}

                      {/* Main conceptual reading */}
                      <article className="prose prose-invert max-w-none text-slate-300">
                        <h2 className="text-2xl font-black text-white tracking-tight mb-4">{activeTopicTitle}</h2>
                        <div
                          className="lesson-rich-content text-slate-300 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: conceptHtml || '<p>Study content is loading...</p>' }}
                        />
                      </article>

                      {/* Summary callout */}
                      <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-5 mt-6 border-l-4 border-l-cyan-500">
                        <h4 className="text-xs font-black uppercase tracking-[0.15em] text-cyan-400 mb-1.5">Topic Summary</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">{topicSummary}</p>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* 2. CODING PLAYGROUND TAB */}
              {activeTab === 'playground' && (
                <div className="grid gap-6 lg:grid-cols-12 font-medium">
                  
                  {/* Left Column: Challenge context list & details */}
                  <div className="lg:col-span-5 space-y-4">
                    
                    {/* Task selector grid */}
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-3">Tasks in this Topic</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {activePblTasks.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveMilestoneIdx(idx)}
                            className={[
                              'text-left p-2.5 rounded-xl border text-[10px] transition-all flex items-center justify-between gap-1.5',
                              activeMilestoneIdx === idx
                                ? 'border-cyan-500/30 bg-cyan-950/20 text-white font-bold'
                                : 'border-slate-800 bg-slate-900/20 text-slate-400 hover:bg-slate-800/40'
                            ].join(' ')}
                          >
                            <span className="flex items-center gap-1.5 min-w-0">
                              <span className="shrink-0">{t.emoji}</span>
                              <span className="truncate">{t.title}</span>
                            </span>
                            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${completedMilestones[idx] ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active task details card */}
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-5 border-l-4 border-l-cyan-500">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold mb-2">
                        <span className="text-base select-none">{activePblTasks[activeMilestoneIdx]?.emoji}</span>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider">{activePblTasks[activeMilestoneIdx]?.title}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">
                        {activePblTasks[activeMilestoneIdx]?.description}
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-900/85 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">Mark task complete</span>
                        <button
                          onClick={() => toggleMilestone(activeMilestoneIdx)}
                          className={[
                            'px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all shadow-sm',
                            completedMilestones[activeMilestoneIdx]
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                              : 'bg-white text-slate-950 hover:bg-slate-100'
                          ].join(' ')}
                        >
                          {completedMilestones[activeMilestoneIdx] ? '✓ Complete' : 'Mark Done'}
                        </button>
                      </div>
                    </div>

                    {/* Console helper */}
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Workspace Helper</p>
                      <ul className="space-y-1 text-[11px] text-slate-400 leading-relaxed font-medium">
                        <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Use <code>print(...)</code> to log outputs.</li>
                        <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Load dataframe using <code>df.head()</code></li>
                        <li className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> Run statistics with <code>df.describe()</code></li>
                      </ul>
                      <div className="mt-3.5 pt-3 border-t border-slate-900 flex flex-wrap gap-1.5">
                        <button
                          onClick={() => setPythonCode(getTopicStarterCode(activeTopic?.title || '', lesson?.title || ''))}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-[10px] font-semibold text-slate-400 hover:text-white transition-all"
                        >
                          Reset Code
                        </button>
                        <button
                          onClick={() => setPythonCode(`import pandas as pd\ndf = pd.read_csv("ecommerce_sales.csv")\ndf.head()`)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-[10px] font-semibold text-slate-400 hover:text-white transition-all"
                        >
                          Load head()
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Code Editor & Console Output */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    
                    {/* Text editor box */}
                    <div className="relative rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden shadow-lg">
                      <div className="flex items-center justify-between border-b border-slate-900 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-full bg-rose-500" />
                          <span className="h-3 w-3 rounded-full bg-amber-500" />
                          <span className="h-3 w-3 rounded-full bg-emerald-500" />
                          <span className="ml-1 text-[10px] uppercase font-bold tracking-wider">analytics.py</span>
                        </div>
                        <span className="text-[10px] font-mono">Python 3.x Sandbox</span>
                      </div>

                      <div className="flex">
                        {/* Line numbers bar */}
                        <div className="bg-slate-900/20 px-2 py-4 text-right select-none border-r border-slate-900/50 text-[11px] font-mono text-slate-600 w-8">
                          {Array.from({ length: Math.max(10, pythonCode.split('\n').length) }).map((_, idx) => (
                            <div key={idx} className="h-5">{idx + 1}</div>
                          ))}
                        </div>
                        
                        <textarea
                          value={pythonCode}
                          onChange={(e) => setPythonCode(e.target.value)}
                          className="w-full bg-transparent px-3 py-4 text-xs font-mono text-slate-200 outline-none resize-none focus:ring-0 leading-5"
                          rows={11}
                          spellCheck={false}
                        />
                      </div>

                      <div className="border-t border-slate-900 bg-slate-900/30 px-4 py-3 flex items-center justify-between">
                        <p className="text-[10px] text-slate-500">Simulated client execution environment</p>
                        <button
                          onClick={handleRunCode}
                          disabled={isExecuting}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 text-xs font-bold transition-all shadow-md shadow-cyan-500/10 disabled:opacity-40"
                        >
                          {isExecuting ? (
                            <>
                              <span className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-slate-950" />
                              Running...
                            </>
                          ) : (
                            <>
                              <PlayCircle size={14} />
                              Run Code
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Console log box */}
                    <div className="rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden shadow-lg">
                      <div className="border-b border-slate-900 bg-slate-900/60 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Console Terminal Output
                      </div>
                      <pre className="h-[120px] overflow-auto px-4 py-3 text-xs font-mono text-cyan-400 bg-slate-950/80 leading-5 scrollbar-thin">
                        {consoleOutput}
                      </pre>
                    </div>

                  </div>
                </div>
              )}

              {/* 3. PROJECT MILESTONES TAB */}
              {activeTab === 'milestones' && (
                <div className="space-y-6 font-medium">
                  
                  {/* Topic completeness badge */}
                  {showConfetti && (
                    <div className="rounded-2xl border border-emerald-900 bg-emerald-950/30 p-5 flex items-start gap-4 animate-bounce border-l-4 border-l-emerald-500">
                      <div className="rounded-xl bg-emerald-900/50 p-2 text-emerald-400">
                        <Trophy size={24} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">🏆 Topic Milestones Completed!</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mt-1">Excellent progress! You have completed all six milestones for this topic. Commit these updates to your electromart repository.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pb-4 border-b border-slate-900">
                    <div>
                      <h2 className="text-lg font-bold text-white">Global E-Commerce Sales & Customer Retention Project</h2>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">Select a card to navigate to its workspace tab. Check the boxes to save progress.</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Project Progress</p>
                        <p className="text-sm font-extrabold text-cyan-400">{activeTopicPblPercentage}% Complete</p>
                      </div>
                      <div className="h-10 w-10 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center font-bold text-xs text-white">
                        {activeTopicPblCompletedCount}/6
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {activePblTasks.map((task, idx) => {
                      const completed = completedMilestones[idx];
                      const isActive = activeMilestoneIdx === idx;
                      return (
                        <div
                          key={idx}
                          onClick={() => handleMilestoneCardClick(task.title, idx)}
                          className={[
                            'group rounded-2xl border p-5 text-left transition-all duration-300 cursor-pointer flex gap-4',
                            isActive ? 'border-cyan-500/50 bg-cyan-950/10 shadow-lg' : '',
                            completed
                              ? 'border-emerald-500/20 bg-emerald-950/10 hover:bg-emerald-950/20'
                              : 'border-slate-900 bg-slate-900/20 hover:border-slate-800/80 hover:bg-slate-900/40'
                          ].join(' ')}
                        >
                          <div className="flex flex-col items-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // prevent card body switch tabs triggers
                                toggleMilestone(idx);
                              }}
                              className={[
                                'h-7 w-7 rounded-xl border flex items-center justify-center transition-all',
                                completed
                                  ? 'bg-emerald-500 border-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                                  : 'border-slate-700 bg-slate-950 text-transparent group-hover:border-slate-500'
                              ].join(' ')}
                            >
                              <CheckCircle2 size={15} />
                            </button>
                            <span className="text-2xl mt-3 select-none">{task.emoji}</span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className={[
                                'text-xs font-bold tracking-wide transition-all uppercase',
                                completed ? 'text-emerald-400' : 'text-slate-200'
                              ].join(' ')}>
                                {task.title}
                              </h4>
                              <span className="text-[9px] font-bold text-cyan-400/80 group-hover:underline">
                                Go to Workspace ➔
                              </span>
                            </div>
                            <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. LIVE DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  
                  {/* Dashboard filters row */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-4 border-b border-slate-900">
                    <div>
                      <h2 className="text-lg font-bold text-white">Live Project Dashboard</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Global E-Commerce Sales & Profit analytics dashboard metrics preview.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/60 border border-slate-800/80 p-1 rounded-xl">
                      {['All', 'North America', 'Europe', 'Asia-Pacific'].map((reg) => (
                        <button
                          key={reg}
                          onClick={() => setSelectedRegion(reg)}
                          className={[
                            'px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all',
                            selectedRegion === reg
                              ? 'bg-cyan-500 text-slate-950 shadow-md'
                              : 'text-slate-400 hover:text-white'
                          ].join(' ')}
                        >
                          {reg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dashboard KPI cards grid */}
                  <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Total Revenue</p>
                      <p className="text-xl font-black text-white mt-1.5">${dashboardStats.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p className="text-[9px] text-cyan-400 mt-1 font-semibold">Active Sales Volume</p>
                    </div>
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Average Ticket</p>
                      <p className="text-xl font-black text-white mt-1.5">${dashboardStats.avgOrder.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                      <p className="text-[9px] text-cyan-400 mt-1 font-semibold">Per order Average</p>
                    </div>
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Profit Margin</p>
                      <p className="text-xl font-black text-white mt-1.5">{dashboardStats.margin.toFixed(1)}%</p>
                      <p className="text-[9px] text-emerald-400 mt-1 font-semibold">Return percentage</p>
                    </div>
                    <div className="rounded-2xl border border-slate-900 bg-slate-900/20 p-4">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">VIP Buyers</p>
                      <p className="text-xl font-black text-white mt-1.5">{dashboardStats.vips}</p>
                      <p className="text-[9px] text-emerald-400 mt-1 font-semibold">Retention Loyalty Count</p>
                    </div>
                  </div>

                  {/* Recharts chart render area */}
                  {isMounted ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      
                      {/* Left: Bar Category Revenue/Profit */}
                      <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-5">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Revenue & Profit by Category</h4>
                        <div className="h-[220px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                              <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '11px' }} />
                              <Legend wrapperStyle={{ fontSize: '10px' }} />
                              <Bar dataKey="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Right: Line Trend chart */}
                      <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-5">
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Monthly Sales Trend Line</h4>
                        <div className="h-[220px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <XAxis dataKey="date" stroke="#64748b" fontSize={9} tickLine={false} />
                              <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '11px' }} />
                              <Line type="monotone" dataKey="Revenue" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 3 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                      <SkeletonCard className="h-[240px]" />
                      <SkeletonCard className="h-[240px]" />
                    </div>
                  )}

                  <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-4 flex items-center justify-between">
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                      * Interactive Preview: Filter categories or toggle regions to inspect calculations. Try writing <code>print(df.head())</code> in the Coding Playground to see the source grid details.
                    </p>
                  </div>
                </div>
              )}

              {/* 5. DATASET CENTER TAB */}
              {activeTab === 'dataset' && (
                <div className="space-y-6">
                  
                  {/* Dataset header */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-4 border-b border-slate-900">
                    <div>
                      <h2 className="text-lg font-bold text-white">ElectroMart E-Commerce Sales Dataset</h2>
                      <p className="text-xs text-slate-400 mt-0.5">Filename: <code>ecommerce_sales.csv</code> — containing 20 transactional rows.</p>
                    </div>
                    <button
                      onClick={handleDownloadDataset}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-950 px-4 py-2.5 text-xs font-bold transition-all shadow-md"
                    >
                      <Download size={14} />
                      Download CSV File
                    </button>
                  </div>

                  {/* Dataset schema columns list */}
                  <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">CSV Header Fields Schema</h4>
                    <div className="grid gap-2.5 grid-cols-2 md:grid-cols-4 text-xs">
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                        <span className="font-semibold text-cyan-400">Transaction_ID</span>
                        <span className="block text-[10px] text-slate-500 mt-1">Unique TXN identifier</span>
                      </div>
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                        <span className="font-semibold text-cyan-400">Purchase_Amount</span>
                        <span className="block text-[10px] text-slate-500 mt-1">Decimal order size ($)</span>
                      </div>
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                        <span className="font-semibold text-cyan-400">Profit</span>
                        <span className="block text-[10px] text-slate-500 mt-1">Net margins ($)</span>
                      </div>
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-900">
                        <span className="font-semibold text-cyan-400">Region</span>
                        <span className="block text-[10px] text-slate-500 mt-1">Customer continent location</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive CSV table grid */}
                  <div className="rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                      <table className="w-full divide-y divide-slate-900 text-left text-xs">
                        <thead className="bg-slate-900/60 font-semibold text-slate-400">
                          <tr>
                            <th className="px-4 py-3">TXN ID</th>
                            <th className="px-4 py-3">Customer</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Region</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                            <th className="px-4 py-3 text-right">Profit</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900 bg-slate-950/20 text-slate-300">
                          {paginatedRows.map((row) => (
                            <tr key={row.Transaction_ID} className="hover:bg-slate-900/30">
                              <td className="px-4 py-2.5 font-mono text-cyan-400">{row.Transaction_ID}</td>
                              <td className="px-4 py-2.5">{row.Customer_Name}</td>
                              <td className="px-4 py-2.5">{row.Category}</td>
                              <td className="px-4 py-2.5">{row.Region}</td>
                              <td className="px-4 py-2.5 text-right font-semibold text-white">${row.Purchase_Amount.toFixed(2)}</td>
                              <td className="px-4 py-2.5 text-right font-semibold text-emerald-400">${row.Profit.toFixed(2)}</td>
                              <td className="px-4 py-2.5">{row.Order_Date}</td>
                              <td className="px-4 py-2.5">
                                <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${
                                  row.VIP_Status === 'VIP' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/20' : 'bg-slate-900 text-slate-500'
                                }`}>
                                  {row.VIP_Status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table paginator controls */}
                    <div className="border-t border-slate-900 bg-slate-900/30 px-4 py-3 flex items-center justify-between text-xs text-slate-400">
                      <span>Showing page {datasetPage + 1} of {totalDatasetPages}</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setDatasetPage(p => Math.max(0, p - 1))}
                          disabled={datasetPage === 0}
                          className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setDatasetPage(p => Math.min(totalDatasetPages - 1, p + 1))}
                          disabled={datasetPage === totalDatasetPages - 1}
                          className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 5. PORTFOLIO SYNC TAB */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  
                  {/* Portfolio Header */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pb-4 border-b border-slate-900">
                    <div>
                      <h2 className="text-lg font-bold text-white">GitHub Portfolio Sync Workspace</h2>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">Commit and push your project code files to your git repository.</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Repository Linked: <span className="font-mono text-cyan-400">electromart-analytics</span>
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-12 font-medium">
                    
                    {/* Left Column: Repository File Inspector */}
                    <div className="lg:col-span-5 space-y-4">
                      
                      {/* Repo Status Card */}
                      <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-4">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-3">Repository Files Status</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between rounded-xl bg-slate-900/30 p-2.5 border border-slate-900/60 text-xs">
                            <span className="font-mono text-slate-300">analytics.py</span>
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">Staged</span>
                          </div>
                          <div className="flex items-center justify-between rounded-xl bg-slate-900/30 p-2.5 border border-slate-900/60 text-xs">
                            <span className="font-mono text-slate-300">ecommerce_sales.csv</span>
                            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/20">Staged</span>
                          </div>
                          <div className="flex items-center justify-between rounded-xl bg-slate-900/30 p-2.5 border border-slate-900/60 text-xs">
                            <span className="font-mono text-slate-300">README.md</span>
                            <span className="text-[9px] font-bold text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/20">Modified</span>
                          </div>
                        </div>
                      </div>

                      {/* Commit Message Box */}
                      <div className="rounded-2xl border border-slate-900 bg-slate-900/40 p-4">
                        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Commit Message</p>
                        <input
                          type="text"
                          value={commitMessage}
                          onChange={(e) => setCommitMessage(e.target.value)}
                          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-mono text-white outline-none focus:border-cyan-500 font-medium"
                        />
                        <p className="text-[9px] text-slate-500 mt-2">Required for documenting changes in git history.</p>
                      </div>

                    </div>

                    {/* Right Column: Interactive Git CLI Terminal */}
                    <div className="lg:col-span-7 space-y-4">
                      
                      <div className="relative rounded-2xl border border-slate-900 bg-slate-950 overflow-hidden shadow-lg flex flex-col h-[320px]">
                        
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between border-b border-slate-900 bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="h-3 w-3 rounded-full bg-rose-500" />
                            <span className="h-3 w-3 rounded-full bg-amber-500" />
                            <span className="h-3 w-3 rounded-full bg-emerald-500" />
                            <span className="ml-1 text-[10px] uppercase font-bold tracking-wider">git-terminal</span>
                          </div>
                          <span className="text-[10px] font-mono">Bash</span>
                        </div>

                        {/* Terminal Logs Content */}
                        <div className="flex-1 overflow-auto p-4 text-xs font-mono text-cyan-400 bg-slate-950/80 leading-5 scrollbar-thin">
                          {gitLogs.map((log, idx) => (
                            <div key={idx} className={log.startsWith('$') ? 'text-white' : log.includes('modified:') ? 'text-rose-400/90' : log.includes('synced') || log.includes('Successful') || log.includes('checked') ? 'text-emerald-400 font-bold' : 'text-slate-400 font-medium'}>
                              {log}
                            </div>
                          ))}
                        </div>

                        {/* Terminal Footer Action Bar */}
                        <div className="border-t border-slate-900 bg-slate-900/30 px-4 py-3 flex items-center justify-between">
                          <p className="text-[10px] text-slate-500 font-medium">
                            {portfolioSyncStage === 'idle' && 'Click Sync to commit and push changes'}
                            {portfolioSyncStage === 'syncing' && 'Pushing objects to GitHub...'}
                            {portfolioSyncStage === 'completed' && 'GitHub repository synced!'}
                          </p>
                          <button
                            onClick={async () => {
                              if (portfolioSyncStage !== 'idle') return;
                              setPortfolioSyncStage('syncing');
                              
                              // Start logs progression
                              setGitLogs(prev => [...prev, '', `$ git add README.md`, `$ git commit -m "${commitMessage || 'feat: complete data analysis milestone'}"`]);
                              
                              await new Promise(r => setTimeout(r, 600));
                              setGitLogs(prev => [
                                ...prev,
                                `[main ${Math.random().toString(16).substring(2, 9)}] feat: complete data analysis milestone`,
                                ` 1 file changed, 8 insertions(+), 2 deletions(-)`,
                                ``,
                                `$ git push origin main`
                              ]);
                              
                              await new Promise(r => setTimeout(r, 800));
                              setGitLogs(prev => [
                                ...prev,
                                `Enumerating objects: 5, done.`,
                                `Counting objects: 100% (5/5), done.`,
                                `Delta compression using up to 8 threads`,
                                `Compressing objects: 100% (3/3), done.`,
                                `Writing objects: 100% (3/3), 342 bytes | 342.00 KiB/s, done.`,
                                `Total 3 (delta 2), reused 0 (delta 0), pack-reused 0`,
                                `To github.com:electromart-analytics/portfolio.git`,
                                `   a3f7c9e..${Math.random().toString(16).substring(2, 9)}  main -> main`,
                                ``,
                                `🎉 Git Sync Successful: Changes committed and pushed to GitHub main branch!`,
                                `🎉 Portfolio milestone task checked off!`
                              ]);
                              
                              setPortfolioSyncStage('completed');
                              
                              // Auto complete the Portfolio milestone (index 5)
                              if (!completedMilestones[5]) {
                                toggleMilestone(5);
                              }
                            }}
                            disabled={portfolioSyncStage !== 'idle'}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 text-xs font-bold transition-all shadow-md shadow-cyan-500/10 disabled:opacity-40"
                          >
                            {portfolioSyncStage === 'syncing' ? (
                              <>
                                <Loader2 className="animate-spin h-3.5 w-3.5" />
                                Syncing...
                              </>
                            ) : portfolioSyncStage === 'completed' ? (
                              <>
                                ✓ Synced
                              </>
                            ) : (
                              <>
                                <RotateCcw size={13} />
                                Sync & Push Portfolio
                              </>
                            )}
                          </button>
                        </div>
                        
                      </div>

                    </div>

                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>

  </div>

      {/* RICH TEXT FORMATTING STYLING FOR CONTENT */}
      <style jsx global>{`
        .lesson-rich-content {
          color: #cbd5e1;
          font-size: 14.5px;
          line-height: 1.85;
        }
        .lesson-rich-content h2, 
        .lesson-rich-content h3 {
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 800;
          color: #ffffff;
        }
        .lesson-rich-content h2 { font-size: 1.35rem; }
        .lesson-rich-content h3 { font-size: 1.15rem; }
        .lesson-rich-content p {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          color: #94a3b8;
        }
        .lesson-rich-content blockquote {
          margin: 1rem 0;
          border-left: 3px solid #06b6d4;
          background: rgba(6, 182, 212, 0.05);
          padding: 0.8rem 1rem;
          border-radius: 8px;
          color: #e2e8f0;
          font-weight: 500;
        }
        .lesson-rich-content pre {
          margin: 1rem 0;
          border-radius: 12px;
          background: #020617;
          color: #e2e8f0;
          padding: 0.8rem 1rem;
          overflow-x: auto;
          border: 1px solid #1e293b;
        }
        .lesson-rich-content code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.9em;
        }
        .lesson-rich-content ul {
          list-style-type: disc;
          padding-left: 1.25rem;
          margin: 0.8rem 0;
        }
        .lesson-rich-content li {
          margin: 0.3rem 0;
          color: #94a3b8;
        }
        .lesson-rich-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 12px;
        }
        .lesson-rich-content th,
        .lesson-rich-content td {
          border: 1px solid #1e293b;
          padding: 8px 10px;
          text-align: left;
        }
        .lesson-rich-content th {
          background-color: #0f172a;
          color: #ffffff;
        }
        .lesson-rich-content a {
          color: #06b6d4;
          text-decoration: underline;
          font-weight: 600;
        }
      `}</style>

    </div>
  );
}
