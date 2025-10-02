// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  const isProd = process.env.NODE_ENV === "production";

  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // Dev: allow HMR
  const cspDev = [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self' ws:",
    "frame-ancestors 'none'",
  ].join("; ");

  // Prod: keep strict, but allow inline to avoid hydration breakage.
  // (We can tighten later after we see what Next injects.)
  const cspProd = [
    "default-src 'self'",
    "img-src 'self' data: https:",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
  ].join("; ");

  // EITHER enforce:
  res.headers.set("Content-Security-Policy", isProd ? cspProd : cspDev);

  // OR, if you’d rather observe first, comment the line above and use Report-Only:
  // res.headers.set("Content-Security-Policy-Report-Only", isProd ? cspProd : cspDev);

  return res;
}