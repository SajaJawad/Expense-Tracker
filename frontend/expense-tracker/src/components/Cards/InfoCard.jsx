import React from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { formatCurrency } from '../../utils/formatCurrency';

const InfoCard = ({ icon, label, rawValue = 0, value, containerBg = "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400", growth }) => {
  const numericVal = typeof rawValue === 'number' && !isNaN(rawValue) 
    ? rawValue 
    : parseFloat(String(value || "0").replace(/[^0-9.-]+/g, "")) || 0;

  const animatedValue = useCountUp(numericVal, 800);

  return (
    <div className="card group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {label}
          </span>
          
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {formatCurrency(animatedValue)}
          </h3>

          {growth !== undefined && (
            <div className="pt-1 flex items-center gap-1.5">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                growth >= 0 
                  ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60' 
                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200/60'
              }`}>
                {growth >= 0 ? `↑ +${growth}%` : `↓ ${growth}%`}
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">vs last month</span>
            </div>
          )}
        </div>

        {/* Soft Icon Badge Container */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${containerBg} shadow-xs group-hover:scale-110 transition-transform duration-300 shrink-0 border border-black/5 dark:border-white/10`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;