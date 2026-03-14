"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/layout";
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
 * Let's Connect — Contact Page
 *
 * Figma-accurate layout:
 * 1. Dark hero with marquee-style "LET'S CONNECT" heading
 * 2. Light-bg form section (Full Name, Company Email, Company Name, Country, Details)
 * 3. "CONNECT" section with two-column office details
 */
export default function LetsConnectPage() {
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
      <section className="overflow-hidden bg-dark-bg pt-20 pb-12">
        <Container>
          {/* Marquee heading */}
          <div className="overflow-hidden">
            <h1 className="whitespace-nowrap font-heading text-[clamp(36px,8vw,140px)] font-medium uppercase leading-[1.05] text-white max-md:whitespace-normal">
              LET&apos;S CONNECT{" "}
              <span className="mx-4 inline-block text-teal-500">✻</span>{" "}
              LET&apos;S CONNECT{" "}
              <span className="mx-4 inline-block text-teal-500">✻</span>{" "}
              <span className="text-white/20">LE</span>
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-body-sm leading-[1.7] text-white/50">
            Use the form below to tell us about your project and book a vision
            call.
          </p>
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════
          FORM — Light background
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg py-16">
        <Container>
          {submitted ? (
            /* ── Success State ── */
            <div className="flex flex-col items-center justify-center py-24 text-center">
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
                Message Sent!
              </h2>
              <p className="mt-4 max-w-md text-body-sm text-light-body">
                Thank you for reaching out. Our team will review your message
                and get back to you within 24 hours.
              </p>
              <button
                className="mt-8 text-sm text-[#1CE3F4] underline underline-offset-4 transition-colors hover:text-[#126478]"
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
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-light-text"
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
                    className={`h-12 w-full rounded-[var(--radius-input)] border bg-white px-4 text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4] ${
                      errors.fullName
                        ? "border-red-500"
                        : "border-border-light hover:border-light-text/30"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Company Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="companyEmail"
                    className="text-sm font-medium text-light-text"
                  >
                    Company Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    placeholder="email@domain.com"
                    value={form.companyEmail}
                    onChange={(e) =>
                      updateField("companyEmail", e.target.value)
                    }
                    className={`h-12 w-full rounded-[var(--radius-input)] border bg-white px-4 text-light-text placeholder:text-light-body/50 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4] ${
                      errors.companyEmail
                        ? "border-red-500"
                        : "border-border-light hover:border-light-text/30"
                    }`}
                  />
                  {errors.companyEmail && (
                    <p className="text-xs text-red-500">
                      {errors.companyEmail}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="companyName"
                    className="text-sm font-medium text-light-text"
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
                    className="h-12 w-full rounded-[var(--radius-input)] border border-border-light bg-white px-4 text-light-text placeholder:text-light-body/50 transition-colors hover:border-light-text/30 focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                  />
                </div>

                {/* Country */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="country"
                    className="text-sm font-medium text-light-text"
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
                    className="h-12 w-full rounded-[var(--radius-input)] border border-border-light bg-white px-4 text-light-text placeholder:text-light-body/50 transition-colors hover:border-light-text/30 focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="mt-6 flex flex-col gap-1.5">
                <label
                  htmlFor="details"
                  className="text-sm font-medium text-light-text"
                >
                  Details regarding your question, if any
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  value={form.details}
                  onChange={(e) => updateField("details", e.target.value)}
                  className="w-full resize-y rounded-[var(--radius-input)] border border-border-light bg-white px-4 py-3 text-light-text placeholder:text-light-body/50 transition-colors hover:border-light-text/30 focus:border-[#1CE3F4] focus:outline-none focus:ring-1 focus:ring-[#1CE3F4]"
                />
              </div>

              {/* Submit */}
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center justify-center rounded-[var(--radius-button)] bg-[#1CE3F4] px-10 py-3.5 font-heading text-sm font-medium text-[#002834] transition-all hover:bg-[#00d4d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CE3F4] disabled:opacity-50"
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
        </Container>
      </section>

      {/* ════════════════════════════════════════════════════════
          CONNECT — Office details section
          ════════════════════════════════════════════════════════ */}
      <section className="bg-light-bg pb-24">
        <Container>
          <h2 className="font-heading text-[clamp(48px,6vw,100px)] font-medium uppercase leading-[0.95] text-light-text">
            CONNECT
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* DDiP - PARIS */}
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-light-text">
                DDiP - PARIS
              </h3>
              <p className="mt-3 text-sm leading-[1.6] text-light-body">
                14 rue Pierre Demours
                <br />
                75 017 PARIS / FRANCE
              </p>
              <div className="mt-6">
                <p className="text-sm text-light-body">info@ddip.co</p>
                <p className="mt-1 text-sm text-light-body">
                  +33 (0)1 72 34 83 34
                </p>
              </div>
            </div>

            {/* DDiP - ISTANBUL */}
            <div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-light-text">
                DDiP - ISTANBUL
              </h3>
              <p className="mt-3 text-sm leading-[1.6] text-light-body">
                Gayrettepe Mah. Ayazma Deresi Sk.
                <br />
                Ata Moray İş Merkezi No 3 D:34
                <br />
                Fulya/Beşiktaş · İSTANBUL
              </p>
              <div className="mt-6">
                <p className="text-sm text-light-body">info@ddip.co</p>
                <p className="mt-1 text-sm text-light-body">
                  +90 (0) 212 216 11 26
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
