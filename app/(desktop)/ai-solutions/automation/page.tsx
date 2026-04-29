"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cmsApi, type Faq, type Automation } from "@/lib/api";
import HeroPartnersSection from "@/components/desktop/HeroPartnersSection";
import FourDMethodSection from "@/components/desktop/FourDMethodSection";
import FaqSection from "@/components/desktop/FaqSection";
import ContactFormSection from "@/components/desktop/ContactFormSection";
import AccordionWithImage from "@/components/desktop/AccordionWithImage";
import HlsPlayer from "@/components/desktop/video";
/* ─── Data ─── */

const heroPartners = ["VG", "brother", "Vestine", "OPTIMUM", "ColaSel"];

const accordionItems = [
  { title: "Content Automation", description: "Automate the way your brand creates and manages content. From social posts and short videos to trend analyses and scheduling, these workflows save time and keep creativity flowing.", image: "/images/automation/content-automation.png" },
  { title: "Analytics & Insights", description: "Real-time dashboards and AI-driven reporting that turn raw data into actionable business intelligence.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/35a5d56e-da6e-42ce-4072-9b24938c1a00/public" },
  { title: "Conversational Systems", description: "Intelligent chatbots and virtual assistants that handle customer interactions with natural language understanding.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ce65649d-7f6d-4497-8d8a-697ee865d800/public" },
  { title: "Lead Solutions", description: "Automated lead capture, scoring, and nurturing workflows that convert prospects into customers.", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0156ebdc-189b-4bce-808d-49f28c020200/public" },
];

// FAQs and featured automations come from CMS API only — no hardcoded fallback

const methodSteps = [
  { title: "Define", icon: "/images/ai-content/icon-01.svg", rotate: "-8deg" },
  { title: "Design", icon: "/images/ai-content/icon-02.svg", rotate: "-3deg" },
  { title: "Develop", icon: "/images/ai-content/icon-03.svg", rotate: "3deg" },
  { title: "Deliver", icon: "/images/ai-content/icon-04.svg", rotate: "8deg" },
];

const builtOnTools = ["zapier", "HubSpot", "n8n", "Claude"];

interface AutomationCardData {
  title: string;
  image: string;
  icon: string;
}

export default function AutomationPage() {
  const [cmsFaqLeft, setCmsFaqLeft] = useState<string[]>([]);
  const [cmsFaqRight, setCmsFaqRight] = useState<string[]>([]);
  const [cmsFaqLeftAnswers, setCmsFaqLeftAnswers] = useState<string[]>([]);
  const [cmsFaqRightAnswers, setCmsFaqRightAnswers] = useState<string[]>([]);
  const [cmsFeaturedAutomations, setCmsFeaturedAutomations] = useState<AutomationCardData[]>([]);

  useEffect(() => {
    // FAQs
    cmsApi
      .faqs("automation")
      .then((res) => {
        const list = res.data ?? [];
        const mid = Math.ceil(list.length / 2);
        setCmsFaqLeft(list.slice(0, mid).map((f: Faq) => f.question));
        setCmsFaqLeftAnswers(list.slice(0, mid).map((f: Faq) => f.answer));
        setCmsFaqRight(list.slice(mid).map((f: Faq) => f.question));
        setCmsFaqRightAnswers(list.slice(mid).map((f: Faq) => f.answer));
      })
      .catch(() => {
        setCmsFaqLeft([]);
        setCmsFaqRight([]);
        setCmsFaqLeftAnswers([]);
        setCmsFaqRightAnswers([]);
      });

    // Featured automations
    cmsApi
      .automations(true)
      .then((res) => {
        setCmsFeaturedAutomations(
          (res.data ?? []).map((a: Automation) => ({
            title: a.title,
            image: a.icons?.[0]?.icon?.iconUrl || "",
            icon: "",
          }))
        );
      })
      .catch(() => setCmsFeaturedAutomations([]));
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          1. HERO — Marquee "AUTOMATION WITH A..."
          ════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-16 pt-40">
        <div className="absolute right-0 top-0 h-[1000px] w-[100%]">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/77f68331-a8dd-4518-b7e2-6b9f1e86eb00/public"
            alt="Automation showcase"
            fill
            className=""
            sizes="55vw"
            priority
          />
        </div>



        <div className="overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee">
            <h1 className="text-[140px] text-white whitespace-nowrap uppercase">
              Automation with a Creative Touch
            </h1>
          </div>
        </div>

        <div className="relative z-10 mt-8 px-[80px]">
          <h2 className="max-w-lg font-heading text-[60px] font-medium leading-[1.3] text-white">
            Automation Designed for Intelligence and Impact
          </h2>
          <p className="mt-4  text-[26px] w-[640px] leading-[1.6] text-white" style={{ fontFamily: "var(--font-body)" }}>
            Each custom is designed to automate, learn, and optimize — giving your team more time to think, create, and lead.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <Link href="/start-project" className="font-heading text-[32px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              Request a Custom Solution →
            </Link>
          </div>

          <div className="mt-[80px] flex items-start  flex-col gap-4">
            <div className="flex  items-center justify-center ">
              <svg width="99" height="122" viewBox="0 0 99 122" fill="none" className="h-[90px] w-auto" aria-label="Scroll down">
                <g clipPath="url(#arrow-clip)">
                  <path d="M56.9199 0L56.9199 95.9621L89.1853 66.0555L98.7897 75.9435L98.9811 76.9205L49.6919 122L0 76.9205L0.198028 75.9435L9.61097 66.2194L42.0612 95.9621L42.0612 0L56.9199 0Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="arrow-clip">
                    <rect width="98.9811" height="122" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <Link href="#discover" className="font-heading text-[30px] font-medium text-white underline decoration-white/30 underline-offset-8 hover:decoration-[#1CE3F4]">
              View Workflow Templates
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 right-[60px] z-10">
          <p className="text-[32px] tracking-wider text-white" style={{ fontFamily: "var(--font-body)" }}>(SCROLL)</p>
        </div>
      </section>

      {/* Partners Row */}
      <HeroPartnersSection />

      {/* ════════════════════════════════════════════════════════
          2. AUTOMATION MADE SIMPLE — Accordion
          ════════════════════════════════════════════════════════ */}
      <section id="discover" className="px-[60px] pt-24">
        <div className="lg:col-span-2 grid grid-cols-2 gap-12 items-start mb-8">
          <p className="font-heading text-[60px] font-semibold text-[#063746] leading-tight max-w-3xl uppercase" style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}>
            Automation Made Simple, Scalable, and Smart
          </p>
          <div className="flex justify-end">
            <p
              className="text-[#063746] text-[22px] leading-relaxed pt-2 max-w-lg"
              style={{ fontFamily: "var(--font-body)" }}
            >
              A library of intelligent, pre-built workflows to automate what matters most. From content scheduling to customer engagement, each template is designed to connect, perform, and evolve with your business."

            </p>
          </div>
        </div>
      </section>

      <AccordionWithImage
        heading={"Automation Made\nSimple, Scalable, And\nSmart"}
        subheading="A library of intelligent, pre-built workflows to automate what matters most. From content scheduling to customer engagement, each template is designed to connect, perform, and evolve with your business."
        items={accordionItems}
        defaultImage="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/68b2a656-a342-4c0b-9d44-d5c5ed4f4700/public"
      />

      {/* ════════════════════════════════════════════════════════
          3. FEATURED AUTOMATIONS — Grid of cards
          ════════════════════════════════════════════════════════ */}
      <section className="py-24 px-[60px]" style={{ backgroundColor: "#063746" }}>
        <div className="mb-12">
          <h2 className="font-heading text-[50px] font-medium leading-[1.1] text-white">
            Featured Automations,
            <br />
            Designed for Impact
          </h2>
          <div className="flex items-start justify-between mt-4">
            <p className="max-w-xl text-[24px] leading-[1.6] text-white" style={{ fontFamily: "var(--font-body)" }}>
              Choose a workflow that fits your goals. From content generation to data analysis, automation starts here.
            </p>
            <button onClick={() => window.location.href = '/ai-solutions/automation/templates'} className="flex items-center gap-2 rounded-full bg-white px-7 py-3 text-[20px] font-medium text-[#063746] shadow-md hover:bg-white/90 ml-4 shrink-0">See More Templates</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-5">
          {cmsFeaturedAutomations.slice(0, 8).map((item) => (
            <div
              key={item.title}
              className="rounded-[20px] h-[256px] p-[1.5px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(144,229,243,0.8) 0%, rgba(255,255,255,0.05) 35%, rgba(255,255,255,0.4) 100%)",
                boxShadow: "0 10px 30px rgba(0, 180, 200, 0.25)",
              }}
            >
              {/* Inner Card */}
              <div
                className="rounded-[18px] h-full p-10 flex flex-col justify-between backdrop-blur-md"
                style={{
                  background:
                    "#002834",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
                }}
              >
                {/* Top — SAME ICON UI (unchanged) */}
                <div className="flex items-center gap-2">
                  <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center">
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/cf3fd8ca-58ce-47df-88ce-74a2b444b400/public" alt="Globe" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center" style={{ backgroundColor: "#229ED9" }}>
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e4ef2ee1-c4ca-4669-edbf-3a2f45d4f900/public" alt="Telegram" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center" style={{ backgroundColor: "#FF0000" }}>
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/2de131fa-54be-4e66-d0a3-13e5b19bb400/public" alt="YouTube" width={50} height={50} className="rounded" />
                  </div>

                  <div className="w-[50px] h-[50px] rounded-lg flex items-center justify-center bg-white/10">
                    <Image src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/928968a1-3d43-4362-dd86-e36ac1e30100/public" alt="More" width={50} height={50} className="rounded" />
                  </div>
                </div>

                {/* Bottom — SAME TEXT UI (unchanged) */}
                <p
                  className="mt-10 text-[25px] font-medium text-white leading-[1.4]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          4. TAILORED WORKFLOWS — Dark card
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-20 px-[60px]">
        <div className="flex items-center gap-16">

          {/* Left — Text */}
          <div className="w-[43%] shrink-0">
            <h2 className="font-heading text-[75px] font-bold uppercase leading-[1.0]" style={{ background: "linear-gradient(266.43deg, #063746 1.48%, #00BCCF 117.86%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Tailored<br />Workflows
            </h2>
            <h3 className="mt-8 font-heading text-[37px] font-semibold leading-[1.3] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
              Custom Automation,<br />Designed For Your Business
            </h3>
            <p className="mt-4 text-[26px] leading-[1.7] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
              When every process demands its own logic, our team designs AI workflows that align with your systems and goals. From creative operations to enterprise data flows, every integration is built to enhance efficiency and understanding.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link href="/start-project" className="rounded-full bg-[#063746] px-8 py-3 font-heading text-[22px] font-medium text-white transition hover:bg-[#063746]/80">
                Request Custom Workflow
              </Link>
              <Link href="/lets-connect" className="rounded-full border border-[#063746]/30 px-8 py-3 font-heading text-[22px] font-medium text-[#063746] transition hover:bg-[#063746]/5">
                Book Consultation
              </Link>
            </div>
          </div>

          {/* Right — Dark image card */}
          <div className="flex-1 overflow-hidden rounded-[24px] h-[600px] w-[874px]">
            <HlsPlayer
              src="2f9a15572f298dc4e8a6b480d57abdad"
              autoPlay={false}
              controls={false}
              muted={true}
              loop={true}
              fillHeight={true}
              fillWidth={false}
              className="w-[874px] h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          5. LET'S BUILD INTELLIGENT SYSTEMS
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-24">
        <div className="px-[60px] text-center">
          <h2 className="font-heading text-[56px] font-medium leading-[1.1] text-[#126478]">
            Let&apos;s Build Intelligent Systems Together.
          </h2>
          <p className="mx-auto mt-4  text-[26px] leading-[1.6] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
            Whether you start from our 50+ templates or request a custom setup, your automation journey begins here.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="#" className="rounded-full border border-[#063746]/20 px-8 py-2.5 font-heading text-[22px] font-medium bg-[#0E4252] text-white transition">
              Browse Templates
            </Link>
            <Link href="/start-project" className="rounded-full border border-[#063746] px-8 py-2.5 font-heading text-[22px] font-medium text-[#063746] transition ">
              Request Setup Help
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          6. OUR 4D METHOD
          ════════════════════════════════════════════════════════ */}
      <FourDMethodSection />

      {/* ════════════════════════════════════════════════════════
          7. BUILT ON TOP OF
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-16">
        <div className="px-[60px]">
          <p className="font-heading text-[60px] font-semibold text-[#063746] mb-8">Built on top of:</p>
          <div className="grid grid-cols-5">
            {[
              { name: "zapier", color: "#FF4A00", render: () => <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/e2f15846-7262-4763-77b3-0a5f74a29500/public" alt="Zapier" className="h-20 object-contain" /> },
              { name: "salesforce", color: "#00A1E0", render: () => <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/55dd9859-5f88-4807-562a-2eb4c11b6600/public" alt="Salesforce" className="h-20 object-contain" /> },
              { name: "HubSpot", color: "#FF7A59", render: () => <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/85f76dc8-2247-4ae2-7c10-f96930df8100/public" alt="HubSpot" className="h-20 object-contain" /> },
              { name: "n8n", color: "#EA4B71", render: () => <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/5b55e3de-267a-48c0-6780-de64e0ba3c00/public" alt="n8n" className="h-20 object-contain" /> },
              { name: "Claude", color: "#D4A574", render: () => <img src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c4688b8-29e5-46b9-7c32-574cfc737200/public" alt="Claude" className="h-16 object-contain" /> },
            ].map((tool) => (
              <div key={tool.name} className="flex h-[200px] items-center justify-center border border-[#063746]/10">
                {tool.render()}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          8. FAQ
          ════════════════════════════════════════════════════════ */}
      <FaqSection
        leftQuestions={cmsFaqLeft}
        rightQuestions={cmsFaqRight}
        leftAnswers={cmsFaqLeftAnswers}
        rightAnswers={cmsFaqRightAnswers}
      />

      {/* ════════════════════════════════════════════════════════
          9. LET'S BUILD + Contact Form
          ════════════════════════════════════════════════════════ */}
      <ContactFormSection />
    </>
  );
}
