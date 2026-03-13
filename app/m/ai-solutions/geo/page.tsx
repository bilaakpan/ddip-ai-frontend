"use client";

import MobileSolutionPage from "@/components/mobile/MobileSolutionPage";

const useCases = [
  {
    title: "E-Commerce & Retail",
    description:
      "Get your products recommended when users ask AI assistants for purchase advice. Optimize product descriptions and reviews for AI retrieval.",
  },
  {
    title: "SaaS & Technology",
    description:
      "Ensure your software appears in AI-generated comparison lists and recommendation queries. Build authority in your product category.",
  },
  {
    title: "Professional Services",
    description:
      "Position your firm as the AI-cited expert in your field. From law firms to consulting agencies — be the recommended answer.",
  },
  {
    title: "Healthcare & Wellness",
    description:
      "Build trusted authority so AI health assistants recommend your practice, products, or content to users seeking medical information.",
  },
  {
    title: "Real Estate & Hospitality",
    description:
      "Appear in AI-powered travel and property searches. Optimize listings and content for conversational AI recommendations.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Audit & Analysis",
    description:
      "We analyze your current AI search presence across all major platforms, identify gaps, and benchmark against competitors.",
  },
  {
    step: "02",
    title: "Content Restructuring",
    description:
      "Rewrite and restructure key pages using GEO best practices — clear entity definitions, authoritative claims, and AI-friendly formatting.",
  },
  {
    step: "03",
    title: "Technical Implementation",
    description:
      "Deploy structured data, knowledge panels, and semantic markup that help AI models accurately parse and represent your content.",
  },
  {
    step: "04",
    title: "Monitor & Iterate",
    description:
      "Continuously track your AI visibility metrics, adjust strategies based on algorithm changes, and maintain your competitive edge.",
  },
];

const faqItems = [
  {
    question: "What is GEO and how is it different from SEO?",
    answer:
      "GEO (Generative Engine Optimization) focuses on optimizing your content for AI-powered search engines like ChatGPT, Gemini, and Perplexity — not just traditional search engines like Google. While SEO targets keyword rankings and backlinks, GEO optimizes for semantic understanding, entity recognition, and citation authority so AI models recommend your brand in generated responses.",
  },
  {
    question: "Which AI platforms does GEO target?",
    answer:
      "We optimize for all major AI search platforms including ChatGPT (with browsing), Google Gemini, Microsoft Copilot, Perplexity AI, Claude, and emerging AI-powered search experiences. As new platforms launch, we continuously adapt our strategies to ensure coverage.",
  },
  {
    question: "How long does it take to see results from GEO?",
    answer:
      "Initial improvements in AI visibility can appear within 4-6 weeks as AI models re-index your optimized content. However, building strong citation authority is an ongoing process — most clients see significant, measurable results within 3 months of implementation.",
  },
  {
    question: "Do I still need traditional SEO if I invest in GEO?",
    answer:
      "Yes — GEO complements traditional SEO, it doesn't replace it. Strong SEO fundamentals (quality content, technical health, backlinks) actually improve your GEO performance because AI models often draw from well-ranked sources. Think of GEO as the next layer on top of your SEO foundation.",
  },
  {
    question: "Can you guarantee AI will recommend my brand?",
    answer:
      "No ethical provider can guarantee specific AI outputs since these models are controlled by third parties. What we guarantee is implementing every known best practice to maximize your probability of being cited. Our track record shows significant visibility improvements for all clients who follow through with our recommendations.",
  },
  {
    question: "How do you measure GEO success?",
    answer:
      "We track multiple metrics including: AI citation frequency (how often AI mentions your brand), referral traffic from AI platforms, branded query volume, share of voice in AI responses vs. competitors, and conversion rates from AI-referred visitors. You get a custom dashboard with all metrics.",
  },
];

export default function MobileGeoPage() {
  return (
    <MobileSolutionPage
      pageSlug="geo"
      heroTitle="GEO for Websites"
      heroSubtitle="Generative Engine Optimization — the next evolution of search visibility. Position your brand to be discovered, cited, and recommended by AI-powered search engines."
      heroImage="/images/geo/hero-slider.png"
      whatTitle="What is GEO?"
      whatDescription="As AI transforms how people search, traditional SEO alone is no longer enough. GEO (Generative Engine Optimization) focuses on optimizing your content for AI-powered search engines like ChatGPT, Gemini, and Perplexity. It ensures your brand is the one AI recommends — across every platform, every query, every conversation."
      whatWeDoTitle="How We Optimize for AI Search"
      whatWeDoDescription="We restructure your content, implement semantic markup, and build citation authority so AI models understand and recommend your brand over competitors — from structured data enhancement to multi-platform visibility."
      useCases={useCases}
      faqItems={faqItems}
      processSteps={processSteps}
      expandingTitle="40% of Search Will Be AI-Generated by 2027"
      expandingDescription="Major search engines are shifting to AI-powered results. Brands that don't optimize for GEO will lose visibility as traditional SEO becomes insufficient. Early movers win the AI visibility race."
      toolEcosystemTitle="Multi-Platform Visibility"
      toolEcosystemDescription="Ensure your brand appears across ChatGPT, Gemini, Perplexity, Copilot, and other AI-powered search experiences. We monitor 200+ AI platforms with 24/7 real-time tracking."
    />
  );
}
