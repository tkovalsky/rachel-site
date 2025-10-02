// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const isProd = process.env.NODE_ENV === "production";

  // Baseline protections
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Content Security Policy
  // Dev needs ws: and 'unsafe-eval' for Next HMR; Prod should be tighter.
  const cspDev = [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self' ws:",
    "frame-ancestors 'none'",
  ].join("; ");

  const cspProd = [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
  ].join("; ");

  res.headers.set("Content-Security-Policy", isProd ? cspProd : cspDev);

  return res;
}

// Don’t run middleware for static assets or common public files
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(png|jpg|jpeg|webp|svg)).*)",
  ],
};