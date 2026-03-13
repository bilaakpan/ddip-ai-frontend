"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";

/* ─── Data ─── */

const influencerTypes = [
  {
    title: "AI Influencer",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "/images/ai-influencer/portrait-01.png",
  },
  {
    title: "Brand Ambassador",
    description:
      "A virtual brand representative that embodies your company's values and maintains a consistent presence across all touchpoints.",
    image: "/images/ai-influencer/portrait-02.png",
  },
  {
    title: "AI Blogger",
    description:
      "An AI-powered content creator that produces written and visual blog content, driving SEO and organic engagement.",
    image: "/images/ai-influencer/portrait-03.png",
  },
  {
    title: "AI Mascot",
    description:
      "A stylized character that represents your brand personality, designed for marketing campaigns and community engagement.",
    image: "/images/ai-influencer/portrait-04.png",
  },
];

const spectrumItems = [
  {
    title: "AI Brand Ambassador",
    description:
      "A virtual representative that communicates your brand identity with purpose and precision across every channel.",
  },
  {
    title: "AI Influencer",
    description:
      "A digital persona designed to engage, create, and influence — powered by AI, shaped by your strategy.",
  },
  {
    title: "AI Blogger",
    description:
      "An AI-driven writer that produces consistent, SEO-optimized content to fuel your brand narrative.",
  },
  {
    title: "AI Mascot",
    description:
      "A stylized character built for relatability, recognition, and emotional resonance with audiences.",
  },
];

const industries = [
  { name: "Fashion", image: "/images/ai-influencer/portrait-05.png" },
  { name: "Real Estate", image: "/images/ai-influencer/portrait-06.png" },
  { name: "Tourism", image: "/images/ai-influencer/portrait-07.png" },
  { name: "Food & Hospitality", image: "/images/ai-influencer/portrait-08.png" },
  { name: "Tech", image: "/images/ai-influencer/portrait-09.png" },
  { name: "Finance", image: "/images/ai-influencer/portrait-10.png" },
];

const processSteps = [
  {
    num: "01",
    title: "Define",
    description: "We analyze your brand to map tone, purpose, and personality.",
  },
  {
    num: "02",
    title: "Design",
    description: "Our team builds your influencer's visual and emotional persona.",
  },
  {
    num: "03",
    title: "Develop",
    description:
      "Voice, delivery, and interactivity are crafted for authentic communication.",
  },
  {
    num: "04",
    title: "Deliver",
    description:
      "Content is produced, refined, and launched for performance across every channel.",
  },
];

const useCases = [
  { title: "Vesta Global", image: "/images/homepage/influencer-01.png" },
  { title: "Fashion Style", image: "/images/homepage/influencer-02.jpg" },
  { title: "Tech Expert", image: "/images/homepage/influencer-03.png" },
  { title: "Vesta Global", image: "/images/homepage/influencer-04.png" },
  { title: "Brand Story", image: "/images/homepage/influencer-05.png" },
  { title: "Community", image: "/images/homepage/influencer-06.png" },
  { title: "Lifestyle", image: "/images/homepage/influencer-07.png" },
  { title: "Wellness", image: "/images/homepage/influencer-08.png" },
  { title: "Education", image: "/images/homepage/influencer-09.png" },
  { title: "Innovation", image: "/images/homepage/influencer-10.png" },
];

const faqLeft = [
  "What exactly is an AI Influencer?",
  "How do AI influencers content?",
  "Can I customize an AI influencer for my brand?",
];

const faqRight = [
  "How are AI influencers better than real ones?",
  "Is AI influencer intelligence in content ethical?",
  "How long does it take to create a model?",
];

const heroPartners = ["VG", "Vestine", "Optimum", "Colorful"];

export default function AIInfluencerPage() {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);

  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);

  useEffect(() => {
    cmsApi
      .faqs("ai-influencer")
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
          1. HERO — Marquee "AI INFLUENCER ✻ AI"
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pb-16 pt-40">
        {/* Marquee heading */}
        <div className="whitespace-nowrap overflow-hidden px-[60px]">
          <h1
            className="inline-block font-heading font-normal uppercase text-white"
            style={{ fontSize: "clamp(64px, 8vw, 130px)", lineHeight: "1" }}
          >
            AI INFLUENCER{" "}
            <span className="mx-4 inline-block align-middle text-[#1CE3F4]">
              <svg
                className="inline h-[0.5em] w-[0.5em]"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="24" y1="2" x2="24" y2="46" />
                <line x1="2" y1="24" x2="46" y2="24" />
                <line x1="7" y1="7" x2="41" y2="41" />
                <line x1="41" y1="7" x2="7" y2="41" />
              </svg>
            </span>{" "}
            <span className="text-white/20">AI</span>
          </h1>
        </div>

        {/* Subtitle + CTAs */}
        <div className="mt-10 px-[60px]">
          <p
            className="max-w-xl text-[18px] leading-[1.5] text-white/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Designed to Represent. Powered by Intelligence.
          </p>
          <p
            className="mt-2 max-w-xl text-[14px] leading-[1.6] text-white/40"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Discover intelligent, purposeful, and industry-ready AI influencers.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <Link
              href="#discover"
              className="flex items-center gap-2 font-heading text-[16px] font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-[#1CE3F4]"
            >
              Discover Influencers <span className="text-xs">↓</span>
            </Link>
            <Link
              href="/start-project"
              className="flex items-center gap-2 font-heading text-[16px] font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-[#1CE3F4]"
            >
              Start Your Project <span className="text-xs">→</span>
            </Link>
          </div>
          {/* Carousel dots */}
          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
            <button className="ml-2 flex h-6 w-6 items-center justify-center text-white/60">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Small text bottom-right */}
        <div className="absolute bottom-10 right-[60px] text-right">
          <p
            className="text-[11px] leading-[1.5] text-white/30"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Istanbul #DDIPAI — a leading place for creative intelligence
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. PARTNERS ROW
          ════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/10 bg-dark-bg py-8">
        <div className="flex items-center justify-center gap-16 px-[60px]">
          <span className="text-[13px] font-medium uppercase tracking-wider text-white/40">
            Partners
          </span>
          {heroPartners.map((name) => (
            <span
              key={name}
              className="font-heading text-[16px] font-medium text-white/50"
            >
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. MEET THE NEW ERA OF INFLUENCE — 4 portrait cards
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Meet the New Era of Influence
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-center text-[16px] leading-[1.6] text-[#063746]/60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            It&apos;s a world of strategic, intelligent, and scalable digital
            representation that reflects your brand.
          </p>

          <div className="mt-16 grid grid-cols-4 gap-6">
            {influencerTypes.map((type) => (
              <div key={type.title} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063746]/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="font-heading text-[18px] font-medium text-white">
                      {type.title}
                    </h3>
                    <p className="mt-1 text-[13px] leading-[1.4] text-white/70">
                      {type.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. THE SPECTRUM OF AI INFLUENCERS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-[#063746]">
                The Spectrum of
                <br />
                AI Influencers
              </h2>
              <p
                className="mt-6 max-w-md text-[16px] leading-[1.6] text-[#063746]/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                AI influencers serve different purposes. Understanding the
                spectrum helps choose the right fit for your brand.
              </p>
            </div>
            <div className="space-y-0">
              {spectrumItems.map((item) => (
                <div
                  key={item.title}
                  className="group border-b border-[#063746]/10 py-5"
                >
                  <h3 className="font-heading text-[20px] font-medium text-[#063746]">
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-[14px] leading-[1.5] text-[#063746]/50"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. EVERY INDUSTRY DESERVES ITS OWN VOICE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[48px] font-medium leading-[1.05] text-[#063746]">
            Every Industry Deserves
            <br />
            Its Own Voice.
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-16">
            <p
              className="text-[16px] leading-[1.6] text-[#063746]/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our AI influencers reflect the diversity of industries and
              audiences — each designed to communicate with relevance,
              intelligence, reach and persuasion.
            </p>
            <p
              className="text-[16px] leading-[1.6] text-[#063746]/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Channel them into real-world formats: e-magazine, brand
              storytelling, educational hubs, and more.
            </p>
          </div>

          {/* Industry portrait row */}
          <div
            className="mt-12 flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="group relative w-[240px] shrink-0"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
                  <Image
                    src={ind.image}
                    alt={ind.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="240px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063746]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-heading text-[16px] font-medium text-white">
                      {ind.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. MARQUEE — "DEFINE ✻ DESIGN ✻ DEVELOP" (2 rows)
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-light-bg py-8">
        {/* Row 1 */}
        <div className="whitespace-nowrap">
          <div className="inline-block">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-heading text-[80px] font-normal uppercase leading-none text-[#063746]/40 xl:text-[100px]"
              >
                DEFINE{" "}
                <span className="mx-3 text-[#1CE3F4]/40">✻</span> DESIGN{" "}
                <span className="mx-3 text-[#1CE3F4]/40">✻</span> DEVELOP{" "}
                <span className="mx-3 text-[#1CE3F4]/40">✻</span>{" "}
              </span>
            ))}
          </div>
        </div>
        {/* Row 2 — offset */}
        <div className="mt-2 whitespace-nowrap">
          <div className="inline-block -translate-x-[200px]">
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="font-heading text-[80px] font-normal uppercase leading-none text-[#063746]/40 xl:text-[100px]"
              >
                DEFINE{" "}
                <span className="mx-3 text-[#1CE3F4]/40">✻</span> DESIGN{" "}
                <span className="mx-3 text-[#1CE3F4]/40">✻</span> DEVELOP{" "}
                <span className="mx-3 text-[#1CE3F4]/40">✻</span>{" "}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. FROM IDEA TO IDENTITY — 4-step process
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            {/* Left — heading */}
            <div>
              <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-[#063746]">
                From Idea to Identity
              </h2>
              <p
                className="mt-6 max-w-md text-[16px] leading-[1.6] text-[#063746]/60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Your brand deserves a voice of its own. We create intelligent,
                expressive AI personas that amplify your values and connect with
                audiences globally.
              </p>
            </div>

            {/* Right — steps */}
            <div className="space-y-10">
              {processSteps.map((step) => (
                <div key={step.num} className="flex gap-8">
                  <span className="font-heading text-[14px] font-medium text-[#1CE3F4]">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-[20px] font-medium text-[#063746]">
                      {step.title}
                    </h3>
                    <p
                      className="mt-2 text-[14px] leading-[1.6] text-[#063746]/60"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. HOW IT WORKS — 3 steps with icon cards
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            How It Works
          </h2>
          <div className="mx-auto mt-16 flex max-w-5xl items-center justify-between">
            {[
              {
                label: "Imagine it",
                icon: "/images/ai-influencer/icon-01.svg",
                rotate: "-6deg",
              },
              {
                label: "Create it",
                icon: "/images/ai-influencer/icon-02.svg",
                rotate: "0deg",
              },
              {
                label: "Launch it",
                icon: "/images/ai-influencer/icon-03.svg",
                rotate: "6deg",
              },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-10">
                <div className="text-center">
                  <div
                    className="mx-auto flex h-[160px] w-[200px] items-center justify-center rounded-[20px] border border-[#063746]/10 bg-white shadow-sm"
                    style={{ transform: `rotate(${step.rotate})` }}
                  >
                    <Image
                      src={step.icon}
                      alt={step.label}
                      width={80}
                      height={80}
                      className="opacity-80"
                    />
                  </div>
                  <p className="mt-6 font-heading text-[16px] font-medium text-[#063746]">
                    {step.label}
                  </p>
                </div>
                {i < 2 && (
                  <svg
                    className="h-5 w-5 shrink-0 text-[#1CE3F4]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. USE CASES — 2 rows of 5 images
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            Use Cases
          </h2>
          {/* Row 1 */}
          <div className="mt-16 grid grid-cols-5 gap-4">
            {useCases.slice(0, 5).map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#D9D9D9]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="20vw"
                />
              </div>
            ))}
          </div>
          {/* Row 2 */}
          <div className="mt-4 grid grid-cols-5 gap-4">
            {useCases.slice(5, 10).map((item, i) => (
              <div
                key={i}
                className="group relative aspect-[4/5] overflow-hidden rounded-[16px] bg-[#D9D9D9]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="20vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          10. PARTNERS
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
          11. FAQ — Two-column accordion + Live FAQ
          ════════════════════════════════════════════════════════ */}
      <section className="bg-dark-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[80px] font-medium leading-[1] text-white">
            <span className="text-[#1CE3F4]">F</span>AQ
          </h2>

          <div className="mt-12 grid grid-cols-2 gap-0">
            {/* Left column */}
            <div>
              {cmsFaqLeft.map((question, i) => (
                <div key={i} className="border-b border-white/10">
                  <button
                    className="flex w-full items-center justify-between py-[30px] text-left"
                    onClick={() =>
                      setOpenFaqLeft(openFaqLeft === i ? null : i)
                    }
                  >
                    <span
                      className="pr-8 text-[18px] font-medium text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {question}
                    </span>
                    <span className="shrink-0 text-[24px] text-white/50">
                      {openFaqLeft === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaqLeft === i && (
                    <div className="pb-6 pr-12">
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
                    className="flex w-full items-center justify-between py-[30px] text-left"
                    onClick={() =>
                      setOpenFaqRight(openFaqRight === i ? null : i)
                    }
                  >
                    <span
                      className="pr-8 text-[18px] font-medium text-white"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {question}
                    </span>
                    <span className="shrink-0 text-[24px] text-white/50">
                      {openFaqRight === i ? "−" : "+"}
                    </span>
                  </button>
                  {openFaqRight === i && (
                    <div className="pb-6 pr-12">
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
          <div className="mt-16 overflow-hidden rounded-[20px]">
            <div className="relative h-[300px]">
              <Image
                src="/images/ai-influencer/portrait-01.png"
                alt="Live FAQ"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-dark-bg/50" />
              <div className="relative z-10 flex h-full flex-col justify-center p-12">
                <p className="font-heading text-[24px] text-white/60">
                  Live FAQ
                </p>
                <h3 className="mt-2 font-heading text-[40px] font-medium text-white">
                  Didn&apos;t find your answer?
                </h3>
                <Link
                  href="#"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[#1CE3F4] px-8 py-3 font-heading text-[16px] font-medium text-[#063746] transition-colors hover:bg-[#1CE3F4]/80"
                >
                  Talk to our AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          12. CTA — "Let's Build What's Next, Together."
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[64px] font-medium leading-[1.1] text-[#063746]">
            Let&apos;s Build
            <br />
            What&apos;s Next,
            <br />
            Together.
          </h2>
        </div>
      </section>
    </>
  );
}
