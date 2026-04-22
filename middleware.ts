import { NextRequest, NextResponse } from "next/server";

const MOBILE_UA =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;

const BYPASS_PREFIXES = ["/api", "/_next", "/images", "/videos", "/favicon", "/admin"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BYPASS_PREFIXES.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Skip files with extensions (fonts, images, etc.)
  if (/\.\w+$/.test(pathname)) {
    return NextResponse.next();
  }

  const ua = request.headers.get("user-agent") || "";
  const isMobile = MOBILE_UA.test(ua);
  const isMobileRoute = pathname === "/m" || pathname.startsWith("/m/");

  // Real mobile device on desktop route → redirect
  if (isMobile && !isMobileRoute) {
    const mobilePath = pathname === "/" ? "/m" : `/m${pathname}`;
    return NextResponse.redirect(new URL(mobilePath, request.url));
  }

  // Real desktop device on mobile route → redirect
  if (!isMobile && isMobileRoute) {
    const desktopPath = pathname === "/m" ? "/" : pathname.replace(/^\/m/, "");
    return NextResponse.redirect(new URL(desktopPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
