import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';
import { useLanguage } from '../../context/LanguageContext';
import { translateCategory } from '../../utils/translations';
import CustomLegend from '../Charts/CustomLegend';

const COLORS = [
  '#875CF5', '#10B981', '#F59E0B', '#EF4444', 
  '#3B82F6', '#EC4899', '#8B5CF6', '#14B8A6',
  '#F97316', '#6366F1', '#84CC16', '#64748B'
];

const CategoryBreakdownChart = ({ data = [] }) => {
  const { t, language } = useLanguage();

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h5 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-4">{t('expenseBreakdown')}</h5>
        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 dark:text-slate-300">
          <p className="text-sm font-medium">{t('noExpensesRecorded')}</p>
        </div>
      </div>
    );
  }

  const chartData = data.map(item => ({
    name: translateCategory(item.category, language),
    value: item.amount
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-lg shadow-xl border border-slate-100 dark:border-slate-700 text-xs">
          <p className="font-bold text-slate-800 dark:text-slate-100">{payload[0].name}</p>
          <p className="text-purple-600 dark:text-purple-400 font-extrabold mt-0.5">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h5 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">{t('expenseBreakdown')}</h5>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="42%"
              innerRadius={45}
              outerRadius={75}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdownChart;
