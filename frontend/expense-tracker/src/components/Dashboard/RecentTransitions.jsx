import React from 'react'
import { IoMdDocument } from 'react-icons/io'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import { useLanguage } from '../../context/LanguageContext'

const RecentTransitions = ({ transitions, onSeeMore, onDelete, onEdit }) => {
    const { t } = useLanguage();
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>{t('recentTransactions')}</h5>
                <button className='card-btn' onClick={onSeeMore}>
                    {t('seeAll')} <LuArrowRight className="text-base ltr:inline rtl:hidden" /><LuArrowRight className="text-base rtl:inline ltr:hidden rotate-180" />
                </button>
            </div>

            <div className='mt-6'>
                {transitions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        tittle={item.type == 'expense' ? item.category : item.source}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount= {item.amount}
                        types={item.type}
                        onDelete={onDelete ? () => onDelete(item) : undefined}
                        onEdit={onEdit ? () => onEdit(item) : undefined}
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransitions