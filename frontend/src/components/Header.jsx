import React, { useState, useRef, useEffect } from "react";
import {
  BsList,
  BsSearch,
  BsBell,
  BsPersonCircle,
  BsGearFill,
  BsPower,
  BsChevronDown,
} from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/UsersSlice";

/**
 * Header Component - Top navbar with Purple theme
 */
const Header = ({ OpenSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const getBreadcrumb = () => {
    const pathSegments = location.pathname.split("/").filter((x) => x);
    if (pathSegments.length === 0) return "Dashboard";
    return pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 md:px-6 shrink-0 sticky top-0 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <button
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={OpenSidebar}
        >
          <BsList size={22} />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-slate-900 truncate">
            {getBreadcrumb()}
          </h1>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md ml-8">
          <div className="flex items-center w-full px-4 py-2 bg-slate-100 rounded-xl focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all border border-transparent focus-within:border-slate-200">
            <BsSearch className="text-slate-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products, sales, reports..."
              className="w-full bg-transparent border-none outline-none text-sm placeholder:text-slate-400 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-3">
        <button className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
          <BsSearch size={18} />
        </button>

        <button
          onClick={() => navigate("/notifications")}
          className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <BsBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full ring-2 ring-white" />
        </button>

        <div className="hidden md:block w-px h-8 bg-slate-200 mx-1" />

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 md:gap-3 p-1.5 md:pr-3 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-sm">
              {user?.image ? (
                <img
                  src={
                    user.image.startsWith("http")
                      ? user.image
                      : `data:image/png;base64,${user.image}`
                  }
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white font-bold text-sm">
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </span>
              )}
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-900 leading-none">
                {user?.username || "User"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Administrator</p>
            </div>

            <BsChevronDown
              className={`hidden md:block text-slate-400 text-sm transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-scale-in origin-top-right z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-900">
                  {user?.username || "User"}
                </p>
                <p className="text-xs text-slate-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate("/profile");
                  }}
                  className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-3"
                >
                  <BsPersonCircle className="text-slate-400 text-lg" />
                  My Profile
                </button>
              </div>

              <div className="pt-1 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                >
                  <BsPower className="text-red-500 text-lg" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
