"use client";

import Link from "next/link";

const companyLinks = [
  { label: "Process", href: "/process" },
  { label: "Works", href: "/works" },
  { label: "What We Do", href: "/#solutions" },
  { label: "The Mind Behind", href: "/the-mind-behind" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/lets-connect" },
];

const solutionLinks = [
  { label: "AI Content Generation", href: "/ai-solutions/ai-content" },
  { label: "Create your Influencer with AI", href: "/ai-solutions/ai-influencer" },
  { label: "AI Brand Ambassador Generation", href: "/ai-solutions/ai-commercial" },
  { label: "AI Mascot Generation", href: "/ai-solutions/ai-commercial" },
  { label: "AI Commercial Production", href: "/ai-solutions/ai-commercial" },
  { label: "Automated Workflows with AI Agents", href: "/ai-solutions/automation" },
  { label: "GEO for Websites", href: "/ai-solutions/geo" },
];

export default function MobileFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#002834] px-5 pt-12 pb-8">
      {/* CTA section */}
      <div className="mb-10">
        <p className="font-heading text-[20px] font-medium text-white">
          Got a project?
        </p>
        <h2
          className="mt-2 text-[48px] font-bold leading-[1.05] uppercase"
          style={{
            fontFamily: "var(--font-body)",
            background: "linear-gradient(196deg, #FFFFFF 0%, #77F3FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LET&apos;S CONNECT
        </h2>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/start-project"
            className="flex h-[48px] items-center justify-center rounded-full bg-[#1CE3F4] text-[14px] font-medium text-[#002834]"
          >
            Start a Project
          </Link>
          <Link
            href="https://wa.me/"
            className="flex h-[48px] items-center justify-center rounded-full border border-white/30 text-[14px] font-medium text-white"
          >
            Chat on Whatsapp
          </Link>
        </div>
      </div>

      {/* Logo */}
      <div className="mb-8">
        <span className="font-heading text-[60px] font-bold leading-none text-[#90E5F3]">
          ddip<span className="text-[#1CE3F4]">.</span>AI
        </span>
      </div>

      {/* Divider */}
      <div className="mb-8 h-px bg-[#186279]" />

      {/* Links grid */}
      <div className="mb-8 grid grid-cols-2 gap-6">
        {/* Company */}
        <div>
          <h3 className="mb-4 font-heading text-[16px] font-medium text-white">
            Company
          </h3>
          <nav className="flex flex-col gap-3">
            {companyLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] leading-[1.5] text-[#6AADBE] transition-colors hover:text-[#1CE3F4]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* AI Solutions */}
        <div>
          <h3 className="mb-4 font-heading text-[16px] font-medium text-white">
            AI Solutions
          </h3>
          <nav className="flex flex-col gap-3">
            {solutionLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] leading-[1.5] text-[#6AADBE] transition-colors hover:text-[#1CE3F4]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Social icons */}
      <div className="mb-6 flex items-center gap-4">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#186279] text-[#6AADBE] transition-colors hover:text-[#1CE3F4]">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#186279] text-[#6AADBE] transition-colors hover:text-[#1CE3F4]">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#186279] text-[#6AADBE] transition-colors hover:text-[#1CE3F4]">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between border-t border-[#186279] pt-4">
        <p className="text-[12px] text-[#6AADBE]">
          © 2026 Ddip.AI. All Rights Reserved
        </p>
        <button
          onClick={scrollToTop}
          className="text-[12px] text-[#6AADBE] transition-colors hover:text-[#1CE3F4]"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
