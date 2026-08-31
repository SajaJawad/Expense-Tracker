import React, { useState } from 'react';
import { LuTarget, LuPencil, LuCheck, LuX } from 'react-icons/lu';
import { formatCurrency } from '../../utils/formatCurrency';
import { useLanguage } from '../../context/LanguageContext';

const MonthlyBudgetCard = ({ budgetData = {}, onUpdateBudget }) => {
  const { amount = 0, spent = 0, remaining = 0, percentageUsed = 0, status = "none" } = budgetData;
  const { t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(amount || "");

  const handleSave = () => {
    const val = Number(newBudget);
    if (!isNaN(val) && val >= 0) {
      onUpdateBudget(val);
      setIsEditing(false);
    }
  };

  const getStatusBadge = () => {
    if (status === "over") {
      return { label: t('overBudget'), color: "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 border-red-200" };
    }
    if (status === "approaching") {
      return { label: t('approachingLimit'), color: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200" };
    }
    return { label: t('safe'), color: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200" };
  };

  const getProgressBarColor = () => {
    if (status === "over") return "bg-red-500";
    if (status === "approaching") return "bg-amber-500";
    return "bg-emerald-500";
  };

  const badge = getStatusBadge();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <LuTarget className="text-xl" />
          </div>
          <div>
            <h5 className="text-base font-bold text-slate-800 dark:text-white">{t('monthlyBudget')}</h5>
            <p className="text-xs text-slate-500 dark:text-slate-300">{t('trackMonthlyBudget')}</p>
          </div>
        </div>

        {amount > 0 && !isEditing && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
        )}
      </div>

      {amount === 0 && !isEditing ? (
        <div className="bg-purple-50/60 dark:bg-slate-800/60 border border-purple-100 dark:border-slate-700/60 rounded-xl p-4 text-center">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">{t('noBudgetDefined')}</p>
          <button
            type="button"
            onClick={() => { setNewBudget(""); setIsEditing(true); }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            {t('setMonthlyBudget')}
          </button>
        </div>
      ) : isEditing ? (
        <div className="bg-slate-50 dark:bg-slate-800 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700">
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">{t('enterTargetBudget')}</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="e.g. 2000"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-white outline-none"
            />
            <button
              onClick={handleSave}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
              title={t('save')}
            >
              <LuCheck className="text-base" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
              title={t('cancel')}
            >
              <LuX className="text-base" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-bold text-slate-800 dark:text-white">{formatCurrency(spent)}</span>
              <span className="text-xs text-slate-500 dark:text-slate-300 mx-1.5">{t('spentOf')} {formatCurrency(amount)}</span>
            </div>

            <button
              onClick={() => { setNewBudget(amount); setIsEditing(true); }}
              className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold cursor-pointer"
            >
              <LuPencil className="text-xs" /> {t('editBudget')}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-500 ${getProgressBarColor()}`}
              style={{ width: `${Math.min(100, percentageUsed)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-600 dark:text-slate-300">{percentageUsed}% {t('used')}</span>
            <span className={status === "over" ? "text-red-600 dark:text-red-400 font-bold" : "text-slate-600 dark:text-slate-300"}>
              {status === "over" ? `${t('overBy')} ${formatCurrency(spent - amount)}` : `${formatCurrency(remaining)} ${t('remaining')}`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyBudgetCard;
