import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { formatCurrency } from '../../utils/formatCurrency';
import { useLanguage } from '../../context/LanguageContext';

const COLORS = ["#875CF5", "#EF4444", "#10B981"];

const FinanceOverview = ({ totalBalance = 0, totalIncome = 0, totalExpense = 0 }) => {
    const { t } = useLanguage();
    const balanceData = [
        { name: t('totalBalance'), amount: Math.max(0, totalBalance) },
        { name: t('totalExpense'), amount: totalExpense },
        { name: t('totalIncome'), amount: totalIncome }
    ];

    return (
        <div className='card'>
            <div className='flex items-center justify-between mb-2'>
                <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>{t('financialOverview')}</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label={t('totalBalance')}
                totalAmount={formatCurrency(totalBalance)}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;