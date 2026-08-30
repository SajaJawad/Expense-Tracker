import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from './../Cards/TransactionInfoCard';
import EmptyState from '../EmptyState';
import moment from 'moment';

const ExpenseList = ({ transactions = [], onDelete, onEdit, onDownload, onAddExpense }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>All Expenses</h5>
          <p className="text-xs text-slate-500 dark:text-slate-400">Detailed record of your spending</p>
        </div>

        {transactions.length > 0 && (
          <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base' />
            Download Excel
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          type="expense"
          title="No expenses recorded yet"
          description="Keep track of where your money goes by recording your daily or recurring expenses."
          onAction={onAddExpense}
          actionText="Add Expense"
        />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id || expense.id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              types="expense"
              onDelete={() => onDelete && onDelete(expense._id || expense.id)}
              onEdit={() => onEdit && onEdit(expense)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;