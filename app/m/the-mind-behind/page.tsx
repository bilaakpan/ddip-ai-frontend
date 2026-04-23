"use client";

import Link from "next/link";
import Image from "next/image";
import HlsPlayer from "@/components/desktop/video";

/* ─── Data ─── */
const projectCards = [
  { title: "Understanding the brand", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a2d5d052-049b-4c2c-9925-c2bc1f2e1a00/public" },
  { title: "Understanding the business challenge", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d0845db1-d5af-44ff-1964-a82639fa1f00/public" },
  { title: "Understanding the audience, culture, and context", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/60853bec-454d-4315-9780-071492147100/public" },
];

const humanAiItems = ["Strategic Thinking", "Creative Direction", "Editorial Judgment", "Ethical Awareness"];

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function MobileTheMindBehindPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          1. HERO
      ══════════════════════════════════════ */}
      <section className="relative bg-[#062830]">
        {/* Marquee */}
        <div className="relative z-10 overflow-hidden pt-3">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <span key={i} aria-hidden={i > 0} className="shrink-0 pr-10 font-heading text-[80px] uppercase leading-none text-white">
                THE MIND BEHIND <span className="text-[#1CE3F4]">?</span>&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Text block — same dark bg, no blur/overlay */}
        <div className="relative z-10 " style={safePx}>
          <h1 className="font-heading text-[22px] text-white">
            Intelligence is powerful.
            <br />Humanity makes it meaningful.
          </h1>
          <p className="mt-3 text-[16px] text-white ">
            At ddip.ai, we believe the future of brands is not built by AI alone - and not by humans alone either.
          </p>
        </div>

        {/* Video — no gap, bg color matches so it blends */}
        <div className="relative top-[-2px]">
          <p className="text-[16px] text-white absolute z-20 font-medium" style={{ ...safePx, top: '20px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
            It is built in between.
          </p>
          <HlsPlayer
            src="2eac757943335639efc39c031d9e1ac2"
            autoPlay={true}
            controls={false}
            muted={true}
            loop={true}
            className="w-full object-cover"
          />
          {/* Top fade: dark bg bleeds into video top */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#062830] to-transparent pointer-events-none z-10" />
          <div className="flex flex-col gap-4 absolute bottom-8 left-5 z-20">
            <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-12 w-12" aria-label="Scroll down">
              <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
            </svg>
            <a
              href="#discover"
              className="text-white underline decoration-white underline-offset-8 text-[18px]"
              style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
            >
              Discover Our Process
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. WHERE
      ══════════════════════════════════════ */}
      <section id="discover" className="bg-light-bg py-10" style={safePx}>
        <h2 className="font-heading text-[60px] font-bold leading-none text-[#00BCCF]">WHERE</h2>
        <div className="mt-3 space-y-1.5 text-[18px] text-dark-bg">
          <p>artificial intelligence amplifies creativity.</p>
          <p>human insight gives it direction.</p>
          <p>systems think fast — and people think deep.</p>
          <p className="mt-3 font-medium text-[25px] text-dark-bg">
            This is the mind behind everything we design.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. WE DON'T REPLACE HUMAN THINKING
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pb-10" style={safePx}>
        <div className="flex items-start gap-3">
          <span className="font-heading text-[48px] font-bold leading-none text-dark-bg shrink-0 mt-1">✳</span>
          <div>
            <h2 className="font-heading text-[40px] font-bold uppercase leading-[1.05] text-dark-bg">
              WE DON&apos;T REPLACE HUMAN THINKING.
            </h2>
            <h2 className="font-heading text-[39px] font-bold uppercase leading-[1.05] text-[#039EB7]">
              WE EXPAND IT.
            </h2>
            <p className="mt-6 text-[18px] leading-relaxed text-dark-bg">
              AI is not our destination.<br />It is our accelerator.
            </p>
            <p className="mt-4 text-[22px] leading-relaxed text-dark-bg">
              We don&apos;t use AI to automate creativity away — we use it to free creative minds from limitations, repetition, and inefficiency.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. EVERY PROJECT STARTS WITH HUMAN UNDERSTANDING
      ══════════════════════════════════════ */}
      <section className="bg-light-bg pb-10" style={safePx}>
        <h2 className="font-heading text-[28px] font-medium leading-snug text-[#126478]">
          Every Project At Ddip.AI Starts With Human Understanding:
        </h2>
        <div className="mt-8 flex flex-col items-center">
          {projectCards.map((card, i) => (
            <div key={card.title} className="flex flex-col items-center">
              {/* Image */}
              <div className="relative h-40 w-40">
                <Image src={card.image} alt={card.title} fill className="object-contain" sizes="160px" />
              </div>
              {/* Label */}
              <p className="mt-3 text-center text-[20px] leading-snug text-[#063746]">{card.title}</p>
              {/* Arrow — only between items */}
              {i < projectCards.length - 1 && (
                <div className="my-4 flex flex-col items-center">
                  <div className="h-8 w-px bg-[#00BCCF]" />
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                    <path d="M6 8L0 0H12L6 8Z" fill="#00BCCF" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. HUMAN + AI, BY DESIGN
      ══════════════════════════════════════ */}
      <section className="bg-dark-bg py-10" style={safePx}>
        {/* Background image above heading */}
        <div className="relative overflow-hidden  mb-5">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d3ec1192-f7d6-4c41-86f4-83ae0813a800/public"
              alt="Partnership"
              className="w-full object-cover h-[230px]"
            />
          </div>
          <div className="relative z-10 mt-5" style={{ background: "#002834" }}>
            <h2 className="font-heading text-[28px] font-medium text-white">Human + AI, By Design</h2>
            <p className="mt-1 text-[22px] text-white">Our approach is intentionally hybrid.</p>
            <p className="mt-10 text-[18px] text-white">Behind every AI-generated output, there is:</p>

            {/* Numbered items */}
            <div className="relative mt-4 flex flex-col gap-0">
              <div className="absolute left-5.5 top-9 bottom-9 w-px bg-white" />
              {humanAiItems.map((item, i) => (
                <div key={item} className="relative flex items-center gap-3 py-2.5">
                  <div className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white bg-dark-bg">
                    <span className="text-[20px] text-white">0{i + 1}</span>
                  </div>
                  <span className="font-heading text-[18px] font-medium text-white">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[18px] text-white">AI works with our teams
              <br />
              not instead of them.</p>

            {/* Guide/Challenge/Humanize pills */}
            <div className="relative mt-10 flex flex-col gap-6">
              {/* Dashed vertical line */}
              <div className="absolute left-[35px] top-[28px] bottom-[28px] border-l border-dashed border-[#7DA0AA]" />

              {[
                { role: "Designers", label: "GUIDE IT.", icon: "/images/mind-behind/icon-01.svg" },
                { role: "Strategists", label: "CHALLENGE IT.", icon: "/images/mind-behind/icon-02.svg" },
                { role: "Creators", label: "HUMANIZE IT.", icon: "/images/mind-behind/icon-03.svg" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="relative flex items-center gap-4 rounded-[4px] px-4 py-3"
                  style={{
                    background: "rgba(28, 69, 82, 0.9)",
                  }}
                >
                  {/* Icon box */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xs border border-[#FFFFFF1A] bg-[#1B4A57]">
                    <Image src={item.icon} alt={item.label} width={35} height={35} />
                  </div>

                  {/* Text */}
                  <div className="leading-tight">
                    <p className="text-[12px] font-normal text-white">
                      {item.role}
                    </p>
                    <p className="font-heading text-[26px] font-medium text-white tracking-[0.5px]">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[20px] leading-relaxed text-white">
              This balance is what makes our
              <br /> work feel natural, credible, and
              <br /> alive — not synthetic.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. A SYSTEM, NOT A SHORTCUT
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-light-bg py-8 overflow-hidden" style={safePx}>
        <h2
          className="font-heading font-medium leading-[1.05] text-[#063746]"
          style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
        >
          A System,<br />Not a Shortcut
        </h2>

        {/* Row 1: heading left, cube top-right */}
        <div className="flex relative  items-start justify-between ">
          <p
            className="mt-3 leading-snug text-[#002834]"
            style={{ fontSize: "clamp(16px, 2vw, 20px)", maxWidth: "85%" }}
          >
            We don&apos;t believe in one-size-fits-all AI solutions.
          </p>
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/36e68846-aece-49c8-bd71-10948ea0ea00/public"
            alt="voice cube"
            width={155}
            height={155}
            className="object-contain drop-shadow-xl "
          />
        </div>

        {/* Every brand has + A DIFFERENT */}
        <div className="">
          <p className="text-[20px] text-[#063746]">Every brand has:</p>
          <h3 className="font-heading text-[52px] font-bold uppercase leading-none text-[#00BCCF]">
            A DIFFERENT
          </h3>
          <p className="text-[22px] text-[#002834] text-right tracking-widest mt-1">
            voice &nbsp;&nbsp; rhythm &nbsp;&nbsp; ambition
          </p>
        </div>

        {/* Row 2: cube left, text right */}
        <div className="flex items-center mt-2">
          <div className="-ml-2 relative -left-7.5 w-[130px] h-[130px]">
            <Image
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e80f3209-582e-45d0-4d75-94b93bc7e600/public"
              alt="rhythm cube"
              width={120}
              height={120}
              className="object-contain drop-shadow-xl"
            />
          </div>
          <p className="text-[20px] leading-snug text-[#002834] flex-1">
            That&apos;s why we design custom AI systems, not generic outputs.
          </p>
        </div>

        {/* Row 3: cube bottom-right */}
        <div className="flex justify-end items-center">
          <div></div>
          <div >
            <Image
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce65cf14-a5de-4cb8-0023-b0cee10b7100/public"
              alt="ambition cube"
              width={155}
              height={155}
              className="object-contain drop-shadow-xl w-[155px] h-[155px] "
            />
          </div>
        </div>

        {/* Collage image */}
        <div className="mt-4 w-full overflow-hidden rounded-[12px]">
          <img
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/9ac22dc8-19e4-47cd-ce11-6b503e251a00/public"
            alt="System collage"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Body text */}
        <div className="mt-6 space-y-4">
          <p className="text-[22px] leading-relaxed text-[#002834]">
            From AI influencers to brand ambassadors, from content engines to automated workflows — each solution is tailored, trained, and designed specifically for the brand it serves.
          </p>
          <p className="text-[22px] leading-snug text-[#002834] uppercase">
            AI IS NOT A SHORTCUT.<br />
            IT&apos;S A SYSTEM — AND SYSTEMS NEED ARCHITECTS.
          </p>
        </div>
      </section>


      {/* ══════════════════════════════════════
          7. BRANDS NEED SOMETHING DURABLE
      ══════════════════════════════════════ */}
      <section
        className="pb-10 bg-no-repeat"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2153032a-2e08-46c8-4c19-e687cb3f7800/public)'
        }}
      >
        <div className="flex flex-col justify-between gap-[342px]">
          <div className="mt-[30px]">
            <div className="overflow-hidden">
              <div className="flex w-max animate-marquee whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="shrink-0 pr-8 font-heading text-[87px] uppercase leading-none text-[#145365]">
                    WE DESIGN FOR BRANDS,
                    <img src="/images/common/star.svg" alt="*" className="mx-5 inline h-15 w-15 relative top-[0.05em]" />
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-1 overflow-hidden">
              <div className="flex w-max animate-marquee whitespace-nowrap" style={{ animationDirection: "reverse" }}>
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="shrink-0 pr-8 font-heading text-[87px]  uppercase leading-none text-[#145365]">
                    NOT FOR ALGORITHMS
                    <img src="/images/common/star.svg" alt="*" className="mx-5 inline h-15 w-15 relative top-[0.05em]" />
                  </span>
                ))}
              </div>
            </div>
            <p className="text-[20px] leading-snug text-[#145365] px-5 mt-8 ">
              Trends change.<br />
              Platforms evolve.<br />
              Algorithms update overnight.
            </p>
          </div>
          <div>
            <div className="">
              <p className="text-[20px] leading-relaxed text-[#145365] px-5 ">
                Brands, however, need something more durable:
              </p>

              <div className="mt-2 space-y-1">
                {["clarity", "consistency", "emotional connection"].map((item) => (
                  <p key={item} className="text-[20px] text-[#145365] px-5 ">
                    • {item}
                  </p>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[18px] leading-relaxed text-[#145365] px-5 ">
              That&apos;s why we design AI systems that serve brand identity, not platform logic.
            </p>
            <p className="mt-4 text-[18px] leading-relaxed text-[#145365] px-5 ">
              Technology adapts. The brand remains recognizable.
            </p>

            <div className="flex items-center flex-col mt-10">
              <h2 className="font-heading text-[80px] font-bold uppercase leading-none text-[#145365]">
                Always
              </h2>
              <p className="font-heading text-[50px] font-bold uppercase leading-none text-[#039EB7]">
                human <br />intentional
              </p>
            </div>


          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. THE FUTURE WE BELIEVE IN
      ══════════════════════════════════════ */}
      <section>
        <div className="pb-6">
          <div className="relative">
            {/* Full-width image with 6px border radius */}
            <div className="rounded-t-md overflow-hidden">
              <img
                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cb799375-17ec-4b75-8714-cdfa9f434d00/public"
                alt="The Future"
                className="w-full object-cover"
                style={{ height: "320px", minHeight: 220, maxHeight: 320, objectPosition: "center top" }}
              />
            </div>
          </div>

          {/* Glass card — pulled up over the image */}
          <div className="bg-[#181D52] pb-5">
            <div
              className="relative -mt-11 mx-5 rounded-2xl p-5 "
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <h2 className="text-[34px] font-medium text-[#EBFFFF] leading-snug">
                The Future We Believe In
              </h2>
              <p className="mt-4 text-[14px] text-[#EBFFFF]">We see a future where:</p>
              <ul className="mt-2 space-y-2 list-disc pl-5">
                {[
                  "AI doesn't replace agencies — it redefines them",
                  "Creativity scales without losing its soul",
                  "Automation creates space for better ideas",
                  "Brands speak with more relevance, not more noise",
                ].map((item) => (
                  <li key={item} className="text-[14px] text-[#EBFFFF]">
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[14px] text-[#EBFFFF]">
                In this future, success belongs to those who can orchestrate intelligence, not just use it.
              </p>
              <p className="mt-2 text-[14px] text-[#EBFFFF]">That&apos;s the role we choose.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. THIS IS THE MIND BEHIND
      ══════════════════════════════════════ */}
      <section className="bg-light-bg" style={safePx}>
        <p className="font-heading text-[20px] font-bold text-[#00BCCF] text-center">
          This is the Mind Behind ddip.ai
        </p>
      </section>

      {/* ══════════════════════════════════════
          10. BOTTOM MARQUEE
      ══════════════════════════════════════ */}
      <section className="overflow-hidden bg-[#F6F9F2] py-4">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="shrink-0 pr-8 font-heading text-[60px] uppercase leading-none text-[#145365]">
                NOT AI-FIRST
                <img src="/images/common/star.svg" alt="*" className="mx-5 inline h-12 w-12 relative top-[0.05em]" />
              </span>
            ))}
          </div>
        </div>
        <div className="mt-1 overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap" style={{ animationDirection: "reverse" }}>
            {[...Array(4)].map((_, i) => (
              <span key={i} className="shrink-0 pr-8 font-heading text-[60px] uppercase leading-none text-[#145365]">
                NOT HUMAN-ONLY
                <img src="/images/common/star.svg" alt="*" className="mx-5 inline h-12 w-12 relative top-[0.05em]" />
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-col items-start mb-20" style={safePx}>
          <p className="font-heading text-[20px] font-medium text-[#063746]">Human-led intelligence.</p>
          <p className="font-heading text-[20px] font-medium  text-[#063746]">System-driven creativity.</p>
          <p className="text-[20px] font-medium  text-[#063746]">Designed for brands that want more </p>
          <p className="text-[20px] font-medium  text-[#063746]">than outputs — they want impact.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          11. CTA
      ══════════════════════════════════════ */}
      <section
        className="bg-light-bg"
        style={{
          paddingLeft: "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingBottom: "max(64px, calc(16px + env(safe-area-inset-bottom)))",
        }}
      >
        <div className="rounded-[20px] p-6 text-center" style={{ background: "linear-gradient(-90deg,var(--color-dark-bg) 0%,#129CAC 100%)" }}>
          <p className="font-heading text-[22px] font-medium text-[#EBFFFF] text-start">
            Curious how this mindset turns into real systems?
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <Link href="/m/start-project" className="inline-flex items-center justify-center rounded-full bg-[#1CE3F4] px-6 py-3 text-[18px] font-medium text-dark-bg active:opacity-80">
              Start a Project
            </Link>
            <Link href="/m/lets-connect" className="inline-flex items-center justify-center rounded-full border border-white px-6 py-3 text-[18px] font-medium text-white active:opacity-80">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
