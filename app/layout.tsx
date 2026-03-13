import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DDip AI — AI-Powered Creative Production",
    template: "%s | DDip AI",
  },
  description:
    "AI-powered creative production agency. AI influencers, commercial production, content generation, and automation solutions.",
  keywords: [
    "AI",
    "artificial intelligence",
    "influencer",
    "content generation",
    "automation",
    "creative production",
    "DDip AI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={bricolageGrotesque.variable}>
      <body>{children}</body>
    </html>
  );
}
