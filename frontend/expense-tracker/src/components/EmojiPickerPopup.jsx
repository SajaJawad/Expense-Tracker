import React, { useState } from 'react';
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const renderIconContent = () => {
        if (!icon) return <LuImage className="text-xl" />;
        if (typeof icon === 'string' && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:'))) {
            return <img src={icon} alt='icon' className='w-10 h-10 object-cover rounded-lg' />;
        }
        return <span className="text-2xl">{icon}</span>;
    };

    return (
        <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
            <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsOpen(true)}>
                <div className='w-12 h-12 flex items-center justify-center bg-purple-50 text-purple-600 rounded-lg border border-purple-100'>
                    {renderIconContent()}
                </div>
                <p className='text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors'>
                    {icon ? "Change Icon" : "Pick Icon"}
                </p>
            </div>

            {isOpen && (
                <div className='relative z-20'>
                    <button 
                        type="button"
                        className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 shadow-xs hover:bg-gray-100 cursor-pointer' 
                        onClick={() => setIsOpen(false)}
                    >
                        <LuX className="text-xs text-gray-600" />
                    </button>
                    <EmojiPicker 
                        open={isOpen}
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