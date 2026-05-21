'use client';

import React from 'react';

interface ModernCertificateProps {
  userName: string;
  courseTitle: string;
  issuedAt: string;
  description?: string;
  logoUrl?: string;
  signatureUrl?: string;
  certificateType?: 'Participation' | 'Completion';
}

export const ModernCertificate: React.FC<ModernCertificateProps> = ({
  userName = 'DAN WILLIAM',
  courseTitle = 'Participation',
  issuedAt = '26.10.22',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  signatureUrl,
  certificateType = 'Participation',
}) => {
  return (
    <div className="relative w-full aspect-[1.414/1] bg-[#f8f9fa] shadow-2xl overflow-hidden font-sans border border-zinc-200 rounded-xl select-none">
      {/* Vibrant Gradient Glow on Right Edge */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[140%] bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-teal-400/20 blur-[100px] z-0" />
      
      {/* Decorative Sparkles (Stars) */}
      <div className="absolute top-[25%] left-[15%] text-purple-500 opacity-60 animate-pulse">
        <SparkleIcon size={16} />
      </div>
      <div className="absolute top-[40%] right-[35%] text-purple-400 opacity-40">
        <SparkleIcon size={12} />
      </div>
      <div className="absolute bottom-[35%] left-[30%] text-purple-600 opacity-30 animate-pulse">
        <SparkleIcon size={20} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-between py-10 px-12 text-center text-zinc-900">
        
        {/* Header - Minimalist Logo Placeholder */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            CT
          </div>
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-zinc-400">Company Tech</p>
        </div>

        {/* Divider */}
        <div className="w-8 h-[1px] bg-zinc-300 mt-2" />

        {/* Main Title Section */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.1em] text-zinc-800 uppercase">
            CERTIFICATE
          </h1>
          <p className="text-[10px] md:text-xs font-bold text-zinc-500 tracking-[0.4em] uppercase">
            Of {certificateType}
          </p>
        </div>

        {/* Presentation Text */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl gap-4 py-4">
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            This certificate is proudly presented to
          </p>
          
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 tracking-tight leading-none uppercase">
            {userName}
          </h2>
          
          <div className="w-12 h-[2px] bg-indigo-500 rounded-full my-1" />
          
          <p className="text-[9px] md:text-[10px] text-zinc-500 leading-relaxed max-w-lg font-medium">
             {description}
          </p>
        </div>

        {/* Footer Section */}
        <div className="w-full flex flex-col items-center gap-8">
           <div className="w-full flex items-end justify-between px-10">
              {/* Left Signature */}
              <div className="flex flex-col items-center gap-2">
                 <div className="w-32 md:w-40 h-[1px] bg-zinc-300" />
                 <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Instructor Signature</p>
              </div>

              {/* Central Seal Icon */}
              <div className="pb-2 text-purple-600 opacity-80">
                 <SunburstIcon size={32} />
              </div>

              {/* Right Signature / Date */}
              <div className="flex flex-col items-center gap-2">
                 <div className="w-32 md:w-40 h-[1px] bg-zinc-300" />
                 <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Dated {issuedAt}</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

function SparkleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
  );
}

function SunburstIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" />
      {[...Array(12)].map((_, i) => (
        <line
          key={i}
          x1="12"
          y1="12"
          x2="12"
          y2="2"
          transform={`rotate(${i * 30} 12 12)`}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
