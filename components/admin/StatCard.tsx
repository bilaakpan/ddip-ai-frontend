"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border-dark bg-dark-surface p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-500">
          {icon}
        </div>
        {trend && (
          <span className="text-xs text-teal-500">{trend}</span>
        )}
      </div>
      <p className="mt-4 text-3xl font-heading font-medium text-white">
        {value}
      </p>
      <p className="mt-1 text-sm text-white/40">{label}</p>
    </div>
  );
}
