import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../componants/layouts/DashboardLayout'
import IncomeOverview from '../../componants/Income/IncomeOverview'

const Income = () => {


  const [income, setIncome] = useState([])
  const [loading , setLoading]= useState(false)
  const [openDeleteAlert, setOpenDeleteAlert]= useState({
    show: false,
    data:null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal]= useState(false)




  return (

    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
      </div>

    </DashboardLayout>
  )
}

export default Income