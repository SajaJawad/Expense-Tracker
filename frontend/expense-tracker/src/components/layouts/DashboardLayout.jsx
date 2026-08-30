import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { UserContext } from '../../context/userContext';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex max-w-7xl mx-auto items-start">
          {/* Fixed Desktop Sidebar */}
          <aside className="hidden lg:block shrink-0 sticky top-[61px] h-[calc(100vh-61px)] self-start">
            <SideMenu activeMenu={activeMenu} />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 bg-grid-pattern overflow-x-hidden min-h-[calc(100vh-61px)]">
            {children}
          </main>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;