"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { cmsApi, type Faq } from "@/lib/api";
import HeroPartnersSection from "@/components/desktop/HeroPartnersSection";
import FourDMethodSection from "@/components/desktop/FourDMethodSection";
import FaqSection from "@/components/desktop/FaqSection";
import ContentAtScale from "@/components/desktop/ContentAtScale";
import UseCaseCarousel from "@/components/desktop/UseCaseCarousel";
import PartnersSection from "@/components/desktop/PartnersSection";

/* ─── Data ─── */

const heroPartners = ["VG", "brother", "Vestine", "OPTIMUM", "ColaSel", "Colorful"];

const dreamSteps = [
  { label: "Dream it.", image: "/images/ai-content/create-01.png" },
  { label: "Create it.", image: "/images/ai-content/create-02.png" },
  { label: "Animate it.", image: "/images/ai-content/create-03.png" },
  { label: "Finish it.", image: "/images/ai-content/create-04.png" },
];

const generateItems = [
  {
    title: "Campaign visuals and key assets",
    image: "/images/ai-content/showcase-01.png",
  },
  {
    title: "Social media content and variations",
    image: "/images/ai-content/showcase-02.png",
  },
  {
    title: "Short-form content",
    image: "/images/ai-content/showcase-03.png",
  },
];

const methodSteps = [
  {
    num: "01",
    title: "Define",
    icon: "/images/ai-content/icon-01.svg",
    rotate: "-8deg",
  },
  {
    num: "02",
    title: "Design",
    icon: "/images/ai-content/icon-02.svg",
    rotate: "-3deg",
  },
  {
    num: "03",
    title: "Develop",
    icon: "/images/ai-content/icon-03.svg",
    rotate: "3deg",
  },
  {
    num: "04",
    title: "Deliver",
    icon: "/images/ai-content/icon-04.svg",
    rotate: "8deg",
  },
];

const useCaseImages = [
  "/images/homepage/influencer-01.png",
  "/images/homepage/influencer-02.jpg",
  "/images/homepage/influencer-03.png",
  "/images/homepage/influencer-04.png",
  "/images/homepage/influencer-05.png",
];

const useCaseCards = [
  { title: "Vesta Global", image: "/images/ai-content/showcase-01.png" },
  { title: "Bizim Mutfak", image: "/images/ai-content/showcase-02.png" },
  { title: "Realkom", image: "/images/ai-content/showcase-03.png" },
  { title: "Brother", image: "/images/ai-content/showcase-04.png" },
];

const toolIcons = [
  "/images/ai-content/icon-05.svg",
  "/images/ai-content/icon-06.svg",
  "/images/ai-content/icon-07.svg",
  "/images/ai-content/icon-08.svg",
  "/images/ai-content/icon-09.svg",
];

const faqLeft = [
  "How fast can content be generated?",
  "Is the content fully automated?",
  "Can content match our brand identity?",
];

const faqRight = [
  "Can you create content for multiple platforms at once?",
  "Do you support multiple languages?",
  "How do you ensure quality?",
];

export default function AIContentPage() {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);

  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoPlay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);

  useEffect(() => {
    cmsApi
      .faqs("ai-content")
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
          1. HERO — Marquee "AI CONTENT GENERA..."
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pb-16 pt-40">

        {/* Hero image and videos — right side */}
        <div className="absolute right-[60px] top-[340px] z-10 flex gap-3">
          {/* Col 1 — single video */}
          <div className="flex flex-col gap-3 justify-end">
            {/* Video with icon outside top-left */}
            <div className="relative h-[250px] w-[250px]">
              {/* Icon — outside top-left */}
              <div className="absolute -left-3 -top-3 z-20 flex items-center justify-center rounded-md bg-[#063746] shadow-md">
                <img src="/images/ai-content/icon44.png" alt="icon" className="h-[50px] w-[50px] object-contain" />
              </div>
              <div className="h-full w-full overflow-hidden rounded-[16px] ">
                <video autoPlay muted loop playsInline className="h-[350px] w-full object-cover">
                  <source src="/videos/ai-content-video-first.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Col 2 — image on top, video on bottom */}
          <div className="flex flex-col gap-3 justify-end">
            {/* Image with icon outside top-left */}
            <div className="relative h-[200px] w-[250px]">
              <div className="absolute -left-3 -top-3 z-20 flex  items-center justify-center rounded-md bg-[#063746] shadow-md">
                <img src="/images/ai-content/icon33.png" alt="icon" className="h-[50px] w-[50px] object-contain" />
              </div>
              <div className="h-full w-full overflow-hidden rounded-[16px]">
                <Image
                  src="/images/ai-content/ai-content-image.jpg"
                  alt="Content showcase"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            </div>
            {/* Video with icon outside top-left */}
            <div className="relative h-[205px] w-[250px]">
              <div className="absolute -left-3 -top-3 z-20 flex items-center justify-center rounded-md bg-[#063746] shadow-md">
                <img src="/images/ai-content/icon11.png" alt="icon" className="h-[50px] w-[50px] object-contain" />
              </div>
              <div className="h-full w-full overflow-hidden rounded-[16px]">
                <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                  <source src="/videos/ai-content-video-middle.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Col 3 — tall woman video with icon outside top-left */}
          <div className="relative h-[513px] w-[250px]">
            <div className="absolute -left-3 -top-3 z-20 flex items-center justify-center rounded-md bg-[#063746] shadow-md">
              <img src="/images/ai-content/icon22.png" alt="icon" className="h-[50px] w-[50px] object-contain" />
            </div>
            <div className="h-full w-full overflow-hidden rounded-[16px] h-[430px]">
              <video autoPlay muted loop playsInline className="h-[430px] w-full object-cover">
                <source src="/videos/ai-content-video-last.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        {/* Marquee heading */}
        <div className="overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee">
            <h1 className="text-[140px] text-white whitespace-nowrap">
              AI CONTENT GENERATION
            </h1>
          </div>
        </div>

        {/* Subtitle + CTAs */}
        <div className="relative z-10 mt-10 px-[60px]">
          <h2 className="max-w-lg font-heading text-[40px] font-medium leading-[1.2] text-white">
            Where Creative Thinking
            <br />
            Meets AI Production.
          </h2>
          <p
            className="mt-4 max-w-lg text-[26px] leading-[1.6] text-white/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            From creative direction to final delivery, we generate content that
            feels intentional, consistent, and crafted.
          </p>

          <div className="mt-[60px] flex items-start flex-col gap-4">
            <div className="flex items-center justify-center">
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
            </div>
            <Link href="#discover" className="font-heading text-[25px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              Discover Our Creative Approach
            </Link>
          </div>
        </div>

        {/* [SCROLL] text */}
         <div className="absolute bottom-10 right-[60px] z-10">
          <p className="text-[16px] tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>[SCROLL]</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. PARTNERS ROW
          ════════════════════════════════════════════════════════ */}
      <HeroPartnersSection />

      {/* ════════════════════════════════════════════════════════
          3. WHAT AI CONTENT GENERATION MEANS AT DDIP.AI
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="relative bg-dark-bg py-24 overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 px-[60px]">

          {/* Top heading row */}
          <div className="grid grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-white">
                What AI Content
                <br />
                Generation Means
                <br />
                At Ddip.ai
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-[15px] leading-[1.6] text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                AI content generation at DDiP is not about speed or volume alone.
              </p>
              <p className="text-[15px] leading-[1.6] text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                It&apos;s about using AI as a creative partner — supporting design decisions,
                expanding possibilities, and accelerating production without losing intent.
              </p>
            </div>
          </div>

          {/* ── Wiring Flow ── */}
          <div className="flex items-start">

            {/* ── STEP 1: Dream it — 3 prompt cards ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px" ,textAlign:"center"}}>
              <p className="font-heading text-[25px] text-white/50 mb-3">Dream it.</p>
              <div className="flex flex-col gap-2 flex-1 justify-center">
                {[
                  "A luxury real estate model in a...",
                  "Modern villa exterior, M...",
                  "Upscale property showca...",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-[8px] px-3 py-1.5" style={{ width: "220px", background: "#08262F", border: "1px solid #BEBEBE", boxShadow: "0px 0px 3.8px 4px #FFFFFF2E inset" }}>
                    <span className="text-[13px] text-white flex-1 truncate" style={{ fontFamily: "var(--font-body)" }}>{text}</span>
                    <div className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#08262F" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 3 lines converge → single line → NODE 1 ── */}
            <div className="shrink-0 relative flex flex-col justify-center" style={{ width: "100px", height: "490px" }}>
              <svg width="100" height="120" viewBox="0 0 100 120" fill="none" className="relative">
                <path d="M0 15  C40 15  40 60 75 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <path d="M0 60  L75 60"               stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <path d="M0 105 C40 105 40 60 75 60"  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <line x1="75" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
              </svg>
              <Image src="/images/ai-content/ddipicon1.png" alt="node" width={26} height={26}
                className="absolute" style={{ left: "87px", top: "50%", transform: "translate(-50%, -50%)" }} />
            </div>

            {/* ── STEP 2: Create it — 4 images 2x2 ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px" ,textAlign:"center"}}>
              <p className="font-heading text-[25px] text-white/50 mb-3">Create it.</p>
              <div className="flex-1 flex items-center">
                <div className="grid grid-cols-2 gap-1.5">
                {[
                  "/images/ai-content/create-01.png",
                  "/images/ai-content/create-02.png",
                  "/images/ai-content/create-03.png",
                  "/images/ai-content/create-04.png",
                ].map((src, i) => (
                  <div key={i} className="relative h-[95px] w-[80px] overflow-hidden rounded-[8px]">
                    <Image src={src} alt={`create-${i}`} fill className="object-cover" sizes="80px" />
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* ── connector: ddipicon1 → line → ddipicon2 ── */}
            <div className="shrink-0 relative flex flex-col justify-center" style={{ width: "100px", height: "490px" }}>
              <svg width="100" height="4" viewBox="0 0 100 4" fill="none">
                <line x1="10" y1="2" x2="90" y2="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
              </svg>
              <Image src="/images/ai-content/ddipicon1.png" alt="node" width={26} height={26}
                className="absolute" style={{ left: "0px", top: "50%", transform: "translateY(-50%)" }} />
              <Image src="/images/ai-content/ddipicon2.png" alt="node" width={26} height={26}
                className="absolute" style={{ left: "74px", top: "50%", transform: "translateY(-50%)" }} />
            </div>

            {/* ── STEP 3: Animate it — 1 tall + 2 stacked + 2 stacked ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px" ,textAlign:"center"}}>
              <p className="font-heading text-[25px] text-white/50 mb-3">Animate it.</p>
              <div className="flex-1 flex items-center">
                <div className="flex gap-1.5 items-center">
                <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                  <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                    <source src="/videos/ai-content-video-middle.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                    <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                      <source src="/videos/work1.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                    <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                      <source src="/videos/work2.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px] mt-[30px]">
                    <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                      <source src="/videos/work3.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                    <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                      <source src="/videos/work4.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>
              </div>
            </div>

            {/* ── 5 lines → merge → ddipicon3 ── */}
            <div className="shrink-0 relative flex flex-col justify-center" style={{ width: "90px", height: "490px" }}>
              <svg width="90" height="196" viewBox="0 0 90 196" fill="none" className="relative">
                <path d="M0 20  C40 20  40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <path d="M0 59  C40 59  40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <path d="M0 98  L65 98"               stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <path d="M0 137 C40 137 40 98 65 98"  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <path d="M0 176 C40 176 40 98 65 98"  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
                <line x1="65" y1="98" x2="90" y2="98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
              </svg>
              <Image src="/images/ai-content/ddipicon3.png" alt="node" width={26} height={26}
                className="absolute" style={{ right: "0px", top: "50%", transform: "translateY(-50%)" }} />
            </div>

            {/* ── STEP 4: Finish it ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px",textAlign:"center" }}>
              <p className="font-heading text-[25px] text-white/50 mb-3">Finish it.</p>
              <div className="flex-1 flex items-center">
                <div className="relative h-[400px] w-[250px] overflow-hidden rounded-[12px]">
                  <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                    <source src="/videos/ai-content-video-last.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

          </div>
          {/* ── End Wiring Flow ── */}

          {/* Statement */}
          <div className="mt-16 flex items-center gap-3">
            <p className="text-[18px] font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>
              We don&apos;t replace creative thinking. We amplify it.
            </p>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. WHAT WE GENERATE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <h2 className="font-heading text-[48px] font-medium leading-[1.05] text-[#063746]">
              What We Generate
            </h2>
            <p
              className="text-[20px] leading-[1.6] text-[#063746]/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We create AI-assisted content across formats and platforms  always
              aligned with your brand&apos;s visual and tonal identity.
            </p>
          </div>

          {/* Showcase — auto-scrolling horizontal carousel */}
          <div className="mt-12 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {[...generateItems, ...generateItems].map((item, i) => (
                <div key={i} className="shrink-0 w-[320px]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                  <p className="mt-4 text-[16px] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statement */}
          <p
            className="mt-12 text-[20px] w-[450px] leading-[1.6] text-[#145365]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Each output is designed to feel coherent, intentional, and ready to
            use.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. OUR 4D METHOD — 4 tilted icon cards
          ════════════════════════════════════════════════════════ */}
    <FourDMethodSection />

      {/* ════════════════════════════════════════════════════════
          6. CONTENT AT SCALE — dark card
          ════════════════════════════════════════════════════════ */}
      <ContentAtScale
        heading="Content At Scale"
        description1="AI allows us to scale without losing consistency."
        description2="We produce content across multiple formats, platforms, and languages while maintaining a strong visual core."
        tagline={"Scale is built into the system, not\nadded later."}
        bgImage="/images/ai-content/showcase-04.png"
        features={[
          { icon: "/images/ai-content/icon-05.svg", label: "Instagram, TikTok, LinkedIn, YouTube" },
          { icon: "/images/ai-content/icon-06.svg", label: "Multi-language adaptations" },
          { icon: "/images/ai-content/icon-07.svg", label: "Creative variations for testing and performance" },
        ]}
      />

      {/* ════════════════════════════════════════════════════════
          7. USE CASES
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">

          {/* Heading */}
          <h2 className="text-center text-[50px] font-medium leading-[1.1]"
            style={{ fontFamily: "Bricolage Grotesque", color: "#063746" }}>
            Use Cases
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-[18px] leading-[1.6]"
            style={{ fontFamily: "SF Pro Display", color: "#063746" }}>
            AI content generation supports different creative needs, from always-on content to campaign launches.
          </p>

          {/* 5 cards row */}
          <div className="mt-12 flex gap-4">
            {[
              { icon: "/images/ai-content/icon-05.svg", label: "Brand campaigns and product launches" },
              { icon: "/images/ai-content/icon-06.svg", label: "Social media content ecosystems" },
              { icon: "/images/ai-content/icon-07.svg", label: "Editorial and blog visuals" },
              { icon: "/images/ai-content/icon-08.svg", label: "Event and announcement assets" },
              { icon: "/images/ai-content/icon-09.svg", label: "E-commerce and catalog visuals" },
            ].map((item, i) => (
              <div key={i} className="flex flex-1 items-start gap-3 rounded-[12px] px-4 py-4"
                style={{ background: "#002834", backdropFilter: "blur(45.31px)" }}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-white/10">
                  <Image src={item.icon} alt={item.label} width={18} height={18} />
                </div>
                <span className="text-[12px] leading-[1.5]"
                  style={{ fontFamily: "Bricolage Grotesque", color: "#FFFFFF" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tagline */}
          <p className="mt-10 text-center text-[20px] font-medium"
            style={{ fontFamily: "SF Pro Display", color: "#063746" }}>
            Each use case starts with intent, not output.
          </p>

          {/* Use Case Carousel */}
          <div className="mt-[100px]">
            <UseCaseCarousel items={[
              { title: "Vesta Global", video: "/videos/contentgenerationusecases1.mp4", tags: ["Campaign Visuals", "Brand Identity"] },
              { title: "Bizim Mutfak", video: "/videos/ai-content-video-first.mp4", tags: ["Social Media", "Content Variations"] },
              { title: "Realkom", video: "/videos/contentgenerationusecases3.mp4", tags: ["Short-form Content", "Prompt Crafting"] },
              { title: "Brother", video: "/videos/contentgenerationusecases4.mp4", tags: ["Editorial Visuals", "Brand Campaigns"] },
            ]} />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. OUR TOOL ECOSYSTEM
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-10">
        <div className="">
          <h2 className="text-center font-heading text-[36px] font-bold leading-[1.1] text-[#126478]">
            Our Tool Ecosystem
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-[14px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our ecosystem is built around selecting the right AI tools for each
            creative challenge. The real value comes from how these tools are
            orchestrated to support storytelling and visual quality.
          </p>

          <div className="mx-auto mt-12 flex max-w-lg items-center justify-center gap-8">
            {toolIcons.map((icon, i) => (
              <div
                key={i}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-[14px] border border-[#063746]/10 bg-white"
              >
                <Image
                  src={icon}
                  alt={`Tool ${i + 1}`}
                  width={30}
                  height={30}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. PARTNERS
          ════════════════════════════════════════════════════════ */}
   <PartnersSection />

      {/* ════════════════════════════════════════════════════════
          10. FAQ
          ════════════════════════════════════════════════════════ */}
      <FaqSection leftQuestions={cmsFaqLeft} rightQuestions={cmsFaqRight} />

      {/* ════════════════════════════════════════════════════════
          11. CTA
          ════════════════════════════════════════════════════════ */}
     <section className="bg-light-bg py-24">
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
