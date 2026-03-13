import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}

/**
 * Card component matching DDip AI design system.
 * - Dark surface background (#141824)
 * - 14px border radius
 * - Optional hover lift effect
 */
export function Card({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--radius-card)] border border-border-dark bg-dark-surface p-8",
        hover &&
          "transition-all duration-[var(--transition-normal)] hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5",
        className
      )}
    >
      {children}
    </Tag>
  );
}
