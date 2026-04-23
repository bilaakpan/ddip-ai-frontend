"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { cmsApi, type Faq } from "@/lib/api";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InfluencerPopupModal, type PopupInfluencer } from "@/components/mobile/influencer-popUp";

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

const partners = [
  { name: "Microsoft", image: "/images/partners/microsoft.svg" },
  { name: "Salesforce", image: "/images/partners/salesforce.svg" },
  { name: "Google", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/eebd38e3-7038-4900-5397-fe58af26e000/public" },
  { name: "AWS", image: "/images/partners/aws.svg" },
  { name: "Google AI", image: "/images/partners/google-ai.svg" },
];

const topInfluencer = [
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir",
    region: "Turkey Market (TR)",
    language: "Turkish (TR)",
    gender: "Female",
    archetype: "Analytical Visionary",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81d25d40-2890-403e-93d7-49e36b06cd00/public",
  },
  {
    type: "Fashion",
    title: "Brand Ambassador",
    name: "Mina Şen",
    region: "European Market (EU)",
    language: "English (EN)",
    gender: "Female",
    archetype: "Color Story Weaver",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/56d8bb08-9c7d-49ca-e1ec-aa074fdf1600/public",
  },
  {
    type: "Food",
    title: "AI Blogger",
    name: "Elif Doğan",
    region: "Turkey Market (TR)",
    language: "Turkish (TR)",
    gender: "Female",
    archetype: "Market-to-Table Storyteller",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5dfe3b6d-e750-4279-3815-6dd960b62e00/public",
  },
  {
    type: "Fashion",
    title: "Fashion",
    name: "Yasin El Fassi",
    region: "Middle East & North Africa",
    language: "Arabic (AR)",
    gender: "Male",
    archetype: "Heritage Remix Artist",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e1fe1be8-8ca5-4eef-cf2a-925bae6f7300/public",
  },
  {
    type: "Lifestyle",
    title: "Vesta Global",
    name: "Hassan Al Qasimi",
    region: "Middle East & North Africa",
    language: "Arabic (AR)",
    gender: "Male",
    archetype: "Calm Change Navigator",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/259023e7-e8b0-4214-ee42-9f2b02a1a800/public",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir",
    region: "Turkey Market (TR)",
    language: "English (EN)",
    gender: "Gender-Neutral",
    archetype: "Gentle Routine Architect",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/923ba48c-8d17-4f6f-a974-09eae19dc300/public",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir",
    region: "European Market (EU)",
    language: "English (EN)",
    gender: "Gender-Neutral",
    archetype: "People-First Strategist",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a6335ebb-a94d-49fe-f728-6034821b4500/public",
  },
  {
    type: "Real Estate",
    title: "AI Influencer",
    name: "Mina Özdemir",
    region: "European Market (EU)",
    language: "English (EN)",
    gender: "Male",
    archetype: "Digital Community Builder",
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

const processSteps = [
  { num: "01", title: "Define", description: "We analyze your brand to map tone, purpose, and personality." },
  { num: "02", title: "Design", description: "Our team builds your influencer's visual and emotional persona." },
  { num: "03", title: "Develop", description: "Voice, delivery, and interactivity are crafted for authentic communication." },
  { num: "04", title: "Deliver", description: "Content is produced, refined, and launched for performance across every channel." },
];

const bgColors: Record<string, string> = {
  "Real Estate": "bg-[#CDDBC0]",
  Fashion: "bg-[#DBC0CD]",
  Food: "bg-[#C0C2DB]",
  Lifestyle: "bg-[#C0D7DB]",
  Tech: "bg-[#DBD8C0]",
  Finance: "bg-[#C0C2DB]",
};

const filters = ["All Persona", "All Region", "All Language", "All Gender", "All Industry"];

const filterOptions = [
  ["All Persona", "AI Brand Ambassador", "AI Influencer", "AI Blogger", "AI Mascot"],
  ["All Region", "European Market (EU)", "Turkey Market (TR)", "Middle East & North Africa"],
  ["All Language", "Turkish (TR)", "English (EN)", "Arabic (AR)"],
  ["All Gender", "Female", "Male", "Gender-Neutral"],
  ["All Industry", "Real Estate", "Food", "Fashion", "Tech & Digital", "Wellness", "Consulting"],
];

const faqFallback = [
  { question: "What exactly is an AI Influencer?", answer: "An AI Influencer is a fully digital persona powered by artificial intelligence, designed to create content, engage audiences, and represent brands across social media platforms." },
  { question: "How do AI influencers create content?", answer: "They use generative AI tools to produce images, videos, and written content based on your brand guidelines and campaign objectives." },
  { question: "Can I customize an AI influencer for my brand?", answer: "Yes. Every AI influencer we create is tailored to your brand's tone, visual identity, and target audience." },
  { question: "How are AI influencers better than real ones?", answer: "They offer complete consistency, no scheduling conflicts, multilingual capability, and significantly lower long-term costs." },
  { question: "Is AI influencer content ethical?", answer: "Yes. We follow industry transparency standards and ensure all AI-generated content is clearly positioned within ethical guidelines." },
  { question: "How long does it take to create a model?", answer: "Typically 2–4 weeks from brief to first content delivery, depending on complexity and customization requirements." },
];

const normalizeIndustry = (value: string) => {
  if (value === "Tech & Digital") return "Tech";
  if (value === "Food & Hospitality") return "Food";
  return value;
};

const matchesPersona = (title: string, selected: string) => {
  if (selected === "AI Brand Ambassador") return title.toLowerCase().includes("brand ambassador");
  if (selected === "AI Influencer") return title.toLowerCase().includes("influencer");
  if (selected === "AI Blogger") return title.toLowerCase().includes("blogger");
  if (selected === "AI Mascot") return title.toLowerCase().includes("mascot");
  return true;
};

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};
const methodSteps = [
  {
    num: "01", title: "Define", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/01b5fee0-1a9b-4547-9780-99ad724e1e00/public", rotate: "-22deg",
    desc: "We identify audience intent, search behavior, and the questions AI systems need to answer.",
    bg: "rgba(225, 225, 225, 1)", textColor: "#221D1D",
  },
  {
    num: "02", title: "Design", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/717131ad-013b-4176-10f7-799df95ebf00/public", rotate: "-9deg",
    desc: "Content structure, hierarchy, and semantic flow are shaped for clarity and relevance.",
    bg: "rgba(28, 227, 244, 1)", textColor: "#002834",
  },
  {
    num: "03", title: "Develop", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c2e3a539-3fba-4d5c-8f4d-f18617091d00/public", rotate: "9deg",
    desc: "AI-readable content and contextual signals are implemented across pages.",
    bg: "rgba(20, 83, 101, 1)", textColor: "#ffffff",
  },
  {
    num: "04", title: "Deliver", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/dfc1bf85-d080-4762-88b1-c6399ef5cc00/public", rotate: "22deg",
    desc: "Optimized content is deployed with measurable improvements in visibility and discoverability.",
    bg: "rgba(3, 158, 183, 1)", textColor: "#EBFFFF",
  },
];
const heroPartners = [
  { name: "Vesta Global", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/df6e0710-2d50-486d-5f59-5e751559e900/public" },
  { name: "Brother", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/86b61c21-9a9c-439a-317a-85b52a8e1200/public" },
  { name: "Mediterra", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c4b8d5eb-29a6-4b39-cf0e-bcb6da555800/public" },
  { name: "Bizim Mutfak", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fd4760d4-1dac-4f11-1800-7c8f7e1dfa00/public" },
  { name: "Optimum", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4b22ddb7-f87d-499e-df17-ae9efd2e5200/public" },
  { name: "CollaSel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e47e5b16-132e-40ee-537a-2d44a3283d00/public" },
  { name: "SelJel", logo: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4c453b6d-12e2-4fb3-f7d3-75d85e1a5200/public" },
];

export default function MobileAIInfluencerPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState(faqFallback);
  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState(filters);
  const [popupInfluencer, setPopupInfluencer] = useState<PopupInfluencer | null>(null);

  useEffect(() => {
    cmsApi
      .faqs("ai-influencer")
      .then((res) => {
        if (res.data?.length) {
          setCmsFaqs(res.data.map((f: Faq) => ({ question: f.question, answer: f.answer ?? "" })));
        }
      })
      .catch(() => { });
  }, []);

  const handleFilterSelect = (filterIndex: number, option: string) => {
    setSelectedFilters((prev) => prev.map((item, idx) => (idx === filterIndex ? option : item)));
    setOpenFilter(null);
  };

  const filteredInfluencers = useMemo(() => {
    return topInfluencer.filter((item) => {
      const [persona, region, language, gender, industry] = selectedFilters;
      if (persona !== "All Persona" && !matchesPersona(item.title, persona)) return false;
      if (region !== "All Region" && item.region !== region) return false;
      if (language !== "All Language" && item.language !== language) return false;
      if (gender !== "All Gender" && item.gender !== gender) return false;
      if (industry !== "All Industry" && normalizeIndustry(item.type) !== normalizeIndustry(industry)) return false;
      return true;
    });
  }, [selectedFilters]);

  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg">
        {/* Marquee heading */}
        <div className="relative z-10 overflow-hidden pt-10">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              AI INFLUENCER &nbsp;
            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px] uppercase leading-none text-white">
              AI INFLUENCER&nbsp;            </span>
            <span aria-hidden className="shrink-0 pr-10 font-heading text-[87px]  uppercase leading-none text-white">
              AI INFLUENCER&nbsp;            </span>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 px-5 pb-6">
          <h1 className="font-heading text-[22px] leading-[1.15] text-white">
            Designed to Represent.<br />Powered by Intelligence.
          </h1>
          <p className="mt-3 text-[16px] leading-relaxed text-white">
            Discover intelligent, expressive, and industry-ready AI Influencers.
          </p>
          <Link
            href="/m/ai-solutions/ai-influencer/templates"
            className="mt-[50px] inline-flex items-center gap-2 text-[16px] text-white underline decoration-white underline-offset-8"
          >
            Discover Influencers →
          </Link>
        </div>

        {/* Influencer cards strip */}
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {topInfluencer.map((inf, idx) => (
            <div key={idx} className="shrink-0 w-[45vw] max-w-45">
              <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
                <Image src={inf.image} alt={inf.name} fill className="object-cover" sizes="180px" />
                {/* Industry tag */}
                <div className={`absolute top-2 right-2 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${bgColors[inf.type] ?? "bg-white/80"}`}>
                  {inf.type}
                </div>
                {/* Bottom: name + flag + plus */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 rounded-full bg-[#063746]/80 px-2 py-1 backdrop-blur-sm">
                    <span className="text-[10px] font-medium text-white">{inf.name}</span>
                    <span className="text-[11px]">🇹🇷</span>
                  </div>
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white cursor-pointer"
                    onClick={() => setPopupInfluencer({
                      name: inf.name,
                      archetype: inf.archetype,
                      industry: inf.type,
                      image: inf.image,
                      country: "TR"
                    })}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#012F3B" strokeWidth="2">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="mt-1.5 text-[12px] italic text-[#90B2BD]">&quot;{inf.archetype}&quot;</p>
            </div>
          ))}
        </div>

        {/* Created by */}
        <p className="mt-3 pb-8 text-right text-[14px] italic text-[#EBFFFF]" style={{ paddingRight: "max(20px, env(safe-area-inset-right))" }}>
          Created by DDIP.AI —<br />bridging creativity and automation.
        </p>
      </section>

      {/* ══════════════════════════════════════
          3. PARTNERS
      ══════════════════════════════════════ */}
      <section className="bg-[#F8F9F8] py-10 px-5">
        <div className="">
          <h2 className="text-[#2D4A4B] font-heading text-xl font-semibold mb-5">
            Partners
          </h2>
          <div className="overflow-hidden">
            <div className="flex items-center gap-12 opacity-60 whitespace-nowrap animate-marquee">
              {[...heroPartners, ...heroPartners].map((partner, index) => (
                <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300 shrink-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. MEET THE NEW ERA
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2
          className="font-heading text-[32px] font-bold uppercase leading-snug text-center"
          style={{
            background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          Meet the New Era of Influence
        </h2>
        <p className="mt-3 text-[16px] leading-relaxed text-[#063746]">
          An AI Influencer is more than a virtual face. It is a system of design, language, and emotion built to express your brand's unique voice across every platform.
        </p>

        <div
          className="mt-5 -mx-5 flex gap-3 overflow-x-auto pb-3"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
    {influencerTypes.map((type) => (
  <div key={type.title} className="shrink-0 w-45">
    <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
      
      {/* Background Image */}
      <Image
        src={type.image}
        alt={type.title}
        fill
        className="object-cover"
        sizes="180px"
      />

      {/* Default Text */}
      <div className="absolute top-0 left-0 z-10 p-3 transition-opacity duration-300 group-hover:opacity-0">
        <p className="font-heading text-[16px] font-medium leading-tight text-white">
          {type.title}
        </p>
        <p className="text-[14px] text-white/80">
          {type.type}
        </p>
      </div>

      {/* Hover Overlay */}
      <div
        className="absolute inset-0 z-20 flex flex-col justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backdropFilter: "blur(7px)",
          WebkitBackdropFilter: "blur(7px)",
          background: "rgba(6, 55, 70, 0.55)",
        }}
      >
        {/* Hover Title */}
        <div>
          <h3 className="font-heading text-[18px] font-medium leading-[1.2] text-white">
            {type.title}
          </h3>
          <p className="text-[16px] leading-[1.3] text-white">
            {type.type}
          </p>
        </div>

        {/* Hover Description */}
        <p
          className="text-[12px] leading-[1.4] text-white"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {type.description}
        </p>
      </div>
    </div>
  </div>
))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. THE SPECTRUM — accordion
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pb-10" style={safePx}>
        <h2 className="font-heading text-[28px] font-bold leading-snug text-[#063746]">
          The Spectrum of AI Influencers
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-[#063746]/70">
          AI Influencers are a spectrum of intelligent digital personas built to represent brands in new ways. From brand ambassadors to stylized mascots, each type serves a unique role.
        </p>

        {/* Image for active item */}
        <div className="mt-5 overflow-hidden rounded-2xl">
          <Image
            src={[
              "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3ae0f1a7-9f73-4c29-9d1e-f45ca0381b00/public",
              "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a0e9404d-c437-42b7-1433-144fff823900/public",
              "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cea0a78c-9afa-4922-39c1-49bbb3c88d00/public",
              "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0ffc2a21-abab-4878-398a-3d49d9f4bc00/public",
            ][openIndex >= 0 ? openIndex : 0]}
            alt={items[openIndex >= 0 ? openIndex : 0]?.title ?? "AI Influencer"}
            width={600}
            height={400}
            className="w-full object-cover transition-all duration-500"
            sizes="100vw"
          />
        </div>

        {/* Accordion */}
        <div className="mt-4 flex flex-col">
          {items.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div key={index} className="border-t border-[#063746]/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`text-[16px] font-medium transition-colors ${isOpen ? "text-[#0A7D94]" : "text-[#063746]"}`}>
                    {item.title}
                  </span>
                  {isOpen
                    ? <ChevronUp size={18} className="shrink-0 text-[#0A7D94]" />
                    : <ChevronDown size={18} className="shrink-0 text-[#063746]/40" />
                  }
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[13px] leading-relaxed text-[#5C5C5C]">{item.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-[#063746]/10" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. EVERY INDUSTRY — filter + grid
      ══════════════════════════════════════ */}
      <section className="bg-dark-bg py-10">
        <div style={safePx}>
          <h2 className="font-heading text-[36px] font-bold leading-[1.1] text-[#1CE3F4]">
            Every Industry Deserves Its Own Voice.
          </h2>
          <p className="mt-4 text-[14px] leading-relaxed text-white/60">
            Our AI Influencers reflect the diversity of industries and audiences. Each one is designed to translate brand values into intelligent, visual communication.
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-white/60">
            Choose from our curated library or request a bespoke creation developed exclusively for your brand.
          </p>
          <Link href="/m/ai-solutions/ai-influencer/templates">
            <button className="mt-6 flex items-center gap-3 rounded-full bg-[#1CE3F4] pl-6 pr-3 py-3 text-[16px] font-medium text-[#0E4252]">
              Explore The Collection
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#039EB7] text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
          </Link>
        </div>

        {/* Filters — horizontal scroll */}
        <div
          className="mt-6 flex gap-2 pb-2"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", overflow: "scroll", scrollbarWidth:"none" }}
        >
          {filters.map((item, index) => (
            <div key={index} className="relative shrink-0">
              <button
                onClick={() => setOpenFilter(openFilter === index ? null : index)}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13px] font-medium text-dark-bg whitespace-nowrap"
              >
                {selectedFilters[index]}
                <svg className={`h-3 w-3 transition-transform ${openFilter === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFilter === index && (
                <div className="absolute left-0 top-full z-50 mt-1 min-w-44 overflow-hidden rounded-xl bg-white shadow-2xl">
                  <div className="max-h-60 overflow-y-auto">
                    {filterOptions[index].map((option, i) => (
                      <div
                        key={i}
                        className="cursor-pointer border-b border-gray-100 px-4 py-3 text-[13px] text-gray-700 last:border-none active:bg-gray-100"
                        onClick={() => handleFilterSelect(index, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Remove fixed overlay — no longer needed */}

        {/* Influencer cards — horizontal scroll */}
        <div
          className="mt-5 flex gap-3 overflow-x-auto pb-3"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {filteredInfluencers.length === 0 ? (
            <p className="text-[14px] text-white/60 py-8">No influencers match the selected filters.</p>
          ) : (
            filteredInfluencers.map((item, idx) => (
              <div key={`${item.name}-${idx}`} className="shrink-0 w-[55vw] max-w-55">
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="220px" />
                  {/* Industry tag top-right */}
                  <div className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase ${bgColors[item.type] ?? "bg-white/80"}`}>
                    {item.type}
                  </div>
                  {/* Bottom row: name badge + plus button */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 rounded-full bg-[#063746]/80 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="text-[11px] font-medium text-white">{item.name}</span>
                      <span className="text-[12px]">🇹🇷</span>
                    </div>
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white cursor-pointer"
                      onClick={() => setPopupInfluencer({
                        name: item.name,
                        archetype: item.archetype,
                        industry: item.type,
                        image: item.image,
                        country: "TR"
                      })}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#012F3B" strokeWidth="2">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mt-1.5 text-[11px] italic text-white/50">&quot;{item.archetype}&quot;</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. MARQUEE — "DEFINE ✻ DESIGN ✻ DEVELOP" (2 rows)
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
                    className="inline-block shrink-0 pr-32 font-heading font-normal uppercase text-dark-bg"
                    style={{ fontSize: "73px", lineHeight: "1" }}
                  >
                    DEFINE{" "}
                    <span className="mx-4 inline-block align-middle text-dark-bg">
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
                    <span className="mx-4 inline-block align-middle text-dark-bg">
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
                    <span className="mx-4 inline-block align-middle text-dark-bg">
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
                    className="inline-block shrink-0 pr-32 font-heading font-normal uppercase text-dark-bg"
                    style={{ fontSize: "73px", lineHeight: "1" }}
                  >
                    DEFINE{" "}
                    <span className="mx-4 inline-block align-middle text-dark-bg">
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
                    <span className="mx-4 inline-block align-middle text-dark-bg">
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
                    <span className="mx-4 inline-block align-middle text-dark-bg">
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

      {/* ══════════════════════════════════════
          8. FROM IDEA TO IDENTITY — process
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[28px] font-semibold leading-snug text-[#063746]">
          From Idea to Identity
        </h2>
        <p className="mt-3 text-[18px] font-medium leading-relaxed text-[#063746]">
          Your brand deserves a voice of its own. We create intelligent, expressive AI Influencers that embody your values and connect with audiences globally.
        </p>
        <Link href="/m/start-project">
          <button className="mt-5 rounded-full px-6 py-3 text-[14px] font-medium text-white" style={{ backgroundColor: "#063746" }}>
            Start Your Project
          </button>
        </Link>

        <div className="mt-8 flex flex-col">
          {processSteps.map((step) => (
            <div key={step.num} className="border-t border-[#063746]/10 pt-5 pb-5">
              <div className="flex items-baseline gap-3">
                <span className="text-[18px] font-medium text-[#063746]/50">{step.num}</span>
                <h3 className="font-heading text-[34px]  text-[#063746] leading-tight">{step.title}</h3>
              </div>
              <p className="mt-2 text-[16px] leading-relaxed text-[#063746]">{step.description}</p>
            </div>
          ))}
          <div className="border-t border-[#063746]/10" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. 4D METHOD
      ══════════════════════════════════════ */}
      <section className="" style={{ backgroundColor: "#F0F2EF", height: "500px" }}>
        <h2
          className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]"
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          How it Works
        </h2>

        {/* Cards fan layout */}
        <div
          className="relative mx-auto flex items-center justify-center gap-20"
          style={{ height: "400px", maxWidth: "1000px" }}
        >
          {/* Connecting image */}
          {/* <img
          src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5b237882-4b7c-42ee-ed94-21743ef81d00/public"
          alt="connecting line"
          className="absolute top-[70%] left-[8%] right-[8%] z-0 w-[84%] object-cover -translate-y-1/2"
        /> */}

          {methodSteps.map((step, i) => (
            <div
              key={step.title}
              className="relative z-10 shrink-0"
              style={{
                transform: `rotate(${step.rotate}) translateY(${i === 0 ? "140px" : i === 1 ? "20px" : i === 2 ? "20px" : "140px"})`,
                marginLeft: i === 0 ? "0" : "-10px",
              }}
            >
              <div
                className="w-52.5 h-69 rounded-3xl p-4 flex flex-col shadow-lg"
                style={{ backgroundColor: step.bg }}
              >
                {/* Number */}
                <span
                  className="text-[18px] opacity-50 text-center"
                  style={{ color: step.textColor, fontFamily: "var(--font-body)" }}
                >
                  {step.num}
                </span>

                {/* Icon */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-10 h-10 opacity-80"
                    style={{ transform: `rotate(${i === 0 ? "33deg" : i === 3 ? "-33deg" : "0deg"})` }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-[28px]  leading-tight mb-3 text-center"
                  style={{ color: step.textColor, fontFamily: "Bricolage Grotesque, sans-serif" }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-xs leading-normal opacity-70 text-center"
                  style={{ color: step.textColor, fontFamily: "var(--font-body)" }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
         10. USE CASES — scrollable cards with tabs
      ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-10">
        {/* Heading */}
        <h2 className="text-center font-heading text-[32px] font-bold uppercase leading-tight text-[#063746] mb-6" style={safePx}>
          Use Cases
        </h2>

        {/* Scrollable category tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {["Real Estate", "Food", "Fashion", "Tech & Digital", "Wellness", "Consulting"].map((tab, i) => (
            <button
              key={tab}
              className="shrink-0 rounded-full px-5 py-2.5 text-[14px] font-medium transition whitespace-nowrap"
              style={{
                background: i === 0 ? "#063746" : "transparent",
                color: i === 0 ? "#fff" : "#063746",
                border: i === 0 ? "none" : "1.5px solid #063746",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable video cards */}
        <div
          className="mt-5 flex gap-3 overflow-x-auto pb-3"
          style={{ paddingLeft: "max(20px, env(safe-area-inset-left))", paddingRight: "max(20px, env(safe-area-inset-right))", scrollbarWidth: "none" }}
        >
          {[
            { title: "Vesta Global", video: "c6727f63163d214df0ef35997644d8d2", tags: ["Visual Style Definition", "AI Model Selection & Optimization", "Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "df994cb7f01eed564047b8323e82eb47", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Vesta Global", video: "cec8f6e44f63bb833b4b9b71452d48cb", tags: ["Use-Case Development", "Prompt Crafting"] },
            { title: "Nadlan Star", video: "f9b719e86584fee5e05197a5e4c5e840", tags: ["Visual Style Definition", "Prompt Crafting"] },
          ].map((item, i) => (
            <div key={i} className="shrink-0 w-[75vw] max-w-75">
              <div className="relative overflow-hidden rounded-2xl bg-[#D9D9D9]" style={{ aspectRatio: "9/14" }}>
                <video
                  src={`https://customer-avhhoygwtxxdpkyp.cloudflarestream.com/${item.video}/manifest/video.m3u8`}
                  autoPlay muted loop playsInline
                  className="h-full w-full object-cover"
                />
                {/* Tags overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] text-[#063746] backdrop-blur-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-2 font-heading text-[16px] font-semibold text-[#063746]">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          11. PARTENERS
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[40px] font-bold uppercase leading-none text-[#063746] mb-6">
          Partners
        </h2>

        {/* Top row — 2 wide cells */}
        <div className="border border-[#C3C3C3]">
          <div className="grid grid-cols-2">
            {partners.slice(0, 2).map((partner) => (
              <div key={partner.name} className="flex h-35 items-center justify-center border-r border-[#C3C3C3] last:border-r-0">
                {partner.image ? (
                  <img src={partner.image} alt={partner.name} className="max-h-15 max-w-30 object-contain" />
                ) : (
                  <span className="font-heading text-lg font-semibold text-[#063746]/40">{partner.name}</span>
                )}
              </div>
            ))}
          </div>

          {/* Bottom row — 3 equal cells */}
          <div className="grid grid-cols-3 border-t border-[#C3C3C3]">
            {partners.slice(2).map((partner) => (
              <div key={partner.name} className="flex h-30 items-center justify-center border-r border-[#C3C3C3] last:border-r-0">
                {partner.image ? (
                  <img src={partner.image} alt={partner.name} className="max-h-12.5 max-w-22.5 object-contain" />
                ) : (
                  <span className="font-heading text-base font-semibold text-[#063746]/40">{partner.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          12. FAQ
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10">
        <div className="rounded-[20px] bg-dark-bg p-5">
          <h2 className="mb-5 font-heading text-[36px] font-medium uppercase text-[#FFFFFF]">
            FAQ
          </h2>
          <hr className="text-[#EBFFFF33]" />
          <div className="flex flex-col">
            {cmsFaqs.map((faq, i) => (
              <div key={i} className="border-b border-[#EBFFFF33]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-3 py-4 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="text-[16px] leading-snug text-[#FFFFFF]">{i + 1}. {faq.question}</span>
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center text-[16px] text-white transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${openFaq === i ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="text-[12px] leading-relaxed text-[#90B2BD]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 h-50">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/73a7b6be-f52c-4654-74ee-8749e23d0a00/public" alt="FAQ Support" className="w-full h-full mx-auto object-cover rounded-xl" />
          </div>
          <div className="mt-5 text-start">
            <p className="text-[26px] font-medium text-white">Live FAQ</p>
            <p className="mt-1 text-[28px] font-bold text-white">Didn&apos;t find your answer?</p>

            <Link href="/lets-connect" className="w-full justify-center mt-4 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-2.5 text-[18px] font-medium text-dark-bg active:opacity-80">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          13. Form
      ══════════════════════════════════════ */}
      <section className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[32px] font-bold leading-[1.2]" style={{ color: "#039EB7" }}>
          Let&apos;s Build What&apos;s Next, Together.
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#063746]/70">
          Whether you&apos;re exploring AI solutions or ready to start a custom project, our team is here to help you design intelligent systems that move your business forward.
        </p>

        <div className="mt-8 flex flex-col gap-5">
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Full Name *</label>
            <input type="text" placeholder="Your name and last name" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Email Address *</label>
            <input type="email" placeholder="example@domain.com" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Company Name</label>
            <input type="text" placeholder="Your employer's name" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Country</label>
            <input type="text" placeholder="Your country of residence" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Industry</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option value="">Please select</option>
                <option>Real Estate</option>
                <option>Fashion</option>
                <option>Food</option>
                <option>Tech & Digital</option>
                <option>Wellness</option>
                <option>Consulting</option>
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BABABA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Select Influencer *</label>
            <div className="relative">
              <select className="w-full appearance-none rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none bg-white">
                <option value="">Please select</option>
                <option>AI Brand Ambassador</option>
                <option>AI Influencer</option>
                <option>AI Blogger</option>
                <option>AI Mascot</option>
              </select>
              <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#BABABA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          <div>
            <label className="block text-[13px] text-[#3F444E] mb-1.5">Details regarding your question, if any</label>
            <textarea rows={5} className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none resize-none" />
          </div>

          <button className="w-[60%] rounded-full py-4 font-heading text-[20px] text-white" style={{ backgroundColor: "#0A7D94" }}>
            Send
          </button>
        </div>
      </section>

      {/* Influencer Popup Modal */}
      <InfluencerPopupModal
        open={!!popupInfluencer}
        onClose={() => setPopupInfluencer(null)}
        influencer={popupInfluencer}
      />
    </>
  );
}
