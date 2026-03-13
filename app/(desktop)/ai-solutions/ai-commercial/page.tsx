"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";

/* ─── Data ─── */

const heroPartners = ["VG", "brother", "Vestine", "OPTIMUM", "ColaSel", "Colorful"];

const meaningItems = [
  {
    title: "AI-driven storyboarding and pre-production",
    image: "/images/ai-commercial/frame-01.png",
  },
  {
    title: "Real-time generation of scenes and assets",
    image: "/images/ai-commercial/frame-02.png",
  },
  {
    title: "Cinematic output without the studio overhead",
    image: "/images/ai-commercial/frame-03.png",
  },
];

const methodSteps = [
  {
    num: "01",
    title: "Define",
    icon: "/images/ai-commercial/icon-01.svg",
    rotate: "-8deg",
  },
  {
    num: "02",
    title: "Design",
    icon: "/images/ai-commercial/icon-02.svg",
    rotate: "-3deg",
  },
  {
    num: "03",
    title: "Develop",
    icon: "/images/ai-commercial/icon-03.svg",
    rotate: "3deg",
  },
  {
    num: "04",
    title: "Deliver",
    icon: "/images/ai-commercial/icon-04.svg",
    rotate: "8deg",
  },
];

const useCaseCards = [
  { title: "Vesta Global", image: "/images/ai-commercial/frame-04.png" },
  { title: "Bizim Mutfak", image: "/images/ai-commercial/frame-05.png" },
  { title: "Realkom", image: "/images/ai-commercial/frame-06.png" },
  { title: "Brother", image: "/images/ai-commercial/frame-01.png" },
];

const toolIcons = [
  "/images/ai-commercial/layer-icon-01.png",
  "/images/ai-commercial/layer-icon-02.png",
  "/images/ai-commercial/layer-icon-03.png",
  "/images/ai-commercial/layer-icon-04.png",
];

const faqLeft = [
  "How does AI commercial production work?",
  "What quality level can I expect?",
  "Can you match our brand guidelines?",
];

const faqRight = [
  "How long does production take?",
  "Is AI-generated content legal to use?",
  "How many revisions are included?",
];

export default function AICommercialPage() {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);

  useEffect(() => {
    cmsApi
      .faqs("ai-commercial")
      .then((res) => {
        if (res.data?.length) {
          const mid = Math.ceil(res.data.length / 2);
          setCmsFaqLeft(res.data.slice(0, mid).map((f: Faq) => f.question));
          setCmsFaqRight(res.data.slice(mid).map((f: Faq) => f.question));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "AI COMMERCIAL PRO..."
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pb-16 pt-40">
        {/* Hero image — right side */}
        <div className="absolute right-0 top-0 h-full w-[55%]">
          <Image
            src="/images/ai-commercial/hero-slider.png"
            alt="AI Commercial showcase"
            fill
            className="object-cover object-left"
            sizes="55vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/60 to-transparent" />
        </div>

        {/* Marquee heading */}
        <div className="relative z-10 whitespace-nowrap overflow-hidden px-[60px]">
          <h1
            className="inline-block font-heading font-normal uppercase text-white"
            style={{ fontSize: "clamp(64px, 8vw, 130px)", lineHeight: "1" }}
          >
            AI COMMERCIAL PRO
            <span className="text-white/20">DUCTION</span>
          </h1>
        </div>

        {/* Subtitle + CTAs */}
        <div className="relative z-10 mt-10 px-[60px]">
          <h2 className="max-w-lg font-heading text-[28px] font-medium leading-[1.2] text-white">
            A New Kind of Film.
            <br />
            Commercial Production.
          </h2>
          <p
            className="mt-4 max-w-lg text-[14px] leading-[1.6] text-white/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Produce cinematic video, photography, and motion graphics powered by
            AI — faster turnarounds, lower costs, unlimited creative iterations.
          </p>

          {/* Down arrow + CTA */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white/20">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <Link
              href="#discover"
              className="font-heading text-[14px] font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-[#1CE3F4]"
            >
              Discover Our Creative Approach
            </Link>
          </div>

          {/* Carousel dots */}
          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        {/* [SCROLL] text */}
        <div className="absolute bottom-10 right-[60px] z-10 text-right">
          <p
            className="text-[11px] tracking-wider text-white/30"
            style={{ fontFamily: "var(--font-body)" }}
          >
            [SCROLL]
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. PARTNERS ROW
          ════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/10 bg-dark-bg py-8">
        <div className="flex items-center justify-center gap-14 px-[60px]">
          <span className="text-[13px] font-medium uppercase tracking-wider text-white/40">
            Partners
          </span>
          {heroPartners.map((name) => (
            <span
              key={name}
              className="font-heading text-[15px] font-medium text-white/50"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. WHAT AI COMMERCIAL PRODUCTION MEANS AT DDIP.AI
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#063746]">
                What AI Commercial
                <br />
                Production Means
                <br />
                At Ddip.ai
              </h2>
            </div>
            <div className="space-y-4">
              <p
                className="text-[15px] leading-[1.6] text-[#063746]/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                AI commercial production means creating broadcast-quality video
                and photography without traditional production overhead.
              </p>
              <p
                className="text-[15px] leading-[1.6] text-[#063746]/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                From storyboarding to final cut, we leverage generative AI to
                deliver cinematic results at a fraction of the time and cost.
              </p>
            </div>
          </div>

          {/* 3 showcase images */}
          <div className="mt-16 grid grid-cols-3 gap-6">
            {meaningItems.map((item) => (
              <div key={item.title}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="33vw"
                  />
                </div>
                <p
                  className="mt-4 text-[13px] text-[#063746]/50"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. OUR 4D METHOD
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Our 4D Method
          </h2>

          <div className="mx-auto mt-16 flex max-w-5xl items-end justify-between">
            {methodSteps.map((step) => (
              <div key={step.num} className="text-center">
                <div
                  className="mx-auto flex h-[160px] w-[200px] items-center justify-center rounded-[20px] border border-[#063746]/10 bg-white shadow-sm"
                  style={{ transform: `rotate(${step.rotate})` }}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={70}
                    height={70}
                    className="opacity-80"
                  />
                </div>
                <p className="mt-6 font-heading text-[16px] font-medium text-[#063746]">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. USE CASES — Cards grid
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Use Cases
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-[1.6] text-[#063746]/60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            From product launches to brand films, AI commercial production
            delivers cinematic results across every format.
          </p>

          <div className="mt-12 grid grid-cols-4 gap-6">
            {useCaseCards.map((card) => (
              <div key={card.title} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063746]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-heading text-[16px] font-medium text-white">
                      {card.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. OUR TOOL ECOSYSTEM
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[36px] font-medium leading-[1.1] text-[#1CE3F4]">
            Our Tool Ecosystem
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-[14px] leading-[1.6] text-[#063746]/60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            We use best-in-class AI tools for video generation, motion graphics,
            and post-production — orchestrated to deliver cinematic quality.
          </p>

          <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-8">
            {toolIcons.map((icon, i) => (
              <div
                key={i}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-[14px] border border-[#063746]/10 bg-white"
              >
                <Image
                  src={icon}
                  alt={`Tool ${i + 1}`}
                  width={30}
                  height={30}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. PARTNERS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[80px] font-medium uppercase leading-[1] text-[#063746]">
            Partners
          </h2>
          <div className="mt-12 flex items-center justify-start gap-16">
            {["Google", "Google Cloud", "AWS", "Microsoft", "Salesforce"].map(
              (name) => (
                <span
                  key={name}
                  className="text-[20px] font-medium text-[#063746]/40"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. FAQ — Dark rounded card
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="overflow-hidden rounded-[24px] bg-dark-bg px-16 py-20">
            <h2 className="font-heading text-[80px] font-medium leading-[1] text-white">
              <span className="text-[#1CE3F4]">F</span>AQ
            </h2>

            <div className="mt-12 grid grid-cols-2 gap-0">
              {/* Left column */}
              <div>
                {cmsFaqLeft.map((question, i) => (
                  <div key={i} className="border-b border-white/10">
                    <button
                      className="flex w-full items-center justify-between py-[28px] text-left"
                      onClick={() =>
                        setOpenFaqLeft(openFaqLeft === i ? null : i)
                      }
                    >
                      <span
                        className="pr-8 text-[16px] font-medium text-white"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {question}
                      </span>
                      <span className="shrink-0 text-[20px] text-white/50">
                        {openFaqLeft === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaqLeft === i && (
                      <div className="pb-5 pr-12">
                        <p
                          className="text-[14px] leading-[1.6] text-white/60"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Our team will provide detailed information about this
                          topic. Contact us to learn more.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div className="pl-[50px]">
                {cmsFaqRight.map((question, i) => (
                  <div key={i} className="border-b border-white/10">
                    <button
                      className="flex w-full items-center justify-between py-[28px] text-left"
                      onClick={() =>
                        setOpenFaqRight(openFaqRight === i ? null : i)
                      }
                    >
                      <span
                        className="pr-8 text-[16px] font-medium text-white"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {question}
                      </span>
                      <span className="shrink-0 text-[20px] text-white/50">
                        {openFaqRight === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaqRight === i && (
                      <div className="pb-5 pr-12">
                        <p
                          className="text-[14px] leading-[1.6] text-white/60"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          Our team will provide detailed information about this
                          topic. Contact us to learn more.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Live FAQ card */}
            <div className="mt-12 overflow-hidden rounded-[20px]">
              <div className="relative h-[240px]">
                <Image
                  src="/images/ai-commercial/photo.png"
                  alt="Live FAQ"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-dark-bg/50" />
                <div className="relative z-10 flex h-full flex-col justify-center p-10">
                  <p className="font-heading text-[20px] text-white/60">
                    Live FAQ
                  </p>
                  <h3 className="mt-2 font-heading text-[36px] font-medium text-white">
                    Didn&apos;t find your answer?
                  </h3>
                  <Link
                    href="#"
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#1CE3F4] px-8 py-3 font-heading text-[15px] font-medium text-[#063746] transition-colors hover:bg-[#1CE3F4]/80"
                  >
                    Talk to our AI
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. CTA
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="flex items-center justify-between px-[60px]">
          <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-[#063746]">
            Let&apos;s design what&apos;s next together.
          </h2>
          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-8 py-4 font-heading text-[15px] font-medium text-[#063746] transition-colors hover:bg-[#1CE3F4]/80"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </>
  );
}
