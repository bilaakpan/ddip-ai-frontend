"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";
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

  useEffect(() => {
    cmsApi.faqs("process").then((res) => {
      if (res.data?.length) setCmsFaqs(res.data.map((f: Faq) => ({ question: f.question, answer: f.answer })));
    }).catch(() => {});
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-dark-bg py-32 lg:py-40">
        <Container>
          <div className="relative z-10 max-w-2xl">
            <p className="font-heading text-sm uppercase tracking-widest text-teal-500">
              How We Work
            </p>
            <h1 className="mt-4 font-heading text-[clamp(48px,7vw,120px)] font-medium uppercase leading-[1.05] text-white">
              OUR
              <br />
              PROCESS
            </h1>
            <p className="mt-8 max-w-2xl text-body-sm leading-[1.7] text-white/50">
              A structured, transparent approach to delivering AI-powered
              solutions. From discovery to deployment, every step is designed to
              maximize impact and minimize risk.
            </p>
            <div className="mt-10 flex items-center gap-6">
              <Link href="/start-project">
                <Button variant="primary" size="lg">
                  Start a Project
                </Button>
              </Link>
              <Link href="/lets-connect">
                <Button variant="secondary" size="lg">
                  Book a Call
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        {/* Hero image */}
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-hidden">
          <Image
            src="/images/process/hero.png"
            alt="Our process"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg to-transparent" />
        </div>
      </section>

      {/* ─── Process Steps ─── */}
      <section className="bg-light-bg py-24 lg:py-32">
        <Container>
          <p className="font-heading text-sm uppercase tracking-widest text-teal-700">
            Step by Step
          </p>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,64px)] font-medium uppercase leading-[1.1] text-light-text">
            Our 5-Step Process
          </h2>
          <p className="mt-6 max-w-2xl text-body-sm leading-[1.7] text-light-body">
            Every project follows a proven methodology that ensures clarity,
            quality, and measurable outcomes at every stage.
          </p>

          <div className="mt-20 space-y-24">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`flex items-center gap-16 ${
                  i % 2 === 1 ? "flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="w-1/2 overflow-hidden rounded-[var(--radius-card)]">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={720}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-1/2">
                  <span className="font-heading text-[80px] font-medium leading-none text-teal-500/15">
                    {step.step}
                  </span>
                  <h3 className="mt-2 font-heading text-[32px] font-medium leading-[1.2] text-light-text">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-body-sm leading-[1.7] text-light-body">
                    {step.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {step.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-3 text-sm text-light-body"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-500/10 text-teal-500">
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
        </Container>
      </section>

      {/* ─── How We Work ─── */}
      <section className="bg-dark-bg py-24 lg:py-32">
        <Container>
          <p className="font-heading text-sm uppercase tracking-widest text-teal-500">
            Our Approach
          </p>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,64px)] font-medium uppercase leading-[1.1] text-white">
            How We Work
          </h2>

          <div className="mt-16 grid grid-cols-2 gap-8">
            {howWeWork.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[var(--radius-card)] border border-border-dark bg-dark-surface"
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
                <div className="p-10">
                  <h3 className="font-heading text-2xl font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Partnership Overview ─── */}
      <section className="bg-light-bg py-24">
        <Container>
          <div className="flex items-center gap-16">
            <div className="w-1/2">
              <p className="font-heading text-sm uppercase tracking-widest text-teal-700">
                Partnership
              </p>
              <h2 className="mt-4 font-heading text-[clamp(36px,4vw,64px)] font-medium uppercase leading-[1.1] text-light-text">
                Your AI Partner,
                <br />
                Not Just a Vendor
              </h2>
              <p className="mt-6 text-body-sm leading-[1.7] text-light-body">
                We believe in long-term partnerships over one-off projects. When
                you work with DDip AI, you get a dedicated team that understands
                your business, anticipates your needs, and grows with you.
              </p>
              <div className="mt-10">
                <Link href="/start-project">
                  <Button variant="primary" size="lg">
                    Start a Partnership
                  </Button>
                </Link>
              </div>
            </div>
            <div className="w-1/2 overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/process/partnership-overview.png"
                alt="Partnership overview"
                width={720}
                height={480}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─── What We Deliver ─── */}
      <section className="bg-dark-bg py-24 lg:py-32">
        <Container>
          <p className="font-heading text-sm uppercase tracking-widest text-teal-500">
            Deliverables
          </p>
          <h2 className="mt-4 font-heading text-[clamp(36px,4vw,64px)] font-medium uppercase leading-[1.1] text-white">
            What We Deliver
          </h2>

          <div className="mt-16 grid grid-cols-4 gap-8">
            {whatWeDeliver.map((item) => (
              <div
                key={item.title}
                className="group overflow-hidden rounded-[var(--radius-card)] border border-border-dark bg-dark-surface transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-heading text-lg font-medium text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ─── FAQ ─── */}
      <section className="bg-light-bg py-24 lg:py-32">
        <Container>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-section font-medium uppercase text-light-text">
                FAQ
              </h2>
              <p className="mt-6 text-body-sm text-light-body">
                Common questions about working with DDip AI.
              </p>
              <div className="mt-10">
                <Link href="/lets-connect">
                  <Button variant="primary" size="md">
                    Have More Questions?
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-0">
              {cmsFaqs.map((item, i) => (
                <div key={i} className="border-b border-border-light">
                  <button
                    className="flex w-full items-center justify-between py-6 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="pr-8 font-heading text-lg font-medium text-light-text">
                      {item.question}
                    </span>
                    <svg
                      className={`h-5 w-5 shrink-0 text-light-text transition-transform duration-300 ${
                        openFaq === i ? "rotate-45" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="10" y1="4" x2="10" y2="16" />
                      <line x1="4" y1="10" x2="16" y2="10" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-sm leading-relaxed text-light-body">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-dark-bg py-24 lg:py-32">
        <Container className="text-center">
          <h2 className="font-heading text-[clamp(36px,5vw,80px)] font-medium uppercase text-white">
            Let&apos;s Build Together
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-body-sm text-white/50">
            Ready to start your AI journey? Our process is designed to get you
            from idea to impact as efficiently as possible.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link href="/start-project">
              <Button variant="primary" size="lg">
                Start a Project
              </Button>
            </Link>
            <Link href="/lets-connect">
              <Button variant="secondary" size="lg">
                Get in Touch
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
