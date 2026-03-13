"use client";

import Link from "next/link";
import Image from "next/image";

/* ── Data ─────────────────────────────────────────────── */

const values = [
  {
    title: "Innovation",
    description:
      "Pushing the boundaries of what AI can achieve in creative production. We experiment, iterate, and pioneer new approaches to visual storytelling.",
  },
  {
    title: "Creativity",
    description:
      "AI amplifies human creativity, it does not replace it. We combine artistic vision with machine intelligence to produce work that resonates on a human level.",
  },
  {
    title: "Precision",
    description:
      "Every pixel matters. We deliver production-grade quality at scale, ensuring each AI-generated asset meets the highest standards of design excellence.",
  },
  {
    title: "Partnership",
    description:
      "We work alongside brands as collaborative partners, not just vendors. Your vision drives the creative direction; our technology accelerates the execution.",
  },
];

const teamMembers = [
  {
    name: "Sani L.",
    role: "Founder & Creative Director",
    bio: "Visionary leader bridging the gap between AI technology and creative design. Sani founded DDip AI to redefine how brands communicate in the age of artificial intelligence.",
    initials: "SL",
  },
  {
    name: "Elif K.",
    role: "Head of AI Development",
    bio: "Specialist in generative AI models and machine learning pipelines. Elif architects the core AI systems that power DDip\u2019s creative production workflows.",
    initials: "EK",
  },
  {
    name: "Mert A.",
    role: "Lead 3D & CGI Artist",
    bio: "Award-winning CGI artist with a background in architectural visualization. Mert brings photorealistic quality to every AI-enhanced visual project.",
    initials: "MA",
  },
  {
    name: "Zeynep D.",
    role: "Brand Strategy Director",
    bio: "Expert in digital brand strategy and AI-driven marketing. Zeynep ensures every project aligns with the client\u2019s brand identity and business objectives.",
    initials: "ZD",
  },
];

const reasons = [
  {
    number: "01",
    title: "AI-Native Creative Studio",
    description:
      "Unlike traditional agencies that bolt on AI as an afterthought, DDip AI was built from the ground up with artificial intelligence at its core. Every workflow, every tool, every process is designed around AI capabilities.",
  },
  {
    number: "02",
    title: "Production-Grade Quality",
    description:
      "We deliver assets that go straight to market. No prototypes, no rough drafts. Our AI-enhanced pipeline produces polished, brand-ready content at speed and scale that traditional production cannot match.",
  },
  {
    number: "03",
    title: "End-to-End Partnership",
    description:
      "From concept to deployment, we handle every phase. Strategy, design, production, and optimization all happen under one roof with a team that understands both the creative and technical dimensions.",
  },
];

/* ── Component ────────────────────────────────────────── */

export default function MobileTheMindBehindPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[60vh] overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mind-behind/human-ai-hero.png"
            alt="Human + AI"
            fill
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/40 to-dark-bg/60" />
        </div>
        <div className="relative z-10 flex min-h-[60vh] flex-col justify-end px-5 pb-10">
          <p className="font-heading text-[13px] uppercase tracking-widest text-[#1CE3F4]">
            About Us
          </p>
          <h1 className="mt-2 font-heading text-[clamp(32px,9vw,48px)] font-bold uppercase leading-[1.05] text-white">
            THE MIND
            <br />
            BEHIND
          </h1>
          <p className="mt-3 max-w-[90%] text-[15px] leading-[1.5] text-white/70">
            We are a collective of designers, engineers, and strategists united
            by a singular belief: the future of creative production belongs to
            those who master the intersection of human vision and artificial
            intelligence.
          </p>
        </div>
      </section>

      {/* ─── Mission Statement ─── */}
      <section className="bg-light-bg px-5 py-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-teal-600">
          Our Mission
        </p>
        <h2 className="mt-4 font-body text-[clamp(22px,5.5vw,32px)] font-bold leading-[1.25] text-light-text">
          We believe AI is not the replacement for creativity&mdash;it is the
          ultimate amplifier. Our mission is to harness this power to help brands
          tell stories that were never before possible.
        </h2>
      </section>

      {/* ─── Values ─── */}
      <section className="bg-light-bg px-5 pb-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-teal-600">
          What Drives Us
        </p>
        <h2 className="mt-2 font-heading text-[clamp(24px,6vw,32px)] font-medium uppercase leading-[1.15] text-light-text">
          Our Values
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-[14px] border border-light-text/10 bg-white p-5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500/10">
                <span className="text-[18px] font-bold text-teal-600">
                  {value.title.charAt(0)}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-[18px] font-medium text-light-text">
                {value.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-light-body">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Team Section ─── */}
      <section className="bg-dark-bg px-5 py-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-[#1CE3F4]">
          The Team
        </p>
        <h2 className="mt-2 font-heading text-[clamp(24px,6vw,32px)] font-medium uppercase leading-[1.15] text-white">
          Faces Behind the Vision
        </h2>
        <p className="mt-4 text-[15px] leading-[1.5] text-white/50">
          A tight-knit team of specialists, each bringing deep expertise in AI,
          design, and brand strategy to every project.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              {/* Avatar placeholder */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-[#0a2a36]">
                <span className="font-heading text-[20px] font-medium text-teal-500/60">
                  {member.initials}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-[15px] font-medium text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-[12px] font-medium text-[#1CE3F4]">
                {member.role}
              </p>
              <p className="mt-3 text-[12px] leading-[1.4] text-white/40">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Why DDip AI ─── */}
      <section className="bg-dark-bg px-5 pb-14">
        <p className="font-heading text-[13px] uppercase tracking-widest text-[#1CE3F4]">
          Why DDip AI
        </p>
        <h2 className="mt-2 font-heading text-[clamp(24px,7vw,36px)] font-medium uppercase leading-[1.1] text-white">
          BUILT DIFFERENT
          <br />
          BY DESIGN
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {reasons.map((reason) => (
            <div
              key={reason.number}
              className="rounded-[14px] border border-white/10 bg-[#0a2a36] p-5"
            >
              <span className="font-heading text-[28px] font-bold text-teal-500/20">
                {reason.number}
              </span>
              <h3 className="mt-2 font-heading text-[16px] font-medium text-white">
                {reason.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.5] text-white/40">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-light-bg px-5 py-14">
        <div className="text-center">
          <p className="text-[12px] uppercase tracking-widest text-light-body">
            Ready to collaborate?
          </p>
          <h2 className="mt-3 font-heading text-[clamp(28px,8vw,40px)] font-medium uppercase leading-[1.05] text-light-text">
            LET&apos;S BUILD
            <br />
            SOMETHING AMAZING
          </h2>
          <p className="mt-4 text-[15px] leading-[1.5] text-light-body">
            Whether you have a clear vision or just an idea, we are here to turn
            it into something extraordinary with the power of AI.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
            >
              Start a Project
            </Link>
            <Link
              href="/lets-connect"
              className="inline-flex items-center gap-2 rounded-full border border-light-text/20 px-6 py-3 text-[14px] font-medium text-light-text"
            >
              Let&apos;s Connect
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
