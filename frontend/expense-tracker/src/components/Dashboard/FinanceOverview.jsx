import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';
import { formatCurrency } from '../../utils/formatCurrency';

const COLORS = ["#875CF5", "#EF4444", "#10B981"];

const FinanceOverview = ({ totalBalance = 0, totalIncome = 0, totalExpense = 0 }) => {
    const balanceData = [
        { name: "Total Balance", amount: Math.max(0, totalBalance) },
        { name: "Total Expense", amount: totalExpense },
        { name: "Total Income", amount: totalIncome }
    ];

    return (
        <div className='card'>
            <div className='flex items-center justify-between mb-2'>
                <h5 className='text-base font-semibold text-slate-800'>Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={formatCurrency(totalBalance)}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;