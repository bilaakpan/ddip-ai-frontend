"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, total, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <p className="text-sm text-white/40">
        {total} total result{total !== 1 ? "s" : ""}
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={cn(
            "rounded-lg border border-border-dark px-3 py-1.5 text-sm transition-colors",
            page <= 1
              ? "cursor-not-allowed text-white/20"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          )}
        >
          Previous
        </button>

        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (page <= 3) {
            pageNum = i + 1;
          } else if (page >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = page - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors",
                pageNum === page
                  ? "bg-teal-500 text-dark-bg font-medium"
                  : "text-white/60 hover:bg-white/5"
              )}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={cn(
            "rounded-lg border border-border-dark px-3 py-1.5 text-sm transition-colors",
            page >= totalPages
              ? "cursor-not-allowed text-white/20"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          )}
        >
          Next
        </button>
      </div>
    </div>
  );
}
