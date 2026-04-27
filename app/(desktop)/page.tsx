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
import HlsPlayer from "@/components/desktop/video";

/* ─── Data ─── */

type HeroMediaType = "image" | "video";

interface HeroMedia {
  src: string;
  type: HeroMediaType;
}

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

// ─── Type definitions for CMS-driven sections ───
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

const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "/images/partners/google.svg" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];


export default function HomePage() {
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPlaying, setHeroPlaying] = useState(false);
  const heroTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroVideoRef = useRef<any>(null);
  const [isInfluencerPopupOpen, setIsInfluencerPopupOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<PopupInfluencer | null>(null);
  const [activeFilter, setActiveFilter] = useState("Influencer");
  const startHeroTimer = useCallback(() => {
    if (heroTimer.current) clearInterval(heroTimer.current);
    heroTimer.current = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % 3);
    }, 6000);
  }, []);

  useEffect(() => {
    if (heroPlaying) {
      // Don't start timer when video is playing
      // startHeroTimer();
    } else if (heroTimer.current) {
      clearInterval(heroTimer.current);
    }
    return () => { if (heroTimer.current) clearInterval(heroTimer.current); };
  }, [heroPlaying, startHeroTimer]);

  // Control video playback
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (heroPlaying && heroSlide === 0) {
      video.play().catch(() => { });
    } else {
      video.pause();
    }
  }, [heroPlaying, heroSlide]);

  // CMS data state — empty by default, populated from API. No hardcoded fallback.
  const [cmsSolutions, setCmsSolutions] = useState<SolutionCardData[]>([]);
  const [cmsWorks, setCmsWorks] = useState<WorkCardData[]>([]);
  const [cmsInfluencers, setCmsInfluencers] = useState<{ row1: InfluencerCardData[]; row2: InfluencerCardData[] }>({ row1: [], row2: [] });
  const [cmsFaqs, setCmsFaqs] = useState<{ left: string[]; right: string[] }>({ left: [], right: [] });
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


  // ─── Load CMS data from backend API (no hardcoded fallback) ───
  useEffect(() => {
    // AI Solutions
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

    // Highlighted Works (Selected Work section)
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

    // Homepage Influencers
    cmsApi.influencers({ homepage: true }).then((res) => {
      const colors = ["#CDDBC0", "#DBC0CD", "#C0C2DB", "#C0D7DB", "#DBD8C0"];
      const mapped = (res.data ?? []).map((inf: Influencer, i: number) => ({
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

    // Main page FAQs
    cmsApi.faqs("main").then((res) => {
      const list = res.data ?? [];
      const mid = Math.ceil(list.length / 2);
      setCmsFaqs({
        left: list.slice(0, mid).map((f: Faq) => f.question),
        right: list.slice(mid).map((f: Faq) => f.question),
      });
    }).catch(() => setCmsFaqs({ left: [], right: [] }));
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO SECTION
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg" style={{ minHeight: '100vh' }}>
        {/* Background media carousel */}
  
          <div
            className={`absolute inset-0 bg-[#0C0C06] transition-opacity duration-1000 ${heroSlide === 0 ? "opacity-100" : "opacity-0"}`}
          >
            <HlsPlayer
              ref={heroVideoRef}
              src={"1a3475f20aa2ad6346f9c1087f74d458"}
              autoPlay={false}
              controls={false}
              muted={true}
              loop={true}
              fillHeight={false}
              hoverToPlay={false}
              className="absolute inset-0 h-[615px] w-[1410px] object-cover object-top ml-[430px] "
            />
          </div>
      

        {/* Hero content */}
        <div className="relative z-10 flex flex-col px-[60px] pt-28 max-md:px-5 max-md:pt-24">
          <div className="pb-6 mt-[100px]">
            <div className="relative w-full">
              <h1
                className="w-full text-center uppercase text-white"
                lang="en"
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '0%'
                }}
              >
                <span style={{ fontSize: '150px', lineHeight: '1', display: 'block' }}>
                  <span className="relative -top-[0.05em] mr-4 inline-block align-baseline" style={{ fontSize: '0.85em' }}>
                    <svg className="inline h-[1.1em] w-[1.1em]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="24" y1="2" x2="24" y2="46" />
                      <line x1="2" y1="24" x2="46" y2="24" />
                      <line x1="7" y1="7" x2="41" y2="41" />
                      <line x1="41" y1="7" x2="7" y2="41" />
                    </svg>
                  </span>
                  CREATE YOUR
                </span>
                <span style={{ fontSize: '120px', lineHeight: '1', display: 'block', marginRight: '280px' }}>&nbsp;&nbsp;OWN AI INFLUENCER</span>
                <div className="flex row-flex justify-center  gap-[5px]">
                  <span style={{ fontSize: '155px', lineHeight: '1' }}>WITH US!</span>
                  <div className="pt-[30px] max-w-[300px] text-left">
                    <p className="flex items-center gap-2 text-white"
                      style={{
                        fontFamily: 'SF Pro Display, sans-serif',
                        fontWeight: 400,
                        fontSize: '30px',
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
                      className="ml-[25px] text-white/90"
                      style={{
                        fontFamily: 'SF Pro Display, sans-serif',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: '120%',
                        textTransform: "lowercase",
                        width: "400px"
                      }}
                    >
                      We need to promote our brand but the influencer prices are too high.
                    </p>
                  </div>
                </div>
              </h1>

              {/* Problem text — left side, aligned with heading area */}

            </div>
          </div>



          {/* Bottom bar */}
          <div className="flex items-end justify-between pb-[50px]" style={{ position: "relative", top: "-250px", marginBottom: "-250px" }}>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2 text-white">
                <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-[90px] w-auto" aria-label="Scroll down">
                  <g clipPath="url(#arrow-clip)">
                    <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
                  </g>
                  <defs>
                    <clipPath id="arrow-clip">
                      <rect width="100" height="130" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <a
                href="#discover"
                className="text-white underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-teal-500"
                style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontWeight: 400,
                  fontSize: '40px',
                  lineHeight: '120%'
                }}
              >
                Discover AI Solutions
              </a>
              <div className="flex items-center gap-4">
                {/* Indicator Capsule */}
                <div className="flex items-center gap-4 px-8 py-4 rounded-full bg-[#2d2d2d]">
                  {[0].map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setHeroSlide(i)}
                      className={`rounded-full transition-all duration-300 ${i === heroSlide
                        ? "w-14 h-2 bg-white"
                        : "w-2 h-2 bg-white"
                        }`}
                    />
                  ))}
                </div>

                {/* Play Button */}
                <button
                  aria-label={heroPlaying ? "Pause carousel" : "Play carousel"}
                  onClick={() => setHeroPlaying((p) => !p)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2d2d2d] text-white"
                >
                  {heroPlaying ? (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="5" width="4" height="14" />
                      <rect x="14" y="5" width="4" height="14" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 ml-[2px]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Talk to AI widget */}
            <div className="relative h-[320px] w-[324px] right-[100px] top-[50px]">
              <Image
                unoptimized
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/893c48e8-59f1-400e-9cb8-0d36b752db00/public"
                alt="Talk to our AI assistant — DDiP AI virtual chat"
                fill
                className="object-contain object-right-bottom"
                sizes="324px"
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
          <HlsPlayer
            src="9e3a0d22828697a21a65a4ea035f5c3d"
            autoPlay={false}
            controls={false}
            muted={true}
            loop={true}
            fillHeight={true}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="px-[60px]">
          <p className=" font-heading text-[25.6px] font-semibold leading-[1.2] text-[#126478]">
            Why DDIP AI
          </p>
          <h2
            className="w-full font-bold uppercase text-[#063746]"
            style={{
              fontFamily: "var(--font-body)",
              lineHeight: "105%",
              fontSize: "130px",
              letterSpacing: "0%",
            }}
          >
            <span>
              WE DON&apos;T JUST USE AI
            </span>
            <br />
            <span>WE DESIGN{" "}
              <span className="relative inline-block align-middle">
                <span className="inline-flex h-[0.88em] w-[1.52em] items-center justify-center overflow-hidden rounded-lg">
                  <HlsPlayer
                    src="9e3a0d22828697a21a65a4ea035f5c3d"
                    autoPlay={false}
                    controls={false}
                    muted={true}
                    loop={true}
                    fillHeight={true}
                    className="h-full w-full object-cover"
                  />
                </span>
              </span>{" "}
              WITH IT.
            </span>
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
          <div className="flex">
            <div className="w-1/2">
              <p className="font-heading text-[24px] font-normal leading-[1.2] text-[#063746]">
                From Insight to Intelligence
              </p>
            </div>
            <div className="w-1/2">
              <p
                className="text-[44px] font-bold leading-[1.3] text-[#063746]"
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
      <div className="mt-16 overflow-hidden px-[60px]"
        ref={emblaRef}
      >
        <div className="flex gap-[33px]">
          {cmsSolutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group flex-shrink-0"
              style={{ width: "980px" }}
            >
              <div className="overflow-hidden rounded-[33px] bg-white">
                {/* Media area */}
                <div className="relative aspect-[974/536] overflow-hidden rounded-[17px] mx-[50px] mt-[50px]">
                  {solution.mediaType === "video" ? (
                    <HlsPlayer
                      src={solution.media}
                      autoPlay={false}
                      controls={false}
                      muted={true}
                      loop={true}
                      fillHeight={true}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={solution.media}
                      alt={solution.title}
                      fill
                      unoptimized
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
                  <HlsPlayer
                    src={item.video}
                    autoPlay={false}
                    controls={false}
                    muted={true}
                    loop={true}
                    fillHeight={true}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
            <HlsPlayer
              src="665822d5062aae2129504c3a2b474494"
              autoPlay={false}
              controls={false}
              muted={true}
              loop={true}
              fillHeight={true}
              className="h-full w-full object-cover"
            />
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

          <p
            className="mx-auto mt-8 max-w-[977px] text-center text-[34px] leading-[1.19] text-[#90B2BD]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our AI influencers represent the <span className="text-white">next step</span> in brand communication,
            combining expressiveness, adaptability, and visual intelligence.
          </p>
          <div className="flex flex-row items-center justify-between px-8 mt-16">
            {/* Filter tabs — centered */}
            <div className=" flex items-center justify-center gap-3">
              {/* Filter pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 rounded-full bg-white/90 px-6 py-5">
                <button
                  className={`rounded-full px-5 py-2 text-[16px] leading-[1.2] transition-colors ${
                    activeFilter === "Influencer" 
                      ? "bg-[#063746] text-[#EBFFFF]" 
                      : "text-[#063746] hover:bg-[#063746]/10"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  onClick={() => setActiveFilter("Influencer")}
                >
                  Influencer
                </button>
                <button
                  className={`rounded-full px-5 py-2 text-[16px] leading-[1.2] transition-colors ${
                    activeFilter === "Ambassador" 
                      ? "bg-[#063746] text-[#EBFFFF]" 
                      : "text-[#063746] hover:bg-[#063746]/10"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  onClick={() => setActiveFilter("Ambassador")}
                >
                  Ambassador
                </button>
                <button
                  className={`rounded-full px-5 py-2 text-[16px] leading-[1.2] transition-colors ${
                    activeFilter === "Mascot" 
                      ? "bg-[#063746] text-[#EBFFFF]" 
                      : "text-[#063746] hover:bg-[#063746]/10"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                  onClick={() => setActiveFilter("Mascot")}
                >
                  Mascot
                </button>
              </div>
            </div>

            {/* Discover More link — centered below filters */}
            <div className=" flex ">
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
          </div>
 
          <div className="mt-10 overflow-hidden px-[60px]" ref={emblaRow1Ref}>
            <div className="flex -ml-[25px]"> {/* negative margin trick */}
              {[...cmsInfluencers.row1, ...cmsInfluencers.row1].map((inf, idx) => (
                <div
                  key={`row1-${idx}`}
                  className="flex-[0_0_376px] pl-[25px]" /* flex-shrink-0 ki jagah flex shorthand + padding */
                  onClick={() => {
                    setSelectedInfluencer(inf);
                    setIsInfluencerPopupOpen(true);
                  }}
                >
                  <div className="cursor-pointer"> {/* cursor yahan move kiya */}
                    <div className="relative h-[518px] w-full overflow-hidden rounded-[20px] bg-[#EFEFEF]">
                      <Image
                        unoptimized
                        src={inf.image}
                        alt={inf.name}
                        fill
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
                            <Image
                              src={`https://flagcdn.com/w20/${inf.country.toLowerCase()}.png`}
                              alt={inf.country}
                              height={4}
                              width={5}
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
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="mt-8 overflow-hidden px-[60px]" ref={emblaRow2Ref}>
            <div className="flex -ml-[20px]"> {/* gap-5 = 20px, so negative margin */}
              {[...cmsInfluencers.row2, ...cmsInfluencers.row2].map((inf, idx) => (
                <div
                  key={`row2-${idx}`}
                  className="flex-[0_0_376px] pl-[20px]" /* flex basis + padding for gap */
                  onClick={() => {
                    setSelectedInfluencer(inf);
                    setIsInfluencerPopupOpen(true);
                  }}
                >
                  <div className="cursor-pointer">
                    <div className="relative h-[518px] w-full overflow-hidden rounded-[20px] bg-[#EFEFEF]">
                      <Image
                        src={inf.image}
                        alt={inf.name}
                        fill
                        unoptimized
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
                            <Image
                              src={`https://flagcdn.com/w20/${inf.country.toLowerCase()}.png`}
                              alt={inf.country}
                              height={4}
                              width={5}
                              unoptimized
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
      <section className="bg-light-bg pt-24 pb-[30px]">
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
            <HlsPlayer
              src="bdb805b635f8e3a865a3157336836136"
              autoPlay={false}
              controls={false}
              muted={true}
              loop={true}
              fillHeight={true}
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
              <div className="mt-[50px]">
                <Link
                  href="/works"
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
            <div className="w-1/2">
              <p
                className="text-[26px] leading-none text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                They are designed to minimize human intervention where it is not
                needed, allowing people to focus on what drives true value:
                creativity, strategy, and innovation.
              </p>
              <p
                className="mt-15 text-[26px] leading-none text-[#063746]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                With tailor-made integrations, DDIP automation unlocks new
                opportunities for efficiency and creativity, no matter the field.
              </p>
            </div>
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
              <Image
                key={tool.name}
                src={tool.src}
                unoptimized
                alt={tool.name}
                height={tool.size}
                width={tool.size}
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
