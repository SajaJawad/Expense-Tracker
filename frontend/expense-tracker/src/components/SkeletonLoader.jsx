import React from 'react';

export const CardSkeleton = () => (
  <div className="card animate-pulse space-y-3">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-2 flex-1">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3" />
      </div>
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="card animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
    <div className="h-56 bg-slate-200 dark:bg-slate-800 rounded-xl" />
  </div>
);

export const ListSkeleton = () => (
  <div className="card space-y-3">
    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4 mb-4" />
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
          <div className="space-y-1.5">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-md w-24" />
            <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-md w-16" />
          </div>
        </div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-md w-14" />
      </div>
    ))}
  </div>
);

export default { CardSkeleton, ChartSkeleton, ListSkeleton };
