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
  { id: "topics", label: "Topics" },
  { id: "ai", label: "AI & Automation" },
  { id: "content", label: "Content" },
  { id: "influencer", label: "Influencer" },
  { id: "consulting", label: "Consulting" },
];
/* ─── Page ─── */
export default function InsightsPage() {
  // Mock data for testing
  const mockArticles: Insight[] = [
    {
      id: "1",
      title: "The Future of AI in Content Creation",
      slug: "future-ai-content",
      category: "Real Estate",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "10 Best AI Ad Creative Generators & Tools in 2026 (Tested)",
      body: "Detailed article content about AI and content creation...",
      imageUrl: "/images/insights/article1.svg"
    },
    {
      id: "2",
      title: "Building Influencer Brands with AI",
      slug: "ai-influencer-brands",
      category: "Food",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "12 AI Consulting Companies for Enterprises in 2026",
      body: "Detailed article content about AI influencers...",
      imageUrl: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/046c3680-7356-4294-690d-482d7d1c5700/public"
    },
    {
      id: "3",
      title: "Automated Workflow Solutions",
      slug: "automated-workflows",
      category: "Wellness",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "15 Best AI Presentation Makers & Tools of 2026 (New Picks)",
      body: "Detailed article content about workflow automation...",
      imageUrl: "/images/insights/article3.svg"
    },
    {
      id: "4",
      title: "The Future of AI in Content Creation",
      slug: "future-ai-content",
      category: "Technology",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "10 Best AI Ad Creative Generators & Tools in 2026 (Tested)",
      body: "Detailed article content about AI and content creation...",
      imageUrl: "/images/insights/article1.svg"
    },
    {
      id: "5",
      title: "Building Influencer Brands with AI",
      slug: "ai-influencer-brands",
      category: "Finance",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "12 AI Consulting Companies for Enterprises in 2026",
      body: "Detailed article content about AI influencers...",
      imageUrl: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/046c3680-7356-4294-690d-482d7d1c5700/public"
    },
    {
      id: "6",
      title: "Automated Workflow Solutions",
      slug: "automated-workflows",
      category: "Education",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "15 Best AI Presentation Makers & Tools of 2026 (New Picks)",
      body: "Detailed article content about workflow automation...",
      imageUrl: "/images/insights/article3.svg"
    },
    {
      id: "7",
      title: "The Future of AI in Content Creation",
      slug: "future-ai-content",
      category: "Healthcare",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "10 Best AI Ad Creative Generators & Tools in 2026 (Tested)",
      body: "Detailed article content about AI and content creation...",
      imageUrl: "/images/insights/article1.svg"
    },
    {
      id: "8",
      title: "Building Influencer Brands with AI",
      slug: "ai-influencer-brands",
      category: "Marketing",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "12 AI Consulting Companies for Enterprises in 2026",
      body: "Detailed article content about AI influencers...",
      imageUrl: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/046c3680-7356-4294-690d-482d7d1c5700/public"
    },
    {
      id: "9",
      title: "Automated Workflow Solutions",
      slug: "automated-workflows",
      category: "E-commerce",
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seoDescription: "15 Best AI Presentation Makers & Tools of 2026 (New Picks)",
      body: "Detailed article content about workflow automation...",
      imageUrl: "/images/insights/article3.svg"
    }
  ];
  const [articles, setArticles] = useState<Insight[]>(mockArticles);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // useEffect(() => {
  //   setLoading(true);
  //   cmsApi
  //     .insights({ page, limit: 15 })
  //     .then((res) => {
  //       if (page === 1) {
  //         setArticles(res.data);
  //       } else {
  //         setArticles((prev) => [...prev, ...res.data]);
  //       }
  //       setTotalPages(res.pagination.totalPages);
  //     })
  //     .catch(() => { })
  //     .finally(() => setLoading(false));
  // }, [page]);
  
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
      </section>


      {/* ════════════════════════════════════════════════════════
          CATEGORY FILTERS + ARTICLE GRID — Light background
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <Container>
          {/* Category filter tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
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
          {/* Featured Article */}
          {/* {featuredArticle && (
            <div className="mt-10">
              <Link
                href={`/insights/${featuredArticle.slug}`}
                className="group block overflow-hidden rounded-[20px] border border-border-light bg-white transition-all hover:shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                
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
          )} */}
          {/* Article Grid — 3 columns */}
          {gridArticles.length > 0 && (
            <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {gridArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="group"
                >
                  <article className="overflow-hidden  bg-white">
                    {/* Image */}
                    <div className="relative aspect-[4/3] h-60 sm:h-72 md:h-80 lg:h-90 overflow-hidden">
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
      </section>
    </>
  );
}