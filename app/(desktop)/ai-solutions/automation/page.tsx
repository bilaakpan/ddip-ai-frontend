"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";
import HeroPartnersSection from "@/components/desktop/HeroPartnersSection";
import FourDMethodSection from "@/components/desktop/FourDMethodSection";
import FaqSection from "@/components/desktop/FaqSection";
import ContactFormSection from "@/components/desktop/ContactFormSection";
import AccordionWithImage from "@/components/desktop/AccordionWithImage";
import HlsPlayer from "@/components/desktop/video";
/* ─── Data ─── */

const heroPartners = ["VG", "brother", "Vestine", "OPTIMUM", "ColaSel"];

const accordionItems = [
  { title: "Content Automation", description: "Automate the way your brand creates and manages content. From social posts and short videos to trend analyses and scheduling, these workflows save time and keep creativity flowing.", image: "/images/automation/content-automation.png" },
  { title: "Analytics & Insights", description: "Real-time dashboards and AI-driven reporting that turn raw data into actionable business intelligence.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/35a5d56e-da6e-42ce-4072-9b24938c1a00/public" },
  { title: "Conversational Systems", description: "Intelligent chatbots and virtual assistants that handle customer interactions with natural language understanding.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce65649d-7f6d-4497-8d8a-697ee865d800/public" },
  { title: "Lead Solutions", description: "Automated lead capture, scoring, and nurturing workflows that convert prospects into customers.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0156ebdc-189b-4bce-808d-49f28c020200/public" },
];

const featuredAutomations = [
  { title: "Automated Video Creator", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "🎬" },
  { title: "Automated LinkedIn Posts", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "💼" },
  { title: "Trend Analyzer for Instagram", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "📊" },
  { title: "Trend Analyzer for YouTube", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "📈" },
  { title: "Lead Generation Bot", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "🤖" },
  { title: "Amazon Stock & Prize Tracker", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "📦" },
  { title: "Personal Assistant", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "🧠" },
  { title: "Meeting Assistant", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "📅" },
  { title: "Meta Ads Analyzer", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "📱" },
  { title: "WhatsApp Chatbot for Customer Support", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public", icon: "💬" },
];

const methodSteps = [
  { title: "Define", icon: "/images/ai-content/icon-01.svg", rotate: "-8deg" },
  { title: "Design", icon: "/images/ai-content/icon-02.svg", rotate: "-3deg" },
  { title: "Develop", icon: "/images/ai-content/icon-03.svg", rotate: "3deg" },
  { title: "Deliver", icon: "/images/ai-content/icon-04.svg", rotate: "8deg" },
];

const builtOnTools = ["zapier", "HubSpot", "n8n", "Claude"];

const faqLeft = [
  "What are automated workflows?",
  "What's the difference between template-based and tailored workflows?",
  "Do I need technical expertise to use these tools?",
];

const faqRight = [
  "Which industries can benefit from DDiP's workflows?",
  "How do integrations work?",
  "How long does it take to launch a workflow?",
];

const faqLeft2 = [
  "What makes DDiP workflows different from other automation tools?",
];

const faqRight2 = [
  "Can my workflows be updated or expanded later?",
];

export default function AutomationPage() {
  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);

  useEffect(() => {
    cmsApi
      .faqs("automation")
      .then((res) => {
        if (res.data?.length) {
          const mid = Math.ceil(res.data.length / 2);
          setCmsFaqLeft(res.data.slice(0, mid).map((f: Faq) => f.question));
          setCmsFaqRight(res.data.slice(mid).map((f: Faq) => f.question));
        }
      })
      .catch(() => { });
  }, []);

  const allFaqLeft = [...cmsFaqLeft, ...faqLeft2];
  const allFaqRight = [...cmsFaqRight, ...faqRight2];

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "AUTOMATION WITH A..."
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pb-16 pt-40">
        <div className="absolute right-0 top-0 h-full w-[55%]">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fbfb2d0f-627c-45ac-b654-b317ce6df500/public"
            alt="Automation showcase"
            fill
            className="object-cover object-left"
            sizes="55vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
        </div>



        <div className="overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee">
            <h1 className="text-[140px] text-white whitespace-nowrap">
              Automation with a Creative Touch
            </h1>
          </div>
        </div>

        <div className="relative z-10 mt-8 px-[60px]">
          <h2 className="max-w-lg font-heading text-[40px] font-medium leading-[1.3] text-white">
            Automation Designed for Intelligence and Impact
          </h2>
          <p className="mt-4  text-[26px] w-[640px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            Each custom is designed to automate, learn, and optimize — giving your team more time to think, create, and lead.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link href="/start-project" className="font-heading text-[30px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              Request a Custom Solution →
            </Link>
          </div>

          <div className="mt-[60px] flex items-start  flex-col gap-4">
            <div className="flex  items-center justify-center ">
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
            <Link href="#discover" className="font-heading text-[30px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              View Workflow Templates
            </Link>
          </div>


        </div>

        <div className="absolute bottom-10 right-[60px] z-10">
          <p className="text-[16px] tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>[SCROLL]</p>
        </div>
      </section>

      {/* Partners Row */}
      <HeroPartnersSection />

      {/* ════════════════════════════════════════════════════════
          2. AUTOMATION MADE SIMPLE — Accordion
          ════════════════════════════════════════════════════════ */}
      <AccordionWithImage
        heading={"Automation Made\nSimple, Scalable, And\nSmart"}
        subheading="A library of intelligent, pre-built workflows to automate what matters most. From content scheduling to customer engagement, each template is designed to connect, perform, and evolve with your business."
        items={accordionItems}
        defaultImage="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public"
      />

      {/* ════════════════════════════════════════════════════════
          3. FEATURED AUTOMATIONS — Grid of cards
          ════════════════════════════════════════════════════════ */}
      <section className="py-24 px-[60px]" style={{ backgroundColor: "#063746" }}>
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="font-heading text-[36px] font-medium leading-[1.1] text-white">
              Featured Automations,
              <br />
              Designed for Impact
            </h2>
            <p className="mt-4 max-w-sm text-[14px] leading-[1.6] text-white/50" style={{ fontFamily: "var(--font-body)" }}>
              Choose a workflow that fits your goals. From content generation to data analysis, automation starts here.
            </p>
          </div>
          <button onClick={() => window.location.href = '/ai-solutions/automation/templates'} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-medium text-[#063746] shadow-md hover:bg-white/90">

            See More Templates
          </button>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {featuredAutomations.slice(0, 8).map((item) => (
            <div key={item.title} className="rounded-[16px] p-5 flex flex-col justify-between" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
              {/* Top — social icons + +5 */}
              <div className="flex items-center gap-2">
                {/* Globe */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>
                </div>
                {/* Telegram */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#229ED9" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.613c-.15.67-.54.835-1.094.52l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.48 14.49l-2.95-.924c-.64-.2-.653-.64.136-.948l11.527-4.445c.533-.194 1.002.13.37.075z" /></svg>
                </div>
                {/* YouTube */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF0000" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>
                </div>
                {/* +5 badge */}
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10">
                  <span className="text-[11px] font-semibold text-white">+5</span>
                </div>
              </div>

              {/* Bottom — title */}
              <p className="mt-10 text-[14px] font-medium text-white leading-[1.4]" style={{ fontFamily: "var(--font-body)" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. TAILORED WORKFLOWS — Dark card
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-20 px-[60px]">
        <div className="flex items-center gap-16">

          {/* Left — Text */}
          <div className="w-[40%] shrink-0">
            <h2 className="font-heading text-[64px] font-bold uppercase leading-[1.0]" style={{ background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Tailored<br />Workflows
            </h2>
            <h3 className="mt-8 font-heading text-[22px] font-semibold leading-[1.3] text-[#063746]">
              Custom Automation,<br />Designed For Your Business
            </h3>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
              When every process demands its own logic, our team designs AI workflows that align with your systems and goals. From creative operations to enterprise data flows, every integration is built to enhance efficiency and understanding.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/start-project" className="rounded-full bg-[#063746] px-6 py-3 font-heading text-[14px] font-medium text-white transition hover:bg-[#063746]/80">
                Request Custom Workflow
              </Link>
              <Link href="/lets-connect" className="rounded-full border border-[#063746]/30 px-6 py-3 font-heading text-[14px] font-medium text-[#063746] transition hover:bg-[#063746]/5">
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Right — Dark image card */}
          <div className="flex-1 overflow-hidden rounded-[24px]">
            <HlsPlayer
              src="2f9a15572f298dc4e8a6b480d57abdad"
              autoPlay={true}
              controls={false}
              muted={true}
              loop={true}
              fillHeight={true}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. LET'S BUILD INTELLIGENT SYSTEMS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px] text-center">
          <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#126478]">
            Let&apos;s Build Intelligent Systems Together.
          </h2>
          <p className="mx-auto mt-4  text-[14px] leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
            Whether you start from our 50+ templates or request a custom setup, your automation journey begins here.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="#" className="rounded-full border border-[#063746]/20 px-6 py-2.5 font-heading text-[14px] font-medium bg-[#0E4252] text-white transition">
              Browse Templates
            </Link>
            <Link href="/start-project" className="rounded-full border border-[#063746] px-6 py-2.5 font-heading text-[14px] font-medium text-[#063746] transition ">
              Request Setup Help
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. OUR 4D METHOD
          ════════════════════════════════════════════════════════ */}
      <FourDMethodSection />

      {/* ════════════════════════════════════════════════════════
          7. BUILT ON TOP OF
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-16">
        <div className="px-[60px]">
          <p className="font-heading text-[28px] font-semibold text-[#063746] mb-8">Built on top of:</p>
          <div className="grid grid-cols-5">
            {[
              { name: "zapier", color: "#FF4A00", render: () => <span style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "28px", color: "#FF4A00" }}>&#10033; zapier</span> },
              { name: "salesforce", color: "#00A1E0", render: () => <img src="/images/partners/salesforce.svg" alt="Salesforce" className="h-12 object-contain" /> },
              { name: "HubSpot", color: "#FF7A59", render: () => <span style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "28px", color: "#333" }}>Hub<span style={{ color: "#FF7A59" }}>Sp&#9900;t</span></span> },
              { name: "n8n", color: "#EA4B71", render: () => <span style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "28px", color: "#EA4B71" }}>&#9900;&#9900;&#9900; n8n</span> },
              { name: "Claude", color: "#D4A574", render: () => <span style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: "28px", color: "#333" }}>&#10033; Claude</span> },
            ].map((tool) => (
              <div key={tool.name} className="flex h-[120px] items-center justify-center border border-[#063746]/10">
                {tool.render()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. FAQ
          ════════════════════════════════════════════════════════ */}
      <FaqSection leftQuestions={allFaqLeft} rightQuestions={allFaqRight} />

      {/* ════════════════════════════════════════════════════════
          9. LET'S BUILD + Contact Form
          ════════════════════════════════════════════════════════ */}
      <ContactFormSection />
    </>
  );
}
