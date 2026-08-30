import React from 'react';
import { LuPlus, LuSearch, LuWallet, LuReceipt, LuPiggyBank, LuTrendingUp } from 'react-icons/lu';

const EmptyState = ({ type = "generic", title, description, onAction, actionText }) => {
  const getIllustration = () => {
    switch (type) {
      case 'income':
        return (
          <div className="relative w-24 h-24 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 shadow-inner">
            <LuWallet className="text-4xl" />
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
              <LuTrendingUp className="text-sm" />
            </div>
          </div>
        );
      case 'expense':
        return (
          <div className="relative w-24 h-24 rounded-3xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50 shadow-inner">
            <LuReceipt className="text-4xl" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-bold shadow-md">
              <span className="text-xs">-$</span>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="relative w-24 h-24 rounded-3xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/50 shadow-inner">
            <LuSearch className="text-4xl" />
          </div>
        );
      case 'budget':
        return (
          <div className="relative w-24 h-24 rounded-3xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 shadow-inner">
            <LuPiggyBank className="text-4xl" />
          </div>
        );
      default:
        return (
          <div className="relative w-24 h-24 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-inner">
            <LuWallet className="text-4xl" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-white dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
      <div className="mb-4 transform hover:scale-105 transition-transform duration-300">
        {getIllustration()}
      </div>

      <h4 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
        {title || "No data available"}
      </h4>

      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-5 leading-relaxed">
        {description || "Start adding transactions to see your financial overview here."}
      </p>

      {onAction && actionText && (
        <button
          type="button"
          onClick={onAction}
          className="add-btn add-btn-fill flex items-center gap-2 cursor-pointer shadow-md shadow-purple-500/20"
        >
          <LuPlus className="text-base" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
