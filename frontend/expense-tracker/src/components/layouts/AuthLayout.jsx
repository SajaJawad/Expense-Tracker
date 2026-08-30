import React from 'react';
import { LuShieldCheck } from 'react-icons/lu';
import ThemeToggle from '../ThemeToggle';
import BrandLogo from '../BrandLogo';
import FinTechLoginIllustration from '../illustrations/FinTechLoginIllustration';
import FinTechSignupIllustration from '../illustrations/FinTechSignupIllustration';

const AuthLayout = ({ 
  children, 
  title = "Welcome to Expense Tracker", 
  subtitle = "Manage your wealth with real-time clarity.",
  isSignUp = false
}) => {
  return (
    <div className='min-h-screen flex w-full bg-slate-50 dark:bg-slate-950 transition-colors duration-200'>
      
      {/* Left side: 55% FinTech Visual Hero Panel (Desktop) */}
      <div className='hidden lg:flex lg:w-[55%] relative bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 text-white p-12 flex-col justify-between overflow-hidden shadow-2xl'>
        
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

        {/* Branding Logo */}
        <div className="relative z-10 flex items-center">
          <BrandLogo size="normal" showBadge={true} />
        </div>

        {/* Centered Illustration Showcase */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-6 text-center">
          {isSignUp ? <FinTechSignupIllustration /> : <FinTechLoginIllustration />}

          <div className="max-w-md space-y-2">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              {isSignUp ? "Start building better financial habits." : "Take control of your financial future."}
            </h2>
            <p className="text-sm text-purple-200/80 leading-relaxed">
              Track your spending, grow your savings, and understand where your money goes with real-time financial clarity.
            </p>
          </div>
        </div>

        {/* Footer Security Badge */}
        <div className="relative z-10 flex items-center justify-between text-xs text-purple-300/70 border-t border-white/10 pt-6">
          <div className="flex items-center gap-2">
            <LuShieldCheck className="text-emerald-400 text-base" />
            <span>Bank-Grade Encryption & Privacy First</span>
          </div>
          <span>© 2026 Expense Tracker Inc.</span>
        </div>
      </div>

      {/* Right side: 45% Form Panel */}
      <div className='w-full lg:w-[45%] flex flex-col justify-between p-6 sm:p-12 relative'>
        
        {/* Header Theme Toggle & Mobile Logo */}
        <div className="flex items-center justify-between w-full mb-8">
          <div className="flex lg:hidden items-center gap-2.5">
            <BrandLogo size="small" showBadge={false} />
          </div>

          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        {/* Centered Form Area */}
        <div className="w-full max-w-md mx-auto my-auto py-6">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden text-center text-xs text-slate-400 dark:text-slate-600 mt-8">
          Protected by Bank-Grade JWT Encryption
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;