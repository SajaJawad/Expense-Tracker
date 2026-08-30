import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { formatCurrency } from '../../utils/formatCurrency';

const CustomLineChart = ({ data = [] }) => {
  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className='bg-white dark:bg-slate-800 shadow-xl rounded-xl p-3 border border-slate-100 dark:border-slate-700 text-xs'>
          <p className='font-bold text-slate-800 dark:text-slate-100 mb-1'>{item.category || item.month}</p>
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
        <p className="text-xs font-medium">No trend data available</p>
      </div>
    );
  }

  return (
    <div className='w-full h-72'>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id='incomeGradient' x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor='#875cf5' stopOpacity={0.4} />
              <stop offset="95%" stopColor='#875cf5' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748b" }} stroke="none" />
          <YAxis tick={{ fontSize: 11, fill: "#64748b" }} stroke="none" />
          <Tooltip content={<CustomToolTip />} />
          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke='#875cf5' 
            fill='url(#incomeGradient)' 
            strokeWidth={3} 
            dot={{ r: 4, fill: "#875cf5", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, fill: "#875cf5" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;