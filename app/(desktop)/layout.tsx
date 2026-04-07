import { Navbar } from "@/components/desktop/Navbar";
import { Footer } from "@/components/desktop/Footer";

/**
 * Desktop layout shell.
 * Wraps all desktop pages with the fixed navigation bar and footer.
 * Adds top padding to account for fixed navbar height (80px).
 */
export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="desktop-zoom">
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
