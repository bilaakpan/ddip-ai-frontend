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
      <section className="overflow-hidden bg-[#F6F9F2] pt-20 sm:pt-24 md:pt-35 pb-8 sm:pb-10 md:pb-12">
        <Container>
          {/* Marquee heading */}
          <div className="overflow-hidden w-full">
            <div className="flex w-max animate-marquee">
              <h1 className="whitespace-nowrap text-[#063746] font-heading text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)] uppercase leading-[1.05]">
                LET&apos;S CONNECT
                <span className="mx-4 text-teal-500">✻</span>
              </h1>
              {/* duplicate for seamless scroll */}
              <h1 className="whitespace-nowrap text-[#063746] font-heading text-[clamp(32px,6vw,64px)] sm:text-[clamp(36px,7vw,80px)] md:text-[clamp(48px,8vw,120px)] uppercase leading-[1.05] ml-10">
                LET&apos;S CONNECT
                <span className="mx-4 text-teal-500">✻</span>
                LET&apos;S CONNECT
                <span className="mx-4 text-teal-500">✻</span>
              </h1>
            </div>
          </div>
          <p className="mt-6 sm:mt-8 max-w-xs sm:max-w-md md:max-w-2xl text-left text-base sm:text-lg md:text-xl leading-[1.6] text-[#063746] px-4">
            Use the form below to tell us about your project and book a vision
            call.
          </p>
        </Container>
      </section>
      {/* ════════════════════════════════════════════════════════
          FORM — Light background
          ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 sm:py-16 md:py-20">
        <Container>
          <div className="">
            {submitted ? (
              /* ── Success State ── */
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 text-center">
                <div className="flex h-16 w-16 sm:h-18 sm:w-18 md:h-20 md:w-20 items-center justify-center rounded-full bg-[#1CE3F4]/10">
                  <svg
                    className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-[#1CE3F4]"
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
                <h2 className="mt-6 sm:mt-8 font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900">
                  Message Sent!
                </h2>
                <p className="mt-3 sm:mt-4 max-w-sm sm:max-w-md text-sm sm:text-base text-gray-600">
                  Thank you for reaching out. Our team will review your message
                  and get back to you within 24 hours.
                </p>
                <button
                  className="mt-6 sm:mt-8 text-sm text-[#1CE3F4] underline underline-offset-4 transition-colors hover:text-[#126478]"
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
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label htmlFor="fullName" className="mb-1.5 sm:mb-2 text-sm font-medium text-[#3F444E]">
                      Full Name*
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Your name and last name"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      className={`h-10 sm:h-11 md:h-12 w-full rounded-md border bg-white px-3 sm:px-4 text-[#888888] placeholder:text-gray-400 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-2 focus:ring-[#1CE3F4] focus:ring-offset-0 ${errors.fullName
                        ? "border-red-500"
                        : "border-[#A1A1A1] hover:border-gray-400"
                        }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                    )}
                  </div>
                  {/* Company Email */}
                  <div className="flex flex-col">
                    <label htmlFor="companyEmail" className="mb-1.5 sm:mb-2 text-sm font-medium text-[#3F444E]">
                      Company Email*
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
                      className={`h-10 sm:h-11 md:h-12 w-full rounded-md border bg-white px-3 sm:px-4 text-[#888888] placeholder:text-gray-400 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-2 focus:ring-[#1CE3F4] focus:ring-offset-0 ${errors.companyEmail
                        ? "border-red-500"
                        : "border-[#A1A1A1] hover:border-gray-400"
                        }`}
                    />
                    {errors.companyEmail && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.companyEmail}
                      </p>
                    )}
                  </div>
                  {/* Company Name */}
                  <div className="flex flex-col">
                    <label htmlFor="companyName" className="mb-1.5 sm:mb-2 text-sm font-medium text-[#3F444E]">
                      Company Name*
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder=""
                      value={form.companyName}
                      onChange={(e) => updateField("companyName", e.target.value)}
                      className="h-10 sm:h-11 md:h-12 w-full rounded-md border border-gray-300 bg-white px-3 sm:px-4 text-[#888888] placeholder:text-gray-400 transition-colors hover:border-gray-400 focus:border-[#1CE3F4] focus:outline-none focus:ring-2 focus:ring-[#1CE3F4] focus:ring-offset-0"
                    />
                  </div>
                  {/* Country */}
                  <div className="flex flex-col">
                    <label htmlFor="country" className="mb-1.5 sm:mb-2 text-sm font-medium text-[#3F444E]">
                      Country
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      placeholder="City of Residence"
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      className="h-10 sm:h-11 md:h-12 w-full rounded-md border border-gray-300 bg-white px-3 sm:px-4 text-[#888888] placeholder:text-gray-400 transition-colors hover:border-gray-400 focus:border-[#1CE3F4] focus:outline-none focus:ring-2 focus:ring-[#1CE3F4] focus:ring-offset-0"
                    />
                  </div>
                </div>
                {/* Details */}
                <div className="flex flex-col">
                  <label htmlFor="details" className="mb-1.5 sm:mb-2 text-sm font-medium text-[#3F444E]">
                    Details regarding your question, if any
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={5}
                    value={form.details}
                    onChange={(e) => updateField("details", e.target.value)}
                    className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 sm:px-4 py-2.5 sm:py-3 text-[#888888] placeholder:text-gray-400 transition-colors hover:border-gray-400 focus:border-[#1CE3F4] focus:outline-none focus:ring-2 focus:ring-[#1CE3F4] focus:ring-offset-0"
                  />
                </div>
                {/* Submit */}
                <div className="pt-3 sm:pt-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center justify-center rounded-md bg-[#1CE3F4] px-6 sm:px-8 py-2.5 sm:py-3 text-sm font-semibold text-[#002834] transition-all hover:bg-[#00d4d4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CE3F4] disabled:opacity-50 w-full sm:w-auto"
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
                        Sending...
                      </>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </section>
      {/* ════════════════════════════════════════════════════════
          CONNECT — Office details section
          ════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f2] py-16 sm:py-20 md:py-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-16">
            {/* LEFT: CONNECT */}
            <div className="md:w-[40%]">
              <h2 className="font-heading uppercase text-[#0f3b44] leading-none
          text-5xl sm:text-6xl md:text-7xl lg:text-[110px] tracking-[-0.02em]">
                CONNECT
              </h2>
            </div>
            {/* RIGHT: CONTACT INFO */}
            <div className="md:w-[60%] flex flex-col sm:flex-row gap-10 sm:gap-16">
              {/* PARIS */}
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#646464]">
                  DDIP - PARIS
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#002834]">
                  14 rue Pierre Demours <br />
                  75 017 PARIS / FRANCE
                </p>
                <div className="mt-5 space-y-1">
                  <p className="text-[13px] text-[#002834]">info@ddip.co</p>
                  <p className="text-[13px] text-[#002834]">
                    +33 (0)1 72 34 83 34
                  </p>
                </div>
              </div>
              {/* ISTANBUL */}
              <div className="flex-1">
                <h3 className="text-[13px] font-semibold uppercase tracking-wide text-[#646464]">
                  DDIP - ISTANBUL
                </h3>
                <p className="mt-3 text-[13px] leading-relaxed text-[#002834]">
                  Gayrettepe Mah. Ayazma Deresi Sk. <br />
                  Ata Moray İş Merkezi No 3 D:34 <br />
                  Fulya/Beşiktaş · İSTANBUL, TURKEY
                </p>
                <div className="mt-5 space-y-1">
                  <p className="text-[13px] text-[#002834]">info@ddip.co</p>
                  <p className="text-[13px] text-[#002834]">
                    +90 (0) 212 216 11 26
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
