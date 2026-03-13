"use client";

import MobileSolutionPage from "@/components/mobile/MobileSolutionPage";

const useCases = [
  {
    title: "Social Media",
    description:
      "Platform-native posts, carousels, reels scripts, and stories tailored for Instagram, TikTok, LinkedIn, and X. Optimized for engagement and algorithmic reach.",
  },
  {
    title: "Blog & Articles",
    description:
      "SEO-optimized long-form articles, thought leadership pieces, and industry reports that establish authority and drive organic traffic to your website.",
  },
  {
    title: "Visual Content",
    description:
      "AI-generated graphics, infographics, presentation decks, and social media visuals that maintain brand consistency across every touchpoint.",
  },
  {
    title: "Email Marketing",
    description:
      "High-converting email sequences, newsletters, and drip campaigns crafted with AI-driven personalization for maximum open rates and click-throughs.",
  },
  {
    title: "Ad Copy",
    description:
      "Performance-driven ad copy for Google, Meta, LinkedIn, and programmatic campaigns. A/B tested headlines, descriptions, and CTAs engineered for conversions.",
  },
  {
    title: "Brand Voice",
    description:
      "Custom AI models trained on your brand voice, tone, and messaging guidelines. Ensure every piece of content sounds unmistakably like your brand.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Strategy & Audit",
    description:
      "We analyze your existing content, audience data, and competitive landscape to build a comprehensive AI content strategy aligned with your business goals.",
  },
  {
    step: "02",
    title: "Voice Calibration",
    description:
      "We train our AI systems on your brand voice, style guides, and top-performing content to ensure consistent, on-brand output from day one.",
  },
  {
    step: "03",
    title: "Content Production",
    description:
      "Our AI pipeline generates, reviews, and refines content at scale — from social posts to long-form articles — with human editorial oversight at every stage.",
  },
  {
    step: "04",
    title: "Publish & Optimize",
    description:
      "Content is published on a strategic schedule. We continuously analyze performance data and optimize messaging, format, and timing for maximum impact.",
  },
];

const faqItems = [
  {
    question: "How do you ensure AI content doesn't sound generic?",
    answer:
      "We train our AI models specifically on your brand voice, existing high-performing content, and style guidelines. Every piece goes through a calibration process where we fine-tune tone, vocabulary, and messaging patterns. The result is content that sounds distinctly like your brand, not a template. Human editors review output to maintain quality and authenticity.",
  },
  {
    question: "Can AI content rank well in search engines?",
    answer:
      "Yes. Our AI content is built on comprehensive SEO research — keyword mapping, search intent analysis, and competitive gap assessment. We structure articles for featured snippets, optimize meta data, and build topical authority through content clusters. Our clients consistently see measurable organic traffic growth within 3-6 months.",
  },
  {
    question: "What happens if the content needs revisions?",
    answer:
      "Revisions are built into our process. Because AI can regenerate and refine content rapidly, we offer unlimited revision rounds at no additional cost. Most revisions are completed within hours, not days. We also incorporate your feedback into our AI models so future content better matches your expectations from the start.",
  },
  {
    question: "How do you handle content across different languages and markets?",
    answer:
      "Our AI content pipeline supports 30+ languages with native-level quality. Rather than simple translation, we localize content — adapting cultural references, idioms, and messaging for each market. Every localized piece is reviewed by native-speaking editors to ensure accuracy and cultural relevance.",
  },
];

export default function MobileAiContentPage() {
  return (
    <MobileSolutionPage
      pageSlug="ai-content"
      heroTitle="AI Content Generation"
      heroSubtitle="Scale your content production with AI that understands your brand voice. From social media to long-form articles, generate high-performing content across every channel and format — faster, cheaper, and more consistently than ever."
      heroImage="/images/ai-content/hero-slider.png"
      whatTitle="What is AI Content Generation?"
      whatDescription="AI content generation uses advanced language models trained on your brand voice to produce high-quality written and visual content at scale. From social media posts to long-form articles, our AI content engine covers the full spectrum of content marketing — delivering consistent, on-brand output across every channel."
      whatWeDoTitle="Every Format Your Brand Needs"
      whatWeDoDescription="Our AI content engine covers the full spectrum of content marketing — from snackable social posts to in-depth editorial content."
      useCases={useCases}
      faqItems={faqItems}
      processSteps={processSteps}
    />
  );
}
