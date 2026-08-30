import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import CharAvatar from '../Inputs/CharAvatar';
import { LuLogOut } from 'react-icons/lu';

const SideMenu = ({ activeMenu, closeMobileMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (closeMobileMenu) closeMobileMenu();

    if (route === "/logout" || route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login", { replace: true });
  };

  const menuItems = SIDE_MENU_DATA.filter((item) => item.label !== "Logout");

  return (
    <div className='w-64 h-full bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 p-4 flex flex-col justify-between overflow-y-auto transition-colors duration-200'>
      
      {/* Navigation Links */}
      <div className="space-y-1 mt-2">
        <p className="px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
          Navigation
        </p>

        {menuItems.map((item, index) => {
          const isActive = activeMenu === item.label;
          const Icon = item.icon;

          return (
            <button
              key={`menu_${index}`}
              onClick={() => handleClick(item.path)}
              className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer group relative ${
                isActive
                  ? 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-purple-600 rounded-r-full" />
              )}

              <Icon className={`text-lg transition-transform group-hover:scale-110 ${
                isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'
              }`} />

              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Profile Area & Logout Button at Bottom */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        
        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
          {user?.profileImageUrl ? (
            <img 
              src={user?.profileImageUrl} 
              alt={user?.fullName || 'Avatar'} 
              className='w-10 h-10 rounded-full object-cover border border-purple-200 dark:border-purple-800 shrink-0' 
            />
          ) : (
            <CharAvatar
              fullName={user?.fullName}
              width="w-10"
              hight="h-10"
              style="text-sm font-bold" 
            />
          )}

          <div className="min-w-0 flex-1">
            <h6 className='text-xs font-bold text-slate-800 dark:text-slate-100 truncate'>
              {user?.fullName || "User"}
            </h6>
            <p className='text-[11px] text-slate-500 dark:text-slate-400 truncate'>
              {user?.email || "Account"}
            </p>
          </div>
        </div>

        {/* Logout CTA */}
        <button
          type="button"
          onClick={() => handleClick("/logout")}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 transition-all cursor-pointer"
        >
          <LuLogOut className="text-sm" />
          <span>Sign Out</span>
        </button>

      </div>
    </div>
  );
};

export default SideMenu;