import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsBoxSeamFill,
  BsCart3,
  BsReceiptCutoff,
  BsTruck,
  BsGraphUpArrow,
  BsPersonCircle,
  BsBellFill,
  BsTagsFill,
  BsChevronLeft,
  BsBoxSeam,
} from "react-icons/bs";

/**
 * Sidebar Component - Modern collapsible sidebar with Purple theme
 */
const Sidebar = ({
  openSidebarToggle,
  OpenSidebar,
  isCollapsed,
  setIsCollapsed,
}) => {
  const menuSections = [
    {
      title: "Main",
      items: [
        { name: "Dashboard", icon: <BsGrid1X2Fill />, path: "/dashboard" },
        { name: "Inventory", icon: <BsBoxSeamFill />, path: "/inventory" },
        { name: "Categories", icon: <BsTagsFill />, path: "/categories" },
      ],
    },
    {
      title: "Sales",
      items: [
        { name: "Sales Panel", icon: <BsCart3 />, path: "/sales" },
        { name: "Billing", icon: <BsReceiptCutoff />, path: "/bills" },
      ],
    },
    {
      title: "Operations",
      items: [
        { name: "Suppliers", icon: <BsTruck />, path: "/supply" },
        { name: "Reports", icon: <BsGraphUpArrow />, path: "/reports" },
      ],
    },
    {
      title: "Account",
      items: [{ name: "Profile", icon: <BsPersonCircle />, path: "/profile" }],
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative h-full z-50
          text-slate-300 flex flex-col
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-[72px]" : "w-64"}
          ${
            openSidebarToggle
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          shadow-xl
        `}
        style={{
          background: "linear-gradient(180deg, #3C467B 0%, #50589C 100%)",
        }}
      >
        {/* Brand Header */}
        <div
          className={`
          h-16 px-4 border-b border-white/10
          flex items-center justify-between shrink-0
        `}
        >
          <div
            className={`flex items-center gap-3 ${
              isCollapsed ? "justify-center w-full" : ""
            }`}
          >
            <div className="w-9 h-9 flex items-center justify-center shrink-0">
              <img
                src="/logo.png"
                alt="StockFlow"
                className="w-full h-full object-contain"
              />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <span className="text-lg font-bold text-white whitespace-nowrap">
                  Stock<span className="text-indigo-300">Flow</span>
                </span>
                <p className="text-[10px] text-indigo-200/60 uppercase tracking-wider -mt-0.5">
                  ERP System
                </p>
              </div>
            )}
          </div>

          {/* Close button for mobile */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-1"
            onClick={OpenSidebar}
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 scrollbar-thin">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6">
              {/* Section Title */}
              {!isCollapsed && (
                <p className="px-3 mb-2 text-[11px] font-semibold text-indigo-200/50 uppercase tracking-wider">
                  {section.title}
                </p>
              )}

              {/* Section Items */}
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-3 py-2.5 rounded-xl
                        text-sm font-medium transition-all duration-200
                        group relative
                        ${
                          isActive
                            ? "bg-white/15 text-white shadow-sm"
                            : "text-indigo-200/70 hover:text-white hover:bg-white/5"
                        }
                        ${isCollapsed ? "justify-center" : ""}
                      `}
                      onClick={() => {
                        if (openSidebarToggle && window.innerWidth < 768) {
                          OpenSidebar();
                        }
                      }}
                    >
                      {({ isActive }) => (
                        <>
                          {/* Active Indicator */}
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-300 rounded-r-full" />
                          )}

                          {/* Icon */}
                          <span
                            className={`text-lg ${
                              isActive
                                ? "text-white"
                                : "text-indigo-300/60 group-hover:text-indigo-200"
                            }`}
                          >
                            {item.icon}
                          </span>

                          {/* Label */}
                          {!isCollapsed && (
                            <span className="truncate">{item.name}</span>
                          )}

                          {/* Tooltip for collapsed state */}
                          {isCollapsed && (
                            <span className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                              {item.name}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Collapse Toggle - Desktop Only */}
        <div className="hidden md:block p-2 border-t border-white/10">
          <button
            onClick={() => setIsCollapsed && setIsCollapsed(!isCollapsed)}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
              text-sm font-medium text-indigo-200/70 hover:text-white hover:bg-white/5
              transition-all duration-200
              ${isCollapsed ? "justify-center" : ""}
            `}
          >
            <BsChevronLeft
              className={`text-lg transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
            {!isCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {openSidebarToggle && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={OpenSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
