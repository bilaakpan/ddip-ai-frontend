"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { cmsApi, type AiSolution, type Work, type Influencer, type Faq } from "@/lib/api";

/* ─── Data ─── */

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

const aiSolutions = [
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
    href: "/ai-solutions",
    media: "/videos/solutions/automation.mp4",
    mediaType: "video" as const,
    description:
      "We design intelligent workflows that eliminate repetitive tasks, allowing your teams to focus on what truly drives value, creativity and strategy.",
    tags: ["Automated Video Creator", "Automated LinkedIn Posts", "Amazon Stock & Price Tracker", "Personal Assistant"],
  },
  {
    title: "GEO Solutions",
    href: "/ai-solutions",
    media: "/images/homepage/solution-geo.jpg",
    mediaType: "image" as const,
    description:
      "Traditional SEO isn't enough; it must be supported with GEO. At ddip, we optimize for generative engines.",
    tags: ["Featured Snippets Optimization", "Voice Search Optimization", "FAQ & Q&A Content Strategy", "NAP Consistency"],
  },
];

const selectedWork = [
  {
    title: "Vesta Global",
    subtitle: "AI-powered real estate branding and visual identity",
    category: "Real Estate",
    video: "/videos/works/vesta-global.mp4",
    tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
  },
  {
    title: "Cesi Design",
    subtitle: "Interior design showcase with AI-generated visuals",
    category: "Interior Design",
    video: "/videos/works/cesi-design.mp4",
    tags: ["Enhanced Storytelling", "High-Impact Brand Moment", "Dynamic Interior Visuals"],
  },
  {
    title: "Mediterra Group",
    subtitle: "Premium real estate marketing with creative AI",
    category: "Real Estate",
    video: "/videos/works/mediterra.mp4",
    tags: ["Refined Visual Storytelling", "Consistent Brand Identity", "Impactful Presentation Experience"],
  },
  {
    title: "Brother",
    subtitle: "Product campaign powered by AI production",
    category: "Printer Solutions",
    video: "/videos/works/brother.mp4",
    tags: ["Creative AI Integration", "Custom Character Creation", "Enhanced Campaign Impact"],
  },
];

const influencersRow1 = [
  { name: "Mina Özdemir", archetype: "Analytical Visionary", industry: "Real Estate", color: "#CDDBC0", image: "/images/homepage/influencer-01.png" },
  { name: "Mina Şen", archetype: "Color Story Weaver", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-02.jpg" },
  { name: "Elif Doğan", archetype: "Market-to-Table Storyteller", industry: "Food", color: "#C0C2DB", image: "/images/homepage/influencer-03.png" },
  { name: "Yasin El Fassi", archetype: "Heritage Remix Artist", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-04.png" },
  { name: "Aylin Demir", archetype: "Calm Change Navigator", industry: "Lifestyle", color: "#C0D7DB", image: "/images/homepage/influencer-05.png" },
];

const influencersRow2 = [
  { name: "Laila Haddad", archetype: "People-First Strategist", industry: "HR", color: "#CDDBC0", image: "/images/homepage/influencer-06.png" },
  { name: "Deniz Akar", archetype: "Future-Forward Thinker", industry: "Tech", color: "#C0C2DB", image: "/images/homepage/influencer-07.png" },
  { name: "Selin Kara", archetype: "Mindful Storyteller", industry: "Wellness", color: "#DBD8C0", image: "/images/homepage/influencer-08.png" },
  { name: "Ece Yilmaz", archetype: "Cultural Bridge Builder", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-09.png" },
  { name: "Mina Şen", archetype: "Color Story Weaver", industry: "Fashion", color: "#DBC0CD", image: "/images/homepage/influencer-10.png" },
];

const faqLeft = [
  "What makes DDIP AI different from other AI agencies?",
  "Do you develop your own AI tools?",
  "How do your AI workflows improve efficiency?",
  "What are AI Influencers, and how do they work?",
];

const faqRight = [
  "How do you ensure the human element remains part of your AI-driven work?",
  "Can non-creative or technical companies benefit from your workflow solutions?",
  "How does DDIP stay up to date with evolving AI technologies?",
  "What industries do you serve?",
];

const partners = [
  { name: "AWS", image: "/images/partners/aws.png" },
  { name: "Google Cloud", image: "/images/partners/google.png" },
  { name: "Google Partner", image: "/images/partners/google.png" },
  { name: "Microsoft", image: null },
  { name: "Salesforce", image: null },
];

/**
 * DDip AI Homepage — Desktop
 * Pixel-perfect rebuild from Figma UI page (node 255:542, 1728x15709)
 */
export default function HomePage() {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);

  // CMS data state — initialized with fallback data, replaced when API responds
  const [cmsSolutions, setCmsSolutions] = useState(aiSolutions);
  const [cmsWorks, setCmsWorks] = useState(selectedWork);
  const [cmsInfluencers, setCmsInfluencers] = useState({ row1: influencersRow1, row2: influencersRow2 });
  const [cmsFaqs, setCmsFaqs] = useState({ left: faqLeft, right: faqRight });

  useEffect(() => {
    // Fetch CMS data in parallel — silent fallback to hardcoded on error
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
    }).catch(() => {});

    cmsApi.works(true).then((res) => {
      if (res.data?.length) {
        setCmsWorks(
          res.data.map((w: Work) => ({
            title: w.title,
            subtitle: w.body || "",
            category: w.field || "",
            video: w.mediaUrl || "",
            tags: w.tags?.map((t) => t.tag.name) || [],
          }))
        );
      }
    }).catch(() => {});

    cmsApi.influencers({ homepage: true }).then((res) => {
      if (res.data?.length) {
        const colors = ["#CDDBC0", "#DBC0CD", "#C0C2DB", "#C0D7DB", "#DBD8C0"];
        const mapped = res.data.map((inf: Influencer, i: number) => ({
          name: `${inf.name}${inf.surname ? ` ${inf.surname}` : ""}`,
          archetype: inf.persona || "",
          industry: inf.category || "Influencer",
          color: colors[i % colors.length],
          image: inf.imageUrl || "",
        }));
        const mid = Math.ceil(mapped.length / 2);
        setCmsInfluencers({ row1: mapped.slice(0, mid), row2: mapped.slice(mid) });
      }
    }).catch(() => {});

    cmsApi.faqs("main").then((res) => {
      if (res.data?.length) {
        const mid = Math.ceil(res.data.length / 2);
        setCmsFaqs({
          left: res.data.slice(0, mid).map((f: Faq) => f.question),
          right: res.data.slice(mid).map((f: Faq) => f.question),
        });
      }
    }).catch(() => {});
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-dark-bg">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/homepage/hero-ai-influencer.png"
            alt="AI-generated influencer face with dramatic lighting — DDiP AI virtual influencer creation"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 via-transparent to-dark-bg/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-screen flex-col px-[60px] pb-10 pt-40 max-md:px-5 max-md:pt-24">
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-center font-heading text-[clamp(36px,8.5vw,140px)] font-normal uppercase leading-[0.95] text-white">
              <span className="relative -top-[0.05em] mr-2 inline-block align-baseline text-[0.6em]">
                <svg className="inline h-[0.9em] w-[0.9em]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="24" y1="2" x2="24" y2="46" />
                  <line x1="2" y1="24" x2="46" y2="24" />
                  <line x1="7" y1="7" x2="41" y2="41" />
                  <line x1="41" y1="7" x2="7" y2="41" />
                </svg>
              </span>
              CREATE YOUR
              <br />
              OWN AI INFLUENCER
              <br />
              <span className="ml-[0.5em]">WITH US!</span>
            </h1>
          </div>

          {/* Problem text */}
          <div className="absolute bottom-[320px] right-[60px] max-w-[280px] text-right">
            <p className="flex items-center justify-end gap-2 text-sm font-semibold text-white">
              <svg className="inline h-3 w-3" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="24" y1="2" x2="24" y2="46" />
                <line x1="2" y1="24" x2="46" y2="24" />
                <line x1="7" y1="7" x2="41" y2="41" />
                <line x1="41" y1="7" x2="7" y2="41" />
              </svg>
              Problem:
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/80">
              We need to promote our brand but the influencer prices are too high.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-4">
              <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-[100px] w-auto" aria-label="Scroll down">
                <g clipPath="url(#arrow-clip)">
                  <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="arrow-clip">
                    <rect width="98.9811" height="122" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <a href="#discover" className="font-heading text-[32px] text-white underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-teal-500">
                Discover AI Solutions
              </a>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-6 rounded-full bg-white" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                  <span className="h-2 w-2 rounded-full bg-white/30" />
                </div>
                <button aria-label="Play carousel" className="ml-1 flex h-6 w-6 items-center justify-center text-white/60 transition-colors hover:text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Talk to AI widget */}
            <div className="relative h-[250px] w-[253px]">
              <Image
                src="/images/homepage/hero-talk-ai-widget.png"
                alt="Talk to our AI assistant — DDiP AI virtual chat"
                fill
                className="object-contain object-right-bottom"
                sizes="253px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. STATEMENT — "WE DON'T JUST USE AI WE DESIGN WITH IT."
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24 lg:py-32">
        <div className="mx-auto mb-16 w-[1182px] max-w-full overflow-hidden" style={{ aspectRatio: "1182/525" }}>
          <video autoPlay muted loop playsInline className="h-full w-full object-cover">
            <source src="/videos/statement-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="px-[60px]">
          <p className="mb-6 font-heading text-[25.6px] font-semibold leading-[1.2] text-[#126478]">
            Why DDIP AI
          </p>
          <h2
            className="max-w-[1609px] font-bold uppercase text-[#063746]"
            style={{
              fontFamily: "var(--font-body)",
              lineHeight: "104.64%",
              fontSize: "clamp(70px, calc((100vw - 120px) * 0.0907), 146px)",
              letterSpacing: "-0.04em",
            }}
          >
            WE DON&apos;T JUST USE AI
            <br />
            WE DESIGN{" "}
            <span className="relative inline-block align-middle">
              <span className="inline-flex h-[0.88em] w-[1.52em] items-center justify-center overflow-hidden rounded-lg">
                <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                  <source src="/videos/statement-video.mp4" type="video/mp4" />
                </video>
              </span>
            </span>{" "}
            WITH IT.
          </h2>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. ABOUT — "From Insight to Intelligence" + 4 Capability Cards
          Figma sections 19-24
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pb-24">
        <div className="px-[60px]">
          {/* Top row: tagline left + description right */}
          <div className="flex gap-16">
            <div className="w-1/2">
              <p className="font-heading text-[24px] font-normal uppercase leading-[1.2] text-[#063746]">
                From Insight to Intelligence
              </p>
            </div>
            <div className="w-1/2">
              <p
                className="text-[20px] leading-[24px] text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                We help brands unlock their creative potential through the
                synergy of human insight and AI-driven precision.
              </p>
            </div>
          </div>

          {/* 4 Capability Cards — 2x2 grid */}
          <div className="mt-20 grid grid-cols-2 gap-x-16 gap-y-12">
            {capabilities.map((cap) => (
              <div key={cap.title} className="max-w-[424px]">
                <h3 className="font-heading text-[24px] font-normal uppercase leading-[1.2] text-[#063746]">
                  {cap.title}
                </h3>
                <p
                  className="mt-5 text-[20px] leading-[24px] text-[#063746]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. OUR AI SOLUTIONS — 4 horizontal cards (scrollable)
          Figma sections 25-26: White cards, rounded 33px, image+title+desc+tags
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-24 lg:py-32">
        <div className="px-[60px]">
          <h2
            className="font-heading text-section font-medium uppercase text-[#063746]"
            style={{ lineHeight: "0.99" }}
          >
            Our AI
            <br />
            Solutions
          </h2>
        </div>

        {/* Horizontal scrolling card row */}
        <div className="mt-16 flex gap-[33px] overflow-x-auto px-[60px] pb-4" style={{ scrollbarWidth: "none" }}>
          {cmsSolutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group flex-shrink-0"
              style={{ width: "clamp(400px, 30vw, 1074px)" }}
            >
              <div className="overflow-hidden rounded-[33px] bg-white">
                {/* Media area (video or image) */}
                <div className="relative aspect-[974/536] overflow-hidden rounded-[17px] mx-[50px] mt-[50px]">
                  {solution.mediaType === "video" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    >
                      <source src={solution.media} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={solution.media}
                      alt={solution.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  {/* Title overlay on media */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <h3
                    className="absolute left-[42px] top-[34px] text-[27px] font-bold leading-[1.4] text-white"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {solution.title}
                  </h3>
                </div>

                {/* Description + Tags */}
                <div className="px-[50px] pb-[50px] pt-[42px]">
                  <p
                    className="line-clamp-3 text-[27px] font-medium leading-[37px] text-[#063746]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {solution.description}
                  </p>
                  {/* Tag pills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {solution.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#063746] px-[13px] py-[8px] text-[10px] leading-[1.2] text-[#063746]"
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
          5. SELECTED WORK — 2x2 portfolio grid
          Figma sections 30-35
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24 lg:py-32">
        <div className="px-[60px]">
          <div className="flex items-end justify-between">
            <h2
              className="font-heading text-section font-medium uppercase text-[#063746]"
              style={{ lineHeight: "0.99" }}
            >
              Selected
              <br />
              Work
            </h2>
            <Link
              href="/works"
              className="text-[24px] text-[#063746] underline underline-offset-8 transition-colors hover:text-[#039EB7]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              See more of our work
            </Link>
          </div>

          {/* 2x2 Grid */}
          <div className="mt-16 grid grid-cols-2 gap-[24px]">
            {cmsWorks.map((item) => (
              <Link key={item.title} href="/works" className="group">
                {/* Video */}
                <div className="relative aspect-[792/700] overflow-hidden bg-[#D9D9D9]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>
                  {/* Bottom shadow gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black/40 to-transparent" />
                  {/* Overlay tag pills — positioned inside image */}
                  <div className="absolute right-[26px] top-[26px] flex flex-wrap justify-end gap-[10px] max-w-[520px]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/50 bg-white/70 px-4 py-[10px] text-[12px] leading-[1.2] text-[#063746]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Info below image */}
                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <h3 className="font-heading text-[32px] font-normal leading-[1.2] text-[#063746]">
                      {item.title}
                    </h3>
                    <p
                      className="mt-1 text-[28px] leading-[1.2] text-[#063746]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <span
                    className="text-[32px] uppercase leading-[1.2] text-[#063746]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    ({item.category})
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Carousel dots + play */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="flex items-center rounded-full bg-white px-[35px] py-[22px]">
              <div className="flex items-center gap-[15px]">
                <span className="h-[9px] w-[9px] rounded-full bg-[#D2D2D2]" />
                <div className="relative h-[9px] w-[61px] rounded-full bg-[#D2D2D2]">
                  <div className="absolute left-0 top-0 h-full w-[48px] rounded-full bg-[#A1A1A1]" />
                </div>
                <span className="h-[9px] w-[9px] rounded-full bg-[#D2D2D2]" />
              </div>
            </div>
            <div className="flex h-[53px] w-[53px] items-center justify-center rounded-full bg-white">
              <svg className="h-[22px] w-[22px] text-[#D2D2D2]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. THE DDIP APPROACH
          Figma sections 36-39: Dark bg, gradient headline, full-width image
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24 lg:py-32">
        <div className="px-[60px]">
          <p className="font-heading text-[24px] font-normal uppercase tracking-wider text-[#039EB7]">
            The DDIP Approach
          </p>
          <h2
            className="mt-6 max-w-[1493px] text-[80px] font-medium uppercase leading-[1.01]"
            style={{
              fontFamily: "var(--font-body)",
              background: "linear-gradient(199deg, #063746 0%, #00BCCF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            We design systems that
            <br />
            evolve with the industry.
          </h2>
        </div>

        {/* Full-width video (1920x1091 in Figma) */}
        <div className="mt-16 w-full overflow-hidden">
          <div className="aspect-[1920/1091]">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            >
              <source src="/videos/main-slider.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="px-[60px]">
          <p
            className="mt-16 max-w-[1065px] text-[26px] leading-[1.5] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We believe continuous learning especially in AI. While we follow the trends,
            also we track emerging AI tools, test their creative potential, and integrate
            only the ones that meet our performance standards. Every DDIP project operates
            through this evolving framework, combining precision, adaptability, and creative
            control to deliver results that stay ahead of the curve.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. THE FUTURE FACE OF BRANDS
          Figma section 40: #002834 bg, blur ellipses, 5 influencer cards
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#002834] py-24 lg:py-32">
        {/* Decorative blur ellipses */}
        <div
          className="absolute right-[-100px] top-[100px] h-[777px] w-[777px] rounded-full"
          style={{ background: "#129CAC4D", filter: "blur(335px)" }}
        />
        <div
          className="absolute bottom-[100px] left-[-137px] h-[777px] w-[777px] rounded-full"
          style={{ background: "#129CAC1A", filter: "blur(335px)" }}
        />

        <div className="relative z-10">
          {/* Title */}
          <h2
            className="text-center text-[90px] font-bold uppercase leading-[0.93] text-[#1CE3F4]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            The Future Face of Brands
          </h2>

          {/* Subtitle */}
          <p
            className="mx-auto mt-8 max-w-[977px] text-center text-[34px] leading-[1.19] text-white"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our AI influencers represent the next step in brand communication,
            combining expressiveness, adaptability, and visual intelligence.
          </p>

          {/* Filter tabs + Discover More */}
          <div className="mt-16 flex items-center justify-between px-[60px]">
            {/* Filter pills */}
            <div className="flex items-center gap-5 rounded-full bg-white/90 px-[15px] py-[9px]">
              <button
                className="rounded-full bg-[#063746] px-[30px] py-[20px] text-[22px] leading-[1.2] text-[#EBFFFF]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                influencer
              </button>
              <button
                className="rounded-full px-[30px] py-[20px] text-[22px] leading-[1.2] text-[#063746] transition-colors hover:bg-[#063746]/10"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Ambassador
              </button>
              <button
                className="rounded-full px-[30px] py-[20px] text-[22px] leading-[1.2] text-[#063746] transition-colors hover:bg-[#063746]/10"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Mascot
              </button>
            </div>

            {/* Discover More */}
            <Link
              href="/ai-solutions/ai-influencer"
              className="group flex items-center gap-3"
            >
              <span className="font-heading text-[32px] font-normal leading-[1.2] text-white underline underline-offset-8 transition-colors group-hover:text-[#1CE3F4]">
                Discover More
              </span>
              <svg className="h-[14px] w-[21px] text-white transition-colors group-hover:text-[#1CE3F4]" viewBox="0 0 21 14" fill="currentColor">
                <path d="M10.5 0L21 14H0L10.5 0Z" />
              </svg>
            </Link>
          </div>

          {/* Influencer Cards — 2 rows, horizontal scroll */}
          {[cmsInfluencers.row1, cmsInfluencers.row2].map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`${rowIdx === 0 ? "mt-10" : "mt-8"} flex gap-5 overflow-x-auto px-[60px] pb-4`}
              style={{ scrollbarWidth: "none" }}
            >
              {row.map((inf) => (
                <div key={`${rowIdx}-${inf.name}`} className="w-[376px] flex-shrink-0">
                  {/* Card image */}
                  <div className="relative h-[518px] w-full overflow-hidden rounded-[20px] bg-[#EFEFEF]">
                    <img
                      src={inf.image}
                      alt={inf.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Industry badge */}
                    <div
                      className="absolute right-[20px] top-[20px] rounded-full px-[18px] py-[9px]"
                      style={{ backgroundColor: inf.color }}
                    >
                      <span
                        className="text-[18px] uppercase leading-[1.2] text-black"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {inf.industry}
                      </span>
                    </div>
                  </div>

                  {/* Name + arrow button */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="rounded-full bg-[#063746B2] px-[22px] py-[12px]">
                      <span
                        className="text-[18px] leading-[1.2] text-white"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {inf.name}
                      </span>
                    </div>
                    <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white/80">
                      <svg className="h-[30px] w-[30px] text-[#012F3B]" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="4">
                        <line x1="15" y1="0" x2="15" y2="30" />
                        <line x1="0" y1="15" x2="30" y2="15" />
                      </svg>
                    </div>
                  </div>

                  {/* Archetype */}
                  <p
                    className="mt-2 text-[20px] leading-[1.2] text-[#90B2BD]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    &ldquo;{inf.archetype}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. SMARTER WORKFLOWS, LIMITLESS POTENTIAL
          Figma sections 41-46
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24 lg:py-32">
        <div className="px-[60px]">
          {/* Gradient headline */}
          <h2
            className="max-w-[1493px] text-[80px] font-medium uppercase leading-[1.01]"
            style={{
              fontFamily: "var(--font-body)",
              background: "linear-gradient(199deg, #063746 0%, #00BCCF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Smarter Workflows,
            <br />
            Limitless Potential
          </h2>

          {/* Description */}
          <p
            className="mt-10 max-w-[1380px] text-[26px] leading-[1.5] text-[#4D5347]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our AI automation systems accelerate processes across every layer of
            business, from content generation and chatbot communication to data
            analysis and voice assistants.
          </p>

          {/* Workflow image */}
          <div className="mt-12 aspect-[1608/905] max-w-[1608px] overflow-hidden">
            <img
              src="/images/homepage/smarter-workflows-3d.jpg"
              alt="AI Workflow Builder interface — DDiP automation systems"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Sub-section: Systems designed to move ideas faster */}
          <div className="mt-16 flex gap-16">
            <div className="w-1/2">
              <h3
                className="text-[42px] font-normal leading-[1.2] text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Systems designed to move
                <br />
                ideas faster.
              </h3>
            </div>
            <div className="w-1/2">
              <p
                className="text-[26px] leading-[1.5] text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                They are designed to minimize human intervention where it is not
                needed, allowing people to focus on what drives true value:
                creativity, strategy, and innovation. With tailor-made
                integrations, DDIP automation unlocks new opportunities for
                efficiency and creativity, no matter the field.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <Link
              href="/ai-solutions"
              className="inline-flex items-center gap-[30px] rounded-full bg-[#063746] py-[8px] pl-[18px] pr-[12px] transition-opacity hover:opacity-90"
            >
              <span
                className="text-[20px] leading-[1.2] text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Explore Our Workflows
              </span>
              <span className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-[#039EB7]">
                <svg className="h-[19px] w-[19px] text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3">
                  <line x1="10" y1="1" x2="10" y2="19" />
                  <line x1="1" y1="10" x2="19" y2="10" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. +45 AI TOOLS
          Figma section 59: Scattered tool logos with center text
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-20">
        <div className="px-[60px]">
          <div className="relative mx-auto h-[586px] max-w-[1600px]">
            {/* Center text */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="whitespace-nowrap font-heading text-[80px] font-normal leading-[1] text-[#063746]">
                +45
              </p>
              <p className="font-heading text-[40px] font-normal leading-[1.2] text-[#063746]">
                Ai Tools
              </p>
            </div>
            {/* Scattered AI tool logos */}
            {[
              { src: "/images/ai-tools/openai.png", name: "OpenAI", top: "5%", left: "12%", size: 72 },
              { src: "/images/ai-tools/midjourney.png", name: "Midjourney", top: "8%", left: "42%", size: 64 },
              { src: "/images/ai-tools/runway.png", name: "Runway", top: "3%", left: "72%", size: 60 },
              { src: "/images/ai-tools/gemini.png", name: "Gemini", top: "25%", left: "2%", size: 68 },
              { src: "/images/ai-tools/heygen.png", name: "HeyGen", top: "30%", left: "82%", size: 64 },
              { src: "/images/ai-tools/flux.png", name: "Flux", top: "55%", left: "5%", size: 56 },
              { src: "/images/ai-tools/kling.png", name: "Kling", top: "60%", left: "85%", size: 60 },
              { src: "/images/ai-tools/freepik.png", name: "Freepik", top: "75%", left: "18%", size: 68 },
              { src: "/images/ai-tools/minimax.png", name: "Minimax", top: "80%", left: "48%", size: 64 },
              { src: "/images/ai-tools/veo.png", name: "Veo", top: "78%", left: "75%", size: 60 },
              { src: "/images/ai-tools/seedream.png", name: "Seedream", top: "15%", left: "88%", size: 56 },
              { src: "/images/ai-tools/mystic.png", name: "Mystic", top: "48%", left: "90%", size: 52 },
            ].map((tool) => (
              <img
                key={tool.name}
                src={tool.src}
                alt={tool.name}
                className="absolute opacity-80 transition-opacity duration-300 hover:opacity-100"
                style={{
                  top: tool.top,
                  left: tool.left,
                  width: tool.size,
                  height: tool.size,
                  objectFit: "contain",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          10. PARTNERS
          Figma sections 47-57: 5 bordered logo boxes
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-20">
        <div className="px-[60px]">
          <h2
            className="font-heading text-[80px] font-medium uppercase leading-[0.99] text-[#063746]"
          >
            Partners
          </h2>

          {/* 5 Partner logo boxes */}
          <div className="mt-12 grid grid-cols-5">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex h-[240px] items-center justify-center border border-[#C3C3C3]"
              >
                {partner.image ? (
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="max-h-[175px] max-w-[204px] object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  />
                ) : (
                  <span className="font-heading text-2xl font-semibold tracking-wide text-[#063746]/40 transition-colors hover:text-[#063746]">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          11. FAQ
          Figma section 58: Dark card #002834, 2-column FAQ, bottom CTA
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24 lg:py-32">
        <div className="mx-[60px] overflow-hidden rounded-[20px] bg-[#002834]">
          {/* FAQ Title */}
          <div className="px-[59px] pt-[85px]">
            <h2 className="font-heading text-[80px] font-medium uppercase leading-[0.99] text-[#EBFFFF]">
              FAQ
            </h2>
          </div>

          {/* 2-column FAQ grid */}
          <div className="mt-12 grid grid-cols-2 gap-0 px-[59px]">
            {/* Left column */}
            <div>
              {cmsFaqs.left.map((question, i) => (
                <div key={i} className="border-b border-[#EBFFFF33]">
                  <button
                    className="flex w-full items-center justify-between py-[45px] text-left"
                    onClick={() => setOpenFaqLeft(openFaqLeft === i ? null : i)}
                  >
                    <span
                      className="pr-8 text-[26px] leading-[1.2] text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {question}
                    </span>
                    <span
                      className={`shrink-0 text-[30px] leading-none text-white transition-transform duration-300 ${
                        openFaqLeft === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaqLeft === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="pb-6 text-[18px] leading-relaxed text-[#90B2BD]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Our approach blends advanced AI capabilities with human creative direction,
                        ensuring every output maintains the nuance, emotion, and strategic intent
                        that only human expertise can provide.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="pl-[50px]">
              {cmsFaqs.right.map((question, i) => (
                <div key={i} className="border-b border-[#EBFFFF33]">
                  <button
                    className="flex w-full items-center justify-between py-[45px] text-left"
                    onClick={() => setOpenFaqRight(openFaqRight === i ? null : i)}
                  >
                    <span
                      className="pr-8 text-[26px] leading-[1.2] text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {question}
                    </span>
                    <span
                      className={`shrink-0 text-[30px] leading-none text-white transition-transform duration-300 ${
                        openFaqRight === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaqRight === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className="pb-6 text-[18px] leading-relaxed text-[#90B2BD]"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        Absolutely. Our workflow automation and AI solutions are designed
                        for any industry that wants to streamline operations, improve
                        efficiency, and scale intelligent processes.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA bar with background image */}
          <div className="relative mx-[59px] mb-[65px] mt-16 overflow-hidden rounded-[10px]">
            <div className="absolute inset-0">
              <img
                src="/images/homepage/faq-image-1.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[0px]" />
            </div>
            <div className="relative z-10 px-[60px] py-[56px]">
              <p className="font-heading text-[41px] font-normal leading-[1.2] text-white">
                Live FAQ
              </p>
              <h3
                className="mt-6 text-[48px] font-bold leading-[1.2] text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Didn&apos;t find your answer?
              </h3>
              <Link
                href="/lets-connect"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1CE3F4] px-[18px] py-[8px] transition-opacity hover:opacity-90"
                style={{ height: "64px", minWidth: "221px" }}
              >
                <span
                  className="text-[24px] font-medium leading-[1.2] text-[#002834]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Talk to our AI
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          12. CTA BAR — "Let's design what's next together."
          Figma section 60: Gradient bar
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pb-24">
        <div
          className="mx-[60px] flex items-center justify-between rounded-[20px] px-[60px] py-[60px]"
          style={{ background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)" }}
        >
          <h2 className="font-heading text-[28px] font-bold leading-[1.2] text-[#EBFFFF]">
            Let&apos;s design what&apos;s next together.
          </h2>
          <Link
            href="/start-project"
            className="inline-flex items-center justify-center rounded-full bg-[#1CE3F4] px-[26px] transition-opacity hover:opacity-90"
            style={{ height: "64px" }}
          >
            <span
              className="text-[24px] font-medium leading-[1.2] text-[#002834]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Begin Your Transformation
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
