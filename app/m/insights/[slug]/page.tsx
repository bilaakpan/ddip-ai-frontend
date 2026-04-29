"use client";

/**
 * Dynamic insight detail page (mobile).
 *
 * Mirrors `app/(desktop)/insights/[slug]/page.tsx` with a mobile-friendly
 * single-column layout. Was previously a hardcoded static stub; rebuilt
 * to fetch by slug from the CMS so admin edits show on the live site.
 */

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cmsApi, type Insight } from "@/lib/api";

function formatDate(iso?: string): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function InsightDetailMobilePage() {
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
                if (!found) setNotFound(true);
                else setArticle(found);
            })
            .catch((err) => {
                console.error("[m/insights/[slug]] fetch failed:", err);
                if (!cancelled) setNotFound(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f0f4f0] pt-24 pb-8">
                <div className="px-5">
                    <p className="text-base text-[#063746]">Loading article…</p>
                </div>
            </div>
        );
    }

    if (notFound || !article) {
        return (
            <div className="min-h-screen bg-[#f0f4f0] pt-24 pb-8">
                <div className="px-5">
                    <Link href="/m/insights" className="flex items-center gap-2 text-[#063746]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-[18px] text-[#0A7D94]">BACK</span>
                    </Link>
                    <h1 className="mt-8 text-3xl font-medium text-[#0d2b3e]">Article not found</h1>
                    <p className="mt-3 text-base text-[#063746]">
                        We couldn&apos;t find an article at <code className="rounded bg-white/60 px-1">/{slug}</code>.
                    </p>
                </div>
            </div>
        );
    }

    const dateText = formatDate(article.publishedAt || article.createdAt);

    return (
        <div className="min-h-screen bg-[#f0f4f0] pt-24 pb-8">
            <div className="p-8 mx-auto w-full px-5">
                <div className="flex flex-col">
                    <Link href="/m/insights" className="flex items-center gap-2 text-[#063746] hover:text-[#0d2b3e] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-[22px] text-[#0A7D94]">BACK</span>
                    </Link>

                    <div className="relative flex-1">
                        {article.imageUrl && (
                            <div className="relative w-full h-50 mt-4">
                                <Image
                                    src={article.imageUrl}
                                    alt={article.title}
                                    fill
                                    className="object-cover rounded-xl"
                                    sizes="100vw"
                                    priority
                                    unoptimized
                                />
                            </div>
                        )}

                        <div className="mt-4">
                            {dateText && (
                                <p className="text-base text-[#063746] mb-2 tracking-wide">
                                    {dateText}
                                </p>
                            )}

                            <h1 className="text-2xl font-medium text-[#0d2b3e] leading-tight mb-6">
                                {article.title}
                            </h1>

                            {article.category && (
                                <p className="mb-3 text-xs font-bold tracking-widest uppercase text-[#9F9F9F]">
                                    {article.category}
                                </p>
                            )}

                            <div
                                className="prose max-w-none text-base text-black leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2 [&_p]:mb-3 [&_a]:underline [&_a]:text-[#0d2b3e]"
                                dangerouslySetInnerHTML={{ __html: article.body || "" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
