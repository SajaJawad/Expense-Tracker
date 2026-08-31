import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'
import { useLanguage } from '../../context/LanguageContext'

const RecentIncome = ({ transactions, onSeeMore, onDelete, onEdit }) => {
    const { t } = useLanguage();
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>{t('navIncome')}</h5>

                <button className='card-btn' onClick={onSeeMore}>
                    {t('seeAll')} <LuArrowRight className='text-base ltr:inline rtl:hidden' /><LuArrowRight className='text-base rtl:inline ltr:hidden rotate-180' />
                </button>
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