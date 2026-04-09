"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout";
import HlsPlayer from "@/components/desktop/video";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";
import { cmsApi, type Faq } from "@/lib/api";
import HeroPartnersSection from "@/components/desktop/HeroPartnersSection";
import FourDMethodSection from "@/components/desktop/FourDMethodSection";
import ContentAtScale from "@/components/desktop/ContentAtScale";
import FaqSection from "@/components/desktop/FaqSection";
import UseCaseCarousel from "@/components/desktop/UseCaseCarousel";
import PartnersSection from "@/components/desktop/PartnersSection";

/* ─── Data ─── */

const heroPartners = ["VG", "brother", "Vestine", "OPTIMUM", "ColaSel", "Colorful"];

const meaningItems = [
  {
    title: "AI-driven storyboarding and pre-production",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/04f4cb07-ecde-4e20-c763-0cb3838ead00/public",
  },
  {
    title: "Real-time generation of scenes and assets",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce155513-8c81-4907-0bf1-63fa581de400/public",
  },
  {
    title: "Cinematic output without the studio overhead",
    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d1d5fb05-4289-4080-54f1-18fbdfdece00/public",
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




const generateItems = [
  {
    title: "Brand and campaign films",
    vedio: "67280354826bc7e849dcf374cb99c759"
  },
  {
    title: "Digital commercials",
    vedio: "1944567a71eb965b43587e4827fe4d72"
  },
  {
    title: "Product and launch videos",
    vedio: "b2816aa7fba4ac757f3034e886c69cc0"
  },
  {
    title: "Hero videos for integrated campaigns",
    vedio: "24de38b44fb5a937655b4bb88d5feb37"
  },
];

const useCaseCards = [
  { title: "Vesta Global", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c8c8cf4a-7c43-4965-3eb9-273d07e05800/public" },
  { title: "Bizim Mutfak", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/81574077-c99c-413c-6012-8e10bf34f000/public" },
  { title: "Realkom", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2394166e-4704-4ac0-0458-e6a3f7372f00/public" },
  { title: "Brother", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/04f4cb07-ecde-4e20-c763-0cb3838ead00/public" },
];

const toolIcons = [
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/f46dbb54-c366-4922-ddbe-0be442b6af00/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/79ad8341-ddac-4e20-41d6-bf65ab711500/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a6646f63-84e1-4a9b-820d-b7063f47cd00/public",
  "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/72101ace-0e03-4f71-0a20-d3bfc51e7f00/public",
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

  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, [
    AutoPlay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);


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
      .catch(() => { });
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "AI COMMERCIAL PRO..."
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden  pb-16 pt-40">
        {/* Hero image — right side */}
        <div className="absolute right-0 top-0 h-full w-full">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/4a7bbe61-767f-462a-df7d-807b71ae4d00/public"
            alt="AI Commercial showcase"
            fill
            className="object-cover object-left"
            sizes="55vw"
            priority
          />
          <div className="absolute inset-0  to-transparent" />
        </div>

        {/* Marquee heading */}


        <div className="overflow-hidden whitespace-nowrap mt-[-70px]">
          <div className="flex animate-marquee">
            <h1 className="text-[140px] text-white whitespace-nowrap">
              AI COMMERCIAL PRODUCTION
            </h1>
          </div>
        </div>

        {/* Subtitle + CTAs */}
        <div className="relative z-10 mt-10 px-[60px]">
          <h2 className="max-w-lg font-heading text-[28px] font-medium leading-[1.2] text-white">
            A New Approach To
            <br />
            Commercial Production.
          </h2>
          <p
            className="mt-4 max-w-lg text-[18px] leading-[1.6] text-white/70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            AI supports production while creativity leads every decision.
          </p>

          {/* Down arrow + CTA */}
          <div className="mt-[60px] flex items-start flex-col gap-4">
            <div className="flex items-center justify-center">
              <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-[90px] w-auto" aria-label="Scroll down">
                <g clipPath="url(#arrow-clip)">
                  <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="arrow-clip">
                    <rect width="98.9811" height="122" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <Link href="#discover" className="font-heading text-[25px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              Discover Our Creative Approach
            </Link>
          </div>


        </div>

        {/* [SCROLL] text */}
        <div className="absolute bottom-10 right-[60px] z-10">
          <p className="text-[16px] tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>[SCROLL]</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. PARTNERS ROW
          ════════════════════════════════════════════════════════ */}
      <HeroPartnersSection />

      {/* ════════════════════════════════════════════════════════
          3. WHAT AI COMMERCIAL PRODUCTION MEANS AT DDIP.AI
          ════════════════════════════════════════════════════════ */}





      <section id="discover" className="relative bg-light-bg py-16">
        <div className="px-[60px]">



          <div className="absolute left-0 top-[45%] -translate-y-1/2 -translate-x-1/2 z-10">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/79ad8341-ddac-4e20-41d6-bf65ab711500/public" className="w-[120px] h-[120px] object-contain" style={{ transform: "rotate(24.73deg)" }} />
          </div>



          <div className="absolute bottom-[-50px] left-1/2 right-[620px] -translate-x-1/2 translate-y-1/2 z-10">
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/72101ace-0e03-4f71-0a20-d3bfc51e7f00/public" className="w-[130px] h-[130px] object-contain" style={{ transform: "rotate(-29.82deg)" }} />
          </div>



          <div className="flex items-start justify-between mb-12">
            <div className="w-[60%]">
              <h2 className="font-heading text-[60px] font-medium leading-[1.1] text-[#063746]">
                What AI Commercial<br />Production Means At Ddip.ai
              </h2>
              <p className="mt-4 text-[16px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                AI commercial production at DDIP is not about replacing creativity.
              </p>
            </div>
            <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/79ad8341-ddac-4e20-41d6-bf65ab711500/public" className="w-[130px] h-[130px] object-contain relative -left-[100px]" />
          </div>



          <div className="flex gap-12 items-start relative">

            <div className="flex flex-col gap-3 w-[50%]">

              <div className="flex gap-1.5 ml-[80px] justify-end">

                <div className="relative h-[103px] w-[400px] overflow-hidden rounded-[6px] bg-[#D9D9D9] mr-[180px]">

                  <Image src={"https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c8c8cf4a-7c43-4965-3eb9-273d07e05800/public"} alt="" height={103} width={463} className="object-cover" style={{ height: "103px" }} />
                </div>

              </div>

              <div className="flex gap-1.5 items-center ml-[40px] justify-start relative left-[-100px]">
                <div className="relative h-[89px] w-[300px] overflow-hidden rounded-[6px] bg-[#D9D9D9]">
                  <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d1d5fb05-4289-4080-54f1-18fbdfdece00/public" alt="" fill className="object-cover" />
                </div>

                <div className="relative h-[89px] w-[300px] overflow-hidden rounded-[6px] bg-[#D9D9D9]">
                  <Image src={`https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce155513-8c81-4907-0bf1-63fa581de400/public`} alt="" fill className="object-cover" />
                </div>
              </div>

              <div className="flex gap-1.5 justify-start">
                <div className="relative h-[90px] w-[400px] overflow-hidden rounded-[6px] bg-[#D9D9D9]">
                  <Image src={`https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/04f4cb07-ecde-4e20-c763-0cb3838ead00/public`} alt="" fill className="object-cover" />
                </div>
              </div>

              <div className="flex gap-1 rounded-[8px] overflow-hidden bg-[#1A1A1A] p-1.5">
                <div className="relative h-[82px] flex-1 overflow-hidden rounded-[4px] bg-[#333]" style={{ width: '600px' }}>
                  <Image src="/images/ai-commercial/thirdimageaicommercial.png" alt="" fill className="object-cover" />
                </div>

              </div>

              <div className="flex gap-1 rounded-[8px] overflow-hidden bg-[#1A1A1A] p-1.5 relative left-[-150px]">
                <div className="relative h-[78px] flex-1 overflow-hidden rounded-[4px] bg-[#333]">
                  <Image src="/images/ai-commercial/fourthimageofaicomercial.png" alt="" fill className="object-cover" />
                </div>

              </div>
            </div>

            <div className="flex flex-col gap-6 w-[50%] relative" style={{ alignItems: "end" }}>

              <div className="absolute -top-[70px] left-[115px] z-10">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a6646f63-84e1-4a9b-820d-b7063f47cd00/public" className="w-[170px] h-[170px] object-contain" style={{ transform: "rotate(11.17deg)" }} />
              </div>

              <div className="relative">

                <div className="overflow-hidden rounded-[12px]" style={{ border: "1.5px dashed #063746/40" }}>
                  <HlsPlayer
                    src="674ae5c4363ac80438bcfe52196530f7"
                    autoPlay={true}
                    controls={false}
                    muted={true}
                    loop={true}
                    fillHeight={false}
                    fillWidth={false}
                    className="w-[630px] h-[375px] object-cover rounded-[12px]"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-heading text-[28px] font-medium text-[#063746]">It's about expanding it.</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                  We use AI as a production layer to explore ideas faster, visualize concepts earlier, and produce digital-first commercials with greater creative freedom — without losing narrative clarity or visual quality.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════
          4. WHAT WE GENERATE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <h2 className="font-heading text-[48px] font-medium leading-[1.05] text-[#063746]">
              What We Produce
            </h2>
            <p
              className="text-[20px] leading-[1.6] text-[#063746]/60"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We create AI-assisted commercial films designed for modern, digital-first campaigns.
            </p>
          </div>

          {/* Showcase — auto-scrolling horizontal carousel */}
          <div className="mt-12 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {[...generateItems, ...generateItems].map((item, i) => (
                <div key={i} className="shrink-0 w-[320px] gap-4">
                  <div className="relative h-[500px] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                    <HlsPlayer
                      src={item.vedio}
                      autoPlay={true}
                      controls={false}
                      muted={true}
                      loop={true}
                      fillHeight={true}
                      className="object-cover w-full"
                    />

                  </div>
                  <p className="mt-4 text-[16px] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Statement */}
          <p
            className="mt-12 text-[20px] w-[450px] leading-[1.6] text-[#145365]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Each film is built around a clear message, visual language, and story.
          </p>
        </div>
      </section>



      {/* ════════════════════════════════════════════════════════
          4. OUR 4D METHOD
          ════════════════════════════════════════════════════════ */}
      <FourDMethodSection />


      {/* ════════════════════════════════════════════════════════
          4.5. CONTENT AT SCALE — dark card
          ════════════════════════════════════════════════════════ */}
      <ContentAtScale
        heading="Expanding Creative Possibilities With AI"
        description1="AI allows us to push creative boundaries without increasing complexity."
        description2=""
        descriptionClassName="w-[300px]"
        tagline="The result is not just an automation - it’s creative acceleration."
        bgImage="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6fdebd9a-9938-43d8-45b7-c990b5b92500/public"
        bgOpacity="opacity-60"
        features={[
          { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/834b85e5-e315-4bb4-fca3-0287a4505000/public", label: "Faster pre-production and visualization" },
          { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/261ea08b-ff9b-4458-9d4e-b38561a6e800/public", label: "Greater flexibility in creative exploration" },
          { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2a980055-2831-4df3-4e5f-696434fb0f00/public", label: "Easier adaptation across formats and markets" },
          { icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5de7cba3-0419-4598-e2fc-de3af00cca00/public", label: "More room for bold ideas with lower production risk" },
        ]}
      />

      {/* ════════════════════════════════════════════════════════
          5. USE CASES — Cards grid
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">

          {/* Heading */}
          <h2 className="text-center text-[50px] font-medium leading-[1.1]"
            style={{ fontFamily: "Bricolage Grotesque", color: "#063746" }}>
            Use Cases
          </h2>
          <p className="mx-auto mt-4 max-w-7xl text-center text-[24px] leading-[1.6]"
            style={{ color: "#063746" }}>
            AI content generation supports different creative needs, from always-on content to campaign launches.
          </p>

          {/* 5 cards row */}
          <div className="mt-12 flex gap-[14px] justify-center items-center">
            {[
              { icon: "/images/ai-content/icon2.svg", label: "Brand campaigns and product launches" },
              { icon: "/images/ai-content/icon4.svg", label: "Social media content ecosystems" },
              { icon: "/images/ai-content/icon5.svg", label: "Editorial and blog visuals" },
              { icon: "/images/ai-content/icon1.svg", label: "Event and announcement assets" },
              { icon: "/images/ai-content/icon3.svg", label: "E-commerce and catalog visuals" },
            ].map((item, i) => (
              <div key={i} className="flex flex-1 items-center gap-3"
                style={{ background: "#002834", backdropFilter: "blur(45.31px)", width: "304px", height: "97.6px", borderRadius: "7.33px", padding: "8.8px 13.2px" }}>
                <div className="flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-[8px]  border border-[#FFFFFF4D]">
                  <Image src={item.icon} alt={item.label} width={25} height={25} />
                </div>
                <span className="text-[18px] leading-[1.5] text-center"
                  style={{ fontFamily: "Bricolage Grotesque", color: "#FFFFFF" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-[26px] font-medium"
            style={{ fontFamily: "SF Pro Display", color: "#063746" }}>
            At DDIP.AI, each project starts with a story.
          </p>
          <div className="mt-[100px]">
            <UseCaseCarousel items={[
              { title: "Vesta Global", video: "c6727f63163d214df0ef35997644d8d2", tags: ["Campaign Visuals", "Brand Identity"] },
              { title: "Bizim Mutfak", video: "df994cb7f01eed564047b8323e82eb47", tags: ["Social Media", "Content Variations"] },
              { title: "Realkom", video: "cec8f6e44f63bb833b4b9b71452d48cb", tags: ["Short-form Content", "Prompt Crafting"] },
              { title: "Brother", video: "f9b719e86584fee5e05197a5e4c5e840", tags: ["Editorial Visuals", "Brand Campaigns"] },
            ]} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. OUR TOOL ECOSYSTEM
          ════════════════════════════════════════════════════════ */}



      <section className="bg-light-bg py-10">
        <div className="">
          <h2 className="text-center font-heading text-[56px] font-bold leading-[1.1] text-[#126478]">
            Our Tool Ecosystem
          </h2>
          <p
            className="mx-auto mt-4 max-w-6xl text-center text-[26px] leading-[1.6] text-[#063746]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Our ecosystem is built around selecting the right AI tools for each creative challenge.
            The real value comes from how these tools are orchestrated to support storytelling and visual quality.
          </p>

        </div>
      </section>



      {/* ════════════════════════════════════════════════════════
          7. PARTNERS
          ════════════════════════════════════════════════════════ */}
      <PartnersSection />

      {/* ════════════════════════════════════════════════════════
          8. FAQ — Dark rounded card
          ════════════════════════════════════════════════════════ */}
      <FaqSection leftQuestions={cmsFaqLeft} rightQuestions={cmsFaqRight} />

      {/* ════════════════════════════════════════════════════════
          9. CTA
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div
          className="mx-[60px] flex items-center justify-between rounded-[20px] px-[60px] py-[60px]"
          style={{ background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)" }}
        >
          <h2 className="font-heading text-[28px] font-bold leading-[1.2] text-[#EBFFFF]">
            Let&apos;s design what&apos;s next together.
          </h2>
          <Link
            href="/start-project"
            className="inline-flex items-center justify-center rounded-full bg-[#1CE3F4] px-[26px] transition-opacity hover:opacity-90"
            style={{ height: "64px" }}
          >
            <span
              className="text-[24px] font-medium leading-[1.2] text-[#002834]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Begin Your Transformation
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
