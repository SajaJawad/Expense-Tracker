import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../../componants/Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions, onSeeMore, onDelete, onEdit }) => {


    return (
        <div className='card'>


            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expenses</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className='text-base' />
                </button>
            </div>


            <div className='mt-6'>
                {transactions?.slice(0, 4)?.map((expense) => (

                    <TransactionInfoCard
                        key={expense._id}
                        tittle={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        types="expense"
                        onDelete={onDelete ? () => onDelete({ ...expense, type: 'expense' }) : undefined}
                        onEdit={onEdit ? () => onEdit({ ...expense, type: 'expense' }) : undefined}
                    />
                )
                )}

            </div>
        </div>
    )
}

export default ExpenseTransactions