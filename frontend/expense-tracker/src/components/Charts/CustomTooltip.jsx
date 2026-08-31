
import React from 'react'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white dark:bg-slate-800 shadow-xl rounded-xl p-2.5 border border-slate-200 dark:border-slate-700'>
                <p className='text-xs font-bold text-purple-700 dark:text-purple-300 mb-1'>{payload[0].name}</p>
                <p className='text-xs text-slate-600 dark:text-slate-300'>
                    Amount:{" "}
                    <span className='text-xs font-extrabold text-slate-900 dark:text-white'>${payload[0].value}</span>
                </p>
            </div>
        )
    }
    return null
}

export default CustomTooltip



















// import React from 'react'
// const CustomTooltip = ({active , payload}) => {

//     if (active && payload && payload.length ){
//         return (
//             <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
//                 <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].name}</p>
//                 <p className='text-sm text-gray-600'>
//                     Amount:{" "}
//                      <span className='text-sm font-medium text-gray-900'>${payload[0].value}</span>
//                 </p>
//             </div>
//         )
//     }

// }

// export default CustomTooltip