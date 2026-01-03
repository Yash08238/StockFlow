import React from "react";
import { Link } from "react-router-dom";
import {
  BsExclamationTriangle,
  BsHouseDoor,
  BsArrowLeft,
} from "react-icons/bs";

/**
 * NotFound Page - 404 error page with Purple theme
 */
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20">
          <BsExclamationTriangle className="text-5xl text-white" />
        </div>

        {/* Error Code */}
        <h1 className="text-7xl font-bold text-slate-900 mb-2">404</h1>

        {/* Message */}
        <h2 className="text-xl font-semibold text-slate-800 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/dashboard" className="btn btn-primary w-full sm:w-auto">
            <BsHouseDoor />
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary w-full sm:w-auto"
          >
            <BsArrowLeft />
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="mt-12 text-sm text-slate-400">StockFlow ERP</p>
      </div>
    </div>
  );
};

export default NotFound;
