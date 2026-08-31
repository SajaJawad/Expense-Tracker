import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const DeleteAlert = ({ content, onDelete }) => {
    const { t } = useLanguage();
    return (
        <div>
            <p className='text-sm text-slate-700 dark:text-slate-200'>{content}</p>

            <div className='flex justify-end mt-6'>
                <button type='button' className='add-btn add-btn-fill bg-rose-600 hover:bg-rose-700' onClick={onDelete}>{t('delete')}</button>
            </div>

        </div>
    );
};

export default DeleteAlert