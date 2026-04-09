"use client";

import { useEffect, useRef, useState } from "react";
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
}

export default function HlsPlayer({
    src,
    className = "",
    autoPlay = true,
    controls = true,
    muted = true,
    loop = false,
    fillHeight = true,
    fillWidth = true
}: HlsPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldFillHeight, setShouldFillHeight] = useState(false);
    const [shouldFillWidth, setShouldFillWidth] = useState(false);
    // Construct full URL if only ID is passed
    const fullSrc = src.startsWith("https")
        ? src
        : `${CLOUDFLARE_STREAM_BASE}/${src}/manifest/video.m3u8`;

    useEffect(() => {
        if (!videoRef.current || !fullSrc) return;

        let hls: Hls | undefined;

        // Check if browser supports HLS.js
        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(fullSrc);
            hls.attachMedia(videoRef.current);
        }
        // Native HLS support (Safari)
        else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
            videoRef.current.src = fullSrc;
        }

        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [fullSrc]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkAndApplySize = () => {
            const videoElement = video;
            const parentElement = videoElement.parentElement;

            if (!parentElement) return;

            setTimeout(() => {
                const videoHeight = videoElement.videoHeight;
                const videoWidth = videoElement.videoWidth;

                const parentHeight = parentElement.clientHeight;
                const parentWidth = parentElement.clientWidth;

                // HEIGHT LOGIC
                if (fillHeight && videoHeight > 0 && videoHeight > parentHeight) {
                    setShouldFillHeight(true);
                } else {
                    setShouldFillHeight(false);
                }

                // WIDTH LOGIC :point_down:
                if (fillWidth && videoWidth > 0 && videoWidth > parentWidth) {
                    setShouldFillWidth(true);
                } else {
                    setShouldFillWidth(false);
                }

            }, 100);
        };

        video.addEventListener('loadedmetadata', checkAndApplySize);
        video.addEventListener('play', checkAndApplySize);

        return () => {
            video.removeEventListener('loadedmetadata', checkAndApplySize);
            video.removeEventListener('play', checkAndApplySize);
        };
    }, [fillHeight, fillWidth]);

    return (
        <video
            ref={videoRef}
            className={`
${shouldFillHeight ? 'h-full' : ''}
${shouldFillWidth ? 'w-full' : ''}
${className}`}
            autoPlay={autoPlay}
            controls={controls}
            muted={muted}
            loop={loop}
            playsInline
        />
    );
}