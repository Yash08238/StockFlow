import React from "react";

/**
 * Card Component - Enhanced with title, subtitle, and interactive options
 */
const Card = ({
  children,
  title,
  subtitle,
  action,
  className = "",
  interactive = false,
  padding = true,
  ...props
}) => {
  return (
    <div
      className={`
        card
        ${interactive ? "card-interactive cursor-pointer" : ""}
        ${!padding ? "!p-0" : ""}
        ${className}
      `}
      {...props}
    >
      {/* Card Header */}
      {(title || action) && (
        <div
          className={`flex items-center justify-between ${
            children ? "mb-4" : ""
          }`}
        >
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}

      {/* Card Content */}
      {children}
    </div>
  );
};

export default Card;
