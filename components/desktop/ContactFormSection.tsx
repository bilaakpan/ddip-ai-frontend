"use client";

export default function ContactFormSection() {
  return (
    <section className="bg-light-bg py-24 px-[60px]">
      <div className="flex gap-16 items-start">

        {/* Left — heading + description */}
        <div className="w-[500px] shrink-0">
          <h2 className="font-heading text-[60px] font-bold leading-[1.1]" style={{ color: "#039EB7" }}>
            Let&apos;s Build<br />What&apos;s Next,<br />Together.
          </h2>
          <p className="mt-6 text-[24px] leading-[1.7] text-[#063746]/60" style={{ fontFamily: "var(--font-body)" }}>
            Whether you&apos;re exploring AI solutions or ready to start a custom project, our team is here to help you design intelligent systems that move your business forward.
          </p>
        </div>

        {/* Right — Form card */}
        <div className="flex-1 bg-white rounded-[20px] p-10 shadow-sm border border-[#063746]/8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-5">
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Full Name *</label>
              <input type="text" placeholder="Your name and last name" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
            </div>
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Email Address *</label>
              <input type="email" placeholder="example@domain.com" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
            </div>
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Company Name</label>
              <input type="text" placeholder="Your employer's name" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
            </div>
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Country</label>
              <input type="text" placeholder="Your country of residence" className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none" />
            </div>
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Automation Type *</label>
              <select className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746]/40 focus:border-[#1CE3F4] focus:outline-none appearance-none bg-white ">
                <option value="">Please select</option>
                <option>Content Automation</option>
                <option>Analytics & Insights</option>
                <option>Conversational Systems</option>
                <option>Lead Solutions</option>
              </select>
            </div>
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Category *</label>
              <select className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746]/40 focus:border-[#1CE3F4] focus:outline-none appearance-none bg-white">
                <option value="">Please select</option>
                <option>E-commerce</option>
                <option>SaaS</option>
                <option>Healthcare</option>
                <option>Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Platform</label>
              <select className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746]/40 focus:border-[#1CE3F4] focus:outline-none appearance-none bg-white">
                <option value="">Please select</option>
                <option>Zapier</option>
                <option>n8n</option>
                <option>HubSpot</option>
              </select>
            </div>
            <div>
              <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Use Case</label>
              <select className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746]/40 focus:border-[#1CE3F4] focus:outline-none appearance-none bg-white">
                <option value="">Please select</option>
                <option>Lead Generation</option>
                <option>Content Scheduling</option>
                <option>Customer Support</option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-[20px] text-[#3F444E] mb-1.5" style={{ fontFamily: "var(--font-body)" }}>Tell us more about your needs</label>
            <textarea rows={4} className="w-full rounded-[8px] border border-[#063746]/15 px-4 py-3 text-[14px] text-[#063746] placeholder:text-[#BABABA] focus:border-[#1CE3F4] focus:outline-none resize-none" />
          </div>

          <div className="mt-6 flex items-center gap-6">
            <button className="rounded-full px-8 py-3 font-heading text-[16px] font-medium text-white transition hover:opacity-90" style={{ backgroundColor: "#0A7D94" }}>
              Let&apos;s Find Your Automation
            </button>
            <p className="text-[16px] text-[#8B8B8B]" style={{ fontFamily: "var(--font-body)" }}>
              We&apos;ll get back to you<br />within 24 hours.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

  