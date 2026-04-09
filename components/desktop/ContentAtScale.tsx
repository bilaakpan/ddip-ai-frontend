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
        <div className="relative overflow-hidden rounded-[24px] px-16 py-16 flex items-start justify-between min-h-[600px]"
          style={{ background: "rgba(0,0,0,1)", backdropFilter: "blur(238.3px)" }}>

          {/* BG image */}
          <Image src={bgImage} alt="bg" fill  sizes="100vw" />

          {/* Dark overlay — sides only */}
          <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

          {/* Left */}
          <div className="relative z-10 w-[35%]">
            
            <h2 className="text-[48px] font-medium leading-[1.1]" style={{  color: "#FFFFFF" }}>
              {heading}
            </h2>
            <p className={`mt-4 text-[18px] ${descriptionClassName}`} style={{  color: "#FFFFFF" }} >
              {description1}
            </p>
            {description2 && (
              <p className={`mt-3 ${descriptionClassName}`} style={{  color: "#FFFFFF" }}>
                {description2}
              </p>
            )}
          </div>

          {/* Right — feature rows */}
          <div className="relative z-10 w-[25%] flex flex-col gap-3">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3 rounded-[10px] px-4 py-3"
                style={{ background: "#0000004D", backdropFilter: "blur(45.31px)" }}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/10">
                  <img src={item.icon} alt={item.label} className="w-4 h-4 object-contain" />
                </div>
                <span className="text-[15px] text-white" >{item.label}</span>
              </div>
            ))}
            {tagline && (
              <p className="mt-4 text-[18px] font-medium text-white" style={{ fontFamily: "SF Pro Display" }}>
                {tagline}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
