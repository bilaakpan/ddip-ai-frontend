"use client";

import { useState } from "react";
import Link from "next/link";

interface FaqSectionProps {
  leftQuestions: string[];
  rightQuestions: string[];
  ctaHref?: string;
  ctaLabel?: string;
}

export default function FaqSection({
  leftQuestions,
  rightQuestions,
  ctaHref = "/lets-connect",
  ctaLabel = "Talk to our AI",
}: FaqSectionProps) {
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);

  return (
    <section className="bg-light-bg pt-24 pb-0 lg:pt-32 lg:pb-0">
      <div className="mx-[60px] overflow-hidden rounded-[20px] bg-[#002834]">
        {/* Title */}
        <div className="px-[59px] pt-[85px]">
          <h2 className="font-heading text-[80px] font-medium uppercase leading-[0.99] text-[#EBFFFF]">
            <span>F</span>AQ
          </h2>
        </div>

        {/* 2-column FAQ grid */}
        <div className="mt-12 px-[59px]">
          {Array.from({ length: Math.max(leftQuestions.length, rightQuestions.length) }).map((_, i) => (
            <div key={i} className="grid grid-cols-2 gap-x-[40px]">
              {/* Left */}
              <div className="border-t border-[#EBFFFF33] pr-[50px]">
                {leftQuestions[i] && (
                  <button
                    className="flex w-full items-center justify-between py-[35px] text-left"
                    onClick={() => setOpenLeft(openLeft === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[20px] leading-[1.3] text-white" style={{ fontFamily: "var(--font-body)" }}>
                        {i + 1}.
                      </span>
                      <span className="text-[20px] leading-[1.3] text-white" style={{ fontFamily: "var(--font-body)" }}>
                        {leftQuestions[i]}
                      </span>
                    </div>
                    <span className={`shrink-0 text-[24px] leading-none text-white transition-transform duration-300 ${openLeft === i ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                )}
                <div className={`grid transition-all duration-300 ${openLeft === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[15px] leading-relaxed text-[#90B2BD]" style={{ fontFamily: "var(--font-body)" }}>
                      Our team will provide detailed information. Contact us to learn more.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="border-t border-[#EBFFFF33] pl-[50px]">
                {rightQuestions[i] && (
                  <button
                    className="flex w-full items-center justify-between py-[35px] text-left"
                    onClick={() => setOpenRight(openRight === i ? null : i)}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className="text-[20px] leading-[1.3] text-white"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {leftQuestions.length + i + 1}.
                      </span>
                      <span className="text-[20px] leading-[1.3] text-white" style={{ fontFamily: "var(--font-body)" }}>
                        {rightQuestions[i]}
                      </span>
                    </div>
                    <span className={`shrink-0 text-[24px] leading-none text-white transition-transform duration-300 ${openRight === i ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                )}
                <div className={`grid transition-all duration-300 ${openRight === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[16px] leading-relaxed text-[#90B2BD]" style={{ fontFamily: "var(--font-body)" }}>
                      Our team will provide detailed information. Contact us to learn more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom border */}
          <div className="grid grid-cols-2 gap-x-[40px]">
            <div className="border-t border-[#EBFFFF33]" />
            <div className="border-t border-[#EBFFFF33]" />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative mx-[59px] mb-[65px] mt-16 overflow-hidden rounded-[10px]">
          <div className="absolute inset-0">
            <img src="/images/homepage/faq-image-1.svg" alt="" className="h-full w-full" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative z-10 px-[60px] py-[56px]">
            <p className="font-heading text-[41px] font-normal leading-[1.2] text-white">Live FAQ</p>
            <h3 className="mt-6 text-[48px] font-bold leading-[1.2] text-white" style={{ fontFamily: "var(--font-body)" }}>
              Didn&apos;t find your answer?
            </h3>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-[#1CE3F4] px-[18px] py-[8px] transition-opacity hover:opacity-90"
              style={{ height: "64px", minWidth: "221px" }}
            >
              <span className="text-[24px] font-medium leading-[1.2] text-[#002834]" style={{ fontFamily: "var(--font-body)" }}>
                {ctaLabel}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
