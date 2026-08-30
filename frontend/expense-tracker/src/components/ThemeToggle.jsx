import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { LuSun, LuMoon } from 'react-icons/lu';

const ThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer shadow-xs flex items-center justify-center ${className}`}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <LuSun className="text-lg text-amber-400 animate-spin-slow" />
      ) : (
        <LuMoon className="text-lg text-purple-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
