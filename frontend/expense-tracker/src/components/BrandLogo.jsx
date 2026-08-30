import React from 'react';
import logoIcon from '../assets/logo-icon.jpg';

const BrandLogo = ({ size = "normal", showBadge = true }) => {
  const isSmall = size === "small";
  
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* 3D Glossy FinTech Logo Emblem Container */}
      <div className={`relative ${isSmall ? 'w-9 h-9' : 'w-10 h-10'} rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-emerald-500 p-0.5 shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300`}>
        <div className="w-full h-full bg-slate-950 rounded-[14px] overflow-hidden flex items-center justify-center relative">
          <img 
            src={logoIcon} 
            alt="Expense Tracker Logo" 
            className="w-full h-full object-cover rounded-[14px] transform group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight text-slate-900 dark:text-white ${isSmall ? 'text-base' : 'text-lg sm:text-xl'}`}>
            Expense<span className="text-purple-600 dark:text-purple-400">Tracker</span>
          </span>
          
          {showBadge && (
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xs tracking-wider uppercase">
              PRO
            </span>
          )}
        </div>
        {!isSmall && (
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase -mt-0.5">
            Smart Cashflow Management
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
