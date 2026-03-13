"use client";

import MobileSolutionPage from "@/components/mobile/MobileSolutionPage";

const useCases = [
  {
    title: "Marketing Workflows",
    description:
      "Automate content, campaigns & lead nurturing. Schedule social posts, generate ad copy, and track campaign performance — all on autopilot.",
  },
  {
    title: "Customer Support",
    description:
      "AI-powered ticket routing, auto-responses, and sentiment analysis. Resolve issues faster while maintaining a personal touch.",
  },
  {
    title: "Reporting & Analytics",
    description:
      "Auto-generate dashboards, KPI reports, and data summaries. Turn raw data into actionable insights without lifting a finger.",
  },
  {
    title: "CRM & Sales Ops",
    description:
      "Enrich leads, score prospects, and sync data across your CRM. Keep your pipeline moving with zero manual effort.",
  },
  {
    title: "Internal Operations",
    description:
      "Streamline onboarding, approvals, and document workflows. Free your team from repetitive admin tasks.",
  },
  {
    title: "Creative AI Flows",
    description:
      "Generate visuals, copy variations, and creative briefs using AI. Scale your creative output without scaling your team.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Choose a Template",
    description:
      "Browse our library of 50+ pre-built workflow templates organized by category. Each template is battle-tested and ready to deploy.",
  },
  {
    step: "02",
    title: "Connect Your Tools",
    description:
      "Link your existing apps and services with one-click integrations. We support 200+ tools including CRMs, email, social media, and analytics platforms.",
  },
  {
    step: "03",
    title: "Customize & Configure",
    description:
      "Tailor triggers, actions, and conditions to match your exact business logic. No code required — our visual builder makes it intuitive.",
  },
  {
    step: "04",
    title: "Launch & Monitor",
    description:
      "Activate your workflow and watch it run. Real-time monitoring, error alerts, and performance dashboards keep you in full control.",
  },
];

const faqItems = [
  {
    question: "What are Automated Workflows?",
    answer:
      "Automated Workflows are pre-built or custom-designed sequences of actions that connect your tools and automate repetitive tasks. They use AI to handle everything from data entry and email responses to complex multi-step business processes — running 24/7 without manual intervention.",
  },
  {
    question: "How do I use these workflow templates?",
    answer:
      "Simply browse our template library, select a workflow that matches your needs, connect your tools with one-click integrations, and customize any triggers or actions. Most templates can be deployed in under 10 minutes with no coding required.",
  },
  {
    question: "Do I need technical knowledge to use these workflows?",
    answer:
      "Not at all. Our templates are designed for non-technical users. The visual builder uses a drag-and-drop interface, and each template comes with step-by-step setup instructions. For advanced customization, our team provides full support.",
  },
  {
    question: "Can I modify or combine templates?",
    answer:
      "Yes — every template is fully customizable. You can modify triggers, add or remove steps, change conditions, and even combine multiple templates into a single workflow. Think of templates as starting points that you shape to fit your exact needs.",
  },
  {
    question: "Which integrations are supported?",
    answer:
      "We support 200+ integrations including popular tools like HubSpot, Slack, Gmail, Notion, Salesforce, Shopify, Google Sheets, Zapier, Make, and many more. If you need a custom integration, our team can build it for you.",
  },
  {
    question: "How much do Automated Workflows cost?",
    answer:
      "Template-based workflows are included in all plans. Pricing is based on the number of workflow runs per month and the complexity of your automations. We offer starter, growth, and enterprise tiers. Contact us for a custom quote tailored to your usage.",
  },
  {
    question: "Can you help me set up the first automation?",
    answer:
      "Absolutely. Every new client gets a free onboarding session where our automation specialists help you choose, customize, and deploy your first workflow. We ensure everything is running smoothly before you go live.",
  },
];

const partnerLogos = [
  { name: "Make" },
  { name: "HubSpot" },
  { name: "Zapier" },
  { name: "GPT-4" },
  { name: "Claude AI" },
  { name: "n8n" },
];

export default function MobileAutomationPage() {
  return (
    <MobileSolutionPage
      pageSlug="automation"
      heroTitle="Automated Workflows"
      heroSubtitle="From ready-to-use workflow templates to fully customized automation systems — designed to streamline your marketing, sales, and operations."
      heroImage="/images/automation/hero-slider.png"
      partnerLogos={partnerLogos}
      whatTitle="What are Automated Workflows?"
      whatDescription="Automated Workflows are pre-built or custom-designed sequences of actions that connect your tools and automate repetitive tasks. They use AI to handle everything from data entry and email responses to complex multi-step business processes — running 24/7 without manual intervention."
      whatWeDoTitle="Template-Based Automation Ecosystem"
      whatWeDoDescription="Pre-built, plug-and-play workflow templates designed to automate repetitive tasks instantly. No setup headaches — just connect your tools and start automating."
      expandingTitle="Tailored Workflows"
      expandingDescription="For businesses that need more than templates — we design fully customized, AI-powered workflow systems tailored to your structure, data, and tools."
      toolEcosystemTitle="Built on Top Of"
      toolEcosystemDescription="Our workflows are built on industry-leading automation platforms including Make, HubSpot, Zapier, GPT-4, Claude AI, and n8n."
      useCases={useCases}
      faqItems={faqItems}
      processSteps={processSteps}
    />
  );
}
