import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data = [], label, totalAmount, colors = ["#875CF5", "#10B981", "#F59E0B"], showTextAnchor }) => {
    // Filter items with valid numeric amounts > 0
    const validData = Array.isArray(data) ? data.filter(item => item && Number(item.amount) > 0) : [];

    if (validData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
                <p className="text-xs font-medium">No data available for chart</p>
            </div>
        );
    }

    return (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={validData}
                        dataKey="amount"
                        nameKey="name"
                        cx="50%"
                        cy="53%"
                        outerRadius={85}
                        innerRadius={60}
                        paddingAngle={3}
                        labelLine={false}
                    >
                        {validData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend content={<CustomLegend />} />

                    {showTextAnchor && (
                        <>
                            <text
                                x="50%"
                                y="42%"
                                dy={-8}
                                textAnchor='middle'
                                className='fill-slate-500 dark:fill-slate-300'
                                fontSize="11px"
                                fontWeight="600"
                            >
                                {label}
                            </text>
                            <text
                                x="50%"
                                y="42%"
                                dy={14}
                                textAnchor='middle'
                                className='fill-slate-900 dark:fill-white'
                                fontSize="16px"
                                fontWeight="800"
                            >
                                {totalAmount}
                            </text>
                        </>
                    )}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;