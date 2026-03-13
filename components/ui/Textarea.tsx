"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/**
 * Textarea component matching DDip AI form design.
 * Same styling as Input but with min-height for multi-line.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-white/80"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-teal-500">*</span>
            )}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-[120px] w-full resize-y rounded-[var(--radius-input)] border bg-[#1A1F2E] px-4 py-3 text-white placeholder:text-white/40",
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
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
