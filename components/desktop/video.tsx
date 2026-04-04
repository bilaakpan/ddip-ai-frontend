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
}

export default function HlsPlayer({
    src,
    className = "",
    autoPlay = true,
    controls = true,
    muted = true,
    loop = false,
    fillHeight = true,
}: HlsPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [shouldFillHeight, setShouldFillHeight] = useState(false);

    // Construct full URL if only ID is passed
    const fullSrc = src.startsWith("https")
        ? src
        : `${CLOUDFLARE_STREAM_BASE}/${src}/manifest/video.m3u8`;
console.log("fullSrc",fullSrc,"src",src)
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
        if (!video || !fillHeight) return;

        const checkAndApplyHeight = () => {
            const videoElement = video;
            const parentElement = videoElement.parentElement;

            if (!parentElement) {
                console.log('NO PARENT ELEMENT');
                return;
            }

            // Wait for video to be rendered and get actual dimensions
            setTimeout(() => {
                const videoNaturalHeight = videoElement.videoHeight;
                const parentHeight = parentElement.clientHeight;

                console.log('=== VIDEO HEIGHT CHECK ===');
                console.log('Video natural height:', videoNaturalHeight);
                console.log('Parent container height:', parentHeight);

                // If video natural height is GREATER than parent container, stretch it with h-full
                if (videoNaturalHeight > 0 && videoNaturalHeight > parentHeight) {
                    console.log('✅ CONDITION TRUE: Applying h-full (video is taller)');
                    setShouldFillHeight(true);
                } else {
                    console.log('❌ CONDITION FALSE: Not applying h-full (video fits or shorter)');
                    setShouldFillHeight(false);
                }
            }, 100);
        };

        console.log('Setting up height check listeners...');
        video.addEventListener('loadedmetadata', checkAndApplyHeight);
        video.addEventListener('play', checkAndApplyHeight);

        return () => {
            video.removeEventListener('loadedmetadata', checkAndApplyHeight);
            video.removeEventListener('play', checkAndApplyHeight);
        };
    }, [fillHeight]);

    return (
        <video
            ref={videoRef}
            className={`w-full ${shouldFillHeight ? 'h-full' : ''}  ${className}`}
            autoPlay={autoPlay}
            controls={controls}
            muted={muted}
            loop={loop}
            playsInline
        />
    );
}