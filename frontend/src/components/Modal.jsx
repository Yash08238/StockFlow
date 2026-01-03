import React, { useEffect } from "react";
import { BsX } from "react-icons/bs";

/**
 * Modal Component - Enhanced with animations and better overlay
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  size = "md",
  showClose = true,
}) => {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[90vw]",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Modal Panel */}
        <div
          className={`
            relative w-full ${sizes[size]} 
            bg-white rounded-2xl shadow-2xl 
            animate-scale-in
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || showClose) && (
            <div className="flex items-start justify-between p-5 border-b border-slate-100">
              <div>
                {title && (
                  <h3 className="text-lg font-semibold text-slate-900">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                )}
              </div>
              {showClose && (
                <button
                  onClick={onClose}
                  className="p-1.5 -mr-1.5 -mt-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <BsX size={20} />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
