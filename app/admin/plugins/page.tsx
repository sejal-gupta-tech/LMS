'use client';

import React, { useState } from 'react';
import { 
  Puzzle, 
  Settings2, 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  XCircle,
  ExternalLink,
  MoreVertical,
  Activity,
  Award,
  BookOpen,
  PieChart
} from 'lucide-react';
import toast from 'react-hot-toast';

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  status: 'active' | 'inactive';
  icon: React.ReactNode;
  category: string;
  updateAvailable?: boolean;
}

export default function PluginsPage() {
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: 'lms-core',
      name: 'LMS Core Engine',
      description: 'The primary logic for course management, student enrollments, and lesson tracking.',
      version: '2.4.5',
      author: 'Antigravity Devs',
      status: 'active',
      icon: <BookOpen className="text-blue-500" />,
      category: 'Core'
    },
    {
      id: 'cert-pro',
      name: 'Certificate Designer Pro',
      description: 'Advanced certificate generation with modern templates and custom signature support.',
      version: '1.2.0',
      author: 'Design Studio',
      status: 'active',
      icon: <Award className="text-purple-500" />,
      category: 'Extensions'
    },
    {
      id: 'analytics-dash',
      name: 'Advanced Analytics',
      description: 'Real-time tracking of student progress, course engagement, and revenue metrics.',
      version: '3.0.1',
      author: 'DataInsight',
      status: 'active',
      icon: <PieChart className="text-emerald-500" />,
      category: 'Reports',
      updateAvailable: true
    },
    {
      id: 'quiz-master',
      name: 'Quiz & Assessment Engine',
      description: 'Create complex quizzes with multiple question types, timers, and automated grading.',
      version: '2.1.0',
      author: 'EduTech',
      status: 'inactive',
      icon: <Activity className="text-amber-500" />,
      category: 'Extensions'
    }
  ]);

  const togglePluginStatus = (id: string) => {
    setPlugins(prev => prev.map(p => {
      if (p.id === id) {
        const newStatus = p.status === 'active' ? 'inactive' : 'active';
        toast.success(`${p.name} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
        return { ...p, status: newStatus };
      }
      return p;
    }));
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlugins = plugins.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 space-y-8 bg-zinc-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
            <Puzzle className="text-indigo-600" />
            LMS Plugins Management
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Enhance your LMS with additional modules and integrations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder="Search plugins..."
              className="pl-10 pr-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-64 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-white border border-zinc-200 hover:border-zinc-300 text-zinc-700 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Marketplace
          </button>
        </div>
      </div>

      {/* Stats Quick Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Installed</p>
            <p className="text-2xl font-black text-zinc-900">{plugins.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Active</p>
            <p className="text-2xl font-black text-zinc-900">{plugins.filter(p => p.status === 'active').length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <RefreshCw size={24} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Updates</p>
            <p className="text-2xl font-black text-zinc-900">{plugins.filter(p => p.updateAvailable).length}</p>
          </div>
        </div>
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredPlugins.map((plugin) => (
          <div 
            key={plugin.id} 
            className={`bg-white rounded-2xl border transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group flex flex-col ${
              plugin.status === 'active' ? 'border-zinc-200' : 'border-dashed border-zinc-300 opacity-80'
            }`}
          >
            <div className="p-6 flex items-start gap-4 flex-1">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform group-hover:scale-110 ${
                plugin.status === 'active' ? 'bg-zinc-50' : 'bg-zinc-100 grayscale'
              }`}>
                {plugin.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-zinc-900">{plugin.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-100 text-zinc-500 rounded-full font-bold">v{plugin.version}</span>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg hover:bg-zinc-50 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {plugin.description}
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    By <span className="text-zinc-600 font-medium">{plugin.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                    Category: <span className="text-zinc-600 font-medium">{plugin.category}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-zinc-50/50 border-t border-zinc-100 rounded-b-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => togglePluginStatus(plugin.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    plugin.status === 'active' ? 'bg-indigo-600' : 'bg-zinc-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      plugin.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  {plugin.status === 'active' ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {plugin.updateAvailable && (
                  <button className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg hover:bg-amber-100 transition-all border border-amber-200/50 animate-pulse">
                    <RefreshCw size={12} />
                    Update Available
                  </button>
                )}
                <button className="p-2 text-zinc-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Plugin Settings">
                  <Settings2 size={18} />
                </button>
                <button className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-all" title="Documentation">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPlugins.length === 0 && (
        <div className="bg-white border-2 border-dashed border-zinc-200 rounded-3xl p-12 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
            <Search size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900">No plugins found</h3>
            <p className="text-sm text-zinc-500">Try adjusting your search terms or browse the marketplace.</p>
          </div>
          <button className="mt-2 bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all">
            Browse Marketplace
          </button>
        </div>
      )}
    </div>
  );
}
