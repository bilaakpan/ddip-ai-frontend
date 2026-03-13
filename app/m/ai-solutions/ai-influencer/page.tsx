"use client";

import MobileSolutionPage from "@/components/mobile/MobileSolutionPage";

const useCases = [
  {
    title: "Organic Social Media Content",
    description:
      "Create consistent, brand-aligned social media content with AI influencers that post daily without the unpredictability of human creators.",
  },
  {
    title: "Advertising Campaigns",
    description:
      "Launch targeted ad campaigns featuring AI influencers tailored to your audience demographics, interests, and regional preferences.",
  },
  {
    title: "Brand Ambassador",
    description:
      "Deploy a permanent, always-on brand ambassador that represents your company across all digital touchpoints with perfect consistency.",
  },
  {
    title: "Blog & SEO Content",
    description:
      "Generate SEO-optimized blog content featuring your AI influencer, driving organic traffic while building a recognizable brand persona.",
  },
  {
    title: "Product Promotion",
    description:
      "Showcase products with photorealistic AI-generated imagery that adapts to any style, season, or campaign theme instantly.",
  },
  {
    title: "Community Management",
    description:
      "Build and engage communities with AI-powered personas that interact authentically and maintain your brand voice at scale.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Brief",
    description:
      "We learn about your brand, target audience, and goals to design the perfect AI influencer persona.",
  },
  {
    step: "02",
    title: "Character Design",
    description:
      "Our AI generates multiple persona options — appearance, personality, voice, and style — for your approval.",
  },
  {
    step: "03",
    title: "Content Production",
    description:
      "We produce a content library — photos, videos, stories — ready for deployment across your channels.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    description:
      "Your AI influencer goes live. We monitor performance and continuously optimize content based on analytics.",
  },
];

const faqItems = [
  {
    question: "How realistic are your AI influencers?",
    answer:
      "Our AI influencers are photorealistic and virtually indistinguishable from real people. We use the latest generative AI models to create consistent, believable personas.",
  },
  {
    question: "Can I customize the influencer's appearance?",
    answer:
      "Absolutely. Every aspect is customizable — age, ethnicity, style, clothing, expressions, and more. We create a character that perfectly aligns with your brand.",
  },
  {
    question: "What platforms do AI influencers work on?",
    answer:
      "Our AI influencers can create content for Instagram, TikTok, YouTube, LinkedIn, Twitter/X, and any other social platform. We optimize content for each platform's format.",
  },
  {
    question: "How much does an AI influencer cost compared to a real one?",
    answer:
      "AI influencers typically cost 60-80% less than comparable human influencers, with the advantage of unlimited content production, no scheduling conflicts, and complete brand control.",
  },
  {
    question: "Do I own the AI influencer?",
    answer:
      "Yes. Once created, the AI influencer and all associated content are fully owned by your brand. We transfer all rights and assets upon project completion.",
  },
  {
    question: "How long does it take to create an AI influencer?",
    answer:
      "The initial persona can be ready within 1-2 weeks. A full content library for launch typically takes 3-4 weeks from brief to delivery.",
  },
];

export default function MobileAiInfluencerPage() {
  return (
    <MobileSolutionPage
      pageSlug="ai-influencer"
      heroTitle="AI Influencer"
      heroSubtitle="Create photorealistic virtual influencers powered by AI for brand campaigns, social media, and digital marketing. Fully customizable, always available, and completely under your control."
      heroImage="/images/ai-influencer/portrait-07.png"
      whatTitle="What is an AI Influencer?"
      whatDescription="An AI influencer is a virtual persona created using generative artificial intelligence. Unlike traditional influencers, AI influencers are fully controllable, endlessly customizable, and available 24/7 to create content and engage with your audience. They can appear on any platform, wear any outfit, travel to any location, and maintain perfect brand consistency — all without the risks and costs of human talent management."
      whatWeDoTitle="How Brands Use AI Influencers"
      whatWeDoDescription="From organic social media to advertising campaigns, AI influencers deliver consistent brand presence across every digital touchpoint — at a fraction of the cost."
      useCases={useCases}
      faqItems={faqItems}
      processSteps={processSteps}
    />
  );
}
