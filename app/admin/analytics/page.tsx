'use client';

import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  Filter,
  Download,
  BarChart3,
  CheckCircle2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Tooltip } from '@/components/ui/Tooltip';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  const stats = [
    { label: 'Total Revenue', tooltip: 'Total income from course sales and subscriptions.', value: '₹4,52,890', change: '+12.5%', trend: 'up', icon: <DollarSign className="text-emerald-600" />, color: 'bg-emerald-50' },
    { label: 'Total Students', tooltip: 'Unique users currently enrolled in at least one course.', value: '12,840', change: '+8.2%', trend: 'up', icon: <Users className="text-blue-600" />, color: 'bg-blue-50' },
    { label: 'Course Completions', tooltip: 'Total number of times a course has been fully finished.', value: '842', change: '-2.4%', trend: 'down', icon: <CheckCircle2 className="text-purple-600" />, color: 'bg-purple-50' },
    { label: 'Active Courses', tooltip: 'Courses currently published and available for enrollment.', value: '48', change: '+4', trend: 'up', icon: <BookOpen className="text-amber-600" />, color: 'bg-amber-50' },
  ];

  const topCourses = [
    { title: 'Full Stack Web Development', students: 1240, revenue: '₹1,24,000', rating: 4.8 },
    { title: 'Advanced React & Next.js', students: 950, revenue: '₹95,000', rating: 4.9 },
    { title: 'UI/UX Design Masterclass', students: 820, revenue: '₹82,000', rating: 4.7 },
    { title: 'Python for Data Science', students: 740, revenue: '₹74,000', rating: 4.6 },
  ];

  const recentEnrollments = [
    { name: 'Aditya Sharma', course: 'Full Stack Web Development', date: '2 mins ago', amount: '₹2,499' },
    { name: 'Priya Patel', course: 'Advanced React & Next.js', date: '15 mins ago', amount: '₹1,999' },
    { name: 'Rahul Verma', course: 'UI/UX Design Masterclass', date: '1 hour ago', amount: '₹1,499' },
    { name: 'Sneha Gupta', course: 'Python for Data Science', date: '3 hours ago', amount: '₹2,999' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-8 bg-zinc-50/30 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
            <BarChart3 className="text-indigo-600 w-8 h-8" />
            LMS Analytics & Reports
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium italic">Tracking your platform's growth and student engagement.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-zinc-200 rounded-xl p-1 shadow-sm">
             {['Last 7 Days', 'Last 30 Days', 'All Time'].map((range) => (
               <button 
                 key={range}
                 onClick={() => setTimeRange(range)}
                 className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                   timeRange === range ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900'
                 }`}
               >
                 {range}
               </button>
             ))}
          </div>
          <button className="p-2.5 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all shadow-sm text-zinc-600">
             <Download size={18} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">{stat.label}</p>
                <Tooltip content={stat.tooltip} />
              </div>
              <p className="text-2xl font-black text-zinc-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Revenue Growth Placeholder (Stylized CSS Chart) */}
        <div className="xl:col-span-2 bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-zinc-900 tracking-tight uppercase">Revenue Over Time</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-zinc-500">Sales</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-indigo-200" />
                    <span className="text-[10px] font-bold text-zinc-500">Previous</span>
                 </div>
              </div>
           </div>
           
           <div className="h-64 flex items-end gap-2 pt-4">
              {[40, 65, 45, 90, 60, 85, 70, 95, 55, 75, 50, 80].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                   <div 
                     className="bg-indigo-500 w-full rounded-t-lg transition-all group-hover:bg-indigo-600 group-hover:shadow-lg group-hover:shadow-indigo-500/30" 
                     style={{ height: `${h}%` }}
                   >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        ₹{h * 120}
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase tracking-tighter pt-4 border-t border-zinc-50">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m}>{m}</span>)}
           </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
           <h3 className="text-lg font-black text-zinc-900 tracking-tight uppercase">Top Courses</h3>
           <div className="space-y-6">
              {topCourses.map((course, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-zinc-800 group-hover:text-indigo-600 transition-colors">{course.title}</p>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{course.students} Students</p>
                   </div>
                   <div className="text-right">
                      <p className="text-sm font-black text-zinc-900">{course.revenue}</p>
                      <div className="flex items-center gap-1 justify-end">
                         <span className="text-[10px] font-bold text-amber-500">★</span>
                         <span className="text-[10px] font-bold text-zinc-500">{course.rating}</span>
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full py-3 bg-zinc-50 hover:bg-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-zinc-200/50">
              View All Courses
           </button>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="text-lg font-black text-zinc-900 tracking-tight uppercase">Recent Enrollments</h3>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            See activity feed <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Student</th>
                <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Course</th>
                <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {recentEnrollments.map((enrollment, i) => (
                <tr key={i} className="hover:bg-zinc-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs">
                        {enrollment.name.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-zinc-800">{enrollment.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm text-zinc-600 font-medium">{enrollment.course}</span>
                  </td>
                  <td className="px-8 py-5 text-zinc-400 text-xs font-bold flex items-center gap-1.5 mt-2">
                    <Clock size={12} />
                    {enrollment.date}
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-zinc-900">{enrollment.amount}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ExternalLink({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
