"use client";

import Link from "next/link";
import Image from "next/image";
import HlsPlayer from "@/components/desktop/video";

const companyLinks = [
  { label: "Process",          href: "/process" },
  { label: "Works",            href: "/works" },
  { label: "What We Do",       href: "/#solutions" },
  { label: "The Mind Behind",  href: "/the-mind-behind" },
  { label: "Insights",         href: "/insights" },
  { label: "Contact",          href: "/lets-connect" },
];

const solutionLinks = [
  { label: "AI Content Generation",            href: "/ai-solutions/ai-content" },
  { label: "Create your influencer with AI",   href: "/ai-solutions/ai-influencer" },
  { label: "AI Brand Ambassador Generation",   href: "/ai-solutions/ai-commercial" },
  { label: "AI Mascot Generation",             href: "/ai-solutions/ai-commercial" },
  { label: "AI Commercial Production",         href: "/ai-solutions/ai-commercial" },
  { label: "Automated Workflow with AI Agents",href: "/ai-solutions/automation" },
  { label: "GEO for Websites",                 href: "/ai-solutions/geo" },
];

export default function MobileFooter() {
  return (
    <footer className="bg-dark-bg">

      {/* ── Top content area ── */}
      <div
        className="px-5 pt-10 pb-8"
        style={{
          paddingLeft:  "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
        }}
      >
        {/* Logo image */}
        <div className="mb-8">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1c4902c6-da41-4213-c084-5181a2316b00/public"
            alt="DDip AI"
            width={120}
            height={44}
            className="h-10 w-auto"
          />
        </div>

        {/* CTA heading */}
        <p className="font-heading text-[24px] font-medium text-white">
          Got a project?
        </p>
        <h2
          className="mt-1 bg-clip-text font-heading text-[40px] font-bold uppercase leading-[1.05] text-transparent"
          style={{ backgroundImage: "linear-gradient(266.04deg, #FFFFFF -88.73%, #77F3FF 255.21%)" }}
        >
          LET&apos;S CONNECT
        </h2>

        {/* Buttons — side by side */}
        <div className="mt-5 flex items-center gap-3">
          <Link
            href="/start-project"
            className="flex h-11 items-center justify-center rounded-full bg-[#1CE3F4] px-7 text-[13px] font-medium text-dark-bg active:opacity-80"
          >
            Start a Project
          </Link>
          <Link
            href="https://wa.me/"
            className="flex h-11 items-center justify-center rounded-full border border-white/40 px-7 text-[13px] font-medium text-white active:opacity-80"
          >
            Chat on Whatsapp
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-8 h-px bg-white/10" />

        {/* Company links */}
        <div className="mb-8">
          <h3 className="mb-4 font-heading text-[22px] font-semibold text-white">
            Company
          </h3>
          <nav className="flex flex-col gap-2.5">
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] leading-snug text-[#6AADBE] active:text-[#1CE3F4]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* AI Solutions links */}
        <div className="mb-8">
          <h3 className="mb-4 font-heading text-[22px] font-semibold text-white">
            AI Solutions
          </h3>
          <nav className="flex flex-col gap-2.5">
            {solutionLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] leading-snug text-[#6AADBE] active:text-[#1CE3F4]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social icons — Facebook, Instagram, LinkedIn */}
        <div className="flex items-center gap-5">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Full-width background video ── */}
      <div className="relative h-50 w-full overflow-hidden">
        <HlsPlayer
          src="9e3a0d22828697a21a65a4ea035f5c3d"
          autoPlay
          controls={false}
          muted
          loop
          fillHeight
          fillWidth
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex flex-col items-center gap-3 bg-[#001e28] py-5 text-center"
        style={{
          paddingLeft:  "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingBottom: "max(20px, env(safe-area-inset-bottom))",
        }}
      >
        <p className="text-[16px] text-white">
          © 2026 Ddip AI. All Rights Reserved
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-[22px] font-medium text-white active:opacity-70"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
