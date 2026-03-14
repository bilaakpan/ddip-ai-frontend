/**
 * Seed FAQ data via the admin API.
 *
 * Usage:
 *   npx tsx scripts/seed-faqs.ts
 *
 * Requires NEXT_PUBLIC_API_URL env var (or defaults to production backend).
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ddip-backend-production.up.railway.app/api";

const FAQ_DATA = [
  {
    pageSlug: "main",
    question: "What makes DDIP AI different from other AI agencies?",
    answer:
      "We blend advanced AI capabilities with human creative direction, ensuring every output maintains the nuance, emotion, and strategic intent that only human expertise can provide. Our team combines deep tech knowledge with real creative talent.",
    sortOrder: 0,
  },
  {
    pageSlug: "main",
    question: "Do you develop your own AI tools?",
    answer:
      "Yes. We build custom AI pipelines tailored to each project — from generative models for visual content to NLP systems for copy and automation workflows. We leverage cutting-edge open-source and commercial models, fine-tuned for your brand.",
    sortOrder: 1,
  },
  {
    pageSlug: "main",
    question: "How do your AI workflows improve efficiency?",
    answer:
      "Our AI workflows automate repetitive tasks like content generation, scheduling, and data processing, freeing your team to focus on strategy and creativity. Clients typically see 50-70% time savings on production tasks.",
    sortOrder: 2,
  },
  {
    pageSlug: "main",
    question: "What are AI Influencers, and how do they work?",
    answer:
      "AI influencers are photorealistic digital personas powered by generative AI. They can represent your brand across social platforms with perfect consistency, unlimited availability, and complete creative control — at a fraction of the cost of human influencers.",
    sortOrder: 3,
  },
  {
    pageSlug: "main",
    question:
      "How do you ensure the human element remains part of your AI-driven work?",
    answer:
      "Every project starts and ends with human oversight. Our creative directors guide AI outputs, our strategists set the brief, and our editors refine the final product. AI amplifies human creativity — it never replaces it.",
    sortOrder: 4,
  },
  {
    pageSlug: "main",
    question:
      "Can non-creative or technical companies benefit from your workflow solutions?",
    answer:
      "Absolutely. Our workflow automation and AI solutions are designed for any industry — from finance and logistics to healthcare and education. If you have repetitive processes, we can automate them intelligently.",
    sortOrder: 5,
  },
  {
    pageSlug: "main",
    question:
      "How does DDIP stay up to date with evolving AI technologies?",
    answer:
      "Our team continuously evaluates new models, frameworks, and techniques. We maintain partnerships with leading AI providers and invest in R&D to ensure our clients always benefit from the latest advancements.",
    sortOrder: 6,
  },
];

async function login(): Promise<string> {
  const res = await fetch(`${API_BASE}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "admin@ddip.ai",
      password: "changeme123",
    }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const json = await res.json();
  return json.data.token;
}

async function seedFaqs() {
  console.log("Logging in...");
  const token = await login();
  console.log("Authenticated.");

  for (const faq of FAQ_DATA) {
    const res = await fetch(`${API_BASE}/admin/faqs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(faq),
    });

    if (res.ok) {
      console.log(`  ✓ Created: "${faq.question.slice(0, 50)}..."`);
    } else {
      const err = await res.text();
      console.error(`  ✗ Failed: "${faq.question.slice(0, 50)}..." — ${err}`);
    }
  }

  console.log("\nDone. Verify: GET /api/cms/faqs?page_slug=main");
}

seedFaqs().catch(console.error);
