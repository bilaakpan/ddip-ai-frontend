"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { cn } from "@/lib/utils";
import { cmsApi, type Insight } from "@/lib/api";
import { h1 } from "framer-motion/client";
/* ─── Constants ─── */
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "Real Estate", label: "Real Estate" },
  { id: "Food", label: "Food" },
  { id: "Fashion", label: "Fashion" },
  { id: "Tech & Digital", label: "Tech & Digital" },
  { id: "Wellness", label: "Wellness" },
  { id: "Consulting", label: "Consulting" },
];
/* ─── Page ─── */
export default function InsightsPage() {
  // Articles come from CMS API only — no mock fallback
  const [articles, setArticles] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");

  // ─── Load insights from CMS API (no fallback — empty if API returns nothing) ───
  useEffect(() => {
    setLoading(true);
    cmsApi
      .insights({ page, limit: 15 })
      .then((res) => {
        const list = res.data ?? [];
        if (page === 1) {
          setArticles(list);
        } else {
          setArticles((prev) => [...prev, ...list]);
        }
        setTotalPages(res.pagination?.totalPages ?? 1);
      })
      .catch(() => {
        if (page === 1) setArticles([]);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const featuredArticle = articles[0];
  const gridArticles = articles; // Show all articles instead of slicing
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO — Dark bg with marquee-style heading
          ════════════════════════════════════════════════════════ */}


      <section className="overflow-hidden bg-[#F6F9F2] mt-30">
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(64px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              INSIGHTS{" "}
              <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
            </h1>
            <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(64px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              INSIGHTS{" "}
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              INSIGHTS{" "}
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
            </h1>
          </div>
        </div>
        <p className="mt-6 text-left text-[44px] max-w-[1287px] leading-none text-[#063746] px-30 font-{var(--font-heading)]">
          Creative ideas, practical tips and insider info—the Ddip.ai blog helps your team get great design done at scale.
        </p>
      </section>


      {/* ════════════════════════════════════════════════════════
          CATEGORY FILTERS + ARTICLE GRID — Light background
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <Container>
          {/* Category filter tabs */}
          <div className="flex flex-wrap items-center jusstify-between gap-14">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-[22px] font-medium transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "bg-dark-bg text-white"
                      : "text-[#1F3F49] hover:bg-[#dcdcdc]"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Article Grid — 3 columns */}
          {gridArticles.length > 0 && (
            <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 xl:grid-cols-3">
              {gridArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden bg-transparent">
                    {/* Image */}
                    <div className="relative aspect-[16/9] h-[583px] overflow-hidden">
                      {article.imageUrl ? (
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-md"
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#002834]/30 to-[#063746]/50" />
                      )}
                      {article.category && (
                        <div className="absolute left-4 top-4">
                          <span className={cn(
                            "rounded-full px-2 py-1 text-xs sm:text-sm font-medium text-black backdrop-blur-sm",
                            (article.category === "Food" || article.category === "Healthcare" || article.category === "Education" || article.category === "Wellness")
                              ? "bg-[#D7DBC0]/90"
                              : "bg-[#DBC0CD]/90"
                          )}>
                            {article.category}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Card Body */}
                    <div className="mt-6 sm:mt-8 md:mt-10 px-2 sm:px-4">
                      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-medium leading-snug text-light-text capitalize">
                        {article.seoDescription}
                      </h3>
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
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-medium text-dark-bg transition-colors hover:text-[#00b3c3] disabled:opacity-50 underline"
            >
              {loading ? "Loading..." : "View More Articles "}
              <svg
                className="h-5 w-5 sm:h-6 w-6 lg:h-7 w-7"
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
        </Container>
      </section>
      {/* ════════════════════════════════════════════════════════
          DISCOVER — Links to other pages
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6 text-[14px]">
            <Link
              href="/the-mind-behind"
              className="font-medium text-3xl text-light-text underline underline-offset-4 transition-colors hover:text-[#1CE3F4]"
            >
              Discover The Mind Behind
            </Link>
            <Link
              href="/#solutions"
              className="font-medium text-3xl text-light-text underline underline-offset-4 transition-colors hover:text-[#1CE3F4]"
            >
              Explore Our AI Solutions
            </Link>
          </div>
        </Container>
      </section>
      {/* ════════════════════════════════════════════════════════
          THE MIND BEHIND — Dark marquee section
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-[#F6F9F2] py-16">
        <Container>
          <div className="w-full overflow-hidden">
            <div className="flex w-max animate-marquee">
              <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
              </h1>
              <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              </h1>
            </div>
          </div>
        </Container>
        <Container>
          <div className="w-full overflow-hidden">
            <div className="flex w-max animate-marquee">
              <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
              </h1>
              <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              </h1>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}