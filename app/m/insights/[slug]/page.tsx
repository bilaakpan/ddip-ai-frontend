"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { cmsApi, type Insight } from "@/lib/api";

/* ─── Share Icons (mobile-sized) ─── */

function MobileShareIcons() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-light-body">Share:</span>

      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Share on X"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Share on Facebook"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Copy link"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Page ─── */

export default function MobileInsightDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Insight | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    cmsApi
      .insightBySlug(slug)
      .then((res) => setArticle(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    cmsApi
      .insights({ page: 1, limit: 4 })
      .then((res) => {
        setRelatedArticles(
          res.data.filter((a) => a.slug !== slug).slice(0, 3)
        );
      })
      .catch(() => {});
  }, [slug]);

  /* ── Loading state ── */
  if (loading) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center bg-light-bg px-5">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
          <p className="text-[14px] text-light-body/60">Loading article...</p>
        </div>
      </section>
    );
  }

  /* ── Error / Not Found state ── */
  if (error || !article) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-light-bg px-5">
        <h1 className="font-heading text-[28px] font-medium text-light-text">
          Article Not Found
        </h1>
        <p className="mt-3 text-center text-[14px] leading-[1.5] text-light-body">
          The article you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/insights"
          className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-teal-600"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 8H3M7 4L3 8l4 4" />
          </svg>
          Back to Insights
        </Link>
      </section>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          BACK LINK
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pt-6 pb-0">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-wider text-teal-600 transition-colors"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 8H3M7 4L3 8l4 4" />
          </svg>
          Back
        </Link>
      </section>

      {/* ════════════════════════════════════════════════════════
          HERO IMAGE
          ════════════════════════════════════════════════════════ */}
      {article.imageUrl && (
        <section className="bg-light-bg px-5 pt-5">
          <div className="overflow-hidden rounded-[14px]">
            <div className="relative aspect-[16/10]">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          DATE + TITLE + CATEGORY
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pt-6 pb-2">
        <p className="text-[13px] font-medium text-teal-600">
          {formattedDate}
        </p>

        {article.category && (
          <span className="mt-2 inline-block rounded-full bg-teal-500/10 px-3 py-1 text-[11px] font-medium text-teal-600">
            {article.category}
          </span>
        )}

        <h1 className="mt-4 font-heading text-[clamp(24px,7vw,36px)] font-medium leading-[1.15] text-light-text">
          {article.title}
        </h1>

        {/* Author */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20 text-[12px] font-medium text-teal-600">
            D
          </div>
          <p className="text-[13px] font-medium text-light-text">
            DDip AI Team
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ARTICLE BODY (prose)
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-8">
        <div
          className="prose prose-sm max-w-none text-[15px] leading-[1.7] text-light-body [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-[20px] [&_h2]:font-medium [&_h2]:text-light-text [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:font-heading [&_h3]:text-[17px] [&_h3]:font-medium [&_h3]:text-light-text [&_a]:text-teal-600 [&_a:hover]:text-teal-700 [&_p]:mb-4 [&_ul]:mb-4 [&_ol]:mb-4 [&_li]:mb-1 [&_blockquote]:border-l-2 [&_blockquote]:border-teal-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-light-body/80 [&_img]:rounded-[10px]"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </section>

      {/* ════════════════════════════════════════════════════════
          SHARE BUTTONS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-8">
        <div className="h-px bg-border-light" />
        <div className="pt-5">
          <MobileShareIcons />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          RELATED ARTICLES
          ════════════════════════════════════════════════════════ */}
      {relatedArticles.length > 0 && (
        <section className="bg-light-bg px-5 py-12">
          <h2 className="font-heading text-[13px] font-semibold uppercase tracking-widest text-teal-600">
            Related Articles
          </h2>

          <div className="mt-6 flex flex-col gap-5">
            {relatedArticles.map((related) => (
              <Link
                key={related.id}
                href={`/insights/${related.slug}`}
                className="group block"
              >
                <article className="overflow-hidden rounded-[14px] border border-border-light bg-white transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {related.imageUrl ? (
                      <Image
                        src={related.imageUrl}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#002834]/30 to-[#063746]/50" />
                    )}
                    {related.category && (
                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-light-text backdrop-blur-sm">
                          {related.category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <div className="text-[12px] text-light-body/60">
                      {new Date(related.publishedAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </div>
                    <h3 className="mt-2 font-heading text-[16px] font-medium leading-snug text-light-text">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.5] text-light-body line-clamp-2">
                      {related.seoDescription || ""}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[13px] font-medium text-teal-600">
                      <span>Read More</span>
                      <svg
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
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
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          DISCOVER THE MIND BEHIND
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-14">
        <div
          className="rounded-[20px] p-6 text-center"
          style={{
            background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)",
          }}
        >
          <p className="font-heading text-[18px] font-bold text-[#EBFFFF]">
            Discover The Mind Behind
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-[#EBFFFF]/70">
            Meet the creative minds and AI strategists shaping the future of
            digital production.
          </p>
          <Link
            href="/the-mind-behind"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
          >
            Learn More
            <svg
              className="h-3 w-3"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
