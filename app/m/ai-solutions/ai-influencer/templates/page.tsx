"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Section } from "@/components/layout";

/* ─── Data ─── */
const topInfluencer = [
  {
    type: "Real Estate",
    name: "Mina Özdemir",
    archetype: "Analytical Visionary",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81d25d40-2890-403e-93d7-49e36b06cd00/public",
    country: "TR",
    tagColor: "#CDDBC0",
  },
  {
    type: "Fashion",
    name: "Mina Şen",
    archetype: "Color Story Weaver",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/56d8bb08-9c7d-49ca-e1ec-aa074fdf1600/public",
    country: "TR",
    tagColor: "#DBC0CD",
  },
  {
    type: "Food",
    name: "Elif Doğan",
    archetype: "Market-to-Table Storyteller",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e1fe1be8-8ca5-4eef-cf2a-925bae6f7300/public",
    country: "TR",
    tagColor: "#C0C2DB",
  },
  {
    type: "Fashion",
    name: "Yasin El Fassi",
    archetype: "Heritage Remix Artist",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/259023e7-e8b0-4214-ee42-9f2b02a1a800/public",
    country: "MA",
    tagColor: "#DBC0CD",
  },
  {
    type: "Lifestyle",
    name: "Aylin Demir",
    archetype: "Calm Change Navigator",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/57fe254b-21d7-4443-1476-6eccc458df00/public",
    country: "TR",
    tagColor: "#C0D7DB",
  },
  {
    type: "Tech",
    name: "Deniz Akar",
    archetype: "Future-Forward Thinker",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/923ba48c-8d17-4f6f-a974-09eae19dc300/public",
    country: "TR",
    tagColor: "#DBD8C0",
  },
  {
    type: "HR",
    name: "Laila Haddad",
    archetype: "People-First Strategist",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8ebaf72d-1931-4412-d1ef-55f1feb9dd00/public",
    country: "AE",
    tagColor: "#CDDBC0",
  },
  {
    type: "Wellness",
    name: "Selin Kara",
    archetype: "Mindful Storyteller",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ae712d05-13a0-46d1-c9e5-6f92fdeda700/public",
    country: "TR",
    tagColor: "#DBD8C0",
  },
];

const showcaseFilters = [
  {
    label: "Industry",
    options: ["All", "Real Estate", "Food", "Fashion", "Tech & Digital", "Wellness", "Consulting"],
  },
  {
    label: "Persona",
    options: ["All", "AI Brand Ambassador", "AI Influencer", "AI Blogger", "AI Mascot"],
  },
  {
    label: "Region",
    options: ["All", "European Market (EU)", "Turkey Market (TR)", "Middle East & North Africa"],
  },
  {
    label: "Gender",
    options: ["All", "Female", "Male", "Gender-Neutral"],
  },
  {
    label: "Language",
    options: ["All", "Turkish (TR)", "English (EN)", "Arabic (AR)"],
  },
];
const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};
export default function InfluencerTemplatesPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    Object.fromEntries(showcaseFilters.map((f) => [f.label, "All"]))
  );

  const toggleFilter = (label: string, option: string) => {
    setActiveFilters((prev) => ({ ...prev, [label]: option }));
  };

  const clearFilters = () => {
    setActiveFilters(Object.fromEntries(showcaseFilters.map((f) => [f.label, "All"])));
  };

  return (
    <>
      {/* ══════════════════════════════════════
          1. Influencer Showcase
      ══════════════════════════════════════ */}
      <div className="min-h-screen bg-dark-bg">
        {/* ── Header ── */}
        <div className="sticky top-0 z-20 bg-dark-bg px-5 pt-12 pb-4 border-b border-white/10">
          <Link
            href="/m/ai-solutions/ai-influencer"
            className="flex items-center gap-2 text-[22px] font-medium text-white"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            BACK
          </Link>

          <div className="mt-4 flex items-center justify-between">
            <h1
              className="text-[28px] text-white"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Our Influencer
            </h1>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-[13px] text-white bg-[#EBFFFF33]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
              </svg>
              Filter
            </button>
          </div>
        </div>

        {/* ── 2-column grid ── */}
        <div className="px-4 pt-5 pb-10">
          <div className="grid grid-cols-2 gap-3">
            {topInfluencer.map((item, idx) => (
              <article key={`${item.name}-${idx}`}>
                <div className="relative overflow-hidden rounded-[20px]">
                  {/* Portrait image */}
                  <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Industry tag — top right */}
                  <div
                    className="absolute right-2 top-2 rounded-full px-3 py-1 flex"
                    style={{ backgroundColor: item.tagColor }}
                  >
                    <span className="text-[9px] font-semibold uppercase text-black tracking-wide">
                      {item.type}
                    </span>
                  </div>

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    {/* Name + flag + plus */}
                    <div className="mb-2 flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 rounded-full bg-[#063746CC] px-3 py-1.5 min-w-0">
                        <span className="truncate text-[8px] text-white">{item.name}</span>
                        {item.country && (
                          <Image
                            src={`https://flagcdn.com/w20/${item.country.toLowerCase()}.png`}
                            alt={item.country}
                            width={16}
                            height={12}
                            unoptimized
                            className="h-2.5 w-3.5 rounded-sm object-cover shrink-0"
                          />
                        )}
                      </div>
                      <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-white/90">
                        <svg className="h-3.5 w-3.5 text-[#012F3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </div>

                    {/* Work with button */}
                    <Link
                      href="/m/ai-solutions/ai-influencer"
                      className="flex h-9 w-full items-center justify-between rounded-[10px] bg-[#0BB3D0] px-3 text-[8px] font-medium text-white"
                    >
                      <span>Work With This Influencer</span>
                      <span className="text-[13px] leading-none">→</span>
                    </Link>
                  </div>
                </div>

                {/* Archetype below card */}
                <p className="mt-2 text-[11px] italic text-[#88A9B3] px-1">
                  &ldquo;{item.archetype}&rdquo;
                </p>
              </article>
            ))}
          </div>
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
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setFilterOpen(false)}
                  className="text-white text-[18px] leading-none"
                  aria-label="Close filter"
                >
                  ✕
                </button>
                <h2 className="text-[16px] font-semibold text-white">Filter</h2>
                <button
                  onClick={clearFilters}
                  className="text-[13px] text-[#90B2BD]"
                >
                  Clean
                </button>
              </div>

              {/* Filter groups */}
              <div className="flex flex-col gap-7">
                {showcaseFilters.map((group) => (
                  <div key={group.label}>
                    <p className="mb-3 text-[15px] font-medium text-white">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => {
                        const isActive = activeFilters[group.label] === option;
                        return (
                          <button
                            key={option}
                            onClick={() => toggleFilter(group.label, option)}
                            className={`rounded-[8px] border px-3 py-2 text-[12px] transition ${isActive
                              ? "border-[#0BB3D0] bg-[#0BB3D0]/20 text-[#1CE3F4]"
                              : "border-[#2A4A54] text-[#8FB0B9]"
                              }`}
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
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[32px] font-bold leading-[1.2]" style={{ color: "#039EB7" }}>
          Let&apos;s Build What&apos;s Next, Together.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#063746]/70">
          Whether you&apos;re exploring AI solutions or ready to start a custom project, our team is here to help you design intelligent systems that move your business forward.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Full Name *</label>
            <input type="text" placeholder="Your name and last name" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Email Address *</label>
            <input type="email" placeholder="example@domain.com" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Company Name</label>
            <input type="text" placeholder="Your employer's name" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Country</label>
            <input type="text" placeholder="Your country of residence" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Industry</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option value="">Please select</option>
                <option>Real Estate</option>
                <option>Fashion</option>
                <option>Food</option>
                <option>Tech & Digital</option>
                <option>Wellness</option>
                <option>Consulting</option>
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BABABA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Select Influencer *</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option value="">Please select</option>
                <option>AI Brand Ambassador</option>
                <option>AI Influencer</option>
                <option>AI Blogger</option>
                <option>AI Mascot</option>
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BABABA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Details regarding your question, if any</label>
            <textarea rows={5} className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none resize-none" />
          </div>

          <button className="w-[60%] rounded-full py-4 font-heading text-[20px] text-white" style={{ backgroundColor: "#0A7D94" }}>
            Send
          </button>
        </div>
      </section>
      
    </>
  );
}
