"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
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

// Articles come from CMS API only — no mock fallback

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function MobileInsightsPage() {
  const [articles, setArticles] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    cmsApi
      .insights({ page: 1, limit: 50 })
      .then((res) => setArticles(res.data ?? []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          HERO — marquee heading
      ══════════════════════════════════════ */}
      <section className="overflow-hidden bg-[#F6F9F2] pt-10">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center pr-10 font-heading text-[86px]  uppercase leading-none text-dark-bg">
                INSIGHTS
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/309a089d-b47f-4446-fd5b-13db6ee1fe00/public" alt="*" className="mx-6 h-16 w-16 relative top-[0.05em]" />
              </span>
            ))}
          </div>
          <p className="mx-6 text-[22px] font-medium text-dark-bg" style={{ fontFamily: "var(--font-heading)" ,lineHeight:"normal"}}>Creative ideas, practical tips and insider info—the Ddip.ai blog helps your team get great design done at scale.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FILTERS + GRID
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-8">
        {/* Category filter — horizontal scroll */}
        <div
          className="mx-0 flex gap-2 overflow-x-auto pb-2"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition-all whitespace-nowrap",
                  isActive ? "bg-dark-bg text-white" : "text-[#1F3F49] active:bg-[#dcdcdc]"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Article grid — single column on mobile */}
        {(() => {
          const filteredArticles = activeCategory === "all" 
            ? articles 
            : articles.filter(article => {
                // Map categories to filter groups
                const category = article.category || "";
                if (activeCategory === "topics") return ["Real Estate", "Technology", "Finance", "Marketing", "E-commerce"].includes(category);
                if (activeCategory === "ai") return ["Technology", "Finance", "E-commerce"].includes(category);
                if (activeCategory === "content") return ["Marketing", "Real Estate"].includes(category);
                if (activeCategory === "influencer") return ["Food", "Wellness"].includes(category);
                if (activeCategory === "consulting") return ["Healthcare", "Education"].includes(category);
                return false;
              });
          
          return filteredArticles.length > 0 ? (
            <div className="mt-6 flex flex-col gap-8" style={safePx}>
              {filteredArticles.map((article) => (
              <Link key={article.id} href={`/m/insights/${article.slug}`} className="group block">
                <article>
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl h-101.5">
                    {article.imageUrl ? (
                      <Image
                        src={article.imageUrl}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-active:scale-105"
                        sizes="100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-dark-bg/30 to-[#063746]/50" />
                    )}
                    {article.category && (
                      <div className="absolute left-3 top-3">
                        <span className={cn(
                          "rounded-full px-2.5 py-1 text-[11px] font-medium text-black backdrop-blur-sm",
                          ["Food", "Healthcare", "Education", "Wellness"].includes(article.category)
                            ? "bg-[#D7DBC0]/90"
                            : "bg-[#DBC0CD]/90"
                        )}>
                          {article.category}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Title */}
                  <div className="mt-3 px-1">
                    <h3 className="font-heading text-[20px] leading-snug text-[#063746]">
                      {article.seoDescription}
                    </h3>
           
                  </div>
                </article>
              </Link>
            ))}
          </div>
          ) : (
            <p className="py-16 text-center text-[14px] text-[#063746]/60" style={safePx}>No articles found for this category.</p>
          );
        })()}
        {/* View More */}
        
      </section>

      {/* ══════════════════════════════════════
          THE MIND BEHIND — marquee footer
      ══════════════════════════════════════ */}
      <section
        className="overflow-hidden bg-[#F6F9F2] py-10"
        style={{ paddingBottom: "max(40px, calc(16px + env(safe-area-inset-bottom)))" }}
      >
        <div className="flex justify-center items-center flex-col" style={safePx}>
          <button
            disabled={loading}
            className="flex items-center gap-2 text-[22px] font-semibold text-[#126478] disabled:opacity-50 active:text-[#00b3c3]"
          >
            LOAD MORE
          </button>
          <button
            disabled={loading}
            className="mt-20 flex items-center gap-2 text-[22px] underline font-semibold text-[#039EB7] disabled:opacity-50 active:text-[#00b3c3]"
          >
            Discover The Mind Behind
          </button>
        </div>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center pr-10 font-heading text-[85px] uppercase leading-none text-[#145365]">
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-6 h-16 w-16 relative top-[0.05em]" />
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center pr-10 font-heading text-[85px] uppercase leading-none text-[#145365]">
                The Mind Behind
                <img src="/images/common/star.svg" alt="*" className="mx-6 h-16 w-16 relative top-[0.05em]" />
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
