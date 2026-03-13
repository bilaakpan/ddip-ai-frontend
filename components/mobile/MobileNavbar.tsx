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
      { label: "AI Content Generation", href: "/ai-solutions/ai-content" },
      { label: "Create Your Influencer with AI", href: "/ai-solutions/ai-influencer" },
      { label: "AI Commercial Production", href: "/ai-solutions/ai-commercial" },
      { label: "Automation with a Creative Touch", href: "/ai-solutions/automation" },
      { label: "GEO Optimization", href: "/ai-solutions/geo" },
    ],
  },
  { label: "Works", href: "/works" },
  { label: "The Mind Behind", href: "/the-mind-behind" },
  { label: "Insights", href: "/insights" },
];

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <>
      {/* Fixed top bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex h-[60px] items-center justify-between bg-[#002834]/95 px-5 backdrop-blur-md">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/common/ddip-ai-logo.png"
            alt="DDip AI"
            width={90}
            height={32}
            className="h-7 w-auto"
            priority
          />
        </Link>

        {/* Hamburger / Close */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              isOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              isOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      {/* Slide-out menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#002834] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col overflow-y-auto px-6 pt-[80px] pb-10">
          {navLinks.map((link, i) => (
            <div key={i} className="border-b border-white/10">
              {link.children ? (
                <>
                  <button
                    onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                    className="flex w-full items-center justify-between py-5 font-heading text-[22px] font-medium text-white"
                  >
                    {link.label}
                    <svg
                      className={`h-4 w-4 text-[#1CE3F4] transition-transform duration-200 ${
                        expandedIdx === i ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedIdx === i ? "max-h-[400px] pb-4" : "max-h-0"
                    }`}
                  >
                    {link.children.map((child, j) => (
                      <Link
                        key={j}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-3 pl-4 text-[16px] text-[#6AADBE] transition-colors hover:text-[#1CE3F4]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-5 font-heading text-[22px] font-medium text-white"
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/start-project"
              onClick={() => setIsOpen(false)}
              className="flex h-[52px] items-center justify-center rounded-full bg-[#1CE3F4] font-heading text-[16px] font-medium text-[#002834]"
            >
              Start a Project
            </Link>
            <Link
              href="/lets-connect"
              onClick={() => setIsOpen(false)}
              className="flex h-[52px] items-center justify-center rounded-full border border-white/30 font-heading text-[16px] font-medium text-white"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
