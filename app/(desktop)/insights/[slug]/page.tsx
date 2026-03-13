"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { cmsApi, type Insight } from "@/lib/api";

/* ─── Share Icons ─── */

function ShareIcons() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-light-body">Share:</span>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Share on X"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </button>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Share on LinkedIn"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Share on Facebook"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      <button
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light text-light-body transition-colors hover:border-teal-500 hover:text-teal-700"
        aria-label="Copy link"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Page ─── */

export default function InsightDetailPage() {
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
        setRelatedArticles(res.data.filter((a) => a.slug !== slug).slice(0, 3));
      })
      .catch(() => {});
  }, [slug]);

  if (loading) {
    return (
      <section className="bg-dark-bg py-32">
        <Container>
          <div className="text-center text-white/40">Loading article...</div>
        </Container>
      </section>
    );
  }

  if (error || !article) {
    return (
      <section className="bg-dark-bg py-32">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-4xl font-medium text-white">Article Not Found</h1>
            <p className="mt-4 text-white/50">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/insights" className="mt-8 inline-block text-teal-500 underline underline-offset-4 hover:text-teal-400">
              Back to Insights
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* BACK LINK */}
      <section className="bg-dark-bg pb-0 pt-8">
        <Container>
          <Link href="/insights" className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-teal-500">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 8H3M7 4L3 8l4 4" />
            </svg>
            Back to Insights
          </Link>
        </Container>
      </section>

      {/* ARTICLE HEADER */}
      <section className="bg-dark-bg py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            {article.category && (
              <span className="rounded-full bg-teal-500/15 px-4 py-1.5 text-xs font-medium text-teal-500">
                {article.category}
              </span>
            )}
            <h1 className="mt-6 font-heading text-[clamp(36px,4vw,64px)] font-medium leading-[1.1] text-white">
              {article.title}
            </h1>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-sm font-medium text-teal-500">D</div>
              <div>
                <p className="text-sm font-medium text-white">DDip AI Team</p>
                <div className="flex items-center gap-3 text-xs text-white/40">
                  <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HERO IMAGE */}
      {article.imageUrl && (
        <section className="bg-dark-bg pb-16">
          <Container>
            <div className="aspect-[21/9] w-full overflow-hidden rounded-[var(--radius-card)]">
              <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover" />
            </div>
          </Container>
        </section>
      )}

      {/* ARTICLE BODY */}
      <section className="bg-light-bg py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div
              className="prose prose-lg max-w-none text-light-body [&_h2]:font-heading [&_h2]:text-light-text [&_h3]:font-heading [&_h3]:text-light-text [&_a]:text-teal-600 [&_a:hover]:text-teal-700"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
            <div className="my-12 h-px bg-border-light" />
            <ShareIcons />
          </div>
        </Container>
      </section>

      {/* RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <section className="bg-dark-bg py-24 lg:py-32">
          <Container>
            <h2 className="font-heading text-subsection font-medium uppercase text-white">Related Articles</h2>
            <div className="mt-12 grid grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/insights/${related.slug}`} className="group">
                  <article className="overflow-hidden rounded-[var(--radius-card)] border border-border-dark bg-dark-surface transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5">
                    <div className="relative aspect-video overflow-hidden">
                      {related.imageUrl ? (
                        <img src={related.imageUrl} alt={related.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 to-dark-surface" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/60 to-transparent" />
                      {related.category && (
                        <div className="absolute left-4 top-4">
                          <span className="rounded-full bg-dark-bg/60 px-3 py-1 text-[11px] font-medium text-teal-500 backdrop-blur-sm">{related.category}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span>{new Date(related.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                      <h3 className="mt-3 font-heading text-lg font-medium leading-snug text-white">{related.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/45 line-clamp-2">{related.seoDescription || ""}</p>
                      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-teal-500 transition-colors group-hover:text-teal-400">
                        <span>Read More</span>
                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* NEWSLETTER CTA */}
      <section className="border-t border-border-dark bg-dark-bg py-24 lg:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-[clamp(36px,4vw,64px)] font-medium uppercase leading-[1.1] text-white">Want to Learn More?</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Subscribe to our newsletter for the latest insights on AI-powered creative production, industry analysis, and exclusive content.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <input type="email" placeholder="Enter your email address" className="h-12 flex-1 rounded-[var(--radius-input)] border border-[#2A2F3E] bg-[#1A1F2E] px-5 text-sm text-white placeholder:text-white/40 transition-colors focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 hover:border-white/20" />
              <Button variant="primary" size="md">Subscribe</Button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Link href="/start-project"><Button variant="secondary" size="lg">Start a Project</Button></Link>
              <Link href="/lets-connect"><Button variant="ghost" size="lg">Get in Touch</Button></Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
