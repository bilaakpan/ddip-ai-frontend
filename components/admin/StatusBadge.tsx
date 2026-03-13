"use client";

import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  // Project statuses
  NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  IN_REVIEW: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  CONTACTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  IN_PROGRESS: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  COMPLETED: "bg-green-500/10 text-green-400 border-green-500/20",
  ARCHIVED: "bg-white/5 text-white/40 border-white/10",
  // Contact statuses
  RESPONDED: "bg-green-500/10 text-green-400 border-green-500/20",
  // Role badges
  SUPER_ADMIN: "bg-red-500/10 text-red-400 border-red-500/20",
  ADMIN: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  EDITOR: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  VIEWER: "bg-white/5 text-white/40 border-white/10",
};

const statusLabels: Record<string, string> = {
  NEW: "New",
  IN_REVIEW: "In Review",
  CONTACTED: "Contacted",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ARCHIVED: "Archived",
  RESPONDED: "Responded",
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
  VIEWER: "Viewer",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusColors[status] || "bg-white/5 text-white/60 border-white/10",
        className
      )}
    >
      {statusLabels[status] || status}
    </span>
  );
}
