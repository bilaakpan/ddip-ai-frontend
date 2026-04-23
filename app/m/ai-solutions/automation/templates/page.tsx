"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const allTemplates = [
  { title: "Automated Video Creator", category: "Content Creation", platform: "YouTube", outputType: "Video", useCase: "Agency", language: "English (EN)" },
  { title: "Automated LinkedIn Posts", category: "Social Media", platform: "LinkedIn", outputType: "Text / Copy", useCase: "Small Business", language: "English (EN)" },
  { title: "Trend Analyzer for Instagram", category: "Analytics & Research", platform: "Instagram", outputType: "Reports & Data", useCase: "Solo Creator", language: "English (EN)" },
  { title: "Lead Generation Bot", category: "Lead Generation", platform: "Email", outputType: "Notifications", useCase: "Enterprise", language: "English (EN)" },
  { title: "Amazon Stock & Price Tracker", category: "E-Commerce", platform: "Amazon", outputType: "Reports & Data", useCase: "Small Business", language: "English (EN)" },
  { title: "Personal Assistant", category: "Productivity", platform: "Telegram", outputType: "Notifications", useCase: "Solo Creator", language: "Turkish (TR)" },
  { title: "Trend Analyzer for YouTube", category: "Analytics & Research", platform: "YouTube", outputType: "Reports & Data", useCase: "Agency", language: "English (EN)" },
  { title: "WhatsApp Chatbot for Customer Support", category: "Lead Generation", platform: "Telegram", outputType: "Notifications", useCase: "Enterprise", language: "Arabic (AR)" },
  { title: "Meta Ads Analyzer", category: "Analytics & Research", platform: "Instagram", outputType: "Reports & Data", useCase: "Agency", language: "English (EN)" },
  { title: "Meeting Assistant", category: "Productivity", platform: "Email", outputType: "Text / Copy", useCase: "Small Business", language: "English (EN)" },
  { title: "Automated Lead Call and CRM Integration", category: "Lead Generation", platform: "Email", outputType: "Notifications", useCase: "Enterprise", language: "English (EN)" },
  { title: "Social Media Engagement Optimizer", category: "Social Media", platform: "Instagram", outputType: "Images", useCase: "Agency", language: "English (EN)" },
];

const filterGroups = [
  { label: "Category", options: ["All", "Content Creation", "Social Media", "E-Commerce", "Analytics & Research", "Productivity", "Lead Generation"] },
  { label: "Platform", options: ["All", "Instagram", "LinkedIn", "YouTube", "Telegram", "Amazon", "Email"] },
  { label: "Output Type", options: ["All", "Video", "Text / Copy", "Reports & Data", "Notifications", "Images"] },
  { label: "Use Case", options: ["All", "Solo Creator", "Small Business", "Agency", "Enterprise"] },
  { label: "Language", options: ["All", "Turkish (TR)", "English (EN)", "Arabic (AR)"] },
];


export default function AutomationTemplatesPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    Object.fromEntries(filterGroups.map((f) => [f.label, "All"]))
  );

  const toggleFilter = (label: string, option: string) => {
    setActiveFilters((prev) => ({ ...prev, [label]: option }));
  };

  const clearFilters = () => {
    setActiveFilters(Object.fromEntries(filterGroups.map((f) => [f.label, "All"])));
  };

  const filtered = allTemplates.filter((t) =>
    (activeFilters["Category"] === "All" || t.category === activeFilters["Category"]) &&
    (activeFilters["Platform"] === "All" || t.platform === activeFilters["Platform"]) &&
    (activeFilters["Output Type"] === "All" || t.outputType === activeFilters["Output Type"]) &&
    (activeFilters["Use Case"] === "All" || t.useCase === activeFilters["Use Case"]) &&
    (activeFilters["Language"] === "All" || t.language === activeFilters["Language"])
  );
  const safePx: React.CSSProperties = {
    paddingLeft: "max(20px, env(safe-area-inset-left))",
    paddingRight: "max(20px, env(safe-area-inset-right))",
  };
  return (
    <>
      {/* ══════════════════════════════════════
          1. Template List
      ══════════════════════════════════════ */}
      <div className="min-h-screen bg-dark-bg">
        {/* ── Header ── */}
        <div className="sticky top-0 z-20 bg-dark-bg px-5 pt-4 pb-4 border-b border-white/10">
          <Link
            href="/m/ai-solutions/automation"
            className="flex items-center gap-2 text-[24px] font-medium text-white"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            BACK
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <h1
              className="text-[21px] font-semibold text-white"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Explore Automations
            </h1>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[13px] text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* ── Cards list ── */}
        <div className="px-4 pt-5 pb-10 flex flex-col gap-4">
          {filtered.map((item, idx) => (
            <div
              key={`${item.title}-${idx}`}
              className="rounded-[20px] p-[1.5px]"
              style={{
                background: "linear-gradient(135deg, rgba(144,229,243,0.8) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.4) 100%)",
                boxShadow: "0 10px 30px rgba(0, 180, 200, 0.25)",
              }}
            >
              <div
                className="rounded-[18px] p-4 flex flex-col justify-between"
                style={{
                  background: "#002834",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
                }}
              >
                {/* Platform icons row */}

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cf3fd8ca-58ce-47df-88ce-74a2b444b400/public" alt="Globe" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-7 h-7  rounded-lg flex items-center justify-center" style={{ backgroundColor: "#229ED9" }}>
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e4ef2ee1-c4ca-4669-edbf-3a2f45d4f900/public" alt="Telegram" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF0000" }}>
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2de131fa-54be-4e66-d0a3-13e5b19bb400/public" alt="YouTube" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-7 h-7  rounded-lg flex items-center justify-center bg-white/10">
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/928968a1-3d43-4362-dd86-e36ac1e30100/public" alt="More" width={50} height={50} className="rounded" />
                  </div>
                </div>
                {/* Title */}
                <p
                  className="mt-4 mb-4 text-[16px] font-medium text-white leading-[1.4]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.title}
                </p>

                {/* Automate This button */}
                <button
                  className="w-full rounded-[10px] py-3 text-[13px] font-medium text-white/80 transition hover:opacity-80"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  Automate This
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-20 text-center text-[14px] text-white/40">
              No templates found for selected filters.
            </div>
          )}
        </div>

        {/* ── Filter Drawer ── */}
        {filterOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-30 bg-black/50"
              onClick={() => setFilterOpen(false)}
            />
            {/* Sheet */}
            <div className="fixed inset-x-0 bottom-0 z-40 max-h-[92vh] overflow-y-auto bg-dark-bg px-5 pb-10 pt-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-1 pb-4 border-b border-white/10">
                <button
                  onClick={() => setFilterOpen(false)}
                  className="text-white text-[18px] leading-none w-8"
                  aria-label="Close filter"
                >
                  ✕
                </button>
                <h2 className="text-[16px] font-semibold text-white">Filter</h2>
                <button
                  onClick={clearFilters}
                  className="text-[13px] text-[#90B2BD] w-8 text-right"
                >
                  Clean
                </button>
              </div>

              {/* Filter groups */}
              <div className="flex flex-col gap-7 mt-5">
                {filterGroups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-3 text-[15px] font-medium text-white">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => {
                        const isActive = activeFilters[group.label] === option;
                        return (
                          <button
                            key={option}
                            onClick={() => toggleFilter(group.label, option)}
                            className="rounded-[8px] border px-3 py-2 text-[12px] transition"
                            style={{
                              borderColor: isActive ? "#0BB3D0" : "#2A4A54",
                              backgroundColor: isActive ? "rgba(11,179,208,0.15)" : "transparent",
                              color: isActive ? "#1CE3F4" : "rgba(255,255,255,0.6)",
                            }}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Apply button */}
              <button
                onClick={() => setFilterOpen(false)}
                className="mt-8 w-full rounded-full bg-[#0BB3D0] py-4 text-[14px] font-semibold text-white"
              >
                Apply Filters
              </button>
            </div>
          </>
        )}
      </div>

      {/* ══════════════════════════════════════
          2. Form
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-8 px-4" style={safePx}>
        {/* Heading */}
        <h2
          className="font-heading text-[30px] font-semibold leading-[1.15] tracking-[-0.5px]"
          style={{ color: "#039EB7" }}
        >
          Let&apos;s Build What&apos;s Next, Together
        </h2>

        {/* Description */}
        <p className="mt-3 text-[12px] leading-[1.5] text-[#063746]/70 max-w-[320px]">
          Whether you&apos;re exploring AI solutions or ready to start a custom project,
          our team is here to help you design intelligent systems that move your business
          forward.
        </p>

        {/* Form */}
        <div className="mt-6 flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Full Name *</label>
            <input
              type="text"
              placeholder="Your name and last name"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Email Address *</label>
            <input
              type="email"
              placeholder="example@domain.com"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Company */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Company Name</label>
            <input
              type="text"
              placeholder="Your company's name"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Country */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Country</label>
            <input
              type="text"
              placeholder="Your country of residence"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Automation Type */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Automation Type *</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Category</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Platform</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Use Case */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Use Case</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">
              Details regarding your question, if any
            </label>
            <textarea
              rows={4}
              className="w-full rounded-[4px] border border-[#D8D8D8] px-3 py-2 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none resize-none"
            />
          </div>

          {/* Button */}
          <button
            className="mx-auto mt-2 h-[34px] w-[68px] rounded-full text-[12px] font-medium text-white"
            style={{ backgroundColor: "#0A7D94" }}
          >
            Send
          </button>
        </div>
      </section>
    </>
  );
}
