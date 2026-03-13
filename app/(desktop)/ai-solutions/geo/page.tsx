"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";

/* ─── Data ─── */

const heroPartners = ["VG", "brother", "Vestine", "OPTIMUM", "ColaSel"];

const whatGeoItems = [
  { title: "Content structure and format", image: "/images/geo/what-geo-01.png" },
  { title: "Semantic clarity and depth", image: "/images/geo/what-geo-02.png" },
  { title: "Multi-engine presence", image: "/images/geo/what-geo-03.png" },
  { title: "Topic authority signals", image: "/images/geo/what-geo-04.png" },
];

const optimizeItems = [
  { title: "Content Architecture and Hierarchy", image: "/images/geo/optimize-01.png" },
  { title: "Semantic markup and metadata", image: "/images/geo/optimize-02.png" },
  { title: "Multi-engine optimization", image: "/images/geo/optimize-03.png" },
  { title: "Image & media optimization", image: "/images/geo/optimize-04.png" },
];

const methodSteps = [
  { title: "Define", icon: "/images/geo/icon-01.svg", rotate: "-8deg" },
  { title: "Design", icon: "/images/geo/icon-02.svg", rotate: "-3deg" },
  { title: "Develop", icon: "/images/geo/icon-03.svg", rotate: "3deg" },
  { title: "Deliver", icon: "/images/geo/icon-04.svg", rotate: "8deg" },
];

const whyGeoItems = [
  { image: "/images/geo/why-geo-01.png" },
  { image: "/images/geo/why-geo-02.png" },
  { image: "/images/geo/why-geo-03.png" },
  { image: "/images/geo/why-geo-04.png" },
  { image: "/images/geo/why-geo-05.png" },
];

const useCases = [
  { title: "E-commerce", image: "/images/geo/usecase-01.png" },
  { title: "SaaS", image: "/images/geo/usecase-02.png" },
  { title: "Healthcare", image: "/images/geo/usecase-03.png" },
  { title: "Finance", image: "/images/geo/usecase-04.png" },
  { title: "Education", image: "/images/geo/usecase-05.png" },
];

const faqLeft = [
  "Is GEO the same as SEO?",
  "Do I still need SEO?",
  "Is GEO only about content?",
  "How does GEO affect visibility in AI-generated results?",
  "Does GEO work with time-based search results?",
];

const faqRight = [
  "Is GEO a one-time optimization or an ongoing process?",
  "Can GEO improve brand authority across similar traffic?",
  "Is GEO limited for smaller sites or only large platforms?",
  "How do you measure GEO performance?",
  "Can GEO be applied to existing websites?",
  "Is GEO aligned with future search trends?",
];

export default function GeoPage() {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);

  useEffect(() => {
    cmsApi
      .faqs("geo")
      .then((res) => {
        if (res.data?.length) {
          const mid = Math.ceil(res.data.length / 2);
          setCmsFaqLeft(res.data.slice(0, mid).map((f: Faq) => f.question));
          setCmsFaqRight(res.data.slice(mid).map((f: Faq) => f.question));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — "DDIP GEO OPTIMIZAT..."
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pb-16 pt-40">
        <div className="absolute right-0 top-0 h-full w-[55%]">
          <Image
            src="/images/geo/hero-slider.png"
            alt="GEO Optimization"
            fill
            className="object-cover object-left"
            sizes="55vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
        </div>

        <div className="relative z-10 whitespace-nowrap overflow-hidden px-[60px]">
          <h1
            className="inline-block font-heading font-normal uppercase text-white"
            style={{ fontSize: "clamp(64px, 8vw, 130px)", lineHeight: "1" }}
          >
            DDIP GEO OPTIMIZAT
            <span className="text-white/20">ION</span>
          </h1>
        </div>

        <div className="relative z-10 mt-8 px-[60px]">
          <h2 className="max-w-lg font-heading text-[24px] font-medium leading-[1.3] text-white">
            Visibility No Longer Ends
            <br />
            With Search.
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            GEO Optimization helps brands become visible in AI-powered search, discovery, and answer engines.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white/20">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <Link href="#discover" className="font-heading text-[14px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              Discover Our GEO Optimization
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="absolute bottom-10 right-[60px] z-10">
          <p className="text-[11px] tracking-wider text-white/30" style={{ fontFamily: "var(--font-body)" }}>SCROLL</p>
        </div>
      </section>

      {/* Partners Row */}
      <section className="border-b border-white/10 bg-dark-bg py-8">
        <div className="flex items-center justify-center gap-14 px-[60px]">
          <span className="text-[13px] font-medium uppercase tracking-wider text-white/40">Partners</span>
          {heroPartners.map((name) => (
            <span key={name} className="font-heading text-[15px] font-medium text-white/50">{name}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. WHY SEO ALONE IS NO LONGER ENOUGH
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-[40px] font-medium uppercase leading-[1.1] text-[#063746]">
                Why SEO Alone Is No
                <br />
                Longer Enough
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                SEO has shaped how brands become visible for 15 years. But today, AI systems — from ChatGPT to Google SGE — don&apos;t just index pages. They understand, summarize, and recommend.
              </p>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                It&apos;s a new environment, and being part of the conversation means rethinking how content is structured and delivered.
              </p>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                That&apos;s what GEO Optimization is about.
              </p>
            </div>
          </div>

          {/* SEO vs GEO comparison */}
          <div className="mt-16">
            <h3 className="font-heading text-[24px] font-medium text-[#063746]">
              SEO vs GEO: what&apos;s the difference?
            </h3>
            <div className="mt-8 grid grid-cols-[1fr_auto_1fr] gap-8">
              <div className="rounded-[16px] border border-[#063746]/10 bg-white p-6">
                <p className="font-heading text-[16px] font-medium text-[#063746]">SEO</p>
                <p className="mt-2 text-[14px] text-[#063746]/50" style={{ fontFamily: "var(--font-body)" }}>
                  SEO maximizes page visibility within traditional search engines, relying on keyword placement and backlinks.
                </p>
              </div>
              <div className="flex items-center">
                <span className="font-heading text-[20px] font-medium text-[#063746]/30">V.S.</span>
              </div>
              <div className="rounded-[16px] border border-[#1CE3F4]/30 bg-white p-6">
                <p className="font-heading text-[16px] font-medium text-[#1CE3F4]">GEO</p>
                <p className="mt-2 text-[14px] text-[#063746]/50" style={{ fontFamily: "var(--font-body)" }}>
                  GEO optimizes for systems, discovery, and trust — how AI engines understand and surface your content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. WHAT GEO OPTIMIZATION MEANS AT DDIP.AI
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#063746]">
              What GEO Optimization
              <br />
              Means At Ddip.ai
            </h2>
            <div className="space-y-4">
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                At DDiP AI, GEO Optimization is about designing content and structure that AI systems can clearly read, interpret, and trust.
              </p>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                This involves search engines, chat-based AI interfaces, and emerging discovery platforms.
              </p>
            </div>
          </div>

          {/* What We Optimize thumbnails */}
          <h3 className="mt-16 font-heading text-[24px] font-medium text-[#063746]">What We Optimize</h3>
          <div className="mt-8 grid grid-cols-4 gap-6">
            {optimizeItems.map((item) => (
              <div key={item.title}>
                <div className="relative aspect-square overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="25vw" />
                </div>
                <p className="mt-4 text-[13px] text-[#063746]/50" style={{ fontFamily: "var(--font-body)" }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. FROM SEARCH TO DISCOVERY — dark card
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="overflow-hidden rounded-[24px] bg-dark-bg px-16 py-20">
            <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-white">
              From search to discovery
            </h2>
            <p className="mt-2 font-heading text-[20px] text-white/60">
              Search is evolving into discovery.
            </p>
            <div className="mt-8 max-w-xl space-y-4">
              <p className="text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                AI-powered systems don&apos;t just index pages; they analyze meaning, relationships, and relevance.
              </p>
              <p className="text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                They don&apos;t rank pages — they pull the most useful, most contextual answer from the web.
              </p>
              <p className="text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                GEO Optimization ensures your content isn&apos;t hidden from this new paradigm. It&apos;s about being found in AI-powered tools, emerging brand search, at every touchpoint, in a world where the interface is changing fast.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. OUR 4D METHOD
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Our 4D Method
          </h2>
          <div className="mx-auto mt-16 flex max-w-5xl items-end justify-between">
            {methodSteps.map((step) => (
              <div key={step.title} className="text-center">
                <div
                  className="mx-auto flex h-[160px] w-[200px] items-center justify-center rounded-[20px] border border-[#063746]/10 bg-white shadow-sm"
                  style={{ transform: `rotate(${step.rotate})` }}
                >
                  <Image src={step.icon} alt={step.title} width={70} height={70} className="opacity-80" />
                </div>
                <p className="mt-6 font-heading text-[16px] font-medium text-[#063746]">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. WHY GEO MATTERS NOW — dark card with images
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="overflow-hidden rounded-[24px] bg-dark-bg px-16 py-20">
            <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-white">
              Why GEO
              <br />
              Matters Now
            </h2>
            <div className="mt-10 flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
              {whyGeoItems.map((item, i) => (
                <div key={i} className="relative h-[200px] w-[200px] shrink-0 overflow-hidden rounded-[16px]">
                  <Image src={item.image} alt={`Why GEO ${i + 1}`} fill className="object-cover" sizes="200px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. USE CASES
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Use Cases
          </h2>
          <div className="mt-12 grid grid-cols-5 gap-4">
            {useCases.map((item) => (
              <div key={item.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="20vw" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. PARTNERS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[80px] font-medium uppercase leading-[1] text-[#063746]">Partners</h2>
          <div className="mt-12 flex items-center justify-start gap-16">
            {["Google", "Google Cloud", "AWS", "Microsoft", "Salesforce"].map((name) => (
              <span key={name} className="text-[20px] font-medium text-[#063746]/40">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="overflow-hidden rounded-[24px] bg-dark-bg px-16 py-20">
            <h2 className="font-heading text-[80px] font-medium leading-[1] text-white">
              <span className="text-[#1CE3F4]">F</span>AQ
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-0">
              <div>
                {cmsFaqLeft.map((question, i) => (
                  <div key={i} className="border-b border-white/10">
                    <button className="flex w-full items-center justify-between py-[28px] text-left" onClick={() => setOpenFaqLeft(openFaqLeft === i ? null : i)}>
                      <span className="pr-8 text-[16px] font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>{question}</span>
                      <span className="shrink-0 text-[20px] text-white/50">{openFaqLeft === i ? "−" : "+"}</span>
                    </button>
                    {openFaqLeft === i && (
                      <div className="pb-5 pr-12">
                        <p className="text-[14px] leading-[1.6] text-white/60" style={{ fontFamily: "var(--font-body)" }}>Our team will provide detailed information. Contact us to learn more.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="pl-[50px]">
                {cmsFaqRight.map((question, i) => (
                  <div key={i} className="border-b border-white/10">
                    <button className="flex w-full items-center justify-between py-[28px] text-left" onClick={() => setOpenFaqRight(openFaqRight === i ? null : i)}>
                      <span className="pr-8 text-[16px] font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>{question}</span>
                      <span className="shrink-0 text-[20px] text-white/50">{openFaqRight === i ? "−" : "+"}</span>
                    </button>
                    {openFaqRight === i && (
                      <div className="pb-5 pr-12">
                        <p className="text-[14px] leading-[1.6] text-white/60" style={{ fontFamily: "var(--font-body)" }}>Our team will provide detailed information. Contact us to learn more.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live FAQ */}
            <div className="mt-12 overflow-hidden rounded-[20px]">
              <div className="relative h-[240px]">
                <Image src="/images/geo/asset-01.png" alt="Live FAQ" fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-dark-bg/50" />
                <div className="relative z-10 flex h-full flex-col justify-center p-10">
                  <p className="font-heading text-[20px] text-white/60">Live FAQ</p>
                  <h3 className="mt-2 font-heading text-[36px] font-medium text-white">Didn&apos;t find your answer?</h3>
                  <Link href="#" className="mt-5 inline-flex w-fit rounded-full bg-[#1CE3F4] px-8 py-3 font-heading text-[15px] font-medium text-[#063746] hover:bg-[#1CE3F4]/80">Talk to our AI</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          10. CTA
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="flex items-center justify-between px-[60px]">
          <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-[#063746]">
            Let&apos;s design what&apos;s next together.
          </h2>
          <Link href="/start-project" className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-8 py-4 font-heading text-[15px] font-medium text-[#063746] hover:bg-[#1CE3F4]/80">
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </>
  );
}
