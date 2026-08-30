import React from 'react';

export const FinTechLoginIllustration = () => {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      {/* Subtle background ambient glowing aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-full blur-3xl" />

      {/* Main 3D Card Graphic */}
      <div className="relative z-10 w-80 sm:w-96 bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl space-y-6 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
        
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-purple-200/80">Main Portfolio</p>
              <h4 className="text-base font-bold text-white">Expense Tracker Pro</h4>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
            Active
          </span>
        </div>

        {/* Balance Display */}
        <div>
          <p className="text-xs text-purple-200/70 font-medium">Total Net Balance</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">$24,850.00</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
              ↑ 12.4%
            </span>
          </div>
        </div>

        {/* Mini Cashflow Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-purple-200">
            <span>Monthly Savings Target</span>
            <span className="font-bold text-white">72% Goal Met</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-400 to-emerald-400 h-full rounded-full w-[72%]" />
          </div>
        </div>

        {/* Floating Stat Badges */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
            <p className="text-[11px] text-purple-200/70">Income Status</p>
            <p className="text-sm font-bold text-emerald-400 mt-0.5">+$4,280.00</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl">
            <p className="text-[11px] text-purple-200/70">Expense Limit</p>
            <p className="text-sm font-bold text-purple-200 mt-0.5">$1,850.00 / mo</p>
          </div>
        </div>

      </div>

      {/* Floating Auxiliary Widget 1 */}
      <div className="absolute -top-4 -right-2 z-20 bg-slate-900/80 border border-white/20 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce-slow">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-slate-400">Savings Alert</p>
          <p className="text-xs font-bold text-white">+$500 Goal Reached</p>
        </div>
      </div>

      {/* Floating Auxiliary Widget 2 */}
      <div className="absolute -bottom-4 -left-2 z-20 bg-slate-900/80 border border-white/20 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <p className="text-[10px] text-slate-400">Security</p>
          <p className="text-xs font-bold text-white">256-Bit Encrypted</p>
        </div>
      </div>

    </div>
  );
};

export default FinTechLoginIllustration;
