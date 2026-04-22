"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Process", href: "/process" },
  {
    label: "AI Solutions",
    href: "#",
    children: [
      { label: "AI Content Generation",            href: "/ai-solutions/ai-content" },
      { label: "Create your influencer with AI",   href: "/ai-solutions/ai-influencer" },
      { label: "AI Brand Ambassador Generation",   href: "/ai-solutions/ai-commercial" },
      { label: "AI Mascot Generation",             href: "/ai-solutions/ai-commercial" },
      { label: "AI Commercial Production",         href: "/ai-solutions/ai-commercial" },
      { label: "Automated Workflow with AI Agents",href: "/ai-solutions/automation" },
      { label: "GEO for Websites",                 href: "/ai-solutions/geo" },
    ],
  },
  {
    label: "Works",
    href: "/works",
    children: [
      { label: "Cesi Design",     href: "/works" },
      { label: "Mediterra Group", href: "/works" },
      { label: "Brother",         href: "/works" },
      { label: "Vesta Global",    href: "/works" },
      { label: "Bizim Mutfak",    href: "/works" },
      { label: "Optimum",         href: "/works" },
      { label: "Nadlan Star",     href: "/works" },
    ],
  },
  { label: "The Mind Behind", href: "/the-mind-behind" },
  { label: "Insights",        href: "/insights" },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const close = () => {
    setIsOpen(false);
    setExpandedIdx(null);
  };

  return (
    <>
      {/* ── Fixed top bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex h-15 items-center justify-between bg-dark-bg backdrop-blur-md"
        style={{
          paddingLeft:  "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
        }}
      >
        <Link href="/" onClick={close}>
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1c4902c6-da41-4213-c084-5181a2316b00/public"
            alt="DDip AI"
            width={100}
            height={36}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Hamburger / X */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            /* X icon */
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          ) : (
            /* Hamburger */
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* ── Full-screen slide-in menu ── */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#F0F2EF" }}
        aria-hidden={!isOpen}
      >
        {/* Spacer for fixed header */}
        <div className="h-15 bg-dark-bg" />

        {/* Scrollable nav body */}
        <nav
          className="flex h-[calc(100%-60px)] flex-col overflow-y-auto"
          style={{
            paddingLeft:  "max(20px, env(safe-area-inset-left))",
            paddingRight: "max(20px, env(safe-area-inset-right))",
            paddingBottom: "max(32px, env(safe-area-inset-bottom))",
          }}
        >
          {/* Nav links */}
          <div className="flex-1">
            {navLinks.map((link, i) => (
              <div key={i} className="border-b border-[#CDCFCA]">
                {link.children ? (
                  <>
                    {/* Expandable row */}
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                      className="flex w-full items-center justify-between py-5 text-left"
                    >
                      <span className="font-heading text-[22px] font-medium text-[#063746]">
                        {link.label}
                      </span>
                      <svg
                        className={`h-5 w-5 shrink-0 text-[#063746] transition-transform duration-200 ${
                          expandedIdx === i ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {/* Children */}
                    <div
                      className={`grid transition-all duration-300 ${
                        expandedIdx === i ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        {link.children.map((child, j) => (
                          <Link
                            key={j}
                            href={child.href}
                            onClick={close}
                            className="block py-2 pl-2 text-[15px] text-[#6AADBE] active:opacity-70"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={close}
                    className="block py-5 font-heading text-[22px] font-medium text-[#063746]"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/lets-connect"
              onClick={close}
              className="flex h-13.5 items-center justify-center rounded-full bg-[#1CE3F4] font-heading text-[22px] font-medium text-dark-bg active:opacity-80"
            >
              Let&apos;s Connect
            </Link>
            <Link
              href="/start-project"
              onClick={close}
              className="flex h-13.5 items-center justify-center rounded-full border-2 border-dark-bg font-heading text-[22px] font-medium text-[#063746] active:opacity-80"
            >
              Start a Project
            </Link>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex items-center justify-center gap-7">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="h-5 w-5 text-[#063746]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg className="h-5 w-5 text-[#063746]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="h-5 w-5 text-[#063746]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-6 text-center text-[14px] text-dark-bg">
            © 2026 Ddip AI. All Rights Reserved
          </p>
        </nav>
      </div>
    </>
  );
}
