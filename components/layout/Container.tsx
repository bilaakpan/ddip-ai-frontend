import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main";
}

/**
 * Container component matching Figma layout:
 * - Max width: 1608px (from design tokens)
 * - Horizontal padding: 60px (from Figma outer margin)
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-[1608px] px-[60px] max-md:px-5", className)}
    >
      {children}
    </Tag>
  );
}
