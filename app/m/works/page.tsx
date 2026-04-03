"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { cmsApi, type Work } from "@/lib/api";
import { Stream } from "@cloudflare/stream-react";
/* ── Component ────────────────────────────────────────── */

export default function MobileWorksPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cmsApi
      .works()
      .then((res) => {
        if (res.data?.length) setWorks(res.data);
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  // Build filter categories from work fields
  const filters = useMemo(() => {
    const fields = [...new Set(works.map((w) => w.field).filter(Boolean))];
    return ["All", ...fields] as string[];
  }, [works]);

  const filteredProjects =
    activeFilter === "All"
      ? works
      : works.filter((w) => w.field === activeFilter);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-light-bg px-5 py-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-teal-600">
          Portfolio
        </p>
        <h1 className="mt-2 font-heading text-[clamp(32px,9vw,48px)] font-bold uppercase leading-[1.05] text-light-text">
          SELECTED
          <br />
          WORK
        </h1>
        <p className="mt-4 max-w-[90%] text-[15px] leading-[1.5] text-light-body">
          A curated collection of projects where AI meets design. From CGI real
          estate visuals to full-scale brand identities, each project showcases
          the creative power of human insight amplified by artificial
          intelligence.
        </p>
      </section>

      {/* ─── Filter Tabs ─── */}
      <section className="bg-light-bg px-5 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-5 py-2 font-heading text-[13px] font-medium transition-all duration-300 ${activeFilter === filter
                ? "border-teal-500 bg-teal-500 text-[#002834]"
                : "border-light-text/20 bg-transparent text-light-text/70"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Portfolio Grid ─── */}
      <section className="bg-light-bg px-5 pb-14">
        {loading ? (
          <div className="py-20 text-center text-light-body/50">
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-heading text-[18px] font-medium text-light-text/50">
              No projects in this category yet.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-4 text-[14px] text-teal-600 underline underline-offset-4"
            >
              View all projects
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredProjects.map((work) => (
              <Link key={work.id} href="/works" className="group">
                {/* Media card */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
                  {work.mediaType === "video" && work.mediaUrl ? (
                    <Stream
                      src={work.mediaUrl}
                      controls={false}
                      autoplay
                      muted
                      loop
                      className="absolute inset-0 h-full w-full object-cover"
                    />

                  ) : work.mediaUrl ? (
                    <img
                      src={work.mediaUrl}
                      alt={work.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#002834] to-[#063746]">
                      <span className="font-heading text-[32px] font-bold text-white/10">
                        {work.title?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-dark-bg/0 transition-colors duration-300 group-hover:bg-dark-bg/40" />

                  {/* Action icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
                      <svg
                        className="h-4 w-4 text-white"
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

                {/* Text below card */}
                <div className="mt-3">
                  <h3 className="font-heading text-[15px] font-medium text-light-text">
                    {work.title}
                  </h3>
                  <p className="mt-1 text-[12px] uppercase tracking-wider text-light-body/60">
                    {work.field || ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-dark-bg px-5 py-14">
        <div className="text-center">
          <p className="text-[12px] uppercase tracking-widest text-white/50">
            Ready to create something extraordinary?
          </p>
          <h2 className="mt-3 font-heading text-[clamp(28px,8vw,40px)] font-medium uppercase leading-[1.05] text-white">
            HAVE A PROJECT
            <br />
            IN MIND?
          </h2>
          <p className="mt-4 text-[15px] leading-[1.5] text-white/50">
            Let&apos;s bring your vision to life with the perfect blend of AI
            technology and creative expertise.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
            >
              Start a Project
            </Link>
            <Link
              href="/lets-connect"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-medium text-white"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
