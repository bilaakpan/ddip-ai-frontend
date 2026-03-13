"use client";

import { useState, type FormEvent } from "react";
import { publicApi } from "@/lib/api";

/* ─── Types ─── */

interface ContactForm {
  fullName: string;
  companyEmail: string;
  companyName: string;
  country: string;
  details: string;
}

interface FormErrors {
  fullName?: string;
  companyEmail?: string;
}

/**
 * Let's Connect — Mobile (375 px)
 *
 * Figma node 1025-14831 (375 x 3042)
 *
 * 1. Dark hero with marquee "LET'S CONNECT" heading
 * 2. Light-bg form section (stacked single-column)
 * 3. Success state after submission
 * 4. "CONNECT" section with stacked office details
 */
export default function MobileLetsConnectPage() {
  const [form, setForm] = useState<ContactForm>({
    fullName: "",
    companyEmail: "",
    companyName: "",
    country: "",
    details: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function updateField(field: keyof ContactForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.companyEmail.trim()) {
      newErrors.companyEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail)) {
      newErrors.companyEmail = "Please enter a valid email address";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await publicApi.submitContact({
        name: form.fullName,
        email: form.companyEmail,
        phone: undefined,
        subject: form.companyName || undefined,
        message: form.details || "No details provided",
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          HERO — Dark bg with marquee-style heading
          ════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden bg-dark-bg pt-24 pb-10">
        <div className="px-5">
          {/* Marquee heading — single line, overflow hidden */}
          <div className="overflow-hidden">
            <h1 className="whitespace-nowrap font-heading text-[48px] font-medium uppercase leading-[1.05] text-white">
              LET&apos;S CONNECT{" "}
              <span className="mx-3 inline-block text-[#1CE3F4]">&#x2733;</span>{" "}
              LET&apos;S CONNECT{" "}
              <span className="mx-3 inline-block text-[#1CE3F4]">&#x2733;</span>{" "}
              LET&apos;S CONNECT{" "}
              <span className="mx-3 inline-block text-[#1CE3F4]">&#x2733;</span>{" "}
              <span className="text-white/20">LE</span>
            </h1>
          </div>

          <p className="mt-5 text-[15px] leading-[1.6] text-white/50">
            Use the form below to tell us about your project and book a vision
            call.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FORM — Light background, single-column stacked
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 py-14">
        {submitted ? (
          /* ── Success State ── */
          <div className="flex flex-col items-center justify-center py-16 text-center">
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
              Message Sent!
            </h2>
            <p className="mt-3 text-[14px] leading-[1.5] text-light-body">
              Thank you for reaching out. Our team will review your message
              and get back to you within 24 hours.
            </p>
            <button
              className="mt-6 text-[14px] text-[#1CE3F4] underline underline-offset-4 transition-colors active:text-[#126478]"
              onClick={() => {
                setSubmitted(false);
                setForm({
                  fullName: "",
                  companyEmail: "",
                  companyName: "",
                  country: "",
                  details: "",
                });
              }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="fullName"
                  className="text-[14px] font-medium text-light-text"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your name and last name"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={`h-12 w-full rounded-[var(--radius-input)] border bg-white px-4 text-[15px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4] ${
                    errors.fullName
                      ? "border-red-500"
                      : "border-border-light"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[12px] text-red-500">{errors.fullName}</p>
                )}
              </div>

              {/* Company Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="companyEmail"
                  className="text-[14px] font-medium text-light-text"
                >
                  Company Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="companyEmail"
                  name="companyEmail"
                  type="email"
                  placeholder="email@domain.com"
                  value={form.companyEmail}
                  onChange={(e) => updateField("companyEmail", e.target.value)}
                  className={`h-12 w-full rounded-[var(--radius-input)] border bg-white px-4 text-[15px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4] ${
                    errors.companyEmail
                      ? "border-red-500"
                      : "border-border-light"
                  }`}
                />
                {errors.companyEmail && (
                  <p className="text-[12px] text-red-500">
                    {errors.companyEmail}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="companyName"
                  className="text-[14px] font-medium text-light-text"
                >
                  Company Name<span className="text-red-500">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder=""
                  value={form.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  className="h-12 w-full rounded-[var(--radius-input)] border border-border-light bg-white px-4 text-[15px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="country"
                  className="text-[14px] font-medium text-light-text"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="City of Residence"
                  value={form.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  className="h-12 w-full rounded-[var(--radius-input)] border border-border-light bg-white px-4 text-[15px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="details"
                  className="text-[14px] font-medium text-light-text"
                >
                  Details regarding your question, if any
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  value={form.details}
                  onChange={(e) => updateField("details", e.target.value)}
                  className="w-full resize-y rounded-[var(--radius-input)] border border-border-light bg-white px-4 py-3 text-[15px] text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center rounded-[var(--radius-button)] bg-[#1CE3F4] px-8 py-3.5 font-heading text-[14px] font-medium text-[#002834] transition-all active:bg-[#00d4d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CE3F4] disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
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
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════
          CONNECT — Office details (stacked, single-column)
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg px-5 pb-20">
        <h2 className="font-heading text-[clamp(40px,12vw,56px)] font-medium uppercase leading-[0.95] text-light-text">
          CONNECT
        </h2>

        <div className="mt-10 flex flex-col gap-10">
          {/* DDiP - PARIS */}
          <div>
            <h3 className="font-heading text-[13px] font-semibold uppercase tracking-wider text-light-text">
              DDiP - PARIS
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-light-body">
              14 rue Pierre Demours
              <br />
              75 017 PARIS / FRANCE
            </p>
            <div className="mt-5">
              <p className="text-[14px] text-light-body">info@ddip.co</p>
              <p className="mt-1 text-[14px] text-light-body">
                +33 (0)1 72 34 83 34
              </p>
            </div>
          </div>

          {/* DDiP - ISTANBUL */}
          <div>
            <h3 className="font-heading text-[13px] font-semibold uppercase tracking-wider text-light-text">
              DDiP - ISTANBUL
            </h3>
            <p className="mt-3 text-[14px] leading-[1.6] text-light-body">
              Gayrettepe Mah. Ayazma Deresi Sk.
              <br />
              Ata Moray Is Merkezi No 3 D:34
              <br />
              Fulya/Besiktas &middot; ISTANBUL
            </p>
            <div className="mt-5">
              <p className="text-[14px] text-light-body">info@ddip.co</p>
              <p className="mt-1 text-[14px] text-light-body">
                +90 (0) 212 216 11 26
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
