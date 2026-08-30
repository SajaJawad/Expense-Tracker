import React, { useState, useContext } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from './SideMenu';
import ThemeToggle from '../ThemeToggle';
import { UserContext } from '../../context/userContext';
import CharAvatar from '../Inputs/CharAvatar';
import BrandLogo from '../BrandLogo';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <header className='sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl px-4 sm:px-8 py-3 transition-colors duration-200 shadow-2xs'>
      <div className="flex items-center justify-between">
        
        {/* Left: Mobile Menu Toggle & Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            className='lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer'
            onClick={() => setOpenSideMenu(!openSideMenu)}
            aria-label="Toggle menu"
          >
            {openSideMenu ? (
              <HiOutlineX className='text-2xl'/>
            ) : (
              <HiOutlineMenu className='text-2xl'/>
            )}
          </button>

          <BrandLogo size="normal" showBadge={true} />
        </div>

        {/* Right: Actions, Theme Toggle & Profile Capsule */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ThemeToggle />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200/80 dark:border-slate-800/80">
            <div className="relative group cursor-pointer">
              {user?.profileImageUrl ? (
                <img 
                  src={user?.profileImageUrl} 
                  alt={user?.fullName || 'Avatar'} 
                  className='w-9 h-9 rounded-xl object-cover border-2 border-purple-200 dark:border-purple-800 shadow-xs' 
                />
              ) : (
                <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-purple-200 dark:border-purple-800 shadow-xs">
                  <CharAvatar
                    fullName={user?.fullName}
                    width="w-9"
                    hight="h-9"
                    style="text-xs font-bold" 
                  />
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">
                {user?.fullName || "User Account"}
              </span>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-1 leading-none">
                {user?.email || "Free Tier"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {openSideMenu && (
        <div className="fixed inset-0 top-[65px] z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" 
            onClick={() => setOpenSideMenu(false)} 
          />
          <div className="relative z-10 w-64 h-full bg-white dark:bg-slate-950 shadow-2xl animate-slide-right">
            <SideMenu activeMenu={activeMenu} closeMobileMenu={() => setOpenSideMenu(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;