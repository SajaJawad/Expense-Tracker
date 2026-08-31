import React, { useMemo } from 'react';
import { prepareExpenseBarCharData } from '../../utils/helper';
import CustomBarChart from './../../components/Charts/CustomBarChart';
import { useLanguage } from '../../context/LanguageContext';

const Last30DaysExpenses = ({ data }) => {
    const { t } = useLanguage();
    const charData = useMemo(() => {
        return prepareExpenseBarCharData(data || []);
    }, [data]);

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between mb-2'>
                <h5 className='text-base font-bold text-slate-800 dark:text-slate-100'>{t('last30DaysExpenses')}</h5>
            </div>

            <CustomBarChart data={charData} />
        </div>
    );
};

export default Last30DaysExpenses;