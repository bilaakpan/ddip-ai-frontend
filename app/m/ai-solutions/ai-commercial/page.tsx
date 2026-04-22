"use client";

import Link from "next/link";
import Image from "next/image";
import HlsPlayer from "@/components/desktop/video";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";
import ToolEcosystem from "@/components/mobile/ToolEcosystem";
import CTA from "@/components/mobile/CTA";
/* ─── Data ─── */
const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/eebd38e3-7038-4900-5397-fe58af26e000/public" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];
const heroPartners = [
  { name: "Vesta Global", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/df6e0710-2d50-486d-5f59-5e751559e900/public" },
  { name: "Brother", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/86b61c21-9a9c-439a-317a-85b52a8e1200/public" },
  { name: "Mediterra", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c4b8d5eb-29a6-4b39-cf0e-bcb6da555800/public" },
  { name: "Bizim Mutfak", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fd4760d4-1dac-4f11-1800-7c8f7e1dfa00/public" },
  { name: "Optimum", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b22ddb7-f87d-499e-df17-ae9efd2e5200/public" },
  { name: "CollaSel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e47e5b16-132e-40ee-537a-2d44a3283d00/public" },
  { name: "SelJel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4c453b6d-12e2-4fb3-f7d3-75d85e1a5200/public" },
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
const generateItems = [
  { title: "Brand and campaign films", src: "67280354826bc7e849dcf374cb99c759" },
  { title: "Digital commercials", src: "1944567a71eb965b43587e4827fe4d72" },
  { title: "Product and launch videos", src: "b2816aa7fba4ac757f3034e886c69cc0" },
  { title: "Hero videos for integrated campaigns", src: "24de38b44fb5a937655b4bb88d5feb37" },
];

const useCaseItems = [
  {
    title: "Vesta Global",
    subtitle: "AI-powered real estate branding and visual identity",
    category: "Real Estate",
    video: "52d4f5fdd1335b2fbaba2f41798273f1",
    tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"],
  },
  {
    title: "Cesi Design",
    subtitle: "Interior design showcase with AI-generated visuals",
    category: "Interior Design",
    video: "90b6c18df1bb19d1117f6d29f6859036",
    tags: ["Enhanced Storytelling", "High-Impact Brand Moment", "Dynamic Interior Visuals"],
  },
  {
    title: "Mediterra Group",
    subtitle: "Premium real estate marketing with creative AI",
    category: "Real Estate",
    video: "8ffbc4055a9b0210350a2748fcbb8ce4",
    tags: ["Refined Visual Storytelling", "Consistent Brand Identity", "Impactful Presentation Experience"],
  },
  {
    title: "Brother",
    subtitle: "Product campaign powered by AI production",
    category: "Printer Solutions",
    video: "2f4c298d7224c5140c18bc3c0f6faf22",
    tags: ["Creative AI Integration", "Custom Character Creation", "Enhanced Campaign Impact"],
  },
];

const features = [
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/834b85e5-e315-4bb4-fca3-0287a4505000/public", label: "Faster pre-production and visualization" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/261ea08b-ff9b-4458-9d4e-b38561a6e800/public", label: "Greater flexibility in creative exploration" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2a980055-2831-4df3-4e5f-696434fb0f00/public", label: "Easier adaptation across formats and markets" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5de7cba3-0419-4598-e2fc-de3af00cca00/public", label: "More room for bold ideas with lower production risk" },
];

const useCaseCards = [
  { icon: "/images/ai-content/icon2.svg", label: "Brand campaigns and product launches" },
  { icon: "/images/ai-content/icon4.svg", label: "Social media content ecosystems" },
  { icon: "/images/ai-content/icon5.svg", label: "Editorial and blog visuals" },
  { icon: "/images/ai-content/icon1.svg", label: "Event and announcement assets" },
  { icon: "/images/ai-content/icon3.svg", label: "E-commerce and catalog visuals" },
];

const faqFallback = [
  { question: "How does AI commercial production work?", answer: "We use generative AI tools to handle pre-production, scene generation, and post-production — delivering broadcast-quality output faster and at lower cost than traditional shoots." },
  { question: "What quality level can I expect?", answer: "Our AI pipeline produces 4K-ready assets that meet broadcast and digital advertising standards, indistinguishable from traditionally produced content." },
  { question: "Can you match our brand guidelines?", answer: "Yes. We train our workflows on your brand assets, color palettes, and visual language to ensure every piece is perfectly on-brand." },
  { question: "How long does production take?", answer: "Most projects are delivered in 1–2 weeks. Complex campaigns with multiple deliverables typically take 3–4 weeks from brief to final assets." },
  { question: "Is AI-generated content legal to use?", answer: "Yes. All content we produce is commercially licensed and cleared for use across advertising, social media, and broadcast channels." },
  { question: "How many revisions are included?", answer: "Unlimited revisions are included. Because AI production is iterative, changes are turned around in hours rather than days." },
];

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function MobileAiCommercialPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState(faqFallback);

  useEffect(() => {
    cmsApi
      .faqs("ai-commercial")
      .then((res) => {
        if (res.data?.length)
          setCmsFaqs(res.data.map((f: Faq) => ({ question: f.question, answer: f.answer })));
      })
      .catch(() => { });
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO — full-bleed image + marquee
      ══════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-dark-bg flex flex-col justify-between"
        style={{ minHeight: "100svh" }}
      >
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1d8e3642-a938-47db-841b-778200469300/public"
            alt="AI Commercial"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>

        {/* Top Content */}
        <div className="relative z-10">
          {/* Marquee strip */}
          <div className="overflow-hidden pt-[30px]">
            <div className="flex animate-marquee whitespace-nowrap">
              <span className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
                AI COMMERCIAL PRODUCTION ✦&nbsp;
              </span>
              <span className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
                AI COMMERCIAL PRODUCTION ✦&nbsp;
              </span>
            </div>
          </div>

          {/* Hero text */}
          <div style={safePx}>
            <h1 className="font-heading text-[22px] text-white">
              A New Approach To Commercial Production.
            </h1>
            <p className="mt-3 text-[16px] text-white">
              AI supports production while creativity leads every decision.
            </p>
          </div>
        </div>

        {/* Arrow + CTA at bottom */}
        <div
          className="relative z-10 pb-10 flex flex-col gap-3 items-start"
          style={safePx}
        >
          <svg
            width="99"
            height="122"
            viewBox="0 0 99 122"
            fill="none"
            className="h-10 w-auto"
            aria-label="Scroll down"
          >
            <path
              d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z"
              fill="white"
            />
          </svg>

          <Link
            href="#discover"
            className="font-heading text-[18px] font-medium text-white underline decoration-white/30 underline-offset-8"
          >
            Discover Our Creative Approach
          </Link>
        </div>
      </section>
      {/* ══════════════════════════════════════
          2. PARTNERS
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pt-10 px-5">
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
          3. WHAT IT MEANS
      ══════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[32px] font-medium leading-snug text-[#063746]">
          What AI Commercial Production Means At Ddip.ai
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-[#063746]/70">
          AI commercial production at DDIP is not about replacing creativity — it&apos;s about expanding it.
        </p>

        {/* 3-col image collage */}
        <div className="flex flex-col gap-3 w-full mt-10">
          <div className="flex gap-1.5 ml-25 justify-end">
            <div className="relative h-15 w-100 overflow-hidden rounded-md bg-[#D9D9D9] mr-5">
              <Image src={"https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c8c8cf4a-7c43-4965-3eb9-273d07e05800/public"} alt="" fill className="object-cover" />
            </div>
          </div>

          <div className="flex gap-1.5 items-center mr-30 justify-start relative left-[-25]">
            <div className="relative h-15 w-75 overflow-hidden rounded-md bg-[#D9D9D9]">
              <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d1d5fb05-4289-4080-54f1-18fbdfdece00/public" alt="" fill className="object-cover" />
            </div>
            <div className="relative h-15 w-75 overflow-hidden rounded-md bg-[#D9D9D9]">
              <Image src={`https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce155513-8c81-4907-0bf1-63fa581de400/public`} alt="" fill className="object-cover" />
            </div>
          </div>

          <div className="flex gap-1.5 justify-start ">
            <div className="relative h-15 w-100 overflow-hidden rounded-md bg-[#D9D9D9] mr-40 ml-5">
              <Image src={`https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/04f4cb07-ecde-4e20-c763-0cb3838ead00/public`} alt="" fill className="object-cover" />
            </div>
          </div>

          <div className="flex gap-1  overflow-hidden bg-[#1A1A1A] p-1.5">
            <div className="relative h-15 flex-1 overflow-hidden rounded-sm bg-[#333]" style={{ width: '500px' }}>
              <Image src="/images/ai-commercial/thirdimageaicommercial.png" alt="" fill className="object-cover" />
            </div>

          </div>

          <div className="flex gap-1 rounded-sm overflow-hidden bg-[#1A1A1A] p-1.5 relative -left-37.5">
            <div className="relative h-15 flex-1 overflow-hidden rounded-sm bg-[#333]">
              <Image src="/images/ai-commercial/fourthimageofaicomercial.png" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Feature video */}
        <div className="mt-10 overflow-hidden rounded-2xl">
          <HlsPlayer
            src="674ae5c4363ac80438bcfe52196530f7"
            autoPlay
            controls={false}
            muted
            loop
            fillHeight={false}
            fillWidth
            className="w-full rounded-2xl"
          />
        </div>
        <p className="mt-4 text-[24px] leading-relaxed text-[#063746]">
          It&apos;s about expanding it.
        </p>
        <p className="mt-2 text-[16px] leading-relaxed text-[#063746]">
          We use AI as a production layer to explore ideas faster, visualize concepts earlier, and produce digital-first commercials with greater creative freedom — without losing narrative clarity or visual quality.
        </p>
      </section>

      {/* ══════════════════════════════════════
          4. WHAT WE PRODUCE — swipeable cards
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pb-10" style={safePx}>
        <h2 className="font-heading text-[32px] font-bold leading-snug" style={{ background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          What We Produce
        </h2>
        <p className="mt-2 text-[16px] leading-relaxed text-[#063746]">
         We create AI-assisted commercial films designed for modern, digital-first campaigns.
        </p>

        <div
          className="mt-5 -mx-5 flex gap-3 overflow-x-auto pb-3"
          style={{
            paddingLeft: "max(20px, env(safe-area-inset-left))",
            paddingRight: "max(20px, env(safe-area-inset-right))",
            scrollbarWidth: "none",
          }}
        >
          {generateItems.map((item, i) => (
            <div key={i} className="shrink-0 w-50">
              <div className="relative h-75 overflow-hidden rounded-2xl bg-[#D9D9D9]">
                <HlsPlayer src={item.src} autoPlay controls={false} muted loop fillHeight className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-[14px] leading-snug text-[#063746]">{item.title}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[18px] leading-relaxed text-[#145365]">
          Each film is built around a clear message, visual language, and story.
        </p>
      </section>

      {/* ══════════════════════════════════════
          5. OUR 4D METHOD
      ══════════════════════════════════════ */}
      <section className="" style={{ backgroundColor: "#F0F2EF", height: "500px" }}>
        <h2
          className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]"
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
          6. EXPANDING CREATIVE POSSIBILITIES
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden py-10" style={{ background: "#002834" }}>
        <div className="relative z-10" style={safePx}>
          <div className="overflow-hidden rounded-xl">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d08fcb93-27d1-4eaa-e0b1-20858ee66f00/public"
              alt="Partnership"
              className="w-full object-contain"
            />
          </div>
          <h2 className="mt-10 font-heading text-[34px] font-medium leading-snug text-white">
            Expanding Creative Possibilities With AI
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-white">
            AI allows us to push creative boundaries without increasing complexity.          </p>
          <div className="mt-5 flex flex-col gap-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white bg-white/5">
                  <Image src={f.icon} alt="" width={20} height={20} className="object-contain" unoptimized />
                </div>
                <span className="text-[14px] leading-snug text-white">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. USE CASES — icon cards
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[34px] text-center font-medium uppercase leading-snug text-[#063746]">
          Use Cases
        </h2>
        <p className="mt-2 text-[18px] leading-relaxed text-center text-[#063746]">
          AI commercial production supports different creative needs, from always-on content to campaign launches.
        </p>
        <div className="mt-5 flex gap-3 overflow-x-auto pb-3 scrollbar-hidden w-[350px] h-24.25">
          {useCaseCards.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3 shrink-0" style={{ background: "#002834", minWidth: "200px" }}>
              <div className="flex h-15 w-15 shrink-0 items-center justify-center rounded-lg border border-white/20">
                <Image src={item.icon} alt={item.label} width={20} height={20} />
              </div>
              <span className="text-[16px] leading-snug text-white max-w-[200px]">{item.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[16px] text-center font-medium text-[#063746]">
          At DDIP.AI, each project starts with a story.
        </p>
      </section>

      {/* ══════════════════════════════════════
          8. SELECTED WORK — swipeable cards
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pb-10" style={safePx}>
        <div
          className="-mx-5 flex gap-5 overflow-x-auto pb-3"
          style={{
            paddingLeft: "max(20px, env(safe-area-inset-left))",
            paddingRight: "max(20px, env(safe-area-inset-right))",
            scrollbarWidth: "none",
          }}
        >
          {useCaseItems.map((item, i) => (
            <div key={i} className="shrink-0 ">
              <div className="relative overflow-hidden rounded-2xl bg-[#D9D9D9]" style={{ aspectRatio: "9/14" }}>
                <div className="w-[290px]">
                  <HlsPlayer src={item.video} autoPlay controls={false} muted loop fillHeight={false} className="h-[453px] w-full object-cover" />
                </div>
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
          9. TOOL ECOSYSTEM
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
          11. CTA
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
