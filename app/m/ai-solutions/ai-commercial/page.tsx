"use client";

import MobileSolutionPage from "@/components/mobile/MobileSolutionPage";

const useCases = [
  {
    title: "AI Video Production",
    description:
      "Generate cinematic video content — product demos, brand stories, and social ads — using AI-powered tools that deliver studio-quality results in hours, not weeks.",
  },
  {
    title: "AI Photography",
    description:
      "Create photorealistic product shots, lifestyle imagery, and campaign visuals without studios, models, or location shoots. Unlimited variations, perfect consistency.",
  },
  {
    title: "Motion Graphics",
    description:
      "AI-generated animated graphics, explainer videos, and dynamic visual content that captivates audiences across digital platforms and advertising channels.",
  },
  {
    title: "Post-Production",
    description:
      "AI-enhanced editing, color grading, compositing, and VFX that transforms raw footage into polished commercials. Faster turnaround, consistent quality across deliverables.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Brief & Strategy",
    description:
      "We analyze your campaign goals, target audience, and brand guidelines to develop a production strategy optimized for AI-powered workflows.",
  },
  {
    step: "02",
    title: "Concept Development",
    description:
      "Our creative team produces storyboards, mood boards, and visual concepts using AI to rapidly iterate until we align perfectly with your vision.",
  },
  {
    step: "03",
    title: "AI Production",
    description:
      "Leveraging state-of-the-art generative AI, we produce video, photography, and motion assets at a fraction of the traditional cost and timeline.",
  },
  {
    step: "04",
    title: "Delivery & Optimization",
    description:
      "Final assets are delivered in all required formats. We provide performance-optimized variants for each platform and campaign placement.",
  },
];

const faqItems = [
  {
    question: "How does AI commercial production differ from traditional production?",
    answer:
      "AI commercial production uses generative AI models to create video, photography, and motion graphics without traditional shoots. This eliminates the need for studios, actors, locations, and extensive post-production crews. The result is 3-5x faster delivery and up to 70% cost savings while maintaining broadcast-quality output.",
  },
  {
    question: "What quality level can I expect from AI-generated commercials?",
    answer:
      "Our AI-generated content meets broadcast and digital advertising standards. We use the latest generative models combined with professional post-production workflows to ensure every asset is indistinguishable from traditionally produced content. We provide 4K resolution output suitable for TV, streaming, and digital platforms.",
  },
  {
    question: "Can you match our existing brand guidelines and visual identity?",
    answer:
      "Absolutely. We train our AI workflows on your brand assets, color palettes, typography, and visual language to ensure every piece of content is perfectly on-brand. This consistency actually exceeds what most traditional productions achieve across multiple shoots and campaigns.",
  },
  {
    question: "How many revisions are included in a typical project?",
    answer:
      "Because AI production is inherently iterative, we offer unlimited revision cycles at no additional cost. Unlike traditional reshoots which require scheduling and setup, AI revisions can be turned around in hours — allowing us to fine-tune every detail until you are completely satisfied.",
  },
];

export default function MobileAiCommercialPage() {
  return (
    <MobileSolutionPage
      pageSlug="ai-commercial"
      heroTitle="AI Commercial Production"
      heroSubtitle="Produce broadcast-quality video, photography, and motion graphics powered by AI. Faster turnarounds, lower costs, and unlimited creative iterations — without studios, crews, or location shoots."
      heroImage="/images/ai-commercial/hero-slider.png"
      whatTitle="What is AI Commercial Production?"
      whatDescription="AI commercial production uses generative AI models to create broadcast-quality video, photography, and motion graphics without traditional shoots. This eliminates the need for studios, actors, locations, and extensive post-production crews — delivering stunning content at a fraction of the cost and timeline."
      whatWeDoTitle="What We Produce"
      whatWeDoDescription="From concept to final delivery, our AI-powered production pipeline covers every format modern brands need to compete."
      useCases={useCases}
      faqItems={faqItems}
      processSteps={processSteps}
    />
  );
}
