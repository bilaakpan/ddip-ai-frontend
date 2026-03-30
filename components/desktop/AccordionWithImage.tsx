"use client";

import { useState } from "react";

interface AccordionItem {
  title: string;
  description: string;
  image: string;
}

interface AccordionWithImageProps {
  heading: string;
  subheading: string;
  items: AccordionItem[];
  defaultImage: string;
}

export default function AccordionWithImage({
  heading,
  subheading,
  items,
  defaultImage,
}: AccordionWithImageProps) {
  const [open, setOpen] = useState<number | null>(null);

  const activeImage = open !== null ? items[open].image : defaultImage;
  const activeAlt = open !== null ? items[open].title : "Default";

  return (
    <section id="discover" className="bg-light-bg py-24">
      <div className="px-[60px]">
        {/* Header */}
        <div className="grid grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="font-heading text-[50px] font-medium uppercase leading-[1.1] text-[#063746]">
              {heading}
            </h2>
          </div>
          <div>
            <p
              className="text-[24px] leading-[1.6] text-[#063746]"
              style={{ fontFamily: "SF Pro Display" }}
            >
              {subheading}
            </p>
          </div>
        </div>

        {/* Accordion + Image */}
        <div className="flex gap-0 rounded-[20px] overflow-hidden border border-[#063746]/10 bg-white">
          {/* Left — Accordion */}
          <div className="w-[50%] py-2">
            {items.map((item, i) => (
              <div key={item.title} className="border-b border-[#063746]/10 last:border-b-0">
                <button
                  className="flex w-full items-center justify-between px-8 py-6 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span
                    className="font-heading text-[18px] font-medium"
                    style={{ color: open === i ? "#1CE3F4" : "#063746" }}
                  >
                    {item.title}
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                    style={{ color: open === i ? "#1CE3F4" : "#063746" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {open === i && (
                  <div className="px-8 pb-6">
                    <p
                      className="text-[14px] leading-[1.6] text-[#063746]/50"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right — Image */}
          <div className="w-[50%] shrink-0">
            <img
              src={activeImage}
              alt={activeAlt}
              className="w-full h-full object-cover rounded-r-[20px]"
              style={{ minHeight: "320px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
