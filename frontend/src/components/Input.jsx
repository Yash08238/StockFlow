import React from "react";

/**
 * Input Component - Enhanced with icons and error states
 */
const Input = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  readOnly = false,
  required = false,
  leftIcon,
  rightElement,
  className = "",
  ...props
}) => {
  return (
    <div className={`mb-4 w-full ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-slate-700 mb-1.5"
        >
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={`
          relative flex items-center w-full rounded-xl border transition-all duration-200 overflow-hidden bg-white
          ${
            error
              ? "border-red-400 ring-4 ring-red-400/10"
              : "border-slate-200 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10"
          }
          ${readOnly || disabled ? "bg-slate-50 cursor-not-allowed" : ""}
        `}
      >
        {/* Left Icon */}
        {leftIcon && (
          <div className="pl-3.5 text-slate-400 flex-shrink-0 flex items-center justify-center">
            {leftIcon}
          </div>
        )}

        {/* Input Field */}
        <input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          className={`
            w-full bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400
            py-2.5 ${leftIcon ? "pl-3" : "pl-3.5"} ${
            rightElement ? "pr-3" : "pr-3.5"
          }
          `}
          {...props}
        />

        {/* Right Element */}
        {rightElement && (
          <div className="pr-3.5 flex-shrink-0 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
