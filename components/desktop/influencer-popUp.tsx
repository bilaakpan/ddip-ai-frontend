"use client";
import Image from "next/image";

/**
 * Shape consumed by the popup. Every field beyond the basics is optional —
 * empty values cause the corresponding row/section to be skipped rather
 * than rendering a hardcoded placeholder. Keep the surface aligned with
 * the Prisma `Influencer` model.
 */
export type PopupInfluencer = {
    name: string;
    archetype: string;       // From Influencer.persona
    industry: string;        // From Influencer.category — used as the badge in the corner
    image: string;
    country?: string;        // ISO code or full name; used for the flag elsewhere
    title?: string;          // From Influencer.title — e.g. "Coach", "Mascot"
    age?: number;            // From Influencer.age — paired with title in the subtitle
    summary?: string;        // From Influencer.summary — body paragraph below the name
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

/**
 * Subtitle rendered just under the name. Joins `title` and `age` with " | "
 * but only when both are present, so admins who fill only one don't see a
 * dangling separator. Returns null when nothing is set so the caller can
 * skip the line entirely.
 */
function buildSubtitle(profile: PopupInfluencer): string | null {
    const parts: string[] = [];
    if (profile.title) parts.push(profile.title);
    if (profile.age != null) parts.push(String(profile.age));
    return parts.length > 0 ? parts.join(" | ") : null;
}

/** Skip a section block entirely when its body field is empty/missing. */
function Section({
    iconUrl,
    label,
    body,
    bordered = false,
    fullWidth = false,
}: {
    iconUrl: string;
    label: string;
    body?: string;
    bordered?: boolean;
    fullWidth?: boolean;
}) {
    if (!body) return null;
    return (
        <div className={`${bordered ? "border-t border-[#FFFFFFCC] w-[971px] pt-3" : ""} ${fullWidth ? "sm:col-span-2" : ""}`}>
            <h3 className="flex items-center gap-2 text-base sm:text-lg text-[32px] font-regular text-[#151D85]">
                <img src={iconUrl} alt={`${label} icon`} className="h-5 w-5 object-contain" />
                {label}
            </h3>
            <p className="text-[22px] sm:text-base mt-1 whitespace-pre-line">{body}</p>
        </div>
    );
}

export function InfluencerPopupModal({
    open,
    onClose,
    influencer,
}: InfluencerPopupModalProps) {
    // Don't render when closed OR when the caller hasn't supplied an
    // influencer — the popup is meaningless without data, and showing
    // a hardcoded "fake" example was the original bug.
    if (!open || !influencer) return null;

    const profile = influencer;
    const subtitle = buildSubtitle(profile);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 mt-20"
            onClick={onClose}
        >
            <div
                className="relative w-full backdrop-blur-md max-w-[1100px] overflow-hidden rounded-2xl bg-[#FAFBFFCC] opacity-100 "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Subtle corner tint like reference */}
                <div className="pointer-events-none absolute -left-[10%] -top-[14%] z-[1] h-[240px] w-[240px] rounded-full bg-[#858CE3] opacity-20 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-[10%] -right-[8%] z-[1] h-[260px] w-[260px] rounded-full bg-[#858CE3] opacity-20 blur-[100px]" />

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

                {/* Popup-level bottom glow image */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]">
                    <Image
                        src="/https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/8c6dfd82-c580-49a7-be40-a53090c65400/public"
                        alt=""
                        width={10883}
                        height={500}
                        className="h-auto w-full object-cover object-bottom opacity-95"
                    />
                </div>
                {/* ✅ Responsive Layout */}
                <div className="relative z-[2] grid grid-cols-1 md:grid-cols-[40%_60%] overflow-hidden" style={{ height: "750px", width: "100%" }}>
                    {/* LEFT IMAGE */}
                    <div className="relative  w-full overflow-hidden">
                        <div className="absolute -left-[32%] bottom-[5%] h-[100%] w-[700px]">
                            {profile.image && (
                                <Image
                                    src={profile.image}
                                    alt={profile.name}
                                    fill
                                    priority
                                    className="object-cover z-2"
                                />
                            )}
                        </div>
                        {/* IMAGE */}
                        <div className="absolute inset-0">
                            <Image
                                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a851a6fa-901f-4861-0e8e-465d120cb700/public"
                                alt=""
                                fill
                                priority
                                className="pointer-events-none z-[2] object-cover object-bottom opacity-95"
                            />
                        </div>
                        {/* TEXT */}
                        {profile.archetype && (
                            <p className="absolute bottom-[125px] left-4 sm:bottom-6 sm:left-6 text-[#FFFFFF] text-[26px] w-[200px] font-medium leading-[1.2] z-10"
                                style={{ fontFamily: "Bricolage Grotesque" }}
                            >
                                {profile.archetype}
                            </p>
                        )}
                    </div>
                    {/* RIGHT CONTENT */}
                    <div
                        className="h-full overflow-y-auto p-10 text-[#0A2B3A]"
                        style={{ scrollbarWidth: "none" }}
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            {/* LEFT: Name + Subtitle */}
                            <div>
                                <h2 className="text-[clamp(24px,5vw,48px)] text-[64px] font-semibold leading-tight"
                                    style={{ fontFamily: "Bricolage Grotesque" }}
                                >
                                    {profile.name}
                                </h2>
                                {subtitle && (
                                    <p className="text-[26px] text-[#002834]">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                            {/* RIGHT SIDE */}
                            <div className="flex items-center gap-3">
                                {/* Industry Tag */}
                                {profile.industry && (
                                    <span className="rounded-full bg-[#858CE3] font-medium px-4 py-1 text-xs sm:text-sm uppercase text-white whitespace-nowrap">
                                        {profile.industry}
                                    </span>
                                )}
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="h-8 w-8 flex items-center justify-center rounded-full bg-[#000000CC] text-[#FFFFFF] font-bold shrink-0"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        {/* Description — only render the bubble when there's a summary to show */}
                        {profile.summary && (
                            <div className="mt-4 rounded-lg bg-[#FFFFFF96] border border-[#FFFFFF] border-radius-[16px] p-4 text-[clamp(14px,3vw,18px)] leading-relaxed whitespace-pre-line">
                                {profile.summary}
                            </div>
                        )}
                        {/* GRID INFO — every Section component is no-op when its field is empty */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#000008] text-[22px]">
                            <Section
                                iconUrl="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/d89cf06f-f85b-4b4d-11dd-154999c05900/public"
                                label="Profile"
                                body={profile.profile}
                            />
                            <Section
                                iconUrl="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ad276dcb-b7fc-47d8-3159-2f840c8a6600/public"
                                label="Content Focus"
                                body={profile.contentFocus}
                            />
                            <Section
                                iconUrl="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/a05d1e5a-c448-4d1e-d220-2473ac353800/public"
                                label="Visual Style"
                                body={profile.visualStyle}
                                bordered
                            />
                            <Section
                                iconUrl="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/0a1d17bb-710d-4c64-854b-1ea229300800/public"
                                label="Tone"
                                body={profile.tone}
                            />
                            <Section
                                iconUrl="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/c8997a96-4ea5-4fc3-721d-27dc95d6fe00/public"
                                label="Brand Fit"
                                body={profile.brandFit}
                                bordered
                                fullWidth
                            />
                        </div>
                        {/* CTA */}
                        <div className="pt-[22px] pr-[50px] pb-[22px] relative">
                            {/* Decorative image near button */}
                            <div className="pointer-events-none absolute -bottom-[74px] -right-[40px] z-0">
                                <Image
                                    src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/f3c1407f-7e5d-4db8-f722-a2b27e2f6700/public"
                                    alt=""
                                    width={300}
                                    height={200}
                                    className="h-auto w-[500px] object-cover opacity-40"
                                />
                            </div>
                            <button className="mt-6 w-full sm:w-auto rounded-full bg-[#002834] px-6 py-3 text-[22px] sm:text-base text-[#FFFFFF] hover:opacity-90 relative z-10">
                                WORK WITH THIS INFLUENCER
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function InfluencerPopUpPage() {
    // Stub for the route-level component — popup only opens via parent state.
    return <InfluencerPopupModal open={false} onClose={() => { }} influencer={null} />;
}
