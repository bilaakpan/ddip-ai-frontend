"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { cmsApi, type Work } from "@/lib/api";
import { Container } from "@/components/layout";
import HlsPlayer from "@/components/desktop/video";
/* ─── Fallback static projects (shown while CMS loads or if empty) ─── */
const staticProjects = [
  {
    id: "1",
    title: "Vesta Global",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "52d4f5fdd1335b2fbaba2f41798273f1",
    mediaType: "video",
  },
  {
    id: "2",
    title: "Cesi Design",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "90b6c18df1bb19d1117f6d29f6859036",
    mediaType: "video",
  },
  {
    id: "3",
    title: "Mediterra Group",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "8ffbc4055a9b0210350a2748fcbb8ce4",
    mediaType: "video",
  },
  {
    id: "4",
    title: "Brother",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "52d4f5fdd1335b2fbaba2f41798273f1",
    mediaType: "video",
  },
  {
    id: "5",
    title: "Vesta Global",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "90b6c18df1bb19d1117f6d29f6859036",
    mediaType: "video",
  },
  {
    id: "6",
    title: "Cesi Design",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "8ffbc4055a9b0210350a2748fcbb8ce4",
    mediaType: "video",
  },
  {
    id: "7",
    title: "Mediterra Group",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "52d4f5fdd1335b2fbaba2f41798273f1",
    mediaType: "video",
  },
  {
    id: "8",
    title: "Vesta Global",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "90b6c18df1bb19d1117f6d29f6859036",
    mediaType: "video",
  },
  {
    id: "9",
    title: "Cesi Design",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "8ffbc4055a9b0210350a2748fcbb8ce4",
    mediaType: "video",
  },
  {
    id: "10",
    title: "Mediterra Group",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "52d4f5fdd1335b2fbaba2f41798273f1",
    mediaType: "video",
  },
  {
    id: "11",
    title: "Brother",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "90b6c18df1bb19d1117f6d29f6859036",
    mediaType: "video",
  },
  {
    id: "12",
    title: "Vesta Global",
    field: "Real Estate",
    categories: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
    description: "Lorem Ipsum is simply",
    image: "8ffbc4055a9b0210350a2748fcbb8ce4",
    mediaType: "video",
  },
];
const filterOptions = [
  "All",
  "Real Estate",
  "Logo Design",
  "Interior Design",
  "AI Solutions",
  "Branding",
  "Strategy & Solutions",
];
/* ─── Page Component ─── */
export default function WorksPage() {
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [works, setWorks] = useState<Work[]>([]);
  const [activeTab, setActiveTab] = useState("grid");
  const [activeListProject, setActiveListProject] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "list") {
      document.body.classList.add("hide-footer");
    } else {
      document.body.classList.remove("hide-footer");
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => document.body.classList.remove("hide-footer");
  }, []);
  useEffect(() => {
    cmsApi
      .works()
      .then((res) => {
        if (res.data?.length) setWorks(res.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);
  /* Use CMS data if available, otherwise fall back to static */
  const projects = useMemo(() => {
    if (works.length > 0) {
      return works.map((w) => ({
        id: w.id,
        title: w.title,
        field: w.field || "",
        categories: [w.field || ""].filter(Boolean),
        description: "Lorem Ipsum is simply",
        image: w.mediaUrl || "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/70a4b0fb-332f-4dc5-7877-c92a15e69d00/public",
        mediaType: w.mediaType,
      }));
    }
    return staticProjects;
  }, [works]);
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter(
        (p) =>
          p.field === activeFilter ||
          p.categories?.includes(activeFilter)
      );

  // Scroll-driven activation — highlight whichever project row enters the viewport
  useEffect(() => {
    if (activeTab !== "list") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.projectId;
            if (id) setActiveListProject(id);
          }
        });
      },
      { threshold: 0.5 }
    );
    const items = document.querySelectorAll(".project-list-item");
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab, filteredProjects]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "WORK ✻ WORK ✻ WO..."
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pb-8 sm:pb-10 md:pb-12 pt-24 sm:pt-32 md:pt-40">

        {activeTab === "grid" ? (
          /* Grid Tab Content - Original Marquee */
          <Container key="grid-content">
            <div className="w-full overflow-hidden">
              <div className="flex w-max animate-marquee">
                <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
                  WORK
                  <img src="/images/common/star.svg" alt="*" className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-18 lg:w-18 relative top-[0.08em]" />
                </h1>
                <h1 className="ml-4 sm:ml-6 md:ml-8 lg:ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
                  WORK
                  <img src="/images/common/star.svg" alt="*" className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-18 lg:w-18 relative top-[0.08em]" />
                  WORK
                  <img src="/images/common/star.svg" alt="*" className="mx-4 sm:mx-6 md:mx-8 lg:mx-10 h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-18 lg:w-18 relative top-[0.08em]" />
                </h1>
              </div>
            </div>
            <p className="mt-6 sm:mt-8 max-w-xs sm:max-w-md md:max-w-2xl text-left text-base sm:text-lg md:text-xl leading-[1.6] text-[#063746] px-4">
              See how we partner with visionary teams to build brands that stand out and push the boundaries of innovation.
            </p>
          </Container>
        ) : (
          /* List Tab Content — scroll-driven, items activate as they enter viewport */
          <Container key="list-content">
            <div className="flex gap-12">
              {/* Left — scrollable project names */}
              <div className="flex-1 h-[500px] overflow-y-auto scrollbar-hide "
              style={{scrollbarWidth:"none"}}>
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    data-project-id={project.id}
                    onClick={() => setActiveListProject(project.id)}
                    className="project-list-item group cursor-pointer flex items-center"
                  >
                    <span className={`font-heading text-[90px] font-medium uppercase leading-none tracking-tight transition-colors duration-300 ${activeListProject === project.id ? "text-[#063746]" : "text-[#063746]/20 group-hover:text-[#063746]/60"}`}>
                      {project.title}
                    </span>
                    <span className={`ml-6 text-[16px] font-medium uppercase transition-colors duration-300 ${activeListProject === project.id ? "text-[#063746]/50" : "text-transparent"}`}>
                      {project.field}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right — sticky preview */}
              <div className="w-[420px] shrink-0 sticky top-32 self-start">
                {(() => {
                  const active = filteredProjects.find(p => p.id === activeListProject) || filteredProjects[0];
                  if (!active) return null;
                  return (
                    <div className="overflow-hidden rounded-[12px] bg-[#063746]/5">
                      <div className="relative h-[320px]">
                        {active.mediaType === "video" && active.image ? (
                          <HlsPlayer
                            src={active.image}
                            autoPlay={true}
                            controls={false}
                            muted={true}
                            loop={true}
                            fillHeight={true}
                            className="absolute inset-0 w-full object-cover"
                          />
                        ) : (
                          <Image src={active.image} alt={active.title} fill className="object-cover" sizes="420px" />
                        )}
                      </div>
                      <div className="p-4 bg-white">
                        <div className="flex items-baseline justify-between">
                          <p className="font-heading text-[18px] font-semibold text-[#063746]">{active.title}</p>
                          <p className="text-sm text-[#063746] font-medium uppercase">({active.field})</p>
                        </div>
                        <p className="text-sm text-[#063746] mt-1">{active.description}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </Container>
        )}
        {/* Subtitle + CTAs */}
        <div className={`mt-8 flex flex-col sm:flex-row gap-4 px-4 sm:px-8 md:px-12 lg:px-15 ${activeTab === "list" ? "justify-end mr-65" : "items-start sm:items-end justify-between"}`}>
          {/* Dropdown — only show in grid view */}
          <div className="relative w-full sm:w-auto">
            {activeTab === "grid" && (
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-2 rounded-full text-[#063746] px-6 py-2.5 sm:px-8 sm:py-3 font-heading text-lg sm:text-2xl font-medium transition-colors hover:bg-[#1CE3F4]/80"
              >
                {activeFilter === "All" ? "All Projects" : activeFilter}
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
            {isDropdownOpen && activeTab === "grid" && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#063746]/20 z-50">                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => {
                      setActiveFilter(filter);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-lg font-medium transition-colors ${activeFilter === filter
                      ? "bg-[#1CE3F4] text-[#063746]"
                      : "text-[#063746] hover:bg-[#063746]/10"
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">

            <button
              onClick={() => handleTabChange("grid")}
              className={`inline-flex items-center gap-2 rounded-full px-8 py-3 font-heading text-2xl font-medium transition-colors ${activeTab === "grid"
                ? "bg-[#063746] text-[#EBFFFF]"
                : "text-[#063746] hover:bg-[#1CE3F4]/80"
                }`}
            >
              Grid
            </button>
            <button
              onClick={() => {
                setIsDropdownOpen(false);
                handleTabChange("list");
              }}
              className={`inline-flex items-center gap-2 rounded-full px-8 py-3 font-heading text-2xl font-medium transition-colors ${activeTab === "list"
                ? "bg-[#063746] text-[#EBFFFF]"
                : "text-[#063746] hover:bg-[#1CE3F4]/80"
                }`}
            >
              List
            </button>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════════════════════
          2. FILTER TABS
          ════════════════════════════════════════════════════════ */}
      {/* <section className="bg-light-bg pb-8 pt-4">
        <div className="flex flex-wrap items-center gap-3 px-[60px]">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-6 py-2.5 font-heading text-[13px] font-medium transition-all duration-300 ${activeFilter === filter
                ? "border-[#1CE3F4] bg-[#1CE3F4] text-[#063746]"
                : "border-[#063746]/15 bg-transparent text-[#063746]/60 hover:border-[#063746]/30 hover:text-[#063746]"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section> */}
      {/* ════════════════════════════════════════════════════════
          3. PROJECT GRID — 4 columns
          ════════════════════════════════════════════════════════ */}
      {activeTab === "grid" && (
      <section className="bg-light-bg pb-16 sm:pb-20 lg:pb-24">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-15">
          {loading ? (
            <div className="py-20 text-center text-[#063746]/40">
              Loading projects...
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="font-heading text-[20px] font-medium text-[#063746]/50">
                No projects in this category yet.
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="mt-4 text-[14px] text-[#1CE3F4] underline underline-offset-4 transition-colors hover:text-[#1CE3F4]/80"
              >
                View all projects
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-8 lg:gap-y-12">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href="/works"
                  className="group"
                >
                  {/* Card Container */}
                  <div className="relative overflow-hidden bg-white">
                    {/* Image */}
                    <div className="relative aspect-[4/3]  w-full h-[400px]  overflow-hidden">
                      {project.mediaType === "video" && project.image ? (
                        <HlsPlayer
                          src={project.image}
                          autoPlay={true}
                          controls={false}
                          muted={true}
                          loop={true}
                          fillHeight={true}
                          className="absolute inset-0 w-full object-cover"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      )}
                      {/* Overlay Tags */}
                      <div className="absolute inset-0">
                        <div className="absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4">
                          <div className="flex flex-wrap gap-1 sm:gap-2 justify-end">
                            {project.categories?.slice(0, 4).map((category, i) => (
                              <span key={i} className="rounded-full bg-white px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-medium text-[#063746]">
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Card Content */}
                    <div className="p-3 sm:p-4">
                      {/* Title and Category */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                        <h3 className="font-heading text-sm sm:text-base lg:text-lg font-semibold text-[#063746] transition-colors group-hover:text-[#1CE3F4]">
                          {project.title}
                        </h3>
                        <span className="text-xs sm:text-sm font-medium text-[#063746]/60">
                          ({project.field})
                        </span>
                      </div>
                      {/* Description */}
                      <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-[#063746]/80 leading-relaxed">
                        {project.description || "Lorem Ipsum is simply"}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      )}
      {/* ════════════════════════════════════════════════════════
          4. CTA
          ════════════════════════════════════════════════════════ */}
      {/* <section className="bg-light-bg py-24">
        <div className="flex items-center justify-between px-[60px]">
          <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-[#063746]">
            Let&apos;s design what&apos;s next together.
          </h2>
          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-8 py-4 font-heading text-[15px] font-medium text-[#063746] transition-colors hover:bg-[#1CE3F4]/80"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section> */}
    </>
  );
}
