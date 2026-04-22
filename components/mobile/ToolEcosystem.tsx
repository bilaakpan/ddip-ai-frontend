import React from "react";

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function ToolEcosystem() {
  return (
    <section className="bg-white py-10" style={safePx}>
      <h2 className="font-heading text-[24px] text-center font-bold leading-snug text-[#126478]">
        Our Tool Ecosystem
      </h2>
      <p className="mt-3 text-[16px] leading-relaxed text-center text-[#063746]">
          Our ecosystem is built around selecting the right AI tools for each creative challenge. The real value comes from how these tools are orchestrated to support storytelling and visual quality.
        </p>
      </section>
  )
}
