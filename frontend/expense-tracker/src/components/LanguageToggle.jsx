import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LuGlobe } from 'react-icons/lu';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 transition-all cursor-pointer select-none group shadow-2xs active:scale-95"
      title={language === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
      aria-label="Toggle language"
    >
      <LuGlobe className="text-base text-purple-600 dark:text-purple-400 group-hover:rotate-45 transition-transform duration-300" />
      <span className="text-xs font-extrabold uppercase tracking-wider">
        {language === 'ar' ? 'EN' : 'عربي'}
      </span>
    </button>
  );
};

export default LanguageToggle;
