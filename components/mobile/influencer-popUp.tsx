"use client";
import Image from "next/image";

/**
 * Mirror of the desktop popup type. Optional fields stay empty rather than
 * rendering hardcoded placeholder copy when the admin hasn't filled them.
 */
export type PopupInfluencer = {
  name: string;
  archetype: string;
  industry: string;
  image: string;
  country?: string;
  title?: string;
  age?: number;
  summary?: string;
  profile?: string;
  contentFocus?: string;
  visualStyle?: string;
  tone?: string;
  brandFit?: string;
};

type InfluencerPopupModalProps = {
  open: boolean;
  onClose: () => void;
  influencer?: PopupInfluencer | null;
};

function buildSubtitle(profile: PopupInfluencer): string | null {
  const parts: string[] = [];
  if (profile.title) parts.push(profile.title);
  if (profile.age != null) parts.push(String(profile.age));
  return parts.length > 0 ? parts.join(" | ") : null;
}

export function InfluencerPopupModal({
  open,
  onClose,
  influencer,
}: InfluencerPopupModalProps) {
  // No fallback profile — popup only renders when caller supplies a row.
  if (!open || !influencer) return null;

  const profile = influencer;
  const subtitle = buildSubtitle(profile);

  // Build the section list dynamically — skip any block whose body is empty
  // so admins who fill only some fields don't see empty headings.
  const sections: { icon: string; label: string; text: string }[] = [
    {
      icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d89cf06f-f85b-4b4d-11dd-154999c05900/public",
      label: "Profile",
      text: profile.profile || "",
    },
    {
      icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ad276dcb-b7fc-47d8-3159-2f840c8a6600/public",
      label: "Content Focus",
      text: profile.contentFocus || "",
    },
    {
      icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a05d1e5a-c448-4d1e-d220-2473ac353800/public",
      label: "Visual Style",
      text: profile.visualStyle || "",
    },
    {
      icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0a1d17bb-710d-4c64-854b-1ea229300800/public",
      label: "Tone",
      text: profile.tone || "",
    },
    {
      icon: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c8997a96-4ea5-4fc3-721d-27dc95d6fe00/public",
      label: "Brand Fit",
      text: profile.brandFit || "",
    },
  ].filter((s) => s.text.trim().length > 0);

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto bg-[#F0F4F8]">
      {/* Back button */}
      <div className="sticky top-0 z-10 bg-[#F0F4F8] h-15 pt-[10px] pl-[10px]">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-[22px]  text-[#063746]"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          BACK
        </button>
      </div>

      <div className="px-5 pb-10">
        {/* Name + subtitle + tag */}
        <h1
          className="text-[36px] font-semibold leading-[1.1] text-[#063746]"
          style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
        >
          {profile.name}
        </h1>
        {subtitle && (
          <p className="mt-1 text-[18px] text-[#063746]" style={{ fontFamily: "var(--font-body)" }}>
            {subtitle}
          </p>
        )}
        {profile.industry && (
          <span className="mt-2 inline-block rounded-full bg-[#858CE3] px-3 py-1 text-[12px] font-semibold uppercase text-white">
            {profile.industry}
          </span>
        )}
        {/* Top Left Decorative Image */}
        <div className="pointer-events-none absolute -top-[5%] -left-[5%] z-[1]">
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/7ff79f69-0b0f-468c-4d84-9a41fba44200/public"
            alt=""
            width={800}
            height={800}
            className="h-auto w-[500px] object-cover opacity-30"
          />
        </div>

        {/* Portrait image */}
        {profile.image && (
          <div className="mt-4 w-full overflow-hidden" style={{ aspectRatio: "3/4", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
            <Image
              src={profile.image}
              alt={profile.name}
              width={400}
              height={533}
              unoptimized
              className="h-full w-full object-cover object-top"
            />
          </div>
        )}

        {/* Archetype + summary card — lavender. Drop the card entirely
            when both archetype and summary are blank, so admins who skip
            those fields don't get an empty rectangle. */}
        {(profile.archetype || profile.summary) && (
          <div className="rounded-2xl bg-[#858CE3] px-5 py-5 relative top-[-40px]">
            {profile.archetype && (
              <p
                className="text-[26px] font-medium leading-[1.2] text-white"
                style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
              >
                {profile.archetype}
              </p>
            )}
            {profile.summary && (
              <p className="mt-3 text-[18px] leading-[1.6] text-[#EBFFFF] whitespace-pre-line" style={{ fontFamily: "var(--font-body)" }}>
                {profile.summary}
              </p>
            )}
          </div>
        )}

        {/* Info sections */}
        {sections.length > 0 && (
          <div className="flex flex-col divide-y divide-[#063746]/10">
            {sections.map((sec) => (
              <div key={sec.label} className="py-4">
                <div className="flex items-center gap-2 mb-1">
                  <img src={sec.icon} alt={sec.label} className="h-6 w-6 object-contain" />
                  <span className="text-[20px]  text-[#151D85]" style={{ fontFamily: "var(--font-body)" }}>
                    {sec.label}
                  </span>
                </div>
                <p className="text-[16px] leading-[1.6] text-[#000008] whitespace-pre-line" style={{ fontFamily: "var(--font-body)" }}>
                  {sec.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA button */}
        <button
          className="mt-6 w-full rounded-full bg-dark-bg py-4 text-[18px] uppercase tracking-wide text-white"
          style={{ fontFamily: "var(--font-body)" }}
        >
          WORK WITH THIS INFLUENCER
        </button>
      </div>
    </div>
  );
}

export default function InfluencerPopUpPage() {
  return <InfluencerPopupModal open={false} onClose={() => { }} influencer={null} />;
}
