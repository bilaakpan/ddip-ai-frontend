"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";

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

const faqItemsFallback = [
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
      "We work with businesses of all sizes — from ambitious startups to established enterprises. What matters most is alignment on goals and commitment to leveraging AI effectively.",
  },
  {
    question: "What happens after the project launches?",
    answer:
      "We offer ongoing support and optimization packages. AI systems need continuous monitoring, model updates, and performance tuning. Most clients opt for a monthly retainer that includes monitoring, minor updates, and strategic consultations.",
  },
  {
    question: "Can you work with our existing tech stack?",
    answer:
      "Absolutely. We're technology-agnostic and experienced with all major platforms, frameworks, and AI providers. Whether you're on AWS, GCP, or Azure, using React, Vue, or Next.js — we integrate seamlessly with your existing infrastructure.",
  },
];

/* ── Component ────────────────────────────────────────── */

export default function MobileProcessPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState(faqItemsFallback);

  useEffect(() => {
    cmsApi
      .faqs("process")
      .then((res) => {
        if (res.data?.length)
          setCmsFaqs(
            res.data.map((f: Faq) => ({
              question: f.question,
              answer: f.answer,
            }))
          );
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[60vh] overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/452077aa-059a-48c3-ed11-d3b4caa08a00/public"
            alt="Our process"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/40 to-dark-bg/60" />
        </div>
        <div className="relative z-10 flex min-h-[60vh] flex-col justify-end px-5 pb-10">
          <p className="font-heading text-[13px] uppercase tracking-widest text-[#1CE3F4]">
            How We Work
          </p>
          <h1 className="mt-2 font-heading text-[clamp(32px,9vw,48px)] font-bold uppercase leading-[1.05] text-white">
            OUR
            <br />
            PROCESS
          </h1>
          <p className="mt-3 max-w-[90%] text-[15px] leading-[1.5] text-white/70">
            A structured, transparent approach to delivering AI-powered
            solutions. From discovery to deployment, every step is designed to
            maximize impact and minimize risk.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
            >
              Start a Project
            </Link>
            <Link
              href="/lets-connect"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-medium text-white"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      {/* ─── We Start With Understanding ─── */}
      <section className="bg-light-bg px-5 py-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-teal-700">
          Step by Step
        </p>
        <h2 className="mt-2 font-heading text-[clamp(24px,6vw,32px)] font-medium leading-[1.15] text-light-text">
          Our 5-Step Process
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-light-body">
          Every project follows a proven methodology that ensures clarity,
          quality, and measurable outcomes at every stage.
        </p>
      </section>

      {/* ─── Process Steps ─── */}
      <section className="bg-light-bg px-5 pb-14">
        <div className="flex flex-col gap-8">
          {processSteps.map((step) => (
            <div key={step.step}>
              {/* Step Image */}
              <div className="overflow-hidden rounded-[14px]">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={720}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Step Content */}
              <div className="mt-5">
                <span className="font-heading text-[48px] font-medium leading-none text-teal-500/15">
                  {step.step}
                </span>
                <h3 className="mt-1 font-heading text-[20px] font-medium leading-[1.2] text-light-text">
                  {step.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-light-body">
                  {step.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {step.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-center gap-3 text-[13px] text-light-body"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-500">
                        <svg
                          className="h-3 w-3"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2.5 6l2.5 2.5 4.5-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How We Work ─── */}
      <section className="bg-dark-bg px-5 py-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-[#1CE3F4]">
          Our Approach
        </p>
        <h2 className="mt-2 font-heading text-[clamp(24px,6vw,32px)] font-medium leading-[1.15] text-white">
          How We Work
        </h2>

        <div className="mt-8 flex flex-col gap-6">
          {howWeWork.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0a2a36]"
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={720}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-[18px] font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.5] text-white/50">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Partnership ─── */}
      <section className="bg-light-bg px-5 py-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-teal-700">
          Partnership
        </p>
        <h2 className="mt-2 font-heading text-[clamp(24px,6vw,32px)] font-medium leading-[1.15] text-light-text">
          Your AI Partner, Not Just a Vendor
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-light-body">
          We believe in long-term partnerships over one-off projects. When you
          work with DDip AI, you get a dedicated team that understands your
          business, anticipates your needs, and grows with you.
        </p>
        <div className="mt-6 overflow-hidden rounded-[14px]">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/25844904-2b50-4f1d-92f7-52e43227df00/public"
            alt="Partnership overview"
            width={720}
            height={480}
            className="h-auto w-full object-cover"
          />
        </div>
        <Link
          href="/start-project"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
        >
          Start a Partnership
        </Link>
      </section>

      {/* ─── What We Deliver ─── */}
      <section className="bg-dark-bg px-5 py-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-[#1CE3F4]">
          Deliverables
        </p>
        <h2 className="mt-2 font-heading text-[clamp(24px,6vw,32px)] font-medium leading-[1.15] text-white">
          What We Deliver
        </h2>

        <div className="mt-8 flex flex-col gap-5">
          {whatWeDeliver.map((item) => (
            <div
              key={item.title}
              className="overflow-hidden rounded-[14px] border border-white/10 bg-[#0a2a36]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-heading text-[16px] font-medium text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.5] text-white/50">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-light-bg px-5 py-14">
        <div className="rounded-[20px] bg-[#002834] p-6">
          <h2 className="mb-6 font-heading text-[clamp(28px,7vw,40px)] font-medium uppercase text-[#EBFFFF]">
            FAQ
          </h2>
          <div className="flex flex-col">
            {cmsFaqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="pr-4 text-[14px] leading-[1.4] text-[#EBFFFF]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-[16px] text-white transition-transform duration-200 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-[300px] pb-4" : "max-h-0"
                  }`}
                >
                  <p className="text-[13px] leading-[1.5] text-[#90B2BD]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Live FAQ CTA */}
          <div className="mt-6 rounded-[14px] bg-[#063746] p-5 text-center">
            <p className="text-[14px] font-medium text-[#1CE3F4]">Live FAQ</p>
            <p className="mt-1 text-[18px] font-bold text-white">
              Didn&apos;t find your answer?
            </p>
            <Link
              href="/lets-connect"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-light-bg px-5 pb-16">
        <div
          className="rounded-[20px] p-6 text-center"
          style={{
            background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)",
          }}
        >
          <p className="font-heading text-[20px] font-bold text-[#EBFFFF]">
            Let&apos;s Build Together
          </p>
          <p className="mt-2 text-[13px] text-[#EBFFFF]/70">
            Ready to start your AI journey? Our process is designed to get you
            from idea to impact as efficiently as possible.
          </p>
          <div className="mt-5 flex flex-col items-center gap-3">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
            >
              Start a Project
            </Link>
            <Link
              href="/lets-connect"
              className="inline-flex items-center gap-2 text-[14px] text-white/70"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
