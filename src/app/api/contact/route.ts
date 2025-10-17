// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  message: z.string().optional(),
  _gotcha: z.string().optional(), // honeypot
});

// Helper to parse either JSON or form-encoded bodies
async function readBody(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await req.json();
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const fd = await req.formData();
    return Object.fromEntries(fd as any);
  }
  // Fallback: try formData anyway
  const fd = await req.formData().catch(() => null);
  return fd ? Object.fromEntries(fd as any) : {};
}

export async function POST(req: Request) {
  try {
    const body = await readBody(req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }
    const { email, message, _gotcha } = parsed.data;

    // Honeypot: bots get a "success" without email send.
    if (_gotcha && _gotcha.length > 0) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    // No key in dev? Return success so the UI flow still works.
    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY missing; skipping email send.");
      return NextResponse.json({ ok: true, skipped: true });
    }

    // Lazy import so local dev without a key doesn’t even import the lib
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    const from = process.env.MAIL_FROM || 'Website Contact <noreply@mail.racheldelray.com>';
    const to = (process.env.MAIL_TO || 'hi@racheldelray.com').split(',');

    await resend.emails.send({
      from,
      to,
      subject: "Website contact",
      text: `From: ${email}\n\n${message || "(no message)"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}