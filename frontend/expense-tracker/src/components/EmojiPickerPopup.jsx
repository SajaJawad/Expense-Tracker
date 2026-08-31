import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu';
import { useLanguage } from '../context/LanguageContext';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');

    const renderIconContent = () => {
        if (!icon) return <LuImage className="text-xl text-purple-600 dark:text-purple-400" />;
        if (typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:'))) {
            return <img src={icon} alt='icon' className='w-10 h-10 object-cover rounded-lg' />;
        }
        return <span className="text-2xl">{icon}</span>;
    };

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsOpen(true)}>
                <div className='w-12 h-12 flex items-center justify-center bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 rounded-lg border border-purple-100 dark:border-purple-800/60'>
                    {renderIconContent()}
                </div>
                <p className='text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors'>
                    {icon ? t('changeIcon') : t('pickIcon')}
                </p>
            </div>

            {isOpen && (
                <div className='relative z-20'>
                    <button 
                        type="button"
                        className='w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full absolute -top-2 -right-2 z-10 shadow-xs hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer' 
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX className="text-xs text-gray-600 dark:text-slate-300" />
                    </button>
                    <EmojiPicker 
                        open={isOpen}
                        theme={isDark ? "dark" : "light"}
                        onEmojiClick={(emojiData) => {
                            onSelect(emojiData?.emoji || emojiData?.imageUrl || "");
                            setIsOpen(false);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default EmojiPickerPopup;