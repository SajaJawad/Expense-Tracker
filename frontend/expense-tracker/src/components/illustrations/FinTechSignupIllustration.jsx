import React from 'react';

export const FinTechSignupIllustration = () => {
  return (
    <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
      {/* Subtle background ambient glowing aura */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-emerald-600/20 rounded-full blur-3xl" />

      {/* Main Financial Growth Journey Card */}
      <div className="relative z-10 w-80 sm:w-96 bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-medium text-purple-200/80">Financial Onboarding</p>
              <h4 className="text-base font-bold text-white">Start Building Wealth</h4>
            </div>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-400/20 text-purple-300 border border-purple-400/30">
            Step 1 of 1
          </span>
        </div>

        {/* Growth Curve Graphic */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-purple-200/80 font-medium">Estimated Annual Growth</span>
            <span className="text-emerald-400 font-bold">+24.5%</span>
          </div>

          <div className="h-16 flex items-end justify-between gap-2 pt-2">
            <div className="w-full bg-purple-500/30 rounded-t-lg h-[30%]" />
            <div className="w-full bg-purple-500/40 rounded-t-lg h-[45%]" />
            <div className="w-full bg-purple-500/60 rounded-t-lg h-[60%]" />
            <div className="w-full bg-indigo-500/80 rounded-t-lg h-[78%]" />
            <div className="w-full bg-emerald-400 rounded-t-lg h-[100%] shadow-lg shadow-emerald-400/30" />
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center gap-2.5 text-xs text-purple-100">
            <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</div>
            <span>Automated monthly budget limits & alerts</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-purple-100">
            <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</div>
            <span>Real-time income vs expense cashflow reports</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-purple-100">
            <div className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">✓</div>
            <span>Instant Excel report generation & export</span>
          </div>
        </div>

      </div>

      {/* Floating Badge */}
      <div className="absolute -bottom-3 -right-2 z-20 bg-slate-900/80 border border-white/20 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
          100%
        </div>
        <div>
          <p className="text-[10px] text-slate-400">Data Isolation</p>
          <p className="text-xs font-bold text-white">Private & Scoped</p>
        </div>
      </div>

    </div>
  );
};

export default FinTechSignupIllustration;
