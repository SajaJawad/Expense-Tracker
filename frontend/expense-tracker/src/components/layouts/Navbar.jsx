import React, { useState, useContext } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';
import ThemeToggle from '../ThemeToggle';
import LanguageToggle from '../LanguageToggle';
import { UserContext } from '../../context/userContext';
import { useLanguage } from '../../context/LanguageContext';
import CharAvatar from '../Inputs/CharAvatar';
import BrandLogo from '../BrandLogo';
import { getProfileImageUrl } from '../../utils/helper';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { user } = useContext(UserContext);
  const { t } = useLanguage();

  const activeAvatar = getProfileImageUrl(user?.profileImageUrl);

  return (
    <header className='sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl px-2.5 sm:px-8 py-2.5 sm:py-3 transition-colors duration-200 shadow-2xs'>
      <div className="flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button 
            type="button"
            className='lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0'
            onClick={() => setOpenSideMenu(!openSideMenu)}
            aria-label="Toggle menu"
          >
            {openSideMenu ? (
              <HiOutlineX className='text-xl sm:text-2xl'/>
            ) : (
              <HiOutlineMenu className='text-xl sm:text-2xl'/>
            )}
          </button>

          <BrandLogo size="normal" showBadge={true} />
        </div>

        {/* Right: Actions, Language Toggle, Theme Toggle & Profile Capsule */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          <LanguageToggle />
          <ThemeToggle />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 ltr:pl-1.5 ltr:sm:pl-3 ltr:border-l rtl:pr-1.5 rtl:sm:pr-3 rtl:border-r border-slate-200/80 dark:border-slate-800/80 shrink-0">
            <div className="relative group cursor-pointer shrink-0">
              {activeAvatar && !imgError ? (
                <img 
                  src={activeAvatar} 
                  alt={user?.fullName || 'Avatar'} 
                  onError={() => setImgError(true)}
                  className='w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-purple-300 dark:border-purple-700 shadow-xs shrink-0' 
                />
              ) : (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-purple-300 dark:border-purple-700 shadow-xs shrink-0">
                  <CharAvatar
                    fullName={user?.fullName}
                    width="w-full"
                    hight="h-full"
                    style="text-xs font-bold" 
                  />
                </div>
              )}
              <span className="absolute bottom-0 ltr:right-0 rtl:left-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>

            <div className="hidden sm:flex flex-col text-start">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">
                {user?.fullName || t('userAccount')}
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-400 mt-1 leading-none">
                {user?.email || t('userTier')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {openSideMenu && (
        <div className="lg:hidden mt-3 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
          <SideMenu activeMenu={activeMenu} closeMobileMenu={() => setOpenSideMenu(false)} />
        </div>
      )}
    </header>
  );
};

export default Navbar;