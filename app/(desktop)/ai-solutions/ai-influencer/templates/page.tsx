"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";
import HeroPartnersSection from "@/components/desktop/HeroPartnersSection";
import ContactFormSection from "@/components/desktop/ContactFormSection";
import { InfluencerPopupModal, type PopupInfluencer } from "@/components/desktop/influencer-popUp";
/* ─── Data ─── */
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
const showcaseFilters = [
  {
    label: "Industry",
    options: ["All", "Real Estate", "Food", "Fashion", "Tech & Digital", "Wellness", "Consulting"],
  },
  {
    label: "Persona",
    options: ["All", "AI Brand Ambassador", "AI Influencer", "AI Blogger", "AI Mascot"],
  },
  {
    label: "Region",
    options: ["All", "European Market (EU)", "Turkey Market (TR)", "Middle East & North Africa"],
  },
  {
    label: "Gender",
    options: ["All", "Female", "Male", "Gender-Neutral"],
  },
  {
    label: "Language",
    options: ["All", "Turkish (TR)", "English (EN)", "Arabic (AR)"],
  },
];

export default function WorkWithInfluencerPage() {
  const [openFaqLeft, setOpenFaqLeft] = useState<number | null>(null);
  const [openFaqRight, setOpenFaqRight] = useState<number | null>(null);
  const [cmsFaqLeft, setCmsFaqLeft] = useState(faqLeft);
  const [cmsFaqRight, setCmsFaqRight] = useState(faqRight);
  const [openFilter, setOpenFilter] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<PopupInfluencer | null>(null);
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
      
        {/* ════════════════════════════════════════════════════════
          1. TOP INFLUENCERS
          ════════════════════════════════════════════════════════ */}
        <div className="mt-10 sm:mt-12 lg:mt-16 px-4 sm:px-8 lg:px-[22px]">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="text-[#CDE4EA]">
              <h3 className="text-[36px] leading-none text-white">Our Influencer</h3>
              <div className="mt-6 h-px w-full bg-[#8AA5AF]/35" />
              <div className="mt-6 space-y-5">
                {showcaseFilters.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 text-[16px] text-[#B8D4DB]">{group.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option, idx) => (
                        <button
                          key={option}
                          type="button"
                          className={`rounded-md border px-3 py-1.5 text-[12px] transition ${idx === 0
                              ? "border-[#2FB7CE] text-[#9EEFFF]"
                              : "border-[#597A84] text-[#8FB0B9] hover:border-[#7fa7b3] hover:text-[#c6edf5]"
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
              {[...topInfluencer.slice(0, 4), ...topInfluencer.slice(0, 4), ...topInfluencer.slice(0, 4)].map((item, idx) => (
                <article key={`${item.name}-${idx}`} className="group">
                  <div className="relative overflow-hidden rounded-[28px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={245}
                      height={392}
                      className="h-[392px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div
                      className="absolute right-5 top-5 rounded-full px-8 py-2 text-[12px] uppercase tracking-wide text-black"
                      style={{
                        backgroundColor:
                          idx % 4 === 2 ? "#E3DDF6" : idx % 4 === 1 ? "#F5D8D8" : "#DDE9CF",
                      }}
                    >
                      {item.type}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <div className="flex items-center  gap-3 rounded-full bg-[#2A5D6A] px-5 py-3 backdrop-blur-sm">
                          <span className="truncate text-[15px] text-white">{item.name}</span>
                          <img
                            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c6dfd82-c580-49a7-be40-a53090c65400/public"
                            alt="flag"
                            className="h-8 w-8 rounded-md object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F0F1] text-[#042B36]"
                          aria-label={`Open ${item.name}`}
                          onClick={() => {
                            setSelectedInfluencer({
                              name: item.name,
                              archetype: item.archetype,
                              industry: item.type,
                              image: item.image,
                            });
                            setPopupOpen(true);
                          }}
                        >
                          <svg
                            className="h-8 w-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </button>
                      </div>

                      <Link
                        href=""
                        className="flex h-[56px] w-full items-center justify-center gap-4 rounded-[16px] bg-[#0BB3D0] px-5 font-heading text-[14px] font-medium text-white transition-colors hover:bg-[#09a5c0]"
                      >
                        <span>Work With This Influencer</span>
                        <span className="text-[34px] leading-none">→</span>
                      </Link>
                    </div>
                  </div>
                  <p className="mt-3 text-[12px] italic leading-none text-[#88A9B3]">
                    "{item.archetype}"
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

      </section>


      {/* ════════════════════════════════════════════════════════
          12. CTA — "Let's Build What's Next, Together."
          ════════════════════════════════════════════════════════ */}
        <ContactFormSection variant="influencer" />

      <InfluencerPopupModal
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        influencer={selectedInfluencer}
      />
    </>
  );
}
