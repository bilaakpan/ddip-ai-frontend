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
    { name: 'Vesta Global', logo: '/images/partners/partner_vg.png' },
    { name: 'Brother', logo: '/images/partners/partner_brother.png' },
    { name: 'Mediterra', logo: '/images/partners/partner_meditera.png' },
    { name: 'Bizim Mutfak', logo: '/images/partners/partner_bizim.png' },
    { name: 'Optimum', logo: '/images/partners/partner_optimum.png' },
    { name: 'CollaSel', logo: '/images/partners/partner_collasel.png' },
    { name: 'SelJel', logo: '/images/partners/partner_seljel.png' },
  ];

const whatGeoItems = [
  { title: "Content structure and format", image: "/images/geo/what-geo-01.png" },
  { title: "Semantic clarity and depth", image: "/images/geo/what-geo-02.png" },
  { title: "Multi-engine presence", image: "/images/geo/what-geo-03.png" },
  { title: "Topic authority signals", image: "/images/geo/what-geo-04.png" },
];

const optimizeItems = [
  { title: "Content Architecture and Hierarchy", image: "/images/geo/optimize-01.png" },
  { title: "Semantic markup and metadata", image: "/images/geo/optimize-02.png" },
  { title: "Multi-engine optimization", image: "/images/geo/optimize-03.png" },
  { title: "Image & media optimization", image: "/images/geo/optimize-04.png" },
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
  { image: "/images/geo/why-geo-01.png" },
  { image: "/images/geo/why-geo-02.png" },
  { image: "/images/geo/why-geo-03.png" },
  { image: "/images/geo/why-geo-04.png" },
  { image: "/images/geo/why-geo-05.png" },
];

const useCases = [
  { title: "E-commerce", desc: "Corporate and service websites", image: "/images/geo/usecase-01.png" },
  { title: "SaaS", desc: "Thought leadership and editorial content", image: "/images/geo/usecase-02.png" },
  { title: "Healthcare", desc: "Multi-region and multi-language platforms", image: "/images/geo/usecase-03.png" },
  { title: "Finance", desc: "AI-ready content hubs", image: "/images/geo/usecase-04.png" },
  { title: "Education", desc: "Brands preparing for AI-driven search visibility", image: "/images/geo/usecase-05.png" },
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
          <img src="/images/homepage/nameStar.png" className="h-[70px]" />
        </span>
        AI CONTENT GENERATION
      </h1>
    </div>

    {/* Second Copy (duplicate for seamless loop) */}
    <div className="flex">
      <h1 className="text-[140px] text-white whitespace-nowrap">
        DDIP GEO OPTMIZATION
        <span className="mx-4 inline-block">
          <img src="/images/homepage/nameStar.png" className="h-[70px]" />
        </span>
        AI CONTENT GENERATION
      </h1>
    </div>

  </div>
</div>

  

  <div className="relative z-20 mt-8 px-[75px] flex flex-col lg:flex-row justify-between items-start">
    {/* LEFT SIDE: Text Content */}
    <div className="max-w-lg">
      <h2 className="font-heading text-[40px] font-medium leading-[1.3] text-white">
        Visibility No Longer Ends
        <br />
        With Search.
      </h2>
      <p className="mt-4 text-[18px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
        GEO Optimization helps brands become visible in AI-powered search, discovery, and answer engines.
      </p>

      <div className="flex flex-col gap-4 mt-[60px]">
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
        <img src="/images/geo/why-geo-02.png" alt="45 prompts" className="w-[180px] drop-shadow-2xl" />
      </div>

      {/* 2. Main Platform Stats Chart (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[426px]">
        <img src="/images/geo/geoHomepage3.png" alt="AI Stats Chart" className="drop-shadow-2xl ml-[-95px]" />
      </div>

      {/* 3. AI Visibility Gauge (Top Right) */}
      <div className="absolute top-[90px] right-[0px] z-30">
        <img src="/images/geo/geoHomepage2.png" alt="65% Visibility" className="w-[140px] drop-shadow-2xl" />
      </div>

      {/* 4. Citations / Sources (Bottom Right) */}
      <div className="absolute bottom-[150px] right-[-50px] z-30">
        <img src="/images/geo/geoHomepage1.png" alt="345 sources" className="w-[160px] drop-shadow-xl" />
      </div>

      {/* 5. Tool Icons Cluster (Bottom Center) */}
      <div className="absolute -bottom-5 right-[130px] z-40">
        <img src="/images/geo/why-geo-01.png" alt="AI Icons" className="w-[200px]" />
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
      <section id="discover" className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-[40px] font-medium uppercase leading-[1.1] text-[#063746]">
                Why SEO Alone Is No
                <br />
                Longer Enough
              </h2>
              <div className="w-full mt-[60px] d-flex flex justify-end">
              <img src="/images/geo/asset-01.png" className="w-[500px] "/>
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
        <img src="/images/geo/photo-02.png" alt="background clouds" className="w-full h-full object-cover" />
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
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
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
      <div className="max-w-[1400px] mx-auto relative">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-[60px] font-bricolage font-bold text-[#1a4d4d] mb-4 md:mb-6 leading-tight max-w-3xl">
            What GEO Optimization<br />Means At Ddip.ai
          </h1>
          <p className="text-base text-[24px] text-[#2d6b6b] max-w-2xl font-sf leading-relaxed">
            At DDIP.AI, GEO Optimization is about designing content and structure that AI systems can clearly read, interpret, and trust.
          </p>
        </div>

        {/* Main Layout - Positioned Elements */}
        <div className="relative w-full" style={{ minHeight: '580px' }}>
          
          {/* Left Side - Search Platform Box (Top Left) */}
          <div className="absolute left-[6%] top-0 w-[280px] md:w-[320px] lg:w-[380px] bg-white rounded-2xl shadow-lg p-5">
            <Image 
              src="/images/geo/what-geo-02.png"
              alt="Search Platform"
              width={380}
              height={280}
              className="w-full h-auto"
            />
          </div>

          

         

          {/* Center - Product Comparison (Bottom Center) */}
          <div className="absolute left-[33%] top-[36%]  w-[200px]  bg-white rounded-2xl shadow-lg">
            <img 
             src="/images/geo/what-geo-06.png"
              alt="Product Comparison"
              className="w-[200px] h-[175px]"
            />
          </div>


<div className="absolute  right-[22%] top-[-42%] w-[230px]">

   <img 
              src="/images/geo/what-geo-03.png"
              alt="Stats Analytics"
              className="w-full h-auto"
            />
</div>

<div className="absolute  right-[16%] top-[-27%] w-[230px]">
   <img
              src="/images/geo/what-geo-04.png"
              alt="Stats Analytics"
              className="w-full h-auto"
            />
</div>

<div className="absolute  right-[0%] top-[-45%] w-[110px] h-[180px]">
  
   <img 
             src="/images/geo/aivisibleImg.png"
              alt="Stats Analytics"
              className="w-[110px]"

            />
</div>
          {/* Right Side - Analytics Stats (Top Right) */}
          <div className="absolute right-0 top-0 w-[43%]  rounded-2xl ">
            <img 
              src="/images/geo/what-geo-05.png"
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
          <p className="w-[540px] text-white/60 text-[22px] leading-[1.6]" style={{ fontFamily: "SF Pro Display, var(--font-body)" }}>
            Our GEO work focuses on the foundations that make content AI-readable and discoverable:
          </p>
        </div>

        {/* Horizontal scroll cards */}
        <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
          {optimizeItems.map((item) => (
            <div key={item.title} className="flex-shrink-0 w-[380px]">
              <div className="relative w-full h-[280px] overflow-hidden rounded-[16px] bg-white">
                <Image src={item.image} alt={item.title} fill className="object-cover" sizes="380px" />
              </div>
              <p className="mt-4 text-[18px] text-white/60" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. FROM SEARCH TO DISCOVERY
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 px-[60px]" style={{ backgroundColor: "#F0F2EF" }}>

        {/* LEFT TOP — large AI cube */}
        <div className="absolute left-[65px] top-[40px] w-[360px] z-10">
          <img src="/images/geo/firstAicc.png" alt="AI cube" className="w-full drop-shadow-xl" />
        </div>

       

        {/* LEFT BOTTOM — chat card */}
        <div className="absolute left-[-155px] bottom-[60px] h-[210px] w-[500px] z-10">
          <img src="/images/geo/rightside11.png" alt="chat card" className="w-full drop-shadow-lg" />
        </div>

        {/* TOP CENTER — small cube */}
        <div style={{ transform: "rotate(22.26deg)" }} className="absolute right-[600px] top-[70px] w-[100px] z-10">
          <img src="/images/geo/centercc.png" alt="small cube" className="w-full drop-shadow-lg" />
        </div>



        {/* RIGHT BOTTOM — star cube */}
        <div className="absolute right-[-235px] bottom-[-20px] w-[530px] z-10">
          <img style={{ transform: "rotate(19.91deg)" }}  src="/images/geo/supla.png" alt="star cube" className="w-full drop-shadow-xl" />
        </div>

 <div className="absolute right-[300px] bottom-[0px] w-[400px] z-10">
          <img  src="/images/geo/centerside11.png" alt="star cube" className="w-full drop-shadow-xl" />
        </div>
<div className="absolute right-[-20px] top-[190px] w-[400px] z-10">
          <img src="/images/geo/leftside11.png" alt="text right" className="w-full drop-shadow-xl" />
        </div>
        {/* CENTER TEXT */}
        <div className="relative z-20 mx-auto max-w-[700px] text-center py-32">
          <h2 className="font-heading text-[54px] text-left font-medium leading-[1.1] text-[#063746]" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            From search to discovery
          </h2>
          <p className="mt-3 text-[30px] text-[#145365] text-left" style={{ fontFamily: "SF Pro Display" }}>
            Search is evolving into discovery.
          </p>
          <div className="mt-8 space-y-4 text-left">
            <p className="text-[30px] leading-[1.7] text-[#145365]" style={{ fontFamily: "SF Pro Display" }}>
              AI-powered systems don&apos;t just index pages, they analyze meaning, relationships, and relevance.
            </p>
            <p className="text-[18px] leading-[1.7] text-[#145365]" style={{ fontFamily: "SF Pro Display" }}>
              They look for clear signals, structured information, and authoritative context.
            </p>
            <p className="text-[18px] leading-[1.7] text-[#145365]" style={{ fontFamily: "SF Pro Display" }}>
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
                src="/images/geo/blurimage.png"
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
                  <img src="/images/geo/why-geo-02.png" alt="45 prompts" className="w-[240px] drop-shadow-xl" />
                </div>
                {/* Stats chart card */}
                <div className="absolute top-[-10px] left-[355px]">
                  <img src="/images/geo/what-geo-06.png" alt="Stats" className="w-[200px] drop-shadow-xl" />
                </div>
                {/* Chat search card */}
                <div className="absolute top-[220px] left-[-220px]">
                  <img src="/images/geo/chtgpt11.png" alt="Chat search" className="w-[400px] drop-shadow-xl" />
                </div>
                {/* AI tool icons */}
                <div className="absolute top-[250px] left-[230px]">
                  <img src="/images/geo/why-geo-01.png" alt="AI tools" className="w-[240px] drop-shadow-lg" />
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
                    <img src={item.icon} alt="" className="w-4 h-4 opacity-70 shrink-0" style={{ filter: "invert(1)" }} />
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
          <p className="text-center mt-2 text-[22px] text-[#063746]/60" style={{ fontFamily: "SF Pro Display, var(--font-body)" }}>
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
      <section className="bg-light-bg py-6 px-[60px]">
        <div
          className="flex items-center justify-between px-[60px] py-[28px] rounded-[16px]"
          style={{ background: "linear-gradient(270deg, #002834 -2.7%, #129CAC 105.91%)" }}
        >
          <h2 className="font-heading text-[22px] font-semibold text-white">
            Let&apos;s design what&apos;s next together.
          </h2>
          <Link
            href="/start-project"
            className="inline-flex items-center rounded-full bg-[#1CE3F4] px-8 py-4 font-heading text-[15px] font-medium text-[#063746] hover:bg-[#1CE3F4]/80 whitespace-nowrap"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </>
  );
}
