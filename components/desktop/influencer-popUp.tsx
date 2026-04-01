
"use client";
import Image from "next/image";
export type PopupInfluencer = {
    name: string;
    archetype: string;
    industry: string;
    image: string;
    country?: string;
};
type InfluencerPopupModalProps = {
    open: boolean;
    onClose: () => void;
    influencer?: PopupInfluencer | null;
};
export function InfluencerPopupModal({
    open,
    onClose,
    influencer,
}: InfluencerPopupModalProps) {
    if (!open) return null;
    const fallback: PopupInfluencer = {
        name: "Hana Al Sabah",
        archetype: "Gentle Routine Architect",
        industry: "Wellness",
        image: "/images/homepage/influencer-08.png",
        country: "Kuwait",
    };
    const profile = influencer ?? fallback;
    const countryText = profile.country || "Global";
    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
            onClick={onClose}
        >
            <div
                className="relative w-full backdrop-blur-md max-w-[1100px] overflow-hidden rounded-2xl bg-[#FAFBFFCC] opacity-100 "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Subtle corner tint like reference */}
                <div className="pointer-events-none absolute -left-[10%] -top-[14%] z-[1] h-[240px] w-[240px] rounded-full bg-[#858CE3] opacity-20 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-[10%] -right-[8%] z-[1] h-[260px] w-[260px] rounded-full bg-[#858CE3] opacity-20 blur-[100px]" />
                {/* Popup-level bottom glow image */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1]">
                    <Image
                        src="/images/homepage/image.png"
                        alt=""
                        width={10883}
                        height={500}
                        className="h-auto w-full object-cover object-bottom opacity-95"
                    />
                </div>
                {/* ✅ Responsive Layout */}
                <div className="relative z-[2] grid grid-cols-1 md:grid-cols-[40%_60%]" style={{height:"550px",overflow:"scroll",scrollbarWidth:"none"}}>
                    {/* LEFT IMAGE */}
                    <div className="relative  w-full overflow-hidden">
                        <div className="absolute -left-[32%] top-[5%] h-[80%] w-[630px]">
                            <Image
                                src="/images/homepage/popUp.png"
                                alt={profile.name}
                                fill
                                priority
                                className="object-cover z-2"
                            />
                        </div>
                        {/* IMAGE */}
                        <Image
                            src="/images/homepage/image.png"
                            alt=""
                            fill
                            priority
                            className="pointer-events-none z-[2] object-cover object-bottom opacity-95"
                        />
                        {/* Glow effect comes from popup-level image */}
                        {/* TEXT */}
                        <p className="absolute bottom-[125px] left-4 sm:bottom-6 sm:left-6 text-[#FFFFFF] text-[26px] w-[200px] font-medium leading-[1.2] z-10"
                            style={{ fontFamily: "Bricolage Grotesque" }}
                        >
                            {profile.archetype}
                        </p>
                    </div>
                    {/* RIGHT CONTENT */}
                    <div className="pr-10 pt-10 pb-10 text-[#0A2B3A]">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            {/* LEFT: Name + Subtitle */}
                            <div>
                                <h2 className="text-[clamp(24px,5vw,48px)] text-[64px] font-semibold leading-tight"
                                    style={{ fontFamily: "Bricolage Grotesque" }}
                                >
                                    {profile.name}
                                </h2>
                                <p className="text-[clamp(14px,3vw,22px)] text-[#002834]"
                                    style={{ fontFamily: "SF Pro Display" }}
                                >
                                    {profile.industry} Coach | {countryText}
                                </p>
                            </div>
                            {/* RIGHT SIDE */}
                            <div className="flex items-center gap-3">
                                {/* Industry Tag */}
                                <span className="rounded-full bg-[#858CE3] font-medium px-4 py-1 text-xs sm:text-sm uppercase text-white whitespace-nowrap"
                                    style={{ fontFamily: "SF Pro Display" }}
                                >
                                    {profile.industry}
                                </span>
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="h-10 w-10 flex items-center justify-center rounded-full bg-[#000000CC] text-[#FFFFFF] font-bold shrink-0"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        {/* Description */}
                        <div className="mt-4 rounded-lg bg-[#FFFFFF96] border border-[#FFFFFF] border-radius-[16px] p-4 text-[clamp(14px,3vw,18px)] leading-relaxed">
                            {profile.name} is a {countryText}-based {profile.industry.toLowerCase()} creator focused on practical habits and calm routines that support modern professional life.
                        </div>
                        {/* GRID INFO */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#000008] text-[22px]"
                            style={{ fontFamily: "SF Pro Display" }}
                        >
                            <div>
                                <h3 className="flex items-center gap-2 text-base sm:text-lg text-[32px] font-regular text-[#151D85]">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="8" r="4" />
                                        <path d="M4 20c1.8-3.5 4.7-5 8-5s6.2 1.5 8 5" />
                                    </svg>
                                    Profile
                                </h3>
                                <p className="text-sm sm:text-base mt-1">
                                    Builds calm through tiny daily rituals—tea, gratitude, and sunset walks. Shares gentle routines that help overwhelmed professionals reset without pressure.
                                </p>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 text-base text-[32px] sm:text-lg font-regular text-[#151D85]">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 7l8-4 8 4-8 4-8-4z" />
                                        <path d="M4 12l8 4 8-4" />
                                        <path d="M4 17l8 4 8-4" />
                                    </svg>
                                    Content Focus
                                </h3>
                                <p className="text-sm sm:text-base mt-1">
                                    Micro-habits · Soft resets
                                    Self-compassion · Slow living
                                </p>
                            </div>
                            <div className="border-t border-[#FFFFFFCC] w-[971px] pt-3" >
                                <h3 className="flex items-center gap-2 text-base text-[32px] sm:text-lg font-regular text-[#151D85]">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="5" width="18" height="14" rx="2" />
                                        <circle cx="9" cy="10" r="2" />
                                        <path d="M21 15l-5-5-6 6-2-2-5 5" />
                                    </svg>
                                    Visual Style
                                </h3>
                                <p className="text-sm sm:text-base mt-1">
                                    Warm neutrals · Natural light
                                    Ritual close-ups · Cozy minimal spaces
                                </p>
                            </div>
                            <div>
                                <h3 className="flex items-center gap-2 text-base text-[32px] sm:text-lg font-regular text-[#151D85]">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 12h3l2-6 4 12 2-6h7" />
                                    </svg>
                                    Tone
                                </h3>
                                <p className="text-sm sm:text-base mt-1">
                                    Soft · Calm
                                    Nurturing · Reassuring
                                </p>
                            </div>
                            <div className="sm:col-span-2 border-t border-[#FFFFFFCC] w-[971px] pt-3">
                                <h3 className="flex items-center gap-2 text-base text-[32px] sm:text-lg font-regular text-[#151D85]">
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9L12 3z" />
                                    </svg>
                                    Brand Fit
                                </h3>
                                <p className="text-sm sm:text-base mt-1 mr-20">
                                    Wellness · Mental health · Habit tools
                                    · Morning routines
                                </p>
                            </div>
                        </div>
                        {/* CTA */}
                        <div className="pt-[22px] pr-[50px] pb-[22px] pl-[50px]">
                            <button className="mt-6 w-full sm:w-auto rounded-full bg-[#002834] px-6 py-3 text-sm sm:text-base text-[#FFFFFF] hover:opacity-90">
                                WORK WITH THIS INFLUENCER
                            </button>
                        </div>
                    </div>
                </div>
                {/* CLOSE BUTTON */}
            </div>
        </div>
    );
}
export default function InfluencerPopUpPage() {
    return (
        <InfluencerPopupModal open={true} onClose={() => { }} influencer={null} />
    );
}