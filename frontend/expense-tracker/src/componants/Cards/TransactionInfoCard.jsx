import React from 'react'
import { LuTrash, LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from "react-icons/lu";



const TransactionInfoCard = ({ tittle, icon, date, amount, types, hideDeleteBtn , onDelete }) => {

const getAmountStyles=()=>  types === "income" ? "bg-green-50 text-green-500 " : "bg-red-50 text-red-500"


  return (
    <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60'>
      <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
        {icon ? (
          <img src={icon} alt={tittle} className='w-6 h-6' />
        ) : (
          <LuUtensils />
        )}
      </div>

      <div className='flex-1 flex items-center justify-between'>
        <div>
          <p className='text-sm text-gray-700 font-medium'>{tittle}</p>
          <p className='text-xs text-gray-400 mt-1'>{date}</p>
        </div>

        <div className='flex items-center gap-2'>
          {!hideDeleteBtn && (
            <button className='text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer'
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
            <h6 className='text-xs font-medium'>
              {types === "income" ?"+" : "-"} ${amount}
            </h6>
            {types=== "income" ? <LuTrendingUp/> : <LuTrendingDown/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionInfoCard