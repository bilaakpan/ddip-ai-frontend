"use client";

import Image from "next/image";

interface FeatureItem {
  icon: string;
  label: string;
}

interface ContentAtScaleProps {
  heading: string;
  description1: string;
  description2?: string;
  tagline?: string;
  bgImage: string;
  bgOpacity?: string;
  descriptionClassName?: string;
  features: FeatureItem[];
}

export default function ContentAtScale({
  heading,
  description1,
  description2,
  tagline,
  bgImage,
  bgOpacity = "opacity-30",
  descriptionClassName = "text-[15px] leading-[1.6]",
  features,
}: ContentAtScaleProps) {
  return (
    <section className="bg-light-bg py-12">
      <div className="px-[60px]">
        <div className="relative overflow-hidden rounded-[24px] px-16 py-16 flex items-start justify-between min-h-[320px]"
          style={{ background: "rgba(0,0,0,1)", backdropFilter: "blur(238.3px)" }}>

          {/* BG image */}
          <Image src={bgImage} alt="bg" fill  sizes="100vw" />

          {/* Left */}
          <div className="relative z-10 w-[45%]">
            <h2 className="text-[48px] font-medium leading-[1.1]" style={{ fontFamily: "Bricolage Grotesque", color: "#FFFFFF" }}>
              {heading}
            </h2>
            <p className={`mt-4 ${descriptionClassName}`} style={{ fontFamily: "SF Pro Display", color: "#FFFFFF" }}>
              {description1}
            </p>
            {description2 && (
              <p className={`mt-3 ${descriptionClassName}`} style={{ fontFamily: "SF Pro Display", color: "#FFFFFF" }}>
                {description2}
              </p>
            )}
          </div>

          {/* Right — feature rows */}
          <div className="relative z-10 w-[40%] flex flex-col gap-3">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[10px] px-4 py-3"
                style={{ background: "#FFFFFF1A", backdropFilter: "blur(45.31px)" }}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <Image src={item.icon} alt={item.label} width={16} height={16} />
                </div>
                <span className="text-[13px] text-white" style={{ fontFamily: "SF Pro Display" }}>{item.label}</span>
              </div>
            ))}
            {tagline && (
              <p className="mt-4 text-[14px] font-medium text-white" style={{ fontFamily: "SF Pro Display" }}>
                {tagline}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
