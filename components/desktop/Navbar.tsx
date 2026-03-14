"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Process", href: "/#discover" },
  { label: "Ai Solutions", href: "/ai-solutions", hasDropdown: true },
  { label: "Works", href: "/works", hasDropdown: true },
  { label: "The Mind Behind", href: "/the-mind-behind" },
  { label: "Insights", href: "/insights" },
];

const aiSolutionLinks = [
  { label: "AI Content Generation", href: "/ai-solutions/ai-content" },
  { label: "Create your influencer with AI", href: "/ai-solutions/ai-influencer" },
  { label: "AI Brand Ambassador Generation", href: "/ai-solutions/ai-influencer" },
  { label: "AI Mascot Generation", href: "/ai-solutions/ai-influencer" },
  { label: "AI Commercial Production", href: "/ai-solutions/ai-commercial" },
  { label: "Automated Workflow with AI Agents", href: "/ai-solutions/automation" },
  { label: "GEO for Websites", href: "/ai-solutions/geo" },
];

const megaMenuCards = [
  {
    title: "AI Content Generation",
    href: "/ai-solutions/ai-content",
  },
  {
    title: "Create Your Influencer with AI",
    href: "/ai-solutions/ai-influencer",
  },
  {
    title: "Automation with a Creative Touch",
    href: "/ai-solutions/automation",
  },
];

/**
 * Desktop navigation bar matching Figma design:
 * - Fixed position at top
 * - Logo (ddip.AI) left, nav links center, CTA buttons right
 * - Dark background with blur backdrop
 * - AI Solutions mega-menu dropdown with links + image cards
 * - ~80px height
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
    <nav
      className={cn(
        "fixed inset-x-0 top-[30px] z-50 mx-auto w-[calc(100%-40px)] max-w-[1490px] rounded-[58px] bg-[#545454]/80 shadow-[0px_4px_11.5px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 lg:w-[calc(100%-238px)] max-md:top-0 max-md:w-full max-md:max-w-none max-md:rounded-none max-md:bg-[#002834]/95",
        scrolled && "shadow-lg",
        mobileMenuOpen && "max-md:z-[1001]"
      )}
    >
      <div className="flex h-[79px] items-center justify-between gap-4 px-[30px] max-md:h-[60px] max-md:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src="/images/common/ddip-ai-logo.png"
            alt="DDiP AI"
            width={90}
            height={32}
            className="h-8 w-auto max-md:h-7"
            priority
          />
        </Link>

        {/* Hamburger button — visible only on mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-[1001] hidden h-11 w-11 flex-col items-center justify-center gap-[5px] max-md:flex"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Center Nav Links — hidden on mobile */}
        <div className="flex items-center gap-[20px] max-md:hidden xl:gap-[40px] shrink-0">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                link.hasDropdown && setDropdownOpen(true)
              }
              onMouseLeave={() =>
                link.hasDropdown && setDropdownOpen(false)
              }
            >
              <Link
                href={link.href}
                className="whitespace-nowrap font-heading text-[14px] font-medium leading-[1.2] text-white transition-colors hover:text-teal-500 lg:text-[16px] xl:text-[18px]"
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className={cn(
                      "ml-1 inline-block h-3 w-3 transition-transform duration-200",
                      dropdownOpen && "rotate-180"
                    )}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>

              {/* Mega Menu Dropdown */}
              {link.hasDropdown && dropdownOpen && (
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                  <div className="w-[800px] rounded-xl border border-border-dark bg-dark-bg/98 p-6 shadow-2xl backdrop-blur-xl">
                    <div className="grid grid-cols-[240px_1fr] gap-8">
                      {/* Left — text links */}
                      <div className="space-y-1">
                        {aiSolutionLinks.map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            className="block rounded-md px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-teal-500"
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>

                      {/* Right — image cards */}
                      <div className="grid grid-cols-3 gap-4">
                        {megaMenuCards.map((card, i) => (
                          <Link
                            key={card.title}
                            href={card.href}
                            className="group relative aspect-[4/5] overflow-hidden rounded-lg"
                          >
                            <div
                              className="absolute inset-0 transition-transform duration-300 group-hover:scale-105"
                              style={{
                                background: `linear-gradient(160deg, hsl(${185 + i * 15}, 50%, ${30 + i * 8}%), hsl(${200 + i * 20}, 40%, ${15 + i * 5}%))`,
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent" />
                            <div className="relative flex h-full flex-col justify-end p-4">
                              <p className="text-xs font-medium leading-snug text-white">
                                {card.title}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Carousel dots */}
                    <div className="mt-4 flex justify-center gap-2">
                      <span className="h-1.5 w-6 rounded-full bg-teal-500" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                      <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons — hidden on mobile */}
        <div className="flex items-center gap-[20px] max-md:hidden xl:gap-[40px] shrink-0">
          <Link
            href="/start-project"
            className="whitespace-nowrap font-body text-[14px] font-medium leading-[1.2] text-white transition-colors hover:text-teal-500 lg:text-[16px] xl:text-[18px]"
          >
            Start a Project
          </Link>
          <Link
            href="/lets-connect"
            className="flex h-[53px] w-[167px] items-center justify-center gap-[14px] rounded-[56px] bg-white font-body text-[18px] font-medium leading-[1.2] text-[#063746] transition-colors hover:bg-white/90"
          >
            Let&apos;s Connect
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              className="ml-0.5"
            >
              <path
                d="M1 1L6 6L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>

    {/* Mobile menu overlay */}
    <div
      className={cn(
        "fixed inset-0 z-[1000] bg-[#002834] transition-transform duration-300 md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <nav className="flex h-full flex-col overflow-y-auto px-6 pt-[80px] pb-10">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-white/10 py-5 font-heading text-[22px] font-medium text-white"
            style={{ minHeight: "44px" }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/start-project"
          onClick={() => setMobileMenuOpen(false)}
          className="block border-b border-white/10 py-5 font-heading text-[22px] font-medium text-white"
          style={{ minHeight: "44px" }}
        >
          Start a Project
        </Link>
        <Link
          href="/lets-connect"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-8 flex h-[53px] items-center justify-center rounded-[56px] bg-white font-body text-[18px] font-medium text-[#063746]"
        >
          Let&apos;s Connect
        </Link>
      </nav>
    </div>
    </>
  );
}
