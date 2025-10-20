// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  message: z.string().optional(),
  _gotcha: z.string().optional(), // honeypot
});

async function readBody(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await req.json();
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
    if (_gotcha) return NextResponse.json({ ok: true, skipped: true });

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const MAIL_FROM = process.env.MAIL_FROM || "Website Contact <noreply@mail.racheldelray.com>";
    const MAIL_TO = (process.env.MAIL_TO || "hi@racheldelray.com").split(",");

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY missing; simulating success.");
      return NextResponse.json({ ok: true, skipped: true });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: "Website contact",
      text: `From: ${email}\n\n${message || "(no message)"}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}