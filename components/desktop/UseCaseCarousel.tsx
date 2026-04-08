"use client";
import HlsPlayer from "@/components/desktop/video";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

interface UseCaseItem {
  title: string;
  video: string;
  tags: string[];
}

interface UseCaseCarouselProps {
  items: UseCaseItem[];
}

export default function UseCaseCarousel({ items }: UseCaseCarouselProps) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, containScroll: "keepSnaps", align: "start" },
    [AutoPlay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0 flex flex-col" style={{ width: "370px", paddingRight: "20px" }}>
            <div className="relative overflow-hidden rounded-[16px] bg-[#D9D9D9]" style={{ height: "520px" }}>
              <HlsPlayer
                src={item.video}
                autoPlay={true}
                controls={false}
                muted={true}
                loop={true}
                fillHeight={true}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex flex-wrap justify-end gap-1.5">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/80 px-2.5 py-1 text-[10px] font-medium text-[#063746] backdrop-blur-sm"
                    style={{ fontFamily: "var(--font-body)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-3 text-[26px] font-medium" style={{ fontFamily: "Bricolage Grotesque", color: "#063746" }}>
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
