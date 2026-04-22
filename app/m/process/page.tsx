"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";

const scrollAnimation = `
  @keyframes scroll-horizontal {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

/* ─── Data ─── */
const whatWeDeliver = [
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cbfc29b0-c4d8-4248-ee33-949eb1283a00/public", title: "Clarity before complexity", desc: "We define the right solution before building anything." },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a606ee0f-1568-4baf-6dc7-f214cf946c00/public", title: "Customization over templates", desc: "No generic AI setups. Every system is designed around the brand." },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5269947f-a9b0-4e28-22d9-215b65493e00/public", title: "Human-led intelligence", desc: "AI accelerates — people decide." },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/05a98c25-687f-4aad-2baa-cc667314d000/public", title: "Scalability with control", desc: "Systems that grow without losing consistency or quality." },
];

const partnershipCards = [
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/840870cf-3f8a-4ffa-ecf5-42c951983400/public", label: "Launching an", bold: "AI influencer or brand ambassador" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/21580366-d582-4166-54c0-ca19cf5c5c00/public", label: "Building an", bold: "AI-driven content engine" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/efad73dc-dbb1-48df-a783-3f83ff054a00/public", label: "Designing", bold: "automated workflows with AI agents" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/9bbc75a1-f667-4be4-0c98-f21a6c069000/public", label: "Creating a long-term", bold: "AI brand ecosystem" },
  { image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/60f0e23b-ae4e-4186-cf0c-47b08d778700/public", label: "Producing", bold: "AI ad films or campaigns" },
];

const insightSteps = [
  { title: "Understand", subtitle: "Brand. Business. Challenge.", description: "We Start By Listening - Not Generating.", listHeading: "We analyze:", bullets: ["Brand DNA & tone of voice", "Business goals & growth challenges", "Target audience, market & culture", "Existing workflows, tools & bottlenecks"], closing: "AI doesn't start here. Humans do.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b17c4a07-5323-4e9a-e361-572649d78d00/public" },
  { title: "Define", subtitle: "Direction. Priorities. Outcomes.", description: "We align strategy before execution.", listHeading: "We define:", bullets: ["Clear AI use-cases mapped to impact", "Success metrics and project milestones", "System requirements and constraints", "Decision framework for rollout"], closing: "Clarity first. Then momentum.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d78abd82-66ff-4f78-62bf-79a567fa3000/public" },
  { title: "Design", subtitle: "Flows. Interfaces. Experiences.", description: "We design systems people can trust and use.", listHeading: "We design:", bullets: ["User journeys and interaction patterns", "Brand-aligned visual language", "Prompts, logic, and content structures", "Human review points and safeguards"], closing: "Great AI still needs great design.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b17c4a07-5323-4e9a-e361-572649d78d00/public" },
  { title: "Train", subtitle: "Data. Prompts. Performance.", description: "We tune intelligence to your specific context.", listHeading: "We train:", bullets: ["Models against brand and domain context", "Prompt systems for consistency", "Output quality and relevance checks", "Feedback loops for improvement"], closing: "Precision is built, not assumed.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d78abd82-66ff-4f78-62bf-79a567fa3000/public" },
  { title: "Create & Automate", subtitle: "Systems. Workflows. Execution.", description: "We turn strategy into working automation.", listHeading: "We build:", bullets: ["Content and campaign generation pipelines", "Agent-driven operational workflows", "Integrations with your existing stack", "Governance rules for quality control"], closing: "Automation should feel intentional.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b17c4a07-5323-4e9a-e361-572649d78d00/public" },
  { title: "Optimize", subtitle: "Measure. Learn. Improve.", description: "We continuously refine what works.", listHeading: "We optimize:", bullets: ["Performance across speed and quality", "Conversion and engagement outcomes", "Prompt and process efficiency", "Cross-channel consistency"], closing: "Iteration is where advantage compounds.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d78abd82-66ff-4f78-62bf-79a567fa3000/public" },
  { title: "Scale", subtitle: "Teams. Channels. Growth.", description: "We expand systems without losing control.", listHeading: "We scale:", bullets: ["Operations across teams and markets", "Reusable frameworks and templates", "Governance for brand safety", "Roadmaps for long-term evolution"], closing: "Scale with confidence, not chaos.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b17c4a07-5323-4e9a-e361-572649d78d00/public" },
];

const faqFallback = [
  { question: "How long does a typical project take?", answer: "A focused AI integration typically takes 4–6 weeks. Full-service engagements usually run 8–12 weeks. We provide a detailed timeline during the Discovery phase." },
  { question: "What is the minimum budget for a project?", answer: "Projects typically start at $5,000 for focused AI integrations and $15,000+ for comprehensive engagements. We're transparent about pricing from the first conversation." },
  { question: "Do you work with startups or only enterprise clients?", answer: "We work with businesses of all sizes — from ambitious startups to established enterprises. What matters most is alignment on goals and commitment to leveraging AI effectively." },
  { question: "What happens after the project launches?", answer: "We offer ongoing support and optimization packages. Most clients opt for a monthly retainer that includes monitoring, minor updates, and strategic consultations." },
  { question: "Can you work with our existing tech stack?", answer: "Absolutely. We're technology-agnostic and experienced with all major platforms, frameworks, and AI providers." },
];

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function MobileProcessPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState(faqFallback);

  useEffect(() => {
    cmsApi.faqs("process").then((res) => {
      if (res.data?.length)
        setCmsFaqs(res.data.map((f: Faq) => ({ question: f.question, answer: f.answer ?? "" })));
    }).catch(() => { });

    // Inject CSS animation
    const style = document.createElement('style');
    style.textContent = scrollAnimation;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const step = insightSteps[activeStep];

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative bg-[#05191B]">
        {/* Marquee */}
        <div className="relative z-10 overflow-hidden pt-10">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} aria-hidden={i > 0} className="shrink-0 pr-10 font-heading text-[80px] uppercase leading-none text-white">
                OUR PROCESS
              </span>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex flex-col justify-end pb-2 pt-2" style={safePx}>
          <h1 className="font-heading text-[22px] leading-[1.05] text-white">
            How We Turn Intelligence Into Impact Not a workflow. A designed system.
          </h1>
          <p className="mt-3 text-[16px] text-white" style={{lineHeight:"normal"}}>
            At ddip.ai, every project follows a clear, intentional process — designed to transform brand challenges into intelligent, scalable systems.
          </p>
        </div>

        {/* Video  */}
        <div className="relative">
          <video autoPlay muted loop playsInline className="w-full object-cover" style={{ transform: "scaleX(-1)", height: "50svh" }}>
            <source src="/videos/ourprocessherovideo.mp4" type="video/mp4" />
          </video>
          {/* Top blend overlay — merges video with bg above */}
          <div
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: "120px",
              background: "linear-gradient(to bottom, #05191B 0%, transparent 100%)",
            }}
          />
          {/* Subtle blur strip at the seam */}
          <div
            className="absolute inset-x-0 top-0 z-10 pointer-events-none"
            style={{
              height: "60px",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            }}
          />
          <div className="flex flex-col gap-4 absolute bottom-8 left-5 z-10">
            <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-12 w-12" aria-label="Scroll down">
              <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
            </svg>
            <a
              href="#discover"
              className="text-white underline decoration-white underline-offset-8 transition-colors hover:decoration-teal-500 text-[18px]"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Discover Our Process
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. WE START WITH UNDERSTANDING
      ══════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg pb-10 pt-5" style={safePx}>
        <div className="overflow-hidden rounded-2xl relative">
          <img
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6f75a92d-2ea1-480c-fb72-7f9573c73400/public"
            alt="Understanding"
            className="w-full object-contain"
          />
          <div className="absolute top-[53%] left-[33%] -translate-x-1/2 -translate-y-1/2">
            <p className="text-[11px] text-[#226576]">technology</p>
          </div>
          <div className="absolute top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2">
            <p className="text-[11px] text-[#226576]">strategy</p>
          </div>
          <div className="absolute top-[53%] left-[68%] -translate-x-1/2 -translate-y-1/2">
            <p className="text-[11px] text-[#226576]">human insight</p>
          </div>
        </div>
        <p className="text-[20px] text-[#9C9C9C]">We don't start with tools.<br />We don't start with AI.</p>
        <h2 className="mt-5 font-heading text-[clamp(30px,8vw,48px)] font-bold uppercase leading-tight text-[#063746]">
          WE START WITH <br /><span className="text-[#00BCCF]">UNDERSTANDING.</span>
        </h2>
        <p className="mt-3 text-[19px] leading-none text-[#063746]">
          Because meaningful automation, effective AI, and scalable creativity can only happen when{" "}
          <span className="text-[#00BCCF]">strategy, human insight, and technology</span> move together.
        </p>
      </section>

      {/* ══════════════════════════════════════
          3. WHAT THIS PROCESS DELIVERS
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pb-10" style={safePx}>
        <h2 className="font-heading text-[32px] font-medium leading-snug text-[#063746]">
          What This Process Delivers
        </h2>
        <div
          className="mt-5 flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {whatWeDeliver.map((item, i) => (
            <div key={i} className="flex flex-col shrink-0" style={{ width: "290px", height: "540px" }}>
              <div className="overflow-hidden rounded-xl bg-[#f0f2ef]" style={{ width: "290px", height: "395px", flexShrink: 0 }}>
                <img src={item.image} alt={item.title} className="h-full w-full object-contain p-3" />
              </div>
              <h3 className="mt-2 font-heading text-[24px] font-medium leading-snug text-[#063746]">{item.title}</h3>
              <p className="mt-1 text-[18px] leading-relaxed text-[#063746]/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. FROM FIRST CONTACT TO PARTNERSHIP
      ══════════════════════════════════════ */}
      <section className="bg-dark-bg py-10" style={safePx}>
        <div className="overflow-hidden rounded-2xl">
          <img
            src="/images/common/processfirstcontactmainimage.png"
            alt="Partnership"
            className="w-full object-contain"
          />
        </div>
        <div className="pt-[15px]">
          <div>
            <h2 className="font-heading text-[30px] font-medium  text-white">
              From First Contact to Long-Term Partnership
            </h2>
            <p className="mt-2 text-[18px] text-white/70">This process applies whether you are:</p>
            <div className="mt-4 flex flex-col gap-2.5">
              {partnershipCards.map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
                  <div className="h-[65px] w-[65px] shrink-0 overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.bold} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[12px] text-white">{item.label}</p>
                    <p className="text-[12px] font-medium text-white leading-snug">{item.bold}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[20px] text-white">
              Each project may look different — but the thinking behind it stays the same.            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. HOW WE WORK
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <div className="px-5 flex items-center flex-col">
          <p className="font-heading text-[32px] font-bold text-[#126478] font-sans">How We Work</p>
          <p className="mt-2 text-[16px] leading-relaxed text-[#063746] text-center ">
            Below is the core framework that guides every ddip.ai engagement. It shows how insight becomes structure, and how structure becomes impact.
          </p>
        </div>
        <div className="mt-5 flex flex-col items-center ">
          <div className="flex flex-col items-center">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/514497a1-8216-4d8b-d6b1-9130cfa5e300/public" alt="Human intelligence leads." className="h-40 w-40 object-contain" />
            <p className="mt-2 font-heading text-[18px] font-medium text-[#063746]">Human intelligence leads.</p>
          </div>

          <svg width="32" height="60" viewBox="0 0 24 40" fill="none" className="text-[#039EB7] my-4">
            <path
              d="M12 4L12 36M12 36L8 32M12 36L16 32"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex flex-col items-center">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/47784523-ee38-424b-9c91-c420806c0900/public" alt="AI systems follow." className="h-40 w-40 object-contain" />
            <p className="mt-2 font-heading text-[18px] font-medium text-[#063746]">AI systems follow.</p>
          </div>

          <svg width="32" height="60" viewBox="0 0 24 40" fill="none" className="text-[#039EB7] my-4">
            <path
              d="M12 4L12 36M12 36L8 32M12 36L16 32"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex flex-col items-center">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1c99f5c0-02dc-42d2-fd18-fbeece3bde00/public" alt="Results scale." className="h-40 w-40 object-contain" />
            <p className="mt-2 font-heading text-[18px] font-medium text-[#063746]">Results scale.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. FROM INSIGHT TO INTELLIGENT IMPACT
      ══════════════════════════════════════ */}
      <section className="pt-10 pb-0 -mb-[150px]">
        {/* Title */}
        <h2
          className="text-center font-bold px-6"
          style={{ fontFamily: "Bricolage Grotesque", color: "#126478", fontSize: "24px", lineHeight: "1.3" }}
        >
          From Insight To<br />Intelligent Impact
        </h2>

        {/* Image floating above card */}
        <div className="flex justify-center -mb-15 relative z-0">
          <img
            src={step.image}
            alt="Process insight visual"
            className="w-112.5 h-87.5 object-contain transition-all duration-500"
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-[#E6F8FD33] p-5 backdrop-blur-md shadow-md relative z-10 max-w-120 bottom-[180px]">
          <div className="flex items-start gap-4 flex-col ml-10">
            <span className="text-[60px] text-[#002834] leading-none font-[var(--font-body)]">
              {String(activeStep + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[30px] font-bold text-[#002834] leading-tight">
                {step.title}
              </h3>
              <p
                className="text-[18px] font-bold text-[#002834]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {step.subtitle}
              </p>
              <p className="text-[16px] text-[#002834] mt-1">
                {step.description}
              </p>
            </div>
          </div>

          <div className="mt-4 text-[14px] text-[#002834] ml-10">
            <p>{step.listHeading}</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              {step.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-lg text-[#002834] ml-17.5">
            {step.closing}
          </p>
        </div>

        {/* Next step navigation */}
        <div className="flex justify-end px-3 relative bottom-[150px] mb-10">
          {activeStep < insightSteps.length - 1 ? (
            <button
              onClick={() => setActiveStep(activeStep + 1)}
              className="flex items-center gap-2 text-[#126478] font-medium text-[24px]"
            >
              <span>{String(activeStep + 2).padStart(2, "0")}</span>
              <span className="uppercase tracking-widest text-[20px]">
                {insightSteps[activeStep + 1].title}
              </span>
              <span className="text-[24px] leading-none">&rarr;</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveStep(0)}
              className="flex items-center gap-2 text-[#126478] font-medium text-[24px]"
            >
              <span>01</span>
              <span className="uppercase tracking-widest text-[24px]">
                {insightSteps[0].title}
              </span>
              <span className="text-[24px] leading-none">-</span>
            </button>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════
          7. CTA
      ══════════════════════════════════════ */}
      <section
        className="bg-light-bg"
        style={{
          paddingLeft: "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingBottom: "max(64px, calc(16px + env(safe-area-inset-bottom)))",
        }}
      >
        <div className="rounded-[20px] p-6 text-center" style={{ background: "linear-gradient(-90deg,var(--color-dark-bg) 0%,#129CAC 100%)" }}>
          <p className="font-heading text-[clamp(16px,4.5vw,20px)] font-bold text-[#EBFFFF]">
            Ready to start your process?
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[#EBFFFF]/70">
            Let&apos;s align creativity, AI and strategy into one unstoppable system.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <Link href="/m/start-project" className="inline-flex items-center justify-center rounded-full bg-[#1CE3F4] px-6 py-3 text-[18px] font-medium text-dark-bg active:opacity-80">
              Start a Project
            </Link>
            <Link href="/m/lets-connect" className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-[18px] font-medium text-white active:opacity-80">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
