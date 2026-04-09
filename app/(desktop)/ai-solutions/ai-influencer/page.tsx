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
import { ChevronDown, ChevronUp } from "lucide-react";

/* ─── Data ─── */
const items = [
  {
    title: "AI Brand Ambassador",
    content:
      "Your brand's digital representative. Designed to embody your identity, deliver messages, and build authentic audience relationships across campaigns and platforms.",
  },
  {
    title: "AI Influencer",
    content:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
  },
  {
    title: "AI Blogger",
    content:
      "An AI-powered content creator that produces written and visual blog content, driving SEO and organic engagement.",
  },
  {
    title: "AI Mascot",
    content:
      "A stylized character that represents your brand personality, designed for marketing campaigns and community engagement.",
  },
];

const topInfluencer = [
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "Analytical Visionary",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81d25d40-2890-403e-93d7-49e36b06cd00/public",
  },
  {
    type: "Fashion",
    title: "Brand Ambassador",
    name: "Mina Şen",
    archetype: "Color Story Weaver",
    description:
      "A virtual brand representative that embodies your company's values and maintains a consistent presence across all touchpoints.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/56d8bb08-9c7d-49ca-e1ec-aa074fdf1600/public",
  },
  {
    type: "Food",
    title: "AI Blogger",
    name: "Elif Doğan",
    archetype: "Market-to-Table Storyteller",
    description:
      "An AI-powered content creator that produces written and visual blog content, driving SEO and organic engagement.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5dfe3b6d-e750-4279-3815-6dd960b62e00/public",
  },
  {
    type: "Fashion",
    title: "Fashion",
    name: "Yasin El Fassi",
    archetype: "Heritage Remix Artist",
    description:
      "A stylized character that represents your brand personality, designed for marketing campaigns and community engagement.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e1fe1be8-8ca5-4eef-cf2a-925bae6f7300/public",
  },
  {
    type: "Lifestyle",
    title: "Vesta Global",
    name: "Hassan Al Qasimi",
    archetype: "Calm Change Navigator",
    description:
      "A stylized character that represents your brand personality, designed for marketing campaigns and community engagement.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/259023e7-e8b0-4214-ee42-9f2b02a1a800/public",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "Gentle Routine Architect",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/923ba48c-8d17-4f6f-a974-09eae19dc300/public",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "People-First Strategist",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a6335ebb-a94d-49fe-f728-6034821b4500/public",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir ",
    archetype: "Digital Community Builder",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8ebaf72d-1931-4412-d1ef-55f1feb9dd00/public",
  },
];

const influencerTypes = [
  {
    title: "AI Persona",
    type: "Creation",
    description:
      "A fully digital persona designed to create content, engage audiences, and represent brands across social media with complete consistency.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a6335ebb-a94d-49fe-f728-6034821b4500/public",
  },
  {
    title: "Investment",
    type: "Promotion",
    description:
      "A virtual brand representative that embodies your company's values and maintains a consistent presence across all touchpoints.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3bb85d3d-0153-4afa-2959-adafcc4f1900/public",
  },
  {
    title: "Brand",
    type: "Storytelling",
    description:
      "An AI-powered content creator that produces written and visual blog content, driving SEO and organic engagement.",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/995b7c78-e5e9-4a39-412f-9f183bbd0500/public",
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
  { name: "Fashion", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c836b07d-e84a-4f01-5f1c-03b54afafd00/public" },
  { name: "Real Estate", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/66628ee4-c1a8-4cfe-8165-f5ec3209dd00/public" },
  { name: "Tourism", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/b3c0fadf-104a-4925-1844-274debec0d00/public" },
  { name: "Food & Hospitality", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/32cb06d2-ccf5-4bf6-9375-05d314eba300/public" },
  { name: "Tech", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c177aad-f63e-4b18-1303-733154b08400/public" },
  { name: "Finance", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/9f102a3c-11b1-46fc-6a64-1e2fad0e3000/public" },
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
  { title: "Vesta Global", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81d25d40-2890-403e-93d7-49e36b06cd00/public" },
  { title: "Fashion Style", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/56d8bb08-9c7d-49ca-e1ec-aa074fdf1600/public" },
  { title: "Tech Expert", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e1fe1be8-8ca5-4eef-cf2a-925bae6f7300/public" },
  { title: "Vesta Global", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/259023e7-e8b0-4214-ee42-9f2b02a1a800/public" },
  { title: "Brand Story", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/57fe254b-21d7-4443-1476-6eccc458df00/public" },
  { title: "Community", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8ebaf72d-1931-4412-d1ef-55f1feb9dd00/public" },
  { title: "Lifestyle", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/923ba48c-8d17-4f6f-a974-09eae19dc300/public" },
  { title: "Wellness", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ae712d05-13a0-46d1-c9e5-6f92fdeda700/public" },
  { title: "Education", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0c4bfad2-2109-4bbb-d78b-dcc73c1def00/public" },
  { title: "Innovation", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5dfe3b6d-e750-4279-3815-6dd960b62e00/public" },
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
  const [openIndex, setOpenIndex] = useState(0);
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
              href="/ai-solutions/ai-influencer/templates"
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
      {/* <AccordionWithImage
        heading={"The Spectrum of\nAI Influencers"}
        subheading="AI influencers serve different purposes. Understanding the spectrum helps choose the right fit for your brand."
        defaultImage="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3ae0f1a7-9f73-4c29-9d1e-f45ca0381b00/public"
        items={[
          { title: "AI Brand Ambassador", description: "A virtual representative that communicates your brand identity with purpose and precision across every channel.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3bb85d3d-0153-4afa-2959-adafcc4f1900/public" },
          { title: "AI Influencer", description: "A digital persona designed to engage, create, and influence — powered by AI, shaped by your strategy.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/995b7c78-e5e9-4a39-412f-9f183bbd0500/public" },
          { title: "AI Blogger", description: "An AI-driven writer that produces consistent, SEO-optimized content to fuel your brand narrative.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e302e17b-3d7a-4e23-5779-603178dedd00/public" },
          { title: "AI Mascot", description: "A stylized character built for relatability, recognition, and emotional resonance with audiences.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c836b07d-e84a-4f01-5f1c-03b54afafd00/public" },
        ]}
      /> */}
      <section className="py-24 bg-light-bg">
        <div className="flex items-center justify-center px-[60px]">
          <div className="bg-white rounded-[24px] shadow-lg w-full p-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Section */}
            <div>
              <h2 className="font-heading text-[60px] font-bold text-[#063746] mb-4 leading-tight">
                The Spectrum of<br />AI Influencers
              </h2>
              <p className="text-[#063746] text-[22px] mb-10 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                AI influencers are a spectrum of intelligent digital personas built to represent brands in new ways. From brand ambassadors to stylized mascots, each type serves a unique role.
              </p>

              <div className="space-y-0">
                {items.map((item, index) => {
                  const isOpen = index === openIndex;
                  return (
                    <div key={index} className="border-b border-[#063746]/10">
                      <button
                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                        className="flex items-center justify-between w-full text-left py-5 hover:opacity-80 transition"
                      >
                        <span className={`text-[34px] font-medium transition-colors ${isOpen ? "text-[#0A7D94]" : "text-[#86868D]"}`}>
                          {item.title}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={25} className="text-[#86868D] shrink-0" />
                        ) : (
                          <ChevronDown size={25} className="text-[#86868D] shrink-0" />
                        )}
                      </button>
                      {isOpen && item.content && (
                        <p className="text-[#5C5C5C] text-[22px] pb-5 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Section — tall portrait image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[600px] h-[750px] rounded-[20px] overflow-hidden shadow-xl">
                <Image
                  src={items[openIndex >= 0 ? openIndex : 0] ? [
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3ae0f1a7-9f73-4c29-9d1e-f45ca0381b00/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a0e9404d-c437-42b7-1433-144fff823900/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cea0a78c-9afa-4922-39c1-49bbb3c88d00/public",
                    "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0ffc2a21-abab-4878-398a-3d49d9f4bc00/public",
                  ][openIndex >= 0 ? openIndex : 0] : "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3bb85d3d-0153-4afa-2959-adafcc4f1900/public"}
                  alt={items[openIndex >= 0 ? openIndex : 0]?.title || "AI Influencer"}
                  fill
                  className="object-cover transition-all duration-500"
                  sizes="360px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ════════════════════════════════════════════════════════
          5. EVERY INDUSTRY DESERVES ITS OWN VOICE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#002834] py-24">
        <div className="px-[70px]">
          <h2 className="font-heading text-[60px] font-bold leading-[1.05] text-[#1CE3F4]">
            Every Industry Deserves
            <br />
            Its Own Voice.
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-60">
            <p
              className="text-[30px] leading-[1.6] text-[#90B2BD] mt-2"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our AI influencers reflect the diversity of industries and
              audiences. Each one is designed to translate brand values into
              intelligent, visual communication.
            </p>
            <div>
              <p
                className="text-[30px] leading-[1.6] text-[#90B2BD]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Choose from our curated library or request a
                bespoke creation developed exclusively for your
                brand.

              </p>
              <button className="flex items-center gap-3 rounded-full bg-[#1CE3F4] px-6 py-2.5 mt-10 font-heading text-[22px] font-medium text-[#0E4252] transition hover:bg-[#1CE3F4]/80">
                <span>Explore The Collection</span> {plusButton()}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 p-4 mt-35 relative z-10 ml-4">
            {filters.map((item, index) => (
              <div key={index} className="relative">

                {/* Pill */}
                <div
                  onClick={() =>
                    setOpenFilter(openFilter === index ? null : index)
                  }
                  className="flex items-center justify-between px-8 py-5 bg-[#FFFFFF] rounded-full cursor-pointer"
                >
                  <span className="text-[#4D5347] text-[22px] font-medium">
                    {item}
                  </span>

                  <svg
                    className={`w-6 h-6 ml-14  text-[#86868D] transition-transform ${openFilter === index ? "rotate-180" : ""
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
                          src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c6dfd82-c580-49a7-be40-a53090c65400/public"
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
          {/* Header section */}
          <div className="grid grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="font-heading text-[56px] font-medium text-[#063746]">
                From Idea to Identity
              </h2>
            </div>
            <div>
              <p
                className="text-[44px] leading-[1.6] text-[#063746]/70 mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Your brand deserves a voice of its own. We create intelligent, expressive AI personas that embody your values and connect with audiences globally.
              </p>
              <button className="rounded-full bg-[#0E4252] px-8 py-3 text-[22px] font-medium text-white transition hover:bg-[#063746]/90" style={{ fontFamily: "var(--font-body)" }}>
                Start Your Project
              </button>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {processSteps.map((step) => (
              <div key={step.num} className="">
                <div className="grid grid-cols-2 gap-16">
                  <span className="font-heading text-[36px] font-medium text-[#063746]">
                    {step.num}
                  </span>
                  <div className="flex-1  border-b border-[#063746]/10 pb-5">
                    <h3 className="font-heading text-[50px] font-medium text-[#063746] mb-2"
                      style={{ fontFamily: "var(--font-body)" }}>
                      {step.title}
                    </h3>
                    <p
                      className="text-[24px] leading-[1.6] text-[#063746] max-w-lg"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
          <h2 className="text-center font-heading text-[70px] font-medium uppercase leading-[1.05] text-[#063746] mb-8">
            Use Cases
          </h2>

          {/* Clickable category tabs */}
          <div className="flex items-center gap-3 mb-10 justify-center border border-[#C7C7C7] p-2 rounded-full w-3xl mx-auto">
            {["Real Estate", "Food", "Fashion", "Tech & Digital", "Wellness", "Consulting"].map((tab, i) => (
              <button key={tab}
                onClick={() => setActiveTab(i)}
                className="rounded-full px-5 py-2 text-[14px] font-medium transition"
                style={{
                  background: activeTab === i ? "#063746" : "transparent",
                  color: activeTab === i ? "#fff" : "#063746",
              
                  fontFamily: "var(--font-body)",
                }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Embla auto-scroll carousel — component */}
          <UseCaseCarousel items={[
            { title: "Vesta Global", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/4efeb3daa0597c05c31d144beccea3f8/watch", tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/f87ff43c16d018cdafd6c1ce68423c67/watch", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Vesta Global", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/8a161380969c7a822ca6075723101fdb/watch", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/557784e65cd48dfcc66ec4545dd50b2a/watch", tags: ["Visual Style Definition", "Prompt Crafting"] },
            { title: "Vesta Global", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/4efeb3daa0597c05c31d144beccea3f8/watch", tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/f87ff43c16d018cdafd6c1ce68423c67/watch", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Vesta Global", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/8a161380969c7a822ca6075723101fdb/watch", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/557784e65cd48dfcc66ec4545dd50b2a/watch", tags: ["Visual Style Definition", "Prompt Crafting"] },
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
