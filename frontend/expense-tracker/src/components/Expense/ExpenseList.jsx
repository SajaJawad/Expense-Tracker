import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from './../Cards/TransactionInfoCard';
import EmptyState from '../EmptyState';
import moment from 'moment';
import { useLanguage } from '../../context/LanguageContext';

const ExpenseList = ({ transactions = [], onDelete, onEdit, onDownload, onAddExpense }) => {
  const { t } = useLanguage();
  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>{t('allExpenses')}</h5>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('detailedSpendingRecord')}</p>
        </div>

        {transactions.length > 0 && (
          <button className='card-btn' onClick={onDownload}>
            <LuDownload className='text-base' />
            {t('downloadExcel')}
          </button>
        )}
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          type="expense"
          title={t('noExpensesYetTitle')}
          description={t('noExpensesYetDesc')}
          onAction={onAddExpense}
          actionText={t('recordExpense')}
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