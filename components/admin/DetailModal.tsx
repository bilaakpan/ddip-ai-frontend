"use client";

import { useEffect } from "react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function DetailModal({
  isOpen,
  onClose,
  title,
  children,
  actions,
}: DetailModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 w-full max-w-2xl rounded-2xl border border-border-dark bg-dark-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-dark px-6 py-4">
          <h2 className="font-heading text-lg font-medium text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="flex items-center justify-end gap-3 border-t border-border-dark px-6 py-4">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

interface DetailFieldProps {
  label: string;
  value?: string | null | React.ReactNode;
}

export function DetailField({ label, value }: DetailFieldProps) {
  return (
    <div className="py-2">
      <dt className="text-xs font-medium uppercase tracking-wider text-white/40">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-white/80">
        {value || <span className="text-white/20">—</span>}
      </dd>
    </div>
  );
}
