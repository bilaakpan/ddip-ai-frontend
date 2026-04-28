"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq, type UseCase } from "@/lib/api";

/* ─── Data ─── */
const optimizeItems = [
  { title: "Content Architecture and Hierarchy", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/60119b83-5024-4efc-edde-585a84dd2100/public" },
  { title: "Semantic markup and metadata", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/147febb9-0d15-49f2-2408-71f7f29b6700/public" },
  { title: "Multi-engine optimization", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3c3064d9-09d8-4f0c-e06e-743e6ec4ca00/public" },
  { title: "Image & media optimization", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/72b5f1dc-0fa3-45f3-a4ec-bbea9e339600/public" },
];

const processSteps = [
  { num: "01", title: "Define", desc: "We identify audience intent, search behavior, and the questions AI systems need to answer." },
  { num: "02", title: "Design", desc: "Content structure, hierarchy, and semantic flow are shaped for clarity and relevance." },
  { num: "03", title: "Develop", desc: "AI-readable content and contextual signals are implemented across pages." },
  { num: "04", title: "Deliver", desc: "Optimized content is deployed with measurable improvements in visibility and discoverability." },
];

const whyGeoItems = [
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/82fa97df-c669-400c-9639-912dee7cfc00/public", text: "Zero-click answers are increasing" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d7552922-a678-4800-1fae-558c4c41cf00/public", text: "Chat-based search is becoming mainstream" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/21828731-d34d-4aac-7592-3e5701a02900/public", text: "Brand authority is built through context, not repetition" },
  { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce41f3c8-b443-46a9-9dea-d946a6c6d100/public", text: "Content structure shapes AI discoverability" },
];

// Use cases and FAQs come from CMS API only

interface MobileGeoUseCase {
  title: string;
  desc: string;
  image: string;
}
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

const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/eebd38e3-7038-4900-5397-fe58af26e000/public" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

function FeatureCard({ iconSrc, text }: { iconSrc: string; text: string }) {
  return (
    <div className="bg-white/8 border border-white/12 rounded-xl p-5 md:p-6 mb-4 backdrop-blur-md flex items-center gap-4 transition-all duration-300 hover:bg-white/12 hover:-translate-y-1">
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
        <img
          src={iconSrc}
          alt="icon"
          width={22}
          height={22}
          className="w-5 h-5 object-contain"
        />
      </div>
      <p className="font-sf text-white text-sm md:text-base">
        {text}
      </p>
    </div>
  );
}

export default function MobileGeoPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [useCases, setUseCases] = useState<MobileGeoUseCase[]>([]);

  useEffect(() => {
    cmsApi
      .faqs("geo")
      .then((res) => {
        setCmsFaqs((res.data ?? []).map((f: Faq) => ({ question: f.question, answer: f.answer ?? "" })));
      })
      .catch(() => setCmsFaqs([]));

    cmsApi
      .useCases("geo")
      .then((res) => {
        setUseCases(
          (res.data ?? []).map((u: UseCase) => ({
            title: u.brand,
            desc: u.tags?.[0]?.tag?.name || "",
            image: u.mediaUrl || "",
          }))
        );
      })
      .catch(() => setUseCases([]));
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-[30px]" style={{ background: "linear-gradient(160deg, #063746 0%, #0a4a5c 40%, #063746 100%)" }}>
        {/* Marquee strip — sits just below navbar */}
        <div className="relative z-10 overflow-hidden pt-5">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              Ddip Geo Optimization ✦&nbsp;
            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              AI INFLUENCER ✦&nbsp;
            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px]  uppercase leading-none text-white">
              Ddip Geo Optimization ✦&nbsp;
            </span>
          </div>
        </div>
        {/* Headline + Subtitle */}
        <div className="px-5 relative z-10 mt-5">
          <h2 className="font-heading text-[22px] font-bold leading-[1.15] text-white">
            Visibility No Longer Ends With Search.
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-white/80" style={{ fontFamily: "var(--font-body)" }}>
            GEO Optimization helps brands stay visible in AI-powered search, discovery, and answer engines.
          </p>
        </div>

        {/* Floating UI Cards */}
        <div className="relative mx-auto mt-8 h-65 w-full max-w-95">

          {/* 1. 45 Prompts Box (top center) */}
          <div className="absolute z-30" style={{ top: "-14px", left: "30%", transform: "translateX(-30%)" }}>
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/126eeb07-a598-40d1-507b-a169c3a61700/public"
              alt="45 prompts"
              className="w-35 drop-shadow-2xl"
            />
          </div>

          {/* 2. Main Stats Chart (left-center) */}
          <div className="absolute z-20 ml-[15px]" style={{ top: "70px", left: "0px" }}>
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/955273a6-c801-43e4-0062-087b7818f400/public"
              alt="AI Stats Chart"
              className="w-50 drop-shadow-2xl h-[100px]"
            />
          </div>

          {/* 3. AI Visibility Gauge (top right) */}
          <div className="absolute z-30" style={{ top: "15px", right: "52px" }}>
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/90710c77-9f67-41f8-bda2-b4c00d5cd500/public"
              alt="65% Visibility"
              className="w-20 drop-shadow-2xl rounded"
            />
          </div>

          {/* 4. Citations / Sources (right, below gauge) */}
          <div className="absolute z-30" style={{ top: "110px", right: "4px" }}>
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a058d5ef-668a-4eea-6eed-a4be8dad0100/public"
              alt="345 sources"
              className="w-30 drop-shadow-xl rounded"
            />
          </div>

          {/* 5. Tool Icons Cluster (bottom center) */}
          <div className="absolute z-40" style={{ bottom: "20px", left: "50%", transform: "translateX(-40%)" }}>
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/27262750-55ac-4bf3-a2ba-48f39ea3f800/public"
              alt="AI Icons"
              className="w-37.5"
            />
          </div>

        </div>

        {/* Arrow + CTA Link */}
        <div className="px-5 flex flex-col gap-3 relative z-10">
          <svg width="40" height="50" viewBox="0 0 99 122" fill="none" aria-label="Scroll down">
            <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
          </svg>
          <a
            href="#discover"
            className="text-white underline decoration-white underline-offset-8 text-[18px]"
            style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
          >
            Discover Our Creative Approach
          </a>
        </div>

      </section>

      {/* ══════════════════════════════════════
          2. PARTNERS
      ══════════════════════════════════════ */}
      <section className="bg-[#F8F9F8] pt-10 px-5">
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
          3. WHY SEO ALONE ISN'T ENOUGH
      ══════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg pt-10" style={safePx}>
        <h2 className="font-heading text-[32px] leading-snug text-[#063746]">
          Why Seo Alone Is No Longer Enough
        </h2>
        <div className="mt-4 space-y-3 text-[14px] leading-relaxed text-[#063746]">
          <p>SEO has shaped how brands become visible online for years.</p>
          <p>But how people search is changing. Users increasingly ask questions and expect direct answers — delivered by AI-powered search engines, chat interfaces, and answer systems.</p>
          <p>What matters more now is whether your content is understood, trusted, and referenced by these systems.</p>
          <p className="font-medium text-[#063746]">That's where GEO Optimization comes in.</p>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl">
          <img
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/dd404ce1-e167-4096-54b9-62bc5fe87400/public"
            alt="SEO vs GEO"
            className="w-full object-cover"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. SEO vs GEO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-10">
        {/* seo geo compoent */}
        <div className="relative overflow-hidden px-4 pt-8 " style={{ minHeight: "600px" }}>
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d0ae9804-ce0d-4f68-0eec-8027f7ae6100/public" alt="background clouds" className="w-full h-full object-cover" />
          </div>

          {/* Main Heading */}
          <h1 className="relative z-10 text-[32px] font-bricolage text-white mb-7.5">
            SEO vs GEO: what's <br /> the difference?
          </h1>

          {/* Comparison Section */}
          <div className="relative z-10 flex flex-col gap-5 items-start">
            {/* SEO Column */}
            <div className="flex-1 w-full">
              <h2 className="text-[22px] sm:text-[28px] font-bricolage font-bold text-white mb-3.75">SEO</h2>
              <FeatureCard iconSrc="/images/geo/icon-01.svg" text="SEO focuses on helping content rank in search engines." />
              <FeatureCard iconSrc="/images/geo/icon-02.svg" text="SEO optimizes for keywords and rankings" />
              <FeatureCard iconSrc="/images/geo/icon-03.svg" text="SEO aims to drive clicks" />
            </div>

            {/* VS */}
            <div className="text-[40px] font-bricolage font-semibold text-[#EBFFFF] shrink-0 text-center w-full">
              V.S.
            </div>

            {/* GEO Column */}
            <div className="flex-1 w-full">
              <h2 className="text-[25px] font-bricolage font-medium text-white mb-3.75">GEO</h2>
              <FeatureCard iconSrc="/images/geo/icon-04.svg" text="GEO focuses on helping content be interpreted and surfaced by AI systems." />
              <FeatureCard iconSrc="/images/geo/icon-05.svg" text="GEO optimizes for context, structure, and intent" />
              <FeatureCard iconSrc="/images/geo/icon-06.svg" text="GEO aims to become the answer" />
            </div>
          </div>

          {/* Footer Text */}
          <div className="relative z-10 mt-10 max-w-md text-white pb-10">
            <p className="font-sf mb-2 text-lg">GEO doesn't replace SEO.</p>
            <p className="font-sf text-lg">"It builds on it" to prepare your content for AI-powered discovery.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WHAT GEO MEANS AT DDIP
      ══════════════════════════════════════ */}
      <section
        style={{
          backgroundImage: `
        url('https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4476e71b-422c-45ca-d223-93dff619db00/public'),
        url('https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6af3a93f-b1bd-4db1-b818-b6dc34f83b00/public')
      `,
          paddingLeft: "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundPosition: "2px -180px, -75px 230px",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundSize: "600px 700px, 600px 700px"
        }}
      >
        {/* Heading */}
        <h2 className="font-heading text-[28px] font-bold leading-[1.2] text-[#063746]">
          What GEO Optimization Means At Ddip.ai
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#145365]">
          At DDIP.AI, GEO Optimization is about designing content and structure that AI systems can clearly read, interpret, and trust.
        </p>

        {/* Cards grid — 2 columns, staggered */}
        <div className="relative mt-8 w-[360px] h-[360px]">

          {/* Top Left - AI Visibility */}
          <div className="absolute top-0 left-[70px] w-[51px] h-[85px] rounded-[6px] overflow-hidden shadow-md bg-white">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5de9bd15-8fac-4ea0-61d8-77ba0a967c00/public"
              alt="AI Visibility"
              className="w-full h-full"
            />
          </div>

          {/* Top Right - Prompt Card */}
          <div className="absolute top-[42px] right-[25px] w-[200px] h-[51px] rounded-[6px] overflow-hidden shadow-md bg-white">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/08c1fef4-298a-49cb-aaff-63067d39a100/public"
              alt="AI Chat"
              className="w-full h-full"
            />
          </div>

          {/* Middle Left - Search Result */}
          <div className="absolute top-[105px] left-[0px] w-[195px] h-[78px] rounded-[6px] overflow-hidden shadow-md bg-white">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/23654e2b-dd79-4cca-114e-e32316b23100/public"
              alt="AI Search Result"
              className="w-full h-full"
            />
          </div>

          {/* Bottom Left - Visibility Score */}
          <div className="absolute bottom-[83px] left-[42px] w-[72px] h-[60px] rounded-[6px] overflow-hidden shadow-md bg-white">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b9c86e7-e472-4cca-9ea2-9a342ecdd000/public"
              alt="Visibility Score"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right - Product Results */}
          <div className="absolute bottom-[45px] right-[33px] w-[200px] h-[113px] rounded-[6px] overflow-hidden shadow-md bg-white">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/da727212-dc17-4cd0-4145-347ce2da7100/public"
              alt="Product Results"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Body text */}
        <div className="mt-8 space-y-4 text-[14px] leading-relaxed text-[#145365]">
          <p>
            We optimize not just what you say, but how information is organized, connected, and presented — so your brand becomes discoverable in AI-driven environments.
          </p>
          <p>
            This includes search engines, chat-based interfaces, and emerging answer platforms where visibility no longer looks like a list of links.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. WHAT WE OPTIMIZE — swipeable cards
      ══════════════════════════════════════ */}
      <section className="bg-[#063746] py-10" style={safePx}>
        <h2 className="font-heading text-[32px] text-[#EBFFFF]">
          What We Optimize
        </h2>
        <p className="mt-2 text-[16px] leading-relaxed text-[#EBFFFF]">
          The foundations that make content AI-readable and discoverable:
        </p>

        <div
          className="mt-5 -mx-5 flex gap-3 overflow-x-auto pb-3"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {optimizeItems.map((item, i) => (
            <div key={i} className="shrink-0 w-63.25">
              <div className="relative h-63.25 overflow-hidden rounded-2xl">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="200px" />
              </div>
              <p className="mt-2 text-[14px] max-w-[200px] text-[#EBFFFF]">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. FROM SEARCH TO DISCOVERY
      ══════════════════════════════════════ */}
      <section className="relative bg-[#EEF2F0] pt-16 pb-10 px-5 overflow-visible">

        {/* Top row: heading + AI cube top-right */}
        {/* Top row: heading + AI cube top-right */}
        <div className="relative flex items-start justify-between gap-3">
          <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#063746] flex-1">
            From search to discovery
          </h2>
          {/* AI cube — top right, overflowing upward */}
          <div className="absolute -top-[93px] -right-3 w-25 h-25 shrink-0 z-10">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d71833fb-a4fb-49aa-5685-5cebc2eef500/public"
              alt="AI cube"
              className="w-full drop-shadow-xl"
            />
          </div>
        </div>

        {/* Body text */}
        <div className="mt-5 space-y-4 text-[22px] leading-[1.7] text-[#145365]">
          <p>
            Search is evolving into discovery. AI-powered systems don&apos;t just index pages, they analyze meaning, relationships, and relevance.
          </p>
          <p>
            They look for clear signals, structured information, and authoritative context.
          </p>
          <p>
            GEO Optimization aligns your content with how these systems work, ensuring your brand shows up not only in searches, but in answers, summaries, and recommendations.
          </p>
        </div>

        {/* Bottom: chat card — left-aligned, slightly overflowing left edge */}
        <div className="relative">
          <div className="shrink-0 w-[86px] h-[86px] flex">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c49624ee-1130-4468-37ee-9c5721029000/public"
              alt="AI cube"
              className="drop-shadow-lg absolute top-[18px] left-[-18px] z-10"
            />
          </div>
          <img
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e81d8f80-071d-4611-ec3b-71b73e478000/public"
            alt="AI chat result"
            className="drop-shadow-lg rounded-r-2xl"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. OUR 4D METHOD
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
          9. WHY GEO MATTERS NOW
      ══════════════════════════════════════ */}
      <section
        className="px-5 py-10"
        style={{
          backgroundImage: 'url(https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fedc9489-f4a3-4e66-de44-a181724aa000/public)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Floating UI cards — top area */}
        <div className="flex flex-col gap-[18px] mb-8">

          {/* Row 1 */}
          <div className="flex items-end gap-[18px]">
            {/* 45 prompts */}
            <div className="w-39.5 h-13 rounded-[8px] overflow-hidden shrink-0">
              <img
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/126eeb07-a598-40d1-507b-a169c3a61700/public"
                alt="45 prompts"
                className="w-full h-full"
              />
            </div>

            {/* Tool icons */}
            <div className="w-38.5 h-11 rounded-[8px] overflow-hidden shrink-0">
              <img
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/27262750-55ac-4bf3-a2ba-48f39ea3f800/public"
                alt="AI tools"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-start gap-2.5">
            {/* Stats */}
            <div className="w-28 h-20 rounded-[6px] overflow-hidden shrink-0">
              <img
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b9c86e7-e472-4cca-9ea2-9a342ecdd000/public"
                alt="Stats"
                className="w-full h-full"
              />
            </div>

            {/* Chat search */}
            <div className="w-[220px] h-[104px] rounded-[8px] overflow-hidden shrink-0">
              <img
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5696d1ab-9c12-4d0c-43ce-41062f80df00/public"
                alt="Chat search"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
        {/* Heading */}
        <h2 className="font-heading text-[32px] font-bold leading-[1.2] text-white">
          Why GEO Matters Now
        </h2>

        {/* Subtitle */}
        <p className="mt-3 text-[14px] leading-relaxed text-white/80">
          AI-powered search and answer engines are already shaping how people discover brands.
        </p>

        {/* Feature pills */}
        <div className="mt-6 flex flex-col gap-3">
          {whyGeoItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                <img src={item.icon} alt="" className="h-4 w-4 object-contain" />
              </div>
              <span className="text-[13px] leading-snug text-white/90">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Closing paragraph */}
        <p className="mt-6 text-[15px] leading-[1.7] text-white/80">
          GEO Optimization helps brands stay visible as these systems become the primary gateway to information.
        </p>

      </section>

      {/* ══════════════════════════════════════
          9. USE CASES
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="mb-2 font-heading text-[34px] font-medium uppercase text-[#063746] text-center">
          Use Cases
        </h2>
        <p className="mb-5 text-[18px] text-[#063746] text-center">GEO Optimization supports:</p>
        <div
          className="-mx-5 flex gap-3 overflow-x-auto pb-3"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {useCases.map((item, i) => (
            <div key={i} className="shrink-0 w-75">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="300px" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 pl-6 pb-6">
                  <p className="font-heading text-[18px] font-medium text-white">{item.title}</p>
                  <p className="mt-0.5 text-[18px] leading-snug text-white">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ══════════════════════════════════════
          10. PARTENERS
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
          11. FAQ
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
            Let&apos;s design what&apos;s next together.  <br />
          </p>
          <Link href="/start-project" className="mt-5 inline-flex  w-full items-center justify-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[18px] font-medium text-dark-bg active:opacity-80">
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </>
  );
}
