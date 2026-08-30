import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from './../Cards/TransactionInfoCard';
import EmptyState from '../EmptyState';
import moment from 'moment';

const IncomeList = ({ transactions = [], onDelete, onEdit, onDownload, onAddIncome }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>Income Sources</h5>
          <p className="text-xs text-slate-500 dark:text-slate-400">All registered income records</p>
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
          type="income"
          title="No income sources found"
          description="Add your first income transaction to start tracking your total earnings and financial growth."
          onAction={onAddIncome}
          actionText="Add Income Source"
        />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          {transactions.map((income) => (
            <TransactionInfoCard
              key={income._id || income.id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MMM YYYY")}
              amount={income.amount}
              types="income"
              onDelete={() => onDelete && onDelete(income._id || income.id)}
              onEdit={() => onEdit && onEdit(income)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomeList;