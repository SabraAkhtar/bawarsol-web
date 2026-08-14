import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: { icon: 'w-7 h-7', text: 'text-lg', tagline: 'text-[9px]' },
    md: { icon: 'w-9 h-9', text: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', tagline: 'text-[11px]' },
    xl: { icon: 'w-16 h-16', text: 'text-3xl', tagline: 'text-[12px]' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Geometric BawarSol Tech Logo Mark */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center rounded-xl bg-slate-900 border border-slate-700/60 p-1 shadow-lg shadow-sky-500/10 group overflow-hidden`}>
        {/* Glowing background aura */}
        <div className="absolute inset-0 bg-gradient-to-tr from-sky-600/30 via-indigo-600/20 to-emerald-500/20 opacity-80 group-hover:opacity-100 transition-opacity" />
        
        {/* Geometric 'B' Neural Node SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 text-[#00F0FF] group-hover:scale-105 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bawarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="50%" stopColor="#00A3FF" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Outer 'B' Structural Circuit Lines */}
          <path
            d="M 28,18 H 58 C 72,18 78,28 78,38 C 78,48 70,52 60,52 C 74,52 82,58 82,70 C 82,82 72,86 56,86 H 28 Z"
            stroke="url(#bawarGrad)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
          />
          {/* Inner Vertical Backbone */}
          <line x1="42" y1="28" x2="42" y2="76" stroke="url(#bawarGrad)" strokeWidth="6" strokeLinecap="round" />
          {/* Neural Interconnect Nodes */}
          <circle cx="28" cy="18" r="5" fill="#00F0FF" />
          <circle cx="58" cy="18" r="5" fill="#00F0FF" />
          <circle cx="78" cy="38" r="5" fill="#00A3FF" />
          <circle cx="60" cy="52" r="5" fill="#00F0FF" />
          <circle cx="82" cy="70" r="5" fill="#0066FF" />
          <circle cx="28" cy="86" r="5" fill="#0066FF" />
          <circle cx="56" cy="86" r="5" fill="#0066FF" />
          <circle cx="42" cy="52" r="4" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-tight">
        <div className={`font-extrabold tracking-tight ${currentSize.text} text-white flex items-center gap-1`}>
          <span>Bawar</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#00A3FF] to-[#38BDF8]">
            Sol
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#00F0FF] ml-0.5 animate-pulse shadow-[0_0_8px_#00F0FF]" />
        </div>

        {showTagline && (
          <span className={`font-semibold tracking-wider uppercase text-slate-400 ${currentSize.tagline}`}>
            Engineering Intelligent Solutions
          </span>
        )}
      </div>
    </div>
  );
};
