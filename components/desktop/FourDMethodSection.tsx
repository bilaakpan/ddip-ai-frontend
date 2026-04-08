const methodSteps = [
  {
    num: "01", title: "Define", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/01b5fee0-1a9b-4547-9780-99ad724e1e00/public", rotate: "-22deg",
    desc: "We identify audience intent, search behavior, and the questions AI systems need to answer.",
    bg: "rgba(225, 225, 225, 1)", textColor: "#221D1D",
  },
  {
    num: "02", title: "Design", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/717131ad-013b-4176-10f7-799df95ebf00/public", rotate: "-9deg",
    desc: "Content structure, hierarchy, and semantic flow are shaped for clarity and relevance.",
    bg: "rgba(28, 227, 244, 1)", textColor: "#002834",
  },
  {
    num: "03", title: "Develop", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c2e3a539-3fba-4d5c-8f4d-f18617091d00/public", rotate: "9deg",
    desc: "AI-readable content and contextual signals are implemented across pages.",
    bg: "rgba(20, 83, 101, 1)", textColor: "#ffffff",
  },
  {
    num: "04", title: "Deliver", icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/dfc1bf85-d080-4762-88b1-c6399ef5cc00/public", rotate: "22deg",
    desc: "Optimized content is deployed with measurable improvements in visibility and discoverability.",
    bg: "rgba(3, 158, 183, 1)", textColor: "#EBFFFF",
  },
];

export default function FourDMethodSection() {
  return (
    <section className="py-24 px-[60px]" style={{ backgroundColor: "#F0F2EF", height: "1000px" }}>
      <h2
        className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]"
        style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
      >
        Our 4D Method
      </h2>

      {/* Cards fan layout */}
      <div
        className="relative mx-auto mt-20 flex items-center justify-center gap-40"
        style={{ height: "600px", maxWidth: "1600px" }}
      >
        {/* Dashed connecting line */}
        <div className="absolute top-[50%] left-[8%] right-[8%] border-t-2 border-dashed border-[#063746]/20 z-0" />

        {methodSteps.map((step, i) => (
          <div
            key={step.title}
            className="relative z-10 flex-shrink-0"
            style={{
              transform: `rotate(${step.rotate}) translateY(${i === 0 ? "140px" : i === 1 ? "20px" : i === 2 ? "20px" : "140px"})`,
              marginLeft: i === 0 ? "0" : "-10px",
            }}
          >
            <div
              className="w-[354px] h-[465px] rounded-[24px] p-6 flex flex-col shadow-lg"
              style={{ backgroundColor: step.bg }}
            >
              {/* Number */}
              <span
                className="text-[22px] font-medium opacity-50 text-center"
                style={{ color: step.textColor, fontFamily: "var(--font-body)" }}
              >
                {step.num}
              </span>

              {/* Icon */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-18 h-18 opacity-80"

                />
              </div>

              {/* Title */}
              <h3
                className="text-[40px] font-semibold leading-tight mb-3 text-center"
                style={{ color: step.textColor, fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-[18px] leading-[1.5] opacity-70 text-center"
                style={{ color: step.textColor, fontFamily: "var(--font-body)" }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
