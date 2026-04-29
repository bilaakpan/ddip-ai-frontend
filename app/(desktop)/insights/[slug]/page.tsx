"use client";

/**
 * Dynamic insight detail page (desktop).
 *
 * Was previously a hardcoded static stub that ignored `params.slug`. Rebuilt
 * to fetch by slug from the CMS so admin edits are reflected on the live site.
 *
 * Behavior:
 *   - Reads `slug` from the route via `useParams`.
 *   - Calls `cmsApi.insightBySlug(slug)` once on mount.
 *   - While loading, shows a minimal "Loading article..." block (no fallback content).
 *   - On 404 or error, shows a "Article not found" message with a link back to /insights.
 *   - On success, renders title / date / image / body. Body is HTML stored in the
 *     `body` column and rendered via dangerouslySetInnerHTML (the admin editor
 *     stores rich-text HTML; this matches `app/(desktop)/insights/page.tsx` usage).
 *
 * Mobile counterpart: `app/m/insights/[slug]/page.tsx` mirrors this with the
 * mobile layout.
 */

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cmsApi, type Insight } from "@/lib/api";

/** Format an ISO date string as "Month D, YYYY" — e.g. "April 28, 2026". */
function formatDate(iso?: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/** Short "MM/DD/YY" format for the left rail "Posted On" line. */
function formatShortDate(iso?: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
}

export default function InsightDetailPage() {
    const params = useParams<{ slug: string }>();
    const slug = (params?.slug as string) ?? "";

    const [article, setArticle] = useState<Insight | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (!slug) {
            setLoading(false);
            setNotFound(true);
            return;
        }
        let cancelled = false;
        cmsApi
            .insightBySlug(slug)
            .then((res) => {
                if (cancelled) return;
                const found = res?.data;
                if (!found) {
                    setNotFound(true);
                } else {
                    setArticle(found);
                }
            })
            .catch((err) => {
                console.error("[insights/[slug]] fetch failed:", err);
                if (!cancelled) setNotFound(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [slug]);

    // Loading + not-found states render with minimal scaffold so SEO/UX isn't
    // broken, but no stale article copy is shown.
    if (loading) {
        return (
            <div className="min-h-screen bg-[#f0f4f0] pt-32 pb-20">
                <div className="mx-auto w-full max-w-[1608px] px-[60px] max-md:px-5">
                    <p className="text-xl text-[#063746]">Loading article…</p>
                </div>
            </div>
        );
    }

    if (notFound || !article) {
        return (
            <div className="min-h-screen bg-[#f0f4f0] pt-32 pb-20">
                <div className="mx-auto w-full max-w-[1608px] px-[60px] max-md:px-5">
                    <h1 className="text-4xl font-medium text-[#0d2b3e]">Article not found</h1>
                    <p className="mt-4 text-xl text-[#063746]">
                        We couldn&apos;t find an article at <code className="rounded bg-white/60 px-2">/{slug}</code>.
                    </p>
                    <Link
                        href="/insights"
                        className="mt-8 inline-flex items-center gap-2 text-xl underline font-semibold text-[#0d2b3e] tracking-widest uppercase hover:underline"
                    >
                        All Articles <span>→</span>
                    </Link>
                </div>
            </div>
        );
    }

    const publishedDateLong = formatDate(article.publishedAt || article.createdAt);
    const publishedDateShort = formatShortDate(article.publishedAt || article.createdAt);

    return (
        <div className="min-h-screen bg-[#f0f4f0] font-sans pt-24 pb-8">
            <div className="p-8 sm:p-12 md:p-16 lg:p-20 mx-auto w-full max-w-[1808px] px-[60px] max-md:px-5">

                {/* Date — top of the page above the title */}
                {publishedDateLong && (
                    <p className="text-xl sm:text-2xl md:text-3xl text-[#063746] mb-4 sm:mb-6 tracking-wide">
                        {publishedDateLong}
                    </p>
                )}

                {/* Title — full title rendered as a single H1; the design
                    naturally line-wraps thanks to max-w on the container. */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#0d2b3e] leading-tight max-w-3xl mb-20 sm:mb-30">
                    {article.title}
                </h1>

                <div className="flex flex-col sm:flex-row gap-8">
                    {/* Left Sidebar — posted on / share / all articles */}
                    <div className="flex flex-col gap-4 sm:gap-6 min-w-20 sm:min-w-24 pt-1">
                        <div className="mb-20">
                            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#063746] tracking-widest uppercase mb-1 sm:mb-2">
                                Posted On
                            </p>
                            <p className="text-xl sm:text-2xl md:text-3xl text-[#063746] sm:mb-4">{publishedDateShort}</p>
                        </div>

                        <div className="mb-20">
                            <p className="text-3xl font-semibold text-[#063746] tracking-widest uppercase mb-2">
                                Share Article
                            </p>
                            <div className="px-3 sm:px-4 flex gap-6 sm:gap-8 items-center">
                                {/* LinkedIn */}
                                <a href="#" className="text-[#000000] hover:text-[#0d2b3e] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.75 2.64 4.75 6.07V24h-4v-8.57c0-2.04-.04-4.67-2.85-4.67-2.86 0-3.3 2.23-3.3 4.53V24h-4V8.5z" />
                                    </svg>
                                </a>
                                {/* Twitter/X */}
                                <a href="#" className="text-[#000000] hover:text-[#0d2b3e] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a href="#" className="text-[#000000] hover:text-[#0d2b3e] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Link
                                href="/insights"
                                className="text-xl sm:text-2xl underline font-semibold text-[#0d2b3e] tracking-widest uppercase hover:underline flex items-center gap-1 sm:gap-2"
                            >
                                All Articles <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right column — featured image + body */}
                    <div className="relative flex-1">
                        {article.imageUrl && (
                            <div className="relative w-full h-80 sm:h-100 md:h-125 lg:h-150">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                    priority
                                    unoptimized
                                />
                            </div>
                        )}

                        <div className="p-4 sm:p-8 md:p-12 lg:pr-20 mx-auto w-full max-w-[1608px] px-[60px] max-md:px-5">
                            {/* Optional category tag */}
                            {article.category && (
                                <p className="mb-4 text-sm sm:text-base font-bold tracking-widest uppercase text-[#9F9F9F]">
                                    {article.category}
                                </p>
                            )}

                            {/* Body — admin stores rich text HTML; render directly. */}
                            <div
                                className="prose prose-lg max-w-none text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:md:text-4xl [&_h2]:lg:text-5xl [&_h2]:xl:text-6xl [&_h2]:font-bold [&_h2]:text-[#000000] [&_h2]:leading-tight [&_h2]:mt-6 [&_h2]:sm:mt-8 [&_h2]:mb-3 [&_h2]:sm:mb-4 [&_h2]:md:mb-5 [&_p]:mb-3 [&_p]:sm:mb-4 [&_p]:md:mb-5 [&_a]:underline [&_a]:text-[#0d2b3e]"
                                dangerouslySetInnerHTML={{ __html: article.body || "" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
