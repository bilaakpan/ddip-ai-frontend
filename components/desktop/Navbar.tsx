"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const navLinks = [
  { label: "Process", href: "/process" },
  { label: "Ai Solutions", href: "/ai-solutions", hasDropdown: true },
  { label: "Works", href: "/works", hasDropdown: true },
  { label: "The Mind Behind", href: "/the-mind-behind" },
  { label: "Insights", href: "/insights" },
];

const aiSolutionLinks = [
  { label: "AI Content Generation", href: "/ai-solutions/ai-content" },
  { label: "Create your influencer with AI", href: "/ai-solutions/ai-influencer" },
  { label: "AI Brand Ambassador Generation", href: "/ai-solutions/ai-influencer" },
  { label: "AI Mascot Generation", href: "/ai-solutions/ai-influencer" },
  { label: "AI Commercial Production", href: "/ai-solutions/ai-commercial" },
  { label: "Automated Workflow with AI Agents", href: "/ai-solutions/automation" },
  { label: "GEO for Websites", href: "/ai-solutions/geo" },
];

const megaMenuCards = [
  { title: "AI Content Generation",            href: "/ai-solutions/ai-content",    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ddb0a7cb-8270-467a-ce4c-12567bd51300/public" },
  { title: "Create Your Influencer with AI",   href: "/ai-solutions/ai-influencer", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/985616a3-ae36-4288-620a-126ca1bb6900/public" },
  { title: "AI Brand Ambassador Generation",   href: "/ai-solutions/ai-influencer", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bc414ede-e75d-4e65-273d-bc095b590a00/public" },
  { title: "AI Mascot Generation",             href: "/ai-solutions/ai-influencer", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/ddb0a7cb-8270-467a-ce4c-12567bd51300/public" },
  { title: "AI Commercial Production",         href: "/ai-solutions/ai-commercial", image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/985616a3-ae36-4288-620a-126ca1bb6900/public" },
  { title: "Automated Workflow with AI Agents",href: "/ai-solutions/automation",    image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/bc414ede-e75d-4e65-273d-bc095b590a00/public" },
  { title: "GEO for Websites",                 href: "/ai-solutions/geo",           image: "https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/f6ea4bd4-e07d-4c94-d687-482cf81c5e00/public" },
];

/**
 * Carousel for mega menu cards with Embla carousel library
 */
function MegaMenuCarousel({ cards }: { cards: { title: string; href: string; image: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scroll = (direction: "prev" | "next") => {
    if (!emblaApi) return;
    if (direction === "prev") {
      emblaApi.scrollPrev();
    } else {
      emblaApi.scrollNext();
    }
  };

  const scrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  return (
    <div className="relative flex flex-col gap-3">
      {/* Left arrow */}
      <button onClick={() => scroll("prev")} className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6L8 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>

      {/* Right arrow */}
      <button onClick={() => scroll("next")} className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 transition">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2L8 6L4 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>

      {/* Carousel container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {cards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              className="group relative flex-none w-full overflow-hidden rounded-[16px]"
              style={{ aspectRatio: "4/5", flexBasis: "33.333%" }}
            >
              <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="200px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="relative flex h-full flex-col justify-end p-3">
                <p className="text-[13px] font-medium leading-snug text-white" style={{ fontFamily: "SF Pro Display" }}>
                  {card.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-1">
        {cards.map((_, i) => (
          <button key={i} onClick={() => scrollTo(i)}
            className="rounded-full transition-all"
            style={{ width: i === selectedIndex ? "20px" : "6px", height: "6px", background: i === selectedIndex ? "#002834" : "rgba(255,255,255,0.3)" }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Desktop navigation bar matching Figma design:
 * - Fixed position at top
 * - Logo (ddip.AI) left, nav links center, CTA buttons right
 * - Dark background with blur backdrop
 * - AI Solutions mega-menu dropdown with links + image cards
 * - ~80px height
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimer = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (closeTimer[0]) clearTimeout(closeTimer[0]);
    setDropdownOpen(label);
  };

  const handleMouseLeave = () => {
    const t = setTimeout(() => setDropdownOpen(null), 200);
    closeTimer[1](t);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
    <nav
      className={cn(
        "fixed inset-x-0 top-[30px] z-50 mx-auto w-[calc(100%-40px)] max-w-[1490px] rounded-[58px] bg-[#545454]/80 shadow-[0px_4px_11.5px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-300 lg:w-[calc(100%-238px)] max-md:top-0 max-md:w-full max-md:max-w-none max-md:rounded-none max-md:bg-[#002834]/95",
        scrolled && "shadow-lg",
        mobileMenuOpen && "max-md:z-[1001]"
      )}
    >
      <div className="flex h-[79px] items-center justify-between gap-4 px-[30px] max-md:h-[60px] max-md:px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
          <Image
            src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1c4902c6-da41-4213-c084-5181a2316b00/public"
            alt="DDiP AI"
            width={90}
            height={32}
            className="h-8 w-auto max-md:h-7"
            priority
          />
        </Link>

        {/* Hamburger button — visible only on mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-[1001] hidden h-11 w-11 flex-col items-center justify-center gap-[5px] max-md:flex"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-[2px] w-5 bg-white transition-all duration-300 ${
              mobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>

        {/* Center Nav Links — hidden on mobile */}
        <div className="flex items-center gap-[20px] max-md:hidden xl:gap-[40px] shrink-0 w-[60%]">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasDropdown && handleMouseEnter(link.label)}
              onMouseLeave={() => link.hasDropdown && handleMouseLeave()}
            >
              <Link
                href={link.href}
                className="whitespace-nowrap font-heading text-[14px] font-medium leading-[1.2] text-white transition-colors hover:text-teal-500"
              >
                {link.label}
                {link.hasDropdown && (
                  <svg
                    className={cn(
                      "ml-1 inline-block h-3 w-3 transition-transform duration-200",
                      dropdownOpen === link.label && "rotate-180"
                    )}
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>

              {/* Mega Menu Dropdown — only for Ai Solutions */}
              {link.hasDropdown && link.label === "Ai Solutions" && dropdownOpen === link.label && (
                <div className="fixed left-1/2 -translate-x-1/2 pt-4" style={{ top: "70px", width: "100%", maxWidth: "1490px" }}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <div
                    className="w-full p-6 shadow-2xl backdrop-blur-xl"
                    style={{ background: "#424242", borderRadius: "40px" }}
                  >
                    <div className="grid grid-cols-[260px_1fr] gap-8 items-center">

                      {/* Left — text links */}
                      <div className="space-y-2">
                        {aiSolutionLinks.map((subLink) => (
                          <Link
                            key={subLink.label}
                            href={subLink.href}
                            className="block px-2 py-1.5 text-[15px] text-white transition-colors hover:text-[#1CE3F4]"
                       
                          >
                            {subLink.label}
                          </Link>
                        ))}
                      </div>

                      {/* Right — carousel */}
                      <MegaMenuCarousel cards={megaMenuCards} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Buttons — hidden on mobile */}
        <div className="flex items-center gap-[20px] max-md:hidden xl:gap-[40px] shrink-0">
          <Link
            href="/start-project"
            className="whitespace-nowrap font-body text-[14px] font-medium leading-[1.2] text-white transition-colors hover:text-teal-500"
          >
            Start a Project
          </Link>
          <Link
            href="/lets-connect"
            className="flex h-[50px] w-[167px] items-center justify-center gap-[14px] rounded-[56px] bg-white font-body text-[15px] font-medium leading-[1.2] text-[#063746] transition-colors hover:bg-white/90"
          >
            Let&apos;s Connect
            <svg
              width="7"
              height="12"
              viewBox="0 0 7 12"
              fill="none"
              className="ml-0.5"
            >
              <path
                d="M1 1L6 6L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>

    {/* Mobile menu overlay */}
    <div
      className={cn(
        "fixed inset-0 z-[1000] bg-[#002834] transition-transform duration-300 md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <nav className="flex h-full flex-col overflow-y-auto px-6 pt-[80px] pb-10">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="block border-b border-white/10 py-5 font-heading text-[22px] font-medium text-white"
            style={{ minHeight: "44px" }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/start-project"
          onClick={() => setMobileMenuOpen(false)}
          className="block border-b border-white/10 py-5 font-heading text-[22px] font-medium text-white"
          style={{ minHeight: "44px" }}
        >
          Start a Project
        </Link>
        <Link
          href="/lets-connect"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-8 flex h-[53px] items-center justify-center rounded-[56px] bg-white font-body text-[18px] font-medium text-[#063746]"
        >
          Let&apos;s Connect
        </Link>
      </nav>
    </div>
    </>
  );
}
