import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarCharData } from '../../utils/helper'

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [charData, setCharData] = useState([])


  useEffect(() => {
    const result = prepareIncomeBarCharData(transactions)
    setCharData(result)
    return ()=>{}
  }, [transactions])


  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div className=''>
          <h5 className='text-lg font-bold text-slate-900 dark:text-white'>Income Overview</h5>
          <p className='text-xs text-slate-500 dark:text-slate-300 mt-0.5'>Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button className='add-btn' onClick={onAddIncome}>
          <LuPlus className='text-lg' />
          Add Income
        </button>
      </div>
      <div className='mt-10'>
        <CustomBarChart data={charData}/>
      </div>
    </div>
  )
}

export default IncomeOverview