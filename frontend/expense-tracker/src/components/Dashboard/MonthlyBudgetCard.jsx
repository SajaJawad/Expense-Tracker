import React, { useState } from 'react';
import { LuTarget, LuPencil, LuCheck, LuX } from 'react-icons/lu';
import { formatCurrency } from '../../utils/formatCurrency';

const MonthlyBudgetCard = ({ budgetData = {}, onUpdateBudget }) => {
  const { amount = 0, spent = 0, remaining = 0, percentageUsed = 0, status = "none" } = budgetData;

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
      return { label: "Over Budget", color: "bg-red-100 text-red-700 border-red-200" };
    }
    if (status === "approaching") {
      return { label: "Approaching Limit", color: "bg-amber-100 text-amber-700 border-amber-200" };
    }
    return { label: "Safe", color: "bg-emerald-100 text-emerald-700 border-emerald-200" };
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
          <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <LuTarget className="text-xl" />
          </div>
          <div>
            <h5 className="text-base font-semibold text-slate-800">Monthly Budget</h5>
            <p className="text-xs text-slate-500">Track monthly spending limit</p>
          </div>
        </div>

        {amount > 0 && !isEditing && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
        )}
      </div>

      {amount === 0 && !isEditing ? (
        <div className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 text-center">
          <p className="text-sm font-medium text-slate-700 mb-2">No monthly budget defined yet.</p>
          <button
            type="button"
            onClick={() => { setNewBudget(""); setIsEditing(true); }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            Set Your Monthly Budget
          </button>
        </div>
      ) : isEditing ? (
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Enter Monthly Target Budget ($)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="e.g. 2000"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
              className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm outline-none"
            />
            <button
              onClick={handleSave}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 cursor-pointer"
              title="Save"
            >
              <LuCheck className="text-base" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 cursor-pointer"
              title="Cancel"
            >
              <LuX className="text-base" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <span className="text-2xl font-bold text-slate-800">{formatCurrency(spent)}</span>
              <span className="text-xs text-slate-500 ml-1.5">spent of {formatCurrency(amount)}</span>
            </div>

            <button
              onClick={() => { setNewBudget(amount); setIsEditing(true); }}
              className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium cursor-pointer"
            >
              <LuPencil className="text-xs" /> Edit Budget
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-3">
            <div
              className={`h-full transition-all duration-500 ${getProgressBarColor()}`}
              style={{ width: `${Math.min(100, percentageUsed)}%` }}
            />
          </div>

          <div className="flex justify-between text-xs font-medium">
            <span className="text-slate-600">{percentageUsed}% Used</span>
            <span className={status === "over" ? "text-red-600 font-bold" : "text-slate-600"}>
              {status === "over" ? `Over by ${formatCurrency(spent - amount)}` : `${formatCurrency(remaining)} remaining`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyBudgetCard;
