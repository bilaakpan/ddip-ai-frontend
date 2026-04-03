"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq } from "@/lib/api";
import { Stream } from "@cloudflare/stream-react";
interface UseCase {
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Partner {
  name: string;
}

interface MobileSolutionPageProps {
  /** Page slug for CMS FAQ fetching */
  pageSlug: string;
  /** Hero section */
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  heroVideo?: string;
  /** Partners displayed at top (e.g., VG Invest, Brother) */
  partnerLogos?: Partner[];
  /** "What AI X Means at DDip.AI" section */
  whatTitle: string;
  whatDescription: string;
  /** "What We Produce/Generate/Optimize" section */
  whatWeDoTitle: string;
  whatWeDoDescription: string;
  /** 4D Method section */
  show4DMethod?: boolean;
  fourDLabel?: string;
  /** Expanding Creative / Content at Scale section */
  expandingTitle?: string;
  expandingDescription?: string;
  /** How It Works / Process steps */
  processSteps?: ProcessStep[];
  /** Use Cases */
  useCases: UseCase[];
  /** Tool Ecosystem */
  toolEcosystemTitle?: string;
  toolEcosystemDescription?: string;
  /** FAQ items (fallback) */
  faqItems: FaqItem[];
  /** Partners section at bottom */
  showPartners?: boolean;
}

const partners = [
  { name: "AWS" },
  { name: "Google Cloud" },
  { name: "Google Partner" },
  { name: "Microsoft" },
  { name: "Salesforce" },
];

export default function MobileSolutionPage({
  pageSlug,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroVideo,
  partnerLogos,
  whatTitle,
  whatDescription,
  whatWeDoTitle,
  whatWeDoDescription,
  show4DMethod = true,
  fourDLabel = "Our 4D Method",
  expandingTitle,
  expandingDescription,
  processSteps,
  useCases,
  toolEcosystemTitle,
  toolEcosystemDescription,
  faqItems,
  showPartners = true,
}: MobileSolutionPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [cmsFaqs, setCmsFaqs] = useState(faqItems);

  useEffect(() => {
    cmsApi
      .faqs(pageSlug)
      .then((res) => {
        if (res.data?.length) {
          setCmsFaqs(
            res.data.map((f: Faq) => ({
              question: f.question,
              answer: f.answer,
            }))
          );
        }
      })
      .catch(() => { });
  }, [pageSlug]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] overflow-hidden bg-dark-bg">
        <div className="absolute inset-0 z-0">
          {heroVideo ? (
            <Stream
            src={heroVideo}
              controls={false}
              autoplay
              muted
              loop
              className="h-full w-full object-cover"
            />
          ) : heroImage ? (
            <Image
              src={heroImage}
              alt={heroTitle}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/40 to-dark-bg/60" />
        </div>
        <div className="relative z-10 flex min-h-[60vh] flex-col justify-end px-5 pb-10">
          <h1 className="font-heading text-[clamp(32px,9vw,48px)] font-bold uppercase leading-[1.05] text-white">
            {heroTitle}
          </h1>
          <p className="mt-3 max-w-[90%] text-[15px] leading-[1.5] text-white/70">
            {heroSubtitle}
          </p>
          <Link
            href="#content"
            className="mt-6 inline-flex items-center gap-2 text-[14px] text-[#1CE3F4]"
          >
            Discover Our Creative Approach
            <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2v8M2 6l4 4 4-4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── Partner logos row ── */}
      {partnerLogos && partnerLogos.length > 0 && (
        <div className="flex items-center justify-center gap-6 bg-light-bg px-5 py-6">
          {partnerLogos.map((p, i) => (
            <span key={i} className="text-[12px] font-medium text-light-body">
              {p.name}
            </span>
          ))}
        </div>
      )}

      {/* ── WHAT IT MEANS ── */}
      <section id="content" className="bg-light-bg px-5 py-14">
        <h2 className="font-heading text-[clamp(24px,6vw,32px)] font-medium leading-[1.15] text-light-text">
          {whatTitle}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-light-body">
          {whatDescription}
        </p>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="bg-light-bg px-5 pb-14">
        <h2 className="font-heading text-[clamp(24px,6vw,32px)] font-medium leading-[1.15] text-light-text">
          {whatWeDoTitle}
        </h2>
        <p className="mt-4 text-[15px] leading-[1.6] text-light-body">
          {whatWeDoDescription}
        </p>
      </section>

      {/* ── 4D METHOD ── */}
      {show4DMethod && (
        <section className="bg-light-bg px-5 pb-14">
          <h2 className="mb-6 font-heading text-[clamp(24px,6vw,32px)] font-medium uppercase leading-[1.15] text-light-text">
            {fourDLabel}
          </h2>
          <div className="flex flex-col gap-4">
            {["Define", "Design", "Develop", "Deliver"].map((step, i) => (
              <div key={i} className="flex items-center gap-4 rounded-[14px] border border-border-light p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#002834] text-[14px] font-bold text-[#1CE3F4]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-heading text-[16px] font-medium text-light-text">
                    {step}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── EXPANDING SECTION ── */}
      {expandingTitle && (
        <section className="bg-light-bg px-5 pb-14">
          <h2
            className="text-[clamp(24px,6vw,32px)] font-bold leading-[1.15]"
            style={{
              fontFamily: "var(--font-body)",
              background: "linear-gradient(199deg, #063746 0%, #00BCCF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {expandingTitle}
          </h2>
          {expandingDescription && (
            <p className="mt-4 text-[15px] leading-[1.6] text-light-body">
              {expandingDescription}
            </p>
          )}
        </section>
      )}

      {/* ── HOW IT WORKS / PROCESS ── */}
      {processSteps && processSteps.length > 0 && (
        <section className="bg-light-bg px-5 pb-14">
          <h2 className="mb-6 font-heading text-[clamp(24px,6vw,32px)] font-medium uppercase leading-[1.15] text-light-text">
            How It Works
          </h2>
          <div className="flex flex-col gap-4">
            {processSteps.map((step, i) => (
              <div key={i} className="rounded-[14px] border border-border-light p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1CE3F4] text-[12px] font-bold text-[#002834]">
                    {step.step}
                  </span>
                  <h3 className="font-heading text-[16px] font-medium text-light-text">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-[14px] leading-[1.5] text-light-body">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── USE CASES ── */}
      <section className="bg-light-bg px-5 pb-14">
        <h2 className="mb-6 font-heading text-[clamp(24px,6vw,32px)] font-medium uppercase leading-[1.15] text-light-text">
          Use Cases
        </h2>
        <div className="flex flex-col gap-4">
          {useCases.map((uc, i) => (
            <div key={i} className="rounded-[14px] border border-border-light p-5">
              <h3 className="font-heading text-[16px] font-medium text-light-text">
                {uc.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-light-body">
                {uc.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOOL ECOSYSTEM ── */}
      {toolEcosystemTitle && (
        <section className="bg-light-bg px-5 pb-14">
          <h2 className="mb-4 font-heading text-[clamp(20px,5vw,28px)] font-medium leading-[1.2] text-light-text">
            {toolEcosystemTitle}
          </h2>
          {toolEcosystemDescription && (
            <p className="text-[14px] leading-[1.5] text-light-body">
              {toolEcosystemDescription}
            </p>
          )}
        </section>
      )}

      {/* ── PARTNERS ── */}
      {showPartners && (
        <section className="bg-light-bg px-5 pb-14">
          <h2 className="mb-6 font-heading text-[clamp(28px,7vw,40px)] font-medium uppercase leading-[0.99] text-light-text">
            PARTNERS
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {partners.map((p, i) => (
              <div
                key={i}
                className="flex h-[80px] items-center justify-center rounded-[14px] border border-[#C3C3C3]"
              >
                <span className="text-[13px] font-medium text-light-body">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="bg-light-bg px-5 pb-14">
        <div className="rounded-[20px] bg-[#002834] p-6">
          <h2 className="mb-6 font-heading text-[clamp(28px,7vw,40px)] font-medium uppercase text-[#EBFFFF]">
            FAQ
          </h2>
          <div className="flex flex-col">
            {cmsFaqs.map((faq, i) => (
              <div key={i} className="border-b border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="pr-4 text-[14px] leading-[1.4] text-[#EBFFFF]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 text-[16px] text-white transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""
                      }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-[300px] pb-4" : "max-h-0"
                    }`}
                >
                  <p className="text-[13px] leading-[1.5] text-[#90B2BD]">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Live FAQ CTA */}
          <div className="mt-6 rounded-[14px] bg-[#063746] p-5 text-center">
            <p className="text-[14px] font-medium text-[#1CE3F4]">Live FAQ</p>
            <p className="mt-1 text-[18px] font-bold text-white">
              Didn&apos;t find your answer?
            </p>
            <Link
              href="/lets-connect"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-light-bg px-5 pb-16">
        <div
          className="rounded-[20px] p-6 text-center"
          style={{
            background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)",
          }}
        >
          <p className="font-heading text-[20px] font-bold text-[#EBFFFF]">
            Let&apos;s Build What&apos;s Next, Together.
          </p>
          <p className="mt-2 text-[13px] text-[#EBFFFF]/70">
            Ready to build smart? Let&apos;s align creativity, AI and strategy
            into one unstoppable system.
          </p>
          <Link
            href="/start-project"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[14px] font-medium text-[#002834]"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </>
  );
}
