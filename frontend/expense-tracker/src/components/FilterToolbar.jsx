import React, { useState } from 'react';
import { LuSearch, LuSlidersHorizontal, LuRotateCcw } from 'react-icons/lu';
import { useLanguage } from '../context/LanguageContext';

const FilterToolbar = ({ 
  categories = [], 
  categoryLabel = "Category",
  onFilterChange,
  onReset
}) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sort, setSort] = useState("newest");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleApply = (newSearch, newCategory, newFrom, newTo, newMin, newMax, newSort) => {
    onFilterChange({
      search: newSearch !== undefined ? newSearch : search,
      category: newCategory !== undefined ? newCategory : selectedCategory,
      from: newFrom !== undefined ? newFrom : fromDate,
      to: newTo !== undefined ? newTo : toDate,
      minAmount: newMin !== undefined ? newMin : minAmount,
      maxAmount: newMax !== undefined ? newMax : maxAmount,
      sort: newSort !== undefined ? newSort : sort
    });
  };

  const handleReset = () => {
    setSearch("");
    setSelectedCategory("");
    setFromDate("");
    setToDate("");
    setMinAmount("");
    setMaxAmount("");
    setSort("newest");
    if (onReset) onReset();
  };

  return (
    <div className='bg-white dark:bg-slate-900/90 p-4 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-800/80 mb-6 transition-colors'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        
        {/* Search input */}
        <div className='flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2 flex-1 min-w-[200px]'>
          <LuSearch className='text-slate-400 dark:text-slate-500 text-base shrink-0' />
          <input 
            type="text" 
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleApply(e.target.value);
            }}
            className='w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-medium'
          />
        </div>

        {/* Category dropdown */}
        {categories.length > 0 && (
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleApply(undefined, e.target.value);
            }}
            className='bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer'
          >
            <option value="" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{categoryLabel === 'Source' ? t('allSources') : t('allCategories')}</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat.label || cat} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">
                {cat.icon ? `${cat.icon} ` : ''}{cat.label || cat}
              </option>
            ))}
          </select>
        )}

        {/* Sort dropdown */}
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            handleApply(undefined, undefined, undefined, undefined, undefined, undefined, e.target.value);
          }}
          className='bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none cursor-pointer'
        >
          <option value="newest" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{t('sortNewest')}</option>
          <option value="oldest" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{t('sortOldest')}</option>
          <option value="highest" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{t('sortHighest')}</option>
          <option value="lowest" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100">{t('sortLowest')}</option>
        </select>

        {/* Advanced Filters Toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-xl border transition-colors cursor-pointer ${
            showAdvanced ? 'bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <LuSlidersHorizontal className='text-sm' /> {t('filtersToggle')}
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={handleReset}
          className='flex items-center gap-2 text-xs font-semibold px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer'
        >
          <LuRotateCcw className='text-sm' /> {t('resetFilters')}
        </button>
      </div>

      {/* Advanced Filter Panel */}
      {showAdvanced && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800'>
          <div>
            <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-300 mb-1'>{t('fromDate')}</label>
            <input 
              type="date" 
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); handleApply(undefined, undefined, e.target.value); }}
              className='w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none'
            />
          </div>
          <div>
            <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-300 mb-1'>{t('toDate')}</label>
            <input 
              type="date" 
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); handleApply(undefined, undefined, undefined, e.target.value); }}
              className='w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none'
            />
          </div>
          <div>
            <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-300 mb-1'>{t('minAmount')}</label>
            <input 
              type="number" 
              placeholder="0"
              value={minAmount}
              onChange={(e) => { setMinAmount(e.target.value); handleApply(undefined, undefined, undefined, undefined, e.target.value); }}
              className='w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none'
            />
          </div>
          <div>
            <label className='block text-[11px] font-semibold text-slate-500 dark:text-slate-300 mb-1'>{t('maxAmount')}</label>
            <input 
              type="number" 
              placeholder="Any"
              value={maxAmount}
              onChange={(e) => { setMaxAmount(e.target.value); handleApply(undefined, undefined, undefined, undefined, undefined, e.target.value); }}
              className='w-full bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 outline-none'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;
