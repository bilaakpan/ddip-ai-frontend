"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronUp, ChevronDown } from "lucide-react";

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
  const [openIndex, setOpenIndex] = useState<number>(0);

  const activeImage = openIndex >= 0 ? items[openIndex].image : defaultImage;

  return (
    <section className="bg-light-bg">
      <div className="flex items-center justify-center px-15">
        <div className="bg-white rounded-3xl shadow-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section — Accordion */}
          <div>

            <div className="space-y-0 border-t border-[#063746]/10 ">
              {items.map((item, index) => {
                const isOpen = index === openIndex;
                return (
                  <div key={index} className="border-b border-[#063746]/10">
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="flex items-center justify-between w-full text-left py-10 hover:opacity-80 transition"
                    >
                      <span
                        className={`text-[34px] font-medium transition-colors ${isOpen ? "text-[#0A7D94]" : "text-[#86868D]"
                          }`}
                      >
                        {item.title}
                      </span>
                      {isOpen ? (
                        <ChevronUp size={25} className="text-[#86868D] shrink-0" />
                      ) : (
                        <ChevronDown size={25} className="text-[#86868D] shrink-0" />
                      )}
                    </button>
                    {isOpen && item.description && (
                      <p
                        className="text-[#5C5C5C] text-[22px] pb-5 leading-relaxed"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Section — tall portrait image */}
          <div className="flex items-start justify-center">
            <div className="relative w-full max-w-206.5 h-157 rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={defaultImage}
                alt={items[openIndex >= 0 ? openIndex : 0]?.title || "Default"}
                fill
                className="object-cover transition-all duration-500"
                sizes="360px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
