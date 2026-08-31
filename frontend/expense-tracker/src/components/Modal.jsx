import React, { useEffect } from 'react';

const Modal = ({ children, isOpen, onClose, title }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className='fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto bg-black/40 backdrop-blur-xs p-4'
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className='relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className='flex items-center justify-between p-4 md:p-5 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10'>
          <h3 id="modal-title" className='text-lg font-semibold text-gray-900 dark:text-white'>{title}</h3>

          <button 
            type='button' 
            className='text-gray-400 dark:text-slate-400 bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center transition-colors cursor-pointer' 
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg 
              className='w-3.5 h-3.5'
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className='p-4 md:p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-80px)]'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;