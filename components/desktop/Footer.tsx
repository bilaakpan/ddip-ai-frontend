"use client";

import Link from "next/link";

const companyLinks = [
  { label: "Process", href: "/#discover" },
  { label: "Works", href: "/works" },
  { label: "What We Do", href: "/#discover" },
  { label: "The Mind Behind", href: "/the-mind-behind" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/lets-connect" },
];

const aiSolutionLinks = [
  { label: "AI Content Generation", href: "/ai-solutions/ai-content" },
  { label: "Create your influencer with AI", href: "/ai-solutions/ai-influencer" },
  { label: "AI Brand Ambassador Generation", href: "/ai-solutions/ai-influencer" },
  { label: "AI Mascot Generation", href: "/ai-solutions" },
  { label: "AI Commercial Production", href: "/ai-solutions/ai-commercial" },
  { label: "Automated Workflow with AI Agents", href: "/ai-solutions" },
  { label: "GEO for Websites", href: "/ai-solutions" },
];

/**
 * Footer — Figma section 61 (node 367:1091)
 * #002834 bg, 1728x1077
 */
export function Footer() {
  return (
    <footer className="overflow-hidden bg-[#002834] px-5 py-8 md:px-[60px] md:py-[45px]">
      <div className="mx-auto max-w-[1608px]">
        {/* ─── Top: CTA + Logo ─── */}
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left: CTA text + buttons */}
          <div>
            <p className="font-heading text-[24px] font-medium leading-[1.2] text-white md:text-[40px]">
              Got a project?
            </p>
            <h2
              className="mt-4 text-[48px] font-bold uppercase leading-[0.92] md:mt-[31px] md:text-[100px]"
              style={{
                fontFamily: "var(--font-body)",
                background: "linear-gradient(196deg, #FFFFFF 0%, #77F3FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Let&apos;s Connect
            </h2>

            {/* Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-[53px] md:gap-[22px]">
              <Link
                href="/start-project"
                className="inline-flex h-[54px] items-center justify-center rounded-full bg-[#1CE3F4] px-[22px] transition-opacity hover:opacity-90"
              >
                <span
                  className="text-[22px] font-medium leading-[1.2] text-[#002834]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Start a Project
                </span>
              </Link>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[53px] items-center justify-center rounded-full border border-[#EBFFFF] px-[22px] transition-colors hover:bg-white/10"
              >
                <span
                  className="text-[22px] font-medium leading-[1.2] text-[#EBFFFF]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Chat on Whatsapp
                </span>
              </a>
            </div>
          </div>

          {/* Right: ddip.AI logo — large SVG-style text */}
          <div className="text-left md:text-right">
            <span className="text-[60px] font-bold leading-none text-[#90E5F3] md:text-[120px]" style={{ fontFamily: "var(--font-body)" }}>
              ddip
            </span>
            <span className="text-[30px] font-bold leading-none text-[#90E5F3] md:text-[60px]" style={{ fontFamily: "var(--font-body)" }}>
              .AI
            </span>
          </div>
        </div>

        {/* ─── Divider ─── */}
        <div className="mt-12 h-px bg-[#186279] md:mt-[97px]" />

        {/* ─── Middle: Navigation columns + social/video ─── */}
        <div className="mt-10 flex flex-col gap-10 md:mt-[90px] md:flex-row md:justify-between">
          {/* Left: two link columns */}
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16 md:gap-[200px]">
            {/* Company */}
            <div>
              <h4 className="font-heading text-[24px] font-medium leading-[1.2] text-white md:text-[40px]">
                Company
              </h4>
              <ul className="mt-4 space-y-0 md:mt-[70px]">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block whitespace-nowrap text-[16px] leading-[32px] text-[#6AADBE] transition-colors hover:text-white md:text-[28px] md:leading-[45.9px]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* AI Solutions */}
            <div>
              <h4 className="font-heading text-[24px] font-medium leading-[1.2] text-white md:text-[40px]">
                AI Solutions
              </h4>
              <ul className="mt-4 space-y-0 md:mt-[70px]">
                {aiSolutionLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block whitespace-nowrap text-[16px] leading-[32px] text-[#6AADBE] transition-colors hover:text-white md:text-[28px] md:leading-[45.9px]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Social icons + video thumbnail */}
          <div className="flex min-w-0 shrink flex-col items-start md:items-end">
            {/* Social icons row */}
            <div className="flex items-center gap-[48px]">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-[#90E5F3] transition-colors hover:text-[#1CE3F4]">
                <svg className="h-[36px] w-[18px]" viewBox="0 0 15 29" fill="currentColor">
                  <path d="M9.5 9.5V6.5C9.5 5.4 10.4 4.5 11.5 4.5H13.5V0H9.5C6.7 0 4.5 2.2 4.5 5V9.5H0V14H4.5V29H9.5V14H13.5L15 9.5H9.5Z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-[#90E5F3] transition-colors hover:text-[#1CE3F4]">
                <svg className="h-[36px] w-[36px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-[#90E5F3] transition-colors hover:text-[#1CE3F4]">
                <svg className="h-[36px] w-[34px]" viewBox="0 0 28 29" fill="currentColor">
                  <circle cx="4" cy="4" r="3.5" />
                  <rect x="0.5" y="10" width="7" height="19" />
                  <path d="M10.5 10H17V13C18.5 10.5 21 9.5 24 10C27 10.5 28 13 28 16V29H21V18C21 15.5 20 14 17.5 14C15 14 13.5 15.5 13.5 18V29H10.5V10Z" />
                </svg>
              </a>
            </div>

            {/* Video thumbnail */}
            <div className="mt-8 h-[180px] w-full overflow-hidden rounded-none bg-[#D9D9D9] md:mt-[70px] md:h-[304px] md:max-w-[612px]">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/videos/statement-design-video.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="mt-8 flex flex-col gap-4 md:mt-[70px] md:flex-row md:items-end md:justify-between">
          <p
            className="text-[20px] leading-[1.2] text-white"
            style={{ fontFamily: "var(--font-body)" }}
          >
            &copy; 2026 Ddip AI. All Rights Reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-[24px] leading-[1.2] text-white transition-colors hover:text-[#1CE3F4] md:text-[40px]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
