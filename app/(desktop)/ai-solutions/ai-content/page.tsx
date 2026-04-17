"use client";
import HlsPlayer from "@/components/desktop/video";
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
  { label: "Dream it.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bb102694-2ca6-44a5-9037-4865b1e41400/public" },
  { label: "Create it.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2bf2b49d-9a2e-4878-032e-7cbb7687ae00/public" },
  { label: "Animate it.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ea92c822-fdb8-4e4f-d0d2-bbaf28654a00/public" },
  { label: "Finish it.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce1aa4dc-ec06-45ac-bd3e-b63c28bbd600/public" },
];

const generateItems = [
  {
    title: "Campaign visuals and key assets",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ccd01df2-c98a-4d5d-7b36-c7249bd5ca00/public",
  },
  {
    title: "Social media content and variations",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/524d751c-3b9d-4982-7497-dd8a0e300f00/public",
  },
  {
    title: "Short-form content",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ccd01df2-c98a-4d5d-7b36-c7249bd5ca00/public",
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
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81d25d40-2890-403e-93d7-49e36b06cd00/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/56d8bb08-9c7d-49ca-e1ec-aa074fdf1600/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e1fe1be8-8ca5-4eef-cf2a-925bae6f7300/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/259023e7-e8b0-4214-ee42-9f2b02a1a800/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/57fe254b-21d7-4443-1476-6eccc458df00/public",
];

const useCaseCards = [
  { title: "Vesta Global", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/35a5d56e-da6e-42ce-4072-9b24938c1a00/public" },
  { title: "Bizim Mutfak", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce65649d-7f6d-4497-8d8a-697ee865d800/public" },
  { title: "Realkom", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0156ebdc-189b-4bce-808d-49f28c020200/public" },
  { title: "Brother", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2d7cdb27-97bb-4e13-a6c3-c294744bab00/public" },
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

  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true, align: "start", containScroll: "trimSnaps" }, [
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
      .catch(() => { });
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "AI CONTENT GENERA..."
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pb-16 pt-40">

        {/* Hero image and videos — right side */}
        <div className="absolute bottom-[0px] right-[60px] top-[340px] z-10 flex gap-3">
          {/* Col 1 — single video */}
          <div className="flex flex-col gap-3 justify-end">
            {/* Video with icon outside top-left */}
            <div className="relative h-[600px] w-[250px] group top-[265px]">
              {/* Icon — outside top-left */}
              <div className="absolute -left-3 -top-3 z-20 flex items-center justify-center rounded-md bg-[#063746] shadow-md">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1e1a01b7-cad6-4218-de1f-d23f5d27d400/public" alt="icon" className="h-[50px] w-[50px] object-contain" />
              </div>
              <div className="h-full w-full overflow-hidden rounded-t-[16px]">
                <HlsPlayer
                  src="cec8f6e44f63bb833b4b9b71452d48cb"
                  autoPlay={false}
                  controls={false}
                  muted={true}
                  loop={true}
                  fillHeight={true}
                  hoverToPlay={true}
                  className="h-[350px] w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Col 2 — image on top, video on bottom */}
          <div className="flex flex-col gap-3 justify-end">
            {/* Image with icon outside top-left */}
            <div className="relative h-[200px] top-[150px] w-[250px]">
              <div className="absolute -left-3 -top-3 z-20 flex  items-center justify-center rounded-md bg-[#063746] shadow-md">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1e1a01b7-cad6-4218-de1f-d23f5d27d400/public" alt="icon" className="h-[50px] w-[50px] object-contain" />
              </div>
              <div className="h-full w-full overflow-hidden rounded-[16px]">
                <Image
                  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5f60c571-4d22-40bb-6b52-d8948a9b4000/public"
                  alt="Content showcase"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            </div>
            {/* Video with icon outside top-left */}
            <div className="relative h-[400px] top-[140px] w-[250px] group">
              <div className="absolute -left-3 -top-3 z-20 flex items-center justify-center rounded-md bg-[#063746] shadow-md">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6d7c5e48-3eaa-4a0f-4092-7e4094da7f00/public" alt="icon" className="h-[50px] w-[50px] object-contain" />
              </div>
              <div className="h-full w-full overflow-hidden rounded-[16px]">
                <HlsPlayer
                  src="03d397e2992efcc651de0d04701b2ca1"
                  autoPlay={false}
                  controls={false}
                  muted={true}
                  loop={true}
                  fillHeight={true}
                  hoverToPlay={true}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Col 3 — tall woman video with icon outside top-left */}
          <div className="relative h-[513px] w-[250px] group">
            <div className="absolute -left-3 -top-3 z-20 flex items-center justify-center rounded-md bg-[#063746] shadow-md">
              <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/66a5192b-b87d-488a-073b-47b8b8c8d100/public" alt="icon" className="h-[50px] w-[50px] object-contain" />
            </div>
            <div className="h-full w-full overflow-hidden rounded-[16px]">
              <HlsPlayer
                src="90f5aaa3d5ea96226052be6f9122b8c2"
                autoPlay={false}
                controls={false}
                muted={true}
                loop={true}
                fillHeight={true}
                hoverToPlay={true}
                className="h-[430px] w-full object-cover"
              />
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
        <div className="relative z-10 mt-10 px-[80px]">
          <h2 className="max-w-lg font-heading text-[60px] font-medium leading-[1.2] text-white">
            Where Creative Thinking
            <br />
            Meets AI Production.
          </h2>
          <p
            className="mt-4 max-w-2xl text-[26px] leading-[1.6] text-white"
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
          <div className="absolute right-[60px] z-10 bottom-[50px]">
          <p className="text-[32px] tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>(SCROLL)</p>
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
              <p className="text-[24px] leading-[1.6] text-white" style={{ fontFamily: "var(--font-body)" }}>
                AI content generation at DDiP is not about speed or volume alone.
              </p>
              <p className="text-[24px] leading-[1.6] text-white mt-2" style={{ fontFamily: "var(--font-body)" }}>
                It&apos;s about using AI as a creative partner — supporting design decisions,
                expanding possibilities, and accelerating production without losing intent.
              </p>
            </div>
          </div>

          {/* ── Wiring Flow ── */}

          <div className="flex w-full items-start justify-between">

            {/* ── STEP 1: Dream it — 3 prompt cards ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px", textAlign: "center" }}>
              <p className="font-heading text-[25px] text-white mb-3">Dream it.</p>
              <div className="flex flex-col gap-2 flex-1 justify-center">
                {[
                  "A luxury real estate model in a...",
                  "Modern villa exterior, M...",
                  "Upscale property showca...",
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-[8px] px-3 py-1.5" style={{ width: "220px", background: "#08262F", border: "1px solid #BEBEBE", boxShadow: "0px 0px 3.8px 4px #FFFFFF2E inset" }}>
                    <span className="text-[13px] text-white flex-1 truncate" style={{ fontFamily: "var(--font-body)" }}>{text}</span>
                    <div className="shrink-0 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#08262F" strokeWidth="2"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 3 lines converge → single line → NODE 1 ── */}
            <div className="shrink-0 relative flex flex-col justify-center" style={{ width: "100px", height: "490px" }}>
              {/* <svg width="100" height="120" viewBox="0 0 100 120" fill="none" className="relative">
                <path d="M0 15  C40 15  40 60 75 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <path d="M0 60  L75 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <path d="M0 105 C40 105 40 60 75 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <line x1="75" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              </svg> */}

        <svg width="240" height="120" viewBox="-140 0 240 120" fill="none" className="relative left-[-80px]">
  <path d="M-140 15 L0 15" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 15 C40 15 40 60 75 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <path d="M-140 60 L0 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 60 L75 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <path d="M-140 105 L0 105" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 105 C40 105 40 60 75 60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <line x1="75" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
</svg>

              <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/73eb47b0-8e72-4f36-60a2-fc3530f58200/public" alt="node" width={26} height={26}
                className="absolute" style={{ left: "150px", top: "50%", transform: "translate(-50%, -50%)" }} />
            </div>

            {/* ── STEP 2: Create it — 4 images 2x2 ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px", textAlign: "center" }}>
              <p className="font-heading text-[25px] text-white mb-3">Create it.</p>
              <div className="flex-1 flex items-center">
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bb102694-2ca6-44a5-9037-4865b1e41400/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2bf2b49d-9a2e-4878-032e-7cbb7687ae00/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a50f1f9d-c362-407b-d72b-277705a61000/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4eb7734a-2629-45b5-a3ae-22c14598ac00/public",
                  ].map((src, i) => (
                    <div key={i} className="relative h-[95px] w-[80px] overflow-hidden rounded-[8px]">
                      <Image src={src} alt={`create-${i}`} fill className="object-cover" sizes="80px" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── connector: ddipicon1 → line → ddipicon2 ── */}
            <div className="shrink-0 relative flex flex-col justify-center left-[-75px]" style={{ width: "100px", height: "490px" }}>
              <svg width="250" height="4" viewBox="0 0 250 4" fill="none">
  <line x1="10" y1="2" x2="240" y2="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
</svg>
              <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/73eb47b0-8e72-4f36-60a2-fc3530f58200/public" alt="node" width={26} height={26}
                className="absolute" style={{ left: "0px", top: "50%", transform: "translateY(-50%)" }} />
              <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fdf3d272-410d-4ef4-260a-63f4ea52cc00/public" alt="node" width={26} height={26}
                className="absolute" style={{ left: "220px", top: "50%", transform: "translateY(-50%)" }} />
            </div>

            {/* ── STEP 3: Animate it — 1 tall + 2 stacked + 2 stacked ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px", textAlign: "center" }}>
              <p className="font-heading text-[25px] text-white mb-3">Animate it.</p>
              <div className="flex-1 flex items-center">
                <div className="flex gap-1.5 items-center">
                  <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                    <HlsPlayer
                      src="03d397e2992efcc651de0d04701b2ca1"
                      autoPlay={false}
                      controls={false}
                      muted={true}
                      loop={true}
                      fillHeight={true}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                      <HlsPlayer
                        src="52d4f5fdd1335b2fbaba2f41798273f1"
                        autoPlay={false}
                        controls={false}
                        muted={true}
                        loop={true}
                        fillHeight={true}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                      <HlsPlayer
                        src="90b6c18df1bb19d1117f6d29f6859036"
                        autoPlay={false}
                        controls={false}
                        muted={true}
                        loop={true}
                        fillHeight={true}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px] mt-[30px]">
                      <HlsPlayer
                        src="8ffbc4055a9b0210350a2748fcbb8ce4"
                        autoPlay={false}
                        controls={false}
                        muted={true}
                        loop={true}
                        fillHeight={true}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="relative h-[156px] w-[90px] overflow-hidden rounded-[8px]">
                      <HlsPlayer
                        src="2f4c298d7224c5140c18bc3c0f6faf22"
                        autoPlay={false}
                        controls={false}
                        muted={true}
                        loop={true}
                        fillHeight={true}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 5 lines → merge → ddipicon3 ── */}
            <div className="shrink-0 relative flex flex-col justify-center" style={{ width: "90px", height: "490px" }}>
              {/* <svg width="90" height="196" viewBox="0 0 90 196" fill="none" className="relative">
                <path d="M0 20  C40 20  40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <path d="M0 59  C40 59  40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <path d="M0 98  L65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <path d="M0 137 C40 137 40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <path d="M0 176 C40 176 40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                <line x1="65" y1="98" x2="90" y2="98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
              </svg> */}
              <svg width="240" height="196" viewBox="-150 0 240 196" fill="none" className="relative left-[-80px]">
  <path d="M-150 20 L0 20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 20  C40 20  40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <path d="M-150 59 L0 59" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 59  C40 59  40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <path d="M-150 98 L0 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 98  L65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <path d="M-150 137 L0 137" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 137 C40 137 40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <path d="M-150 176 L0 176" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  <path d="M0 176 C40 176 40 98 65 98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
  
  <line x1="65" y1="98" x2="90" y2="98" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
</svg>
              <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/248292a1-8078-42b6-a7f1-cc34d064ef00/public" alt="node" width={26} height={26}
                className="absolute" style={{ right: "-70px", top: "50%", transform: "translateY(-50%)" }} />
            </div>

            {/* ── STEP 4: Finish it ── */}
            <div className="shrink-0 flex flex-col" style={{ height: "440px", textAlign: "center" }}>
              <p className="font-heading text-[25px] text-white mb-3">Finish it.</p>
              <div className="flex-1 flex items-center">
                <div className="relative h-[400px] w-[250px] overflow-hidden rounded-[12px]">
                  <HlsPlayer
                    src="90f5aaa3d5ea96226052be6f9122b8c2"
                    autoPlay={false}
                    controls={false}
                    muted={true}
                    loop={true}
                    fillHeight={true}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* ── End Wiring Flow ── */}

          {/* Statement */}
          <div className="mt-16 flex items-center gap-3">
            <p className="text-[25px] font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>
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
              className="text-[28px] leading-[1.6] text-[#063746]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We create AI-assisted content across formats and platforms  always
              aligned with your brand&apos;s visual and tonal identity.
            </p>
          </div>

          {/* Showcase — auto-scrolling horizontal carousel */}
          <div className="mt-12 overflow-hidden w-full" ref={emblaRef}>
            <div className="flex gap-[29px] -mx-[60px] px-[60px]">
              {[...generateItems, ...generateItems, ...generateItems].map((item, i) => (
                <div key={i} className="shrink-0 w-[727px] min-w-[727px]">
                  <div className="relative h-[548px] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="727px"
                    />

                  </div>
                  <p className="mt-4 text-[24px] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statement */}
          <p
            className="mt-12 text-[34px]  text-[#145365]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Each output is designed to feel coherent,
          </p>
              <p
            className="text-[34px]  text-[#145365]"
            style={{ fontFamily: "var(--font-body)" }}
          >
           intentional, and ready to
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
        bgImage="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/233c554f-70bb-4ffb-7036-64224285bd00/public"
        features={[
          { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d79d8208-d108-4b58-d556-48855c230500/public", label: "Instagram, TikTok, LinkedIn, YouTube" },
          { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6f120319-2d8a-41b2-c5f5-d1d2e9588f00/public", label: "Multi-language adaptations" },
          { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5b8d9404-47b2-4933-b877-c179928f2c00/public", label: "Creative variations for testing and performance" },
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
          <p className="mx-auto mt-4 max-w-7xl text-center text-[24px] leading-[1.6]"
            style={{  color: "#063746" }}>
            AI content generation supports different creative needs, from always-on content to campaign launches.
          </p>

          {/* 5 cards row */}
          <div className="mt-12 flex gap-[14px] justify-center items-center">
            {[
              { icon: "/images/ai-content/icon-05.svg", label: "Brand campaigns and product launches" },
              { icon: "/images/ai-content/icon-06.svg", label: "Social media content ecosystems" },
              { icon: "/images/ai-content/icon-07.svg", label: "Editorial and blog visuals" },
              { icon: "/images/ai-content/icon-08.svg", label: "Event and announcement assets" },
              { icon: "/images/ai-content/icon-09.svg", label: "E-commerce and catalog visuals" },
            ].map((item, i) => (
              <div key={i} className="flex flex-1 items-center gap-3"
                style={{ background: "#002834", backdropFilter: "blur(45.31px)", width: "304px", height: "97.6px", borderRadius: "7.33px", padding: "8.8px 13.2px" }}>
                <div className="flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-[8px]  border border-[#FFFFFF4D]">
                  <Image src={item.icon} alt={item.label} width={25} height={25} />
                </div>
                <span className="text-[18px] leading-[1.5] text-center"
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
              { title: "Vesta Global", video: "4efeb3daa0597c05c31d144beccea3f8", tags: ["Campaign Visuals", "Brand Identity"] },
              { title: "Bizim Mutfak", video: "cec8f6e44f63bb833b4b9b71452d48cb", tags: ["Social Media", "Content Variations"] },
              { title: "Realkom", video: "f9b719e86584fee5e05197a5e4c5e840", tags: ["Short-form Content", "Prompt Crafting"] },
              { title: "Brother", video: "c6727f63163d214df0ef35997644d8d2", tags: ["Editorial Visuals", "Brand Campaigns"] },
              { title: "Vesta Global", video: "4efeb3daa0597c05c31d144beccea3f8", tags: ["Campaign Visuals", "Brand Identity"] },
              { title: "Bizim Mutfak", video: "cec8f6e44f63bb833b4b9b71452d48cb", tags: ["Social Media", "Content Variations"] },
              { title: "Realkom", video: "f9b719e86584fee5e05197a5e4c5e840", tags: ["Short-form Content", "Prompt Crafting"] },
              { title: "Brother", video: "c6727f63163d214df0ef35997644d8d2", tags: ["Editorial Visuals", "Brand Campaigns"] },
            ]} />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. OUR TOOL ECOSYSTEM
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-10">
        <div className="">
          <h2 className="text-center font-heading text-[56px] font-bold leading-[1.1] text-[#126478]">
            Our Tool Ecosystem
          </h2>
          <p
            className="mx-auto mt-4 max-w-5xl text-center text-[26px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our ecosystem is built around selecting the right AI tools for each
            creative challenge. The real value comes from how these tools are
            orchestrated to support storytelling and visual quality.
          </p>

          {/* <div className="mx-auto mt-12 flex max-w-lg items-center justify-center gap-8">
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
          </div> */}
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