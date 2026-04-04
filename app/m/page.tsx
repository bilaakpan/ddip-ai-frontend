"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type AiSolution, type Work, type Influencer, type Faq } from "@/lib/api";
import HlsPlayer from "@/components/desktop/video";
/* ─── Fallback Data ─── */

const capabilities = [
  {
    title: "Strategic by Design",
    description:
      "Every idea begins with intent. At DDIP AI, strategy shapes creativity — turning insights into intelligent, measurable outcomes.",
  },
  {
    title: "Creative at Core",
    description:
      "Creativity drives everything we build. We design experiences that merge emotion and structure, keeping the human touch at the center of every interaction.",
  },
  {
    title: "Powered by Technology",
    description:
      "We use AI to enhance imagination, not replace it. That's why, we give creative thinking the speed and strength it deserves.",
  },
  {
    title: "Integrated by Nature",
    description:
      "We streamline your workflow with intelligent automations, freeing your team to focus on what matters most — creativity and strategy.",
  },
];

const aiSolutionsFallback = [
  {
    title: "AI Content Generation",
    href: "/ai-solutions/ai-content",
    media: "/videos/solutions/ai-content-gen.mp4",
    mediaType: "video" as const,
    description:
      "Design meets intelligence as we use specialized AI tools to transform moodboards into refined, design-driven campaigns.",
    tags: ["Text Generation", "Visual Generation", "Video & Animation Generation", "Personalized Content"],
  },
  {
    title: "Create Your Influencer with AI",
    href: "/ai-solutions/ai-influencer",
    media: "/images/homepage/solution-influencer.jpg",
    mediaType: "image" as const,
    description:
      "AI influencers bring your brand to life with smart storytelling and real-time multilingual engagement.",
    tags: ["AI Persona Creation", "Investment Promotion", "Brand Storytelling", "Explainer & Training Videos"],
  },
  {
    title: "Automation with a Creative Touch",
    href: "/ai-solutions/automation",
    media: "/videos/solutions/automation.mp4",
    mediaType: "video" as const,
    description:
      "We design intelligent workflows that eliminate repetitive tasks, allowing your teams to focus on what truly drives value.",
    tags: ["Automated Video Creator", "Automated LinkedIn Posts", "Amazon Stock & Price Tracker", "Personal Assistant"],
  },
  {
    title: "GEO Solutions",
    href: "/ai-solutions/geo",
    media: "/images/homepage/solution-geo.jpg",
    mediaType: "image" as const,
    description:
      "Traditional SEO isn't enough; it must be supported with GEO. At ddip, we optimize for generative engines.",
    tags: ["Featured Snippets Optimization", "Voice Search Optimization", "FAQ & Q&A Content Strategy", "NAP Consistency"],
  },
];

const selectedWorkFallback = [
  {
    title: "Vesta Global",
    subtitle: "AI-powered real estate branding and visual identity",
    category: "Real Estate",
    video: "/videos/works/vesta-global.mp4",
  },
  {
    title: "Cesi Design",
    subtitle: "Interior design showcase with AI-generated visuals",
    category: "Interior Design",
    video: "/videos/works/cesi-design.mp4",
  },
  {
    title: "Mediterra Group",
    subtitle: "Premium real estate marketing with creative AI",
    category: "Real Estate",
    video: "/videos/works/mediterra.mp4",
  },
  {
    title: "Brother",
    subtitle: "Product campaign powered by AI production",
    category: "Printer Solutions",
    video: "/videos/works/brother.mp4",
  },
];

const influencersFallback = [
  { name: "Mina Özdemir", archetype: "Analytical Visionary", industry: "Real Estate", color: "#CDDBC0", image: "/images/homepage/influencer-01.png" },
  { name: "Mina Şen", archetype: "Color Story Weaver", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-02.jpg" },
  { name: "Elif Doğan", archetype: "Market-to-Table Storyteller", industry: "Food", color: "#C0C2DB", image: "/images/homepage/influencer-03.png" },
  { name: "Yasin El Fassi", archetype: "Heritage Remix Artist", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-04.png" },
  { name: "Aylin Demir", archetype: "Calm Change Navigator", industry: "Lifestyle", color: "#C0D7DB", image: "/images/homepage/influencer-05.png" },
  { name: "Laila Haddad", archetype: "People-First Strategist", industry: "HR", color: "#CDDBC0", image: "/images/homepage/influencer-06.png" },
  { name: "Deniz Akar", archetype: "Future-Forward Thinker", industry: "Tech", color: "#C0C2DB", image: "/images/homepage/influencer-07.png" },
  { name: "Selin Kara", archetype: "Mindful Storyteller", industry: "Wellness", color: "#DBD8C0", image: "/images/homepage/influencer-08.png" },
  { name: "Ece Yilmaz", archetype: "Cultural Bridge Builder", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-09.png" },
  { name: "Mina Şen", archetype: "Color Story Weaver", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-10.png" },
];

const faqsFallback = [
  { question: "What makes DDIP AI different from other AI agencies?", answer: "We combine strategic design thinking with cutting-edge AI technology to deliver measurable results." },
  { question: "Do you develop your own AI tools?", answer: "We leverage the best existing AI tools and customize workflows for each client's unique needs." },
  { question: "How do your AI workflows improve efficiency?", answer: "Our intelligent automations eliminate repetitive tasks, freeing teams to focus on creativity and strategy." },
  { question: "What are AI Influencers, and how do they work?", answer: "AI Influencers are virtual personas created using AI that represent your brand across digital platforms." },
  { question: "How do you ensure the human element remains part of your AI-driven work?", answer: "Every project starts with human insight — AI amplifies our creative vision, never replaces it." },
  { question: "Can non-creative or technical companies benefit from your workflow solutions?", answer: "Absolutely. Our automation workflows help any organization streamline operations and scale efficiently." },
  { question: "How does DDIP stay up to date with evolving AI technologies?", answer: "We continuously evaluate and adopt new AI tools and methodologies to keep our solutions cutting-edge." },
];

const partners = [
  { name: "AWS" },
  { name: "Google Cloud" },
  { name: "Google Partner" },
  { name: "Microsoft" },
  { name: "Salesforce" },
];

/**
 * DDip AI Homepage — Mobile
 * Matches Figma "mobile" page → ANASAYFA frame (375 x 10241)
 */
export default function MobileHomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsSolutions, setCmsSolutions] = useState(aiSolutionsFallback);
  const [cmsWorks, setCmsWorks] = useState(selectedWorkFallback);
  const [cmsInfluencers, setCmsInfluencers] = useState(influencersFallback);
  const [cmsFaqs, setCmsFaqs] = useState(faqsFallback);

  useEffect(() => {
    cmsApi.aiSolutions().then((res) => {
      if (res.data?.length) {
        setCmsSolutions(
          res.data.map((s: AiSolution) => ({
            title: s.title,
            href: `/ai-solutions/${s.slug}`,
            media: s.mediaUrl || "",
            mediaType: (s.mediaType as "video" | "image") || "image",
            description: s.body || "",
            tags: s.tags?.map((t) => t.tag.name) || [],
          }))
        );
      }
    }).catch(() => { });

    cmsApi.works(true).then((res) => {
      if (res.data?.length) {
        setCmsWorks(
          res.data.map((w: Work) => ({
            title: w.title,
            subtitle: w.body || "",
            category: w.field || "",
            video: w.mediaUrl || "",
          }))
        );
      }
    }).catch(() => { });

    cmsApi.influencers({ homepage: true }).then((res) => {
      if (res.data?.length) {
        const colors = ["#CDDBC0", "#DBC0CD", "#C0C2DB", "#C0D7DB", "#DBD8C0"];
        setCmsInfluencers(
          res.data.map((inf: Influencer, i: number) => ({
            name: `${inf.name}${inf.surname ? ` ${inf.surname}` : ""}`,
            archetype: inf.persona || "",
            industry: inf.category || "Influencer",
            color: colors[i % colors.length],
            image: inf.imageUrl || "",
          }))
        );
      }
    }).catch(() => { });

    cmsApi.faqs("main").then((res) => {
      if (res.data?.length) {
        setCmsFaqs(
          res.data.map((f: Faq) => ({ question: f.question, answer: f.answer }))
        );
      }
    }).catch(() => { });
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d609bc26-f583-4bee-da4b-8cd9255a3400/public"
            alt="AI-generated influencer — DDiP AI"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/30 to-dark-bg/50" />
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-5 pb-8 pt-[80px]">
          {/* Arrow icon */}
          <div className="mb-4">
            <svg className="h-[50px] w-[50px] text-white/80" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="24" y1="2" x2="24" y2="46" />
              <line x1="2" y1="24" x2="46" y2="24" />
              <line x1="24" y1="2" x2="36" y2="14" />
              <line x1="24" y1="2" x2="12" y2="14" />
            </svg>
          </div>

          <h1 className="font-heading text-[clamp(36px,10vw,56px)] font-normal uppercase leading-[1.05] text-white">
            Create Your{" "}
            <span className="block">Own AI</span>
            <span className="block">Influencer</span>
            <span className="block">With Us!</span>
          </h1>

          {/* Bottom info */}
          <div className="mt-auto flex items-end justify-between">
            <div>
              <Link
                href="#solutions"
                className="inline-flex items-center gap-2 text-[14px] text-white/70 transition-colors hover:text-white"
              >
                Discover AI Solutions
                <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 6h8M6 2l4 4-4 4" />
                </svg>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded-full bg-white" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. STATEMENT — "We Don't Just Use AI, We Design With It."
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-16">
        <p className="mb-3 font-heading text-[14px] font-semibold uppercase tracking-widest text-[#126478]">
          Why DDiP AI
        </p>
        <h2
          className="text-[clamp(32px,9vw,48px)] font-bold uppercase leading-[1.05]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          WE DON&apos;T JUST USE AI
          <br />
          WE DESIGN
          <br />
          WITH IT.
        </h2>

        {/* Video / Image */}
        <div className="mt-8 overflow-hidden rounded-[14px]">
          <HlsPlayer
            src="9e3a0d22828697a21a65a4ea035f5c3d"
            autoPlay={true}
            controls={false}
            muted={true}
            loop={true}
            fillHeight={true}
            className="h-auto w-full"
          />
        </div>

        <p className="mt-6 text-[15px] leading-[1.6] text-light-body">
          We help brands unlock their full potential by blending AI-driven strategies
          with creative design — delivering solutions that are both innovative and
          measurable across all verticals and touchpoints.
        </p>

        {/* Labels */}
        <div className="mt-6 flex flex-col gap-2">
          <p className="text-[12px] font-medium uppercase tracking-wider text-[#126478]">
            Powered by AI Technology
          </p>
          <p className="text-[12px] font-medium uppercase tracking-wider text-[#126478]">
            Designed by Creative Minds
          </p>
        </div>

        {/* Capabilities */}
        <div className="mt-10 flex flex-col gap-6">
          <h3 className="font-heading text-[14px] font-semibold uppercase tracking-widest text-[#126478]">
            From Insight to Intelligence
          </h3>
          <p className="text-[15px] leading-[1.6] text-light-body">
            We build strategies that start with understanding — combining deep research
            with AI-powered creativity to deliver impactful, scalable outcomes.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {capabilities.map((cap, i) => (
              <div key={i} className="rounded-[14px] border border-border-light p-5">
                <h4 className="font-heading text-[16px] font-medium uppercase text-light-text">
                  {cap.title}
                </h4>
                <p className="mt-2 text-[14px] leading-[1.5] text-light-body">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. OUR AI SOLUTIONS
          ════════════════════════════════════════════════════════ */}
      <section id="solutions" className="bg-light-bg px-5 py-16">
        <h2 className="font-heading text-[clamp(36px,9vw,48px)] font-medium uppercase leading-[0.99] text-light-text">
          OUR AI
          <br />
          SOLUTIONS
        </h2>

        <div className="mt-8 flex flex-col gap-6">
          {cmsSolutions.map((solution, i) => (
            <Link key={i} href={solution.href} className="group block">
              <div className="overflow-hidden rounded-[20px] bg-white">
                {/* Media */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {solution.mediaType === "video" ? (
                    <HlsPlayer
                      src={solution.media}
                      autoPlay={true}
                      controls={false}
                      muted={true}
                      loop={true}
                      fillHeight={true}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={solution.media}
                      alt={solution.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3
                      className="text-[20px] font-bold leading-[1.2] text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {solution.title}
                    </h3>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-[14px] leading-[1.5] text-light-body">
                    {solution.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {solution.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="rounded-full border border-[#C3C3C3] px-3 py-1 text-[10px] text-light-text"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. SELECTED WORK
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-16">
        <div className="mb-2 flex items-end justify-between">
          <h2 className="font-heading text-[clamp(36px,9vw,48px)] font-medium uppercase leading-[0.99] text-light-text">
            SELECTED
            <br />
            WORK.
          </h2>
        </div>
        <Link
          href="/works"
          className="mb-8 inline-flex items-center gap-1 text-[14px] text-[#126478]"
        >
          See more of our work
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </Link>

        <div className="flex flex-col gap-6">
          {cmsWorks.map((work, i) => (
            <div key={i} className="overflow-hidden rounded-[14px]">
              <div className="relative aspect-[16/10]">
                <HlsPlayer
                  src={work.video}
                  autoPlay={true}
                  controls={false}
                  muted={true}
                  loop={true}
                  fillHeight={true}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-white p-4">
                <p className="text-[12px] font-medium uppercase tracking-wider text-[#126478]">
                  {work.category}
                </p>
                <h3 className="mt-1 font-heading text-[20px] font-medium text-light-text">
                  {work.title}
                </h3>
                <p className="mt-1 text-[14px] text-light-body">
                  {work.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. DDIP APPROACH — Gradient heading
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-16">
        <p className="mb-3 font-heading text-[14px] font-semibold uppercase tracking-widest text-[#039EB7]">
          The DDiP Approach
        </p>
        <h2
          className="text-[clamp(28px,7vw,40px)] font-bold uppercase leading-[1.1]"
          style={{
            fontFamily: "var(--font-body)",
            background: "linear-gradient(199deg, #063746 0%, #00BCCF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          WE DESIGN SYSTEMS TO EVOLVE WITH THE INDUSTRY.
        </h2>

        <div className="mt-6 overflow-hidden rounded-[14px]">
          <HlsPlayer
            src="665822d5062aae2129504c3a2b474494"
            autoPlay={true}
            controls={false}
            muted={true}
            loop={true}
            fillHeight={true}
            className="h-auto w-full"
          />
        </div>

        <p className="mt-6 text-[15px] leading-[1.6] text-light-body">
          By combining creative thinking with intelligent technology, we build workflows
          and experiences that grow alongside your business and your industry.
        </p>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. FUTURE FACE OF BRANDS — Dark section
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#002834] px-5 py-16">
        {/* Blur ellipses */}
        <div className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-[#00BCCF]/10 blur-[100px]" />

        <p className="mb-2 text-[12px] font-medium uppercase tracking-wider text-[#1CE3F4]">
          Discover AI
        </p>
        <h2
          className="text-[clamp(32px,9vw,48px)] font-bold uppercase leading-[1.05] text-[#1CE3F4]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          THE FUTURE
          <br />
          FACE OF
          <br />
          BRANDS
        </h2>

        {/* Filter pills */}
        <div className="mt-6 flex gap-2">
          <button className="rounded-full bg-[#1CE3F4] px-4 py-2 text-[12px] font-medium text-[#002834]">
            influencer
          </button>
          <button className="rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/60">
            Ambassador
          </button>
          <button className="rounded-full border border-white/20 px-4 py-2 text-[12px] text-white/60">
            Mascot
          </button>
        </div>

        {/* Influencer grid — 2 columns on mobile */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {cmsInfluencers.slice(0, 6).map((inf, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[14px]"
              style={{ backgroundColor: inf.color }}
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={inf.image}
                  alt={inf.name}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-[13px] font-medium text-white">{inf.name}</p>
                <p className="text-[10px] text-white/70">{inf.archetype}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/ai-solutions/ai-influencer"
          className="mt-6 inline-flex items-center gap-2 text-[14px] text-[#1CE3F4]"
        >
          Discover More
          <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </Link>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. SMARTER WORKFLOWS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-16">
        <h2
          className="text-[clamp(28px,7vw,40px)] font-bold uppercase leading-[1.1]"
          style={{
            fontFamily: "var(--font-body)",
            background: "linear-gradient(199deg, #063746 0%, #00BCCF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SMARTER WORKFLOWS, LIMITLESS POTENTIAL
        </h2>

        <p className="mt-4 text-[15px] leading-[1.6] text-light-body">
          Systems designed to move ideas faster — connecting strategy, content, and
          technology in one integrated flow.
        </p>

        <div className="mt-6 overflow-hidden rounded-[14px]">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bbe8dab9-ddbc-436c-b0ab-94be60b86200/public"
            alt="3D workflow visualization"
            width={670}
            height={460}
            className="h-auto w-full"
          />
        </div>

        <Link
          href="/ai-solutions/automation"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#002834] px-6 py-3 text-[14px] font-medium text-[#002834]"
        >
          Explore Our Workflows
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#002834] text-white">
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </span>
        </Link>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. +45 AI TOOLS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-16">
        <div className="relative flex min-h-[300px] items-center justify-center">
          {/* Tool logos scattered */}
          {[
            { src: "/images/ai-tools/openai.png", top: "5%", left: "10%" },
            { src: "/images/ai-tools/midjourney.png", top: "10%", left: "75%" },
            { src: "/images/ai-tools/runway.png", top: "30%", left: "5%" },
            { src: "/images/ai-tools/heygen.png", top: "35%", left: "80%" },
            { src: "/images/ai-tools/gemini.png", top: "60%", left: "8%" },
            { src: "/images/ai-tools/kling.png", top: "65%", left: "78%" },
            { src: "/images/ai-tools/flux.png", top: "85%", left: "15%" },
            { src: "/images/ai-tools/freepik.png", top: "80%", left: "70%" },
          ].map((tool, i) => (
            <div
              key={i}
              className="absolute h-10 w-10"
              style={{ top: tool.top, left: tool.left }}
            >
              <Image
                src={tool.src}
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
          {/* Center text */}
          <div className="text-center">
            <p className="font-heading text-[32px] font-medium text-light-text">
              +45 Ai Tools
            </p>
            <p className="mt-2 text-[14px] text-light-body">
              we&apos;re designed to integrate with
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. PARTNERS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-16">
        <h2 className="mb-8 font-heading text-[clamp(36px,9vw,48px)] font-medium uppercase leading-[0.99] text-light-text">
          PARTNERS
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {partners.map((partner, i) => (
            <div
              key={i}
              className="flex h-[100px] items-center justify-center rounded-[14px] border border-[#C3C3C3]"
            >
              <span className="text-[14px] font-medium text-light-body">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          10. FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-16">
        <div className="rounded-[20px] bg-[#002834] p-6">
          <h2 className="mb-6 font-heading text-[clamp(36px,9vw,48px)] font-medium uppercase text-[#EBFFFF]">
            FAQ
          </h2>

          <div className="flex flex-col">
            {cmsFaqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="pr-4 text-[14px] leading-[1.4] text-[#EBFFFF]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-[16px] text-white transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[200px] pb-4" : "max-h-0"
                    }`}
                >
                  <p className="text-[13px] leading-[1.5] text-[#90B2BD]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Live FAQ CTA */}
          <div className="mt-6 rounded-[14px] bg-[#063746] p-5 text-center">
            <p className="text-[14px] font-medium text-[#1CE3F4]">Live FAQ</p>
            <p className="mt-1 text-[18px] font-bold text-white">
              Didn&apos;t find your answer?
            </p>
            <Link
              href="/lets-connect"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
            >
              Talk to us
              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 6h8M6 2l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          11. CTA BAR
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-16">
        <div
          className="rounded-[20px] p-6 text-center"
          style={{
            background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)",
          }}
        >
          <p className="font-heading text-[20px] font-bold text-[#EBFFFF]">
            Let&apos;s design what&apos;s next together.
          </p>
          <p className="mt-2 text-[13px] text-[#EBFFFF]/70">
            Ready to build smart? Let&apos;s align creativity, AI and strategy into one unstoppable
            system.
          </p>
          <Link
            href="/start-project"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </>
  );
}
