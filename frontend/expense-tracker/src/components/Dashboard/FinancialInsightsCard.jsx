import React from 'react';
import { LuSparkles, LuCircleCheck } from 'react-icons/lu';
import { useLanguage } from '../../context/LanguageContext';
import { translateInsight } from '../../utils/translations';

const FinancialInsightsCard = ({ insights = [] }) => {
  const { t, language } = useLanguage();
  if (!insights || insights.length === 0) return null;

  return (
    <div className="card bg-gradient-to-br from-purple-900 to-indigo-900 text-white border-none shadow-lg">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-300 backdrop-blur-xs">
          <LuSparkles className="text-lg" />
        </div>
        <h5 className="text-base font-bold text-white">{t('financialInsights')}</h5>
      </div>

      <div className="space-y-2.5">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-2.5 bg-white/10 p-2.5 rounded-lg border border-white/15">
            <LuCircleCheck className="text-emerald-400 text-base shrink-0 mt-0.5" />
            <p className="text-xs text-white font-semibold leading-relaxed">{translateInsight(insight, language)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialInsightsCard;
