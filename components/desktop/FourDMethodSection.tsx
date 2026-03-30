const methodSteps = [
  {
    num: "01", title: "Define", icon: "/images/geo/icon-01.svg", rotate: "-22deg",
    desc: "We identify audience intent, search behavior, and the questions AI systems need to answer.",
    bg: "rgba(225, 225, 225, 1)", textColor: "#063746",
  },
  {
    num: "02", title: "Design", icon: "/images/geo/icon-02.svg", rotate: "-9deg",
    desc: "Content structure, hierarchy, and semantic flow are shaped for clarity and relevance.",
    bg: "rgba(28, 227, 244, 1)", textColor: "#063746",
  },
  {
    num: "03", title: "Develop", icon: "/images/geo/icon-03.svg", rotate: "9deg",
    desc: "AI-readable content and contextual signals are implemented across pages.",
    bg: "rgba(20, 83, 101, 1)", textColor: "#ffffff",
  },
  {
    num: "04", title: "Deliver", icon: "/images/geo/icon-04.svg", rotate: "22deg",
    desc: "Optimized content is deployed with measurable improvements in visibility and discoverability.",
    bg: "rgba(3, 158, 183, 1)", textColor: "#ffffff",
  },
];

export default function FourDMethodSection() {
  return (
    <section className="py-24 px-[60px]" style={{ backgroundColor: "#F0F2EF" }}>
      <h2
        className="text-center font-heading text-[48px] font-medium uppercase leading-[1.05] text-[#063746]"
        style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
      >
        Our 4D Method
      </h2>

      {/* Cards fan layout */}
      <div
        className="relative mx-auto mt-20 flex items-center justify-center gap-24"
        style={{ height: "600px", maxWidth: "1600px" }}
      >
        {/* Dashed connecting line */}
        <div className="absolute top-[38%] left-[8%] right-[8%] border-t-2 border-dashed border-[#063746]/20 z-0" />

        {methodSteps.map((step, i) => (
          <div
            key={step.title}
            className="relative z-10 flex-shrink-0"
            style={{
              transform: `rotate(${step.rotate}) translateY(${i === 0 ? "80px" : i === 1 ? "25px" : i === 2 ? "25px" : "80px"})`,
              marginLeft: i === 0 ? "0" : "-10px",
            }}
          >
            <div
              className="w-[354px] h-[465px] rounded-[24px] p-6 flex flex-col shadow-lg"
              style={{ backgroundColor: step.bg }}
            >
              {/* Number */}
              <span
                className="text-[13px] font-medium opacity-50 text-center"
                style={{ color: step.textColor, fontFamily: "var(--font-body)" }}
              >
                {step.num}
              </span>

              {/* Icon */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-14 h-14 opacity-80"
                  style={{ filter: step.textColor === "#ffffff" ? "invert(1)" : "none" }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-[28px] font-semibold leading-tight mb-3 text-center"
                style={{ color: step.textColor, fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-[12px] leading-[1.5] opacity-70 text-center"
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
