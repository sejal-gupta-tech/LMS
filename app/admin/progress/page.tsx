'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  ArrowUpRight, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreHorizontal,
  ChevronRight,
  BookOpen,
  Mail,
  MoreVertical
} from 'lucide-react';
import toast from 'react-hot-toast';

interface StudentProgress {
  id: string;
  name: string;
  email: string;
  course: string;
  progress: number;
  lastActivity: string;
  status: 'active' | 'completed' | 'paused' | 'at-risk';
  avgQuizScore: number;
}

export default function ProgressPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<StudentProgress[]>([
    { id: '1', name: 'Aditya Sharma', email: 'aditya@example.com', course: 'Full Stack Web Development', progress: 75, lastActivity: '2 hours ago', status: 'active', avgQuizScore: 88 },
    { id: '2', name: 'Priya Patel', email: 'priya@example.com', course: 'Advanced React & Next.js', progress: 100, lastActivity: '1 day ago', status: 'completed', avgQuizScore: 94 },
    { id: '3', name: 'Rahul Verma', email: 'rahul@example.com', course: 'UI/UX Design Masterclass', progress: 30, lastActivity: '5 days ago', status: 'paused', avgQuizScore: 72 },
    { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', course: 'Python for Data Science', progress: 15, lastActivity: '1 hour ago', status: 'at-risk', avgQuizScore: 65 },
    { id: '5', name: 'Amit Kumar', email: 'amit@example.com', course: 'Full Stack Web Development', progress: 45, lastActivity: '10 mins ago', status: 'active', avgQuizScore: 82 },
    { id: '6', name: 'Neha Singh', email: 'neha@example.com', course: 'Advanced React & Next.js', progress: 92, lastActivity: '3 hours ago', status: 'active', avgQuizScore: 90 },
  ]);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'paused': return 'bg-zinc-100 text-zinc-600 border-zinc-200';
      case 'at-risk': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-zinc-50 text-zinc-500';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 bg-zinc-50/30 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-zinc-900 tracking-tight flex items-center gap-3">
            <TrendingUp className="text-indigo-600 w-8 h-8" />
            Student Progress Tracking
          </h1>
          <p className="text-sm text-zinc-500 mt-1 font-medium">Monitor individual student performance and course completion rates.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder="Search student or course..."
              className="pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-72 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all shadow-sm text-zinc-600">
             <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1">Total Active</p>
            <p className="text-2xl font-black text-zinc-900">1,284</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1">Completion Rate</p>
            <p className="text-2xl font-black text-zinc-900">68.2%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1">Avg. Study Time</p>
            <p className="text-2xl font-black text-zinc-900">4.5h <span className="text-xs text-zinc-400 font-bold tracking-normal">/wk</span></p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 animate-pulse">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-black uppercase tracking-widest mb-1">At Risk</p>
            <p className="text-2xl font-black text-zinc-900">42</p>
          </div>
        </div>
      </div>

      {/* Progress Table */}
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Student Information</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Enrolled Course</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Progress</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Performance</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-zinc-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center font-black text-zinc-500 text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors">{student.name}</p>
                        <p className="text-xs text-zinc-400 font-medium">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <BookOpen size={14} className="text-zinc-400" />
                       <span className="text-sm text-zinc-700 font-medium">{student.course}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 min-w-[180px]">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-tighter">
                          <span>Progress</span>
                          <span>{student.progress}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              student.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]'
                            }`}
                            style={{ width: `${student.progress}%` }}
                          />
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <div className="flex flex-col">
                        <span className={`text-sm font-black ${student.avgQuizScore > 85 ? 'text-emerald-600' : student.avgQuizScore < 70 ? 'text-red-600' : 'text-zinc-900'}`}>
                           {student.avgQuizScore}%
                        </span>
                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Avg. Quiz Score</span>
                     </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(student.status)}`}>
                        {student.status}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-zinc-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Send Email">
                          <Mail size={16} />
                       </button>
                       <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all">
                          <MoreVertical size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Placeholder */}
        <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-between">
           <p className="text-xs text-zinc-500 font-medium tracking-tight">Showing <span className="font-bold text-zinc-900">1 to {filteredStudents.length}</span> of 1,284 students</p>
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 disabled:opacity-50 transition-all" disabled>Previous</button>
              <button className="px-4 py-2 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-900 hover:border-zinc-300 transition-all shadow-sm">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
