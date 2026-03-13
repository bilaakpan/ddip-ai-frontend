"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Input component matching DDip AI form design.
 * - Dark background (#1A1F2E)
 * - Subtle border, teal focus ring
 * - 48px height, 8px border-radius
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-white/80"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-teal-500">*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 w-full rounded-[var(--radius-input)] border bg-[#1A1F2E] px-4 text-white placeholder:text-white/40",
            "transition-colors duration-[var(--transition-fast)]",
            "focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500",
            error
              ? "border-red-500"
              : "border-[#2A2F3E] hover:border-white/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-white/40">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
