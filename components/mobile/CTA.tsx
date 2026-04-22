import { Link } from "lucide-react";

export default function CTA() {
    return (
    <section
        className="bg-light-bg"
        style={{
          paddingLeft: "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingBottom: "max(64px, calc(16px + env(safe-area-inset-bottom)))",
        }}
      >
        <div className="rounded-[20px] p-6 text-start" style={{ background: "linear-gradient(-90deg,#002834 0%,#129CAC 100%)" }}>
          <p className="font-heading text-[22px] font-bold text-[#EBFFFF]">
            Let&apos;s design what&apos;s next together.
          </p>
          <Link href="/start-project" className="mt-5 inline-flex  w-full items-center justify-center gap-2 rounded-full bg-[#1CE3F4] px-6 py-3 text-[18px] font-medium text-dark-bg active:opacity-80">
            Begin Your Transformation
          </Link>
        </div>
      </section>
    )
}