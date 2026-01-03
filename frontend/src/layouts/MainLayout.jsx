import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header OpenSidebar={OpenSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {/* Mobile overlay */}
      {openSidebarToggle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={OpenSidebar}
        />
      )}
    </div>
  );
};

export default MainLayout;
