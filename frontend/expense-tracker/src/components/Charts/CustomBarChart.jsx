import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomBarChart = ({ data = [] }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#a78bfa";
  };

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className='bg-white dark:bg-slate-800 shadow-xl rounded-xl p-3 border border-slate-100 dark:border-slate-700 text-xs'>
          <p className='font-bold text-slate-800 dark:text-slate-100 mb-1'>
            {item.category || item.source || item.month}
          </p>
          <p className='text-purple-600 dark:text-purple-400 font-extrabold text-sm'>
            {formatCurrency(item.amount)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
        <p className="text-xs font-medium">No bar chart data available</p>
      </div>
    );
  }

  return (
    <div className='w-full h-72'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-slate-200 dark:stroke-slate-800" opacity={0.5} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "currentColor" }} className="text-slate-500 dark:text-slate-300" stroke="none" />
          <YAxis 
            tick={{ fontSize: 11, fill: "currentColor" }} 
            className="text-slate-500 dark:text-slate-300" 
            stroke="none" 
            width={48} 
            tickFormatter={(val) => val.toLocaleString()}
          />
          <Tooltip content={<CustomToolTip />} cursor={{ fill: 'rgba(135, 92, 245, 0.08)', rx: 8 }} />
          <Bar dataKey="amount" fill='#875cf5' radius={[8, 8, 0, 0]} maxBarSize={85}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
