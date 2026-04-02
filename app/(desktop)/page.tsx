"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "@/components/layout";
import { cmsApi, type AiSolution, type Work, type Influencer, type Faq } from "@/lib/api";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import FaqSection from "@/components/desktop/FaqSection";
import PartnersSection from "@/components/desktop/PartnersSection";
import { PopupInfluencer, InfluencerPopupModal } from "@/components/desktop/influencer-popUp";

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
    media: "/videos/ai1.mp4",
    mediaType: "video" as const,
    description:
      "Design meets intelligence as we use specialized AI tools to transform moodboards into refined, design-driven campaigns.",
    tags: ["Text Generation", "Visual Generation", "Video & Animation Generation", "Personalized Content"],
  },
  {
    title: "Create Your Influencer with AI",
    href: "/ai-solutions/ai-influencer",
    media: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/846771a3-24bb-46b7-f265-45d58b267900/public",
    mediaType: "image" as const,
    description:
      "AI influencers bring your brand to life with smart storytelling and real-time multilingual engagement.",
    tags: ["AI Persona Creation", "Investment Promotion", "Brand Storytelling", "Explainer & Training Videos"],
  },
  {
    title: "Automation with a Creative Touch",
    href: "/ai-solutions",
    media: "/videos/IntroducingaIworkflow.mp4",
    mediaType: "video" as const,
    description:
      "We design intelligent workflows that eliminate repetitive tasks, allowing your teams to focus on what truly drives value, creativity and strategy.",
    tags: ["Automated Video Creator", "Automated LinkedIn Posts", "Amazon Stock & Price Tracker", "Personal Assistant"],
  },
  {
    title: "GEO Solutions",
    href: "/ai-solutions",
    media: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/173463a6-4e3f-44fc-6fd4-61697f25d700/public",
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
    video: "/videos/work1.mp4",
    tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
  },
  {
    title: "Cesi Design",
    subtitle: "Interior design showcase with AI-generated visuals",
    category: "Interior Design",
    video: "/videos/work2.mp4",
    tags: ["Enhanced Storytelling", "High-Impact Brand Moment", "Dynamic Interior Visuals"],
  },
  {
    title: "Mediterra Group",
    subtitle: "Premium real estate marketing with creative AI",
    category: "Real Estate",
    video: "/videos/work3.mp4",
    tags: ["Refined Visual Storytelling", "Consistent Brand Identity", "Impactful Presentation Experience"],
  },
  {
    title: "Brother",
    subtitle: "Product campaign powered by AI production",
    category: "Printer Solutions",
    video: "/videos/work4.mp4",
    tags: ["Creative AI Integration", "Custom Character Creation", "Enhanced Campaign Impact"],
  },
];

const influencersRow1 = [
  { name: "Mina Özdemir", archetype: "Analytical Visionary", industry: "Real Estate", color: "#CDDBC0", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81d25d40-2890-403e-93d7-49e36b06cd00/public", country: "TR" },
  { name: "Mina Şen", archetype: "Color Story Weaver", industry: "Fashion", color: "#DBC0CD", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/56d8bb08-9c7d-49ca-e1ec-aa074fdf1600/public", country: "TR" },
  { name: "Elif Doğan", archetype: "Market-to-Table Storyteller", industry: "Food", color: "#C0C2DB", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e1fe1be8-8ca5-4eef-cf2a-925bae6f7300/public", country: "TR" },
  { name: "Yasin El Fassi", archetype: "Heritage Remix Artist", industry: "Fashion", color: "#DBC0CD", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/259023e7-e8b0-4214-ee42-9f2b02a1a800/public", country: "MA" },
  { name: "Aylin Demir", archetype: "Calm Change Navigator", industry: "Lifestyle", color: "#C0D7DB", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/57fe254b-21d7-4443-1476-6eccc458df00/public", country: "TR" },
];

const influencersRow2 = [
  { name: "Laila Haddad", archetype: "People-First Strategist", industry: "HR", color: "#CDDBC0", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8ebaf72d-1931-4412-d1ef-55f1feb9dd00/public", country: "AE" },
  { name: "Deniz Akar", archetype: "Future-Forward Thinker", industry: "Tech", color: "#C0C2DB", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/923ba48c-8d17-4f6f-a974-09eae19dc300/public", country: "TR" },
  { name: "Selin Kara", archetype: "Mindful Storyteller", industry: "Wellness", color: "#DBD8C0", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ae712d05-13a0-46d1-c9e5-6f92fdeda700/public", country: "TR" },
  { name: "Ece Yilmaz", archetype: "Cultural Bridge Builder", industry: "Fashion", color: "#DBC0CD", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0c4bfad2-2109-4bbb-d78b-dcc73c1def00/public", country: "TR" },
  { name: "Mina Şen", archetype: "Color Story Weaver", industry: "Fashion", color: "#DBC0CD", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5dfe3b6d-e750-4279-3815-6dd960b62e00/public", country: "TR" },
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
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "/images/partners/google.svg" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];

/**
 * DDip AI Homepage — Desktop
 * Pixel-perfect rebuild from Figma UI page (node 255:542, 1728x15709)
 */
export default function HomePage() {

  // Hero carousel
  const heroImages = [
    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/668d2dbe-1430-43f2-d9d4-43fdd6b55f00/public",
    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ca026e67-6810-45b1-4bf2-f1e8aeacd800/public",
    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a14a9b12-bd23-450e-1009-79149e9d7f00/public",
  ];
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isInfluencerPopupOpen, setIsInfluencerPopupOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<PopupInfluencer | null>(null);
  const startHeroTimer = useCallback(() => {
    if (heroTimer.current) clearInterval(heroTimer.current);
    heroTimer.current = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 3);
    }, 6000);
  }, []);

  useEffect(() => {
    if (heroPlaying) {
      startHeroTimer();
    } else if (heroTimer.current) {
      clearInterval(heroTimer.current);
    }
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, [heroPlaying, startHeroTimer]);

  // CMS data state — initialized with fallback data, replaced when API responds
  const [cmsSolutions, setCmsSolutions] = useState(aiSolutions);
  const [cmsWorks, setCmsWorks] = useState(selectedWork);
  const [cmsInfluencers, setCmsInfluencers] = useState({ row1: influencersRow1, row2: influencersRow2 });
  const [cmsFaqs, setCmsFaqs] = useState({ left: faqLeft, right: faqRight });
  const autoplayRow1 = useRef(Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: false }));
  const autoplayRow2 = useRef(Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: false }));
  const [emblaRow1Ref] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [autoplayRow1.current]);
  const [emblaRow2Ref] = useEmblaCarousel({ loop: true, align: "start", dragFree: true }, [autoplayRow2.current]);


  const autoplayPlugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [autoplayPlugin.current]
  );
  const [solutionsIndex, setSolutionsIndex] = useState(0);
  const [solutionsPlaying, setSolutionsPlaying] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSolutionsIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  const scrollSolutions = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const togglePlay = () => {
    if (!emblaApi) return;
    const ap = autoplayPlugin.current;
    if (solutionsPlaying) {
      ap.stop();
    } else {
      ap.play();
    }
    setSolutionsPlaying((p) => !p);
  };


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
    }).catch(() => { });

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
    }).catch(() => { });

    cmsApi.influencers({ homepage: true }).then((res) => {
      if (res.data?.length) {
        const colors = ["#CDDBC0", "#DBC0CD", "#C0C2DB", "#C0D7DB", "#DBD8C0"];
        // Use hardcoded sector data since CMS category field only has "Influencer"
        const sectors = ["Real Estate", "Fashion", "Food", "Fashion", "Lifestyle", "HR", "Tech", "Wellness", "Fashion", "Fashion"];
        const mapped = res.data.map((inf: Influencer, i: number) => ({
          name: `${inf.name}${inf.surname ? ` ${inf.surname}` : ""}`,
          archetype: inf.persona || "",
          industry: sectors[i % sectors.length] || inf.category || "Influencer",
          color: colors[i % colors.length],
          image: inf.imageUrl || "",
          country: inf.country || "",
        }));
        const mid = Math.ceil(mapped.length / 2);
        setCmsInfluencers({ row1: mapped.slice(0, mid), row2: mapped.slice(mid) });
      }
    }).catch(() => { });

    cmsApi.faqs("main").then((res) => {
      if (res.data?.length) {
        const mid = Math.ceil(res.data.length / 2);
        setCmsFaqs({
          left: res.data.slice(0, mid).map((f: Faq) => f.question),
          right: res.data.slice(mid).map((f: Faq) => f.question),
        });
      }
    }).catch(() => { });
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-dark-bg">
        {/* Background image carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt="DDiP AI hero"
              fill
              priority={i === 0}
              className={`object-cover object-center transition-opacity duration-1000 ${i === heroSlide ? "opacity-100" : "opacity-0"}`}
              sizes="100vw"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 via-transparent to-dark-bg/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex min-h-screen flex-col px-[60px] pb-10 pt-40 max-md:px-5 max-md:pt-24">
          <div className="flex flex-1 items-end pb-[15vh]">
            <h1
              className="w-full text-center uppercase text-white"
              lang="en"
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontWeight: 400,
                fontSize: '110.32px',
                lineHeight: '100px',
                letterSpacing: '0%'
              }}
            >
              <span className="relative -top-[0.05em] mr-4 inline-block align-baseline text-[0.6em]">
                <svg className="inline h-[0.9em] w-[0.9em]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="24" y1="2" x2="24" y2="46" />
                  <line x1="2" y1="24" x2="46" y2="24" />
                  <line x1="7" y1="7" x2="41" y2="41" />
                  <line x1="41" y1="7" x2="7" y2="41" />
                </svg>
              </span>
              CREATE YOUR
              <br />
              &nbsp;&nbsp;OWN AI INFLUENCER
              <br />
              <span className="mr-[170px]">WITH US!</span>
            </h1>
          </div>

          {/* Problem text — left side, aligned with heading area */}
          <div className="absolute right-[200px] top-[45%] mt-[10px] max-w-[300px] text-left">
            <p className="flex items-center gap-2 text-white"
              style={{
                fontFamily: 'SF Pro Display, sans-serif',
                fontWeight: 400,
                fontSize: '20.34px',
                lineHeight: '120%'
              }}
            >
              <svg className="inline h-4 w-4" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="24" y1="2" x2="24" y2="46" />
                <line x1="2" y1="24" x2="46" y2="24" />
                <line x1="7" y1="7" x2="41" y2="41" />
                <line x1="41" y1="7" x2="7" y2="41" />
              </svg>
              Problem:
            </p>
            <p
              className="mt-2 text-white/90"
              style={{
                fontFamily: 'SF Pro Display, sans-serif',
                fontWeight: 400,
                fontSize: '18.34px',
                lineHeight: '120%'
              }}
            >
              We need to promote our brand but the influencer prices are too high.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between" style={{ position: "relative", top: "-190px", paddingLeft: "80px", paddingRight: '40px' }}>
            <div className="flex flex-col gap-4">
              <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-[90px] w-auto" aria-label="Scroll down">
                <g clipPath="url(#arrow-clip)">
                  <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="arrow-clip">
                    <rect width="98.9811" height="122" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <a
                href="#discover"
                className="text-white underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-teal-500"
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 400,
                  fontSize: '25px',
                  lineHeight: '120%'
                }}
              >
                Discover AI Solutions
              </a>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setHeroSlide(i)}
                      className={`h-2 rounded-full transition-all ${i === heroSlide ? "w-6 bg-white" : "w-2 bg-white/30"}`}
                    />
                  ))}
                </div>
                <button
                  aria-label={heroPlaying ? "Pause carousel" : "Play carousel"}
                  onClick={() => setHeroPlaying((p) => !p)}
                  className="ml-1 flex h-6 w-6 items-center justify-center text-white/60 transition-colors hover:text-white"
                >
                  {heroPlaying ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Talk to AI widget */}
            <div className="relative h-[250px] w-[253px]">
              <Image
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/893c48e8-59f1-400e-9cb8-0d36b752db00/public"
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
      <section className="bg-light-bg py-16 pb-24">
        <div className="px-[60px]">
          {/* Top row: tagline left + description right */}
          <div className="flex gap-16">
            <div className="w-1/2">
              <p className="font-heading text-[24px] font-normal leading-[1.2] text-[#063746]">
                From Insight to Intelligence
              </p>
            </div>
            <div className="w-1/2">
              <p
                className="text-[28px] font-bold leading-[1.3] text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                We help brands unlock their creative potential through the
                synergy of human insight and AI-driven precision.
              </p>
            </div>
          </div>

          {/* 4 Capability Cards */}
          <div className="mt-16 grid grid-cols-2 gap-x-12 gap-y-8 pl-[50%]">
            {capabilities.map((cap) => (
              <div key={cap.title}>
                <h3 className="font-heading text-[24px] font-semibold uppercase leading-[1.2] text-[#063746]" lang="en">
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
      <div className="mt-16 overflow-hidden px-[60px]" ref={emblaRef}>
        <div className="flex gap-[33px]">
          {cmsSolutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group flex-shrink-0"
              style={{ width: "clamp(600px, 48vw, 1074px)" }}
            >
              <div className="overflow-hidden rounded-[33px] bg-white">
                {/* Media area */}
                <div className="relative aspect-[974/536] overflow-hidden rounded-[17px] mx-[50px] mt-[50px]">
                  {solution.mediaType === "video" ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    >
                      <source src={solution.media} type="video/mp4"  />
                    </video>
                  ) : (
                    <img
                      src={solution.media}
                      alt={solution.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
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
      </div>

      {/* Controls — Play/Pause + Dots */}
      <div className="mt-6 flex items-center justify-center gap-4">


        {/* Dots */}
        <div className="flex items-center gap-[6px]">
          {cmsSolutions.map((_, i) => (
            <button
              key={i}
              onClick={() => { scrollSolutions(i); setSolutionsPlaying(false); autoplayPlugin.current.stop(); }}
              aria-label={`Slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === solutionsIndex ? 24 : 8,
                height: 8,
                borderRadius: 9999,
                backgroundColor: "#A1A1A1",
                opacity: i === solutionsIndex ? 1 : 0.25,
              }}
            />
          ))}
        </div>
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          aria-label={solutionsPlaying ? "Pause" : "Play"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#A1A1A1] text-[#A1A1A1] transition hover:bg-[#A1A1A1] hover:text-white"
        >
          {solutionsPlaying ? (
            <Pause className="h-4 w-4 fill-current" />
          ) : (
            <Play className="h-4 w-4 fill-current" />
          )}
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════
          5. SELECTED WORK — 2x2 portfolio grid
          Figma sections 30-35
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24 lg:py-32">
        <div className="px-[60px]">
          <div className="flex items-end justify-between">
            <h2
              className="font-heading text-[clamp(60px,7vw,120px)] font-bold uppercase text-[#063746]"
              style={{ lineHeight: "0.99" }}
              lang="en"
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
                        className="rounded-full border border-white/50 bg-white/70 px-4 py-[10px] text-[10px] leading-[1.2] text-[#063746]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Info below image */}
                <div className="mt-5 flex items-baseline justify-between">
                  <div style={{ width: '40%' }}>
                    <h3 className="font-heading text-[25px] font-normal leading-[1.2] text-[#063746]">
                      {item.title}
                    </h3>
                    <p
                      className="mt-1 text-[18px] leading-[1.2] text-[#063746]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.subtitle}
                    </p>
                  </div>
                  <span
                    className="text-[25px] uppercase leading-[1.2] text-[#063746]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    ({item.category})
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. THE DDIP APPROACH
          Figma sections 36-39: Dark bg, gradient headline, full-width image
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24 lg:py-32">
        <div className="px-[60px]">
          <p className="text-center font-heading text-[24px] font-normal uppercase tracking-wider text-[#039EB7]">
            The DDIP Approach
          </p>
          <h2
            className="mt-6 text-center text-[80px] font-bold uppercase leading-[1.01]"
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
            className="mx-auto mt-16 max-w-[1065px] text-center text-[26px] leading-[1.5] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We believe continuous learning especially in AI. While we follow the trends,
            also we track emerging AI tools, test their creative potential, and integrate
            only the ones that meet our performance standards.
          </p>
          <p
            className="mx-auto mt-8 max-w-[1065px] text-center text-[26px] leading-[1.5] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every DDIP project operates through this evolving framework,
            combining precision, adaptability, and creative control to deliver results that stay ahead of the curve.
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

          {/* Subtitle — only highlighted words in white */}
          <p
            className="mx-auto mt-8 max-w-[977px] text-center text-[34px] leading-[1.19] text-[#90B2BD]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our AI influencers represent the <span className="text-white">next step</span> in brand communication,
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
                Influencer
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
              <svg className="h-[16px] w-[24px] text-white transition-colors group-hover:text-[#1CE3F4]" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M0 8h22M16 1l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Influencer Cards — 2 rows, horizontal scroll */}
          <div className="mt-10 overflow-hidden px-[60px]" ref={emblaRow1Ref}>
            <div className="flex gap-5">
              {[...cmsInfluencers.row1, ...cmsInfluencers.row1].map((inf, idx) => (
                <div key={`row1-${idx}`} className="w-[376px] flex-shrink-0 cursor-pointer" onClick={() => { setSelectedInfluencer(inf); setIsInfluencerPopupOpen(true); }}>
                  <div className="relative h-[518px] w-full overflow-hidden rounded-[20px] bg-[#EFEFEF]">
                    <img
                      src={inf.image}
                      alt={inf.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
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
                    <div className="absolute bottom-[20px] left-[20px] right-[20px] flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-[#063746B2] px-[22px] py-[12px]">
                        {inf.country && (
                          <img
                            src={`https://flagcdn.com/w20/${inf.country.toLowerCase()}.png`}
                            alt={inf.country}
                            className="h-[14px] w-[20px] rounded-sm object-cover"
                          />
                        )}
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
                  </div>
                  <p
                    className="mt-4 text-[20px] leading-[1.2] text-[#90B2BD]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    &ldquo;{inf.archetype}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="mt-8 overflow-hidden px-[60px]" ref={emblaRow2Ref}>
            <div className="flex gap-5">
              {[...cmsInfluencers.row2, ...cmsInfluencers.row2].map((inf, idx) => (
                <div key={`row2-${idx}`} className="w-[376px] flex-shrink-0 cursor-pointer" onClick={() => { setSelectedInfluencer(inf); setIsInfluencerPopupOpen(true); }}>
                  <div className="relative h-[518px] w-full overflow-hidden rounded-[20px] bg-[#EFEFEF]">
                    <img
                      src={inf.image}
                      alt={inf.name}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
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
                    <div className="absolute bottom-[20px] left-[20px] right-[20px] flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-[#063746B2] px-[22px] py-[12px]">
                        {inf.country && (
                          <img
                            src={`https://flagcdn.com/w20/${inf.country.toLowerCase()}.png`}
                            alt={inf.country}
                            className="h-[14px] w-[20px] rounded-sm object-cover"
                          />
                        )}
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
                  </div>
                  <p
                    className="mt-4 text-[20px] leading-[1.2] text-[#90B2BD]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    &ldquo;{inf.archetype}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
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
            className="text-center text-[80px] font-bold uppercase leading-[1.01]"
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
            className="mx-auto mt-10 max-w-[1380px] text-center text-[30px] leading-[1.5] text-[#4D5347]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our AI automation systems accelerate processes across every layer of
            business, from content generation and chatbot communication to data
            analysis and voice assistants.
          </p>

          {/* Workflow image */}
          <div className="mt-12 aspect-[1608/905] overflow-hidden">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover">
              <source src="/videos/IntroducingaIworkflow.mp4" type="video/mp4" />
            </video>
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
                creativity, strategy, and innovation.
              </p>
              <p
                className="mt-8 text-[26px] leading-[1.5] text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                With tailor-made integrations, DDIP automation unlocks new
                opportunities for efficiency and creativity, no matter the field.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
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
          9. PARTNERS (moved before FAQ per client feedback)
          Figma sections 47-57: 5 bordered logo boxes
          ════════════════════════════════════════════════════════ */}
      <PartnersSection />

      {/* ════════════════════════════════════════════════════════
          11. FAQ
          Figma section 58: Dark card #002834, 2-column FAQ, bottom CTA
          ════════════════════════════════════════════════════════ */}
      <FaqSection leftQuestions={cmsFaqs.left} rightQuestions={cmsFaqs.right} />

      {/* ════════════════════════════════════════════════════════
          +45 AI TOOLS (moved after FAQ per client feedback)
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-20">
        <div className="px-[60px]">
          <div className="relative mx-auto h-[586px] max-w-[1600px]">
            {/* Center text */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="whitespace-nowrap font-heading text-[40px] font-normal leading-[1] text-[#063746]">
                +45 Ai Tools
              </p>
            </div>
            {/* Scattered AI tool logos */}
            {[
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5043405a-6e5f-4c14-6aaf-9ebf92610000/public", name: "OpenAI", bottom: "30%", right: "30%", size: 90 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cd8329ab-0c6e-4af4-6359-0f0b61658d00/public", name: "Midjourney", top: "30%", left: "67%", size: 64 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/df711488-1e63-475f-dee3-decf21bf1b00/public", name: "Runway", top: "20%", left: "40%", size: 70 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/43af238f-dd9a-4972-0cec-30c1574b5c00/public", name: "Gemini", top: "60%", left: "7%", size: 77 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/18e03f8f-d739-4565-e211-e1cb4e564d00/public", name: "HeyGen", top: "28%", left: "50%", size: 70 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2ee2e61a-e270-4996-3f0c-1b6fa0b1b000/public", name: "Flux", top: "60%", left: "48%", size: 56 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3aacf09f-82e4-4124-2813-12e031176900/public", name: "Kling", top: "65%", left: "38%", size: 70 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/26273e24-6117-4535-de64-3f1168a8b300/public", name: "Freepik", top: "27%", right: "15%", size: 101 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3e2eb0ae-118a-4733-e1cf-812e90934200/public", name: "Minimax", top: "35%", left: "15%", size: 92 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b00ee700-e432-4bc1-bde0-93196a4f2900/public", name: "Veo", top: "65%", left: "20%", size: 90 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/50fb6339-c64b-468a-f30b-525f4ec61000/public", name: "Seedream", top: "55%", left: "85%", size: 109 },
              { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/99fe4e74-0843-449e-9b8d-ead7ca7f3e00/public", name: "Mystic", top: "40%", left: "25%", size: 86 },
            ].map((tool) => (
              <img
                key={tool.name}
                src={tool.src}
                alt={tool.name}
                className="absolute opacity-80 transition-opacity duration-300 hover:opacity-100"
                style={{
                  top: tool.top,
                  right: tool?.right,
                  bottom: tool?.bottom,
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
          CTA BAR — "Let's design what's next together."
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

      <InfluencerPopupModal
        open={isInfluencerPopupOpen}
        onClose={() => setIsInfluencerPopupOpen(false)}
        influencer={selectedInfluencer}
      />
    </>
  );
}
