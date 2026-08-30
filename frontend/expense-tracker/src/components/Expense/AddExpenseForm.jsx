import React, { useState, useEffect } from 'react';
import EmojiPickerPopup from './../EmojiPickerPopup';
import Input from './../Inputs/Input';
import moment from 'moment';
import { EXPENSE_CATEGORIES } from '../../utils/categories';
import { CgSpinner } from 'react-icons/cg';

const AddExpenseForm = ({ onAddExpense, initialData }) => {
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
            category: catObj.label,
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
                <label className="block text-xs font-medium text-slate-600 mb-2">Quick Category Presets</label>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                    {EXPENSE_CATEGORIES.map((item, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handleSelectPreset(item)}
                            className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                                expense.category === item.label
                                    ? 'bg-purple-100 border-purple-300 text-purple-700 font-medium'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
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
                        label="Expense Category"
                        placeholder="Rent, Groceries, etc"
                        type="text"
                    />
                </div>
            </div>

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount ($)"
                placeholder="0.00"
                type="number"
            />
            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
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
                            <span>Processing...</span>
                        </>
                    ) : (
                        initialData ? "Update Expense" : "Add Expense"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;