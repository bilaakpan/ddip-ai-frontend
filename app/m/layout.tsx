import MobileNavbar from "@/components/mobile/MobileNavbar";
import MobileFooter from "@/components/mobile/MobileFooter";


/**
 * Mobile layout — wraps all /m/ routes.
 * Users never see "/m/" in the URL — middleware rewrites mobile UAs here.
 */
export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MobileNavbar />
      <main className="min-h-screen pt-[60px]">{children}</main>
      <MobileFooter />
   
    </>
  );
}
