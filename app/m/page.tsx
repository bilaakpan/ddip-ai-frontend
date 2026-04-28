"use client";
import Link from "next/link";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import FaqSection from "@/components/desktop/FaqSection";
import PartnersSection from "@/components/desktop/PartnersSection";
import { PopupInfluencer, } from "@/components/desktop/influencer-popUp";
import HlsPlayer from "@/components/desktop/video";
import { InfluencerPopupModal } from "@/components/mobile/influencer-popUp";
import { cmsApi, type AiSolution, type Work, type Influencer, type Faq } from "@/lib/api";

/* ─── CMS data shapes (used by state) ─── */
interface SolutionCardData {
  title: string;
  href: string;
  media: string;
  mediaType: "video" | "image";
  description: string;
  tags: string[];
}

interface WorkCardData {
  title: string;
  subtitle: string;
  category: string;
  video: string;
  tags: string[];
}

interface InfluencerCardData {
  name: string;
  archetype: string;
  industry: string;
  color: string;
  image: string;
  country: string;
}

interface FaqEntry {
  question: string;
  answer: string;
}

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

// AI Solutions, Selected Work, Influencers, FAQs all come from CMS API only

const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "/images/partners/google.svg" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];

const heroImages = [
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/668d2dbe-1430-43f2-d9d4-43fdd6b55f00/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ca026e67-6810-45b1-4bf2-f1e8aeacd800/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a14a9b12-bd23-450e-1009-79149e9d7f00/public",
];
const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState<FaqEntry[]>([]);

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

  // CMS data state — empty by default, populated from API. No hardcoded fallback.
  const [cmsSolutions, setCmsSolutions] = useState<SolutionCardData[]>([]);
  const [cmsWorks, setCmsWorks] = useState<WorkCardData[]>([]);
  const [cmsInfluencers, setCmsInfluencers] = useState<{ row1: InfluencerCardData[]; row2: InfluencerCardData[] }>({ row1: [], row2: [] });

  // Load CMS data from backend API
  useEffect(() => {
    cmsApi.aiSolutions().then((res) => {
      setCmsSolutions(
        (res.data ?? []).map((s: AiSolution) => ({
          title: s.title,
          href: `/ai-solutions/${s.slug}`,
          media: s.mediaUrl || "",
          mediaType: (s.mediaType as "video" | "image") || "image",
          description: s.body || "",
          tags: s.tags?.map((t) => t.tag.name) || [],
        }))
      );
    }).catch(() => setCmsSolutions([]));

    cmsApi.works(true).then((res) => {
      setCmsWorks(
        (res.data ?? []).map((w: Work) => ({
          title: w.title,
          subtitle: w.body || "",
          category: w.field || "",
          video: w.mediaUrl || "",
          tags: w.tags?.map((t) => t.tag.name) || [],
        }))
      );
    }).catch(() => setCmsWorks([]));

    cmsApi.influencers({ homepage: true }).then((res) => {
      const colors = ["#CDDBC0", "#DBC0CD", "#C0C2DB", "#C0D7DB", "#DBD8C0"];
      const mapped: InfluencerCardData[] = (res.data ?? []).map((inf: Influencer, i: number) => ({
        name: `${inf.name}${inf.surname ? ` ${inf.surname}` : ""}`,
        archetype: inf.persona || "",
        industry: inf.category || "Influencer",
        color: colors[i % colors.length],
        image: inf.imageUrl || "",
        country: inf.countryCode || inf.country || "",
      }));
      const mid = Math.ceil(mapped.length / 2);
      setCmsInfluencers({ row1: mapped.slice(0, mid), row2: mapped.slice(mid) });
    }).catch(() => setCmsInfluencers({ row1: [], row2: [] }));

    cmsApi.faqs("main").then((res) => {
      setCmsFaqs(
        (res.data ?? []).map((f: Faq) => ({ question: f.question, answer: f.answer ?? "" }))
      );
    }).catch(() => setCmsFaqs([]));
  }, []);

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

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-black flex flex-col">
        {/* Top: portrait video fills upper portion */}
        <div className="relative w-125" style={{ height: "55vh" }}>
          <HlsPlayer
            src="https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/1a3475f20aa2ad6346f9c1087f74d458/manifest/video.m3u8"
            className="absolute inset-0 object-cover w-full h-full"
            autoPlay={true}
            muted={true}
            loop={true}
            controls={false}
          />
          {/* Bottom fade into black */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black" />
        </div>

        {/* Bottom: dark content area - overlapping image and below */}
        <div className="relative z-10 -mt-30 flex flex-1 flex-col justify-between bg-transparent px-5 pb-8 pt-4">
          {/* Heading */}
          <div>
            <h1
              className="uppercase text-white leading-none"
              lang="en"
              style={{
                fontFamily: 'Bricolage Grotesque, sans-serif',
                fontSize: '42px',
              }}
            >
              <div className="flex">
                {/* Star icon inline before first line */}
                <div className="inline-flex items-start gap-2 mt-2 mr-2">
                  <svg
                    className="shrink-0"
                    style={{ width: '0.75em', height: '0.75em', marginBottom: '0.05em' }}
                    viewBox="0 0 48 48"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <line x1="24" y1="2" x2="24" y2="46" />
                    <line x1="2" y1="24" x2="46" y2="24" />
                    <line x1="7" y1="7" x2="41" y2="41" />
                    <line x1="41" y1="7" x2="7" y2="41" />
                  </svg>

                </div>
                <div>
                  CREATE YOUR
                  <br />
                  OWN AI
                  <br />
                  INFLUENCER
                  <br />
                  WITH US!
                  {/* Problem text */}
                  <div className="mt-5">
                    <p
                      className="font-semibold text-white"
                      style={{
                        fontFamily: 'SF Pro Display, sans-serif',
                        fontSize: '15px',
                        lineHeight: '1.3',
                      }}
                    >
                      Problem:
                    </p>
                    <p
                      className="mt-1 text-white lowercase"
                      style={{
                        fontFamily: 'SF Pro Display, sans-serif',
                        fontSize: '14px',
                        lineHeight: '1.5',
                      }}
                    >
                      We need to promote our brand but the influencer prices are too high.
                    </p>
                  </div>
                </div>
              </div>
            </h1>
          </div>

          {/* Bottom bar: arrow+link | whatsapp | talk to AI */}
          <div className="flex items-end justify-between">
            {/* Left: arrow + discover link */}
            <div className="flex flex-col gap-2">
              <svg width="28" height="36" viewBox="0 0 99 122" fill="none" aria-label="Scroll down">
                <g clipPath="url(#m-arrow-clip)">
                  <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="m-arrow-clip">
                    <rect width="100" height="130" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <a
                href="#discover"
                className="text-white underline decoration-white/40 underline-offset-4"
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '1.2',
                }}
              >
                Discover AI Solutions
              </a>
            </div>

            {/* Right: Talk to AI widget */}
            <div className="relative overflow-hidden rounded-[10px]" style={{ width: 120, height: 150 }}>
              <Image
                unoptimized
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/893c48e8-59f1-400e-9cb8-0d36b752db00/public"
                alt="Talk to our AI assistant"
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. STATEMENT — "WE DON'T JUST USE AI WE DESIGN WITH IT."
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pt-8 pb-10">
        {/* Video — rounded rectangle with side margins */}
        <div className="mx-5 overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <HlsPlayer
            src="9e3a0d22828697a21a65a4ea035f5c3d"
            autoPlay={true}
            controls={false}
            muted={true}
            loop={true}
            fillHeight={true}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Text below video */}
        <div className="px-5 pt-8">
          <p
            className="mb-4 font-semibold text-[#126478]"
            style={{ fontFamily: "var(--font-body)", fontSize: "24px" }}
          >
            Why DDIP AI
          </p>
          <h2
            className="font-bold uppercase text-[#063746]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "58px",
              lineHeight: "1.0",
              letterSpacing: "-0.02em",
            }}
          > WE DON&apos;T JUST USE AI WE DESIGN WITH IT.
          </h2>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. ABOUT — "From Insight to Intelligence" + 4 Capability Cards
          Figma sections 19-24
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-10 pb-12">
        <div className="px-5">
          {/* Tagline + description — stacked */}
          <p
            className="text-[22px] leading-[1.3] text-[#126478]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            From Insight to Intelligence
          </p>
          <p
            className="mt-3 text-[28px] font-medium leading-[1.3] text-[#063746]"

          >
            We help brands unlock their creative potential through the synergy of human insight and AI-driven precision.
          </p>

          {/* 4 Capability items — single column */}
          <div className="mt-8 flex flex-col gap-7">
            {capabilities.map((cap) => (
              <div key={cap.title}>
                <h3
                  className="text-[18px] uppercase leading-normal text-[#063746]"
                  style={{ fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
                  lang="en"
                >
                  {cap.title}
                </h3>
                <p
                  className="mt-2 text-[16px] leading-normal text-[#063746]"
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
          4. OUR AI SOLUTIONS — mobile swipeable cards
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pt-8 pb-10">
        {/* Section heading */}
        <div className="px-5 mb-6">
          <h2
            className="font-medium uppercase text-[#063746]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(44px, 12vw, 56px)",
              lineHeight: "1.0",
              letterSpacing: "-0.02em",
            }}
          >
            OUR AI
            <br />
            SOLUTIONS
          </h2>
        </div>

        {/* Swipeable cards */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {cmsSolutions.map((solution) => (
              <Link
                key={solution.title}
                href={solution.href}
                className="shrink-0 w-screen px-2"
              >
                {/* Solution title above media */}
                <p
                  className="mb-3 font-semibold text-[#063746]"
                  style={{ fontFamily: "var(--font-body)", fontSize: "17px" }}
                >
                  {solution.title}
                </p>

                {/* Media — rounded rectangle */}
                <div className="relative overflow-hidden rounded-card w-full" style={{ aspectRatio: "16/10" }}>
                  {solution.mediaType === "video" ? (
                    <HlsPlayer
                      src={solution.media}
                      autoPlay={true}
                      controls={false}
                      muted={true}
                      loop={true}
                      fillHeight={true}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  ) : (
                    <Image
                      src={solution.media}
                      alt={solution.title}
                      fill
                      unoptimized
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* Description */}
                <p
                  className="mt-4 text-[15px] leading-normal text-[#063746]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {solution.description}
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#063746]/40 px-3 py-1.5 text-[11px] leading-normal text-[#063746]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Controls — Dots + Play/Pause */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-[#E8E8E8] px-4 py-2">
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
                  backgroundColor: i === solutionsIndex ? "#063746" : "#A1A1A1",
                  opacity: i === solutionsIndex ? 1 : 0.4,
                }}
              />
            ))}
          </div>
          <button
            onClick={togglePlay}
            aria-label={solutionsPlaying ? "Pause" : "Play"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#A1A1A1] text-[#A1A1A1] transition hover:bg-[#A1A1A1] hover:text-white"
          >
            {solutionsPlaying ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. SELECTED WORK — mobile single column
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pt-8 pb-10">
        <div className="px-5">
          {/* Heading */}
          <h2
            className="font-medium uppercase text-[#063746]"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "36px",
              lineHeight: "1.0",
              letterSpacing: "-0.02em",
            }}
            lang="en"
          >
            SELECTED
            <br />
            WORK
          </h2>

          {/* Cards — stacked vertically */}
          <div className="mt-6 flex flex-col gap-8">
            {cmsWorks.map((item) => (
              <Link key={item.title} href="/works">
                {/* Video with rounded corners */}
                <div className="relative w-full h-115 overflow-hidden bg-[#D9D9D9]" style={{ aspectRatio: "4/3" }}>
                  <HlsPlayer
                    src={item.video}
                    autoPlay={true}
                    controls={false}
                    muted={true}
                    loop={true}
                    fillHeight={true}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Tag pills — top right overlay */}
                  <div className="absolute right-3 top-3 uppercase flex flex-wrap gap-1.5 max-w-[70%] bg-white rounded-full text-[#000000] text-[12px]" style={{padding:"10px 16px"}}>
                    {item.category}
                  </div>
                  {/* Tag pills — boottom left overlay */}
                  <div className="absolute left-3 bottom-3 flex flex-wrap gap-1.5 max-w-[70%]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/50 bg-white/75 px-2 py-1 text-[9px] leading-normal text-[#063746]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info below */}
                <div className="mt-3">
                  <h3
                    className="text-[22px] font-semibold leading-normal text-[#063746]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-1 text-[14px] leading-normal text-[#063746]/70"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* See more link — centered at bottom */}
          <div className="mt-8 text-center">
            <Link
              href="/works"
              className="text-[24px] text-[#063746] underline underline-offset-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              See more of our work
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. THE DDIP APPROACH — mobile
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pt-10 pb-12">
        {/* Label + heading */}
        <div className="px-5 text-center">
          <p
            className="font-normal text-[#039EB7]"
            style={{ fontFamily: "var(--font-body)", fontSize: "18px" }}
          >
            The DDIP Approach
          </p>
          <h2
            className="mt-3 font-bold uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "32px",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            WE DESIGN SYSTEMS
            <br />
            THAT EVOLVE WITH
            <br />
            THE INDUSTRY.
          </h2>
        </div>

        {/* Full-width video */}
        <div className="mt-8 w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <HlsPlayer
            src="665822d5062aae2129504c3a2b474494"
            autoPlay={true}
            controls={false}
            muted={true}
            loop={true}
            fillHeight={true}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Body text */}
        <div className="px-5 mt-8">
          <p
            className="text-center text-[14px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We believe continuous learning especially in AI. While we follow the trends,
            also we track emerging AI tools, test their creative potential, and integrate
            only the ones that meet our performance standards.
          </p>
          <p
            className="mt-5 text-center text-[13px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Every DDIP project operates through this evolving framework,
            combining precision, adaptability, and creative control to deliver results that stay ahead of the curve.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. THE FUTURE FACE OF BRANDS — mobile
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pt-10 pb-10">
        <div className="relative z-10">
          {/* Title */}
          <div className="px-5 text-center">
            <h2
              className="font-bold uppercase text-[#1CE3F4]"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "32px",
                lineHeight: "1.05",
              }}
            >
              THE FUTURE FACE OF BRANDS
            </h2>

            <p
              className="mx-auto mt-4 text-center text-[14px] leading-[1.6] text-[#90B2BD]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our AI influencers represent the <span className="font-bold text-white">next step</span> in brand
              communication, combining expressiveness, adaptability, and visual intelligence.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="mt-6 px-5">
            <div className="flex items-center rounded-full bg-white px-2 py-2 gap-1">
              <button
                className="flex-1 rounded-full bg-[#063746] py-2 text-[13px] font-medium leading-[1.2] text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Influencer
              </button>
              <button
                className="flex-1 rounded-full py-2 text-[13px] leading-[1.2] text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Ambassador
              </button>
              <button
                className="flex-1 rounded-full py-2 text-[13px] leading-[1.2] text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Mascot
              </button>
            </div>
          </div>

          {/* Single-row scrolling influencer cards */}
          <div className="mt-6 overflow-hidden" ref={emblaRow1Ref}>
            <div className="flex gap-4 px-5">
              {[...cmsInfluencers.row1, ...cmsInfluencers.row2].map((inf, idx) => (
                <div
                  key={`inf-${idx}`}
                  className="shrink-0 cursor-pointer"
                  style={{ width: "calc(75vw)" }}
                  onClick={() => { setSelectedInfluencer(inf); setIsInfluencerPopupOpen(true); }}
                >
                  {/* Card image */}
                  <div className="relative overflow-hidden rounded-2xl bg-[#EFEFEF]" style={{ aspectRatio: "3/4" }}>
                    <Image
                      unoptimized
                      src={inf.image}
                      alt={inf.name}
                      fill
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    {/* Industry tag — top right */}
                    <div
                      className="absolute right-3 top-3 rounded-full px-3 py-1.25"
                      style={{ backgroundColor: inf.color }}
                    >
                      <span
                        className="text-[11px] uppercase leading-[1.2] text-black font-medium"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {inf.industry}
                      </span>
                    </div>
                    {/* Bottom: name + flag + plus button */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full bg-[#063746CC] px-3 py-2">
                        {inf.country && (
                          <Image
                            src={`https://flagcdn.com/w20/${inf.country.toLowerCase()}.png`}
                            alt={inf.country}
                            height={4}
                            width={5}
                            unoptimized
                            className="h-3 w-4.5 rounded-sm object-cover"
                          />
                        )}
                        <span
                          className="text-[13px] leading-[1.2] text-white"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {inf.name}
                        </span>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
                        <svg className="h-4.5 w-4.5 text-[#012F3B]" viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="4">
                          <line x1="15" y1="0" x2="15" y2="30" />
                          <line x1="0" y1="15" x2="30" y2="15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Archetype below card */}
                  <p
                    className="mt-2 text-[12px] leading-[1.3] text-[#90B2BD]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    &ldquo;{inf.archetype}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Discover More — bottom right */}
          <div className="mt-6 flex items-center justify-end px-5">
            <Link
              href="/m/ai-solutions/ai-influencer"
              className="flex items-center gap-2"
            >
              <span
                className="text-[15px] font-semibold text-white underline underline-offset-4"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Discover More
              </span>
              <svg className="h-4.5 w-4.5 text-white" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M0 8h22M16 1l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. SMARTER WORKFLOWS — mobile
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pt-10 pb-12">
        {/* Heading + description */}
        <div className="px-5">
          <h2
            className="font-bold uppercase"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "32px",
              lineHeight: "1.05",
              letterSpacing: "-0.01em",
              background: "linear-gradient(199deg, #063746 0%, #00BCCF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            SMARTER
            <br />
            WORKFLOWS,
            <br />
            LIMITLESS POTENTIAL
          </h2>

          <p
            className="mt-4 text-[14px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our AI automation systems accelerate processes across every layer of
            business, from content generation and chatbot communication to data
            analysis and voice assistants.
          </p>
        </div>

        {/* Full-width video — no side margins */}
        <div className="mt-6 w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <HlsPlayer
            src="bdb805b635f8e3a865a3157336836136"
            autoPlay={true}
            controls={false}
            muted={true}
            loop={true}
            fillHeight={true}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Sub-section */}
        <div className="px-5 mt-8">
          <h3
            className="text-[22px] font-normal leading-[1.3] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Systems designed to move ideas faster.
          </h3>

          <p
            className="mt-4 text-[15px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            They are designed to minimize human intervention where it is not
            needed, allowing people to focus on what drives true value:
            creativity, strategy, and innovation.
          </p>
          <p
            className="mt-4 text-[14px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            With tailor-made integrations, DDIP automation unlocks new
            opportunities for efficiency and creativity, no matter the field.
          </p>

          {/* CTA Button */}
          <div className="mt-6">
            <Link
              href="/m/ai-solutions"
              className="inline-flex items-center gap-4 rounded-full bg-[#063746] py-2.5 pl-5 pr-2.5"
            >
              <span
                className="text-[15px] font-medium leading-[1.2] text-white"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Explore Our Workflows
              </span>
              <span className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-[#039EB7]">
                <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="3">
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
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[40px] font-bold uppercase leading-none text-[#063746] mb-6">
          Partners
        </h2>

        {/* Top row — 2 wide cells */}
        <div className="border border-[#C3C3C3]">
          <div className="grid grid-cols-2">
            {partners.slice(0, 2).map((partner) => (
              <div key={partner.name} className="flex h-35 items-center justify-center border-r border-[#C3C3C3] last:border-r-0">
                {partner.image ? (
                  <img src={partner.image} alt={partner.name} className="max-h-15 max-w-30 object-contain" />
                ) : (
                  <span className="font-heading text-lg font-semibold text-[#063746]/40">{partner.name}</span>
                )}
              </div>
            ))}
          </div>

          {/* Bottom row — 3 equal cells */}
          <div className="grid grid-cols-3 border-t border-[#C3C3C3]">
            {partners.slice(2).map((partner) => (
              <div key={partner.name} className="flex h-30 items-center justify-center border-r border-[#C3C3C3] last:border-r-0">
                {partner.image ? (
                  <img src={partner.image} alt={partner.name} className="max-h-12 max-w-22 object-contain" />
                ) : (
                  <span className="font-heading text-base font-semibold text-[#063746]/40">{partner.name}</span>
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
      <section className="bg-light-bg py-10">
        <div className="rounded-[20px] bg-dark-bg p-5">
          <h2 className="mb-5 font-heading text-[36px] font-medium uppercase text-[#FFFFFF]">
            FAQ
          </h2>
          <hr className="text-[#EBFFFF33]" />
          <div className="flex flex-col">
            {cmsFaqs.map((faq, i) => (
              <div key={i} className="border-b border-[#EBFFFF33]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-[16px] leading-snug text-[#FFFFFF]">{i + 1}. {faq.question}</span>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center text-[16px] text-white transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[12px] leading-relaxed text-[#90B2BD]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-50">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/73a7b6be-f52c-4654-74ee-8749e23d0a00/public" alt="FAQ Support" className="w-full h-full mx-auto object-cover rounded-xl" />
          </div>
          <div className="mt-5 text-start">
            <p className="text-[26px] font-medium text-white">Live FAQ</p>
            <p className="mt-1 text-[28px] font-bold text-white">Didn&apos;t find your answer?</p>

            <Link href="/lets-connect" className="w-full justify-center mt-4 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-2.5 text-[18px] font-medium text-dark-bg active:opacity-80">
              Talk to AI
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          +45 AI TOOLS — mobile scattered layout
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-10">
        <div className="relative mx-auto w-full" style={{ height: "420px" }}>
          {/* Center text */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="whitespace-nowrap font-heading text-[28px] font-normal leading-none text-[#063746]">
              +45 Ai Tools
            </p>
          </div>
          {/* Scattered logos — repositioned for portrait mobile */}
          {[
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5043405a-6e5f-4c14-6aaf-9ebf92610000/public", name: "OpenAI", top: "52%", right: "4%", size: 72 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cd8329ab-0c6e-4af4-6359-0f0b61658d00/public", name: "Midjourney", top: "4%", right: "10%", size: 68 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/df711488-1e63-475f-dee3-decf21bf1b00/public", name: "Runway", top: "12%", left: "30%", size: 58 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/43af238f-dd9a-4972-0cec-30c1574b5c00/public", name: "Gemini", top: "28%", right: "28%", size: 52 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/18e03f8f-d739-4565-e211-e1cb4e564d00/public", name: "HeyGen", top: "60%", left: "38%", size: 56 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2ee2e61a-e270-4996-3f0c-1b6fa0b1b000/public", name: "Flux", top: "72%", left: "22%", size: 50 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3aacf09f-82e4-4124-2813-12e031176900/public", name: "Kling", top: "75%", right: "18%", size: 58 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/26273e24-6117-4535-de64-3f1168a8b300/public", name: "Freepik", top: "30%", right: "5%", size: 64 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3e2eb0ae-118a-4733-e1cf-812e90934200/public", name: "Minimax", top: "32%", left: "8%", size: 72 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b00ee700-e432-4bc1-bde0-93196a4f2900/public", name: "Veo", top: "62%", left: "4%", size: 68 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/50fb6339-c64b-468a-f30b-525f4ec61000/public", name: "Seedream", top: "6%", left: "5%", size: 72 },
            { src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/99fe4e74-0843-449e-9b8d-ead7ca7f3e00/public", name: "Mystic", top: "8%", left: "48%", size: 56 },
          ].map((tool) => (
            <Image
              key={tool.name}
              src={tool.src}
              unoptimized
              alt={tool.name}
              height={tool.size}
              width={tool.size}
              className="absolute opacity-90"
              style={{
                top: tool.top,
                right: (tool as any).right,
                left: (tool as any).left,
                width: tool.size,
                height: tool.size,
                objectFit: "contain",
              }}
            />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA BAR — "Let's design what's next together."
          Figma section 60: Gradient bar
          ════════════════════════════════════════════════════════ */}
      <section
        className="bg-light-bg"
        style={{
          paddingLeft: "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingBottom: "max(64px, calc(16px + env(safe-area-inset-bottom)))",
        }}
      >
        <div className="rounded-[20px] p-6 text-start" style={{ background: "linear-gradient(-90deg,#002834 0%,#129CAC 100%)" }}>
          <p className="font-heading text-[22px] font-bold text-[#EBFFFF]">
            Let&apos;s design what&apos;s next together.
          </p>
          <Link href="/start-project" className="mt-5 inline-flex  w-full items-center justify-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[18px] font-medium text-dark-bg active:opacity-80">
            Begin Your Transformation
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
