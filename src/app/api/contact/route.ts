// Force Node runtime so Nodemailer works in prod
export const runtime = "nodejs";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  _gotcha: z.string().optional(), // honeypot
});

type Body = Record<string, string>;

/** Parse body as JSON or FormData -> flat string map (strings only) */
async function parseBody(req: NextRequest): Promise<Body> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    const json = (await req.json()) as unknown;
    const out: Body = {};
    if (json && typeof json === "object") {
      for (const [k, v] of Object.entries(json as Record<string, unknown>)) {
        if (typeof v === "string") out[k] = v;
      }
    }
    return out;
  }
  const fd = await req.formData();
  const out: Body = {};
  for (const [k, v] of fd.entries()) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

export async function POST(req: NextRequest) {
  try {
    const body = await parseBody(req);
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const { email, name, phone, message, _gotcha } = parsed.data;

    // Honeypot: pretend success if bot
    if (_gotcha && _gotcha.length > 0) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    // SMTP env (Titan or other)
    const host = process.env.SMTP_HOST ?? "";
    const port = Number(process.env.SMTP_PORT ?? 587); // <-- fixed
    const user = process.env.SMTP_USER ?? "";
    const pass = process.env.SMTP_PASS ?? "";
    const to = (process.env.MAIL_TO ?? "").split(",").map(s => s.trim()).filter(Boolean);
    const fromAddr = (process.env.MAIL_FROM ?? (user ? `Website <${user}>` : "")).trim();
    const ccList = (process.env.MAIL_CC ?? "").split(",").map(s => s.trim()).filter(Boolean);

    if (!host || !user || !pass || to.length === 0 || !fromAddr) {
      console.warn("SMTP env missing; skipping send.");
      return NextResponse.json({ ok: true, skipped: true });
    }

    const { createTransport } = await import("nodemailer");

    const transporter = createTransport({
      host,
      port,
      secure: false, // STARTTLS on 587
      auth: { user, pass },
    });

    const lines: string[] = [
      `From: ${name ? `${name} <${email}>` : email}`,
      phone ? `Phone: ${phone}` : "",
      "",
      message ?? "(no message)",
    ].filter(Boolean);

    await transporter.sendMail({
      from: fromAddr,
      to,
      cc: ccList.length ? ccList : undefined,
      subject: "New website inquiry",
      text: lines.join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}