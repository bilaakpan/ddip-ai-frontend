"use client";

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Detects whether the current device is mobile based on viewport width
 * and user agent string. Used for desktop/mobile route group switching.
 *
 * Returns `null` during SSR (before hydration) to prevent layout shift.
 */
export function useDeviceType(): "desktop" | "mobile" | null {
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | null>(
    null
  );

  useEffect(() => {
    const checkDevice = () => {
      const isMobileWidth = window.innerWidth < MOBILE_BREAKPOINT;
      const isMobileUA = /Mobile|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );
      setDeviceType(isMobileWidth || isMobileUA ? "mobile" : "desktop");
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return deviceType;
}

/**
 * Simple boolean hook for mobile detection.
 */
export function useIsMobile(): boolean | null {
  const deviceType = useDeviceType();
  if (deviceType === null) return null;
  return deviceType === "mobile";
}
