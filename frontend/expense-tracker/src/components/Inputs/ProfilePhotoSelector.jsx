import React, { useRef, useState } from 'react';
import { LuUser, LuCamera, LuTrash2 } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex flex-col items-center justify-center mb-6'>
      <input 
        type='file' 
        accept="image/jpeg,image/png,image/webp" 
        ref={inputRef} 
        onChange={handleImageChange} 
        className='hidden' 
      />

      <div className="relative group cursor-pointer" onClick={!image ? onChooseFile : undefined}>
        {!image ? (
          <div className='w-22 h-22 flex items-center justify-center bg-purple-50 dark:bg-purple-950/50 border-2 border-dashed border-purple-300 dark:border-purple-800 rounded-full transition-all group-hover:border-purple-500'>
            <LuUser className='text-4xl text-purple-600 dark:text-purple-400' />
            <button
              type='button'
              className='w-7 h-7 flex items-center justify-center bg-purple-600 text-white rounded-full absolute bottom-0 right-0 shadow-md transition-transform group-hover:scale-110'
              onClick={onChooseFile}
              title="Upload profile photo"
            >
              <LuCamera className="text-xs" />
            </button>
          </div>
        ) : (
          <div className='relative w-22 h-22 rounded-full overflow-hidden border-2 border-purple-500 shadow-md'>
            <img
              src={previewUrl}
              alt='Profile Avatar'
              className='w-full h-full object-cover'
            />
            <div 
              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={onChooseFile}
            >
              <LuCamera className="text-white text-xl" />
            </div>
            <button
              type='button'
              className='w-7 h-7 flex items-center justify-center bg-rose-500 text-white rounded-full absolute bottom-0 right-0 shadow-md hover:bg-rose-600 transition-transform hover:scale-110 z-10'
              onClick={(e) => { e.stopPropagation(); handleRemoveImage(); }}
              title="Remove photo"
            >
              <LuTrash2 className="text-xs" />
            </button>
          </div>
        )}
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
        {image ? "Click image to change photo" : "Upload profile picture (optional)"}
      </p>
    </div>
  );
};

export default ProfilePhotoSelector;