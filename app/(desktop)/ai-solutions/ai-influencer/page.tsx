"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";
import HeroPartnersSection from "@/components/desktop/HeroPartnersSection";
import InfluencerCard from "@/components/desktop/InfluenerCard";
import FourDMethodSection from "@/components/desktop/FourDMethodSection";
import PartnersSection from "@/components/desktop/PartnersSection";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import UseCaseCarousel from "@/components/desktop/UseCaseCarousel";
import FaqSection from "@/components/desktop/FaqSection";
import AccordionWithImage from "@/components/desktop/AccordionWithImage";
import ContactFormSection from "@/components/desktop/ContactFormSection";
/* ─── Data ─── */
const topInfluencer = [
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "Analytical Visionary",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "/images/homepage/influencer-01.png",
  },
  {
    type: "Fashion",
    title: "Brand Ambassador",
    name: "Mina Şen",
    archetype: "Color Story Weaver",
    description:
      "A virtual brand representative that embodies your company's values and maintains a consistent presence across all touchpoints.",
    image: "/images/homepage/influencer-02.jpg",
  },
  {
    type: "Food",
    title: "AI Blogger",
    name: "Elif Doğan",
    archetype: "Market-to-Table Storyteller",
    description:
      "An AI-powered content creator that produces written and visual blog content, driving SEO and organic engagement.",
    image: "/images/homepage/influencer-10.png",
  },
  {
    type: "Fashion",
    title: "Fashion",
    name: "Yasin El Fassi",
    archetype: "Heritage Remix Artist",
    description:
      "A stylized character that represents your brand personality, designed for marketing campaigns and community engagement.",
    image: "/images/homepage/influencer-03.png",
  },
  {
    type: "Lifestyle",
    title: "Vesta Global",
    name: "Hassan Al Qasimi",
    archetype: "Calm Change Navigator",
    description:
      "A stylized character that represents your brand personality, designed for marketing campaigns and community engagement.",
    image: "/images/homepage/influencer-04.png",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "Gentle Routine Architect",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "/images/homepage/influencer-07.png",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "People-First Strategist",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "/images/ai-influencer/portrait-01.png",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "Digital Community Builder",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "/images/homepage/influencer-06.png",
  },
];

const influencerTypes = [
  {
    title: "AI Persona",
    type: "Creation",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "/images/ai-influencer/portrait-01.png",
  },
  {
    title: "Investment",
    type: "Promotion",
    description:
      "A virtual brand representative that embodies your company's values and maintains a consistent presence across all touchpoints.",
    image: "/images/ai-influencer/portrait-02.png",
  },
  {
    title: "Brand",
    type: "Storytelling",
    description:
      "An AI-powered content creator that produces written and visual blog content, driving SEO and organic engagement.",
    image: "/images/ai-influencer/portrait-03.png",
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

const bgColors = {
  "Real Estate": "bg-[#CDDBC0]",
  Fashion: "bg-[#DBC0CD]",
  Food: "bg-[#C0C2DB]",
  Lifestyle: "bg-[#C0D7DB]",
  Tech: "bg-[#DBD8C0]",
  Finance: "bg-[#C0C2DB]",
  Consulting: "bg-[#DBD8C0]",
};
const filters = [
  "All Persona",
  "All Region",
  "All Language",
  "All Gender",
  "All Industry",
];

const filterOptions = [
  [
    "All Persona",
    "AI Brand Ambassador",
    "AI Influencer",
    "AI Blogger",
    "AI Mascot",
  ],
  [
    "All Region",
    "European Market (EU)",
    "Turkey Market (TR)",
    "Middle East & North Africa",
  ],
  [
    "All Language",
    "Turkish (TR)",
    "English (EN)",
    "Arabic (AR)",
  ],
  [
    "All Gender",
    "Female",
    "Male",
    "Gender-Neutral",
  ],
  [
    "All Industry",
    "Real Estate",
    "Food",
    "Fashion",
    "Tech & Digital",
    "Wellness",
    "Consulting",
  ],
];
const heroPartners = ["VG", "Vestine", "Optimum", "Colorful"];

export default function AIInfluencerPage() {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);
  const [openFilter, setOpenFilter] = useState<number | null>(null);
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
      .catch(() => { });
  }, []);

  const plusButton = () => {
    return (
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#039EB7]">
        <svg
          className="h-9 w-9 text-[#FFFFFF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
    );
  };
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "AI INFLUENCER ✻ AI"
          ════════════════════════════════════════════════════════ */}
      <section className="px-[30px] relative overflow-hidden bg-dark-bg pb-4 pt-40">
        {/* Marquee heading */}
        <div className="overflow-hidden px-[60px]">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            <h1
              className="inline-block pr-12 font-heading font-normal uppercase text-white"
              style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
            >
              AI INFLUENCER{" "}
              <span className="mx-4 inline-block align-middle text-[#FFFFFF] w-122.11054992675781 h-122.11054992675781 ">
                <svg
                  className="inline h-[1em] w-[1em]"
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
              {/* <span className="text-white/20">AI</span> */}
            </h1>
            <h1
              aria-hidden="true"
              className="inline-block pr-12 font-heading font-normal uppercase text-white"
              style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
            >
              AI INFLUENCER{" "}
              <span className="mx-4 inline-block align-middle text-[#FFFFFF]  ">
                <svg
                  className="inline h-[1em] w-[1em]"
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
              {/* <span className="text-white/20">AI</span> */}
            </h1>
            <h1
              aria-hidden="true"
              className="inline-block pr-12 font-heading font-normal uppercase text-white"
              style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
            >
              AI INFLUENCER{" "}
              <span className="mx-4 inline-block align-middle text-[#FFFFFF]  ">
                <svg
                  className="inline h-[1em] w-[1em]"
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
              {/* <span className="text-white/20">AI</span> */}
            </h1>
            <h1
              aria-hidden="true"
              className="inline-block pr-12 font-heading font-normal uppercase text-white"
              style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
            >
              AI INFLUENCER{" "}
              <span className="mx-4 inline-block align-middle text-[#FFFFFF]  ">
                <svg
                  className="inline h-[1em] w-[1em]"
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
              {/* <span className="text-white/20">AI</span> */}
            </h1>
            <h1
              aria-hidden="true"
              className="inline-block pr-12 font-heading font-normal uppercase text-white"
              style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
            >
              AI INFLUENCER{" "}
              <span className="mx-4 inline-block align-middle text-[#FFFFFF]  ">
                <svg
                  className="inline h-[1em] w-[1em]"
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
              {/* <span className="text-white/20">AI</span> */}
            </h1>
          </div>
        </div>

        {/* Subtitle + CTAs */}
        <div className="mt-10 px-[100px]">
          <p
            className="flex text-[60px] font-medium leading-[0.99] text-[#FFFFFF]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Designed to Represent. Powered by Intelligence.
          </p>
          <p
            className="mt-10 text-[26px] leading-[1.2] font-regular font-normal text-[#FFFFFF]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Discover intelligent, purposeful, and industry-ready AI influencers.
          </p>
          <div className="mt-[90px] flex items-center gap-18">
            <Link
              href="#discover"
              className="flex items-center gap-2 font-heading text-[32px] font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-[#1CE3F4]"
            >
              Discover Influencers →
            </Link>
            <Link
              href="/start-project"
              className="flex items-center gap-2 font-heading text-[32px] font-medium text-white underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-[#1CE3F4]"
            >
              Start Your Project →
            </Link>
          </div>

        </div>
        {/* ════════════════════════════════════════════════════════
          1. TOP INFLUENCERS
          ════════════════════════════════════════════════════════ */}
        <div className="mt-16 overflow-hidden">
          <div className="flex w-max animate-marquee gap-6 whitespace-nowrap">
            {[...topInfluencer, ...topInfluencer].map((type, idx) => (
              <InfluencerCard
                key={idx}
                image={type.image}
                name={type.name}
                type={type.type}
                bgColor={bgColors[type.type as keyof typeof bgColors]}
              />
            ))}
          </div>
        </div>

        <div className=" text-right mt-10">
          <p
            className="mt-4 text-[16px] leading-[1.6] text-[#EBFFFF]"
          >
            Created by DDIP.AI —
            <span className="font-light italic" style={{ fontFamily: 'var(--font-body)' }}> bridging creativity and automation.</span>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. PARTNERS ROW
          ════════════════════════════════════════════════════════ */}
      <HeroPartnersSection />
      {/* ════════════════════════════════════════════════════════
          3. MEET THE NEW ERA OF INFLUENCE — 4 portrait cards
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg">
        <div>
          <h2 className="text-center font-heading text-[60px] font-bold uppercase leading-[1.05] bg-[linear-gradient(266.43deg,#063746_1.48%,#00BCCF_117.86%)] bg-clip-text text-transparent">
            Meet the New Era of Influence
          </h2>
          <p
            className="mx-auto mt-4  text-center font-regular text-[28px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            An AI Influencer is more than a virtual face.

          </p>
          <p
            className="text-center font-regular text-[28px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            It is a system of design, language, and emotion built to express your brand’s unique voice across every platform.
          </p>

          <div className="mt-16 mx-6 grid grid-cols-3 gap-8">
            {influencerTypes.map((type) => (
              <div key={type.title} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px]">
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-cover transition-transform duration-500 "
                    sizes="25vw"
                  />
                  <div className="absolute top-0 left-0 p-5">
                    <h3 className="font-heading leading-[1.2] text-[34px] font-medium text-[#FFFFFF]">
                      {type.title}
                    </h3>
                    <p className="text-[34px] leading-[1.4] text-[#FFFFFF]">
                      {type.type}
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
      <AccordionWithImage
        heading={"The Spectrum of\nAI Influencers"}
        subheading="AI influencers serve different purposes. Understanding the spectrum helps choose the right fit for your brand."
        defaultImage="/images/ai-influencer/portrait-01.png"
        items={[
          { title: "AI Brand Ambassador", description: "A virtual representative that communicates your brand identity with purpose and precision across every channel.", image: "/images/ai-influencer/portrait-02.png" },
          { title: "AI Influencer", description: "A digital persona designed to engage, create, and influence — powered by AI, shaped by your strategy.", image: "/images/ai-influencer/portrait-03.png" },
          { title: "AI Blogger", description: "An AI-driven writer that produces consistent, SEO-optimized content to fuel your brand narrative.", image: "/images/ai-influencer/portrait-04.png" },
          { title: "AI Mascot", description: "A stylized character built for relatability, recognition, and emotional resonance with audiences.", image: "/images/ai-influencer/portrait-05.png" },
        ]}
      />

      {/* ════════════════════════════════════════════════════════
          5. EVERY INDUSTRY DESERVES ITS OWN VOICE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#002834] py-24">
        <div className="px-[70px]">
          <h2 className="font-heading text-[48px] font-bold leading-[1.05] text-[#1CE3F4]">
            Every Industry Deserves
            <br />
            Its Own Voice.
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-60">
            <p
              className="text-[16px] leading-[1.6] text-[#90B2BD]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our AI influencers reflect the diversity of industries and
              audiences. Each one is designed to translate brand values into
              intelligent, visual communication.
            </p>
            <div>
              <p
                className="text-[16px] leading-[1.6] text-[#90B2BD]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Choose from our curated library or request a
                bespoke creation developed exclusively for your
                brand.

              </p>
              <button className="flex items-center gap-3 rounded-full bg-[#1CE3F4] px-6 py-2.5 mt-10 font-heading text-[14px] font-medium text-[#0E4252] transition hover:bg-[#1CE3F4]/80">
                <span>Explore The Collection</span> {plusButton()}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-16 p-4 mt-35.75 relative z-10">
            {filters.map((item, index) => (
              <div key={index} className="relative">

                {/* Pill */}
                <div
                  onClick={() =>
                    setOpenFilter(openFilter === index ? null : index)
                  }
                  className="flex items-center justify-between px-4 py-3 bg-[#FFFFFF] rounded-full cursor-pointer"
                >
                  <span className="text-[#4D5347] text-sm font-medium">
                    {item}
                  </span>

                  <svg
                    className={`w-4 h-4 ml-14  text-gray-500 transition-transform ${openFilter === index ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                {/* Dropdown */}
                {openFilter === index && (
                  <div className="absolute left-0 mt-2 w-full bg-white rounded-2xl shadow-xl overflow-hidden">
                    {filterOptions[index].map((option, i) => (
                      <div
                        key={i}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b last:border-none"
                        onClick={() => setOpenFilter(null)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 sm:mt-12 lg:mt-16">
            <div
              className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4
      gap-y-8
      sm:gap-y-10
      lg:gap-y-12
      gap-x-4
      sm:gap-x-5
      lg:gap-x-6
      justify-items-stretch
      auto-rows-fr
    "
            >
              {topInfluencer.map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  className="group h-full w-full px-2 sm:px-0"
                >
                  <div className="relative mx-auto aspect-[376/518] w-full max-w-[360px] overflow-hidden rounded-3xl sm:max-w-[376px]">

                    {/* Image */}
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Tag */}
                    <div className={`absolute right-3 top-3 rounded-full px-4 py-1.5 sm:right-5 sm:top-5 sm:px-6 sm:py-2 ${bgColors[item.type as keyof typeof bgColors]}`}>
                      <span className="text-xs font-medium uppercase text-black sm:text-[14px]">
                        {item.type}
                      </span>
                    </div>

                    {/* Bottom */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between sm:bottom-5 sm:left-5 sm:right-5">

                      {/* Name */}
                      <div className="flex items-center gap-2 rounded-full bg-[#063746B2]/80 px-3 py-1.5 backdrop-blur-md sm:gap-3 sm:px-4 sm:py-2">
                        <span className="text-sm text-white sm:text-[16px]">{item.name}</span>
                        <img
                          src="/images/ai-influencer/image.png"
                          alt="flag"
                          className="h-4 w-4 rounded-sm object-cover sm:h-5 sm:w-5"
                        />
                      </div>

                      {/* Plus */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 sm:h-9 sm:w-9">
                        <svg
                          className="h-4 w-4 text-[#012F3B] sm:h-5 sm:w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>

                    </div>
                  </div>

                  {/* Bottom caption (like the example in your screenshot) */}
                  <div className="mt-3 px-2 sm:px-0">
                    <p className="text-left font-heading text-[14px] leading-[1.2] text-white/80 sm:text-[16px]">
                      "{item.archetype}"
                    </p>
                  </div>
                </div>

              ))}
            </div>
          </div>
          {/* Industry portrait row */}
          {/* <div
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
          </div> */}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. MARQUEE — "DEFINE ✻ DESIGN ✻ DEVELOP" (2 rows)
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-light-bg py-8">
        {/* Row 1 */}
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, groupIdx) => (
              <div key={`define-row-1-group-${groupIdx}`} className="flex shrink-0">
                {[...Array(3)].map((_, i) => (
                  <h2
                    key={`define-row-1-${groupIdx}-${i}`}
                    className="inline-block shrink-0 pr-32 font-heading font-normal uppercase text-[#002834]"
                    style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
                  >
                    DEFINE{" "}
                    <span className="mx-4 inline-block align-middle text-[#002834]">
                      <svg
                        className="inline h-[1em] w-[1em]"
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
                    DESIGN{" "}
                    <span className="mx-4 inline-block align-middle text-[#002834]">
                      <svg
                        className="inline h-[1em] w-[1em]"
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
                    DEVELOP{" "}
                    <span className="mx-4 inline-block align-middle text-[#002834]">
                      <svg
                        className="inline h-[1em] w-[1em]"
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
                    </span>
                  </h2>
                ))}
              </div>
            ))}
          </div>
        </div>
        {/* Row 2 — offset */}
        <div className="mt-2 overflow-hidden">
          <div
            className="flex w-max animate-marquee whitespace-nowrap"
            style={{ animationDirection: "reverse" }}
          >
            {[...Array(2)].map((_, groupIdx) => (
              <div key={`define-row-2-group-${groupIdx}`} className="flex shrink-0">
                {[...Array(3)].map((_, i) => (
                  <h2
                    key={`define-row-2-${groupIdx}-${i}`}
                    className="inline-block shrink-0 pr-32 font-heading font-normal uppercase text-[#002834]"
                    style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
                  >
                    DEFINE{" "}
                    <span className="mx-4 inline-block align-middle text-[#002834]">
                      <svg
                        className="inline h-[1em] w-[1em]"
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
                    DESIGN{" "}
                    <span className="mx-4 inline-block align-middle text-[#002834]">
                      <svg
                        className="inline h-[1em] w-[1em]"
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
                    DEVELOP{" "}
                    <span className="mx-4 inline-block align-middle text-[#002834]">
                      <svg
                        className="inline h-[1em] w-[1em]"
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
                    </span>
                  </h2>
                ))}
              </div>
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
  <FourDMethodSection />

      {/* ════════════════════════════════════════════════════════
          9. USE CASES — scrollable cards with tabs
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-16">
        <div className="px-[60px]">

          {/* Heading */}
          <h2 className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746] mb-8">
            Use Cases
          </h2>

          {/* Clickable category tabs */}
          <div className="flex items-center gap-3 mb-10 justify-center">
            {["Real Estate", "Food", "Fashion", "Tech & Digital", "Wellness", "Consulting"].map((tab, i) => (
              <button key={tab}
                onClick={() => setActiveTab(i)}
                className="rounded-full px-5 py-2 text-[14px] font-medium transition"
                style={{
                  background: activeTab === i ? "#063746" : "transparent",
                  color: activeTab === i ? "#fff" : "#063746",
                  border: activeTab === i ? "none" : "1px solid #06374640",
                  fontFamily: "var(--font-body)",
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Embla auto-scroll carousel — component */}
          <UseCaseCarousel items={[
            { title: "Vesta Global", image: "/images/homepage/influencer-01.png", tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", image: "/images/homepage/influencer-02.jpg", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Vesta Global", image: "/images/homepage/influencer-03.png", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", image: "/images/homepage/influencer-04.png", tags: ["Visual Style Definition", "Prompt Crafting"] },
            { title: "Vesta Global", image: "/images/homepage/influencer-05.png", tags: ["Use-Case Development"] },
            { title: "Nadlan Star", image: "/images/homepage/influencer-01.png", tags: ["Use-Case Development", "Prompt Crafting"] },
          ]} />

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          10. PARTNERS
          ════════════════════════════════════════════════════════ */}
    <PartnersSection />

      {/* ════════════════════════════════════════════════════════
          11. FAQ — Two-column accordion + Live FAQ
          ════════════════════════════════════════════════════════ */}
      <FaqSection leftQuestions={cmsFaqLeft} rightQuestions={cmsFaqRight} />

      {/* ════════════════════════════════════════════════════════
          12. CTA — "Let's Build What's Next, Together."
          ════════════════════════════════════════════════════════ */}
     <ContactFormSection />
    </>
  );
}
