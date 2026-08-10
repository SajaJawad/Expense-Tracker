import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const RecentIncome = ({ transactions, onSeeMore, onDelete, onEdit }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income</h5>

                <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base' /></button>
            </div>

            <div className='mt-6'>
                {transactions?.slice(0,5)?.map((item)=>(
                   <TransactionInfoCard
                        key={item._id}
                        tittle={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount= {item.amount}
                        types="income"
                        onDelete={onDelete ? () => onDelete({ ...item, type: 'income' }) : undefined}
                        onEdit={onEdit ? () => onEdit({ ...item, type: 'income' }) : undefined}
                    />
                ))}
                
            </div>
        </div>
    )
}

export default RecentIncome