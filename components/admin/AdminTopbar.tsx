'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import { getLocaleFromPathname, getLocalePath, translateCommon } from '@/lib/i18n';

export default function AdminTopbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const t = (key: string) => translateCommon(locale, key);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings?group=general')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.logoUrl) {
          setLogoUrl(json.data.logoUrl);
        }
      })
      .catch(err => console.error('Failed to fetch logo', err));
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      window.location.href = '/admin/login';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 sticky top-0 z-50 w-full shadow-sm shadow-zinc-200/50">
      <div className="flex items-center gap-4">
        {logoUrl && (
          <div className="mr-4 pr-4 border-r border-zinc-200">
            <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
          </div>
        )}
        <div className="flex-1 max-w-md hidden md:flex items-center bg-zinc-100 rounded-lg px-3 py-2 border border-zinc-200">
          <Search className="w-4 h-4 text-zinc-400 mr-2" />
          <input 
            type="text" 
            placeholder={t('adminSearchPlaceholder')} 
            className="bg-transparent border-none text-sm w-full focus:outline-none text-zinc-700 placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <button className="relative p-2 text-zinc-500 hover:text-zinc-700 transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-6 border-l border-zinc-200 group transition-all"
          >
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-zinc-700 group-hover:text-indigo-600 transition-colors">{t('adminAdministrator')}</span>
              <span className="text-xs text-zinc-500 capitalize">{t('adminRole')}</span>
            </div>
            <div className="w-9 h-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200 group-hover:border-indigo-400 transition-all">
              A
            </div>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <>
              <div 
                className="fixed inset-0 z-0" 
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-xl py-2 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-indigo-600 transition-all">
                  <User size={16} />
                  <span>My Profile</span>
                </button>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    window.location.href = '/admin/settings';
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-indigo-600 transition-all"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="h-px bg-zinc-100 my-1 mx-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
