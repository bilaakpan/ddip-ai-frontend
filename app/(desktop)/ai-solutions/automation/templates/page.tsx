"use client";

import { useState } from "react";
import Link from "next/link";
import ContactFormSection from "@/components/desktop/ContactFormSection";

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

const categories = ["All", "Content Creation", "Social Media", "E-Commerce", "Analytics & Research", "Productivity", "Lead Generation"];
const platforms = ["All", "Instagram", "LinkedIn", "YouTube", "Telegram", "Amazon", "Email"];
const outputTypes = ["All", "Video", "Text / Copy", "Reports & Data", "Notifications", "Images"];
const useCases = ["All", "Solo Creator", "Small Business", "Agency", "Enterprise"];
const languages = ["All", "Turkish (TR)", "English (EN)", "Arabic (AR)"];

function FilterGroup({ label, options, selected, onSelect }: { label: string; options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="mb-6">
      <p className="text-[13px] text-white/50 mb-3" style={{ fontFamily: "var(--font-body)" }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all"
            style={{
              backgroundColor: selected === opt ? "#1CE3F4" : "transparent",
              color: selected === opt ? "#063746" : "rgba(255,255,255,0.7)",
              border: "1px solid #53666B",
              borderRadius: "6px",
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AutomationTemplatesPage() {
  const [category, setCategory] = useState("All");
  const [platform, setPlatform] = useState("All");
  const [outputType, setOutputType] = useState("All");
  const [useCase, setUseCase] = useState("All");
  const [language, setLanguage] = useState("All");

  const filtered = allTemplates.filter((t) =>
    (category === "All" || t.category === category) &&
    (platform === "All" || t.platform === platform) &&
    (outputType === "All" || t.outputType === outputType) &&
    (useCase === "All" || t.useCase === useCase) &&
    (language === "All" || t.language === language)
  );

  return (
    <>
      {/* Hero marquee */}
      {/* <section className="relative overflow-hidden  pt-40 pb-10">
        <div className="overflow-hidden whitespace-nowrap">
          <h1 className="inline-block font-heading font-normal uppercase text-white" style={{ fontSize: "140px", lineHeight: "1" }}>
            AUTOMATION WITH A CREATIVE TOUCH &nbsp;&nbsp; AUTOMATION WITH A CREATIVE TOUCH
          </h1>
        </div>
      </section> */}

  <div className="overflow-hidden bg-dark-bg whitespace-nowrap pt-[100px]">
  <div className="flex animate-marquee">
      <h1 className="text-[140px] text-white whitespace-nowrap">
        Automation with a Creative Touch
      </h1>
  </div>
</div>

      {/* Main content */}
      <section className="bg-dark-bg min-h-screen px-[60px] py-16">
        <div className="flex gap-12">

          {/* Left — Filters */}
          <div className="w-[220px] shrink-0">
            <h2 className="font-heading text-[22px] font-semibold text-white mb-8">Explore Automations</h2>
            <FilterGroup label="Category" options={categories} selected={category} onSelect={setCategory} />
            <FilterGroup label="Platform" options={platforms} selected={platform} onSelect={setPlatform} />
            <FilterGroup label="Output Type" options={outputTypes} selected={outputType} onSelect={setOutputType} />
            <FilterGroup label="Use Case" options={useCases} selected={useCase} onSelect={setUseCase} />
            <FilterGroup label="Language" options={languages} selected={language} onSelect={setLanguage} />
          </div>

          {/* Right — Cards grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-5 ">
              {filtered.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[16px] p-5 flex flex-col "
                  style={{
                    background: "#022E3C33",
                    border: "1px solid #53666B",
                    boxShadow: "2px 4px 5.8px 0px #FFFFFF40 inset",
                  }}
                >
                  {/* Icons row */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
                    </div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#229ED9" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.613c-.15.67-.54.835-1.094.52l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.49l-2.95-.924c-.64-.2-.653-.64.136-.948l11.527-4.445c.533-.194 1.002.13.37.075z"/></svg>
                    </div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF0000" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
                    </div>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
                      <span className="text-[11px] font-semibold text-white">+5</span>
                    </div>
                  </div>

                  {/* Title */}
                  <p className="mt-6 mb-6 text-[15px] font-medium text-white leading-[1.4]" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </p>

                  {/* Automate This button */}
                  <button className="w-full rounded-[8px] py-2.5 text-[13px] font-medium text-white transition hover:opacity-80" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    Automate This
                  </button>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-white/40 text-[16px]">No templates found for selected filters.</div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection />
    </>
  );
}
