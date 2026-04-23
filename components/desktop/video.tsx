"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import Hls from "hls.js";

const CLOUDFLARE_STREAM_BASE = "https://customer-avhhoygwtxxdpkyp.cloudflarestream.com";

interface HlsPlayerProps {
    src: string;
    className?: string;
    autoPlay?: boolean;
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
    fillHeight?: boolean;
    fillWidth?: boolean;
    hoverToPlay?: boolean;
}

const HlsPlayer = forwardRef<HTMLVideoElement, HlsPlayerProps>(({
    src,
    className = "",
    autoPlay = false,
    controls = true,
    muted = true,
    loop = false,
    fillHeight = true,
    fillWidth = true,
    hoverToPlay = true,
}, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldFillHeight, setShouldFillHeight] = useState(false);
    const [shouldFillWidth, setShouldFillWidth] = useState(false);

    const fullSrc = src.startsWith("https")
        ? src
        : `${CLOUDFLARE_STREAM_BASE}/${src}/manifest/video.m3u8`;

    useEffect(() => {
        if (!videoRef.current || !fullSrc) return;

        let hls: Hls | undefined;

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(fullSrc);
            hls.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            videoRef.current.src = fullSrc;
        }

        return () => {
            if (hls) hls.destroy();
        };
    }, [fullSrc]);

    // Forward ref to the video element
    useEffect(() => {
        if (ref && videoRef.current) {
            if (typeof ref === 'function') {
                ref(videoRef.current);
            } else {
                ref.current = videoRef.current;
            }
        }
    }, [ref]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkAndApplySize = () => {
            const parentElement = video.parentElement;
            if (!parentElement) return;

            setTimeout(() => {
                const videoHeight = video.videoHeight;
                const videoWidth = video.videoWidth;
                const parentHeight = parentElement.clientHeight;
                const parentWidth = parentElement.clientWidth;

                setShouldFillHeight(fillHeight && videoHeight > 0 && videoHeight > parentHeight);
                setShouldFillWidth(fillWidth && videoWidth > 0 && videoWidth > parentWidth);
            }, 100);
        };

        video.addEventListener("loadedmetadata", checkAndApplySize);
        video.addEventListener("play", checkAndApplySize);

        return () => {
            video.removeEventListener("loadedmetadata", checkAndApplySize);
            video.removeEventListener("play", checkAndApplySize);
        };
    }, [fillHeight, fillWidth]);

    // Hover-to-play: listen on the nearest positioned parent so overlays don't block
    useEffect(() => {
        if (!hoverToPlay) return;

        // Walk up to find the closest relative/absolute/fixed parent to attach hover
        const container = containerRef.current?.closest<HTMLElement>(
            "[class*='relative'], [class*='overflow-hidden'], [class*='group']"
        ) ?? containerRef.current;

        if (!container) return;

        const onEnter = () => videoRef.current?.play().catch(() => {});
        const onLeave = () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        };

        container.addEventListener("mouseenter", onEnter);
        container.addEventListener("mouseleave", onLeave);

        return () => {
            container.removeEventListener("mouseenter", onEnter);
            container.removeEventListener("mouseleave", onLeave);
        };
    }, [hoverToPlay]);

    return (
        <div ref={containerRef}>
            <video
                ref={videoRef}
                className={`
${shouldFillHeight ? "h-full" : ""}
${shouldFillWidth ? "w-full" : ""}
${className}`}
                autoPlay={autoPlay}
                controls={controls}
                muted={muted}
                loop={loop}
                playsInline
            />
        </div>
    );
});

HlsPlayer.displayName = "HlsPlayer";

export default HlsPlayer;
