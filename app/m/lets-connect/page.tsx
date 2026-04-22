"use client";

import { useState } from "react";
import { publicApi } from "@/lib/api";

/* ─── Types ─── */
interface ContactForm {
  fullName: string;
  companyEmail: string;
  companyName: string;
  country: string;
  details: string;
  honeypot: string;
}
interface FormErrors {
  fullName?: string;
  companyEmail?: string;
  details?: string;
}

const inputBase = "h-11 w-full rounded-xl border bg-white px-4 text-[14px] text-[#888888] placeholder:text-gray-400 transition-colors focus:border-[#1CE3F4] focus:outline-none focus:ring-2 focus:ring-[#1CE3F4] focus:ring-offset-0";

const safePx: React.CSSProperties = {
  paddingLeft: "max(20px, env(safe-area-inset-left))",
  paddingRight: "max(20px, env(safe-area-inset-right))",
};

export default function MobileLetsConnectPage() {
  const [form, setForm] = useState<ContactForm>({
    fullName: "", companyEmail: "", companyName: "", country: "", details: "", honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  function updateField(field: keyof ContactForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate(): boolean {
    if (form.honeypot) { setSubmitted(true); return false; }

    const now = Date.now();
    const newErrors: FormErrors = {};

    if (lastSubmitTime && now - lastSubmitTime < 60_000) {
      newErrors.companyEmail = "Please wait a moment before submitting again";
      setErrors(newErrors); return false;
    }
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      newErrors.fullName = "Please enter your full name";
    if (!form.companyEmail.trim()) {
      newErrors.companyEmail = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail)) {
      newErrors.companyEmail = "Please enter a valid email address";
    } else {
      const blocked = ["mailinator.com", "tempmail.com", "guerrillamail.com", "10minutemail.com", "yopmail.com"];
      const domain = form.companyEmail.split("@")[1]?.toLowerCase();
      if (blocked.includes(domain)) newErrors.companyEmail = "Please use a valid company email";
    }
    if (form.details.trim() && form.details.trim().length < 10)
      newErrors.details = "Please provide at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
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
      setLastSubmitTime(Date.now());
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {/* ══════════════════════════════════════
          HERO — marquee heading
      ══════════════════════════════════════ */}
      <section className="overflow-hidden bg-[#F6F9F2] pt-10 pb-6">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="pr-8 font-heading text-[87px] fon uppercase leading-none text-dark-bg">
                LET&apos;S CONNECT <span className="mx-2">✻</span>
              </span>
            ))}
          </div>
        </div>
        <p className="text-[22px] leading-relaxed text-[#063746]" style={safePx}>
          Use the form below to tell us about your project and book a vision call.
        </p>
      </section>

      {/* ══════════════════════════════════════
          FORM
      ══════════════════════════════════════ */}
      <section className="bg-white py-8" style={safePx}>
        {submitted ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1CE3F4]/10">
              <svg className="h-8 w-8 text-[#1CE3F4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="mt-6 font-heading text-[22px] font-semibold text-gray-900">Message Sent!</h2>
            <p className="mt-3 max-w-70 text-[13px] leading-relaxed text-gray-600">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>
            <button
              className="mt-6 text-[13px] text-[#1CE3F4] underline underline-offset-4"
              onClick={() => { setSubmitted(false); setForm({ fullName: "", companyEmail: "", companyName: "", country: "", details: "", honeypot: "" }); }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.honeypot} onChange={(e) => updateField("honeypot", e.target.value)} />
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullName" className="text-[16px] font-medium text-[#3F444E]">Full Name*</label>
              <input
                id="fullName" name="fullName" type="text" placeholder="Your name and last name"
                value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)}
                className={`${inputBase} ${errors.fullName ? "border-red-500" : "border-[#D4D4D4]"}`}
              />
              {errors.fullName && <p className="text-[11px] text-red-500">{errors.fullName}</p>}
            </div>

            {/* Company Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="companyEmail" className="text-[16px] font-medium text-[#3F444E]">Company Email*</label>
              <input
                id="companyEmail" name="companyEmail" type="email" placeholder="email@domain.com"
                value={form.companyEmail} onChange={(e) => updateField("companyEmail", e.target.value)}
                className={`${inputBase} ${errors.companyEmail ? "border-red-500" : "border-[#D4D4D4]"}`}
              />
              {errors.companyEmail && <p className="text-[11px] text-red-500">{errors.companyEmail}</p>}
            </div>

            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="companyName" className="text-[16px] font-medium text-[#3F444E]">Company Name*</label>
              <input
                id="companyName" name="companyName" type="text"
                value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)}
                className={`${inputBase} border-[#D4D4D4]`}
              />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="country" className="text-[16  px] font-medium text-[#3F444E]">Country</label>
              <input
                id="country" name="country" type="text" placeholder="City of Residence"
                value={form.country} onChange={(e) => updateField("country", e.target.value)}
                className={`${inputBase} border-[#D4D4D4]`}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="details" className="text-[16px] font-medium text-[#3F444E]">Details regarding your question, if any</label>
              <textarea
                id="details" name="details" rows={5}
                value={form.details} onChange={(e) => updateField("details", e.target.value)}
                className="w-full resize-y rounded-xl border border-[#D4D4D4] bg-white px-4 py-3 text-[14px] text-[#888888] placeholder:text-gray-400 focus:border-[#1CE3F4] focus:outline-none focus:ring-2 focus:ring-[#1CE3F4] focus:ring-offset-0"
              />
              {errors.details && <p className="text-[11px] text-red-500">{errors.details}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="mt-2 flex w-[50%] items-start justify-center rounded-full bg-[#0A7D94] py-3 text-[20px] font-semibold text-white transition-all active:opacity-80 disabled:opacity-50"
            >
              {sending ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Sending...
                </>
              ) : "Send"}
            </button>
          </form>
        )}
      </section>

      {/* ══════════════════════════════════════
          CONNECT — office details
      ══════════════════════════════════════ */}
      <section
        className="bg-[#f5f5f2] py-10"
        style={{
          paddingLeft: "max(20px, env(safe-area-inset-left))",
          paddingRight: "max(20px, env(safe-area-inset-right))",
          paddingBottom: "max(48px, calc(16px + env(safe-area-inset-bottom)))",
        }}
      >
        <h2 className="font-heading text-[40px] font-semibold uppercase leading-none tracking-tight text-dark-bg">
          CONNECT
        </h2>

        <div className="mt-8 flex flex-col gap-8">
          {/* Istanbul */}
          <div>
            <p className="text-[28px] font-medium uppercase text-[#00BCCF]">ddip - ISTANBUL</p>
            <p className="mt-2 text-[24px] leading-relaxed text-dark-bg">
              Gayrettepe Mah. Ayazma Deresi Sk. Aliye Meriç 7 İş Merkezi No 3 D 24 Fulya/Gayrettepe - ISTANBUL, TURKEY
            </p>
            <p className="mt-15 text-[24px] leading-relaxed text-dark-bg">
              info@ddip.co
              <br />
              +90 (0) 212 216 11 26
            </p>
          </div>

          {/* Paris */}
          <div>
            <p className="text-[28px] font-medium uppercase text-[#00BCCF]">DDIP — PARIS</p>
            <p className="mt-2 text-[24px] leading-relaxed text-dark-bg">
              14 rue Pierre Demours
              <br />
              75 017 PARIS / FRANCE
            </p>
            <p className="mt-15 text-[24px] leading-relaxed text-dark-bg">
              info@ddip.co
              <br />
              +33 (0) 1 44 69 11 26
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
