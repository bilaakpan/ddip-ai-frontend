"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";
import FaqSection from "@/components/desktop/FaqSection";
import HeroPartnersSection from "@/components/desktop/HeroPartnersSection";
import FourDMethodSection from "@/components/desktop/FourDMethodSection";
import PartnersSection from "@/components/desktop/PartnersSection";

/* ─── Data ─── */


const heroPartners = [
    { name: 'Vesta Global', logo: 'https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/df6e0710-2d50-486d-5f59-5e751559e900/public' },
    { name: 'Brother', logo: 'https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/86b61c21-9a9c-439a-317a-85b52a8e1200/public' },
    { name: 'Mediterra', logo: 'https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c4b8d5eb-29a6-4b39-cf0e-bcb6da555800/public' },
    { name: 'Bizim Mutfak', logo: 'https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fd4760d4-1dac-4f11-1800-7c8f7e1dfa00/public' },
    { name: 'Optimum', logo: 'https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b22ddb7-f87d-499e-df17-ae9efd2e5200/public' },
    { name: 'CollaSel', logo: 'https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e47e5b16-132e-40ee-537a-2d44a3283d00/public' },
    { name: 'SelJel', logo: 'https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4c453b6d-12e2-4fb3-f7d3-75d85e1a5200/public' },
  ];

const whatGeoItems = [
  { title: "Content structure and format", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1c2df9e6-58f9-4e83-fc29-0819fcd45e00/public" },
  { title: "Semantic clarity and depth", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/23654e2b-dd79-4cca-114e-e32316b23100/public" },
  { title: "Multi-engine presence", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b99e4b63-4401-4b60-7310-47c6a8bc6500/public" },
  { title: "Topic authority signals", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/08c1fef4-298a-49cb-aaff-63067d39a100/public" },
];

const optimizeItems = [
  { title: "Content Architecture and Hierarchy", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/60119b83-5024-4efc-edde-585a84dd2100/public" },
  { title: "Semantic markup and metadata", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/147febb9-0d15-49f2-2408-71f7f29b6700/public" },
  { title: "Multi-engine optimization", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3c3064d9-09d8-4f0c-e06e-743e6ec4ca00/public" },
  { title: "Image & media optimization", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/72b5f1dc-0fa3-45f3-a4ec-bbea9e339600/public" },
];

const methodSteps = [
  { 
    num: "01", title: "Define", icon: "/images/geo/icon-01.svg", rotate: "-22deg",
    desc: "We identify audience intent, search behavior, and the questions AI systems need to answer.",
    bg: "#E1E1E1", textColor: "#063746"
  },
  { 
    num: "02", title: "Design", icon: "/images/geo/icon-02.svg", rotate: "-9deg",
    desc: "Content structure, hierarchy, and semantic flow are shaped for clarity and relevance.",
    bg: "#1CE3F4", textColor: "#063746"
  },
  { 
    num: "03", title: "Develop", icon: "/images/geo/icon-03.svg", rotate: "9deg",
    desc: "AI-readable content and contextual signals are implemented across pages.",
    bg: "#063746", textColor: "#ffffff"
  },
  { 
    num: "04", title: "Deliver", icon: "/images/geo/icon-04.svg", rotate: "22deg",
    desc: "Optimized content is deployed with measurable improvements in visibility and discoverability.",
    bg: "#1a8a9a", textColor: "#ffffff"
  },
];

const whyGeoItems = [
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/707b3e8b-49b6-4282-1005-d1d4de0db400/public" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bedfa4c1-7385-4774-9039-2c9412466600/public" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4dce55b0-c4e6-4459-27b2-4bb110d56900/public" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/220a5014-5271-4ac7-58c7-4fdddd233600/public" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8e8c5d60-cc1f-493e-8353-2937c8047800/public" },
];

const useCases = [
  { title: "E-commerce", desc: "Corporate and service websites", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b42d0e77-4b0b-4314-855a-50742215f400/public" },
  { title: "SaaS", desc: "Thought leadership and editorial content", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b6d8c2f0-639e-4be4-963e-3bcf48bd1400/public" },
  { title: "Healthcare", desc: "Multi-region and multi-language platforms", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e65d732c-ec5f-4775-5e9e-9842929fd300/public" },
  { title: "Finance", desc: "AI-ready content hubs", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b2122307-7cd1-4046-b85c-1d3c3029e800/public" },
  { title: "Education", desc: "Brands preparing for AI-driven search visibility", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4d210387-714f-4c9e-729d-11f757158700/public" },
];

const faqLeft = [
  "Is GEO the same as SEO?",
  "Do I still need SEO?",
  "Is GEO only about content?",
  "How does GEO affect visibility in AI-generated results?",
  "Does GEO work with time-based search results?",
];

const faqRight = [
  "Is GEO a one-time optimization or an ongoing process?",
  "Can GEO improve brand authority across similar traffic?",
  "Is GEO limited for smaller sites or only large platforms?",
  "How do you measure GEO performance?",
  "Can GEO be applied to existing websites?",
  "Is GEO aligned with future search trends?",
];

export default function GeoPage() {
  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);

  useEffect(() => {
    cmsApi
      .faqs("geo")
      .then((res) => {
        if (res.data?.length) {
          const mid = Math.ceil(res.data.length / 2);
          setCmsFaqLeft(res.data.slice(0, mid).map((f: Faq) => f.question));
          setCmsFaqRight(res.data.slice(mid).map((f: Faq) => f.question));
        }
      })
      .catch(() => {});
  }, []);


  function FeatureCard({ iconSrc, text }: { iconSrc: string; text: string }) {
  return (
    <div className="bg-white/8 border border-white/12 rounded-xl p-5 md:p-6 mb-4 backdrop-blur-md flex items-center gap-4 transition-all duration-300 hover:bg-white/12 hover:-translate-y-1">
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
        <img
          src={iconSrc} 
          alt="icon" 
          width={22} 
          height={22}
          className="w-5 h-5 object-contain"
        />
      </div>
      <p className="font-sf text-white/95 text-sm md:text-base leading-relaxed">
        {text}
      </p>
    </div>
  );
}




  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — "DDIP GEO OPTIMIZAT..."
          ════════════════════════════════════════════════════════ */}

<section className="relative overflow-hidden bg-dark-bg pb-16 pt-40 min-h-[900px]">
  {/* Background Gradient */}
  <div className="absolute right-0 top-0 h-full w-[55%]">
    <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
  </div>

  {/* Top Scrolling Header */}
<div className="overflow-hidden whitespace-nowrap">
  <div className="flex animate-marquee">
    
    {/* First Copy */}
    <div className="flex">
      <h1 className="text-[140px] text-white whitespace-nowrap">
        DDIP GEO OPTMIZATION
        <span className="mx-4 inline-block">
          <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/154cd613-2d04-4634-41b3-834c90dc5800/public" className="h-[70px]" />
        </span>
        AI CONTENT GENERATION
      </h1>
    </div>

    {/* Second Copy (duplicate for seamless loop) */}
    <div className="flex">
      <h1 className="text-[140px] text-white whitespace-nowrap">
        DDIP GEO OPTMIZATION
        <span className="mx-4 inline-block">
          <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/154cd613-2d04-4634-41b3-834c90dc5800/public" className="h-[70px]" />
        </span>
        AI CONTENT GENERATION
      </h1>
    </div>

  </div>
</div>

  

  <div className="relative z-20 mt-8 px-[130px] flex flex-col lg:flex-row justify-between items-start">
    {/* LEFT SIDE: Text Content */}
    <div className="">
      <h2 className="font-heading text-[60px] font-medium leading-[1.0] text-white">
        Visibility No Longer Ends
        <br />
        With Search.
      </h2>
      <p className="mt-4 text-[26px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
        GEO Optimization helps brands become visible in AI-powered search, discovery, and answer engines.
      </p>

      <div className="flex flex-col gap-4 mt-[100px]">
        <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-[90px] w-[90px]" aria-label="Scroll down">
          <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
        </svg>
        <a 
          href="#discover" 
          className="text-white underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-teal-500 text-[25px]"
          style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
        >
         Discover Our GEO Optimization
        </a>
      </div>
    </div>

    {/* --- RIGHT SIDE: FLOATING IMAGES CONTAINER --- */}
    <div className="relative w-full max-w-[650px] h-[500px] mt-10 lg:mt-0 hidden lg:block">
      
      {/* 1. 45 Prompts Box (Top Left of group) */}
      <div className="absolute -top-10 left-10 z-30 transform hover:scale-105 transition-transform duration-300" style={{top:"50px",left:"260px"}}>
        <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/126eeb07-a598-40d1-507b-a169c3a61700/public" alt="45 prompts" className="w-[180px] drop-shadow-2xl" />
      </div>

      {/* 2. Main Platform Stats Chart (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[426px]">
        <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/955273a6-c801-43e4-0062-087b7818f400/public" alt="AI Stats Chart" className="drop-shadow-2xl ml-[-95px]" />
      </div>

      {/* 3. AI Visibility Gauge (Top Right) */}
      <div className="absolute top-[90px] right-[0px] z-30">
        <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/90710c77-9f67-41f8-bda2-b4c00d5cd500/public" alt="65% Visibility" className="w-[140px] drop-shadow-2xl" />
      </div>

      {/* 4. Citations / Sources (Bottom Right) */}
      <div className="absolute bottom-[150px] right-[-50px] z-30">
        <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/515630f1-bbc9-435a-827a-dda9e69eb700/public" alt="345 sources" className="w-[160px] drop-shadow-xl" />
      </div>

      {/* 5. Tool Icons Cluster (Bottom Center) */}
      <div className="absolute -bottom-5 right-[130px] z-40">
        <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/27262750-55ac-4bf3-a2ba-48f39ea3f800/public" alt="AI Icons" className="w-[200px]" />
      </div>

    </div>
  </div>

  {/* Footer Scroll Indicator */}
  <div className="absolute bottom-10 right-[60px] z-10">
    <p className="text-[11px] tracking-wider text-white/30" style={{ fontFamily: "var(--font-body)" }}>SCROLL</p>
  </div>
</section>

{/* actual partners comp */}
<HeroPartnersSection />

      {/* ════════════════════════════════════════════════════════
          2. WHY SEO ALONE IS NO LONGER ENOUGH
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg">
        <div className="">
          <div className="grid grid-cols-2 gap-16">
            <div className="px-20">
              <h2 className="font-heading text-[60px] font-medium uppercase leading-[1.1] text-[#063746]">
                Why SEO Alone Is No
                <br />
                Longer Enough
              </h2>
              <div className="w-full mt-[60px] d-flex flex justify-end">
              <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81f155be-4acd-4ee4-f772-861a73198900/public" className="w-[500px] "/>
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-[20px] leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
                SEO has shaped how brands become visible online for years.
              </p>
              <p className="text-[20px] leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
               But how people search for information is changing. <br />
Instead of scrolling through result pages, users increasingly ask questions and expect direct answers, often delivered by AI-powered search engines, chat interfaces, and answer systems
              </p>
              <p className="text-[20px] leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
                In this new environment, ranking is only part of the equation. What matters more is whether your content is <b>understood, trusted, and referenced</b> by these systems.
              </p>
                <p className="text-[20px] leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
               That's where GEO Optimization comes in.
              </p>
            </div>
          </div>

       {/* seo geo compoent */}
           <div className="relative overflow-hidden px-4 pt-8 pb-24 sm:px-8 sm:pt-10 md:px-[70px] md:pt-[35px] mt-[60px]" style={{ minHeight: "600px" }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3a299844-7937-43b1-4a7b-3478050b4900/public" alt="background clouds" className="w-full h-full object-cover" />
      </div>

      {/* Main Heading */}
      <h1 className="relative z-10 text-[28px] sm:text-[34px] md:text-[40px] font-bricolage font-semibold text-white mb-[30px]">
        SEO vs GEO: what's the difference?
      </h1>

      {/* Comparison Section */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center">
        {/* SEO Column */}
        <div className="flex-1 w-full">
          <h2 className="text-[22px] sm:text-[28px] font-bricolage font-bold text-white mb-[15px]">SEO</h2>
          <FeatureCard iconSrc="/images/geo/icon-01.svg" text="SEO focuses on helping content rank in search engines." />
          <FeatureCard iconSrc="/images/geo/icon-02.svg" text="SEO optimizes for keywords and rankings" />
          <FeatureCard iconSrc="/images/geo/icon-03.svg" text="SEO aims to drive clicks" />
        </div>

        {/* VS */}
        <div className="text-[48px] sm:text-[64px] lg:text-[80px] font-bricolage font-bold text-[#EBFFFF] flex-shrink-0 text-center w-full lg:w-auto">
          V.S.
        </div>

        {/* GEO Column */}
        <div className="flex-1 w-full">
          <h2 className="text-[22px] sm:text-[28px] font-bricolage font-bold text-white mb-[15px]">GEO</h2>
          <FeatureCard iconSrc="/images/geo/icon-04.svg" text="GEO focuses on helping content be interpreted and surfaced by AI systems." />
          <FeatureCard iconSrc="/images/geo/icon-05.svg" text="GEO optimizes for context, structure, and intent" />
          <FeatureCard iconSrc="/images/geo/icon-06.svg" text="GEO aims to become the answer" />
        </div>
      </div>

      {/* Footer Text */}
      <div className="relative z-10 mt-10 max-w-md text-white">
        <p className="font-sf font-semibold mb-2 text-base md:text-lg">GEO doesn't replace SEO.</p>
        <p className="font-sf opacity-90 text-sm md:text-base">"It builds on it" to prepare your content for AI-powered discovery.</p>
      </div>
    </div>



        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. WHAT GEO OPTIMIZATION MEANS AT DDIP.AI
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg">
        <div className="">
          {/* <div className="grid grid-cols-2 gap-16">
            <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#063746]">
              What GEO Optimization
              <br />
              Means At Ddip.ai
            </h2>
            <div className="space-y-4">
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                At DDiP AI, GEO Optimization is about designing content and structure that AI systems can clearly read, interpret, and trust.
              </p>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                This involves search engines, chat-based AI interfaces, and emerging discovery platforms.
              </p>
            </div>
          </div> */}


          <div className="min-h-screen bg-[#d4e5e1] relative overflow-hidden px-6 py-10 md:px-12 md:py-16 lg:px-20 lg:py-20">
      
      {/* Main Content Container */}
      <div className=" mx-auto relative">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-[90px] text-[#063746] mb-4 md:mb-6 leading-tight max-w-3xl" style={{fontWeight:"400"}}>
            What GEO Optimization<br />Means At Ddip.ai
          </h1>
          <p className="text-base text-[28px] text-[#145365] max-w-2xl font-sf leading-relaxed">
            At DDIP.AI, GEO Optimization is about designing content and structure that AI systems can clearly read, interpret, and trust.
          </p>
        </div>

        {/* Main Layout - Positioned Elements */}
        <div className="relative w-full" style={{ minHeight: '580px' }}>
          
          {/* Left Side - Search Platform Box (Top Left) */}
          <div className="absolute left-[6%] top-0 w-[280px] md:w-[320px] lg:w-[380px] bg-white rounded-2xl shadow-lg p-5">
            <Image 
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/23654e2b-dd79-4cca-114e-e32316b23100/public"
              alt="Search Platform"
              width={380}
              height={280}
              className="w-full h-auto"
            />
          </div>

          

         

          {/* Center - Product Comparison (Bottom Center) */}
          <div className="absolute left-[33%] top-[36%]  w-[200px]  bg-white rounded-2xl shadow-lg">
            <img 
             src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b9c86e7-e472-4cca-9ea2-9a342ecdd000/public"
              alt="Product Comparison"
              className="w-[200px] h-[175px]"
            />
          </div>


<div className="absolute  right-[22%] top-[-42%] w-[230px]">

   <img 
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b99e4b63-4401-4b60-7310-47c6a8bc6500/public"
              alt="Stats Analytics"
              className="w-full h-auto"
            />
</div>

<div className="absolute  right-[16%] top-[-27%] w-[230px]">
   <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/08c1fef4-298a-49cb-aaff-63067d39a100/public"
              alt="Stats Analytics"
              className="w-full h-auto"
            />
</div>

<div className="absolute  right-[0%] top-[-45%] w-[110px] h-[180px]">
  
   <img 
             src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5de9bd15-8fac-4ea0-61d8-77ba0a967c00/public"
              alt="Stats Analytics"
              className="w-[110px]"

            />
</div>
          {/* Right Side - Analytics Stats (Top Right) */}
          <div className="absolute right-0 top-0 w-[43%]  rounded-2xl ">
            <img 
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/da727212-dc17-4cd0-4145-347ce2da7100/public"
              alt="Stats Analytics"
              className="w-full h-auto"
            />
            {/* Bottom Text Section */}
            <div className="mt-[70px] max-w-4xl">
              <p className="text-base md:text-lg lg:text-xl text-[#2d6b6b] mb-4 font-sf leading-relaxed">
                We optimize not just what you say, but how information is organized, connected, and presented — so your brand becomes discoverable in AI-driven environments.
              </p>
              <p className="text-sm md:text-base lg:text-lg text-[#2d6b6b] font-sf leading-relaxed">
                This includes search engines, chat-based interfaces, and emerging answer platforms where visibility no longer looks like a list of links.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>

        </div>
      </section>

      {/* What We Optimize */}
      <section className="py-20 px-[60px]" style={{ backgroundColor: "#063746" }}>
        {/* Header row */}
        <div className="flex items-start justify-between mb-12">
          <h2 className="font-heading text-[50px] font-medium text-white leading-[1.1]" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>What We Optimize</h2>
          <p className="w-[540px] text-white text-[22px] leading-[1.6]" style={{ fontFamily: "SF Pro Display, var(--font-body)" }}>
            Our GEO work focuses on the foundations that make content AI-readable and discoverable:
          </p>
        </div>

        {/* Horizontal scroll cards - infinite loop */}
        <div className="overflow-hidden">
          <div className="flex gap-6 pb-4 animate-marquee" style={{ scrollbarWidth: "none" }}>
            {[...optimizeItems, ...optimizeItems].map((item, index) => (
              <div key={`${item.title}-${index}`} className="flex-shrink-0 w-[380px]">
                <div className="relative w-full h-[280px] overflow-hidden rounded-[16px] bg-white">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="380px" />
                </div>
                <p className="mt-4 text-[18px] text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. FROM SEARCH TO DISCOVERY
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 px-[60px]" style={{ backgroundColor: "#F0F2EF" }}>

        {/* LEFT TOP — large AI cube */}
        <div className="absolute left-[65px] top-[40px] w-[360px] z-10">
          <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/9b006a7f-a8df-4fd5-d33a-9f29001ad500/public" alt="AI cube" className="w-full drop-shadow-xl" />
        </div>

       

        {/* LEFT BOTTOM — chat card */}
        <div className="absolute left-[-155px] bottom-[60px] h-[210px] w-[500px] z-10">
          <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e81d8f80-071d-4611-ec3b-71b73e478000/public" alt="chat card" className="w-full drop-shadow-lg" />
        </div>

        {/* TOP CENTER — small cube */}
        <div style={{ transform: "rotate(22.26deg)" }} className="absolute right-[600px] top-[70px] w-[100px] z-10">
          <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3757d4f4-61ab-4b44-5c3d-8ce9773da900/public" alt="small cube" className="w-full drop-shadow-lg" />
        </div>



        {/* RIGHT BOTTOM — star cube */}
        <div className="absolute right-[-235px] bottom-[-20px] w-[530px] z-10">
          <img style={{ transform: "rotate(19.91deg)" }}  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8ef107f7-3615-45c9-5ed9-cfd04ca34700/public" alt="star cube" className="w-full drop-shadow-xl" />
        </div>

 <div className="absolute right-[300px] bottom-[0px] w-[400px] z-10">
          <img  src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2d6bd3db-fff4-4911-d7b2-af67ad763500/public" alt="star cube" className="w-full drop-shadow-xl" />
        </div>
<div className="absolute right-[-20px] top-[190px] w-[400px] z-10">
          <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bb3f40ab-c3e7-48b3-ea78-81b6afb06d00/public" alt="text right" className="w-full drop-shadow-xl" />
        </div>
        {/* CENTER TEXT */}
        <div className="relative z-20 mx-auto max-w-[800px] text-center py-32">
          <h2 className="font-heading text-[60px] text-left font-medium leading-[1.1] text-[#063746]" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            From search to discovery
          </h2>
          <p className="mt-3 text-[34px] text-[#145365] text-left" style={{ fontFamily: "SF Pro Display" }}>
            Search is evolving into discovery.
          </p>
          <div className="mt-8 space-y-4 text-left">
            <p className="text-[34px] leading-[1.7] text-[#145365]" style={{ fontFamily: "SF Pro Display" }}>
              AI-powered systems don&apos;t just index pages, they analyze meaning, relationships, and relevance.
            </p>
            <p className="text-[22px] leading-[1.7] text-[#145365]" style={{ fontFamily: "SF Pro Display" }}>
              They look for clear signals, structured information, and authoritative context.
            </p>
            <p className="text-[22px] leading-[1.7] text-[#145365]" style={{ fontFamily: "SF Pro Display" }}>
              GEO Optimization aligns your content with how these systems work, ensuring your brand shows up not only in searches, but in answers, summaries, and recommendations.
            </p>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════
          5. OUR 4D METHOD
          ════════════════════════════════════════════════════════ */}
      <FourDMethodSection />

      {/* ════════════════════════════════════════════════════════
          6. WHY GEO MATTERS NOW — dark card with images
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div
            className="overflow-hidden rounded-[24px] px-16 py-16 relative"
            style={{ minHeight: "420px" }}
          >
            {/* Background image — full section, high opacity dark overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/7fd78ad6-d243-4ff7-7e8e-7b3642947f00/public"
                alt=""
                className="w-full h-full object-cover object-center"
                
              />
              <div className="absolute inset-0" />
            </div>
            <div className="flex gap-8 items-start">

              {/* LEFT — Title + subtitle */}
              <div className="w-[400px] shrink-0 z-10 relative">
                <h2 className="font-heading text-[52px] font-medium leading-[1.1] text-white" style={{fontFamily:"Bricolage Grotesque"}}>
                  Why GEO<br />Matters Now
                </h2>
                <p className="mt-4 text-[18px] leading-[1.6] text-white" style={{ fontFamily: "SF Pro Display" }}>
                  AI-powered search and answer engines are already shaping how people discover brands.
                </p>
              </div>

              {/* CENTER — Floating UI images */}
              <div className="flex-1 relative z-10" style={{ minHeight: "320px" }}>
                {/* Brand appears in 45 prompts card */}
                <div className="absolute top-[100px] left-[60px]">
                  <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/126eeb07-a598-40d1-507b-a169c3a61700/public" alt="45 prompts" className="w-[240px] drop-shadow-xl" />
                </div>
                {/* Stats chart card */}
                <div className="absolute top-[-10px] left-[355px]">
                  <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b9c86e7-e472-4cca-9ea2-9a342ecdd000/public" alt="Stats" className="w-[200px] drop-shadow-xl" />
                </div>
                {/* Chat search card */}
                <div className="absolute top-[220px] left-[-220px]">
                  <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5696d1ab-9c12-4d0c-43ce-41062f80df00/public" alt="Chat search" className="w-[400px] drop-shadow-xl" />
                </div>
                {/* AI tool icons */}
                <div className="absolute top-[250px] left-[230px]">
                  <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/27262750-55ac-4bf3-a2ba-48f39ea3f800/public" alt="AI tools" className="w-[240px] drop-shadow-lg" />
                </div>
              </div>

              {/* RIGHT — Feature pills + description */}
              <div className="w-[300px] shrink-0 z-10 relative flex flex-col gap-3">
                {[
                  { icon: "/images/geo/icon-01.svg", text: "Zero-click answers are increasing" },
                  { icon: "/images/geo/icon-02.svg", text: "Chat-based search is becoming mainstream" },
                  { icon: "/images/geo/icon-03.svg", text: "Brand authority is built through context, not repetition" },
                  { icon: "/images/geo/icon-04.svg", text: "More room for bold ideas with lower production risk" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <img src={item.icon} alt="" className="w-6 h-6 opacity-70 shrink-0" style={{ filter: "invert(1)" }} />
                    <span className="text-[14px] text-white" style={{ fontFamily: "Bricolage Grotesque" }}>{item.text}</span>
                  </div>
                ))}
                <p className="mt-4 text-[18px] leading-[1.6] text-white" style={{ fontFamily: "SF Pro Display" }}>
                  GEO Optimization helps brands stay visible as these systems become the primary gateway to information.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. USE CASES
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Use Cases
          </h2>
          <p className="text-center mt-2 text-[22px] " style={{ fontFamily: "SF Pro Display, var(--font-body)" }}>
            GEO Optimization supports:
          </p>
          <div className="mt-12 grid grid-cols-5 gap-4">
            {useCases.map((item) => (
              <div key={item.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="20vw" />
                  {/* Description overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[14px] leading-[1.4] text-white" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. PARTNERS
          ════════════════════════════════════════════════════════ */}
      <PartnersSection />

      {/* ════════════════════════════════════════════════════════
          9. FAQ
          ════════════════════════════════════════════════════════ */}
      <FaqSection leftQuestions={cmsFaqLeft} rightQuestions={cmsFaqRight} />

      {/* ════════════════════════════════════════════════════════
          10. CTA
          ════════════════════════════════════════════════════════ */}
   <section className="bg-light-bg pb-24 pt-24">
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
