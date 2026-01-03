import React from "react";
import { Link } from "react-router-dom";
import { BsBoxSeam } from "react-icons/bs";

/**
 * AuthLayout - Modern authentication pages layout with Purple theme
 */
const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #3C467B 0%, #50589C 50%, #636CCB 100%)",
        }}
      >
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-600/20 to-transparent" />

        {/* Content */}
        <div className="relative flex flex-col justify-between p-10 xl:p-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-16 h-16 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="StockFlow"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold text-white">
              Stock<span className="text-indigo-300">Flow</span>
            </span>
          </Link>

          {/* Tagline */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-4">
              Smart Inventory
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Business Growth
              </span>
            </h1>
            <p className="text-lg text-indigo-200/80 max-w-md">
              Manage your inventory, accelerate sales, and unlock insights with
              the modern ERP solution built for growing businesses.
            </p>
          </div>

          {/* Footer */}
          <div>
            <p className="text-sm text-indigo-200/50">
              © {new Date().getFullYear()} StockFlow ERP. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-16 bg-white">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-14 h-14 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="StockFlow"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-slate-900">
                Stock<span className="text-indigo-600">Flow</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            {title && (
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-slate-600">{subtitle}</p>}
          </div>

          {/* Form Content */}
          <div className="bg-white">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
