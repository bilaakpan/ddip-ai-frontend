"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout";
import HlsPlayer from "@/components/desktop/video";
/* ─── Data ─── */

const projectCards = [
  { title: "Understanding the brand", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a2d5d052-049b-4c2c-9925-c2bc1f2e1a00/public" },
  { title: "Understanding the business challenge", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d0845db1-d5af-44ff-1964-a82639fa1f00/public" },
  { title: "Understanding the audience, culture, and context", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/60853bec-454d-4315-9780-071492147100/public" },
];

const humanAiItems = [
  "Strategic Thinking",
  "Creative Direction",
  "Editorial Judgment",
  "Ethical Awareness",
];

const guideLabels = ["GUIDE IT.", "CHALLENGE IT.", "HUMANIZE IT."];

export default function TheMindBehindPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — "THE MIND BEHIND ✻"
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-dark-bg pb-16 pt-40">
        {/* BG video — right 70%, bottom 50% only */}
        <div className="absolute z-0" style={{ right: 0, bottom: 0, width: "70%", height: "50%" }}>
          <HlsPlayer
            src="2eac757943335639efc39c031d9e1ac2"
            autoPlay={false}
            controls={false}
            muted={true}
            loop={true}
            fillHeight={true}
            className="h-full w-full object-cover opacity-40"
          />

          {/* Fade edges to match bg */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, var(--color-dark-bg) 0%, transparent 20%), linear-gradient(to bottom, var(--color-dark-bg) 0%, transparent 20%), linear-gradient(to left, transparent 80%, transparent 100%), linear-gradient(to top, transparent 80%, transparent 100%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, #002834 0%, transparent 25%)"
          }} />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to bottom, #002834 0%, transparent 30%)"
          }} />
        </div>

        <div className="overflow-hidden whitespace-nowrap mt-[-50px]">
          <div className="flex animate-marquee">
            <h1 className="text-[140px] text-white whitespace-nowrap">
              THE MIND BEHIND <span className="inline-block">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/154cd613-2d04-4634-41b3-834c90dc5800/public" className="h-[90px]" />
              </span>  THE MIND BEHIND <span className="inline-block">
                <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/154cd613-2d04-4634-41b3-834c90dc5800/public" className="h-[90px]" />
              </span>
            </h1>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-12 px-[60px]">
          <div>
            <h2 className="max-w-lg font-heading text-[60px] font-medium text-white" style={{ lineHeight: "99%" }}>
              Intelligence is powerful.
              <br />
              Humanity makes it meaningful.
            </h2>
            <p className="mt-4 max-w-lg text-[18px] leading-[1.6] text-white" style={{ fontFamily: "var(--font-body)" }}>
              At ddip.ai, we believe the future of brands is not built by AI alone — and not by humans alone either.
            </p>
            <p className="text-white mt-4">It is built in between.</p>



            {/* <div className="mt-[120px] flex items-start flex-col gap-4">
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
                Discover The Mind Behind
              </Link>
            </div> */}

          
          </div>
          
        </div>
         <div className="mt-[60px] flex flex-row items-end px-[60px] justify-between gap-4">
            <div className="flex flex-col gap-4 items-start">
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
            <div className="flex">
            <Link href="#discover" className="font-heading text-[25px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
                 Discover The Mind Behind
            </Link>
                    
</div>
  
</div>
<p className="text-[32px] tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>(SCROLL)</p>
          </div>

        {/* <div className="absolute bottom-10 right-[60px] z-10">
          <p className="text-[28px] tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>[SCROLL]</p>
        </div> */}
      </section>

      {/* ════════════════════════════════════════════════════════
          2. WHERE — Philosophy intro
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-16">
        <div className="px-[60px]">
          <div className="flex items-start justify-center gap-8">
            <h2 className="font-bold leading-[1] shrink-0" style={{ fontSize: "80px", color: "#00BCCF" }}>
              WHERE
            </h2>
            <div className="pt-4 space-y-1">
              <p style={{ fontSize: "20px", color: "#002834" }}>
                artificial intelligence amplifies creativity.
              </p>
              <p style={{ fontSize: "20px", color: "#002834" }}>
                human insight gives it direction.
              </p>
              <p style={{ fontSize: "20px", color: "#002834" }}>
                systems think fast — and people think deep.
              </p>
              <p className="mt-4 font-semibold" style={{ fontSize: "28px", color: "#063746" }}>
                This is the mind behind everything we design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. WE DON'T REPLACE HUMAN THINKING
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-16">
        <div className="px-[60px]">

          {/* Row 1: ✳ + WE DON'T REPLACE */}
          <div className="flex items-center gap-4">
            <span className="font-medium leading-none shrink-0" style={{ fontFamily: "Bricolage Grotesque", fontSize: "100px", color: "#002834" }}>✳</span>
            <h2 className="font-medium leading-[1.0] uppercase" style={{ fontFamily: "Bricolage Grotesque", fontSize: "100px", color: "#002834" }}>
              We Don&apos;t Replace
            </h2>
          </div>

          {/* Row 2: tagline left + HUMAN THINKING right */}
          <div className="flex items-end gap-8">
            <div className="shrink-0 pb-3 pl-[40px] min-w-[260px]">
              <p style={{ fontSize: "20px", color: "#002834", textAlign: "end" }}>AI is not our destination.</p>
              <p style={{ fontSize: "20px", color: "#002834", textAlign: "end" }}>It is our accelerator.</p>
            </div>
            <h2 className="font-medium leading-[1.0] uppercase" style={{ fontFamily: "Bricolage Grotesque", fontSize: "100px", color: "#002834" }}>
              Human Thinking.
            </h2>
          </div>

          {/* Row 3: WE EXPAND IT */}
          <h2 className="font-bold leading-[1.0] uppercase" style={{ fontSize: "140px", color: "#039EB7", textAlign: "center" }}>
            We Expand It.
          </h2>

          {/* Description — bottom right */}
          <div className="flex justify-end">
            <p className="max-w-[625px]" style={{ fontSize: "34px", color: "#002834" }}>
              We don&apos;t use AI to automate creativity away — we use it to free creative minds from limitations, repetition, and inefficiency.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. EVERY PROJECT STARTS WITH HUMAN UNDERSTANDING
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[36px] font-medium leading-[1.1] text-[#126478]">
            Every Project At Ddip.AI Starts With
            <br />
            Human Understanding:
          </h2>

          {/* 3 images with arrows between */}
          <div className="mt-16 flex items-center justify-center gap-0">
            {projectCards.map((card, i) => (
              <div key={card.title} className="flex items-center">
                {/* Card */}
                <div className="flex flex-col items-center">
                  <div className="relative overflow-hidden rounded-full" style={{ width: "230px", height: "230px" }}>
                    <Image src={card.image} alt={card.title} fill className="object-cover" sizes="230px" />
                  </div>
                  <p className="mt-4 text-center text-[28px] text-[#063746] max-w-[240px]" style={{ fontFamily: "var(--font-body)" }}>
                    {card.title}
                  </p>
                </div>

                {/* Arrow between cards */}
                {i < projectCards.length - 1 && (
                  <div className="flex items-center px-6 pb-12">
                    <svg width="200" height="16" viewBox="0 0 200 16" fill="none">
                      <line x1="0" y1="8" x2="188" y2="8" stroke="#039EB7" strokeWidth="1.5" />
                      <path d="M188 3L198 8L188 13" stroke="#039EB7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. HUMAN + AI, BY DESIGN
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="relative overflow-hidden rounded-[24px] px-12 py-14" style={{ background: "#002834" }}>

            {/* BG image */}
            <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d3ec1192-f7d6-4c41-86f4-83ae0813a800/public" alt="bg" fill className="object-cover" sizes="100vw" />

            {/* Content grid: left + center + right */}
            <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] gap-8 items-start">

              {/* Left — heading + numbered list */}
              <div>
                <h2 className="font-heading text-[36px] font-medium leading-[1.1] text-white">
                  Human + AI, By Design
                </h2>
                <p className="mt-2 text-[20px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>
                  Our approach is intentionally hybrid.
                </p>
                <p className="mt-6 text-[20px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>
                  Behind every AI-generated output, there is:
                </p>

                {/* Numbered items with vertical connecting line */}
                <div className="relative mt-6 flex flex-col gap-0">
                  {/* Vertical line */}
                  <div className="absolute left-[18px] top-[36px] bottom-[36px] w-px bg-white/20" />
                  {humanAiItems.map((item, i) => (
                    <div key={item} className="flex items-center gap-4 py-3 relative">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-[#002834] z-10">
                        <span className="text-[11px] text-white/60" style={{ fontFamily: "var(--font-body)" }}>
                          0{i + 1}
                        </span>
                      </div>
                      <span className="font-heading text-[16px] font-medium text-white">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-[24px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>
                  AI works with our teams —<br />not instead of them.
                </p>
              </div>

              {/* Center — empty (bg image shows through) */}
              <div className="w-[320px]" />

              {/* Right — 3 glassmorphism boxes + tagline */}
              <div className="flex flex-col gap-3 justify-center pt-16">
                {[
                  { role: "Designers", label: "GUIDE IT.", icon: "/images/mind-behind/icon-01.svg" },
                  { role: "Strategists", label: "CHALLENGE IT.", icon: "/images/mind-behind/icon-02.svg" },
                  { role: "Creators", label: "HUMANIZE IT.", icon: "/images/mind-behind/icon-03.svg" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4 rounded-[12px] px-5 py-4"
                    style={{ background: "#FFFFFF1A", backdropFilter: "blur(59.47px)" }}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-white/10">
                      <Image src={item.icon} alt={item.label} width={22} height={22} />
                    </div>
                    <div>
                      <p className="text-[11px] text-white/50" style={{ fontFamily: "var(--font-body)" }}>{item.role}</p>
                      <p className="font-heading text-[22px] font-bold text-white">{item.label}</p>
                    </div>
                  </div>
                ))}
                <p className="mt-3 text-[20px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>
                  This balance is what makes our work feel natural,<br />credible, and alive — not synthetic.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. A SYSTEM, NOT A SHORTCUT
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-light-bg py-24 overflow-hidden">
        <div className="px-[60px]">

          {/* Floating icons — absolute positioned */}
          <div className="absolute top-[100px] right-[230px] z-10">
            <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/814f5a17-3122-4cbb-f28d-35cab9058200/public" alt="icon" width={300} height={110} className="object-contain" />
          </div>
          <div className="absolute top-[290px] left-[400px] right-[80px] z-10">
            <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e80f3209-582e-45d0-4d75-94b93bc7e600/public" alt="icon" width={240} height={100} className="object-contain" />
          </div>
          <div className="absolute top-[430px] right-[170px] z-10">
            <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce65cf14-a5de-4cb8-0023-b0cee10b7100/public" alt="icon" width={280} height={120} className="object-contain" />
          </div>

          {/* Top heading + subtitle */}
          <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
            A System,<br />Not a Shortcut
          </h2>
          <p className="mt-4 text-[26px] text-[#002834] w-[330px]" style={{ fontFamily: "var(--font-body)" }}>
            We don&apos;t believe in one-size-fits-all AI solutions.
          </p>

          {/* "Every brand has" — outside flex, right side aligned */}
          <div className="mt-16 flex justify-end">
            <div className="w-[50%]">
              <p className="text-[18px] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>Every brand has:</p>
              <div className="flex items-start gap-4 mt-2">
                <h3 className="font-heading text-[64px] font-bold uppercase leading-[1] text-[#00BCCF]">
                  A DIFFERENT
                </h3>
                <div className="flex flex-col gap-1">
                  <span className="text-[16px] text-[#002834]" style={{ fontFamily: "var(--font-body)" }}>voice</span>
                  <span className="text-[16px] text-[#002834]" style={{ fontFamily: "var(--font-body)" }}>rhythm</span>
                  <span className="text-[16px] text-[#002834]" style={{ fontFamily: "var(--font-body)" }}>ambition</span>
                </div>
              </div>
              <p className="text-[18px] w-[250px] text-[#002834]" style={{ fontFamily: "var(--font-body)" }}>
                That&apos;s why we design custom AI systems, not generic outputs.
              </p>
            </div>
          </div>

          {/* Main content row — image left + bottom text right */}
          <div className="flex gap-16 items-start">

            {/* Left — single image */}
            <div className="shrink-0 w-[50%]">
              <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/9ac22dc8-19e4-47cd-ce11-6b503e251a00/public" alt="System" className="w-full h-auto rounded-[16px] object-contain" />
            </div>

            {/* Right — bottom text only */}
            <div className="flex-1 pt-4 mt-[100px]">
              <p className="mt-10 text-[30px] leading-[1.7] text-[#002834]" style={{ fontFamily: "var(--font-body)" }}>
                From AI influencers to brand ambassadors, from content engines to automated workflows - each solution is tailored, trained, and designed specifically for the brand it serves.
              </p>
              <p className="mt-6 text-[34px] font-medium leading-[1.4] text-[#145365]" style={{ fontFamily: "var(--font-body)" }}>
                AI IS NOT A SHORTCUT.<br />
                IT&apos;S A SYSTEM — AND SYSTEMS<br />
                NEED ARCHITECTS.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. MARQUEE — "WE DESIGN FOR BRANDS ✻ NOT FOR ALGORITHMS"
          ════════════════════════════════════════════════════════ */}

      <section className="overflow-hidden bg-[#F6F9F2] ">
        {/* <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              WE DESIGN FOR BRANDS,
              <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
            </h1>
            <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              WE DESIGN FOR BRANDS,
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              WE DESIGN FOR BRANDS,
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
            </h1>
          </div>
        </div> */}
      </section>


      {/* ════════════════════════════════════════════════════════
          8. BRANDS NEED SOMETHING DURABLE
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F6F9F2]">
        {/* Background image — full section */}
        <img
          src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/eba38997-062e-4147-aedc-756707da8200/public"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          aria-hidden="true"
        />
        <div className="w-full overflow-hidden pt-[60px]">
          <div className="flex w-max animate-marquee">
            <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              WE DESIGN FOR BRANDS,
              <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
            </h1>
            <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              WE DESIGN FOR BRANDS,
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              WE DESIGN FOR BRANDS,
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
            </h1>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(64px,10vw,120px)] sm:text-[clamp(48px,9vw,100px)] md:text-[clamp(64px,10vw,150px)]">
              NOT FOR ALGORITHMS
              <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
            </h1>
            <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(64px,10vw,120px)] sm:text-[clamp(48px,9vw,100px)] md:text-[clamp(64px,10vw,150px)]">
              NOT FOR ALGORITHMS
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              NOT FOR ALGORITHMS
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
            </h1>
          </div>
        </div>
        <div className="relative z-10 w-full px-[60px] pt-12">
          {/* Trends text — top-left */}
          <p className="leading-[1.5]" style={{ fontSize: "50px", color: "#145365", fontFamily: "var(--font-body)" }}>
            Trends change.
            <br />
            Platforms evolve.
            <br />
            Algorithms update overnight.
          </p>

          {/* Right copy block */}
          <div className="mt-16 flex justify-end">
            <div className="pt-[80px]">
              <p style={{ fontSize: "30px", color: "#145365", width: "520px", fontFamily: "var(--font-body)" }}>
                Brands, however, need something
                <br />
                more durable:
              </p>
              <div className="mt-4 space-y-1">
                {["clarity", "consistency", "emotional connection"].map((item) => (
                  <p key={item} style={{ fontSize: "30px", color: "#145365", fontFamily: "var(--font-body)" }}>
                    • {item}
                  </p>
                ))}
              </div>
              <p className="mt-8" style={{ fontSize: "32px", color: "#145365", lineHeight: "normal", fontFamily: "var(--font-body)" }}>
                That&apos;s why we design AI systems that serve brand
                <br />
                identity, not platform logic.
              </p>
              <p className="mt-4" style={{ fontSize: "32px", color: "#145365", lineHeight: "normal", fontFamily: "var(--font-body)" }}>
                Technology adapts. The brand remains
                <br />
                recognizable.
              </p>
            </div>
          </div>

          {/* Bottom lockup */}
          <div className="mt-48 flex items-end justify-center gap-2">
            <h2
              className="font-bold leading-[0.92] uppercase"
              style={{ fontFamily: "Bricolage Grotesque", fontSize: "130px", color: "#145365" }}
            >
              Always
            </h2>
            <div className="flex flex-col">
              <h3
                className="font-bold leading-[0.92] uppercase"
                style={{ fontFamily: "Bricolage Grotesque", fontSize: "75px", color: "#039EB7" }}
              >
                human
              </h3>
              <h3
                className="font-bold leading-[0.92] uppercase"
                style={{ fontFamily: "Bricolage Grotesque", fontSize: "75px", color: "#039EB7" }}
              >
                intentional
              </h3>
            </div>
          </div>
        </div>
      </section>



      {/* ════════════════════════════════════════════════════════
          10. THE FUTURE WE BELIEVE IN — dark card
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="relative overflow-hidden rounded-[24px]">

            {/* BG image — full, no opacity */}
            <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/819c196e-ab9b-41cf-8c00-d310b3b63500/public" alt="The Future" fill className="object-cover" sizes="100vw" />

            {/* Left — blurred text card */}
            <div className="relative z-10 flex h-full items-center p-10" style={{ minHeight: "680px" }}>
              <div className="max-w-[580px] h-[560px] rounded-[20px]" style={{ padding: "60px 50px", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(40px)" }}>
                <h2 className="font-heading text-[50px] font-medium leading-[1.1] text-[#EBFFFF]">
                  The Future We<br />Believe In
                </h2>
                <div className="mt-[60px] space-y-2">
                  <p className="text-[20px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>
                    We see a future where:
                  </p>
                  <ul className="space-y-1">
                    {[
                      "AI doesn't replace agencies — it redefines them",
                      "Creativity scales without losing its soul",
                      "Automation creates space for better ideas",
                      "Brands speak with more relevance, not more noise",
                    ].map(item => (
                      <li key={item} className="text-[20px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>• {item}</li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[20px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>
                    In this future, success belongs to those who can orchestrate intelligence, not just use it.
                  </p>
                  <p className="text-[20px] text-[#EBFFFF]" style={{ fontFamily: "var(--font-body)" }}>
                    That&apos;s the role we choose.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          11. THIS IS THE MIND BEHIND DDIP.AI
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg">
        <div className="px-[60px]">
          <p className="text-[#1CE3F4] font-heading text-[30px] font-medium">
            This is the Mind Behind ddip.ai
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          12. BOTTOM MARQUEE — "NOT AI-FIRST ✻ NOT HUMAN-ONLY"
          ════════════════════════════════════════════════════════ */}


      <section className="overflow-hidden bg-[#F6F9F2] ">
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              NOT AI-FIRST
              <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
            </h1>
            <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              NOT AI-FIRST
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              NOT AI-FIRST
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
            </h1>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#F6F9F2]">
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              NOT HUMAN-ONLY
              <img src="/images/common/star.svg" alt="*" className="mx-10 h-18 w-18 relative top-[0.08em]" />
            </h1>
            <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[clamp(48px,8vw,96px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)]">
              NOT HUMAN-ONLY
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
              NOT HUMAN-ONLY
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-18 h-18 relative top-[0.08em]" />
            </h1>
          </div>
          <div className="flex flex-col items-end mx-10 py-8">
            <div>
              <p className="text-[#063746] font-heading text-[25px] font-medium ">Human-led intelligence.</p>
              <p className="text-[#063746] font-heading text-[25px] font-medium ">System-driven creativity.</p>
              <p className="text-[#063746] text-[25px] font-medium ">Designed for brands that want more than</p>
              <p className="text-[#063746] text-[25px] font-medium ">outputs — they want impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          13. CTA
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div
          className="mx-[60px] flex items-center justify-between rounded-[20px] px-[60px] py-[60px]"
          style={{ background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)" }}
        >
          <h2 className="font-heading text-[28px] font-bold leading-[1.2] text-[#EBFFFF]">
            Curious how this mindset turns into real systems?
          </h2>
          <div className="flex items-center gap-4">
            <Link href="/ai-solutions/ai-influencer/templates" className="rounded-full border border-[#063746]/20 px-6 py-2.5 font-heading text-[14px] font-medium text-[#063746] transition bg-[#1CE3F4]">
              Explore our AI Solutions
            </Link>
            <Link href="/start-project" className="rounded-full border border-white px-6 py-2.5 font-heading text-[14px] font-medium text-white transition">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
