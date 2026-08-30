import React, { useState } from 'react';
import { LuEye, LuEyeOff, LuDollarSign } from 'react-icons/lu';

const Input = ({ value, onChange, label, placeholder, type = "text", error, isCurrency }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const isAmountField = isCurrency || (type === "number" && label?.toLowerCase().includes("amount"));

  return (
    <div className="mb-4">
      {label && (
        <label className='block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5'>
          {label}
        </label>
      )}

      <div className={`input-box ${error ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20' : ''}`}>
        {isAmountField && (
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 shrink-0 mr-1">
            <LuDollarSign className="text-sm font-bold" />
          </div>
        )}

        <input 
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type} 
          placeholder={placeholder} 
          className='w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-medium' 
          value={value} 
          onChange={(e) => onChange(e)} 
        />

        {type === "password" && (
          <button
            type="button"
            className="text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors p-1"
            onClick={toggleShowPassword}
            tabIndex={-1}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <LuEye className='text-lg text-purple-600 dark:text-purple-400' />
            ) : (
              <LuEyeOff className='text-lg text-slate-400' />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-500 font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;