import React, { useState, useEffect } from 'react';
import EmojiPickerPopup from './../EmojiPickerPopup';
import Input from './../Inputs/Input';
import moment from 'moment';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { CgSpinner } from 'react-icons/cg';
import { useLanguage } from '../../context/LanguageContext';
import { translateCategory } from '../../utils/translations';

const AddExpenseForm = ({ onAddExpense, initialData }) => {
    const { t, language } = useLanguage();
    const [expense, setExpense] = useState({
        category: "",
        amount: "",
        date: moment().format("YYYY-MM-DD"),
        icon: "🛍️",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (initialData) {
            setExpense({
                category: initialData.category || "",
                amount: initialData.amount || "",
                date: initialData.date ? moment(initialData.date).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD"),
                icon: initialData.icon || "🛍️",
            });
        }
    }, [initialData]);

    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });

    const handleSelectPreset = (catObj) => {
        setExpense({
            ...expense,
            category: translateCategory(catObj.label, language),
            icon: catObj.icon
        });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onAddExpense(expense);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            {/* Quick preset selector */}
            <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">{t('selectCategory')}</label>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                    {EXPENSE_CATEGORIES.map((item, i) => {
                        const itemTranslated = translateCategory(item.label, language);
                        const isSelected = expense.category === item.label || expense.category === itemTranslated;
                        return (
                            <button
                                key={i}
                                type="button"
                                onClick={() => handleSelectPreset(item)}
                                className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                    isSelected
                                        ? 'bg-purple-100 dark:bg-purple-950/80 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 font-semibold'
                                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{itemTranslated}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="mt-4">
                    <EmojiPickerPopup
                        icon={expense.icon}
                        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
                    />
                </div>
                <div className="flex-1">
                    <Input
                        value={expense.category}
                        onChange={({ target }) => handleChange("category", target.value)}
                        label={t('category')}
                        placeholder={t('selectCategory')}
                        type="text"
                    />
                </div>
            </div>

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label={t('amount')}
                placeholder="0.00"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label={t('date')}
                placeholder=""
                type="date"
            />

            <div className='flex justify-end mt-6'>
                <button
                    type='button'
                    disabled={isSubmitting}
                    className='add-btn add-btn-fill flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50'
                    onClick={handleSubmit}
                >
                    {isSubmitting ? (
                        <>
                            <CgSpinner className="animate-spin text-base" />
                            <span>{t('loading')}</span>
                        </>
                    ) : (
                        initialData ? t('editExpense') : t('recordExpense')
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;