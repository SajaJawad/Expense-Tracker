import React from 'react';
import logoIcon from '../assets/logo-icon.jpg';
import { useLanguage } from '../context/LanguageContext';

const BrandLogo = ({ size = "normal", showBadge = true, forceWhiteText = false }) => {
  const isSmall = size === "small";
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer select-none">
      {/* 3D Glossy FinTech Logo Emblem Container */}
      <div className={`relative ${isSmall ? 'w-8 h-8 sm:w-9 sm:h-9' : 'w-9 h-9 sm:w-10 sm:h-10'} rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300 shrink-0`}>
        <div className="w-full h-full bg-slate-950 rounded-full overflow-hidden flex items-center justify-center relative">
          <img 
            src={logoIcon} 
            alt="Expense Tracker Logo" 
            className="w-full h-full object-cover rounded-full transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-extrabold tracking-tight ${forceWhiteText ? 'text-white' : 'text-slate-900 dark:text-white'} whitespace-nowrap ${isSmall ? 'text-sm sm:text-base' : 'text-sm sm:text-lg md:text-xl'}`}>
            {t('brandName')}{' '}
            <span className="text-purple-400 dark:text-purple-400">{t('brandTracker')}</span>
          </span>
          
          {showBadge && (
            <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xs tracking-wider uppercase">
              {t('proBadge')}
            </span>
          )}
        </div>
        {!isSmall && (
          <span className={`hidden sm:block text-[10px] font-semibold ${forceWhiteText ? 'text-purple-200/80' : 'text-slate-400 dark:text-slate-400'} tracking-wider uppercase -mt-0.5`}>
            {t('brandSubtitle')}
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
