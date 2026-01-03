import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsList, BsX, BsBoxSeam, BsGrid1X2Fill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/UsersSlice";

/**
 * PublicLayout - Layout for public pages with Purple theme
 */
const PublicLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useSelector(selectUser);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="StockFlow"
                className="w-12 h-12 object-contain"
              />
              <span className="text-xl font-bold text-slate-900">
                Stock<span className="text-indigo-600">Flow</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <Link to="/dashboard" className="btn btn-primary">
                  <BsGrid1X2Fill className="mr-2" />
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Get Started Free
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-slate-500 hover:text-slate-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <BsX size={24} /> : <BsList size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive(item.href)
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn btn-primary w-full justify-center"
                  >
                    <BsGrid1X2Fill className="mr-2" />
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="btn btn-primary w-full justify-center"
                    >
                      Get Started Free
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2.5 mb-4">
                <img
                  src="/logo.png"
                  alt="StockFlow"
                  className="w-12 h-12 object-contain grayscale opacity-80"
                />
                <span className="text-xl font-bold text-white">
                  Stock<span className="text-indigo-400">Flow</span>
                </span>
              </Link>
              <p className="text-sm max-w-xs">
                The modern ERP solution for growing businesses. Manage
                inventory, accelerate sales, and unlock insights.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Account</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/login"
                    className="hover:text-white transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:text-white transition-colors"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-sm text-center">
              © {new Date().getFullYear()} StockFlow ERP. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
