import React from 'react';
import { LuPencil, LuTrash2, LuTrendingDown, LuTrendingUp, LuWallet } from "react-icons/lu";
import { formatCurrency } from '../../utils/formatCurrency';

const TransactionInfoCard = ({ title, tittle, icon, date, amount, types, hideDeleteBtn, onDelete, onEdit }) => {
  const displayTitle = title || tittle || "Transaction";
  const getAmountStyles = () => types === "income" 
    ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60" 
    : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60";

  const renderIcon = () => {
    if (!icon) return <LuWallet className="text-slate-500 text-lg" />;
    if (typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:'))) {
      return <img src={icon} alt={displayTitle} className='w-6 h-6 object-cover rounded-full' />;
    }
    return <span className="text-xl">{icon}</span>;
  };

  return (
    <div className='group relative flex items-center gap-4 p-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all border border-slate-200/60 dark:border-slate-800/60 shadow-2xs hover:shadow-sm hover:translate-x-0.5'>
      <div className='w-11 h-11 flex items-center justify-center text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-2xl shrink-0 shadow-inner'>
        {renderIcon()}
      </div>

      <div className='flex-1 flex items-center justify-between min-w-0'>
        <div className='truncate pr-2'>
          <p className='text-xs font-bold text-slate-900 dark:text-slate-100 truncate'>{displayTitle}</p>
          <p className='text-[11px] text-slate-400 dark:text-slate-500 mt-0.5'>{date}</p>
        </div>

        <div className='flex items-center gap-2 shrink-0'>
          {onEdit && (
            <button 
              type="button"
              className='text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer p-1.5 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/50'
              onClick={onEdit}
              title="Edit transaction"
            >
              <LuPencil size={14} />
            </button>
          )}

          {!hideDeleteBtn && onDelete && (
            <button 
              type="button"
              className='text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 opacity-80 group-hover:opacity-100 transition-opacity cursor-pointer p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50'
              onClick={onDelete}
              title="Delete transaction"
            >
              <LuTrash2 size={14} />
            </button>
          )}

          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold ${getAmountStyles()}`}>
            <span>{types === "income" ? "+" : "-"} {formatCurrency(amount)}</span>
            {types === "income" ? <LuTrendingUp className="text-sm" /> : <LuTrendingDown className="text-sm" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;