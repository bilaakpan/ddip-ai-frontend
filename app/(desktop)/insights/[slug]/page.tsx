// ArticleHero.tsx
// Next.js component with Tailwind CSS
// Replica of the blog article layout from the screenshot

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Insight {
    id: string;
    title: string;
    slug: string;
    category: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
    seoDescription: string;
    body: string;
    imageUrl: string;
}

// Articles grid is empty by default — to be wired to CMS API by dev.
// This page is currently a static stub showing a hardcoded article body.

export default function ArticleHero() {
    const gridArticles: Insight[] = [];

    const tocItems = [
        "Ask where AI can help in video creation",
        "How AI fits into modern video production pipelines (and how it doesn't)",
        "Where AI helps most: Speed, cost, scale",
        "5 questions to ask yourself to fit AI into your next video project",
        "How Superside blends AI speed with creative precision",
        "The future of video isn't AI vs. human. It's both.",
    ];
    return (
        <div className="min-h-screen bg-[#f0f4f0] font-sanspt-20 pt-24 pb-8 ">
            <div className="p-8 sm:p-12 md:p-16 lg:p-20 mx-auto w-full max-w-[1808px] px-[60px] max-md:px-5">

                {/* Date */}
                <p className="text-xl sm:text-2xl md:text-3xl text-[#063746] mb-4 sm:mb-6 tracking-wide">
                    December 8, 2025
                </p>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#0d2b3e] leading-tight max-w-sm sm:max-w-md">
                    Don&apos;t Ask if You Should Use AI in
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-[#0d2b3e] leading-tight max-w-sm sm:max-w-md mb-20 sm:mb-30">
                    Video Production–Ask Where
                </h1>
                <div className="flex flex-col sm:flex-row gap-8 ">
                    {/* Left Sidebar */}
                    <div className="flex flex-col gap-4 sm:gap-6 min-w-20 sm:min-w-24 pt-1">
                        <div className="mb-20">
                            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#063746] tracking-widest uppercase mb-1 sm:mb-2">
                                Posted On
                            </p>
                            <p className="text-xl sm:text-2xl md:text-3xl text-[#063746] sm:mb-4">10/28/25</p>
                        </div>

                        <div className="mb-20">
                            <p className="text-3xl font-semibold text-[#063746] tracking-widest uppercase mb-2">
                                Share Article
                            </p>
                            <div className="px-3 sm:px-4 flex gap-6 sm:gap-8 items-center">
                                {/* LinkedIn */}
                                <a href="#" className="text-[#000000] hover:text-[#0d2b3e] transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4 0 4.75 2.64 4.75 6.07V24h-4v-8.57c0-2.04-.04-4.67-2.85-4.67-2.86 0-3.3 2.23-3.3 4.53V24h-4V8.5z" />
                                    </svg>
                                </a>
                                {/* Twitter/X */}
                                <a href="#" className="text-[#000000] hover:text-[#0d2b3e] transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                {/* Facebook */}
                                <a href="#" className="text-[#000000] hover:text-[#0d2b3e] transition-colors">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="mt-4">
                            <a
                                href="#"
                                className="text-xl sm:text-2xl underline font-semibold text-[#0d2b3e] tracking-widest uppercase hover:underline flex items-center gap-1 sm:gap-2"
                            >
                                All Articles <span>→</span>
                            </a>
                        </div>
                    </div>

                    {/* Right: Overlapping Image Cards */}
                    <div className="relative flex-1">
                        {/* Center main card */}
                        <div className="relative w-full h-80 sm:h-100 md:h-125 lg:h-150">
                            <Image
                                src="https://imagedelivery.net/TXnAFTBLPOOUP0nsDyzgiQ/1e7ed0aa-8ba6-46a9-be56-63b28c581100/public"
                                alt="Insights 1"
                                fill
                                className="object-cover"
                                sizes="100vw"
                                priority
                            />
                        </div>

                        <div className="p-4 sm:p-8 md:p-12 lg:pr-20 mx-auto w-full max-w-[1608px] px-[60px] max-md:px-5">
                            {/* Intro paragraph - bold/lead */}
                            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#000000] leading-relaxed mb-4 sm:mb-6">
                                AI video tools have reached enterprise quality. Yet, many teams still don&apos;t
                                quite know how and where to fit AI into their video production workflows.
                                This guide, packed with expert insights, covers the good, the bad and the
                                how-to of hybrid human–AI video workflows to help you create top-quality videos fast.
                            </p>

                            {/* Body paragraphs */}
                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed mb-3 sm:mb-4 md:mb-5">
                                The smartest brands no longer ask whether to use AI in video production. They pinpoint where it fits,
                                what it accelerates and when it truly adds creative value.
                            </p>

                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed mb-3 sm:mb-4 md:mb-5">
                                This shift from &quot;if&quot; to &quot;where&quot; marks a fundamental change for enterprise creative teams. AI video
                                tools have exploded in quality and accessibility. But while the tech barrier has been lowered, the
                                strategic questions have become more complex.
                            </p>

                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed mb-3 sm:mb-4 md:mb-5">
                                Most enterprise marketing leaders find themselves caught between two extremes. The hype that
                                promises AI will replace entire production teams, and the skepticism that dismisses the tech as
                                expensive experimentation. The reality sits somewhere in between, and is far more nuanced than
                                either camp suggests.
                            </p>

                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed mb-3 sm:mb-4 md:mb-5">
                                Here at Ddip.ai, we&apos;ve seen firsthand how AI can reduce timelines from weeks to days, generate
                                countless variations from a single concept, and make previously unaffordable creative styles
                                accessible.
                                <br />
                                But we also recognize that video production requires a delicate balance of technical capability and
                                human creative direction to effectively serve business goals.
                            </p>

                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed mb-3 sm:mb-4 md:mb-5">
                                If you&apos;re in search of a strategic AI video framework, and not just another &quot;AI tools roundup&quot; or &quot;top
                                10 video hacks&quot; article, you&apos;ve landed where you need to be.
                            </p>

                            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-black leading-relaxed">
                                This guide is for creative operations directors, brand managers and video strategy leads who need to
                                make informed decisions about where AI belongs in their creative pipeline, with insights from Manuel
                                Berbin, Generative AI Researcher &amp; Creative at Ddip.ai.
                            </p>





                            <div className="border-l-2 border-black pl-4 sm:pl-6 md:pl-8">
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#9F9F9F] tracking-widest uppercase mb-2 sm:mb-3 md:mb-4 mt-6 sm:mt-8 md:mt-12 lg:mt-18">
                                    In This Article
                                </p>
                                <ul className="flex flex-col gap-2 sm:gap-3">
                                    {tocItems.map((item, i) => (
                                        <li key={i}>
                                            <a
                                                href="#"
                                                className="text-xs sm:text-sm md:text-base lg:text-lg text-[#000000] leading-snug hover:underline block"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>

                            </div>



                            {/* Section heading */}
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#000000] leading-tight mb-3 sm:mb-4 md:mb-5 mt-6 sm:mt-8">
                                Ask where AI can help in video production
                            </h2>

                            {/* Body paragraphs */}
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                The biggest misconception about AI usage in video production is that it&apos;s a binary, all-or-nothing
                                decision: Either the entire video is AI-generated, or none of it is.
                                <br />
                                The truth is that almost all successful AI video workflows are hybrid by design.
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                For Berbin and other Superside creatives, the secret to AI-assisted video production lies in a key
                                mental shift: &quot;Don&apos;t ask &apos;should we use AI?&apos; Ask, &apos;how can we AI in our next video campaign or
                                project?&apos;&quot;
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-2 sm:mb-3">
                                From here, some practical questions should follow:
                            </p>

                            <ul className="mb-3 sm:mb-4 flex flex-col gap-1 sm:gap-2 pl-1">
                                {[
                                    "Could AI speed up our storyboarding phase?",
                                    "AI helps us explore visual options before commitment to a direction?",
                                    "Can AI generate the background assets we need without the headaches associated with stock footage?",
                                ].map((q, i) => (
                                    <li key={i} className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-black leading-relaxed flex gap-2">
                                        <span className="mt-1 sm:mt-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-400 shrink-0" />
                                        {q}
                                    </li>
                                ))}
                            </ul>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                These questions help enterprise teams identify specific production bottlenecks where AI can provide
                                measurable value: faster turnaround times and iterations, more creative options and reduced costs.
                                Ultimately, however, human creatives must remain at the helm and in control of strategic decisions to
                                ensure the best creative results.
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                AI can, for example, help you build a never-sunset of highly stylized visuals that set the tone for a
                                brand awareness campaign. But it&apos;s unlikely to be the right fit for customer testimonial videos that
                                rely on genuine facial expressions and unscripted human dialogue. You can also use AI to quickly
                                generate assets for social media campaigns, but choose to still use cleaner, professional video
                                production methods for flagship brand videos.
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed">
                                The shift from a binary mindset to modular assessment is where Superside&apos;s expertise becomes
                                critical. If you make an AI evaluation of your in-house creative team, we&apos;ll help you identify steps in
                                your video production process where AI could assist, match the right AI tools to specific tasks, and
                                ultimately integrate AI-powered elements into polished creative assets that&apos;ll help you deliver on
                                your marketing and business goals.
                            </p>

                            <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 relative w-full h-[500px]">
                                <Image src="/images/insights/article3.svg"
                                    alt="insights-01"
                                    fill
                                    className="rounded-sm object-cover" />
                            </div>

                            {/* Section Heading */}
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6 mt-6 sm:mt-8 md:mt-12 lg:mt-16 xl:mt-22">
                                How AI fits into modern video production pipelines (and how it doesn&apos;t)
                            </h2>

                            {/* Intro */}
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                When you see video production as a chain of connected parts, it&apos;s easier to identify the best tasks for
                                AI and the ones that need human creativity. Let&apos;s take a closer look at what to consider.
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                For Berbin and other Superside creatives, the secret to AI-assisted video production lies in a key
                                mindset shift: &quot;Don&apos;t ask &apos;should we use AI?&apos; Ask, &apos;how can we use AI in our next video campaign or
                                project?&apos;&quot;
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-2 sm:mb-3">
                                From here, more precise questions should follow:
                            </p>

                            {/* Inline list (no bullets, just line breaks like screenshot) */}
                            <div className="mb-3 sm:mb-4 flex flex-col gap-1 sm:gap-2">
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed">
                                    Could AI speed up our storyboarding phase?
                                </p>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed">
                                    Can AI help us explore visual styles before we commit to a direction?
                                </p>
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed">
                                    Can AI generate the background assets we need without the headaches associated with stock
                                    licensing?
                                </p>
                            </div>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                These questions help enterprise teams identify specific production bottlenecks where AI can provide
                                measurable value, such as faster turnaround times, more creative options and reduced costs.
                                Ultimately, however, human creatives must remain at the helm and in control of strategic decisions to
                                ensure the best creative results.
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed mb-3 sm:mb-4">
                                AI can, for example, help your team create surreal or highly stylized visuals that set the tone for a
                                brand awareness campaign. But it&apos;s unlikely to be the right fit for customer testimonial videos that
                                rely on genuine facial expressions and unscripted human dialogue. You can also use AI to quickly
                                generate assets for social media cutdowns, but choose to still use classic, professional video
                                production methods for flagship brand videos.
                            </p>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-black leading-relaxed">
                                The shift from a binary mindset to modular assessment is where Superside&apos;s expertise becomes
                                crucial. If you make us an extension of your in-house creative team, we&apos;ll help you identify stages in
                                your video production process where AI could assist, match the right AI tools to specific tasks, and
                                ultimately integrate AI-generated elements into polished creative assets that&apos;ll help you deliver on
                                your marketing and business goals.
                            </p>

                        </div>


                    </div>

                </div>

            </div>
            <div className="px-[60px] mt-16">
                <div className="flex items-center justify-between mb-12">
                    <p className="text-[#063746] font-medium text-7xl uppercase">Related Articles</p>
                    <Link
                        href="/insights"
                        className="font-medium text-3xl text-[#063746] underline underline-offset-4 transition-colors hover:text-[#1CE3F4]"
                    >
                        All Articles →
                    </Link>
                </div>

                {/* Article Grid — 3 columns */}
                {gridArticles.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        {gridArticles.map((article) => (
                            <Link
                                key={article.id}
                                href={`/insights/${article.slug}`}
                                className="group"
                            >
                                <article className="overflow-hidden bg-transparent">
                                    {/* Image */}
                                    <div className="relative aspect-4/3 overflow-hidden rounded-md">
                                        {article.imageUrl ? (
                                            <Image
                                                src={article.imageUrl}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-linear-to-br from-dark-bg/30 to-[#063746]/50" />
                                        )}
                                        {article.category && (
                                            <div className="absolute left-4 top-4">
                                                <span className={cn(
                                                    "rounded-full px-2 py-1 text-sm font-medium text-black backdrop-blur-sm",
                                                    (article.category === "Food" || article.category === "Healthcare" || article.category === "Education" || article.category === "Wellness")
                                                        ? "bg-[#D7DBC0]/90"
                                                        : "bg-[#DBC0CD]/90"
                                                )}>
                                                    {article.category}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {/* Card Body */}
                                    <div className="mt-4 px-1">
                                        <h3 className="font-heading text-2xl font-medium leading-snug text-[#063746] capitalize">
                                            {article.seoDescription}
                                        </h3>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}