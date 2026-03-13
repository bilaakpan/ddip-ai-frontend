"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { cn } from "@/lib/utils";
import { cmsApi, type Insight } from "@/lib/api";

/* ─── Constants ─── */

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "topics", label: "Topics" },
  { id: "ai", label: "AI & Automation" },
  { id: "content", label: "Content" },
  { id: "influencer", label: "Influencer" },
  { id: "consulting", label: "Consulting" },
];

/* ─── Page ─── */

export default function InsightsPage() {
  const [articles, setArticles] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    cmsApi
      .insights({ page, limit: 15 })
      .then((res) => {
        if (page === 1) {
          setArticles(res.data);
        } else {
          setArticles((prev) => [...prev, ...res.data]);
        }
        setTotalPages(res.pagination.totalPages);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO — Dark bg with marquee-style heading
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-dark-bg pt-20 pb-12">
        <Container>
          <div className="overflow-hidden">
            <h1 className="whitespace-nowrap font-heading text-[clamp(60px,8vw,140px)] font-medium uppercase leading-[1.05] text-white">
              INSIGHTS{" "}
              <span className="mx-4 inline-block text-[#1CE3F4]">✻</span>{" "}
              INSIGHTS{" "}
              <span className="mx-4 inline-block text-[#1CE3F4]">✻</span>{" "}
              <span className="text-white/20">IN</span>
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-body-sm leading-[1.7] text-white/50">
            Creative ideas, practical tips and insider info — the DDip.AI blog
            helps your team get great design done at scale.
          </p>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════
          CATEGORY FILTERS + ARTICLE GRID — Light background
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <Container>
          {/* Category filter tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "rounded-full border px-5 py-2 text-[13px] font-medium transition-all",
                  activeCategory === cat.id
                    ? "border-[#002834] bg-[#002834] text-white"
                    : "border-border-light bg-white text-light-body hover:border-light-text/30"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mt-10">
              <Link
                href={`/insights/${featuredArticle.slug}`}
                className="group block overflow-hidden rounded-[20px] border border-border-light bg-white transition-all hover:shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {featuredArticle.imageUrl ? (
                      <Image
                        src={featuredArticle.imageUrl}
                        alt={featuredArticle.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#002834]/40 to-[#063746]/60" />
                    )}
                    <div className="absolute left-5 top-5">
                      <span className="rounded-full bg-[#1CE3F4] px-4 py-1.5 text-[11px] font-semibold text-[#002834]">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-10">
                    {featuredArticle.category && (
                      <span className="text-[12px] font-medium uppercase tracking-wider text-[#1CE3F4]">
                        {featuredArticle.category}
                      </span>
                    )}
                    <h2 className="mt-3 font-heading text-[clamp(22px,2.5vw,36px)] font-medium leading-[1.2] text-light-text">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-4 text-[14px] leading-[1.6] text-light-body line-clamp-3">
                      {featuredArticle.seoDescription ||
                        featuredArticle.body?.slice(0, 200)}
                    </p>
                    <div className="mt-5 text-[12px] text-light-body/60">
                      {new Date(
                        featuredArticle.publishedAt
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-[14px] font-medium text-[#1CE3F4] transition-colors group-hover:text-[#00b3c3]">
                      <span>Read Article</span>
                      <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Article Grid — 3 columns */}
          {gridArticles.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden rounded-[14px] border border-border-light bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#002834]/30 to-[#063746]/50" />
                      )}
                      {article.category && (
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-light-text backdrop-blur-sm">
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <h3 className="font-heading text-[16px] font-medium leading-snug text-light-text">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.5] text-light-body line-clamp-2">
                        {article.seoDescription || ""}
                      </p>
                      <div className="mt-4 text-[12px] text-light-body/60">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Loading state */}
          {loading && articles.length === 0 && (
            <div className="py-20 text-center text-light-body">
              Loading articles...
            </div>
          )}

          {/* Empty state */}
          {!loading && articles.length === 0 && (
            <div className="py-20 text-center text-light-body">
              No articles published yet. Check back soon.
            </div>
          )}

          {/* View More */}
          {page < totalPages && (
            <div className="mt-12 flex justify-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={loading}
                className="flex items-center gap-2 text-[14px] font-medium text-[#1CE3F4] transition-colors hover:text-[#00b3c3] disabled:opacity-50"
              >
                {loading ? "Loading..." : "View More Articles"}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 3v10M4 9l4 4 4-4" />
                </svg>
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════
          DISCOVER — Links to other pages
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <Container>
          <div className="flex flex-wrap items-center gap-6 text-[14px]">
            <span className="font-medium text-light-body">Discover:</span>
            <Link
              href="/the-mind-behind"
              className="font-medium text-light-text underline underline-offset-4 transition-colors hover:text-[#1CE3F4]"
            >
              The Mind Behind
            </Link>
            <Link
              href="/#solutions"
              className="font-medium text-light-text underline underline-offset-4 transition-colors hover:text-[#1CE3F4]"
            >
              Explore Our AI Solutions
            </Link>
          </div>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════
          THE MIND BEHIND — Dark marquee section
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-dark-bg py-16">
        <Container>
          <div className="overflow-hidden">
            <p className="whitespace-nowrap font-heading text-[clamp(48px,7vw,120px)] font-medium uppercase leading-[1.05] text-white">
              THE MIND BEHIND{" "}
              <span className="mx-4 inline-block text-[#1CE3F4]">✻</span>{" "}
              THE MIND BEHIND{" "}
              <span className="mx-4 inline-block text-[#1CE3F4]">✻</span>{" "}
              <span className="text-white/20">TH</span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
