"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

type Influencer = {
  type: string;
  title: string;
  name: string;
  region: string;
  language: string;
  gender: string;
  archetype: string;
  description: string;
  image: string;
};

type Props = {
  influencers: Influencer[];
  bgColors: Record<string, string>;
  onSelect: (item: Influencer) => void;
};

function CarouselRow({
  items,
  bgColors,
  onSelect,
  reverse = false,
}: {
  items: Influencer[];
  bgColors: Record<string, string>;
  onSelect: (item: Influencer) => void;
  reverse?: boolean;
}) {
  // Each row gets its own independent autoplay instance
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1, watchDrag: false },
    [AutoPlay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  // For reverse row: override autoplay with scrollPrev interval
  useEffect(() => {
    if (!emblaApi || !reverse) return;

    // Scroll to end first so reverse feels natural
    emblaApi.scrollTo(items.length - 1, true);

    const interval = setInterval(() => {
      emblaApi.scrollPrev();
    }, 2500);

    return () => clearInterval(interval);
  }, [emblaApi, reverse, items.length]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [items, emblaApi]);

  const displayItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {displayItems.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="group shrink-0"
            style={{ flex: "0 0 25%", paddingRight: "24px" }}
          >
            <div className="relative aspect-[376/518] w-full overflow-hidden rounded-3xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="25vw"
              />

              {/* Top tag */}
              <div className={`absolute right-5 top-5 rounded-full px-6 py-2 ${bgColors[item.type as keyof typeof bgColors] ?? "bg-white/20"}`}>
                <span className="text-[14px] font-medium uppercase text-black">
                  {item.type}
                </span>
              </div>

              {/* Bottom row */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                <div className="flex items-center gap-3 rounded-full bg-[#063746]/80 px-4 py-2 backdrop-blur-md">
                  <span className="text-[16px] text-white">{item.name}</span>
                  <img
                    src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c6dfd82-c580-49a7-be40-a53090c65400/public"
                    alt="flag"
                    className="h-5 w-5 rounded-sm object-cover"
                  />
                </div>
                <div
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/80 transition hover:bg-white"
                  onClick={() => onSelect(item)}
                >
                  <svg className="h-5 w-5 text-[#012F3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Archetype caption */}
            <div className="mt-3">
              <p className="font-heading text-[16px] leading-[1.2] text-white/80">
                "{item.archetype}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InfluencerCarousel({ influencers, bgColors, onSelect }: Props) {
  if (influencers.length === 0) {
    return (
      <p className="mt-8 text-center text-[20px] text-white/80" style={{ fontFamily: "var(--font-body)" }}>
        No influencers match the selected filters.
      </p>
    );
  }

  const mid = Math.ceil(influencers.length / 2);
  const row1 = influencers.slice(0, mid);
  const row2 = influencers.slice(mid).length > 0 ? influencers.slice(mid) : [...influencers].reverse();

  return (
    <div className="mt-10 flex flex-col gap-8">
      {/* Row 1 — scrolls right (forward) */}
      <CarouselRow items={row1} bgColors={bgColors} onSelect={onSelect} reverse={false} />
      {/* Row 2 — scrolls left (backward), fully independent */}
      <CarouselRow items={row2} bgColors={bgColors} onSelect={onSelect} reverse={true} />
    </div>
  );
}
