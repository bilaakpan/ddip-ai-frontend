/**
 * Empty mobile route group — kept for backwards compatibility.
 * Actual mobile pages live under app/m/ with middleware rewrites.
 * This route group has NO pages to avoid conflicts with (desktop).
 */
export default function MobileGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
