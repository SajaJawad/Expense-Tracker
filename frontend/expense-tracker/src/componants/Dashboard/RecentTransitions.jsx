import React from 'react'
import { IoMdDocument } from 'react-icons/io'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransitions = ({ transitions, onSeeMore }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Recent Transactions</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>

            <div className='mt-6'>
                {transitions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        tittle={item.type == 'expense' ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MM YYY ")}
                        amount= {item.amount}
                        types={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransitions