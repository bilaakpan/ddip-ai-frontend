"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq, type Automation } from "@/lib/api";
import HlsPlayer from "@/components/desktop/video";

/* ─── Data ─── */
const accordionItems = [
  { title: "Content Automation", description: "Automate the way your brand creates and manages content. From social posts and short videos to trend analyses and scheduling, these workflows save time and keep creativity flowing.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public" },
  { title: "Analytics & Insights", description: "Real-time dashboards and AI-driven reporting that turn raw data into actionable business intelligence.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/35a5d56e-da6e-42ce-4072-9b24938c1a00/public" },
  { title: "Conversational Systems", description: "Intelligent chatbots and virtual assistants that handle customer interactions with natural language understanding.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce65649d-7f6d-4497-8d8a-697ee865d800/public" },
  { title: "Lead Solutions", description: "Automated lead capture, scoring, and nurturing workflows that convert prospects into customers.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0156ebdc-189b-4bce-808d-49f28c020200/public" },
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
// Featured automations come from CMS API only

interface AutomationCard {
  title: string;
  icon: string;
}

const processSteps = [
  { num: "01", title: "Define", desc: "We identify your workflow goals, pain points, and the systems that need to connect." },
  { num: "02", title: "Design", desc: "We map out the automation logic, data flows, and integration architecture." },
  { num: "03", title: "Develop", desc: "Our team builds and tests the workflow using the right tools for your stack." },
  { num: "04", title: "Deliver", desc: "We deploy, monitor, and hand over a fully operational automation system." },
];

const tools = [
  { name: "Zapier", src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e2f15846-7262-4763-77b3-0a5f74a29500/public" },
  { name: "Salesforce", src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/55dd9859-5f88-4807-562a-2eb4c11b6600/public" },
  { name: "HubSpot", src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/85f76dc8-2247-4ae2-7c10-f96930df8100/public" },
  { name: "n8n", src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5b55e3de-267a-48c0-6780-de64e0ba3c00/public" },
  { name: "Claude", src: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c4688b8-29e5-46b9-7c32-574cfc737200/public" },
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

export default function MobileAutomationPage() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [featuredAutomations, setFeaturedAutomations] = useState<AutomationCard[]>([]);

  useEffect(() => {
    cmsApi
      .faqs("automation")
      .then((res) => {
        setCmsFaqs((res.data ?? []).map((f: Faq) => ({ question: f.question, answer: f.answer ?? "" })));
      })
      .catch(() => setCmsFaqs([]));

    cmsApi
      .automations(true)
      .then((res) => {
        setFeaturedAutomations(
          (res.data ?? []).map((a: Automation) => ({
            title: a.title,
            icon: a.icons?.[0]?.icon?.iconUrl || "",
          }))
        );
      })
      .catch(() => setFeaturedAutomations([]));
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/77f68331-a8dd-4518-b7e2-6b9f1e86eb00/public"
            alt="Automation"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        </div>

        {/* Marquee strip — sits just below navbar */}
        <div className="relative z-10 overflow-hidden pt-[30px]">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              AUTOMATION WITH A CREATIVE TOUCH ✦&nbsp;
            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              AUTOMATION WITH A CREATIVE TOUCH ✦&nbsp;
            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px]  uppercase leading-none text-white">
              AUTOMATION WITH A CREATIVE TOUCH ✦&nbsp;
            </span>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 flex flex-col justify-end pb-10" style={safePx}>
          <h1 className="font-heading text-[22px] text-white">
            Automation Designed for
            Intelligence and Impact.
          </h1>
          <p className="mt-3 text-[16px] text-white">
            Each workflow is designed to automate, learn, and optimize — giving your team more time to think, create, and lead.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <Link href="/start-project" className="font-heading text-[16px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              Request a Custom Solution →
            </Link>
          </div>

          <div className="mt-20 flex items-start  flex-col gap-4">
            <div className="flex  items-center justify-center ">
              <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-10 w-auto" aria-label="Scroll down">
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
            <Link href="#discover" className="font-heading text-[18px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              View Workflow Templates
            </Link>
          </div>
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
          3. AUTOMATION MADE SIMPLE — accordion
      ══════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[28px] font-bold leading-snug text-[#063746]">
          Automation Made Simple, Scalable, and Smart
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#063746]">
          A library of intelligent, pre-built workflows to automate what slows teams down. From content creation to analytics and customer engagement, each template is designed to connect, perform, and evolve with your business.
        </p>

        {/* Active item image */}
        <div className="mt-5 overflow-hidden rounded-2xl">
          <img
            src={accordionItems[openAccordion ?? 0]?.image ?? accordionItems[0].image}
            alt={accordionItems[openAccordion ?? 0]?.title ?? ""}
            className="w-full object-cover transition-all duration-500"
          />
        </div>

        {/* Accordion */}
        <div className="mt-4 flex flex-col">
          {accordionItems.map((item, index) => {
            const isOpen = index === openAccordion;
            return (
              <div key={index} className="border-t border-[#063746]/10">
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[16px] font-medium transition-colors ${isOpen ? "text-[#0A7D94]" : "text-[#063746]"}`}>
                    {item.title}
                  </span>
                  <svg
                    className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? "rotate-180 text-[#0A7D94]" : "text-[#063746]/40"}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[13px] leading-relaxed text-[#5C5C5C]">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-[#063746]/10" />
        </div>
      </section>


      {/* ══════════════════════════════════════
          4. FEATURED AUTOMATIONS
      ══════════════════════════════════════ */}
      <section className="bg-[#002834] py-10" style={safePx}>
        <h2 className="font-heading text-[32px] font-bold leading-snug text-white">
          Featured Automations,<br />Designed for Impact
        </h2>
        <p className="mt-2 text-[16px] leading-relaxed text-white">
          Choose a workflow that fits your goals. From content generation to data analysis, automation starts here.
        </p>

        <div className="mt-6 flex flex-col gap-5">
          {featuredAutomations.map((item, i) => (
            <div
              key={i}
              className="rounded-[20px] p-[1.5px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(144,229,243,0.8) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.4) 100%)",
                boxShadow: "0 10px 30px rgba(0, 180, 200, 0.25)",
              }}
            >
              {/* Inner Card */}
              <div
                className="rounded-[18px] p-4 flex flex-col justify-between"
                style={{
                  background:
                    "#002834",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
                }}
              >
                {/* Tool icons row */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cf3fd8ca-58ce-47df-88ce-74a2b444b400/public" alt="Globe" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-7 h-7  rounded-lg flex items-center justify-center" style={{ backgroundColor: "#229ED9" }}>
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e4ef2ee1-c4ca-4669-edbf-3a2f45d4f900/public" alt="Telegram" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF0000" }}>
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2de131fa-54be-4e66-d0a3-13e5b19bb400/public" alt="YouTube" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-7 h-7  rounded-lg flex items-center justify-center bg-white/10">
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/928968a1-3d43-4362-dd86-e36ac1e30100/public" alt="More" width={50} height={50} className="rounded" />
                  </div>
                </div>
                {/* Title */}
                <p className="text-[22px] font-medium text-[#EBFFFF] mb-4 mt-5">{item.title}</p>

                {/* Automate This button */}
                <button
                  className="w-full rounded-md py-2.5 text-[16px] font-medium text-[#EBFFFF] border border-[#EBFFFF4D]"
                >
                  Automate This
                </button>
              </div>
            </div>
          ))}
        </div>

        <Link href="/m/ai-solutions/automation/templates">
          <button className="mt-6 w-[60%] rounded-full bg-[#EBFFFF] py-3 text-[16px] font-medium text-[#0E4252] active:opacity-80">
            See More Templates
          </button>
        </Link>
      </section>

      {/* ══════════════════════════════════════
          5. TAILORED WORKFLOWS
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2
          className="font-heading text-[clamp(28px,8vw,40px)] font-bold uppercase leading-none"
          style={{ background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
        >
          Tailored<br />Workflows
        </h2>
        <h3 className="mt-4 font-heading text-[24px] font-bold leading-snug text-[#063746]">
          Custom Automation, Designed For Your Business
        </h3>
        <p className="mt-2 text-[16px] leading-relaxed text-[#063746]">
          When every process demands its own logic, our team designs AI workflows that align with your systems and goals. From creative operations to enterprise data flows, every integration is built to enhance efficiency and understanding.
        </p>

        <div className="mt-5 overflow-hidden rounded-2xl" style={{ aspectRatio: "16/9" }}>
          <HlsPlayer
            src="2f9a15572f298dc4e8a6b480d57abdad"
            autoPlay
            controls={false}
            muted
            loop
            fillHeight={false}
            fillWidth
            className="w-full rounded-2xl"
          />
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <Link href="/m/start-project" className="flex items-center justify-center rounded-full bg-[#063746] py-3 text-[14px] font-medium text-white active:opacity-80">
            Request Custom Workflow
          </Link>
          <Link href="/m/lets-connect" className="flex items-center justify-center rounded-full border border-[#063746]/30 py-3 text-[14px] font-medium text-[#063746] active:bg-[#063746]/5">
            Book Consultation
          </Link>
        </div>
      </section>



      {/* ══════════════════════════════════════
          6. LET'S BUILD INTELLIGENT SYSTEMS
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2
          className="font-heading text-[32px] font-bold leading-snug text-center"
          style={{
            background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Let&apos;s Build Intelligent Systems Together.
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-[#063746] text-center">
          Whether you start from our 50+ templates or request a custom setup, your automation journey begins here.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <Link href="/m/ai-solutions/automation/templates" className="flex items-center justify-center rounded-full bg-[#0E4252] py-3 text-[18px] font-medium text-white active:opacity-80">
            Browse Templates
          </Link>
          <Link href="/m/start-project" className="flex items-center justify-center rounded-full border border-[#063746] py-3 text-[18px] font-medium text-[#063746] active:bg-[#063746]/5">
            Request Setup Help
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. 4D METHOD
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
                  className="text-[28px] leading-tight mb-3 text-center"
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


      {/* ════════════════════════════════════════════════════════
         8. USE CASES — scrollable cards with tabs
      ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-10">
        {/* Heading */}
        <h2 className="text-center font-heading text-[32px] font-bold uppercase leading-tight text-[#063746] mb-6" style={safePx}>
          Use Cases
        </h2>

        {/* Scrollable category tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {["Real Estate", "Food", "Fashion", "Tech & Digital", "Wellness", "Consulting"].map((tab, i) => (
            <button
              key={tab}
              className="shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium transition whitespace-nowrap"
              style={{
                background: i === 0 ? "#063746" : "transparent",
                color: i === 0 ? "#fff" : "#063746",
                border: i === 0 ? "none" : "1.5px solid #063746",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable video cards */}
        <div
          className="mt-5 flex gap-3 overflow-x-auto pb-3"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {[
            { title: "Vesta Global", video: "c6727f63163d214df0ef35997644d8d2", tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "df994cb7f01eed564047b8323e82eb47", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Vesta Global", video: "cec8f6e44f63bb833b4b9b71452d48cb", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "f9b719e86584fee5e05197a5e4c5e840", tags: ["Visual Style Definition", "Prompt Crafting"] },
          ].map((item, i) => (
            <div key={i} className="shrink-0 w-[75vw] max-w-75">
              <div className="relative overflow-hidden rounded-2xl bg-[#D9D9D9]" style={{ aspectRatio: "9/14" }}>
                <video
                  src={`https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/${item.video}/manifest/video.m3u8`}
                  autoPlay muted loop playsInline
                  className="h-full w-full object-cover"
                />
                {/* Tags overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] text-[#063746] backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-2 font-heading text-[16px] font-semibold text-[#063746]">{item.title}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════
          9. BUILT ON TOP OF
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[40px] font-bold uppercase leading-none text-[#063746] mb-6">
          Partners
        </h2>

        {/* Top row — 2 wide cells */}
        <div className="border border-[#C3C3C3]">
          <div className="grid grid-cols-2">
            {tools.slice(0, 2).map((tool) => (
              <div key={tool.name} className="flex h-35 items-center justify-center border-r border-[#C3C3C3] last:border-r-0">
                {tool.src ? (
                  <img src={tool.src} alt={tool.name} className="max-h-15 max-w-30 object-contain" />
                ) : (
                  <span className="font-heading text-lg font-semibold text-[#063746]/40">{tool.name}</span>
                )}
              </div>
            ))}
          </div>

          {/* Bottom row — 3 equal cells */}
          <div className="grid grid-cols-3 border-t border-[#C3C3C3]">
            {tools.slice(2).map((tool) => (
              <div key={tool.name} className="flex h-30 items-center justify-center border-r border-[#C3C3C3] last:border-r-0">
                {tool.src ? (
                  <img src={tool.src} alt={tool.name} className="max-h-12.5 max-w-22.5 object-contain" />
                ) : (
                  <span className="font-heading text-base font-semibold text-[#063746]/40">{tool.name}</span>
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
          11. Form
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-8 px-4" style={safePx}>
        {/* Heading */}
        <h2
          className="font-heading text-[30px] font-semibold leading-[1.15] tracking-[-0.5px]"
          style={{ color: "#039EB7" }}
        >
          Let&apos;s Build What&apos;s Next, Together
        </h2>

        {/* Description */}
        <p className="mt-3 text-[12px] leading-[1.5] text-[#063746]/70 max-w-[320px]">
          Whether you&apos;re exploring AI solutions or ready to start a custom project,
          our team is here to help you design intelligent systems that move your business
          forward.
        </p>

        {/* Form */}
        <div className="mt-6 flex flex-col gap-4">
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Full Name *</label>
            <input
              type="text"
              placeholder="Your name and last name"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Email Address *</label>
            <input
              type="email"
              placeholder="example@domain.com"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Company */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Company Name</label>
            <input
              type="text"
              placeholder="Your company's name"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Country */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Country</label>
            <input
              type="text"
              placeholder="Your country of residence"
              className="h-[38px] w-full rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none"
            />
          </div>

          {/* Automation Type */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Automation Type *</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Category</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Platform</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Use Case */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">Use Case</label>
            <div className="relative">
              <select className="h-[38px] w-full appearance-none rounded-[4px] border border-[#D8D8D8] px-3 text-[11px] text-[#9B9B9B] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option>Please select</option>
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#9B9B9B]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="mb-1 block text-[11px] text-[#3F444E]">
              Details regarding your question, if any
            </label>
            <textarea
              rows={4}
              className="w-full rounded-[4px] border border-[#D8D8D8] px-3 py-2 text-[11px] text-[#063746] placeholder:text-[#B9B9B9] focus:border-[#1CE3F4] focus:outline-none resize-none"
            />
          </div>

          {/* Button */}
          <button
            className="mx-auto mt-2 h-[34px] w-[68px] rounded-full text-[12px] font-medium text-white"
            style={{ backgroundColor: "#0A7D94" }}
          >
            Send
          </button>
        </div>
      </section>
    </>
  );
}
