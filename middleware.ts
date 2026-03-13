import { NextRequest, NextResponse } from "next/server";

/**
 * Device-based routing middleware.
 *
 * Mobile user-agents are internally rewritten to /m/… paths which
 * resolve to app/m/ pages. The user always sees clean URLs (no /m/ prefix).
 *
 * Desktop traffic goes to app/(desktop)/ route group as normal.
 *
 * A cookie `device-override` lets users manually switch between views.
 */

const MOBILE_UA =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;

/** Paths that should NOT be rewritten */
const BYPASS_PREFIXES = [
  "/api",
  "/_next",
  "/images",
  "/videos",
  "/favicon",
  "/admin",
  "/m/", // Already a mobile route — don't double-rewrite
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, API routes, admin panel, already-mobile routes
  if (BYPASS_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Skip files with extensions (fonts, images, etc.)
  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Determine device type
  const override = request.cookies.get("device-override")?.value;
  let isMobile = false;

  if (override === "mobile") {
    isMobile = true;
  } else if (override === "desktop") {
    isMobile = false;
  } else {
    const ua = request.headers.get("user-agent") || "";
    isMobile = MOBILE_UA.test(ua);
  }

  if (isMobile) {
    // Rewrite to /m/… internally (user still sees original URL)
    const url = request.nextUrl.clone();
    url.pathname = `/m${pathname === "/" ? "" : pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set("x-device-type", "mobile");
    return response;
  }

  // Desktop — let it pass through to (desktop) route group
  const response = NextResponse.next();
  response.headers.set("x-device-type", "desktop");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files:
     * - _next/static, _next/image, favicon.ico
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
