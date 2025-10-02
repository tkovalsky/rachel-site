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

  // Relax for dev so HMR works; tighten in prod
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