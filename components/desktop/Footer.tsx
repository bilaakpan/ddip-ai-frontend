"use client";
import Link from "next/link";
import Image from "next/image";
import { Stream } from "@cloudflare/stream-react";
import HlsPlayer from "./video";
const companyLinks = [
  { label: "Process", href: "/process" },
  { label: "Works", href: "/works" },
  // { label: "What We Do", href: "/#discover" },
  { label: "The Mind Behind", href: "/the-mind-behind" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/lets-connect" },
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
          <div className="max-w-[740px]">
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
            <div className="flex items-center gap-12">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-white transition-colors hover:opacity-70">
                <Image src="/images/common/facebook.svg" alt="Facebook" width={15} height={29} />
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-white transition-colors hover:opacity-70">
                <Image src="/images/common/instagram.svg" alt="Instagram" width={29} height={29} />
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="text-white transition-colors hover:opacity-70">
                <Image src="/images/common/linkedin.svg" alt="LinkedIn" width={28} height={29} />
              </a>
            </div>
            {/* VIDEO */}
            <div className="w-full max-w-[500px] overflow-hidden">
              <div className="relative aspect-video">
                <HlsPlayer
                  src="9e3a0d22828697a21a65a4ea035f5c3d"
                  autoPlay={false}
                  controls={false}
                  muted={true}
                  loop={true}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        {/* ───────── BOTTOM ───────── */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-white text-[20px]">
            © 2026 Ddip AI. All Rights Reserved
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-white text-[40px] hover:text-[#1CE3F4] transition"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}