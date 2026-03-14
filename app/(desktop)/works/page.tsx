"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { cmsApi, type Work } from "@/lib/api";

/* ─── Fallback static projects (shown while CMS loads or if empty) ─── */

const staticProjects = [
  {
    id: "1",
    title: "Cozy Mediterranean",
    field: "Food & Drink",
    categories: ["Food & Drink", "Logo Design"],
    image: "/images/works/grid-r1-c1.jpg",
  },
  {
    id: "2",
    title: "Luxury Coastal Villa",
    field: "Real Estate",
    categories: ["Real Estate", "Logo Design"],
    image: "/images/works/grid-r1-c2.jpg",
  },
  {
    id: "3",
    title: "Modern Living Space",
    field: "Interior Design",
    categories: ["Interior Design"],
    image: "/images/works/grid-r1-c3.jpg",
  },
  {
    id: "4",
    title: "Brand Renewal",
    field: "Branding",
    categories: ["Interior Design"],
    image: "/images/works/grid-r1-c4.jpg",
  },
  {
    id: "5",
    title: "Downtown Co-Living",
    field: "Real Estate",
    categories: ["Real Estate"],
    image: "/images/works/grid-r2-c1.jpg",
  },
  {
    id: "6",
    title: "Harbor View Estate",
    field: "Real Estate",
    categories: ["Real Estate", "Branding"],
    image: "/images/works/grid-r2-c2.jpg",
  },
  {
    id: "7",
    title: "Strategic Growth",
    field: "Strategy & Solutions",
    categories: ["Strategy & Solutions"],
    image: "/images/works/grid-r2-c3.jpg",
  },
  {
    id: "8",
    title: "Studio Lighting",
    field: "AI Solutions",
    categories: ["AI Solutions"],
    image: "/images/works/grid-r2-c4.jpg",
  },
  {
    id: "9",
    title: "Heritage Brand Identity",
    field: "Branding",
    categories: ["Branding"],
    image: "/images/works/grid-r3-c1.jpg",
  },
  {
    id: "10",
    title: "Skyline Apartments",
    field: "Real Estate",
    categories: ["Real Estate"],
    image: "/images/works/grid-r3-c2.jpg",
  },
  {
    id: "11",
    title: "Creative Direction",
    field: "Logo Design",
    categories: ["Logo Design"],
    image: "/images/works/grid-r3-c3.jpg",
  },
  {
    id: "12",
    title: "Campaign Production",
    field: "Strategy & Solutions",
    categories: ["Strategy & Solutions"],
    image: "/images/works/grid-r3-c4.jpg",
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
  const [activeFilter, setActiveFilter] = useState("All");
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsApi
      .works()
      .then((res) => {
        if (res.data?.length) setWorks(res.data);
      })
      .catch(() => {})
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
        image: w.mediaUrl || "/images/works/grid-r1-c1.jpg",
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

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "WORK ✻ WORK ✻ WO..."
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pb-12 pt-40">
        {/* Marquee heading */}
        <div className="whitespace-nowrap overflow-hidden px-[60px]">
          <h1
            className="inline-block font-heading font-normal uppercase text-[#063746]"
            style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
          >
            WORK{" "}
            <span className="mx-3 text-[#1CE3F4]">✻</span>{" "}
            WORK{" "}
            <span className="mx-3 text-[#1CE3F4]">✻</span>{" "}
            WO
            <span className="text-[#063746]/20">RK</span>
          </h1>
        </div>

        {/* Subtitle + CTAs */}
        <div className="mt-8 flex items-end justify-between px-[60px]">
          <p
            className="max-w-md text-[15px] leading-[1.6] text-[#063746]/60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            See how we partner with visionary teams to build brands that stand
            out and push the boundaries of innovation.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/lets-connect"
              className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-8 py-3 font-heading text-[14px] font-medium text-[#063746] transition-colors hover:bg-[#1CE3F4]/80"
            >
              Talk To Us
            </Link>
            <button
              onClick={() => setActiveFilter("All")}
              className="inline-flex items-center gap-2 rounded-full border border-[#063746]/20 px-8 py-3 font-heading text-[14px] font-medium text-[#063746] transition-colors hover:border-[#063746]/40"
            >
              All Projects
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. FILTER TABS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pb-8 pt-4">
        <div className="flex flex-wrap items-center gap-3 px-[60px]">
          {filterOptions.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-6 py-2.5 font-heading text-[13px] font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? "border-[#1CE3F4] bg-[#1CE3F4] text-[#063746]"
                  : "border-[#063746]/15 bg-transparent text-[#063746]/60 hover:border-[#063746]/30 hover:text-[#063746]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. PROJECT GRID — 4 columns
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pb-24">
        <div className="px-[60px]">
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
            <div className="grid grid-cols-4 gap-x-6 gap-y-12">
              {filteredProjects.map((project) => (
                <Link
                  key={project.id}
                  href="/works"
                  className="group"
                >
                  {/* Image card */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                    {"mediaType" in project &&
                    project.mediaType === "video" &&
                    project.image ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      >
                        <source src={project.image} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="25vw"
                      />
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#063746]/0 transition-colors duration-300 group-hover:bg-[#063746]/30" />

                    {/* Hover action icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                        <svg
                          className="h-5 w-5 text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Category tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {(project.categories || [project.field]).map(
                      (cat, i) =>
                        cat && (
                          <span
                            key={i}
                            className="text-[11px] font-medium uppercase tracking-wider text-[#063746]/40"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {cat}
                            {i <
                              (project.categories || [project.field]).filter(Boolean)
                                .length -
                                1 && (
                              <span className="ml-2 text-[#063746]/20">·</span>
                            )}
                          </span>
                        )
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="mt-1.5 font-heading text-[16px] font-medium text-[#063746] transition-colors group-hover:text-[#1CE3F4]">
                    {project.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. CTA
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
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
      </section>
    </>
  );
}
