import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark";
  /** Whether to wrap children in Container */
  contained?: boolean;
  id?: string;
}

/**
 * Section wrapper with light/dark variants matching the DDip AI design system.
 * - Light: off-white bg (#F6F9F2), dark teal text (#063746)
 * - Dark: near-black bg (#0A0E1A), white text
 * - Desktop vertical padding: 80-120px
 */
export function Section({
  children,
  className,
  variant = "light",
  contained = true,
  id,
}: SectionProps) {
  const content = contained ? <Container>{children}</Container> : children;

  return (
    <section
      id={id}
      className={cn(
        "py-20 lg:py-30",
        variant === "dark" ? "dark-section" : "light-section",
        className
      )}
    >
      {content}
    </section>
  );
}
