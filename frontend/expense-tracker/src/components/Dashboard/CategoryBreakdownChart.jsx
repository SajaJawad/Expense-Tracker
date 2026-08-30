import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

const COLORS = [
  '#875CF5', '#10B981', '#F59E0B', '#EF4444', 
  '#3B82F6', '#EC4899', '#8B5CF6', '#14B8A6',
  '#F97316', '#6366F1', '#84CC16', '#64748B'
];

const CategoryBreakdownChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h5 className="text-base font-semibold text-slate-800 mb-4">Expense Breakdown by Category</h5>
        <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
          <p className="text-sm font-medium">No expenses recorded yet.</p>
        </div>
      </div>
    );
  }

  const chartData = data.map(item => ({
    name: item.category,
    value: item.amount
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2.5 rounded-lg shadow-md border border-slate-100 text-xs">
          <p className="font-semibold text-slate-800">{payload[0].name}</p>
          <p className="text-purple-600 font-bold mt-0.5">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h5 className="text-base font-semibold text-slate-800 mb-2">Expense Breakdown by Category</h5>
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
            <Legend 
              formatter={(value) => <span className="text-xs text-slate-600 font-medium">{value}</span>}
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryBreakdownChart;
