"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { publicApi } from "@/lib/api";

/* ─── Types ─── */

interface FormData {
  /* Step 1 -- Service */
  service: string;

  /* Step 2 -- Project Details */
  regions: string[];
  audience: string;
  purpose: string;

  /* Step 3 -- Contact */
  companyName: string;
  fullName: string;
  email: string;
  phone: string;

  /* Step 4 -- Brief */
  brief: string;
  referenceUrl: string;
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

const INITIAL_FORM: FormData = {
  service: "",
  regions: [],
  audience: "",
  purpose: "",
  companyName: "",
  fullName: "",
  email: "",
  phone: "",
  brief: "",
  referenceUrl: "",
};

/**
 * Start a Project -- Mobile (375px)
 *
 * Figma: node 1047-18384, 375 x 2421
 *
 * 1. Dark hero with marquee "START A PROJECT" heading
 * 2. Hero card with "Tell Us Your Project" image overlay
 * 3. "Last Step -- Smart Summary" section
 * 4. Multi-step wizard form (single column)
 */
export default function MobileStartProjectPage() {
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

  function toggleRegion(region: string) {
    setForm((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  }

  /* ─── Validation ─── */

  function validateStep(s: number): boolean {
    const newErrors: StepErrors = {};
    switch (s) {
      case 0:
        if (!form.service) newErrors.service = "Please select a service";
        break;
      case 1:
        if (form.regions.length === 0)
          newErrors.regions = "Please select at least one region";
        if (!form.audience)
          newErrors.audience = "Please select a target audience";
        if (!form.purpose) newErrors.purpose = "Please select a purpose";
        break;
      case 2:
        if (!form.fullName.trim())
          newErrors.fullName = "Full name is required";
        if (!form.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!form.phone.trim()) newErrors.phone = "Phone number is required";
        break;
      case 3:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (!validateStep(step)) return;
    if (step < 3) setStep((s) => s + 1);
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

  /* ─── Hero Section ─── */
  const heroSection = (
    <section className="overflow-hidden bg-dark-bg pb-8 pt-20">
      {/* Marquee heading */}
      <div className="overflow-hidden px-5">
        <h1 className="whitespace-nowrap font-heading text-[42px] font-medium uppercase leading-[1.05] text-white">
          START A PROJECT{" "}
          <span className="mx-2 inline-block text-[#1CE3F4]">&#x273B;</span>{" "}
          START A PROJECT{" "}
          <span className="mx-2 inline-block text-[#1CE3F4]">&#x273B;</span>{" "}
          <span className="text-white/20">ST</span>
        </h1>
      </div>
      <p className="mt-4 px-5 text-[14px] leading-[1.6] text-white/50">
        Share your vision and let our team craft a tailored AI-driven
        solution for your brand.
      </p>
    </section>
  );

  /* ─── Success State ─── */

  if (submitted) {
    return (
      <>
        {heroSection}
        <section className="bg-light-bg px-5 py-20">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1CE3F4]/10">
              <svg
                className="h-8 w-8 text-[#1CE3F4]"
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
            <h2 className="mt-6 font-heading text-[24px] font-medium text-light-text">
              Thank You!
            </h2>
            <p className="mt-3 text-[14px] leading-[1.5] text-light-body">
              Your project brief has been received. Our team will review the
              details and reach out within 1-2 business days.
            </p>
            <button
              className="mt-6 text-[13px] text-[#1CE3F4] underline underline-offset-4 transition-colors active:text-[#126478]"
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setForm(INITIAL_FORM);
                setErrors({});
              }}
            >
              Start another project
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO -- Dark bg with marquee heading
          ════════════════════════════════════════════════════════ */}
      {heroSection}

      {/* ════════════════════════════════════════════════════════
          HERO CARD -- "Tell Us Your Project" with image overlay
          ════════════════════════════════════════════════════════ */}
      <section className="bg-dark-bg px-5 pb-10">
        <div className="relative overflow-hidden rounded-[16px]">
          {/* AI face image or gradient placeholder */}
          <div className="relative aspect-[16/10]">
            <Image
              src="/images/start-project/hero-ai-face.jpg"
              alt="AI-generated portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw"
              priority
              onError={(e) => {
                // Hide broken image; gradient placeholder shows through
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Gradient placeholder underneath */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#063746] via-[#0a4a5a] to-[#002834]" />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h2 className="font-heading text-[22px] font-medium text-white">
              Tell Us Your Project
            </h2>
            <p className="mt-1 text-[13px] leading-[1.4] text-white/70">
              We will design a custom AI solution based on your needs.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SMART SUMMARY INTRO
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-10">
        <p className="font-heading text-[12px] uppercase tracking-widest text-[#126478]">
          Last Step &mdash; Smart Summary
        </p>
        <h3 className="mt-2 font-heading text-[18px] font-medium text-light-text">
          Based on your answers, we will design:
        </h3>
        <ul className="mt-3 flex flex-col gap-2">
          {[
            "A tailored AI strategy for your brand",
            "Recommended tools and workflows",
            "A production timeline and budget estimate",
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-[13px] leading-[1.5] text-light-body"
            >
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#1CE3F4]/15 text-[10px] text-[#126478]">
                &#x2713;
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ════════════════════════════════════════════════════════
          MULTI-STEP WIZARD FORM
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-14">
        <div className="overflow-hidden rounded-[16px] border border-border-light bg-white shadow-sm">
          {/* ── Card Header ── */}
          <div className="bg-[#002834] px-5 py-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-[16px] font-medium text-white">
                Project Brief
              </h2>
              <span className="font-heading text-[11px] font-semibold uppercase tracking-wider text-[#1CE3F4]">
                {String(step + 1).padStart(2, "0")}/{STEP_LABELS[step]}
              </span>
            </div>
          </div>

          {/* ── Step Indicator -- Horizontal dots ── */}
          <div className="flex items-center gap-1.5 px-5 pt-5">
            {STEP_LABELS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className={cn(
                    "h-1.5 w-full rounded-full transition-colors duration-300",
                    i <= step ? "bg-[#1CE3F4]" : "bg-[#E0E0E0]"
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    i <= step ? "text-[#002834]" : "text-light-body/40"
                  )}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* ── Form Body ── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col px-5 pb-6 pt-5"
          >
            {/* ── Step 1: Service Selection ── */}
            {step === 0 && (
              <div>
                <h3 className="text-[14px] font-medium text-light-text">
                  Which service are you interested in?
                </h3>
                {errors.service && (
                  <p className="mt-2 text-[12px] text-red-500">
                    {errors.service}
                  </p>
                )}
                <div className="mt-4 flex flex-col gap-2">
                  {SERVICES.map((svc) => (
                    <label
                      key={svc.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-[10px] border px-4 py-3 transition-all active:scale-[0.98]",
                        form.service === svc.id
                          ? "border-[#1CE3F4] bg-[#1CE3F4]/5"
                          : "border-border-light"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                          form.service === svc.id
                            ? "border-[#1CE3F4]"
                            : "border-[#C3C3C3]"
                        )}
                      >
                        {form.service === svc.id && (
                          <div className="h-2.5 w-2.5 rounded-full bg-[#1CE3F4]" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="service"
                        value={svc.id}
                        checked={form.service === svc.id}
                        onChange={() => updateField("service", svc.id)}
                        className="sr-only"
                      />
                      <span className="text-[13px] leading-[1.3] text-light-text">
                        {svc.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 2: Project Details ── */}
            {step === 1 && (
              <div>
                <h3 className="text-[14px] font-medium text-light-text">
                  Tell us about your project needs
                </h3>

                {/* Target Regions -- Multi-select pills */}
                <div className="mt-5">
                  <p className="text-[12px] font-medium text-light-text">
                    Target Regions{" "}
                    <span className="text-red-500">*</span>
                  </p>
                  {errors.regions && (
                    <p className="mt-1 text-[12px] text-red-500">
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
                          "rounded-full border px-4 py-2 text-[12px] transition-all active:scale-95",
                          form.regions.includes(region)
                            ? "border-[#1CE3F4] bg-[#1CE3F4]/10 text-[#002834]"
                            : "border-border-light text-light-body"
                        )}
                      >
                        {form.regions.includes(region) && (
                          <span className="mr-1">&#x2713;</span>
                        )}
                        {region}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Audience -- Radio pills */}
                <div className="mt-5">
                  <p className="text-[12px] font-medium text-light-text">
                    Target Audience{" "}
                    <span className="text-red-500">*</span>
                  </p>
                  {errors.audience && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.audience}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {AUDIENCES.map((aud) => (
                      <button
                        key={aud}
                        type="button"
                        onClick={() => updateField("audience", aud)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-[12px] transition-all active:scale-95",
                          form.audience === aud
                            ? "border-[#1CE3F4] bg-[#1CE3F4]/10 text-[#002834]"
                            : "border-border-light text-light-body"
                        )}
                      >
                        {form.audience === aud && (
                          <span className="mr-1">&#x2713;</span>
                        )}
                        {aud}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Purpose -- Radio pills */}
                <div className="mt-5">
                  <p className="text-[12px] font-medium text-light-text">
                    Purpose <span className="text-red-500">*</span>
                  </p>
                  {errors.purpose && (
                    <p className="mt-1 text-[12px] text-red-500">
                      {errors.purpose}
                    </p>
                  )}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {PURPOSES.map((purpose) => (
                      <button
                        key={purpose}
                        type="button"
                        onClick={() => updateField("purpose", purpose)}
                        className={cn(
                          "rounded-full border px-4 py-2 text-[12px] transition-all active:scale-95",
                          form.purpose === purpose
                            ? "border-[#1CE3F4] bg-[#1CE3F4]/10 text-[#002834]"
                            : "border-border-light text-light-body"
                        )}
                      >
                        {form.purpose === purpose && (
                          <span className="mr-1">&#x2713;</span>
                        )}
                        {purpose}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Contact Information ── */}
            {step === 2 && (
              <div>
                <h3 className="text-[14px] font-medium text-light-text">
                  Your contact information
                </h3>

                <div className="mt-4 flex flex-col gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="fullName"
                      className="text-[12px] font-medium text-light-text"
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
                        "h-11 rounded-[10px] border bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]",
                        errors.fullName
                          ? "border-red-500"
                          : "border-border-light"
                      )}
                    />
                    {errors.fullName && (
                      <p className="text-[12px] text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="companyName"
                      className="text-[12px] font-medium text-light-text"
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
                      className="h-11 rounded-[10px] border border-border-light bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="email"
                      className="text-[12px] font-medium text-light-text"
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
                        "h-11 rounded-[10px] border bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]",
                        errors.email
                          ? "border-red-500"
                          : "border-border-light"
                      )}
                    />
                    {errors.email && (
                      <p className="text-[12px] text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="phone"
                      className="text-[12px] font-medium text-light-text"
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
                        "h-11 rounded-[10px] border bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]",
                        errors.phone
                          ? "border-red-500"
                          : "border-border-light"
                      )}
                    />
                    {errors.phone && (
                      <p className="text-[12px] text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 4: Brief + Submit ── */}
            {step === 3 && (
              <div>
                <h3 className="text-[14px] font-medium text-light-text">
                  Share your project details
                </h3>

                <div className="mt-4 flex flex-col gap-4">
                  {/* Brief textarea */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="brief"
                      className="text-[12px] font-medium text-light-text"
                    >
                      Project Brief
                    </label>
                    <textarea
                      id="brief"
                      rows={5}
                      placeholder="Describe your project goals, timeline, and requirements..."
                      value={form.brief}
                      onChange={(e) =>
                        updateField("brief", e.target.value)
                      }
                      className="w-full resize-y rounded-[10px] border border-border-light bg-white px-3 py-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                    />
                  </div>

                  {/* Reference URL */}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="referenceUrl"
                      className="text-[12px] font-medium text-light-text"
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
                      className="h-11 rounded-[10px] border border-border-light bg-white px-3 text-[14px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Navigation Buttons ── */}
            <div className="mt-6 flex items-center justify-between border-t border-border-light pt-5">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-light-body transition-colors active:text-light-text"
                >
                  <svg
                    className="h-3 w-3 rotate-180"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 7h8M8 3l3 4-3 4" />
                  </svg>
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1CE3F4] px-6 py-2.5 text-[13px] font-medium text-[#002834] transition-all active:scale-95 active:bg-[#00d4d4]"
                >
                  Next
                  <svg
                    className="h-3 w-3"
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
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1CE3F4] px-6 py-2.5 text-[13px] font-medium text-[#002834] transition-all active:scale-95 active:bg-[#00d4d4] disabled:opacity-50"
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
                        className="h-3 w-3"
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
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA -- Bottom section
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-14">
        <div
          className="rounded-[16px] p-6 text-center"
          style={{
            background: "linear-gradient(-90deg, #002834 0%, #129CAC 100%)",
          }}
        >
          <p className="font-heading text-[18px] font-bold text-[#EBFFFF]">
            Not sure where to start?
          </p>
          <p className="mt-2 text-[12px] leading-[1.5] text-[#EBFFFF]/70">
            Our team is here to help. Share your vision and we will
            guide you to the right AI solution.
          </p>
        </div>
      </section>
    </>
  );
}
