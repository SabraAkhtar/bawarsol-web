import React from 'react';
import logoImage from '../assets/images/bawarsol_logo_new.png';

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
    sm: { img: 'h-10' },
    md: { img: 'h-14' },
    lg: { img: 'h-20' },
    xl: { img: 'h-28' },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <img 
        src={logoImage} 
        alt="BawarSol Logo" 
        className={`${currentSize.img} w-auto object-contain drop-shadow-md`}
      />
      {showTagline && (
        <span className="font-semibold tracking-wider uppercase text-slate-400 text-[10px] mt-1">
          Engineering Intelligent Solutions
        </span>
      )}
    </div>
  );
};
