import React, { useMemo } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { formatCurrency } from '../../utils/formatCurrency';
import { useLanguage } from '../../context/LanguageContext';
import { translateCategory } from '../../utils/translations';

const COLOR = ["#875CF5", "#10B981", "#F59E0B", "#EF4444", "#3B82F6", "#EC4899"];

const RecentIncomeWithChart = ({ data = [], totalIncome = 0 }) => {
    const { t, language } = useLanguage();
    const chartData = useMemo(() => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }

        // Group income by source
        const sourceMap = {};
        data.forEach((item) => {
            const src = item?.source || "Other";
            sourceMap[src] = (sourceMap[src] || 0) + Number(item?.amount || 0);
        });

        return Object.keys(sourceMap).map((key) => ({
            name: translateCategory(key, language),
            amount: sourceMap[key]
        }));
    }, [data, language]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between mb-2'>
                <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>{t('last60DaysIncome')}</h5>
            </div>

            {chartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400 dark:text-slate-500">
                    <p className="text-sm font-medium">{t('noIncomeLast60Days')}</p>
                </div>
            ) : (
                <CustomPieChart
                    data={chartData}
                    label={t('totalIncome')}
                    totalAmount={formatCurrency(totalIncome)}
                    showTextAnchor
                    colors={COLOR}
                />
            )}
        </div>
    );
};

export default RecentIncomeWithChart;