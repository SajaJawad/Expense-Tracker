import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({ fullName, width, hight, style }) => {
    return (
        <div className={`${width || 'w-12'} ${hight || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-purple-700 dark:text-purple-300 font-bold bg-purple-100 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800/60`}>

            {getInitials(fullName || "")}
        </div>
    )
}

export default CharAvatar