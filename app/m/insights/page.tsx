"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { cmsApi, type Insight } from "@/lib/api";

/* ─── Fallback articles (shown while CMS loads) ─── */

const fallbackArticles: Omit<Insight, "createdAt" | "updatedAt">[] = [
  {
    id: "1",
    title: "10 Best AI Ad Creative Generators & Tools in 2026 (Tested)",
    slug: "best-ai-ad-creative-generators-2026",
    category: "Real Estate",
    imageUrl: "/images/mobile/sections/27.png",
    body: "",
    publishedAt: "2026-02-15T10:00:00Z",
    seoDescription:
      "Discover the top AI-powered ad creative generators reshaping real estate marketing in 2026.",
  },
  {
    id: "2",
    title: "12 AI Consulting Companies for Enterprises in 2026",
    slug: "ai-consulting-companies-enterprises-2026",
    category: "Food",
    imageUrl: "/images/mobile/sections/27-1.png",
    body: "",
    publishedAt: "2026-02-10T10:00:00Z",
    seoDescription:
      "A curated list of the leading AI consulting firms helping enterprise brands scale intelligent solutions.",
  },
  {
    id: "3",
    title: "AI-Powered Wellness Campaigns That Actually Convert",
    slug: "ai-wellness-campaigns-convert",
    category: "Wellness",
    imageUrl: "/images/mobile/sections/27-2.png",
    body: "",
    publishedAt: "2026-02-05T10:00:00Z",
    seoDescription:
      "How wellness brands are leveraging AI to create campaigns that drive engagement and conversions.",
  },
  {
    id: "4",
    title: "How Fashion Brands Use AI Influencers to Drive Sales",
    slug: "fashion-brands-ai-influencers",
    category: "Fashion",
    imageUrl: "/images/mobile/sections/27-3.png",
    body: "",
    publishedAt: "2026-01-28T10:00:00Z",
    seoDescription:
      "Explore how fashion labels are adopting AI-generated influencers to boost brand visibility and sales.",
  },
  {
    id: "5",
    title: "The Future of AI Content in Real Estate Marketing",
    slug: "future-ai-content-real-estate",
    category: "Real Estate",
    imageUrl: "/images/mobile/sections/A_01 1.png",
    body: "",
    publishedAt: "2026-01-20T10:00:00Z",
    seoDescription:
      "Real estate marketers are turning to AI for property visuals, virtual staging, and personalized outreach.",
  },
  {
    id: "6",
    title: "5 Automation Workflows Every Food Brand Needs",
    slug: "automation-workflows-food-brands",
    category: "Food",
    imageUrl: "/images/mobile/sections/BB_01 1.png",
    body: "",
    publishedAt: "2026-01-15T10:00:00Z",
    seoDescription:
      "Streamline your food brand operations with these essential AI-powered automation workflows.",
  },
];

/* ─── Filter categories ─── */

const FILTER_CATEGORIES = [
  "All",
  "Real Estate",
  "Food",
  "Fashion",
  "Wellness",
  "AI & Automation",
  "Content",
  "Consulting",
];

/* ─── Page ─── */

export default function MobileInsightsPage() {
  const [articles, setArticles] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    cmsApi
      .insights({ page, limit: 6 })
      .then((res) => {
        if (page === 1) {
          setArticles(res.data);
        } else {
          setArticles((prev) => [...prev, ...res.data]);
        }
        setTotalPages(res.pagination.totalPages);
      })
      .catch(() => {
        // Use fallback data if CMS is unavailable
        if (page === 1) setArticles(fallbackArticles as Insight[]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  /* Build dynamic filter list from articles + static list */
  const filters = useMemo(() => {
    const articleCategories = Array.from(
      new Set(articles.map((a) => a.category).filter(Boolean))
    ) as string[];
    const merged = Array.from(
      new Set([...FILTER_CATEGORIES, ...articleCategories])
    );
    return ["All", ...merged.filter((f) => f !== "All")];
  }, [articles]);

  const filteredArticles =
    activeFilter === "All"
      ? articles
      : articles.filter((a) => a.category === activeFilter);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO — Marquee heading on light cream background
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-light-bg px-5 pt-10 pb-8">
        {/* Marquee-style heading */}
        <div className="overflow-hidden">
          <h1 className="whitespace-nowrap font-heading text-[clamp(40px,12vw,56px)] font-medium uppercase leading-[1.05] text-light-text">
            INSIGHTS{" "}
            <span className="mx-2 inline-block text-[#1CE3F4]">&#10043;</span>{" "}
            INSIGHTS{" "}
            <span className="mx-2 inline-block text-[#1CE3F4]">&#10043;</span>{" "}
            <span className="text-light-text/20">IN</span>
          </h1>
        </div>

        <p className="mt-4 text-[15px] leading-[1.6] text-light-body">
          Creative ideas, practical tips and insider info&mdash;the Ddip.ai blog
          helps your team get great design done at scale.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════
          FILTER PILLS — Horizontally scrollable
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-6">
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 rounded-full border px-5 py-2 text-[13px] font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "border-[#063746] bg-[#063746] text-white"
                  : "border-border-light bg-transparent text-light-body"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ARTICLE CARDS — Single column, stacked
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-10">
        {loading && articles.length === 0 ? (
          <div className="py-16 text-center text-light-body/50">
            Loading articles...
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="font-heading text-[16px] font-medium text-light-text/50">
              No articles in this category yet.
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-3 text-[14px] text-[#126478] underline underline-offset-4"
            >
              View all articles
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/insights/${article.slug}`}
                className="group block"
              >
                <article>
                  {/* Image with category pill overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[14px]">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-active:scale-105"
                        sizes="100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#002834]/30 to-[#063746]/50" />
                    )}

                    {/* Category pill — top-left */}
                    {article.category && (
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-[#F6F9F2]/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-light-text backdrop-blur-sm">
                          {article.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title + date */}
                  <div className="mt-3">
                    <h3 className="font-heading text-[16px] font-medium leading-snug text-light-text">
                      {article.title}
                    </h3>
                    {article.seoDescription && (
                      <p className="mt-1.5 text-[13px] leading-[1.5] text-light-body line-clamp-2">
                        {article.seoDescription}
                      </p>
                    )}
                    <p className="mt-2 text-[12px] text-light-body/50">
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* LOAD MORE button */}
        {page < totalPages && !loading && filteredArticles.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="rounded-full border border-[#063746] px-8 py-3 text-[13px] font-semibold uppercase tracking-wider text-[#063746] transition-colors active:bg-[#063746] active:text-white"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {/* Loading indicator for next page */}
        {loading && articles.length > 0 && (
          <div className="mt-6 text-center text-[13px] text-light-body/50">
            Loading more articles...
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          DISCOVER — Links section
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-10">
        <p className="mb-3 font-heading text-[13px] uppercase tracking-widest text-[#126478]">
          Discover
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/the-mind-behind"
            className="text-[15px] font-medium text-light-text underline underline-offset-4"
          >
            The Mind Behind
          </Link>
          <Link
            href="/works"
            className="text-[15px] font-medium text-light-text underline underline-offset-4"
          >
            Explore Our Work
          </Link>
          <Link
            href="/ai-solutions/ai-content"
            className="text-[15px] font-medium text-light-text underline underline-offset-4"
          >
            AI Solutions
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE MIND BEHIND — Dark marquee at bottom
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-dark-bg py-12">
        <div className="overflow-hidden px-5">
          <p className="whitespace-nowrap font-heading text-[clamp(36px,10vw,48px)] font-medium uppercase leading-[1.05] text-white">
            THE MIND BEHIND{" "}
            <span className="mx-2 inline-block text-[#1CE3F4]">&#10043;</span>{" "}
            THE MIND BEHIND{" "}
            <span className="mx-2 inline-block text-[#1CE3F4]">&#10043;</span>{" "}
            <span className="text-white/20">TH</span>
          </p>
        </div>
      </section>
    </>
  );
}
