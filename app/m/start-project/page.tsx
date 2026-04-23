"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Container } from "@/components/layout";
import { cn } from "@/lib/utils";
import { publicApi } from "@/lib/api";

/* ─── Types ─── */

interface FormData {
  /* Step 1 — Service */
  service: string;

  /* Step 2 — Project Details */
  regions: string[];
  languages: string[];
  languageOther: string;
  influencerType: string;
  audience: string[];
  audienceOther: string;
  purpose: string[];
  purposeOther: string;
  audienceSingle: string;

  /* Workflow Automation fields */
  waWhoAreYou: string;
  waWhoOther: string;
  waIndustry: string;
  waIndustryOther: string;
  waTeamSize: string;
  waAreas: string[];
  waProcess: string;
  waProcessText: string;
  autonomy: string;
  platforms: string[];
  constraints: string;
  constraintDetails: string;
  deliverables: string[];
  otherText: string;

  /* Step 3 — Contact */
  companyName: string;
  title: string;
  fullName: string;
  email: string;
  phone: string;

  /* Step 4 — Brief */
  brief: string;
  referenceUrl: string;
  brandFile: File | null;
  briefFile: File | null;
  scriptFile: File | null;

  /* Workflow Automation Steps 10-11 */
  timeline: string;
  uploadOptions: string[];

  /* AI Production CTA field */
  cta: string;

  /* AI Production Target Market field */
  targetMarket: string;

  /* AI Production Target Audience field */
  targetAudience: string[];

  /* AI Production Visual Style field */
  visualStyle: string[];

  /* AI Production Video Details fields */
  videoDuration: string;
  videoPlatforms: string[];
  videoFormat: string[];

  /* AI Production Audio & Format fields */
  musicPreference: string[];
  voiceOver: string;
  voiceOverLanguage: string;
  videoFormats: string[];

  /* AI Production Script Status fields */
  scriptStatus: string;
  scriptText: string;

  /* GEO Optimization fields */
  geoProblems: string[];
  geoUserBehaviors: string[];
  geoPlatform: string;
  geoImportantPages: string[];
  geoImportantPagesLink: string;
  geoCompetitorName: string;
  geoCompetitorLink: string;
  geoQueryTypes: string;
  geoExpectedOutcome: string;
  geoTimeline: string;
  geoNotes: string;
  seoActivities: string[];

  /* AI Production Step 10 fields */
  projectTimeline: string;
  brandMaterials: FileList | null;
}

interface StepErrors {
  [key: string]: string | undefined;
}

/* ─── Constants ─── */

const SERVICES = [
  { id: "ai-influencer", label: "AI Influencer / Mascot / Ambassador / Blogger" },
  { id: "automation", label: "AI Workflow Automation" },
  { id: "geo", label: "GEO Optimization" },
  { id: "ai-commercial", label: "AI Production" },
  { id: "ai-content", label: "AI Content Generation" },
  { id: "other", label: "Other / Custom Project" },
];

const REGIONS = ["Europe", "North America", "Middle East", "Asia", "Other"];

const AUDIENCES = [
  "Young Adults (18-24)",
  "Adults (25-40)",
  "Business Owners",
  "Corporate",
  "Other",
];

const PURPOSES = [
  "Organic Content",
  "Advertising",
  "Brand Ambassador",
  "Product Promotion",
  "Other",
];

const STEP_LABELS = ["Service", "Details", "Contact", "Brief"];

/* ─── AI Influencer specific data ─── */
const AI_REGIONS = ["TR", "MENA", "EU", "Global"];
const AI_LANGUAGES = ["TR", "EN", "AR", "Other"];
const AI_INFLUENCER_TYPES = ["AI Influencer", "AI Brand Ambassador", "AI Blogger", "AI Mascot"];
const AI_AUDIENCES = [
  "Young adults (18–24) / Adults (25–40)",
  "Premium segment (A+/A)",
  "SMEs / Business owners",
  "Corporate buyers / Tech enthusiasts",
  "Women-focused / Men-focused",
  "Families / Students",
  "Other",
];
const AI_PURPOSES = [
  "Organic content",
  "Advertising campaign",
  "Brand ambassador",
  "Blog & SEO content",
  "Product promotion",
  "Community management",
  "Other",
];

/* ─── Workflow Automation data ─── */
const WA_WHO = [
  "Business Owner / Founder",
  "Marketing / Growth Team",
  "Operations / Process Owner",
  "E-commerce / Marketplace Seller",
  "Enterprise / Corporate Team",
  "Agency / Consultant",
  "Other",
];
const WA_INDUSTRIES = ["Retail / E-commerce", "Food & Beverage", "SaaS / Tech"];
const WA_TEAM_SIZES = ["Solo", "2–10", "11–50", "50+"];
const WA_AREAS = [
  "Content creation & publishing",
  "Data analytics & decision support",
  "Social media management",
  "Custom AI agents",
  "Marketing campaigns & ads",
  "I'm not sure – I'll describe it",
  "Lead collection & CRM",
  "Customer communication (email / chat / WhatsApp)",
  "Internal operations & reporting",
  "E-commerce pricing & competition tracking",
];
const WA_PROCESS = [
  "Free text",
  "We manually prepare content, post it, check performance, adjust campaigns...",
];

const GEO_PROBLEMS = [
  "Increase website visibility",
  "Stand out in product/service searches",
  "Improve the quality of organic traffic",
  "There are issues we cannot solve with SEO",
  "Make it easier for users to reach us",
  "Optimize overall digital visibility",
  "Not sure",
];

const GEO_USER_BEHAVIORS = [
  "Users conducting research",
  "Users ready to purchase",
  "Users comparing products/services",
  "Users looking for local solutions",
  "Users seeking specific information",
];

const GEO_PLATFORMS = [
  "WordPress",
  "Shopify",
  "Custom-built",
  "Other",
  "Not sure",
];

const SEO_ACTIVITIES = [
  "Technical SEO",
  "Content SEO",
  "Link building",
  "Brand-focused SEO",
  "No",
  "Not sure",
];

function getBgImage(service: string, step: number): string {
  if (step === 0) return "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/819c196e-ab9b-41cf-8c00-d310b3b63500/public";
  if (service === "automation") return "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fbfb2d0f-627c-45ac-b654-b317ce6df500/public";
  if (service === "geo") return "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/fbfb2d0f-627c-45ac-b654-b317ce6df500/public";
  if (service === "ai-commercial") return "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/33f263bd-4e5a-4e0d-5e92-b2e69b7e2500/public";
  if (service === "ai-content") return "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/33f263bd-4e5a-4e0d-5e92-b2e69b7e2500/public";
  if (service === "other") return "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/3a299844-7937-43b1-4a7b-3478050b4900/public";
  return "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/6e2ce4f2-3eb9-486c-7c11-5b9297b37000/public";
}

function getSectionTitle(service: string, step: number): string {
  if (step === 0) return "Tell Us Your Project";
  if (service === "ai-influencer") return "AI Influencer";
  if (service === "geo") return "GEO Optimization";
  return "Tell Us Your Project";
}

const INITIAL_FORM: FormData = {
  service: "",
  regions: [],
  languages: [],
  languageOther: "",
  influencerType: "",
  audience: [],
  audienceOther: "",
  purpose: [],
  purposeOther: "",
  audienceSingle: "",
  waWhoAreYou: "",
  waWhoOther: "",
  waIndustry: "",
  waIndustryOther: "",
  waTeamSize: "",
  waAreas: [],
  waProcess: "",
  waProcessText: "",
  autonomy: "",
  platforms: [],
  constraints: "",
  constraintDetails: "",
  deliverables: [],
  otherText: "",
  companyName: "",
  title: "",
  fullName: "",
  email: "",
  phone: "",
  brief: "",
  referenceUrl: "",
  brandFile: null,
  briefFile: null,
  scriptFile: null,
  timeline: "",
  uploadOptions: [],
  cta: "",
  targetMarket: "",
  targetAudience: [],
  visualStyle: [],
  videoDuration: "",
  videoPlatforms: [],
  videoFormat: [],
  musicPreference: [],
  voiceOver: "",
  voiceOverLanguage: "",
  videoFormats: [],
  scriptStatus: "",
  scriptText: "",
  geoProblems: [],
  geoUserBehaviors: [],
  geoPlatform: "",
  geoImportantPages: [],
  geoImportantPagesLink: "",
  geoCompetitorName: "",
  geoCompetitorLink: "",
  geoQueryTypes: "",
  geoExpectedOutcome: "",
  geoTimeline: "",
  geoNotes: "",
  seoActivities: [],
  projectTimeline: "",
  brandMaterials: null,
};

/**
 * Start a Project — Multi-Step Wizard
 *
 * Figma-accurate layout:
 * 1. Dark hero with marquee-style "START A PROJECT" heading
 * 2. Two-column card (form left + portrait right) on light bg
 * 3. 4-step wizard: Service → Details → Contact → Brief+Submit
 */
export default function StartProjectPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  /* ─── Helpers ─── */

  function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field as string]: undefined }));
    }
  }

  function toggleArrayValue<K extends keyof FormData>(field: K, value: string) {
    const currentArray = (form[field] as string[]) || [];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateField(field, newArray as FormData[K]);
  }

  function toggleGeoProblem(problem: string) {
    setForm((prev) => {
      const currentGeoProblems = prev.geoProblems || [];
      const newGeoProblems = currentGeoProblems.includes(problem)
        ? currentGeoProblems.filter((p) => p !== problem)
        : [...currentGeoProblems, problem];
      return { ...prev, geoProblems: newGeoProblems };
    });
  }

  function toggleGeoUserBehavior(behavior: string) {
    setForm((prev) => {
      const currentGeoUserBehaviors = prev.geoUserBehaviors || [];
      const newGeoUserBehaviors = currentGeoUserBehaviors.includes(behavior)
        ? currentGeoUserBehaviors.filter((b) => b !== behavior)
        : [...currentGeoUserBehaviors, behavior];
      return { ...prev, geoUserBehaviors: newGeoUserBehaviors };
    });
  }

  function toggleRegion(region: string) {
    setForm((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  }

  function toggleArr(field: "regions" | "languages" | "audience" | "purpose" | "waAreas", val: string) {
    setForm((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(val)
        ? (prev[field] as string[]).filter((v) => v !== val)
        : [...(prev[field] as string[]), val],
    }));
  }

  function toggleDeliverable(val: string) {
    setForm((prev) => ({
      ...prev,
      deliverables: prev.deliverables.includes(val)
        ? prev.deliverables.filter((v) => v !== val)
        : [...prev.deliverables, val],
    }));
  }

  function togglePlatform(val: string) {
    setForm((prev) => {
      if (!prev.platforms) {
        return { ...prev, platforms: [val] };
      }
      return {
        ...prev,
        platforms: prev.platforms.includes(val)
          ? prev.platforms.filter((v) => v !== val)
          : [...prev.platforms, val],
      };
    });
  }

  const bgImage = getBgImage(form.service, step);
  const isAiInfluencer = form.service === "ai-influencer" && step > 0;
  const isWorkflowAutomation = form.service === "automation" && step > 0;
  const isAiProduction = (form.service === "ai-commercial" || form.service === "ai-content") && step > 0;
  const isGeo = form.service === "geo" && step > 0;
  const isOther = form.service === "other" && step > 0;
  const sectionTitle = isAiInfluencer ? "AI Influencer" : isWorkflowAutomation ? "Workflow Automation" : isAiProduction ? "AI Production / AI Content Generation" : isGeo ? "Geo Optimization" : "Tell Us Your Project";
  const totalSteps = form.service === "ai-influencer" ? 8
    : form.service === "automation" ? 14
      : (form.service === "ai-commercial" || form.service === "ai-content") ? 15
        : form.service === "geo" ? 13
          : form.service === "other" ? 2
            : STEP_LABELS.length;





  /* ─── Validation ─── */

  function validateStep(s: number): boolean {
    const newErrors: StepErrors = {};
    if (s === 0) {
      if (!form.service) newErrors.service = "Please select a service";
    } else if (isAiInfluencer) {
      if (s === 1 && form.regions.length === 0) newErrors.regions = "Select at least one region";
      if (s === 4 && form.audience.length === 0) newErrors.audience = "Select at least one audience";
      if (s === 5 && form.purpose.length === 0) newErrors.purpose = "Select at least one purpose";
      // step 4 is optional (Upload style reference) — no validation needed
    } else if (form.service === "geo") {
      // GEO steps are all optional - just allow next
    } else if (isWorkflowAutomation || isAiProduction) {
      // WA and AI Production steps are all optional - just allow next
      if (isAiProduction && s === 4 && form.regions.length === 0) newErrors.regions = "Please select at least one target market";
    } else if (isOther) {
      if (s === 1) {
        if (!form.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
      }
    } else {
      // Generic steps validation
      if (s === 1 && form.regions.length === 0) newErrors.regions = "Select at least one region";
      if (s === 2 && !form.audienceSingle) newErrors.audience = "Select at least one audience";
      if (s === 3 && !form.influencerType) newErrors.purpose = "Select at least one purpose";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    if (step < totalSteps - 1) setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateStep(step)) return;

    setSending(true);
    try {
      await publicApi.submitProject({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        company: form.companyName,
        title: form.title,
        projectType: form.service,
        projectDescription: form.brief,
        styleReference: form.referenceUrl,
        influencerDetails: {
          regions: form.regions,
          audience: form.audience,
          purpose: form.purpose,
        },
      });
      setSubmitted(true);
    } catch {
      // If backend is unavailable, still show success for demo
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  /* ─── Shared Hero ─── */
  const heroSection = (
    <section className="overflow-hidden bg-[#F6F9F2] my-[7.5]">
      <Container>
        <div className="w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            <h1 className="flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[45px]">
              START A PROJECT{" "}
              <img src="/images/common/star.svg" alt="*" className="mx-10 h-10 w-10 relative top-[0.08em]" />
            </h1>
            <h1 className="ml-10 flex items-center whitespace-nowrap font-heading uppercase leading-none text-[#145365] text-[45px]">
              START A PROJECT{" "}
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-10 h-10 relative top-[0.08em]" />
              START A PROJECT{" "}
              <img src="/images/common/star.svg" alt="*" className="mx-10 w-10 h-10 relative top-[0.08em]" />
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );

  /* ─── Success State ─── */

  if (submitted) {
    return (
      <>
        {heroSection}

        {/* ════ THANK YOU SECTION ════ */}
        <section className="bg-[#F0F2EE] px-4 pb-10">
          {/* Top image banner with title overlay */}
          <div className="relative w-full rounded-2xl overflow-hidden mb-5" style={{ height: 200 }}>
            <Image
              src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/819c196e-ab9b-41cf-8c00-d310b3b63500/public"
              alt="AI portrait"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Title */}
            <div className="absolute inset-0 flex items-end p-5">
              <h2 className="text-[28px] font-bold text-white leading-tight">
                Tell Us Your<br />Project
              </h2>
            </div>
          </div>

          {/* White summary card */}
          <div className="w-full p-5 mb-8">
            <h3 className="text-[18px] font-semibold text-[#039EB7] mb-2">
              Last Step – Smart Summary
            </h3>
            <p className="text-[14px] text-[#1A1A1A] mb-3">
              Based on your answers, we will design:
            </p>
            <ul className="space-y-1.5 mb-4">
              {[
                "A fully automated content + campaign system",
                "Running daily",
                "Using your social media & CRM",
                "With human approval on publishing",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[14px] text-[#1A1A1A]">•</span>
                  <span className="text-[14px] text-[#1A1A1A]">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-[13px] text-[#4A4A4A]">
              Short positive comment: This builds trust immediately.
            </p>
          </div>

          {/* Thank You heading */}
          <h2 className="text-[36px] font-bold text-[#063746] mb-3">
            THANK YOU.
          </h2>

          {/* Subtitle */}
          <p className="text-[20px] text-[#063746] mb-8 leading-snug">
            Your brief has been received. We will contact you as soon as possible.
          </p>

          {/* Buttons — full width, stacked */}
          <div className="flex flex-col gap-3">
            <button
              className="w-full py-4 bg-[#1CE3F4] text-[#1A1A1A] rounded-full text-[16px] font-medium hover:bg-[#00c8d8] transition-colors"
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm(INITIAL_FORM);
                setErrors({});
              }}
            >
              Get back in form
            </button>

            <button
              className="w-full py-4 border border-[#1A1A1A] text-[#1A1A1A] rounded-full text-[16px] font-medium bg-white hover:bg-gray-50 transition-colors"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Return to homepage
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {heroSection}

      {/* ════ FORM SECTION — Full-width background image ════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 800, background: "#fff", margin: "20px" }}>
        {/* Image with title overlay */}
        {/* <div className="relative">
          <Image
            src={bgImage}
            alt="AI portrait"
            width={400}
            height={200}
            className="rounded-2xl object-cover"
            priority
            style={{height:"200px"}}
          />
         
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="relative top-[-40px] font-heading text-[34px] font-semibold text-white text-start max-w-lg px-4 drop-shadow-lg" style={{lineHeight:"normal"}}>
              {sectionTitle}
            </h2>
          </div>
        </div> */}
        <div className="relative">
  <Image
    src={bgImage}
    alt="AI portrait"
    width={400}
    height={200}
    className="rounded-2xl object-cover"
    priority
    style={{ height: "200px" }}
  />

  {/* Overlay Image (left curved) */}
  {
    isAiInfluencer ?   <div
    className="absolute top-0 left-0 h-full w-full z-10 rounded-l-2xl overflow-hidden"
    
  >
    <Image
      src="/images/common/blurimageforstartproject.png"   // 👉 yahan apni gradient/blur image daal
      alt="overlay"
      fill
      className="object-cover opacity-90"
      priority
    />
  </div> : null
  }


  {/* Title */}
  <div className="absolute inset-0 flex justify-start z-20">
    <h2
      className="p-[15px] font-heading font-semibold text-white text-start max-w-lg drop-shadow-lg"
      style={{ lineHeight: "normal",fontSize:isGeo ? 31  : isAiProduction ? 28: 34,width: isAiProduction ? 220 :233 }}
    >
      {sectionTitle}
    </h2>
  </div>
</div>
       

        <div>

          {/* White card — fixed width, always same size */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl mt-5">
            <div className="h-full flex flex-col">
              {/* Progress bar */}
              <div className="h-1 w-full bg-gray-200 mb-6">
                <div
                  className="h-full bg-[#0A7D94] transition-all duration-300"
                  style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                />
              </div>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="pb-[20px] flex flex-col gap-4 flex-1 overflow-y-auto scrollbar-hide"
              >
                {/* ── Step 1: Service Selection ── */}
                {step === 0 && (
                  <div className="flex-1">
                    <h3 className="text-[20px] font-medium text-dark-bg">
                      Which service are you interested in?
                    </h3>

                    {errors.service && (
                      <p className="mt-2 text-[11px] text-red-500">
                        {errors.service}
                      </p>
                    )}

                    <div className="mt-4 flex flex-col gap-2">
                      {SERVICES.map((svc) => (
                        <label
                          key={svc.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-2  transition-all",
                            form.service === svc.id
                              ? "border-[#0E3B3F] bg-[#0E3B3F]/5"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={svc.id}
                            checked={form.service === svc.id}
                            onChange={() => updateField('service', svc.id)}
                            className="h-4 w-4 text-[#3F404D] focus:ring-[#0E3B3F]"
                          />

                          <span className="text-[14px] text-[#3F404D]">
                            {svc.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Influencer: Step 1 — Regions ── */}
                {isAiInfluencer && step === 1 && (
                  <div>
                    <p className="mb-2 text-[18px] font-semibold text-[#0A7D94]">Select target regions</p>
                    {errors.regions && <p className="mb-1 text-xs text-red-500">{errors.regions}</p>}
                    <div className="flex flex-col gap-3 mt-4">
                      {AI_REGIONS.map((r) => (
                        <label key={r} className="flex cursor-pointer items-center gap-2" onClick={() => toggleArr("regions", r)}>
                          <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors", form.regions.includes(r) ? "bg-[#76717F]" : "bg-white border-gray-400")}>
                            {form.regions.includes(r) && (<svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                          </div>
                          <span className="text-[15px] text-[#3F404D]">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Influencer: Step 2 — Language ── */}
                {isAiInfluencer && step === 2 && (
                  <div>
                    <p className="mb-2 text-[18px] font-semibold text-[#0A7D94]">Which Language?</p>
                    <div className="flex flex-col gap-3 mt-4">
                      {AI_LANGUAGES.map((l) => (
                        <label key={l} className="flex cursor-pointer items-center gap-2" onClick={() => toggleArr("languages", l)}>
                          <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors", form.languages.includes(l) ? "bg-[#76717F]" : "border-gray-400 bg-white")}>
                            {form.languages.includes(l) && (<svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                          </div>
                          <span className="text-[15px] text-[#3F404D]">{l}</span>
                        </label>
                      ))}
                      {form.languages.includes("Other") && (
                        <input type="text" placeholder="Specify a text" value={form.languageOther} onChange={(e) => updateField("languageOther", e.target.value)} className="h-7 rounded border border-gray-300 px-2 text-[12px] focus:border-[#76717F] focus:outline-none" />
                      )}
                    </div>
                  </div>
                )}

                {/* ── AI Influencer: Step 3 — Influencer Type ── */}
                {isAiInfluencer && step === 3 && (
                  <div>
                    <p className="mb-2 text-[22px] font-semibold text-[#0A7D94]">Which type of influencer should it be?</p>
                    <div className="flex flex-col gap-3 mt-4">
                      {AI_INFLUENCER_TYPES.map((t) => (
                        <label key={t} className="flex cursor-pointer items-center gap-2" onClick={() => updateField("influencerType", t)}>
                          <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.influencerType === t ? "border-[#76717F]" : "border-gray-400")}>
                            {form.influencerType === t && <div className="h-2 w-2 rounded-full bg-[#76717F]" />}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Influencer: Step 4 — Audience ── */}
                {isAiInfluencer && step === 4 && (
                  <div>
                    <p className="mb-3 text-[22px] font-medium text-[#0A7D94]">What is the profile of the target audience?</p>
                    {errors.audience && <p className="mb-2 text-xs text-red-500">{errors.audience}</p>}
                    <div className="flex flex-col gap-2.5">
                      {AI_AUDIENCES.map((a) => (
                        <label key={a} className="flex cursor-pointer items-center gap-2.5" onClick={() => toggleArr("audience", a)}>
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                              form.audience.includes(a) ? "bg-[#3F404D]" : "border-gray-400 text-white"
                            )}
                          >
                            {form.audience.includes(a) && (
                              <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]]">{a}</span>
                        </label>
                      ))}
                    </div>
                    {form.audience.includes("Other") && (
                      <input
                        type="text"
                        placeholder="Specify a text"
                        value={form.audienceOther}
                        onChange={(e) => updateField("audienceOther", e.target.value)}
                        className="mt-2 h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none"
                      />
                    )}
                  </div>
                )}

                {/* ── AI Influencer: Step 5 — Purpose ── */}
                {isAiInfluencer && step === 5 && (
                  <div>
                    <p className="mb-3 text-[22px] font-medium text-[#0A7D94]">For what purpose will the influencer be used?</p>
                    {errors.purpose && <p className="mb-2 text-xs text-red-500">{errors.purpose}</p>}
                    <div className="flex flex-col gap-2.5">
                      {AI_PURPOSES.map((p) => (
                        <label key={p} className="flex cursor-pointer items-center gap-2.5" onClick={() => toggleArr("purpose", p)}>
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                              form.purpose.includes(p) ? "bg-[#3F404D]" : "border-gray-400 bg-white"
                            )}
                          >
                            {form.purpose.includes(p) && (
                              <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{p}</span>
                        </label>
                      ))}
                    </div>
                    {form.purpose.includes("Other") && (
                      <input
                        type="text"
                        placeholder="Specify a text"
                        value={form.purposeOther}
                        onChange={(e) => updateField("purposeOther", e.target.value)}
                        className="mt-2 h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none"
                      />
                    )}
                  </div>
                )}

                {/* ── AI Influencer: Step 6 — Upload / Brief ── */}
                {isAiInfluencer && step === 6 && (
                  <div>
                    <p className="mb-1 text-[22px] font-medium text-[#0A7D94]">Upload style reference (optional)</p>
                    <p className="mb-4 text-[12px] text-[#616161]">Pinterest, Instagram links</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="mb-1.5 text-[16px] text-[#5D5D5D]">Upload your brand tone of voice &amp; guide (.pdf) (optional)</p>
                        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#3F404D66] bg-white px-4 py-6 text-center transition hover:border-[#1CE3F4]">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                          <p className="text-[12px] text-gray-500">{form.brandFile ? (form.brandFile as File).name : "Drag and drop a file to upload or select one."}</p>
                          <p className="text-[11px] text-gray-400">PDF</p>
                          <input type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) updateField("brandFile", f); }} />
                        </label>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div>
                          <p className="mb-1.5 text-[16px] text-[#5D5D5D]">Enter brief details</p>
                          <textarea
                            rows={3}
                            placeholder="Enter text"
                            value={form.brief}
                            onChange={(e) => updateField("brief", e.target.value)}
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-[13px] placeholder:text-gray-400 focus:border-[#1CE3F4] focus:outline-none"
                          />
                        </div>
                        <div>
                          <p className="mb-1 text-[11px] text-gray-400">or</p>
                          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-4 text-center transition hover:border-[#1CE3F4]">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            <p className="text-[11px] text-gray-500">{form.briefFile ? (form.briefFile as File).name : "Drag and drop a file to upload or select one."}</p>
                            <p className="text-[11px] text-gray-400">docx</p>
                            <input type="file" accept=".doc,.docx" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) updateField("briefFile", f); }} />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}




                {/* ── Workflow Automation: Step 1 — Who are you ── */}
                {isWorkflowAutomation && step === 1 && (
                  <div className="flex flex-col gap-4">
                    <p className="mb-1 text-[22px] font-medium text-[#0A7D94]">Which best describes you?</p>
                    {WA_WHO.map((w) => (
                      <label
                        key={w}
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => updateField("waWhoAreYou", w)}
                      >
                        <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.waWhoAreYou === w ? "border-[#474857]" : "border-[#474857]")}>
                          {form.waWhoAreYou === w && <div className="h-2 w-2 rounded-full bg-[#474857]" />}
                        </div>
                        <input type="radio" className="sr-only" checked={form.waWhoAreYou === w} onChange={() => updateField("waWhoAreYou", w)} />
                        <span className="text-[18px] text-[#3F404D]">{w}</span>
                      </label>
                    ))}
                    {form.waWhoAreYou === "Other" && (
                      <input type="text" placeholder="Specify a text" value={form.waWhoOther} onChange={(e) => updateField("waWhoOther", e.target.value)} className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#474857] focus:outline-none" />
                    )}
                  </div>
                )}

                {/* ── Workflow Automation: Step 2 — Industry ── */}
                {isWorkflowAutomation && step === 2 && (
                  <div className="flex flex-col gap-4">
                    <p className="mb-1.5 text-[22px] font-medium text-[#0A7D94]">Industry</p>
                    <select
                      value={form.waIndustry}
                      onChange={(e) => {
                        updateField("waIndustry", e.target.value);
                        if (e.target.value !== "Other") {
                          updateField("waIndustryOther", "");
                        }
                      }}
                      className="h-9 w-full rounded border border-gray-300 px-3 text-[13px] text-gray-700 focus:outline-none"
                    >
                      <option value="">Select industry</option>
                      {WA_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                        checked={form.waIndustry === "Other"}
                        onChange={() => {
                          updateField("waIndustry", form.waIndustry === "Other" ? "" : "Other");
                          updateField("waIndustryOther", "");
                        }}
                      />
                      <span className="text-[18px] text-[#3F404D]">Other</span>
                    </label>
                    {form.waIndustry === "Other" && (
                      <input type="text" placeholder="Specify it in text" value={form.waIndustryOther} onChange={(e) => updateField("waIndustryOther", e.target.value)} className="h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#0A7D94] focus:outline-none" />
                    )}
                  </div>
                )}

                {/* ── Workflow Automation: Step 3 — Team Size ── */}
                {isWorkflowAutomation && step === 3 && (
                  <div className="flex flex-col gap-4">
                    <p className="mb-1.5 text-[22px] font-medium text-[#0A7D94]">Team size</p>
                    <div className="flex flex-col gap-2">
                      {WA_TEAM_SIZES.map((s) => (
                        <label key={s} className="flex cursor-pointer items-center gap-2" onClick={() => updateField("waTeamSize", s)}>
                          <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.waTeamSize === s ? "border-[#0A7D94]" : "border-gray-400")}>
                            {form.waTeamSize === s && <div className="h-2 w-2 rounded-full bg-[#0A7D94]" />}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 4 — Areas to automate ── */}
                {isWorkflowAutomation && step === 4 && (
                  <div>
                    <p className="mb-3 text-[22px] font-medium text-[#0A7D94]">Which areas do you want to automate?</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-4">
                      {WA_AREAS.map((a) => (
                        <label key={a} className="flex cursor-pointer items-start gap-2" onClick={() => toggleArr("waAreas", a)}>
                          <div
                            className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors", form.waAreas.includes(a) ? "border-[#3F404D] bg-[#3F404D]" : "border-gray-400 bg-white")}
                          >
                            {form.waAreas.includes(a) && (
                              <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D] leading-tight">{a}</span>
                        </label>
                      ))}
                    </div>
                    {form.waAreas.includes("I'm not sure – I'll describe it") && (
                      <input type="text" placeholder="You can write here..." value={form.waProcessText} onChange={(e) => updateField("waProcessText", e.target.value)} className="mt-2 h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none" />
                    )}
                  </div>
                )}

                {/* ── Workflow Automation: Step 5 — How does process work ── */}
                {isWorkflowAutomation && step === 5 && (
                  <div>
                    <p className="mb-6 text-[22px] font-medium text-[#0A7D94]">How does this process work today?</p>
                    <div className="flex flex-col gap-5">
                      {/* Free text option — radio + inline input */}
                      <label className="flex cursor-pointer items-center gap-3" onClick={() => updateField("waProcess", "Free text")}>
                        <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.waProcess === "Free text" ? "border-[#0A7D94]" : "border-gray-300")}>
                          {form.waProcess === "Free text" && <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />}
                        </div>
                        <input
                          type="text"
                          placeholder="Free text"
                          value={form.waProcessText}
                          onClick={(e) => { e.stopPropagation(); updateField("waProcess", "Free text"); }}
                          onChange={(e) => updateField("waProcessText", e.target.value)}
                          className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-[16px] text-[#3F404D] placeholder-gray-400 focus:border-[#0A7D94] focus:outline-none"
                        />
                      </label>

                      {/* Preset option */}
                      <label className="flex cursor-pointer items-center gap-3" onClick={() => updateField("waProcess", "We manually prepare content, post it, check performance, adjust campaigns...")}>
                        <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.waProcess === "We manually prepare content, post it, check performance, adjust campaigns..." ? "border-[#0A7D94]" : "border-gray-300")}>
                          {form.waProcess === "We manually prepare content, post it, check performance, adjust campaigns..." && <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />}
                        </div>
                        <span className="text-[16px] text-[#3F404D] leading-tight">We manually prepare content, post it, check performance, adjust campaigns...</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 6 — Contact Info ── */}
                {isWorkflowAutomation && step === 6 && (
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      What problems are you trying to eliminate?
                    </h3>

                    {/* Options Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-x-12 gap-y-4">

                      {[
                        "Too much manual work",
                        "Depends on specific people",
                        "Inconsistent output",
                        "Other",
                        "Slow decision-making",
                        "Human errors",
                        "No reporting / visibility",
                        "High operational cost",
                        "Scaling issues",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex cursor-pointer items-center gap-3"
                          onClick={() => toggleArr("waAreas", item)}
                        >
                          {/* Checkbox UI */}
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
                              form.waAreas.includes(item)
                                ? "bg-[#6D6A75] border-[#6D6A75]"
                                : "border-gray-400 bg-white"
                            )}
                          >
                            {form.waAreas.includes(item) && (
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M4 10l4 4 8-8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Label text */}
                          <span className="text-[18px] text-[#3F404D]">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Other input field */}
                    {form.waAreas.includes("Other") && (
                      <input
                        type="text"
                        placeholder="Specify it in text"
                        value={form.waProcessText}
                        onChange={(e) => updateField("waProcessText", e.target.value)}
                        className="mt-4 h-10 w-65 rounded-md border border-gray-300 px-3 text-[14px] focus:border-[#1CE3F4] focus:outline-none"
                      />
                    )}
                  </div>
                )}

                {/* ── Workflow Automation: Step 7 — Autonomy Level ── */}
                {isWorkflowAutomation && step === 7 && (
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      {/* Title */}
                      <h2 className="mt-10 text-[22px] font-semibold text-[#0A7D94]">
                        How autonomous should the system be?
                      </h2>

                      {/* Radio Options */}
                      <div className="mt-10 space-y-8">
                        {/* Assisted Automation */}
                        <label className="flex items-start gap-4 cursor-pointer">
                          <input
                            type="radio"
                            name="autonomy"
                            value="assisted"
                            checked={form.autonomy === "assisted"}
                            onChange={(e) => updateField("autonomy", e.target.value)}
                            className="mt-1 h-6 w-6 border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          <span className="text-[18px] text-gray-800">
                            <span className="font-semibold">Assisted Automation</span>{" "}
                            <span className="text-gray-600">
                              (AI works + humans approve key actions)
                            </span>
                          </span>
                        </label>

                        {/* Full Autopilot */}
                        <label className="flex items-start gap-4 cursor-pointer">
                          <input
                            type="radio"
                            name="autonomy"
                            value="full"
                            checked={form.autonomy === "full"}
                            onChange={(e) => updateField("autonomy", e.target.value)}
                            className="mt-1 h-6 w-6 border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          <span className="text-[18px] text-gray-800">
                            <span className="font-semibold">Full Autopilot</span>{" "}
                            <span className="text-gray-600">
                              (AI executes everything end-to-end)
                            </span>
                          </span>
                        </label>

                        {/* Hybrid */}
                        <label className="flex items-start gap-4 cursor-pointer">
                          <input
                            type="radio"
                            name="autonomy"
                            value="hybrid"
                            checked={form.autonomy === "hybrid"}
                            onChange={(e) => updateField("autonomy", e.target.value)}
                            className="mt-1 h-6 w-6 border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          <span className="text-[18px] text-gray-800">
                            <span className="font-semibold">Hybrid</span>{" "}
                            <span className="text-gray-600">
                              (Critical steps need approval)
                            </span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 8 — Data & Platforms ── */}
                {isWorkflowAutomation && step === 8 && (
                  <div className="flex-1">
                    <h2 className="text-[22px] font-semibold text-[#0A7D94] mb-5">
                      What data or platforms should the automation use?
                    </h2>

                    <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-[18px] text-[#3F404D]">
                      {/* Left column */}
                      <div className="flex flex-col gap-5">
                        {[
                          { key: "website", label: "Website" },
                          { key: "social_media", label: "Social media accounts" },
                          { key: "crm", label: "CRM" },
                          { key: "google_sheets", label: "Google Sheets / Excel" },
                          { key: "ecommerce", label: "E-commerce platform (Amazon, Shopify, etc.)" },
                          { key: "email", label: "Email inbox" },
                          { key: "ads", label: "Ads platforms" },
                        ].map(({ key, label }) => (
                          <label key={key} className="flex items-center gap-3 cursor-pointer" onClick={() => togglePlatform(key)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                form.platforms?.includes(key)
                                  ? "border-[#0A7D94] bg-[#0A7D94]"
                                  : "border-gray-400 bg-white"
                              )}
                            >
                              {form.platforms?.includes(key) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>

                      {/* Right column */}
                      <div className="flex flex-col gap-5">
                        {[
                          { key: "apis", label: "APIs" },
                          { key: "not_sure", label: "\u201cNot sure yet\u201d" },
                        ].map(({ key, label }) => (
                          <label key={key} className="flex items-center gap-3 cursor-pointer" onClick={() => togglePlatform(key)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                form.platforms?.includes(key)
                                  ? "border-[#0A7D94] bg-[#0A7D94]"
                                  : "border-gray-400 bg-white"
                              )}
                            >
                              {form.platforms?.includes(key) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 9 — Deliverables ── */}
                {isWorkflowAutomation && step === 9 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-5">
                      What should the automation deliver?
                    </h3>

                    <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-[18px] text-[#3F404D]">
                      {/* Left column */}
                      <div className="flex flex-col gap-5">
                        {[
                          { key: "content", label: "Content (text / visual / video)" },
                          { key: "scheduled", label: "Scheduled publishing" },
                          { key: "campaign", label: "Campaign creation" },
                          { key: "emails", label: "Emails / messages" },
                          { key: "pricing", label: "Price recommendations" },
                          { key: "reports", label: "Reports & dashboards" },
                          { key: "alerts", label: "Alerts & notifications" },
                        ].map(({ key, label }) => (
                          <label key={key} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleDeliverable(key)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                form.deliverables?.includes(key)
                                  ? "border-[#0A7D94] bg-[#0A7D94]"
                                  : "border-gray-400 bg-white"
                              )}
                            >
                              {form.deliverables?.includes(key) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span>{label}</span>
                          </label>
                        ))}
                      </div>

                      {/* Right column */}
                      <div className="flex flex-col gap-5">
                        {[
                          { key: "ai_agents", label: "AI agents / assistants" },
                          { key: "other", label: "Other" },
                        ].map(({ key, label }) => (
                          <label key={key} className="flex items-center gap-3 cursor-pointer" onClick={() => toggleDeliverable(key)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                form.deliverables?.includes(key)
                                  ? "border-[#0A7D94] bg-[#0A7D94]"
                                  : "border-gray-400 bg-white"
                              )}
                            >
                              {form.deliverables?.includes(key) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span>{label}</span>
                          </label>
                        ))}
                        {form.deliverables?.includes("other") && (
                          <input
                            type="text"
                            placeholder="Specify it in text"
                            value={form.otherText}
                            onChange={(e) => updateField("otherText", e.target.value)}
                            className="h-9 w-48 rounded border border-gray-300 px-3 text-[13px] placeholder:text-gray-400 focus:border-[#0A7D94] focus:outline-none"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 10 — Rules & Constraints ── */}
                {isWorkflowAutomation && step === 10 && (
                  <div className="flex-1">
                    <h2 className="text-[22px] font-semibold text-[#0A7D94] mb-5">
                      Any rules, risks or constraints we should know?
                    </h2>

                    <div className="flex flex-col gap-5 text-[18px] text-[#3F404D]">
                      {[
                        { value: "compliance", label: "Compliance / legal" },
                        { value: "brand_tone", label: "Brand tone" },
                        { value: "approval", label: "Approval steps" },
                        { value: "budget", label: "Budget limits" },
                        { value: "privacy", label: "Data privacy" },
                        { value: "none", label: "None" },
                      ].map(({ value, label }) => (
                        <div key={value}>
                          <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateField("constraints", value)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                form.constraints === value ? "border-[#0A7D94]" : "border-gray-400"
                              )}
                            >
                              {form.constraints === value && (
                                <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                              )}
                            </div>
                            <span>{label}</span>
                          </label>
                          {value === "compliance" && form.constraints === "compliance" && (
                            <input
                              type="text"
                              placeholder="Please provide relevant details..."
                              value={form.constraintDetails || ""}
                              onChange={(e) => updateField("constraintDetails", e.target.value)}
                              className="mt-2 ml-8 h-10 w-72 rounded-lg border border-gray-300 px-4 text-[14px] placeholder:text-gray-400 focus:border-[#0A7D94] focus:outline-none"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 11 — Timeline ── */}
                {isWorkflowAutomation && step === 11 && (
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      {/* Title */}
                      <h2 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                        When would you like this live?
                      </h2>

                      {/* Options */}
                      <div className="space-y-8 text-[18px] text-[#3F404D]">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="timeline"
                            value="asap"
                            checked={form.timeline === "asap"}
                            onChange={(e) => updateField("timeline", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-[#3F404D] focus:ring-gray-800"
                          />
                          <span>ASAP</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="timeline"
                            value="1_2_months"
                            checked={form.timeline === "1_2_months"}
                            onChange={(e) => updateField("timeline", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-[#3F404D] focus:ring-gray-800"
                          />
                          <span>1–2 months</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="timeline"
                            value="3_plus_months"
                            checked={form.timeline === "3_plus_months"}
                            onChange={(e) => updateField("timeline", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-[#3F404D] focus:ring-gray-800"
                          />
                          <span>3+ months</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="timeline"
                            value="exploring"
                            checked={form.timeline === "exploring"}
                            onChange={(e) => updateField("timeline", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-[#3F404D] focus:ring-gray-800"
                          />
                          <span>Just exploring</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 12 — Upload / Deep Dive ── */}
                {isWorkflowAutomation && step === 12 && (
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      {/* Title */}
                      <h2 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                        Upload / Deep Dive (Optional)
                      </h2>

                      {/* Checkbox Options */}
                      <div className="space-y-8 text-[18px] text-gray-700">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.uploadOptions?.includes("process_docs")}
                            onChange={() => toggleArrayValue("uploadOptions", "process_docs")}
                            className="h-6 w-6 rounded-md border-gray-400 text-gray-700 focus:ring-gray-700"
                          />
                          <span>Process docs</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.uploadOptions?.includes("screenshots")}
                            onChange={() => toggleArrayValue("uploadOptions", "screenshots")}
                            className="h-6 w-6 rounded-md border-gray-400 text-gray-400 focus:ring-gray-700"
                          />
                          <span>Screenshots</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.uploadOptions?.includes("flowcharts")}
                            onChange={() => toggleArrayValue("uploadOptions", "flowcharts")}
                            className="h-6 w-6 rounded-md border-gray-400 text-gray-400 focus:ring-gray-700"
                          />
                          <span>Flowcharts</span>
                        </label>

                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.uploadOptions?.includes("sample_data")}
                            onChange={() => toggleArrayValue("uploadOptions", "sample_data")}
                            className="h-6 w-6 rounded-md border-gray-400 text-gray-400 focus:ring-gray-700"
                          />
                          <span>Sample data</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}




                {/* ── GEO Optimization: Step 1 — Market Selection ── */}
                {form.service === "geo" && step === 1 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      Which market(s) does your website target?
                    </h3>

                    {/* Market Selection — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {["Turkey", "MENA", "Europe", "Global"].map((market) => (
                          <label key={market} className="flex cursor-pointer items-center gap-2" onClick={() => toggleRegion(market)}>
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                form.regions.includes(market) ? "bg-[#76717F]" : "bg-white"
                              )}
                            >
                              {form.regions.includes(market) && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1.5 5l2.5 2.5 4.5-4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>

                            <span className="text-[18px] text-[#3F404D]">{market}</span>
                          </label>
                        ))}

                        {/* Other option with text input */}
                        <label
                          onClick={() => toggleRegion("Other")}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                              form.regions.includes("Other")
                                ? "bg-[#76717F]"
                                : "bg-white"
                            )}
                          >
                            {form.regions.includes("Other") && (
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M1.5 5l2.5 2.5 4.5-4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>

                          <span className="text-[18px] text-light-body">Other</span>
                        </label>
                        {form.regions.includes("Other") && (
                          <input
                            type="text"
                            placeholder="Specify it in text"
                            value={form.languageOther}
                            onChange={(e) => updateField("languageOther", e.target.value)}
                            className="ml-8 mt-2 h-8 w-full rounded border border-gray-300 px-3 text-[12px] focus:border-[#1CE3F4] focus:outline-none"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 2 — Problem Selection ── */}
                {form.service === "geo" && step === 2 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      What is the main problem you would like to solve with GEO?
                    </h3>

                    {/* Problem Selection — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {GEO_PROBLEMS.map((problem) => (
                          <label
                            key={problem}
                            onClick={() => toggleGeoProblem(problem)}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                (form.geoProblems || []).includes(problem)
                                  ? "bg-[#76717F]"
                                  : "bg-white"
                              )}
                            >
                              {(form.geoProblems || []).includes(problem) && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1.5 5l2.5 2.5 4.5-4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>

                            <span className="text-[18px] text-[#3F404D]">{problem}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 3 — User Behavior Selection ── */}
                {form.service === "geo" && step === 3 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      Which user behavior are you targeting?
                    </h3>

                    {/* User Behavior Selection — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {GEO_USER_BEHAVIORS.map((behavior) => (
                          <label
                            key={behavior}
                            onClick={() => toggleGeoUserBehavior(behavior)}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                (form.geoUserBehaviors || []).includes(behavior)
                                  ? "bg-[#76717F]"
                                  : "bg-white"
                              )}
                            >
                              {(form.geoUserBehaviors || []).includes(behavior) && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1.5 5l2.5 2.5 4.5-4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>

                            <span className="text-[18px] text-[#3F404D]">{behavior}</span>
                          </label>
                        ))}

                        {/* Other option with text input */}
                        <label
                          onClick={() => toggleGeoUserBehavior("Other")}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                              (form.geoUserBehaviors || []).includes("Other")
                                ? "bg-[#76717F]"
                                : "bg-white"
                            )}
                          >
                            {(form.geoUserBehaviors || []).includes("Other") && (
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M1.5 5l2.5 2.5 4.5-4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>

                          <span className="text-[18px] text-light-body">Other</span>
                        </label>

                        {(form.geoUserBehaviors || []).includes("Other") && (
                          <input
                            type="text"
                            placeholder="Specify it in text"
                            value={form.purposeOther}
                            onChange={(e) => updateField("purposeOther", e.target.value)}
                            className="ml-8 mt-2 h-8 w-full rounded border border-gray-300 px-3 text-[12px] focus:border-[#1CE3F4] focus:outline-none"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 4 — Platform Selection ── */}
                {form.service === "geo" && step === 4 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      Which platform is your website built on?
                    </h3>

                    {/* Platform Selection — Radio */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-2">
                        {GEO_PLATFORMS.map((platform) => (
                          <label
                            key={platform}
                            className="flex cursor-pointer items-center gap-3"
                            onClick={() => updateField("geoPlatform", platform)}
                          >
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                form.geoPlatform === platform
                                  ? "border-[#3F404D]"
                                  : "border-[#C3C3C3]"
                              )}
                            >
                              {form.geoPlatform === platform && (
                                <div className="h-2 w-2 rounded-full bg-[#3F404D]" />
                              )}
                            </div>
                            <input
                              type="radio"
                              name="geoPlatform"
                              value={platform}
                              checked={form.geoPlatform === platform}
                              onChange={() => updateField("geoPlatform", platform)}
                              className="sr-only"
                            />
                            <span className="text-[18px] text-[#3F404D]">{platform}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 5 — SEO Activities ── */}
                {form.service === "geo" && step === 5 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      Are you currently running any SEO activities?
                    </h3>

                    {/* SEO Activities — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {SEO_ACTIVITIES.map((activity) => (
                          <label
                            key={activity}
                            onClick={() => toggleArrayValue("seoActivities", activity)}
                            className="flex cursor-pointer items-center gap-2"
                          >
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                (form.seoActivities || []).includes(activity)
                                  ? "bg-[#76717F]"
                                  : "bg-white"
                              )}
                            >
                              {(form.seoActivities || []).includes(activity) && (
                                <svg
                                  className="h-2.5 w-2.5 text-white"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                >
                                  <path
                                    d="M1.5 5l2.5 2.5 4.5-4.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>

                            <span className="text-[18px] text-[#3F404D]">{activity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 6 — Important Pages ── */}
                {form.service === "geo" && step === 6 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      Which are the most important pages on your website?
                    </h3>
                    <div className="mt-5 flex flex-col gap-3">
                      {["Homepage", "Product & Service pages", "Blog content", "Landing pages", "Category pages", "Other"].map((page) => (
                        <label
                          key={page}
                          onClick={() => toggleArrayValue("geoImportantPages", page)}
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <div
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                              (form.geoImportantPages || []).includes(page)
                                ? "bg-[#76717F]"
                                : "bg-white"
                            )}
                          >
                            {(form.geoImportantPages || []).includes(page) && (
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 10 10"
                                fill="none"
                              >
                                <path
                                  d="M1.5 5l2.5 2.5 4.5-4.5"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>

                          <span className="text-[18px] text-[#3F404D]">{page}</span>
                        </label>
                      ))}
                      <input
                        type="text"
                        placeholder="add link"
                        value={form.geoImportantPagesLink || ""}
                        onChange={(e) => updateField("geoImportantPagesLink", e.target.value)}
                        className="mt-2 h-9 w-50 rounded border border-gray-300 px-3 text-[18px] focus:border-[#1CE3F4] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 7 — Competitors ── */}
                {form.service === "geo" && step === 7 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94]">
                      Which brands do you consider your competitors?
                    </h3>
                    <div className="mt-4 flex flex-col gap-5 w-full">
                      <div>
                        <label className="text-[14px] text-[#3F404D] mb-1.5 block">Brand name</label>
                        <input
                          type="text"
                          value={form.geoCompetitorName || ""}
                          onChange={(e) => updateField("geoCompetitorName", e.target.value)}
                          className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] text-[#3F404D] focus:border-[#0A7D94] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[14px] text-[#3F404D] mb-1.5 block">Link</label>
                        <input
                          type="text"
                          placeholder="Website URL to be used for comparison"
                          value={form.geoCompetitorLink || ""}
                          onChange={(e) => updateField("geoCompetitorLink", e.target.value)}
                          className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] text-[#3F404D] placeholder:text-gray-400 focus:border-[#0A7D94] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 8 — Query Types ── */}
                {form.service === "geo" && step === 8 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94]">
                      For which types of queries would you like users to find you?
                    </h3>
                    <p className="mt-5 text-[16px] text-[#3F404D]">Example placeholder:</p>
                    <p className="mt-1 text-[15px] text-[#3F404D]">
                      &apos;&apos;&apos;How to do X?&apos;, &apos;Where to find Y service?&apos;, &apos;Who provides Z solutions?&apos;&apos;&apos;
                    </p>
                    <div className="mt-4 w-full">
                      <input
                        type="text"
                        value={form.geoQueryTypes || ""}
                        onChange={(e) => updateField("geoQueryTypes", e.target.value)}
                        className="h-14 w-full rounded-xl border border-gray-300 bg-white px-4 text-[15px] text-[#3F404D] focus:border-[#0A7D94] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 9 — Expected Outcome ── */}
                {form.service === "geo" && step === 9 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      What outcome do you expect from GEO optimization?
                    </h3>
                    <div className="flex flex-col gap-5">
                      {[
                        "Visibility report + strategic recommendations",
                        "Full GEO implementation (AI chatbot optimizations + content mapping)",
                        "Technical implementation + content production",
                        "Analysis / consultancy only",
                        "Not sure, please guide me",
                      ].map((option) => (
                        <label key={option} className="flex cursor-pointer items-center gap-3" onClick={() => updateField("geoExpectedOutcome", option)}>
                          <div
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              form.geoExpectedOutcome === option ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                            )}
                          >
                            {form.geoExpectedOutcome === option && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 10 — Timeline ── */}
                {form.service === "geo" && step === 10 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      What is your timeline?
                    </h3>
                    <div className="flex flex-col gap-5">
                      {[
                        { value: "asap", label: "ASAP" },
                        { value: "1-2weeks", label: "Within 1–2 weeks" },
                        { value: "1month", label: "Within 1 month" },
                        { value: "exploring", label: "Just exploring" },
                      ].map(({ value, label }) => (
                        <label key={value} className="flex cursor-pointer items-center gap-3" onClick={() => updateField("geoTimeline", value)}>
                          <div
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              form.geoTimeline === value ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                            )}
                          >
                            {form.geoTimeline === value && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 11 — Additional Notes ── */}
                {form.service === "geo" && step === 11 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-5">
                      Any additional notes you would like to add?
                    </h3>
                    <textarea
                      rows={4}
                      placeholder="Enter text, optional"
                      value={form.geoNotes}
                      onChange={(e) => updateField("geoNotes", e.target.value)}
                      className="w-115 resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-[#3F404D] placeholder:text-gray-400 focus:border-[#0A7D94] focus:outline-none"
                    />
                  </div>
                )}






                {/* ── AI Production: Step 1 — Content Type Selection ── */}
                {isAiProduction && step === 1 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      What type of content do you need?
                    </h3>

                    <div className="grid grid-cols-2 gap-x-10">
                      {/* Left Column */}
                      <div className="flex flex-col gap-5">
                        {[
                          "Brand film (commercial)",
                          "Product launch film",
                          "Short-form content (Reels/TikTok)",
                          "Product showcase (studio look)",
                          "Storyboard-based concept video",
                          "Product usage video",
                          "AI-generated cinematic film",
                        ].map((contentType) => (
                          <label key={contentType} className="flex cursor-pointer items-center gap-3" onClick={() => updateField("influencerType", contentType)}>
                            <div className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              form.influencerType === contentType ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                            )}>
                              {form.influencerType === contentType && (
                                <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{contentType}</span>
                          </label>
                        ))}
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col gap-5">
                        {[
                          "Mixed media (AI + live footage)",
                          "Other",
                        ].map((contentType) => (
                          <label key={contentType} className="flex cursor-pointer items-center gap-3" onClick={() => updateField("influencerType", contentType)}>
                            <div className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              form.influencerType === contentType ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                            )}>
                              {form.influencerType === contentType && (
                                <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{contentType}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 2 — Main Objective Selection ── */}
                {isAiProduction && step === 2 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      What is the main objective of the film/content?
                    </h3>
                    <div className="flex flex-col gap-5">
                      {[
                        "Introduce the brand",
                        "Highlight the product",
                        "Announce a campaign",
                        "Build an emotional connection",
                        "Explain the technology/function",
                        "Other",
                      ].map((objective) => (
                        <label key={objective} className="flex cursor-pointer items-center gap-3" onClick={() => updateField("audienceSingle", objective)}>
                          <div className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                            form.audienceSingle === objective ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                          )}>
                            {form.audienceSingle === objective && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{objective}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 3 — CTA Selection ── */}
                {isAiProduction && step === 3 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      What is your CTA for this content?
                    </h3>
                    <div className="flex flex-col gap-5">
                      {[
                        "Website visit",
                        "Purchase",
                        "Lead generation",
                        "Social media follow",
                        "Community/app redirection",
                        "No CTA (brand awareness)",
                      ].map((ctaOption) => (
                        <label key={ctaOption} className="flex cursor-pointer items-center gap-3" onClick={() => updateField("cta", ctaOption)}>
                          <div className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                            form.cta === ctaOption ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                          )}>
                            {form.cta === ctaOption && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{ctaOption}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 4 — Target Market Selection ── */}
                {isAiProduction && step === 4 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      Select your target market.
                    </h3>
                    {errors.regions && <p className="mb-3 text-xs text-red-500">{errors.regions}</p>}
                    <div className="flex flex-col gap-5">
                      {["TR", "MENA", "EU", "Global", "Other"].map((market) => (
                        <label key={market} className="flex cursor-pointer items-center gap-3" onClick={() => toggleRegion(market)}>
                          <div
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                              (form.regions || []).includes(market) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white"
                            )}
                          >
                            {(form.regions || []).includes(market) && (
                              <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{market}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 5 — Target Audience Selection ── */}
                {isAiProduction && step === 5 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      What is the profile of the target audience?
                    </h3>
                    <div className="grid grid-cols-2 gap-x-10">
                      {/* Left column */}
                      <div className="flex flex-col gap-5">
                        {[
                          "Young adults (18–24)",
                          "Adults (25–40)",
                          "Premium segment (A+/A)",
                          "SMEs / Business owners",
                          "Corporate buyers",
                          "Tech enthusiasts",
                          "Women-focused",
                          "Men-focused",
                        ].map((opt) => (
                          <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => toggleArrayValue("targetAudience", opt)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                (form.targetAudience || []).includes(opt) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white"
                              )}
                            >
                              {(form.targetAudience || []).includes(opt) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{opt}</span>
                          </label>
                        ))}
                      </div>

                      {/* Right column */}
                      <div className="flex flex-col gap-5">
                        {["Families", "Students"].map((opt) => (
                          <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => toggleArrayValue("targetAudience", opt)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                (form.targetAudience || []).includes(opt) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white"
                              )}
                            >
                              {(form.targetAudience || []).includes(opt) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 6 — Visual Style Selection ── */}
                {isAiProduction && step === 6 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-6">
                      Which visual style do you prefer for the content?
                    </h3>
                    <div className="grid grid-cols-2 gap-x-10">
                      {/* Left column */}
                      <div className="flex flex-col gap-5">
                        {["Cinematic", "Ultra-realistic", "Clean & Minimal", "Futuristic", "Sci-fi", "Warm", "Emotional", "Premium luxury"].map((opt) => (
                          <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => toggleArrayValue("visualStyle", opt)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                (form.visualStyle || []).includes(opt) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white"
                              )}
                            >
                              {(form.visualStyle || []).includes(opt) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{opt}</span>
                          </label>
                        ))}
                      </div>

                      {/* Right column */}
                      <div className="flex flex-col gap-5">
                        {["Studio product-focused", "Bold & Energetic", "Cartoon & Stylized", "Other"].map((opt) => (
                          <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => toggleArrayValue("visualStyle", opt)}>
                            <div
                              className={cn(
                                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                                (form.visualStyle || []).includes(opt) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white"
                              )}
                            >
                              {(form.visualStyle || []).includes(opt) && (
                                <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none">
                                  <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 7 — Video Duration ── */}
                {isAiProduction && step === 7 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-4">What is your target video duration?</h3>
                    <div className="flex flex-col gap-4 mt-4">
                      {["5–15 sec", "15–30 sec", "30–60 sec", "1 - 2 min", "2 min+"].map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-center gap-2" onClick={() => updateField("videoDuration", opt)}>
                          <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.videoDuration === opt ? "border-[#0A7D94]" : "border-[#C3C3C3]")}>
                            {form.videoDuration === opt && <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 8 — Video Platforms ── */}
                {isAiProduction && step === 8 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-4">Which platforms will it be published on?</h3>
                    <div className="flex flex-col gap-4 mt-4">
                      {["TikTok", "YouTube & YouTube Ads", "Meta Ads (IG & Facebook)", "Website hero video", "TV", "Other"].map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => toggleArrayValue("videoPlatforms", opt)}>
                          <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", (form.videoPlatforms || []).includes(opt) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white")}>
                            {(form.videoPlatforms || []).includes(opt) && (<svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 9 — Video Format ── */}
                {isAiProduction && step === 9 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-4">Preferred video format?</h3>
                    <div className="flex flex-col gap-4 mt-4">
                      {["Vertical 9:16", "Square 1:1", "Horizontal 16:9", "Other"].map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => toggleArrayValue("videoFormat", opt)}>
                          <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", (form.videoFormat || []).includes(opt) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white")}>
                            {(form.videoFormat || []).includes(opt) && (<svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}



                {/* ── AI Production: Step 10 — Music Preference ── */}
                {isAiProduction && step === 10 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-4">Sound / music preference?</h3>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
                      {["Soft emotional", "Energetic", "Cinematic orchestral", "Minimalist", "Electronic futuristic", "No music"].map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => toggleArrayValue("musicPreference", opt)}>
                          <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", (form.musicPreference || []).includes(opt) ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white")}>
                            {(form.musicPreference || []).includes(opt) && (<svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 11 — Voice Over ── */}
                {isAiProduction && step === 11 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-4">Would you like a voice-over?</h3>
                    <div className="flex flex-col gap-4 mt-4 mb-6">
                      {["Yes", "No", "Not sure"].map((opt) => (
                        <label key={opt} className="flex cursor-pointer items-center gap-3" onClick={() => updateField("voiceOver", opt)}>
                          <div className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors", form.voiceOver === opt ? "border-[#76717F] bg-[#76717F]" : "border-gray-400 bg-white")}>
                            {form.voiceOver === opt && (<svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>)}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">{opt}</span>
                        </label>
                      ))}
                    </div>
                    <div className="relative w-64">
                      <select
                        value={form.voiceOverLanguage || ""}
                        onChange={(e) => updateField("voiceOverLanguage", e.target.value)}
                        className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-[15px] text-gray-500 focus:border-[#0A7D94] focus:outline-none"
                      >
                        <option value="">Please select your language</option>
                        <option value="English">English</option>
                        <option value="Turkish">Turkish</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">▼</div>
                    </div>
                  </div>
                )}




                {/* ── AI Production: Step 12 — Script Status ── */}
                {isAiProduction && step === 12 && (
                  <div className="flex-1 max-w-225">

                    {/* Title */}
                    <h3 className="text-[26px] font-medium text-[#117A8B]">
                      What is the status of your script?
                    </h3>

                    {/* GRID */}
                    <div className="mt-10 grid grid-cols-2 gap-x-20 gap-y-12">

                      {/* ───────── Available ───────── */}
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateField("scriptStatus", "Available")}>
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-md border-2 transition",
                              form.scriptStatus === "Available"
                                ? "bg-[#117A8B] border-[#117A8B]"
                                : "border-[#CFCFCF]"
                            )}
                          >
                            {form.scriptStatus === "Available" && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">Available</span>
                        </label>

                        {/* Upload Box (ALWAYS visible like design) */}
                        <label className="mt-6 w-full max-w-1.5 h-32.5 rounded-xl border border-dashed border-[#CFCFCF] flex items-center justify-center cursor-pointer hover:border-[#117A8B] transition-colors">
                          <div className="flex flex-col items-center gap-2 text-[#6B6B6B]">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 16V4" />
                              <path d="M8 8l4-4 4 4" />
                              <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                            </svg>
                            <span className="text-[16px]">
                              {form.scriptFile ? (form.scriptFile as File).name : "Upload"}
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) updateField("scriptFile", f); }}
                          />
                        </label>
                      </div>

                      {/* ───────── Not Available ───────── */}
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateField("scriptStatus", "Not available")}>
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-md border-2 transition",
                              form.scriptStatus === "Not available"
                                ? "bg-[#117A8B] border-[#117A8B]"
                                : "border-[#CFCFCF]"
                            )}
                          >
                            {form.scriptStatus === "Not available" && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">Not available</span>
                        </label>

                        {/* Textarea */}
                        <textarea
                          placeholder="Please write it"
                          value={form.scriptText || ""}
                          onChange={(e) => updateField("scriptText", e.target.value)}
                          className="mt-6 w-full max-w-105 h-32.5 rounded-xl border border-[#CFCFCF] bg-[#F3F3F3] p-4 text-[16px] outline-none"
                        />
                      </div>

                      {/* ───────── Draft Available ───────── */}
                      <div>
                        <label className="flex items-center gap-3 cursor-pointer" onClick={() => updateField("scriptStatus", "Draft available")}>
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-md border-2 transition",
                              form.scriptStatus === "Draft available"
                                ? "bg-[#117A8B] border-[#117A8B]"
                                : "border-[#CFCFCF]"
                            )}
                          >
                            {form.scriptStatus === "Draft available" && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[18px] text-[#3F404D]">Draft available</span>
                        </label>

                        {/* Upload */}
                        <label className="mt-6 w-full max-w-105 h-32.5 rounded-xl border border-dashed border-[#CFCFCF] flex items-center justify-center cursor-pointer hover:border-[#117A8B] transition-colors">
                          <div className="flex flex-col items-center gap-2 text-[#6B6B6B]">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 16V4" />
                              <path d="M8 8l4-4 4 4" />
                              <path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                            </svg>
                            <span className="text-[16px]">
                              {form.scriptFile ? (form.scriptFile as File).name : "Upload"}
                            </span>
                          </div>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => { const f = e.target.files?.[0]; if (f) updateField("scriptFile", f); }}
                          />
                        </label>
                      </div>

                      {/* ───────── No Script ───────── */}
                      <div className="flex items-start">
                        <label className="flex items-center gap-3 cursor-pointer mt-1" onClick={() => updateField("scriptStatus", "I don’t need a script")}>
                          <div
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-md border-2 transition",
                              form.scriptStatus === "I don’t need a script"
                                ? "bg-[#117A8B] border-[#117A8B]"
                                : "border-[#CFCFCF]"
                            )}
                          >
                            {form.scriptStatus === "I don’t need a script" && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>

                          <input
                            type="radio"
                            className="hidden"
                            checked={form.scriptStatus === "I don’t need a script"}
                            onChange={() =>
                              updateField("scriptStatus", "I don’t need a script")
                            }
                          />

                          <span className="text-[18px] text-[#3F404D]">
                            I don’t need a script
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── AI Production: Step 13 — Timeline & Additional Materials ── */}
                {isAiProduction && step === 13 && (
                  <div className="flex-1 flex flex-col gap-6">
                    {/* Timeline */}
                    <div>
                      <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-4">
                        What is the project timeline?
                      </h3>
                      <div className="flex flex-wrap gap-x-8 gap-y-3">
                        {["ASAP", "1–2 weeks", "1 month", "Just exploring"].map((opt) => (
                          <label
                            key={opt}
                            className="flex cursor-pointer items-center gap-2"
                            onClick={() => updateField("projectTimeline", opt)}
                          >
                            <div className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              form.projectTimeline === opt ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                            )}>
                              {form.projectTimeline === opt && <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />}
                            </div>
                            <input type="radio" name="projectTimeline" value={opt} checked={form.projectTimeline === opt} onChange={() => updateField("projectTimeline", opt)} className="sr-only" />
                            <span className="text-[18px] text-[#3F404D]">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Upload */}
                    <div>
                      <h3 className="text-[22px] font-semibold text-[#0A7D94] mb-4 leading-snug">
                        Upload additional brand materials (moodboard, brand book, brand tone of voice, etc.) (Optional)
                      </h3>
                      <label htmlFor="brandMaterials" className="flex cursor-pointer items-center justify-center gap-3 w-full rounded-xl border border-dashed border-gray-300 py-10 hover:border-[#0A7D94] transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3F404D]">
                          <path d="M12 16V4" /><path d="M8 8l4-4 4 4" /><path d="M20 16v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2" />
                        </svg>
                        <span className="text-[18px] text-[#3F404D]">
                          {form.brandMaterials && form.brandMaterials.length > 0 ? `${form.brandMaterials.length} file(s) selected` : "Upload"}
                        </span>
                        <input id="brandMaterials" type="file" className="hidden" multiple onChange={(e) => updateField("brandMaterials", e.target.files)} />
                      </label>
                    </div>
                  </div>
                )}

                {/* ── Other / Custom Project: Step 1 — Contact Form ── */}
                {isOther && step === 1 && (
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {/* Company / Brand Name */}
                        <div>
                          <label className="block text-[20px] font-medium text-[#3F404DE5] mb-2">
                            Company / Brand Name *
                          </label>
                          <input
                            type="text"
                            value={form.companyName}
                            onChange={(e) => updateField("companyName", e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-[#3F404D66] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0A7D94]"
                          />
                        </div>

                        {/* Title */}
                        <div>
                          <label className="block text-[20px] font-medium text-[#3F404DE5] mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-[#3F404D66] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0A7D94]"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-[20px] font-medium text-[#3F404DE5] mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={form.fullName}
                            onChange={(e) => updateField("fullName", e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-[#3F404D66] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0A7D94]"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-[20px] font-medium text-[#3F404DE5] mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            className="w-full h-12 px-4 rounded-lg border border-[#3F404D66] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0A7D94]"
                          />
                        </div>
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-[20px] font-medium text-[#3F404DE5] mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="w-full h-12 px-4 rounded-lg border border-[#3F404D66] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#0A7D94]"
                        />
                      </div>
                    </div>
                  </div>
                )}


                {/* ── Navigation Buttons ── */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[14px] font-medium text-[#474857] rounded-full transition-colors px-8 py-2.5 hover:text-[#474857] bg-[#4748571A]"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0A7D94] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#00d4d4] w-[110px] h-[40px]"
                    >
                      Next
                      <svg
                        className="h-3.5 w-3.5"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 7h8M8 3l3 4-3 4" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0A7D94] px-6 py-2.5 text-[18px] font-medium text-white transition-all hover:bg-[#00d4d4] disabled:opacity-50"
                    >
                      {sending ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit
                          <svg
                            className="h-3.5 w-3.5"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M3 7h8M8 3l3 4-3 4" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
