import React from 'react';
import { LuSparkles, LuCircleCheck } from 'react-icons/lu';

const FinancialInsightsCard = ({ insights = [] }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="card bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-none shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-300 backdrop-blur-xs">
          <LuSparkles className="text-lg" />
        </div>
        <h5 className="text-base font-semibold text-white">Financial Insights</h5>
      </div>

      <div className="space-y-2.5">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
            <LuCircleCheck className="text-emerald-400 text-base shrink-0 mt-0.5" />
            <p className="text-xs text-purple-100 font-medium leading-relaxed">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialInsightsCard;
