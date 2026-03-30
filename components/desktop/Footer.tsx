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
 <footer className="bg-dark-bg px-6 py-12 md:px-10 lg:px-16 xl:px-20">
  <div>
    {/* ───────── TOP SECTION ───────── */}
    <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
      {/* LEFT */}
      <div className="max-w-[700px]">
        <p className="text-white text-lg md:text-xl lg:text-2xl font-heading">
          Got a project?
        </p>
        <h2
          className="mt-2 font-bold uppercase leading-[1.1] 
          text-[36px] sm:text-[48px] md:text-[72px] lg:text-[96px]"
          style={{
            background:
              "linear-gradient(266.04deg, #FFFFFF -88.73%, #77F3FF 255.21%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LET’S CONNECT
        </h2>
        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href="/start-project"
            className="rounded-full bg-[#1CE3F4] px-6 py-3 text-sm md:text-base font-medium text-black transition hover:opacity-90"
          >
            Start a Project
          </Link>
          <a
            href="#"
            className="rounded-full border border-white/60 px-6 py-3 text-sm md:text-base font-medium text-white transition hover:bg-white/10"
          >
            Chat on Whatsapp
          </a>
        </div>
      </div>
      {/* RIGHT LOGO */}
      <div className="flex justify-start md:justify-end">
        <img
          src="/images/common/ddip-ai-logo.svg"
          alt="logo"
          className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[300px]"
        />
      </div>
    </div>
    {/* DIVIDER */}
    <div className="my-12 h-px bg-[#186279]" />
    {/* ───────── MIDDLE SECTION ───────── */}
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.2fr_1fr_1.5fr]">
      {/* LEFT LINKS */}
      <div className="grid grid-cols-2 gap-10">
        {/* Company */}
        <div>
          <h4 className="text-white text-xl md:text-2xl font-medium">
            Company
          </h4>
          <ul className="mt-4 space-y-3">
            {companyLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[#6AADBE] text-sm md:text-base hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* AI Solutions */}
        <div>
          <h4 className="text-white text-xl md:text-2xl font-medium">
            AI Solutions
          </h4>
          <ul className="mt-4 space-y-3">
            {aiSolutionLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-[#6AADBE] text-sm md:text-base hover:text-white transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* EMPTY SPACER (matches design breathing room) */}
      <div className="hidden md:block" />
      {/* RIGHT SIDE */}
      <div className="flex flex-col items-start md:items-end gap-8">
        {/* SOCIALS */}
      <div className="flex items-center gap-[48px]">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-white transition-colors hover:text-[#1CE3F4]">
                <svg className="h-[29px] w-[15px]" viewBox="0 0 15 29" fill="currentColor">
                  <path d="M9.5 9.5V6.5C9.5 5.4 10.4 4.5 11.5 4.5H13.5V0H9.5C6.7 0 4.5 2.2 4.5 5V9.5H0V14H4.5V29H9.5V14H13.5L15 9.5H9.5Z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white transition-colors hover:text-[#1CE3F4]">
                <svg className="h-[29px] w-[29px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-white transition-colors hover:text-[#1CE3F4]">
                <svg className="h-[29px] w-[28px]" viewBox="0 0 28 29" fill="currentColor">
                  <circle cx="4" cy="4" r="3.5" />
                  <rect x="0.5" y="10" width="7" height="19" />
                  <path d="M10.5 10H17V13C18.5 10.5 21 9.5 24 10C27 10.5 28 13 28 16V29H21V18C21 15.5 20 14 17.5 14C15 14 13.5 15.5 13.5 18V29H10.5V10Z" />
                </svg>
              </a>
            </div>
        {/* VIDEO */}
        <div className="w-full max-w-[420px] overflow-hidden rounded-md">
          <div className="relative aspect-video">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/statement-video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
    {/* ───────── BOTTOM ───────── */}
    <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p className="text-white text-sm md:text-base">
        © 2026 Ddip AI. All Rights Reserved
      </p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-white text-lg hover:text-[#1CE3F4] transition"
      >
        Back to top ↑
      </button>
    </div>
  </div>
</footer>
  );
}