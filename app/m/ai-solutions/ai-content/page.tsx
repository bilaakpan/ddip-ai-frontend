"use client";

import Link from "next/link";
import Image from "next/image";
import HlsPlayer from "@/components/desktop/video";
import { useState, useEffect } from "react";
import { cmsApi, type Faq, type UseCase } from "@/lib/api";
import ToolEcosystem from "@/components/mobile/ToolEcosystem";

/* ─── Data ─── */
const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/eebd38e3-7038-4900-5397-fe58af26e000/public" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];
const methodSteps = [
  {
    num: "01", title: "Define", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/01b5fee0-1a9b-4547-9780-99ad724e1e00/public", rotate: "-22deg",
    desc: "We identify audience intent, search behavior, and the questions AI systems need to answer.",
    bg: "rgba(225, 225, 225, 1)", textColor: "#221D1D",
  },
  {
    num: "02", title: "Design", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/717131ad-013b-4176-10f7-799df95ebf00/public", rotate: "-9deg",
    desc: "Content structure, hierarchy, and semantic flow are shaped for clarity and relevance.",
    bg: "rgba(28, 227, 244, 1)", textColor: "#002834",
  },
  {
    num: "03", title: "Develop", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c2e3a539-3fba-4d5c-8f4d-f18617091d00/public", rotate: "9deg",
    desc: "AI-readable content and contextual signals are implemented across pages.",
    bg: "rgba(20, 83, 101, 1)", textColor: "#ffffff",
  },
  {
    num: "04", title: "Deliver", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/dfc1bf85-d080-4762-88b1-c6399ef5cc00/public", rotate: "22deg",
    desc: "Optimized content is deployed with measurable improvements in visibility and discoverability.",
    bg: "rgba(3, 158, 183, 1)", textColor: "#EBFFFF",
  },
];
const dreamSteps = [
  {
    label: "Dream it.",
    desc: "Prompt-driven ideation — describe your vision and let AI explore it.",
    images: [
      "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bb102694-2ca6-44a5-9037-4865b1e41400/public",
      "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2bf2b49d-9a2e-4878-032e-7cbb7687ae00/public",
    ],
  },
  {
    label: "Create it.",
    desc: "AI generates images, layouts, and visual assets aligned with your brand.",
    images: [
      "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a50f1f9d-c362-407b-d72b-277705a61000/public",
      "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4eb7734a-2629-45b5-a3ae-22c14598ac00/public",
    ],
  },
  {
    label: "Animate it.",
    desc: "Motion and video layers bring static content to life across formats.",
    videos: [
      "03d397e2992efcc651de0d04701b2ca1",
      "52d4f5fdd1335b2fbaba2f41798273f1",
    ],
  },
  {
    label: "Finish it.",
    desc: "Final assets delivered — polished, on-brand, and ready to publish.",
    videos: ["90f5aaa3d5ea96226052be6f9122b8c2"],
  },
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
const useCaseCards = [
  { icon: "/images/ai-content/icon-05.svg", label: "Brand campaigns and product launches" },
  { icon: "/images/ai-content/icon-06.svg", label: "Social media content ecosystems" },
  { icon: "/images/ai-content/icon-07.svg", label: "Editorial and blog visuals" },
  { icon: "/images/ai-content/icon-08.svg", label: "Event and announcement assets" },
  { icon: "/images/ai-content/icon-09.svg", label: "E-commerce and catalog visuals" },
];
// Use cases come from CMS API only

interface UseCaseItem {
  title: string;
  subtitle: string;
  category: string;
  video: string;
  tags: string[];
}
const scaleFeatures = [
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d79d8208-d108-4b58-d556-48855c230500/public", label: "Instagram, TikTok, LinkedIn, YouTube" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6f120319-2d8a-41b2-c5f5-d1d2e9588f00/public", label: "Multi-language adaptations" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5b8d9404-47b2-4933-b877-c179928f2c00/public", label: "Creative variations for testing and performance" },
];
// FAQs come from CMS API only
const heroPartners = [
  { name: "Vesta Global", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/df6e0710-2d50-486d-5f59-5e751559e900/public" },
  { name: "Brother", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/86b61c21-9a9c-439a-317a-85b52a8e1200/public" },
  { name: "Mediterra", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c4b8d5eb-29a6-4b39-cf0e-bcb6da555800/public" },
  { name: "Bizim Mutfak", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fd4760d4-1dac-4f11-1800-7c8f7e1dfa00/public" },
  { name: "Optimum", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b22ddb7-f87d-499e-df17-ae9efd2e5200/public" },
  { name: "CollaSel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e47e5b16-132e-40ee-537a-2d44a3283d00/public" },
  { name: "SelJel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4c453b6d-12e2-4fb3-f7d3-75d85e1a5200/public" },
];

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function MobileAiContentPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [useCaseItems, setUseCaseItems] = useState<UseCaseItem[]>([]);

  useEffect(() => {
    cmsApi
      .faqs("ai-content")
      .then((res) => {
        setCmsFaqs((res.data ?? []).map((f: Faq) => ({ question: f.question, answer: f.answer ?? "" })));
      })
      .catch(() => setCmsFaqs([]));

    cmsApi
      .useCases("ai-content")
      .then((res) => {
        setUseCaseItems(
          (res.data ?? []).map((u: UseCase) => ({
            title: u.brand,
            subtitle: "",
            category: "",
            video: u.mediaUrl || "",
            tags: u.tags?.map((t) => t.tag.name) || [],
          }))
        );
      })
      .catch(() => setUseCaseItems([]));
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg">

        {/* Marquee heading */}
        <div className="relative z-10 overflow-hidden pt-[10px]">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              AI CONTENT&nbsp;
            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              AI CONTENT&nbsp;            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px]  uppercase leading-none text-white">
              AI CONTENT&nbsp;            </span>
          </div>
        </div>

        {/* Subtitle */}
        <div className="relative z-10 px-5">
          <h2 className="font-heading text-[22px] font-medium leading-[1.2] text-white">
            Where Creative Thinking Meets AI Production.
          </h2>
          <p className="mt-6 text-[16px] leading-normal text-white">
            From creative direction to final assets, we generate content that feels intentional, consistent, and crafted.
          </p>
        </div>

        {/* Media grid — 3 columns like the image */}
        <div className="relative z-10 mt-6 pr-[10px] flex gap-2 items-end ml-10">
          {/* Col 1 — tall single video */}
          <div className="flex-1 relative" style={{ aspectRatio: "9/14" }}>
            <div className="absolute -top-2 -left-1 z-20 flex items-center justify-center rounded-md bg-[#063746]/80 shadow-md p-1">
              <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1e1a01b7-cad6-4218-de1f-d23f5d27d400/public" alt="icon" className="h-6 w-6 object-contain" />
            </div>
            <div className="h-[176px] w-[104px] overflow-hidden rounded">
              <HlsPlayer
                src="cec8f6e44f63bb833b4b9b71452d48cb"
                autoPlay={true} controls={false} muted={true} loop={true} fillHeight={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Col 2 — image top + video bottom */}
          <div className="flex-1 flex flex-col gap-2 w-[70px] ">
            <div className="relative top-[31px]" style={{ aspectRatio: "1/1" }}>
              <div className="absolute -top-2 -left-1 z-20 flex items-center justify-center rounded-md bg-[#063746]/80 shadow-md p-1">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1e1a01b7-cad6-4218-de1f-d23f5d27d400/public" alt="icon" className="h-6 w-6 object-contain" />
              </div>
              <div className="w-full overflow-hidden h-[72px] rounded">
                <Image
                  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5f60c571-4d22-40bb-6b52-d8948a9b4000/public"
                  alt="Content showcase" fill className="object-cover" sizes="33vw"
                />
              </div>
            </div>
            <div className="relative top-[35px]" style={{ aspectRatio: "1/1" }}>
              <div className="absolute -top-2 -left-1 z-20 flex items-center justify-center rounded-md bg-[#063746]/80 shadow-md p-1">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6d7c5e48-3eaa-4a0f-4092-7e4094da7f00/public" alt="icon" className="h-6 w-6 object-contain" />
              </div>
              <div className="h-[128px] w-full overflow-hidden rounded">
                <HlsPlayer
                  src="03d397e2992efcc651de0d04701b2ca1"
                  autoPlay={true} controls={false} muted={true} loop={true} fillHeight={true}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Col 3 — tall single video */}
          <div className="flex-1 relative top-[-40px]" style={{ aspectRatio: "9/14" }}>
            <div className="absolute -top-2 -left-1 z-20 flex items-center justify-center rounded-md bg-[#063746]/80 shadow-md p-1">
              <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/66a5192b-b87d-488a-073b-47b8b8c8d100/public" alt="icon" className="h-6 w-6 object-contain" />
            </div>
            <div className="h-[200px] top-[-60px] w-full overflow-hidden rounded">
              <HlsPlayer
                src="90f5aaa3d5ea96226052be6f9122b8c2"
                autoPlay={true} controls={false} muted={true} loop={true} fillHeight={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Arrow + link */}
        <div className="relative z-10 px-5 mt-6 pb-10 flex flex-col gap-3">
          <svg width="36" height="44" viewBox="0 0 99 122" fill="none" aria-label="Scroll down">
            <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
          </svg>
          <Link href="#discover" className="font-heading text-[18px] font-medium text-white underline decoration-white/40 underline-offset-8">
            Discover Our Creative Approach
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. PARTNERS
      ══════════════════════════════════════ */}
      <section className="bg-[#F8F9F8] py-10 px-5">
        <div className="">
          <h2 className="text-[#2D4A4B] font-heading text-xl font-semibold mb-5">
            Partners
          </h2>
          <div className="overflow-hidden">
            <div className="flex items-center gap-12 opacity-60 whitespace-nowrap animate-marquee">
              {[...heroPartners, ...heroPartners].map((partner, index) => (
                <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 shrink-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. DREAM → CREATE → ANIMATE → FINISH
      ══════════════════════════════════════ */}
      <section id="discover" className="relative bg-dark-bg pt-14 pb-10 overflow-hidden">
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

        <div className="relative z-10 px-6.25">

          {/* Top heading row */}
          <div className="mb-5">
            <h2 className="font-heading text-[32px] leading-[1.1] text-white">
              What AI Content Generation Means At Ddip.ai
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#EBFFFF] mt-4" style={{ fontFamily: "var(--font-body)" }}>
              AI content generation at DDiP is not about speed or volume alone.
            </p>
            <p className="text-[16px] leading-[1.6] text-[#EBFFFF] mt-8" style={{ fontFamily: "var(--font-body)" }}>
              It&apos;s about using AI as a creative partner — supporting design decisions,
              expanding possibilities, and accelerating production without losing intent.
            </p>
          </div>

          <div style={{ overflowX: "auto" }} className="scrollbar-hide">
            <div className="flex items-center" style={{ minWidth: "860px", gap: "0", borderRadius: "12px" }}>

              {/* ── STEP 1: Dream it ── */}
              <div className="shrink-0 flex flex-col items-center" style={{ width: "160px" }}>
                <p className="font-heading text-white mb-2" style={{ fontSize: "15px" }}>Dream it.</p>
                <div className="flex flex-col gap-1">
                  {[
                    "A luxury real estate model in a...",
                    "Modern villa exterior, M...",
                    "Upscale property showca...",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-1.5 rounded-[6px] px-2 py-1" style={{ width: "148px", background: "#08262F", border: "1px solid #BEBEBE", boxShadow: "0px 0px 3px 3px #FFFFFF1A inset" }}>
                      <span className="text-white flex-1 truncate" style={{ fontSize: "11px", fontFamily: "var(--font-body)" }}>{text}</span>
                      <div className="shrink-0 flex items-center justify-center rounded-full border border-white/20 bg-white" style={{ width: "16px", height: "16px" }}>
                        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#08262F" strokeWidth="2.5"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" /></svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Connector: 3 lines → node ── */}
              <div className="shrink-0 relative flex items-center top-[15px]" style={{ width: "70px", height: "110px" }}>
                <svg width="70" height="110" viewBox="0 0 70 110" fill="none" style={{ position: "absolute", left: 0, top: 0 }}>
                  <path d="M0 22 C30 22 30 55 52 55" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                  <path d="M0 55 L52 55" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                  <path d="M0 88 C30 88 30 55 52 55" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                </svg>
                <Image
                  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/73eb47b0-8e72-4f36-60a2-fc3530f58200/public"
                  alt="node" width={18} height={18}
                  style={{ position: "absolute", right: "-4px", top: "50%", transform: "translateY(-50%)" }}
                />
              </div>

              {/* ── STEP 2: Create it ── */}
              <div className="shrink-0 flex flex-col items-center" style={{ width: "150px" }}>
                <p className="font-heading text-white mb-2" style={{ fontSize: "15px" }}>Create it.</p>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bb102694-2ca6-44a5-9037-4865b1e41400/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2bf2b49d-9a2e-4878-032e-7cbb7687ae00/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a50f1f9d-c362-407b-d72b-277705a61000/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4eb7734a-2629-45b5-a3ae-22c14598ac00/public",
                  ].map((src, i) => (
                    <div key={i} className="relative overflow-hidden rounded-[6px]" style={{ height: "68px", width: "68px" }}>
                      <Image src={src} alt={`create-${i}`} fill className="object-cover" sizes="68px" />
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Connector: node → line → node ── */}
              <div className="shrink-0 relative flex items-center top-[15px]" style={{ width: "70px", height: "110px" }}>
                <Image
                  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/73eb47b0-8e72-4f36-60a2-fc3530f58200/public"
                  alt="node" width={18} height={18}
                  style={{ position: "absolute", left: "-2px", top: "50%", transform: "translateY(-50%)" }}
                />
                <svg width="70" height="4" viewBox="0 0 70 4" fill="none" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}>
                  <line x1="0" y1="2" x2="54" y2="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                </svg>
                <Image
                  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fdf3d272-410d-4ef4-260a-63f4ea52cc00/public"
                  alt="node" width={18} height={18}
                  style={{ position: "absolute", right: "-2px", top: "50%", transform: "translateY(-50%)" }}
                />
              </div>

              {/* ── STEP 3: Animate it ── */}
              <div className="shrink-0 flex flex-col items-center" style={{ width: "200px" }}>
                <p className="font-heading text-white mb-2" style={{ fontSize: "15px" }}>Animate it.</p>
                <div className="flex gap-1 items-start">
                  <div className="relative overflow-hidden rounded-[6px]" style={{ height: "130px", width: "60px" }}>
                    <HlsPlayer src="03d397e2992efcc651de0d04701b2ca1" autoPlay controls={false} muted loop fillHeight={false} className="h-[130px] w-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="relative overflow-hidden rounded-[6px]" style={{ height: "70px", width: "60px" }}>
                      <HlsPlayer src="52d4f5fdd1335b2fbaba2f41798273f1" autoPlay controls={false} muted loop fillHeight={false} className="h-[70px] w-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden rounded-[6px]" style={{ height: "85px", width: "60px" }}>
                      <HlsPlayer src="90b6c18df1bb19d1117f6d29f6859036" autoPlay controls={false} muted loop fillHeight={false} className="h-[85px] w-full object-cover" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1" style={{ marginTop: "14px" }}>
                    <div className="relative overflow-hidden rounded-[6px]" style={{ height: "65px", width: "60px" }}>
                      <HlsPlayer src="8ffbc4055a9b0210350a2748fcbb8ce4" autoPlay controls={false} muted loop fillHeight={false} className="h-[65px] w-full object-cover" />
                    </div>
                    <div className="relative overflow-hidden rounded-[6px]" style={{ height: "65px", width: "60px" }}>
                      <HlsPlayer src="2f4c298d7224c5140c18bc3c0f6faf22" autoPlay controls={false} muted loop fillHeight={false} className="h-[65px] w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Connector: 5 lines → node ── */}
              <div className="shrink-0 relative flex items-center top-[21px]" style={{ width: "65px", height: "140px" }}>
                <svg width="65" height="140" viewBox="0 0 65 140" fill="none" style={{ position: "absolute", left: 0, top: 0 }}>
                  <path d="M0 14 C28 14 28 70 47 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                  <path d="M0 42 C28 42 28 70 47 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                  <path d="M0 70 L47 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                  <path d="M0 98 C28 98 28 70 47 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                  <path d="M0 126 C28 126 28 70 47 70" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" fill="none" />
                </svg>
                <Image
                  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/248292a1-8078-42b6-a7f1-cc34d064ef00/public"
                  alt="node" width={18} height={18}
                  style={{ position: "absolute", right: "-4px", top: "50%", transform: "translateY(-50%)" }}
                />
              </div>

              {/* ── STEP 4: Finish it ── */}
              <div className="shrink-0 flex flex-col items-center" style={{ width: "145px" }}>
                <p className="font-heading text-white mb-2" style={{ fontSize: "15px" }}>Finish it.</p>
                <div className="relative overflow-hidden rounded-[10px]" style={{ height: "190px", width: "135px" }}>
                  <HlsPlayer src="90f5aaa3d5ea96226052be6f9122b8c2" autoPlay controls={false} muted loop fillHeight className="h-full w-full object-cover" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WHAT WE GENERATE — horizontal scroll
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-12" style={safePx}>
        <h2
          className="font-heading text-[32px] font-bold leading-snug"
          style={{
            background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          What We Generate
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-[#063746]">
        We create AI-assisted content across formats and platforms, always aligned with your brand&apos;s  visual and tonal identity.
        </p>

        <div
          className="mt-6 -mx-5 overflow-hidden pb-3"
          style={{
            paddingLeft: "max(20px, env(safe-area-inset-left))",
            paddingRight: "max(20px, env(safe-area-inset-right))",
          }}
        >
          <div
            className="flex gap-4"
            style={{
              animation: "scroll-horizontal 25s linear infinite",
              width: "fit-content",
            }}
          >
            {generateItems.map((item, i) => (
              <div key={i} className="shrink-0 w-80">
                <div className="relative h-75 overflow-hidden rounded-2xl bg-[#D9D9D9]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="260px" />
                </div>
                <p className="mt-3 text-[16px] leading-snug text-[#063746]">{item.title}</p>
              </div>
            ))}
            {/* Duplicate items for seamless loop */}
            {generateItems.map((item, i) => (
              <div key={`duplicate-${i}`} className="shrink-0 w-80">
                <div className="relative h-75 overflow-hidden rounded-2xl bg-[#D9D9D9]">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="260px" />
                </div>
                <p className="mt-3 text-[16px] leading-snug text-[#063746]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[18px] leading-relaxed text-[#145365]">
          Each output is designed to feel coherent, intentional, and ready to use.
        </p>
      </section>

      {/* ══════════════════════════════════════
          6. 4D METHOD
      ══════════════════════════════════════ */}
      <section className="" style={{ backgroundColor: "#F0F2EF", height: "500px" }}>
        <h2
          className="text-center font-heading text-[34px] font-medium uppercase leading-[1.05] text-[#063746]"
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          Our 4D Method
        </h2>

        {/* Cards fan layout */}
        <div
          className="relative mx-auto flex items-center justify-center gap-20"
          style={{ height: "400px", maxWidth: "1000px" }}
        >
          {/* Connecting image */}
          {/* <img
          src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5b237882-4b7c-42ee-ed94-21743ef81d00/public"
          alt="connecting line"
          className="absolute top-[70%] left-[8%] right-[8%] z-0 w-[84%] object-cover -translate-y-1/2"
        /> */}

          {methodSteps.map((step, i) => (
            <div
              key={step.title}
              className="relative z-10 shrink-0"
              style={{
                transform: `rotate(${step.rotate}) translateY(${i === 0 ? "140px" : i === 1 ? "20px" : i === 2 ? "20px" : "140px"})`,
                marginLeft: i === 0 ? "0" : "-10px",
              }}
            >
              <div
                className="w-52.5 h-69 rounded-3xl p-4 flex flex-col shadow-lg"
                style={{ backgroundColor: step.bg }}
              >
                {/* Number */}
                <span
                  className="text-[18px] opacity-50 text-center"
                  style={{ color: step.textColor, fontFamily: "var(--font-body)" }}
                >
                  {step.num}
                </span>

                {/* Icon */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-10 h-10 opacity-80"
                    style={{ transform: `rotate(${i === 0 ? "33deg" : i === 3 ? "-33deg" : "0deg"})` }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-[28px]  leading-tight mb-3 text-center"
                  style={{ color: step.textColor, fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[12px] leading-normal opacity-70 text-center"
                  style={{ color: step.textColor, fontFamily: "var(--font-body)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CONTENT AT SCALE
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-8 bg-dark-bg" style={safePx}>
        {/* Image at top */}
        <div className="overflow-hidden rounded-xl mb-6">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/233c554f-70bb-4ffb-7036-64224285bd00/public"
            alt="Content at scale"
            width={800}
            height={900}
            className="w-full object-cover h-[230px]"
            sizes="100vw"
          />
        </div>

        <div className="relative z-10">
          <h2 className="font-heading text-[34px] font-medium leading-snug text-white">
            Content At Scale
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-white">
            AI allows us to scale without losing consistency.
          </p>
          <p className="mt-3 text-[16px] leading-relaxed text-white">
            We produce content across multiple formats, platforms, and languages while maintaining a strong visual core.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            {scaleFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl px-4 py-4" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <Image src={f.icon} alt="" width={22} height={22} className="object-contain" />
                </div>
                <span className="text-[14px] leading-snug text-white">{f.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[16px] font-medium text-white">
            Scale is built into the system, not added later.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. USE CASES — icon cards
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[34px] text-center font-medium uppercase leading-snug text-[#063746]">
          Use Cases
        </h2>
        <p className="mt-2 text-[18px] leading-relaxed text-center text-[#063746]">
          AI commercial production supports different creative needs, from always-on content to campaign launches.
        </p>
        <div className="mt-5 -mx-5 flex gap-3 overflow-x-auto pb-3 scrollbar-hide" style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))" }}>
          {useCaseCards.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3 shrink-0 h-[97px] w-[300px] " style={{ background: "#002834" }}>
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-white/20">
                <Image src={item.icon} alt={item.label} width={20} height={20} />
              </div>
              <span className="text-[15px] leading-normal text-white">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[16px] text-center font-medium text-[#063746]">
          At DDIP.AI, each project starts with a story.
        </p>
      </section>

      {/* ══════════════════════════════════════
          9. SELECTED WORK — horizontal scroll
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pb-10" style={safePx}>
        <div
          className="-mx-5 flex gap-3 overflow-x-auto pb-3"
          style={{
            paddingLeft: "max(20px, env(safe-area-inset-left))",
            paddingRight: "max(20px, env(safe-area-inset-right))",
            scrollbarWidth: "none",
          }}
        >
          {useCaseItems.map((item, i) => (
            <div key={i} className="shrink-0 w-50">
              <div className="relative overflow-hidden rounded-2xl bg-[#D9D9D9]" style={{ aspectRatio: "9/14" }}>
                <HlsPlayer src={item.video} autoPlay controls={false} muted loop fillHeight={false} className="h-[380px] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3">

                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/30 px-2 py-0.5 text-[9px] text-[#063746] bg-[#FFFFFFB2]">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 font-heading text-[18px] font-medium text-[#063746]]">{item.title}</p>
            </div>

          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          10. TOOL ECOSYSTEM
      ══════════════════════════════════════ */}
      <ToolEcosystem />
         {/* ══════════════════════════════════════
          11. PARTENERS
      ══════════════════════════════════════ */}
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
                  <img src={partner.image} alt={partner.name} className="max-h-12.5 max-w-22.5 object-contain" />
                ) : (
                  <span className="font-heading text-base font-semibold text-[#063746]/40">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          10. FAQ
      ══════════════════════════════════════ */}
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
              Talk to us
            </Link>
          </div>
        </div>
      </section>
    

      {/* ══════════════════════════════════════
          12. CTA
      ══════════════════════════════════════ */}
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
    </>
  );
}
