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
  fullName: string;
  email: string;
  phone: string;

  /* Step 4 — Brief */
  brief: string;
  referenceUrl: string;
  brandFile: File | null;
  briefFile: File | null;

  /* Workflow Automation Steps 10-11 */
  timeline: string;
  uploadOptions: string[];

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
const WA_INDUSTRIES = ["Retail / E-commerce", "Food & Beverage", "SaaS / Tech", "Healthcare", "Finance", "Education", "Other"];
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
  if (step === 0) return "/images/mind-behind/photo-03.png";
  if (service === "automation") return "/images/automation/hero-slider.png";
  if (service === "geo") return "/images/automation/hero-slider.png";
  return "/images/ai-influencer/Mask-group2.png";
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
  fullName: "",
  email: "",
  phone: "",
  brief: "",
  referenceUrl: "",
  brandFile: null,
  briefFile: null,
  timeline: "",
  uploadOptions: [],
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
  const isGeo = form.service === "geo" && step > 0;
  const sectionTitle = isAiInfluencer ? "AI Influencer" : isWorkflowAutomation ? "Workflow Automation" :isGeo ? "Geo Optimization" : "Tell Us Your Project";
  const totalSteps = isAiInfluencer ? 8 : isWorkflowAutomation ? 13 : form.service === "geo" ? 12 : STEP_LABELS.length;





  /* ─── Validation ─── */

  function validateStep(s: number): boolean {
    const newErrors: StepErrors = {};
    if (s === 0) {
      if (!form.service) newErrors.service = "Please select a service";
    } else if (isAiInfluencer) {
      if (s === 1 && form.regions.length === 0) newErrors.regions = "Select at least one region";
      if (s === 2 && form.audience.length === 0) newErrors.audience = "Select at least one audience";
      if (s === 3 && form.purpose.length === 0) newErrors.purpose = "Select at least one purpose";
      if (s === 4) {
        if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!form.email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
        if (!form.phone.trim()) newErrors.phone = "Phone is required";
      }
    } else if (form.service === "geo") {
      // GEO steps are all optional - just allow next
    } else if (isWorkflowAutomation) {
      // WA steps are all optional - just allow next
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
        title: "",
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
    <section className="overflow-hidden bg-dark-bg pt-[140px] pb-12">
      <Container>
        <div className="overflow-hidden">
          <h1 className="whitespace-nowrap font-heading text-[clamp(36px,8vw,140px)] font-medium uppercase leading-[1.05] text-white max-md:whitespace-normal">
            START A PROJECT{" "}
            <span className="mx-4 inline-block text-[#1CE3F4]">✻</span>{" "}
            START A PROJECT{" "}
            <span className="mx-4 inline-block text-[#1CE3F4]">✻</span>{" "}
            <span className="text-white/20">ST</span>
          </h1>
        </div>
        <p className="mt-6 max-w-2xl text-body-sm leading-[1.7] text-white/50">
          Tell us about your project and we&apos;ll match you with the right AI
          solution. From concept to launch, our team is ready to build with you.
        </p>
      </Container>
    </section>
  );

  /* ─── Success State ─── */

  if (submitted) {
    return (
      <>
        {heroSection}
        <section className="bg-light-bg py-24">
          <Container className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#1CE3F4]/10">
              <svg
                className="h-10 w-10 text-[#1CE3F4]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="mt-8 font-heading text-subsection font-medium text-light-text">
              Thank You!
            </h2>
            <p className="mt-4 max-w-md text-body-sm text-light-body">
              Your project brief has been received. Our team will review the
              details and reach out within 1-2 business days.
            </p>
            <button
              className="mt-8 text-sm text-[#1CE3F4] underline underline-offset-4 transition-colors hover:text-[#126478]"
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm(INITIAL_FORM);
                setErrors({});
              }}
            >
              Start another project
            </button>
          </Container>
        </section>
      </>
    );
  }

  return (
    <>
      {heroSection}

      {/* ════ FORM SECTION — Full-width background image ════ */}
      <section className="relative overflow-hidden" style={{ minHeight: 600, background: "#fff", margin: "70px" }}>
        {/* Background image */}
        <Image
          src={bgImage}
          alt="AI portrait"
          fill
          className="object-cover object-center"
          priority
          style={{ borderRadius: "20px" }}
        />
        {/* Dark gradient left overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a]/90 via-[#0d1b2a]/60 to-transparent" /> */}

        <Container className="relative z-10 py-12">
          {/* Title above card */}
          <h2 className="mb-6 font-heading text-[22px] font-semibold text-white">
            {sectionTitle}
          </h2>

          {/* White card — left aligned, max ~45% width */}
          <div className="w-full max-w-[600px] overflow-hidden rounded-2xl bg-white shadow-2xl" style={{ height: (isAiInfluencer || isWorkflowAutomation) ? 500 : undefined }}>
            <div className="px-7 py-6">
              {/* Progress bar */}
              <div className="h-1 w-full bg-gray-200 mb-6">
                <div
                  className="h-full bg-[#0A7D94] transition-all duration-300"
                  style={{ width: `${((step + 1) / STEP_LABELS.length) * 100}%` }}
                />
              </div>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col justify-between gap-4"
              >
                {/* ── Step 1: Service Selection ── */}
                {step === 0 && (
                  <div className="flex-1">
                    <h3 className="text-[24px] font-medium text-[#002834]">
                      Which service are you interested in?
                    </h3>
                    {errors.service && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.service}
                      </p>
                    )}
                    <div className="mt-5 flex flex-col gap-2">
                      {SERVICES.map((svc) => (
                        <label
                          key={svc.id}
                          className={cn(
                            "flex cursor-pointer items-center gap-3  px-4 py-3 transition-all",
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
                            onChange={() => updateField("service", svc.id)}
                            className="h-[18px] w-[18px] text-[#3F404D] focus:ring-[#0E3B3F]"
                          />
                          <span className="text-[18px] text-[#3F404D]">
                            {svc.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── AI Influencer: Step 1 — Regions / Language / Type ── */}
                {isAiInfluencer && step === 1 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="mb-2 text-[22px] font-semibold text-[#0A7D94]">Select target regions</p>
                      {errors.regions && <p className="mb-1 text-xs text-red-500">{errors.regions}</p>}
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {AI_REGIONS.map((r) => (
                          <label key={r} className="flex cursor-pointer items-center gap-2">
                            <div
                              onClick={() => toggleArr("regions", r)}
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                form.regions.includes(r) ? "bg-[#76717F]" : "bg-white"
                              )}
                            >
                              {form.regions.includes(r) && (
                                <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{r}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[22px] font-semibold text-[#0A7D94]">Which Language?</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {AI_LANGUAGES.map((l) => (
                          <label key={l} className="flex cursor-pointer items-center gap-2">
                            <div
                              onClick={() => toggleArr("languages", l)}
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
                                form.languages.includes(l) ? " bg-[#76717F]" : "border-gray-400 bg-white"
                              )}
                            >
                              {form.languages.includes(l) && (
                                <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none">
                                  <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <span className="text-[18px] text-[#3F404D]">{l}</span>
                          </label>
                        ))}
                        {form.languages.includes("Other") && (
                          <input
                            type="text"
                            placeholder="Specify a text"
                            value={form.languageOther}
                            onChange={(e) => updateField("languageOther", e.target.value)}
                            className="h-7 rounded border border-gray-300 px-2 text-[12px] focus:border-[#76717F] focus:outline-none"
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="mb-2 text-[22px] font-semibold text-[#0A7D94]">Which type of influencer should it be?</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-2">
                        {AI_INFLUENCER_TYPES.map((t) => (
                          <label key={t} className="flex cursor-pointer items-center gap-2">
                            <div className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              form.influencerType === t ? "border-[#76717F]" : "border-gray-400"
                            )}>
                              {form.influencerType === t && <div className="h-2 w-2 rounded-full bg-[#76717F]" />}
                            </div>
                            <input type="radio" className="sr-only" checked={form.influencerType === t} onChange={() => updateField("influencerType", t)} />
                            <span className="text-[18px] text-[#3F404D]">{t}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── AI Influencer: Step 2 — Audience ── */}
                {isAiInfluencer && step === 2 && (
                  <div>
                    <p className="mb-3 text-[22px] font-medium text-[#0A7D94]">What is the profile of the target audience?</p>
                    {errors.audience && <p className="mb-2 text-xs text-red-500">{errors.audience}</p>}
                    <div className="flex flex-col gap-2.5">
                      {AI_AUDIENCES.map((a) => (
                        <label key={a} className="flex cursor-pointer items-center gap-2.5">
                          <div
                            onClick={() => toggleArr("audience", a)}
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

                {/* ── AI Influencer: Step 3 — Purpose ── */}
                {isAiInfluencer && step === 3 && (
                  <div>
                    <p className="mb-3 text-[22px] font-medium text-[#0A7D94]">For what purpose will the influencer be used?</p>
                    {errors.purpose && <p className="mb-2 text-xs text-red-500">{errors.purpose}</p>}
                    <div className="flex flex-col gap-2.5">
                      {AI_PURPOSES.map((p) => (
                        <label key={p} className="flex cursor-pointer items-center gap-2.5">
                          <div
                            onClick={() => toggleArr("purpose", p)}
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

                {/* ── AI Influencer: Step 4 — Upload / Brief ── */}
                {isAiInfluencer && step === 4 && (
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
                  <div className="flex flex-col gap-2">
                    <p className="mb-1 text-[13px] font-medium text-[#1CE3F4]">Which best describes you?</p>
                    {WA_WHO.map((w) => (
                      <label key={w} className="flex cursor-pointer items-center gap-2">
                        <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.waWhoAreYou === w ? "border-[#1CE3F4]" : "border-gray-400")}>
                          {form.waWhoAreYou === w && <div className="h-2 w-2 rounded-full bg-[#1CE3F4]" />}
                        </div>
                        <input type="radio" className="sr-only" checked={form.waWhoAreYou === w} onChange={() => updateField("waWhoAreYou", w)} />
                        <span className="text-[13px] text-gray-700">{w}</span>
                      </label>
                    ))}
                    {form.waWhoAreYou === "Other" && (
                      <input type="text" placeholder="Specify a text" value={form.waWhoOther} onChange={(e) => updateField("waWhoOther", e.target.value)} className="mt-1 h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none" />
                    )}
                  </div>
                )}

                {/* ── Workflow Automation: Step 2 — Industry + Team size ── */}
                {isWorkflowAutomation && step === 2 && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="mb-1.5 text-[13px] font-medium text-[#1CE3F4]">Industry</p>
                      <select
                        value={form.waIndustry}
                        onChange={(e) => updateField("waIndustry", e.target.value)}
                        className="h-9 w-full rounded border border-gray-300 px-3 text-[13px] text-gray-700 focus:border-[#1CE3F4] focus:outline-none"
                      >
                        <option value="">Select industry</option>
                        {WA_INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                      {form.waIndustry === "Other" && (
                        <input type="text" placeholder="Specify a text" value={form.waIndustryOther} onChange={(e) => updateField("waIndustryOther", e.target.value)} className="mt-2 h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none" />
                      )}
                    </div>
                    <div>
                      <p className="mb-1.5 text-[13px] font-medium text-gray-800">Team size</p>
                      <div className="flex flex-col gap-2">
                        {WA_TEAM_SIZES.map((s) => (
                          <label key={s} className="flex cursor-pointer items-center gap-2">
                            <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.waTeamSize === s ? "border-[#1CE3F4]" : "border-gray-400")}>
                              {form.waTeamSize === s && <div className="h-2 w-2 rounded-full bg-[#1CE3F4]" />}
                            </div>
                            <input type="radio" className="sr-only" checked={form.waTeamSize === s} onChange={() => updateField("waTeamSize", s)} />
                            <span className="text-[13px] text-gray-700">{s}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 3 — Areas to automate ── */}
                {isWorkflowAutomation && step === 3 && (
                  <div>
                    <p className="mb-3 text-[13px] font-medium text-[#1CE3F4]">Which areas do you want to automate?</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {WA_AREAS.map((a) => (
                        <label key={a} className="flex cursor-pointer items-start gap-2">
                          <div
                            onClick={() => toggleArr("waAreas", a)}
                            className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors", form.waAreas.includes(a) ? "border-[#1CE3F4] bg-[#1CE3F4]" : "border-gray-400 bg-white")}
                          >
                            {form.waAreas.includes(a) && (
                              <svg className="h-2.5 w-2.5 text-[#002834]" viewBox="0 0 10 10" fill="none">
                                <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <span className="text-[12px] text-gray-700 leading-tight">{a}</span>
                        </label>
                      ))}
                    </div>
                    {form.waAreas.includes("I'm not sure – I'll describe it") && (
                      <input type="text" placeholder="You can write here..." value={form.waProcessText} onChange={(e) => updateField("waProcessText", e.target.value)} className="mt-2 h-8 w-full rounded border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none" />
                    )}
                  </div>
                )}

                {/* ── Workflow Automation: Step 4 — How does process work ── */}
                {isWorkflowAutomation && step === 4 && (
                  <div>
                    <p className="mb-3 text-[13px] font-medium text-[#1CE3F4]">How does this process work today?</p>
                    <div className="flex flex-col gap-2">
                      {WA_PROCESS.map((p) => (
                        <label key={p} className="flex cursor-pointer items-start gap-2">
                          <div className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors", form.waProcess === p ? "border-[#1CE3F4]" : "border-gray-400")}>
                            {form.waProcess === p && <div className="h-2 w-2 rounded-full bg-[#1CE3F4]" />}
                          </div>
                          <input type="radio" className="sr-only" checked={form.waProcess === p} onChange={() => updateField("waProcess", p)} />
                          <span className="text-[12px] text-gray-600 leading-tight">{p}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 5 — Contact Info ── */}
                {isWorkflowAutomation && step === 5 && (
                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-[20px] font-medium text-[#147A84]">
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
                        <label
                          key={item}
                          className="flex cursor-pointer items-center gap-3"
                        >
                          {/* Checkbox UI */}
                          <div
                            onClick={() => toggleArr("waAreas", item)}
                            className={cn(
                              "flex h-[18px] w-[18px] items-center justify-center rounded border transition-all",
                              form.waAreas.includes(item)
                                ? "bg-[#6D6A75] border-[#6D6A75]"
                                : "border-gray-400 bg-white"
                            )}
                          >
                            {form.waAreas.includes(item) && (
                              <svg
                                className="h-3 w-3 text-white"
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

                          {/* Hidden input */}
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={form.waAreas.includes(item)}
                            readOnly
                          />

                          {/* Label text */}
                          <span className="text-[15px] text-gray-700">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Other input field */}
                    {form.waAreas.includes("Other") && (
                      <input
                        type="text"
                        placeholder="Specify it in text"
                        value={form.waProcessText}
                        onChange={(e) => updateField("waProcessText", e.target.value)}
                        className="mt-4 h-10 w-[260px] rounded-md border border-gray-300 px-3 text-[14px] focus:border-[#1CE3F4] focus:outline-none"
                      />
                    )}
                  </div>
                )}

                {/* ── Workflow Automation: Step 6 — Autonomy Level ── */}
                {isWorkflowAutomation && step === 6 && (
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      {/* Title */}
                      <h2 className="mt-10 text-[26px] font-semibold text-teal-800">
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

                {/* ── Workflow Automation: Step 7 — Data & Platforms ── */}
                {isWorkflowAutomation && step === 7 && (
                  <div className="flex-1">
                    {/* Top Content */}
                    <div>

                      {/* Title */}
                      <h2 className="text-[22px] font-semibold text-teal-800">
                        What data or platforms should the automation use?
                      </h2>

                      {/* Options */}
                      <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-[18px] text-gray-700">
                        {/* Left Column */}
                        <label className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("website")}
                            onChange={() => togglePlatform("website")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          Website
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("social_media")}
                            onChange={() => togglePlatform("social_media")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          Social media accounts
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("not_sure")}
                            onChange={() => togglePlatform("not_sure")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          "Not sure yet"
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("crm")}
                            onChange={() => togglePlatform("crm")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          CRM
                        </label>

                        <div /> {/* empty cell to preserve grid spacing */}

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("google_sheets")}
                            onChange={() => togglePlatform("google_sheets")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          Google Sheets / Excel
                        </label>

                        <div />

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("ecommerce")}
                            onChange={() => togglePlatform("ecommerce")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          E-commerce platform (Amazon, Shopify, etc.)
                        </label>

                        <div />

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("email")}
                            onChange={() => togglePlatform("email")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          Email inbox
                        </label>

                        <div />

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.platforms?.includes("ads")}
                            onChange={() => togglePlatform("ads")}
                            className="h-6 w-6 rounded border-gray-400 text-teal-700 focus:ring-teal-700"
                          />
                          Ads platforms
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 8 — Deliverables ── */}
                {isWorkflowAutomation && step === 8 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94] mb-2">
                      What should automation deliver?
                    </h3>

                    <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4">
                      {/* Left Column */}
                      <div className="flex flex-col gap-4">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("content")}
                            onChange={() => toggleDeliverable("content")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Content (text / visual / video)</span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("ai_agents")}
                            onChange={() => toggleDeliverable("ai_agents")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">AI agents / assistants</span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("scheduled")}
                            onChange={() => toggleDeliverable("scheduled")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Scheduled publishing</span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("other")}
                            onChange={() => toggleDeliverable("other")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Other</span>
                        </label>

                        {/* "Specify it in text" input */}
                        {form.deliverables?.includes("other") && (
                          <input
                            type="text"
                            placeholder="Specify it in text"
                            value={form.otherText}
                            onChange={(e) => updateField("otherText", e.target.value)}
                            className="mt-2 h-9 w-full rounded-lg border border-gray-300 px-3 text-[14px] placeholder:text-gray-400 focus:border-[#0A7D94] focus:outline-none focus:ring-1 focus:ring-[#0A7D94]"
                          />
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="flex flex-col gap-4">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("campaign")}
                            onChange={() => toggleDeliverable("campaign")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Campaign creation</span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("emails")}
                            onChange={() => toggleDeliverable("emails")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Emails / messages</span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("pricing")}
                            onChange={() => toggleDeliverable("pricing")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Price recommendations</span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("reports")}
                            onChange={() => toggleDeliverable("reports")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Reports & dashboards</span>
                        </label>

                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.deliverables?.includes("alerts")}
                            onChange={() => toggleDeliverable("alerts")}
                            className="h-5 w-5 rounded border-gray-300 text-[#0A7D94] focus:ring-[#0A7D94]"
                          />
                          <span className="text-[18px] text-[#3F404D]">Alerts & notifications</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 9 — Rules & Constraints ── */}
                {isWorkflowAutomation && step === 9 && (
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>


                      {/* Title */}
                      <h2 className="text-[26px] font-semibold text-teal-800">
                        Any rules, risks or constraints we should know?
                      </h2>

                      {/* Options */}
                      <div className="space-y-4 text-[18px] text-gray-700">
                        {/* Compliance / Legal */}
                        <div>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="radio"
                              name="constraints"
                              value="compliance"
                              checked={form.constraints === "compliance"}
                              onChange={(e) => updateField("constraints", e.target.value)}
                              className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
                            />
                            <span>Compliance & Legal Requirements</span>
                          </label>

                          {form.constraints === "compliance" && (
                            <input
                              type="text"
                              placeholder="Please provide relevant details..."
                              value={form.constraintDetails || ""}
                              onChange={(e) =>
                                updateField("constraintDetails", e.target.value)
                              }
                              className="mt-4 ml-9 w-[420px] h-11 rounded-lg border border-gray-300 px-4 text-[15px] placeholder:text-gray-400 focus:border-gray-400 focus:outline-none"
                            />
                          )}
                        </div>

                        {/* Brand tone */}
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="constraints"
                            value="brand_tone"
                            checked={form.constraints === "brand_tone"}
                            onChange={(e) => updateField("constraints", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
                          />
                          <span>Brand Voice & Tone Guidelines</span>
                        </label>

                        {/* Approval steps */}
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="constraints"
                            value="approval"
                            checked={form.constraints === "approval"}
                            onChange={(e) => updateField("constraints", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
                          />
                          <span>Multi-level Approval Process</span>
                        </label>

                        {/* Budget limits */}
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="constraints"
                            value="budget"
                            checked={form.constraints === "budget"}
                            onChange={(e) => updateField("constraints", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
                          />
                          <span>Budget Constraints & Limits</span>
                        </label>

                        {/* Data privacy */}
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="constraints"
                            value="privacy"
                            checked={form.constraints === "privacy"}
                            onChange={(e) => updateField("constraints", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
                          />
                          <span>Data Privacy & Security</span>
                        </label>

                        {/* None */}
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="constraints"
                            value="none"
                            checked={form.constraints === "none"}
                            onChange={(e) => updateField("constraints", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
                          />
                          <span>No Constraints</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 10 — Timeline ── */}
                {isWorkflowAutomation && step === 10 && (
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      {/* Title */}
                      <h2 className="text-[26px] font-semibold text-teal-800">
                        When would you like this live?
                      </h2>

                      {/* Options */}
                      <div className="space-y-8 text-[18px] text-gray-700">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="radio"
                            name="timeline"
                            value="asap"
                            checked={form.timeline === "asap"}
                            onChange={(e) => updateField("timeline", e.target.value)}
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
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
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
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
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
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
                            className="h-6 w-6 border-gray-400 text-gray-800 focus:ring-gray-800"
                          />
                          <span>Just exploring</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Workflow Automation: Step 11 — Upload / Deep Dive ── */}
                {isWorkflowAutomation && step === 11 && (
                  <div className="flex-1 flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      {/* Title */}
                      <h2 className="text-[26px] font-semibold text-teal-800">
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
                    <h3 className="text-[15px] font-medium text-light-text">
                      Which market(s) does your website target?
                    </h3>

                    {/* Market Selection — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {["Turkey", "MENA", "Europe", "Global"].map((market) => (
                          <label key={market} className="flex cursor-pointer items-center gap-3">
                            <input
                              type="checkbox"
                              checked={form.regions.includes(market)}
                              onChange={() => toggleRegion(market)}
                              className="h-5 w-5 rounded border-gray-300 text-[#1CE3F4] focus:ring-[#1CE3F4]"
                            />
                            <span className="text-[13px] text-light-body">{market}</span>
                          </label>
                        ))}

                        {/* Other option with text input */}
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={form.regions.includes("Other")}
                            onChange={() => toggleRegion("Other")}
                            className="h-5 w-5 rounded border-gray-300 text-[#1CE3F4] focus:ring-[#1CE3F4]"
                          />
                          <span className="text-[13px] text-light-body">Other</span>
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
                    <h3 className="text-[15px] font-medium text-light-text">
                      What is the main problem you would like to solve with GEO?
                    </h3>

                    {/* Problem Selection — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {GEO_PROBLEMS.map((problem) => (
                          <label key={problem} className="flex cursor-pointer items-center gap-3">
                            <input
                              type="checkbox"
                              checked={(form.geoProblems || []).includes(problem)}
                              onChange={() => toggleGeoProblem(problem)}
                              className="h-5 w-5 rounded border-gray-300 text-[#1CE3F4] focus:ring-[#1CE3F4]"
                            />
                            <span className="text-[13px] text-light-body">{problem}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 3 — User Behavior Selection ── */}
                {form.service === "geo" && step === 3 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-light-text">
                      Which user behavior are you targeting?
                    </h3>

                    {/* User Behavior Selection — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {GEO_USER_BEHAVIORS.map((behavior) => (
                          <label key={behavior} className="flex cursor-pointer items-center gap-3">
                            <input
                              type="checkbox"
                              checked={(form.geoUserBehaviors || []).includes(behavior)}
                              onChange={() => toggleGeoUserBehavior(behavior)}
                              className="h-5 w-5 rounded border-gray-300 text-[#1CE3F4] focus:ring-[#1CE3F4]"
                            />
                            <span className="text-[13px] text-light-body">{behavior}</span>
                          </label>
                        ))}

                        {/* Other option with text input */}
                        <label className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={(form.geoUserBehaviors || []).includes("Other")}
                            onChange={() => toggleGeoUserBehavior("Other")}
                            className="h-5 w-5 rounded border-gray-300 text-[#1CE3F4] focus:ring-[#1CE3F4]"
                          />
                          <span className="text-[13px] text-light-body">Other</span>
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
                    <h3 className="text-[15px] font-medium text-light-text">
                      Which platform is your website built on?
                    </h3>

                    {/* Platform Selection — Radio */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-2">
                        {GEO_PLATFORMS.map((platform) => (
                          <label key={platform} className="flex cursor-pointer items-center gap-3">
                            <div
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                form.geoPlatform === platform
                                  ? "border-[#1CE3F4]"
                                  : "border-[#C3C3C3]"
                              )}
                            >
                              {form.geoPlatform === platform && (
                                <div className="h-2 w-2 rounded-full bg-[#1CE3F4]" />
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
                            <span className="text-[13px] text-light-body">{platform}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 5 — SEO Activities ── */}
                {form.service === "geo" && step === 5 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-light-text">
                      Are you currently running any SEO activities?
                    </h3>

                    {/* SEO Activities — Checkboxes */}
                    <div className="mt-5">
                      <div className="mt-2 flex flex-col gap-3">
                        {SEO_ACTIVITIES.map((activity) => (
                          <label key={activity} className="flex cursor-pointer items-center gap-3">
                            <input
                              type="checkbox"
                              checked={(form.seoActivities || []).includes(activity)}
                              onChange={() => toggleArrayValue("seoActivities", activity)}
                              className="h-5 w-5 rounded border-gray-300 text-[#1CE3F4] focus:ring-[#1CE3F4]"
                            />
                            <span className="text-[13px] text-light-body">{activity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 6 — Important Pages ── */}
                {form.service === "geo" && step === 6 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-light-text">
                      Which are the most important pages on your website?
                    </h3>
                    <div className="mt-5 flex flex-col gap-3">
                      {["Homepage", "Product & Service pages", "Blog content", "Landing pages", "Category pages", "Other"].map((page) => (
                        <label key={page} className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={(form.geoImportantPages || []).includes(page)}
                            onChange={() => toggleArrayValue("geoImportantPages", page)}
                            className="h-5 w-5 rounded border-gray-300 text-[#1CE3F4] focus:ring-[#1CE3F4]"
                          />
                          <span className="text-[13px] text-light-body">{page}</span>
                        </label>
                      ))}
                      <input
                        type="text"
                        placeholder="add link"
                        value={form.geoImportantPagesLink || ""}
                        onChange={(e) => updateField("geoImportantPagesLink", e.target.value)}
                        className="mt-2 h-9 w-[200px] rounded border border-gray-300 px-3 text-[12px] focus:border-[#1CE3F4] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 7 — Competitors ── */}
                {form.service === "geo" && step === 7 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium" style={{ color: "#1CE3F4" }}>
                      Which brands do you consider your competitors?
                    </h3>
                    <p className="mt-4 text-[13px] text-light-body">Example placeholder:</p>
                    <div className="mt-4 flex flex-col gap-4 max-w-lg">
                      <div>
                        <label className="text-[12px] text-light-body mb-1 block">Brand name</label>
                        <input
                          type="text"
                          value={form.geoCompetitorName || ""}
                          onChange={(e) => updateField("geoCompetitorName", e.target.value)}
                          className="h-11 w-full rounded-[8px] border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] text-light-body mb-1 block">Link</label>
                        <input
                          type="text"
                          placeholder="Website URL to be used for comparison"
                          value={form.geoCompetitorLink || ""}
                          onChange={(e) => updateField("geoCompetitorLink", e.target.value)}
                          className="h-11 w-full rounded-[8px] border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 8 — Query Types ── */}
                {form.service === "geo" && step === 8 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium" style={{ color: "#1CE3F4" }}>
                      For which types of queries would you like users to find you?
                    </h3>
                    <p className="mt-4 text-[13px] text-light-body">Example placeholder:</p>
                    <p className="mt-1 text-[13px] text-light-body">
                      &apos;&apos;&apos;How to do X?&apos;, &apos;Where to find Y service?&apos;, &apos;Who provides Z solutions?&apos;&apos;&apos;
                    </p>
                    <div className="mt-4 max-w-lg">
                      <input
                        type="text"
                        value={form.geoQueryTypes || ""}
                        onChange={(e) => updateField("geoQueryTypes", e.target.value)}
                        className="h-14 w-full rounded-[8px] border border-gray-300 px-3 text-[13px] focus:border-[#1CE3F4] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* ── GEO Optimization: Step 9 — Expected Outcome ── */}
                {form.service === "geo" && step === 9 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium" style={{ color: "#1CE3F4" }}>
                      What outcome do you expect from GEO optimization?
                    </h3>
                    <div className="mt-5 flex flex-col gap-4">
                      {[
                        "Visibility report + strategic recommendations",
                        "Full GEO implementation (AI chatbot optimizations + content mapping)",
                        "Technical implementation + content production",
                        "Analysis / consultancy only",
                        "Not sure, please guide me",
                      ].map((option) => (
                        <label key={option} className="flex cursor-pointer items-center gap-3">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                              form.geoExpectedOutcome === option ? "border-[#1CE3F4]" : "border-[#C3C3C3]"
                            }`}
                            onClick={() => updateField("geoExpectedOutcome", option)}
                          >
                            {form.geoExpectedOutcome === option && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#1CE3F4]" />
                            )}
                          </div>
                          <span className="text-[13px] text-light-body">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}


                {/* ── GEO Optimization: Step 10 — Timeline ── */}
                {form.service === "geo" && step === 10 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      What is your timeline?
                    </h3>
                    <div className="mt-6 flex flex-col gap-5">
                      {[
                        { value: "asap", label: "ASAP" },
                        { value: "1-2weeks", label: "Within 1–2 weeks" },
                        { value: "1month", label: "Within 1 month" },
                        { value: "exploring", label: "Just exploring" },
                      ].map(({ value, label }) => (
                        <label key={value} className="flex cursor-pointer items-center gap-3">
                          <div
                            className={cn(
                              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                              form.geoTimeline === value ? "border-[#0A7D94]" : "border-[#C3C3C3]"
                            )}
                            onClick={() => updateField("geoTimeline", value)}
                          >
                            {form.geoTimeline === value && (
                              <div className="h-2.5 w-2.5 rounded-full bg-[#0A7D94]" />
                            )}
                          </div>
                          <input
                            type="radio"
                            name="geoTimeline"
                            value={value}
                            checked={form.geoTimeline === value}
                            onChange={() => updateField("geoTimeline", value)}
                            className="sr-only"
                          />
                          <span className="text-[18px] text-[#3F404D]">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}



                {/* ── GEO Optimization: Step 11 — Additional Notes ── */}
                {form.service === "geo" && step === 11 && (
                  <div className="flex-1">
                    <h3 className="text-[22px] font-medium text-[#0A7D94]">
                      Any additional notes you would like to add?
                    </h3>
                    <div className="mt-6">
                      <textarea
                        rows={4}
                        placeholder="Enter text, optional"
                        value={form.geoNotes}
                        onChange={(e) => updateField("geoNotes", e.target.value)}
                        className="w-full max-w-[480px] resize-none rounded-lg border border-gray-300 px-4 py-3 text-[14px] text-[#3F404D] placeholder:text-gray-400 focus:border-[#0A7D94] focus:outline-none focus:ring-1 focus:ring-[#0A7D94]"
                      />
                    </div>
                  </div>
                )}


                {!isAiInfluencer && !isWorkflowAutomation && form.service !== "geo" && step === 1 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-light-text">
                      Tell us about your project needs
                    </h3>

                    {/* Target Regions — Multi-select chips */}
                    <div className="mt-5">
                      <p className="text-[13px] font-medium text-light-text">
                        Target Regions{" "}
                        <span className="text-red-500">*</span>
                      </p>
                      {errors.regions && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.regions}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {REGIONS.map((region) => (
                          <button
                            key={region}
                            type="button"
                            onClick={() => toggleRegion(region)}
                            className={cn(
                              "rounded-full border px-4 py-1.5 text-[13px] transition-all",
                              form.regions.includes(region)
                                ? "border-[#1CE3F4] bg-[#1CE3F4]/10 text-[#002834]"
                                : "border-border-light text-light-body hover:border-light-text/30"
                            )}
                          >
                            {form.regions.includes(region) && "✓ "}
                            {region}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Target Audience — Radio */}
                    <div className="mt-5">
                      <p className="text-[13px] font-medium text-light-text">
                        Target Audience{" "}
                        <span className="text-red-500">*</span>
                      </p>
                      {errors.audience && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.audience}
                        </p>
                      )}
                      <div className="mt-2 flex flex-col gap-1.5">
                        {AUDIENCES.map((aud) => (
                          <label
                            key={aud}
                            className="flex cursor-pointer items-center gap-2.5"
                          >
                            <div
                              className={cn(
                                "flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                form.audienceSingle === aud
                                  ? "border-[#1CE3F4]"
                                  : "border-[#C3C3C3]"
                              )}
                            >
                              {form.audienceSingle === aud && (
                                <div className="h-2 w-2 rounded-full bg-[#1CE3F4]" />
                              )}
                            </div>
                            <input
                              type="radio"
                              name="audience"
                              value={aud}
                              checked={form.audienceSingle === aud}
                              onChange={() => updateField("audienceSingle", aud)}
                              className="sr-only"
                            />
                            <span className="text-[13px] text-light-body">
                              {aud}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Purpose — Radio */}
                    <div className="mt-5">
                      <p className="text-[13px] font-medium text-light-text">
                        Purpose <span className="text-red-500">*</span>
                      </p>
                      {errors.purpose && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.purpose}
                        </p>
                      )}
                      <div className="mt-2 flex flex-col gap-1.5">
                        {PURPOSES.map((purpose) => (
                          <label
                            key={purpose}
                            className="flex cursor-pointer items-center gap-2.5"
                          >
                            <div
                              className={cn(
                                "flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                form.influencerType === purpose
                                  ? "border-[#1CE3F4]"
                                  : "border-[#C3C3C3]"
                              )}
                            >
                              {form.influencerType === purpose && (
                                <div className="h-2 w-2 rounded-full bg-[#1CE3F4]" />
                              )}
                            </div>
                            <input
                              type="radio"
                              name="purpose"
                              value={purpose}
                              checked={form.influencerType === purpose}
                              onChange={() => updateField("influencerType", purpose)}
                              className="sr-only"
                            />
                            <span className="text-[13px] text-light-body">
                              {purpose}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Generic: Step 2 — Contact ── */}
                {!isAiInfluencer && !isWorkflowAutomation && form.service !== "geo" && step === 2 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-light-text">
                      Your contact information
                    </h3>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                      {/* Full Name */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="fullName"
                          className="text-[13px] font-medium text-light-text"
                        >
                          Full Name{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          placeholder="Your name and last name"
                          value={form.fullName}
                          onChange={(e) =>
                            updateField("fullName", e.target.value)
                          }
                          className={cn(
                            "h-10 rounded-lg border bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]",
                            errors.fullName
                              ? "border-red-500"
                              : "border-border-light hover:border-light-text/30"
                          )}
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-500">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="companyName"
                          className="text-[13px] font-medium text-light-text"
                        >
                          Company Name
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          placeholder="Your company"
                          value={form.companyName}
                          onChange={(e) =>
                            updateField("companyName", e.target.value)
                          }
                          className="h-10 rounded-lg border border-border-light bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors hover:border-light-text/30 focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="email"
                          className="text-[13px] font-medium text-light-text"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="email@domain.com"
                          value={form.email}
                          onChange={(e) =>
                            updateField("email", e.target.value)
                          }
                          className={cn(
                            "h-10 rounded-lg border bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]",
                            errors.email
                              ? "border-red-500"
                              : "border-border-light hover:border-light-text/30"
                          )}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="flex flex-col gap-1">
                        <label
                          htmlFor="phone"
                          className="text-[13px] font-medium text-light-text"
                        >
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+90 XXX XXX XXXX"
                          value={form.phone}
                          onChange={(e) =>
                            updateField("phone", e.target.value)
                          }
                          className={cn(
                            "h-10 rounded-lg border bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]",
                            errors.phone
                              ? "border-red-500"
                              : "border-border-light hover:border-light-text/30"
                          )}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Generic: Step 3 — Brief ── */}
                {!isAiInfluencer && !isWorkflowAutomation && form.service !== "geo" && step === 3 && (
                  <div className="flex-1">
                    <h3 className="text-[15px] font-medium text-light-text">
                      Share your project details
                    </h3>

                    <div className="mt-5 space-y-4">
                      {/* Brief textarea */}
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="brief"
                            className="text-[13px] font-medium text-light-text"
                          >
                            Project Brief
                          </label>
                          <textarea
                            id="brief"
                            rows={4}
                            placeholder="Describe your project goals, timeline, and requirements..."
                            value={form.brief}
                            onChange={(e) =>
                              updateField("brief", e.target.value)
                            }
                            className="w-full resize-y rounded-lg border border-border-light bg-white px-3 py-2.5 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors hover:border-light-text/30 focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                          />
                        </div>

                        {/* Reference URL */}
                        <div className="flex flex-col gap-1">
                          <label
                            htmlFor="referenceUrl"
                            className="text-[13px] font-medium text-light-text"
                          >
                            Style Reference URL
                          </label>
                          <input
                            id="referenceUrl"
                            type="url"
                            placeholder="https://example.com/inspiration"
                            value={form.referenceUrl}
                            onChange={(e) =>
                              updateField("referenceUrl", e.target.value)
                            }
                            className="h-10 rounded-lg border border-border-light bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors hover:border-light-text/30 focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Navigation Buttons ── */}
                <div className="mt-6 flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-[14px] font-medium text-[#474857] rounded-full transition-colors px-6 py-2.5 hover:text-[#474857] bg-[#4748571A]"
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0A7D94] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#00d4d4]"
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
                      className="inline-flex items-center gap-1.5 rounded-[var(--radius-button)] bg-[#1CE3F4] px-6 py-2.5 text-[14px] font-medium text-[#002834] transition-all hover:bg-[#00d4d4] disabled:opacity-50"
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
        </Container>
      </section>
    </>
  );
}
