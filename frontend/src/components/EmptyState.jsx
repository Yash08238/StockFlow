import React from "react";
import { BsInboxFill, BsPlus } from "react-icons/bs";

/**
 * EmptyState Component - Displays when no data is available
 *
 * @param {React.ReactNode} icon - Custom icon (optional)
 * @param {string} title - Main message
 * @param {string} description - Secondary description
 * @param {string} actionLabel - Button text (optional)
 * @param {function} onAction - Button click handler (optional)
 */
const EmptyState = ({
  icon,
  title = "No data available",
  description = "Get started by adding your first item.",
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}
    >
      {/* Icon */}
      <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
        {icon || <BsInboxFill className="text-3xl text-slate-400" />}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-500 max-w-sm mb-6">{description}</p>

      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <BsPlus className="text-lg" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
