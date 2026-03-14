"use client";

import Link from "next/link";
import Image from "next/image";

/* ─── Data ─── */

const projectCards = [
  { title: "Understanding the brand", image: "/images/mind-behind/project-01.png" },
  { title: "Understanding the technology", image: "/images/mind-behind/project-02.png" },
  { title: "Understanding the audience, culture, and AI", image: "/images/mind-behind/project-03.png" },
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
        <div className="whitespace-nowrap overflow-hidden px-[60px]">
          <h1
            className="inline-block font-heading font-normal uppercase text-white"
            style={{ fontSize: "clamp(36px, 8vw, 130px)", lineHeight: "1" }}
          >
            THE MIND BEHIND{" "}
            <span className="mx-3 text-[#1CE3F4]">✻</span>
          </h1>
        </div>

        <div className="mt-10 px-[60px]">
          <h2 className="max-w-lg font-heading text-[24px] font-medium leading-[1.3] text-white">
            Intelligence is powerful.
            <br />
            Humanity makes it meaningful.
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
            At ddip.ai, we believe the future of brands is not built by AI alone — and not by humans alone either. It is built in between.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white/20">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
            <span className="font-heading text-[14px] font-medium text-white underline decoration-white/30 underline-offset-8">
              Discover The Mind Behind
            </span>
          </div>

          <div className="mt-8 flex items-center gap-2">
            <span className="h-2 w-6 rounded-full bg-white" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </div>
        </div>

        <div className="absolute bottom-10 right-[60px]">
          <p className="text-[11px] tracking-wider text-white/30" style={{ fontFamily: "var(--font-body)" }}>[SCROLL]</p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          2. WHERE — Philosophy intro
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-[auto_1fr] gap-16">
            <h2 className="font-heading text-[64px] font-medium uppercase leading-[1] text-[#063746]">
              Where
            </h2>
            <div className="space-y-3 pt-2">
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                artificial intelligence amplifies creativity,
              </p>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                human insight gives it direction,
              </p>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                systems think fast — and people think deep.
              </p>
              <p className="mt-4 text-[15px] font-medium leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
                This is the mind behind everything we design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          3. WE DON'T REPLACE HUMAN THINKING
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="flex items-center gap-4">
            <span className="text-[#1CE3F4]">✻</span>
            <p className="text-[13px] text-[#063746]/40" style={{ fontFamily: "var(--font-body)" }}>
              AI is not our destination. It is our tool.
            </p>
          </div>
          <h2 className="mt-8 font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]">
            We Don&apos;t Replace
            <br />
            Human Thinking.
          </h2>
          <h2 className="font-heading text-[64px] font-medium uppercase leading-[1] text-[#1CE3F4]">
            We Expand It.
          </h2>
          <p className="mt-8 max-w-lg text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
            We don&apos;t use AI to automate creativity away — we use it to free creative minds from limitations, repetition, and inefficiency.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. EVERY PROJECT STARTS WITH HUMAN UNDERSTANDING
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[36px] font-medium leading-[1.1] text-[#063746]">
            Every Project At Ddip.AI Starts With
            <br />
            Human Understanding.
          </h2>
          <div className="mt-12 grid grid-cols-3 gap-6">
            {projectCards.map((card) => (
              <div key={card.title} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-[#D9D9D9]">
                  <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="33vw" />
                </div>
                <p className="mt-4 text-[14px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. HUMAN + AI, BY DESIGN
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-[36px] font-medium leading-[1.1] text-[#063746]">
                Human + AI, By Design
              </h2>
              <p className="mt-2 text-[15px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                Our approach is intentionally hybrid.
              </p>
              <p className="mt-6 text-[13px] text-[#063746]/40" style={{ fontFamily: "var(--font-body)" }}>
                Behind every AI-generated output, there is:
              </p>
              <div className="mt-6 space-y-0">
                {humanAiItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-[#063746]/10 py-3">
                    <span className="text-[#1CE3F4]">›</span>
                    <span className="font-heading text-[16px] font-medium text-[#063746]">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[13px] text-[#063746]/40" style={{ fontFamily: "var(--font-body)" }}>
                AI works with our teams — not replacing them.
              </p>
            </div>
            <div className="space-y-4">
              {guideLabels.map((label) => (
                <div key={label} className="flex items-center justify-end">
                  <span className="rounded-[12px] bg-dark-bg px-6 py-3 font-heading text-[16px] font-medium text-white">
                    {label}
                  </span>
                </div>
              ))}
              <p className="mt-4 text-right text-[13px] text-[#063746]/40" style={{ fontFamily: "var(--font-body)" }}>
                The balance is in how teams re-work raw material. Actively, never passively — crafting with purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. A SYSTEM, NOT A SHORTCUT
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <h2 className="font-heading text-[48px] font-medium leading-[1.1] text-[#063746]">
            A System,
            <br />
            Not a Shortcut
          </h2>
          <p className="mt-4 text-[15px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
            We don&apos;t believe in one-size-fits-all AI solutions.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-16">
            <div>
              <p className="text-[13px] text-[#063746]/40" style={{ fontFamily: "var(--font-body)" }}>Every brand has:</p>
              <h3 className="mt-4 font-heading text-[48px] font-medium uppercase leading-[1] text-[#063746]">
                A Different
              </h3>
              <p className="mt-2 text-[15px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                voice, rhythm, position.
              </p>
              <p className="mt-4 text-[15px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                That&apos;s why we design custom AI systems, not generic outputs.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-[14px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                From AI influencers to brand ambassadors, from content engines to automated workflows — each solution is tailored, trained, and designed specifically for the brand it serves.
              </p>
              <p className="text-[14px] font-medium leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
                AI IS NOT A SHORTCUT.
                <br />
                IT&apos;S A SYSTEM — AND SYSTEMS NEED ARCHITECTS.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          7. MARQUEE — "WE DESIGN FOR BRANDS ✻ NOT FOR ALGORITHMS"
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-light-bg py-8">
        <div className="whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-heading text-[80px] font-normal uppercase leading-none text-[#063746]/25 xl:text-[100px]">
              WE DESIGN FOR BRANDS,<span className="mx-3 text-[#1CE3F4]/40">✻</span>
              NOT FOR ALGORITHMS<span className="mx-3 text-[#1CE3F4]/40">✻</span>{" "}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. BRANDS NEED SOMETHING DURABLE
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <p className="text-[15px] leading-[1.5] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                Trends change.
                <br />
                Platforms evolve.
                <br />
                Algorithms update overnight.
              </p>
            </div>
            <div>
              <p className="text-[15px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                Brands, however, need something more durable:
              </p>
              <ul className="mt-4 space-y-1 pl-4">
                <li className="text-[14px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>• clarity</li>
                <li className="text-[14px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>• consistency</li>
                <li className="text-[14px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>• emotional connection</li>
              </ul>
              <p className="mt-6 text-[14px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                That&apos;s why we design AI systems that serve brand identity, not platform logic.
              </p>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
                Technology adapts. The brand remains recognizable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          9. ALWAYS HUMAN INTENTIONAL — marquee
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-light-bg py-8">
        <div className="whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-heading text-[80px] font-normal uppercase leading-none text-[#063746] xl:text-[100px]">
              ALWAYS <span className="text-[#1CE3F4]">HUMAN</span> INTENTIONAL{" "}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          10. THE FUTURE WE BELIEVE IN — dark card
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-12">
        <div className="px-[60px]">
          <div className="overflow-hidden rounded-[24px] bg-dark-bg px-16 py-20">
            <h2 className="font-heading text-[40px] font-medium leading-[1.1] text-white">
              The Future We
              <br />
              Believe In
            </h2>
            <div className="mt-8 max-w-lg space-y-3">
              <p className="text-[14px] leading-[1.6] text-white/70" style={{ fontFamily: "var(--font-body)" }}>
                We see a future where:
              </p>
              <ul className="space-y-2 pl-4">
                <li className="text-[14px] text-white/70" style={{ fontFamily: "var(--font-body)" }}>• Creativity scales without losing its soul</li>
                <li className="text-[14px] text-white/70" style={{ fontFamily: "var(--font-body)" }}>• Brands speak with intent, precision, and humanity</li>
                <li className="text-[14px] text-white/70" style={{ fontFamily: "var(--font-body)" }}>• That&apos;s the future we choose.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          11. THIS IS THE MIND BEHIND DDIP.AI
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <p className="text-[#1CE3F4] font-heading text-[20px] font-medium">
            This is the Mind Behind ddip.ai
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          12. BOTTOM MARQUEE — "NOT AI-FIRST ✻ NOT HUMAN-ONLY"
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-light-bg py-8">
        <div className="whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="font-heading text-[80px] font-normal uppercase leading-none text-[#063746]/25 xl:text-[100px]">
              NOT AI-FIRST<span className="mx-3 text-[#1CE3F4]/40">✻</span>
              NOT HUMAN-ONLY<span className="mx-3 text-[#1CE3F4]/40">✻</span>{" "}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          13. CTA
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px]">
          <p className="text-[15px] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
            Human-led intelligence.
            <br />
            System-driven creativity.
            <br />
            Designed for brands that want more than outputs — they want impact.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link href="/ai-solutions" className="rounded-full border border-[#063746]/20 px-6 py-2.5 font-heading text-[14px] font-medium text-[#063746] transition hover:bg-[#063746]/5">
              Explore our AI Solutions
            </Link>
            <Link href="/start-project" className="rounded-full bg-[#1CE3F4] px-6 py-2.5 font-heading text-[14px] font-medium text-[#063746] transition hover:bg-[#1CE3F4]/80">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
