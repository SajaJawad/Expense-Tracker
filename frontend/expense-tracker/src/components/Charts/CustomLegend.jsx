import React from 'react';

const CustomLegend = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  return (
    <div className='flex flex-wrap justify-center items-center gap-x-5 gap-y-2 mt-4 px-2'>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className='flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/50 shadow-2xs'>
          <span className='w-3 h-3 rounded-md shrink-0 shadow-xs' style={{ backgroundColor: entry.color }} />
          <span className='text-xs text-slate-700 dark:text-slate-200 font-bold whitespace-nowrap'>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;