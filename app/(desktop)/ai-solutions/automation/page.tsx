"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";

/* ─── Data ─── */

const heroPartners = ["VG", "brother", "Vestine", "OPTIMUM", "ColaSel"];

const accordionItems = [
  { title: "Content Automation", description: "Automate your content pipeline and manage custom flows — from social posts and email to blog, video, and visual generation at scale." },
  { title: "Analytics & Insights", description: "Real-time dashboards and AI-driven reporting that turn raw data into actionable business intelligence." },
  { title: "Conversational Systems", description: "Intelligent chatbots and virtual assistants that handle customer interactions with natural language understanding." },
  { title: "Lead Solutions", description: "Automated lead capture, scoring, and nurturing workflows that convert prospects into customers." },
];

const featuredAutomations = [
  { title: "Automated Video Creator", image: "/images/automation/content-automation.png", icon: "🎬" },
  { title: "Automated LinkedIn Posts", image: "/images/automation/content-automation.png", icon: "💼" },
  { title: "Trend Analyzer for Instagram", image: "/images/automation/content-automation.png", icon: "📊" },
  { title: "Trend Analyzer for YouTube", image: "/images/automation/content-automation.png", icon: "📈" },
  { title: "Lead Generation Bot", image: "/images/automation/content-automation.png", icon: "🤖" },
  { title: "Amazon Stock & Prize Tracker", image: "/images/automation/content-automation.png", icon: "📦" },
  { title: "Personal Assistant", image: "/images/automation/content-automation.png", icon: "🧠" },
  { title: "Meeting Assistant", image: "/images/automation/content-automation.png", icon: "📅" },
  { title: "Meta Ads Analyzer", image: "/images/automation/content-automation.png", icon: "📱" },
  { title: "WhatsApp Chatbot for Customer Support", image: "/images/automation/content-automation.png", icon: "💬" },
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
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
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
      .catch(() => {});
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
            src="/images/automation/hero-slider.png"
            alt="Automation showcase"
            fill
            className="object-cover object-left"
            sizes="55vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
        </div>

        <div className="relative z-10 whitespace-nowrap overflow-hidden px-[60px]">
          <h1
            className="inline-block font-heading font-normal uppercase text-white"
            style={{ fontSize: "clamp(64px, 8vw, 130px)", lineHeight: "1" }}
          >
            AUTOMATION WITH A
            <span className="text-white/20">I</span>
          </h1>
        </div>

        <div className="relative z-10 mt-8 px-[60px]">
          <h2 className="max-w-lg font-heading text-[24px] font-medium leading-[1.3] text-white">
            Automation Designed for Intelligence and Impact
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            Each custom is designed to automate, learn, and optimize — giving your team more time to think, create, and lead.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link href="/start-project" className="font-heading text-[14px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              Request a Custom Solution →
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white/20">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <Link href="#discover" className="font-heading text-[14px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              View Workflow Templates
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="absolute bottom-10 right-[60px] z-10">
          <p className="text-[11px] tracking-wider text-white/30" style={{ fontFamily: "var(--font-body)" }}>[SCROLL]</p>
        </div>
      </section>

      {/* Partners Row */}
      <section className="border-b border-white/10 bg-dark-bg py-8">
        <div className="flex items-center justify-center gap-14 px-[60px]">
          <span className="text-[13px] font-medium uppercase tracking-wider text-white/40">Partners</span>
          {heroPartners.map((name) => (
            <span key={name} className="font-heading text-[15px] font-medium text-white/50">{name}</span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. AUTOMATION MADE SIMPLE — Accordion
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-[40px] font-medium uppercase leading-[1.1] text-[#063746]">
                Automation Made
                <br />
                Simple, Scalable,
                <br />
                And Smart
              </h2>
            </div>
            <div>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                A library of intelligent, pre-built workflows to automate what matters most. From content scheduling to customer engagement, each template is designed to connect, perform, and evolve with your business.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="mt-16 space-y-0">
            {accordionItems.map((item, i) => (
              <div key={item.title} className="border-b border-[#063746]/10">
                <button
                  className="flex w-full items-center justify-between py-5 text-left"
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                >
                  <span className="font-heading text-[18px] font-medium text-[#063746]">{item.title}</span>
                  <svg className={`h-4 w-4 text-[#063746]/40 transition-transform ${openAccordion === i ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {openAccordion === i && (
                  <div className="pb-5">
                    <p className="max-w-xl text-[14px] leading-[1.6] text-[#063746]/50" style={{ fontFamily: "var(--font-body)" }}>
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. FEATURED AUTOMATIONS — Grid of cards
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[36px] font-medium leading-[1.1] text-[#063746]">
            Featured Automations,
            <br />
            Designed for Impact
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
            Choose a template that fits your goals. From content generation to data analysis, automation starts here.
          </p>

          <div className="mt-12 grid grid-cols-5 gap-5">
            {featuredAutomations.map((item) => (
              <div key={item.title} className="group rounded-[16px] border border-[#063746]/10 bg-white p-5 transition-all hover:shadow-md hover:border-[#1CE3F4]/30">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-[#063746]/5 text-[28px]">
                  {item.icon}
                </div>
                <p className="mt-4 font-heading text-[14px] font-medium leading-[1.3] text-[#063746]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. TAILORED WORKFLOWS — Dark card
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="overflow-hidden rounded-[24px] bg-dark-bg px-16 py-20">
            <h2 className="font-heading text-[48px] font-medium uppercase leading-[1.05] text-white">
              Tailored
              <br />
              Workflows
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-16">
              <div>
                <h3 className="font-heading text-[20px] font-medium text-white">
                  Custom Automation,
                  <br />
                  Designed For Your Business
                </h3>
                <p className="mt-4 text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                  When every process demands its own logic, our team designs AI workflows that align with your systems and scale with your ambitions. From CRM to content, every integration is built to enhance efficiency and understanding.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Link href="/start-project" className="rounded-full border border-white/20 px-6 py-2.5 font-heading text-[14px] font-medium text-white transition hover:bg-white/5">
                    Request Custom Workflow
                  </Link>
                  <Link href="/lets-connect" className="font-heading text-[14px] font-medium text-white/60 transition hover:text-white">
                    Book Consultation
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Image src="/images/automation/content-automation.png" alt="Tailored Workflows" fill className="object-contain" sizes="40vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. LET'S BUILD INTELLIGENT SYSTEMS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px] text-center">
          <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#063746]">
            Let&apos;s Build Intelligent Systems Together.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
            Whether you start from our 50+ templates or request a custom setup, your automation journey begins here.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="#" className="rounded-full border border-[#063746]/20 px-6 py-2.5 font-heading text-[14px] font-medium text-[#063746] transition hover:bg-[#063746]/5">
              Browse Templates
            </Link>
            <Link href="/start-project" className="rounded-full bg-[#1CE3F4] px-6 py-2.5 font-heading text-[14px] font-medium text-[#063746] transition hover:bg-[#1CE3F4]/80">
              Request Setup Help
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. OUR 4D METHOD
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Our 4D Method
          </h2>
          <div className="mx-auto mt-16 flex max-w-5xl items-end justify-between">
            {methodSteps.map((step) => (
              <div key={step.title} className="text-center">
                <div
                  className="mx-auto flex h-[160px] w-[200px] items-center justify-center rounded-[20px] border border-[#063746]/10 bg-white shadow-sm"
                  style={{ transform: `rotate(${step.rotate})` }}
                >
                  <Image src={step.icon} alt={step.title} width={70} height={70} className="opacity-80" />
                </div>
                <p className="mt-6 font-heading text-[16px] font-medium text-[#063746]">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. BUILT ON TOP OF
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <p className="text-[14px] text-[#063746]/50" style={{ fontFamily: "var(--font-body)" }}>Built on top of:</p>
          <div className="mt-8 flex items-center gap-12">
            {builtOnTools.map((tool) => (
              <span key={tool} className="font-heading text-[24px] font-medium text-[#063746]/30">{tool}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="overflow-hidden rounded-[24px] bg-dark-bg px-16 py-20">
            <h2 className="font-heading text-[80px] font-medium leading-[1] text-white">
              <span className="text-[#1CE3F4]">F</span>AQ
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-0">
              <div>
                {allFaqLeft.map((question, i) => (
                  <div key={i} className="border-b border-white/10">
                    <button className="flex w-full items-center justify-between py-[28px] text-left" onClick={() => setOpenFaqLeft(openFaqLeft === i ? null : i)}>
                      <span className="pr-8 text-[16px] font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>{question}</span>
                      <span className="shrink-0 text-[20px] text-white/50">{openFaqLeft === i ? "−" : "+"}</span>
                    </button>
                    {openFaqLeft === i && (
                      <div className="pb-5 pr-12">
                        <p className="text-[14px] leading-[1.6] text-white/60" style={{ fontFamily: "var(--font-body)" }}>Our team will provide detailed information about this topic. Contact us to learn more.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="pl-[50px]">
                {allFaqRight.map((question, i) => (
                  <div key={i} className="border-b border-white/10">
                    <button className="flex w-full items-center justify-between py-[28px] text-left" onClick={() => setOpenFaqRight(openFaqRight === i ? null : i)}>
                      <span className="pr-8 text-[16px] font-medium text-white" style={{ fontFamily: "var(--font-body)" }}>{question}</span>
                      <span className="shrink-0 text-[20px] text-white/50">{openFaqRight === i ? "−" : "+"}</span>
                    </button>
                    {openFaqRight === i && (
                      <div className="pb-5 pr-12">
                        <p className="text-[14px] leading-[1.6] text-white/60" style={{ fontFamily: "var(--font-body)" }}>Our team will provide detailed information about this topic. Contact us to learn more.</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live FAQ */}
            <div className="mt-12 overflow-hidden rounded-[20px]">
              <div className="relative h-[240px]">
                <Image src="/images/automation/content-automation.png" alt="Live FAQ" fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-dark-bg/60" />
                <div className="relative z-10 flex h-full flex-col justify-center p-10">
                  <p className="font-heading text-[20px] text-white/60">Live FAQ</p>
                  <h3 className="mt-2 font-heading text-[36px] font-medium text-white">Didn&apos;t find your answer?</h3>
                  <Link href="#" className="mt-5 inline-flex w-fit rounded-full bg-[#1CE3F4] px-8 py-3 font-heading text-[15px] font-medium text-[#063746] hover:bg-[#1CE3F4]/80">
                    Talk to our AI
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. LET'S BUILD + Contact Form
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-[#063746]">
                Let&apos;s Build
                <br />
                What&apos;s Next,
                <br />
                Together.
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                Whether you&apos;re exploring AI solutions or ready to start a custom project, our team is here to help build systems that move your business forward.
              </p>
            </div>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="Full Name *" className="rounded-[12px] border border-[#063746]/10 bg-white px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#063746]/30 focus:border-[#1CE3F4] focus:outline-none" />
                <input type="email" placeholder="Email Address *" className="rounded-[12px] border border-[#063746]/10 bg-white px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#063746]/30 focus:border-[#1CE3F4] focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <input type="text" placeholder="Company Name" className="rounded-[12px] border border-[#063746]/10 bg-white px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#063746]/30 focus:border-[#1CE3F4] focus:outline-none" />
                <input type="text" placeholder="Industry" className="rounded-[12px] border border-[#063746]/10 bg-white px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#063746]/30 focus:border-[#1CE3F4] focus:outline-none" />
              </div>
              <textarea placeholder="Details regarding your question, if any." rows={4} className="w-full rounded-[12px] border border-[#063746]/10 bg-white px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#063746]/30 focus:border-[#1CE3F4] focus:outline-none" />
              <button className="rounded-full bg-[#1CE3F4] px-8 py-3 font-heading text-[15px] font-medium text-[#063746] transition hover:bg-[#1CE3F4]/80">
                Send
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
