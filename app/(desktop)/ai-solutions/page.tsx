import Link from "next/link";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui";

export const metadata = {
  title: "AI Solutions | DDip AI",
  description:
    "Discover our AI-powered solutions for creative production, influencer marketing, and automation.",
};

const solutions = [
  {
    title: "AI Content Generation",
    description:
      "Generate engaging content at scale — from copy to visuals — with AI automation. Our systems produce brand-consistent content across every channel.",
    href: "/ai-solutions/ai-content",
    features: [
      "Social media content at scale",
      "Blog & article generation",
      "Visual content creation",
      "Brand voice consistency",
    ],
  },
  {
    title: "AI Influencer",
    description:
      "Create virtual influencers powered by AI for brand campaigns, social media, and digital marketing. Fully customizable to your brand identity.",
    href: "/ai-solutions/ai-influencer",
    features: [
      "Photorealistic AI personas",
      "Custom brand alignment",
      "Social media integration",
      "Multi-platform content",
    ],
  },
  {
    title: "AI Commercial Production",
    description:
      "Produce high-quality commercials and visual content using cutting-edge AI technology. From concept to final cut, faster than ever.",
    href: "/ai-solutions/ai-commercial",
    features: [
      "AI-driven video production",
      "Rapid concept iteration",
      "Cost-effective scaling",
      "Studio-quality output",
    ],
  },
  {
    title: "AI Brand Ambassador",
    description:
      "Generate AI-powered brand ambassadors that represent your company 24/7 across all digital touchpoints with consistent messaging.",
    href: "/ai-solutions/ai-influencer",
    features: [
      "Always-on representation",
      "Consistent brand voice",
      "Multi-language support",
      "Adaptive personality",
    ],
  },
  {
    title: "Automated Workflows",
    description:
      "Streamline your entire creative pipeline with intelligent automation. From brief to delivery, our AI agents handle the heavy lifting.",
    href: "/ai-solutions/automation",
    features: [
      "End-to-end automation",
      "AI agent workflows",
      "Process optimization",
      "Real-time monitoring",
    ],
  },
  {
    title: "GEO for Websites",
    description:
      "Optimize your web presence with AI-driven geographic targeting, content localization, and regional performance analytics.",
    href: "/ai-solutions/geo",
    features: [
      "Geographic optimization",
      "Content localization",
      "Regional analytics",
      "Multi-market strategy",
    ],
  },
];

export default function AISolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark-bg py-32 lg:py-40">
        <Container>
          <p className="font-heading text-sm uppercase tracking-widest text-teal-500">
            What We Do
          </p>
          <h1 className="mt-4 font-heading text-[clamp(48px,6vw,100px)] font-medium uppercase leading-[1.05] text-white">
            AI SOLUTIONS
          </h1>
          <p className="mt-8 max-w-2xl text-body-sm leading-[1.7] text-white/50">
            Design-driven intelligence at every step. Our specialized AI modules
            in creativity, automation, and strategy empower brands to lead in
            the AI era.
          </p>
        </Container>
      </section>

      {/* Solutions Grid */}
      <section className="bg-dark-bg pb-32">
        <Container>
          <div className="grid grid-cols-2 gap-8">
            {solutions.map((solution, i) => (
              <Link
                key={solution.title}
                href={solution.href}
                className="group rounded-[var(--radius-card)] border border-border-dark bg-dark-surface p-10 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5"
              >
                {/* Number */}
                <span className="font-heading text-sm text-teal-500">
                  0{i + 1}
                </span>

                <h2 className="mt-4 font-heading text-2xl font-medium text-white">
                  {solution.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  {solution.description}
                </p>

                {/* Features list */}
                <ul className="mt-6 space-y-2">
                  {solution.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-white/40"
                    >
                      <span className="h-1 w-1 rounded-full bg-teal-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Arrow */}
                <div className="mt-8 flex items-center gap-2 text-sm font-medium text-teal-500 transition-transform group-hover:translate-x-2">
                  Learn More
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="bg-dark-bg py-24 border-t border-border-dark">
        <Container className="text-center">
          <h2 className="font-heading text-subsection font-medium text-white">
            Ready to transform your brand with AI?
          </h2>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Link href="/start-project">
              <Button variant="primary" size="lg">
                Start a Project
              </Button>
            </Link>
            <Link href="/lets-connect">
              <Button variant="secondary" size="lg">
                Let&apos;s Connect
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
