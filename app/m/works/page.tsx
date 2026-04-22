"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { cmsApi, type Work } from "@/lib/api";
import HlsPlayer from "@/components/desktop/video";

/* ─── Static fallback ─── */
const staticProjects = [
  { id: "1", title: "Vesta Global", field: "Real Estate", categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"], image: "52d4f5fdd1335b2fbaba2f41798273f1", mediaType: "video" },
  { id: "2", title: "Cesi Design", field: "Interior Design", categories: ["Enhanced Storytelling", "High-Impact Brand Moment", "Dynamic Interior Visuals"], image: "90b6c18df1bb19d1117f6d29f6859036", mediaType: "video" },
  { id: "3", title: "Mediterra Group", field: "Real Estate", categories: ["Refined Visual Storytelling", "Consistent Brand Identity"], image: "8ffbc4055a9b0210350a2748fcbb8ce4", mediaType: "video" },
  { id: "4", title: "Brother", field: "AI Solutions", categories: ["Creative AI Integration", "Custom Character Creation"], image: "2f4c298d7224c5140c18bc3c0f6faf22", mediaType: "video" },
  { id: "5", title: "Vesta Global", field: "Real Estate", categories: ["Visual Style Definition", "Prompt Crafting"], image: "90b6c18df1bb19d1117f6d29f6859036", mediaType: "video" },
  { id: "6", title: "Cesi Design", field: "Interior Design", categories: ["Dynamic Interior Visuals"], image: "8ffbc4055a9b0210350a2748fcbb8ce4", mediaType: "video" },
];

const filterOptions = ["All", "Real Estate", "Logo Design", "Interior Design", "AI Solutions", "Branding", "Strategy & Solutions"];

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function MobileWorksPage() {
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [works, setWorks] = useState<Work[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  useEffect(() => {
    cmsApi.works().then((res) => {
      if (res.data?.length) setWorks(res.data);
    }).catch(() => { }).finally(() => setLoading(false));
  }, []);

  const projects = useMemo(() => {
    if (works.length > 0) {
      return works.map((w) => ({
        id: w.id,
        title: w.title,
        field: w.field || "",
        categories: [w.field || ""].filter(Boolean),
        image: w.mediaUrl || "",
        mediaType: w.mediaType,
      }));
    }
    return staticProjects;
  }, [works]);

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.field === activeFilter || p.categories?.includes(activeFilter));

  return (
    <>
      {/* ══════════════════════════════════════
          HERO — marquee
      ══════════════════════════════════════ */}
      <section className="overflow-hidden bg-[#F6F9F2] pt-10 pb-4">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center pr-8 font-heading text-[86px] uppercase leading-none text-dark-bg">
                WORK
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/309a089d-b47f-4446-fd5b-13db6ee1fe00/public" alt="*" className="mx-6 h-16 w-16 relative top-[0.05em]" />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 text-[22px] leading-relaxed text-[#063746]" style={safePx}>
          See how we partner with visionary teams to build brands that stand out and push the boundaries of innovation.
        </p>
      </section>

      {/* ══════════════════════════════════════
          FILTERS — dropdown
      ══════════════════════════════════════ */}
      <section className="bg-[#F6F9F2] pb-6">
        <div
          className="relative w-[60%]"
          style={{
            paddingLeft: "max(20px, env(safe-area-inset-left))",
            paddingRight: "max(20px, env(safe-area-inset-right))",
          }}
        >
          {/* Trigger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between rounded-[28px] bg-[#F3F3F3] px-6 py-4 text-[16px] font-medium text-[#4B4B4B] shadow-sm"
          >
            <span>{activeFilter}</span>
            <svg
              className={`h-5 w-5 text-[#6B6B6B] transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 15l6-6 6 6" />
            </svg>
          </button>

          {/* Dropdown — floats over content below */}
          {isOpen && (
            <div className="absolute left-5 top-full mt-2 w-[calc(100%-20px)] z-50 rounded-[20px] bg-[#F3F3F3] shadow-lg overflow-hidden">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActiveFilter(option);
                    setIsOpen(false);
                  }}
                  className="block w-full border-b border-[#D6D6D6] px-6 py-4 text-left text-[16px] text-[#8B8B8B] last:border-b-0"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* ══════════════════════════════════════
          PROJECT GRID
      ══════════════════════════════════════ */}
      <section
        className="bg-light-bg pb-16"
        style={{
          paddingLeft: "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingBottom: "max(64px, calc(16px + env(safe-area-inset-bottom)))",
        }}
      >
        {loading ? (
          <p className="py-16 text-center text-[14px] text-[#063746]/40">Loading projects...</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="text-[14px] text-[#063746]/50">No projects in this category yet.</p>
            <button onClick={() => setActiveFilter("All")} className="mt-3 text-[13px] text-[#1CE3F4] underline underline-offset-4">
              View all projects
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.slice(0, visibleCount).map((project) => (
              <Link key={project.id} href="/m/works" className="group block">
                <div className="overflow-hidden bg-white shadow-sm">
                  {/* Video / Image */}
                  <div className="relative h-114.5 w-full overflow-hidden">
                    {project.mediaType === "video" && project.image ? (
                      <HlsPlayer
                        src={project.image}
                        autoPlay controls={false} muted loop fillHeight
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    ) : (
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    )}
                    <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1 bg-[#FFFFFFCC] rounded-full px-2 py-1">
                      <h3 className="font-heading text-[12px] text-[#000000]">{project.field}</h3>

                    </div>
                    {/* Category tags */}
                    <div className="absolute left-3 bottom-3 flex flex-wrap justify-end gap-1">
                      {project.categories?.slice(0, 2).map((cat, i) => (
                        <span key={i} className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-medium text-[#063746] backdrop-blur-sm">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-4">
                    <div className="flex items-baseline flex-col gap-2">
                      <h3 className="font-heading text-[22px] text-[#063746]">{project.title}</h3>
                      <span className="text-[14px] text-[#063746]">We partnered with Vesta Global to redefine their real estate presence through AI-powered visual storytelling and dynamic property showcases.</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Load More */}
      {!loading && filtered.length > visibleCount && (
        <section className="bg-light-bg pb-10 flex justify-center" style={safePx}>
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="flex items-center gap-2 text-[22px] font-semibold text-[#126478] active:text-[#00b3c3]"
          >
            LOAD MORE
          </button>
        </section>
      )}
    </>
  );
}
