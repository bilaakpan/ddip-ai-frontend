"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
import { cmsApi, type Faq } from "@/lib/api";
import FaqSection from "@/components/desktop/FaqSection";

/* ── Data ─────────────────────────────────────────────── */

const processSteps = [
  {
    step: "01",
    image: "/images/process/step-01.png",
    title: "Discovery & Strategy",
    description:
      "We start by understanding your business, goals, audience, and competitive landscape. Through workshops and research, we define the AI strategy that will drive real results.",
    deliverables: [
      "Brand audit & competitive analysis",
      "AI opportunity mapping",
      "Strategic roadmap document",
    ],
  },
  {
    step: "02",
    image: "/images/process/step-02.png",
    title: "Concept & Design",
    description:
      "Our creative team develops concepts, wireframes, and visual designs that align with your brand identity and strategic objectives. Every pixel is intentional.",
    deliverables: [
      "Wireframes & user flows",
      "Visual design mockups",
      "Content strategy & copywriting",
    ],
  },
  {
    step: "03",
    image: "/images/process/step-03.png",
    title: "AI Development & Integration",
    description:
      "We build and integrate AI-powered systems — from content generation pipelines to automation workflows — using cutting-edge models and battle-tested architectures.",
    deliverables: [
      "AI model configuration & training",
      "Workflow automation setup",
      "API integrations & data pipelines",
    ],
  },
  {
    step: "04",
    image: "/images/process/step-04.png",
    title: "Testing & Optimization",
    description:
      "Rigorous testing across all touchpoints. We optimize for performance, accuracy, and user experience — ensuring every AI system delivers consistent, reliable results.",
    deliverables: [
      "Quality assurance testing",
      "Performance optimization",
      "A/B testing & iteration",
    ],
  },
  {
    step: "05",
    image: "/images/process/step-05.png",
    title: "Launch & Ongoing Support",
    description:
      "We deploy your AI-powered systems and provide ongoing monitoring, maintenance, and optimization. Your dedicated team ensures everything runs smoothly post-launch.",
    deliverables: [
      "Production deployment",
      "Monitoring & analytics setup",
      "Ongoing support & iteration",
    ],
  },
];

const howWeWork = [
  {
    image: "/images/process/how-01.png",
    title: "Collaborative Partnership",
    description:
      "We work as an extension of your team — not a black-box vendor. Regular check-ins, transparent communication, and shared project boards keep everyone aligned.",
  },
  {
    image: "/images/process/how-02.png",
    title: "Agile & Iterative",
    description:
      "We ship in sprints, gather feedback fast, and iterate continuously. You see progress every week, not just at the end. This reduces risk and ensures we build exactly what you need.",
  },
];

const whatWeDeliver = [
  {
    image: "/images/process/delivers-01.png",
    title: "AI-Powered Websites",
    description:
      "High-performance, SEO-optimized websites with integrated AI features — from chatbots to dynamic content personalization.",
  },
  {
    image: "/images/process/delivers-02.png",
    title: "Automation Systems",
    description:
      "End-to-end workflow automation that eliminates repetitive tasks and scales your operations without scaling your team.",
  },
  {
    image: "/images/process/delivers-03.png",
    title: "AI Content & Creative",
    description:
      "Production-ready AI-generated content — videos, images, copy, and social media assets — at scale and on-brand.",
  },
  {
    image: "/images/process/delivers-04.png",
    title: "Data & Analytics Dashboards",
    description:
      "Custom dashboards that turn your data into actionable insights. AI-powered reporting that tells you what matters and what to do next.",
  },
];

const faqItems = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A focused AI integration project typically takes 4-6 weeks. Full-service engagements (strategy + design + development) usually run 8-12 weeks. We always provide a detailed timeline during the Discovery phase.",
  },
  {
    question: "What is the minimum budget for a project?",
    answer:
      "Our projects typically start at $5,000 for focused AI integrations and $15,000+ for comprehensive engagements. We're transparent about pricing from the first conversation — no surprises. We also offer flexible payment structures for larger projects.",
  },
  {
    question: "Do you work with startups or only enterprise clients?",
    answer:
      "We work with businesses of all sizes — from ambitious startups to established enterprises. What matters most is alignment on goals and commitment to leveraging AI effectively. We've helped early-stage companies build their first AI products and helped Fortune 500 companies transform their operations.",
  },
  {
    question: "What happens after the project launches?",
    answer:
      "We offer ongoing support and optimization packages. AI systems need continuous monitoring, model updates, and performance tuning. Most clients opt for a monthly retainer that includes monitoring, minor updates, and strategic consultations to keep their AI systems performing at peak.",
  },
  {
    question: "Can you work with our existing tech stack?",
    answer:
      "Absolutely. We're technology-agnostic and experienced with all major platforms, frameworks, and AI providers. Whether you're on AWS, GCP, or Azure, using React, Vue, or Next.js, or working with OpenAI, Anthropic, or open-source models — we integrate seamlessly with your existing infrastructure.",
  },
];

/* ── Component ────────────────────────────────────────── */

export default function ProcessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState(faqItems);
  const cmsFaqLeft = cmsFaqs.slice(0, Math.ceil(cmsFaqs.length / 2)).map(f => f.question);
  const cmsFaqRight = cmsFaqs.slice(Math.ceil(cmsFaqs.length / 2)).map(f => f.question);

  useEffect(() => {
    cmsApi.faqs("process").then((res) => {
      if (res.data?.length) setCmsFaqs(res.data.map((f: Faq) => ({ question: f.question, answer: f.answer })));
    }).catch(() => { });
  }, []);

  const insightSteps = [
    "Understand",
    "Define",
    "Design",
    "Train",
    "Create & Automate",
    "Optimize",
    "Scale",
  ];
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden py-32 lg:py-40">
        <Container>
          <div className="relative z-10 w-full">

            <div className="overflow-hidden whitespace-nowrap mt-[-50px]">
              <div className="flex animate-marquee">
                <h1 className="text-[140px] text-white whitespace-nowrap">
                  OUR PROCESS <span className="inline-block">
                    <img src="/images/homepage/nameStar.png" className="h-[70px]" />
                  </span>  OUR PROCESS <span className="inline-block">
                    <img src="/images/homepage/nameStar.png" className="h-[70px]" />
                  </span>
                </h1>
              </div>
            </div>
            <p className="w-[500px] text-[40px] text-body-sm leading-[1.7] text-white" style={{ lineHeight: "normal" }}>
              How We Turn Intelligence Into Impact Not a workflow. A designed system.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <p className="text-white text-[18px] w-[500px]">At ddip.ai, every project follows a clear, intentional process - designed to transform brand challenges into intelligent, scalable systems.</p>
            </div>
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
                  Discover Our Process
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* Hero video — full bg */}
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="h-full w-full object-cover" style={{ transform: "scaleX(-1)" }}>
            <source src="/videos/ourprocessherovideo.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* ─── We Start With Understanding ─── */}
      <section className="bg-light-bg py-20">
        <div className="px-[60px] flex items-center gap-16">

          {/* Left — image with overlaid text labels */}
          <div className="shrink-0 w-[60%] relative">
            <img src="/images/process/firstprocess11.png" alt="Understanding" className="w-full h-auto object-contain" />
            {/* strategy — top center */}
            <span className="absolute top-[18%] left-[50%] -translate-x-1/2 z-10 text-[16px] font-medium text-[#226576]" style={{ fontFamily: "Bricolage Grotesque" }}>strategy</span>
            {/* technology — bottom left */}
            <span className="absolute bottom-[40%] left-[27%] z-10 text-[16px] font-medium text-[#226576]" style={{ fontFamily: "Bricolage Grotesque" }}>technology</span>
            {/* human insight — bottom right */}
            <span className="absolute bottom-[40%] right-[25%] z-10 text-[16px] font-medium text-[#226576]" style={{ fontFamily: "Bricolage Grotesque" }}>human insight</span>
          </div>

          {/* Right — text */}
          <div className="flex-1">
            <p style={{ fontFamily: "Bricolage Grotesque", fontSize: "16px", color: "#9C9C9C" }}>
              We don't start with tools.<br />
              We don't start with AI.
            </p>
            <div className="mt-4 flex items-baseline flex-wrap">
              <span className="font-bold uppercase leading-[1.1]" style={{ fontFamily: "Bricolage Grotesque", fontSize: "40px", color: "#063746" }}>
                We start with
              </span>
              <span className="font-bold uppercase leading-[1.1]" style={{ fontFamily: "Bricolage Grotesque", fontSize: "40px", color: "#00BCCF" }}>
                understanding.
              </span>
            </div>
            <p className="mt-6 leading-[1.7]" style={{ fontFamily: "SF Pro Display", fontSize: "16px", color: "#063746", width: "400px" }}>
              Because meaningful automation, effective AI, and scalable creativity can only happen when <span style={{ color: "#00BCCF" }}>strategy, human insight, and technology</span> move together.
            </p>
          </div>

        </div>
      </section>

      {/* ─── What We Deliver ─── */}
      <section className="bg-light-bg py-20">
        <div className="px-[60px]">
          <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#063746]">
            What This<br />Process Delivers
          </h2>

          <div className="mt-12 grid grid-cols-4 gap-6">
            {[
              { image: "/images/process/delivers-01.png", title: "Clarity before complexity", desc: "We define the right solution before building anything." },
              { image: "/images/process/delivers-02.png", title: "Customization over templates", desc: "No generic AI setups. Every system is designed around the brand." },
              { image: "/images/process/delivers-03.png", title: "Human-led intelligence", desc: "AI accelerates — people decide." },
              { image: "/images/process/delivers-04.png", title: "Scalability with control", desc: "Systems that grow without losing consistency or quality." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                {/* Image card */}
                <div className="overflow-hidden rounded-[16px] bg-[#f0f2ef]" style={{ aspectRatio: "1/1" }}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain p-4" />
                </div>
                {/* Text below */}
                <h3 className="mt-4 font-heading text-[24px] w-[200px] font-medium leading-[1.3] text-[#063746]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[18px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ─── From First Contact to Long-Term Partnership ─── */}
      <section className="relative overflow-hidden rounded-[24px] mx-[60px] my-12 mb-20" style={{ minHeight: "480px" }}>
        {/* BG image */}
        <img src="/images/process/partnership-overview.png" alt="Partnership" className="absolute inset-0 w-full h-full object-cover" />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#063746]/60" />

        {/* Content */}
        <div className="relative z-10 p-12 flex flex-col h-full" style={{ minHeight: "480px" }}>
          <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-white max-w-md">
            From First Contact to<br />Long-Term Partnership
          </h2>

          <p className="mt-10 text-[14px] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            This process applies whether you are:
          </p>

          {/* Cards — 2x2 grid left + 1 tall card right */}
          <div className="mt-4 flex gap-3 w-[100%]">
            {/* Left — 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { image: "/images/process/step-01.png", label: "Launching an", bold: "AI influencer or brand ambassador" },
                { image: "/images/process/step-02.png", label: "Building an", bold: "AI-driven content engine" },
                { image: "/images/process/step-03.png", label: "Designing", bold: "automated workflows with AI agents" },
                { image: "/images/process/step-04.png", label: "Creating a long-term", bold: "AI brand ecosystem" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-[10px] p-3" style={{ width: "370px", height: "110px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}>
                  <div className="shrink-0 w-[60px] h-[60px] overflow-hidden rounded-[8px]">
                    <img src={item.image} alt={item.bold} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[11px] text-white/60" style={{ fontFamily: "var(--font-body)" }}>{item.label}</p>
                    <p className="text-[13px] font-medium text-white leading-[1.3]" style={{ fontFamily: "var(--font-body)" }}>{item.bold}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — 1 tall card */}
            <div className="flex rounded-[10px] overflow-hidden" style={{ width: "370px", height: "240px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}>
              {/* Image — left half */}
              <div className="w-[55%] h-full overflow-hidden rounded-[8px]">
                <img src="/images/process/step-05.png" alt="AI ad films" className="w-full h-full object-cover" />
              </div>
              {/* Text — right half */}
              <div className="flex-1 flex flex-col justify-center px-4">
                <p className="text-[12px] text-white/60" style={{ fontFamily: "var(--font-body)" }}>Producing</p>
                <p className="mt-1 text-[16px] font-medium text-white leading-[1.3]" style={{ fontFamily: "var(--font-body)" }}>AI ad films or campaigns</p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-[13px] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            Each project may look different — but the <strong className="text-white">thinking behind it stays the same.</strong>
          </p>
        </div>
      </section>

      {/* ─── How We Work ─── */}
      <section className="bg-light-bg py-20">
        <div className="px-[60px]">

          {/* Heading center */}
          <div className="text-center mb-12">
            <h2 className="font-bold" style={{ fontFamily: "SF Pro Display", fontSize: "40px", color: "#126478" }}>
              How We Work
            </h2>
            <p className="mt-3 mx-auto max-w-xl" style={{ fontFamily: "Arial", fontSize: "17px", color: "#063746" }}>
              Below is the core framework that guides every ddip.ai engagement.<br />
              It shows how insight becomes structure, and how structure becomes impact.
            </p>
          </div>

          {/* 3 images with arrows */}
          <div className="flex items-center justify-center gap-0">
            {[
              { image: "/images/process/how-01.png", label: "Human intelligence leads." },
              { image: "/images/process/how-02.png", label: "AI systems follow." },
              { image: "/images/process/how-03.png", label: "Results scale." },
            ].map((item, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <img src={item.image} alt={item.label} style={{ width: "200px", height: "200px", objectFit: "contain" }} />
                  <p className="mt-4 text-center max-w-[190px] text-left" style={{ fontFamily: "Bricolage Grotesque", fontSize: "20px", color: "#063746" }}>
                    {item.label}
                  </p>
                </div>
                {i < 2 && (
                  <div className="flex items-center pb-12 px-2">
                    <svg width="240" height="16" viewBox="0 0 240 16" fill="none">
                      <line x1="0" y1="8" x2="228" y2="8" stroke="#039EB7" strokeWidth="1.5" />
                      <path d="M228 3L238 8L228 13" stroke="#039EB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* From Insight to Intelligent Impact */}
      <section className="bg-light-bg py-16 lg:py-24">
       
        <Container>
           <h2 className="w-[300px] font-bold" style={{fontFamily:"Bricolage Grotesque",color:"#126478",fontSize:'30px'}}>From Insight to Intelligent Impact</h2>
          <div className="rounded-[24px]  bg-[#f5f8f3] px-6 py-8 lg:px-14 lg:py-12">

            <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
              {/* LEFT SIDE */}
              <div className="relative">
                {/* IMAGE */}
                <img
                  src="/images/process/insight-Group 641.png"
                  alt="Process insight visual"
                  className="absolute w-[55%] -top-12 left-16 sm:w-[60%] md:w-[55%] lg:w-[50%] object-contain"
                />
                {/* CARD */}
                <div className="absolute -bottom-6 left-[100px] t-[190px] w-full max-w-[480px] rounded-[16px] border border-[#dde2df] bg-[#E6F8FD33] p-5 backdrop-blur-md shadow-md">

                  <div className="flex items-start gap-4">

                    <span className="text-[48px] font-semibold text-[#002834] leading-none">
                      01
                    </span>
                    <div>
                      <h3 className="text-[32px] font-semibold text-[#002834] leading-tight">
                        Understand
                      </h3>
                      <p className="text-[14px] font-bold text-[#002834]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        Brand. Business. Challenge.
                      </p>
                      <p className="text-[13px] text-[#002834] mt-1">
                        We Start By Listening - Not Generating.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 text-[13px] text-[#002834]">
                    <p>We analyze:</p>
                    <ul className="mt-2 list-disc pl-5 space-y-1">
                      <li>Brand DNA & tone of voice</li>
                      <li>Business goals & growth challenges</li>
                      <li>Target audience, market & culture</li>
                      <li>Existing workflows, tools & bottlenecks</li>
                    </ul>
                  </div>
                  <p className="mt-4 font-semibold text-[14px] text-[#002834]">
                    AI doesn’t start here. Humans do.
                  </p>
                </div>
              </div>
              {/* RIGHT SIDE */}
              <div className="hidden lg:block">
                <ul className="space-y-6">
                  {insightSteps.map((step, index) => (
                    <li key={step} className="flex items-center gap-4">

                      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#063746]/40 text-[#063746] text-lg">
                        {String(index + 1).padStart(2, "0")}
                        {index < insightSteps.length - 1 && (
                          <span className="absolute top-12 left-1/2 w-px h-6 -translate-x-1/2 bg-[#063746]/30" />
                        )}
                      </div>
                      <span className="text-[22px] font-medium text-[#063746]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── FAQ ─── */}
      <FaqSection leftQuestions={cmsFaqLeft} rightQuestions={cmsFaqRight} />

      {/* ─── CTA ─── */}
      <section className="bg-light-bg py-24">
        <div
          className="mx-[60px] flex items-center justify-between rounded-[20px] px-[25px] py-[60px]"
          style={{ background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)" }}
        >

          <h2 className="font-heading text-[20px] font-bold leading-[1.2] text-[#EBFFFF]">
            Ready to start your process?
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/start-project" className="rounded-full border border-[#063746]/20 px-6 py-2.5 font-heading text-[14px] font-medium text-[#063746] transition bg-[#1CE3F4]">
              Start a Project
            </Link>
            <Link href="/lets-connect" className="rounded-full border border-white px-6 py-2.5 font-heading text-[14px] font-medium text-white transition ">
              Talk to Our AI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
