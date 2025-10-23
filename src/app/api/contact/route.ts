// Force Node runtime so Nodemailer works in prod
export const runtime = "nodejs";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { addLeadToSheet, type LeadData } from "@/lib/googleSheets";

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  type: z.string().optional(), // 'newsletter' or 'contact'
  neighborhoods: z.string().optional(),
  source: z.string().optional(), // 'contact-form', 'newsletter-signup', etc.
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

    const { email, name, phone, message, type, neighborhoods, source, _gotcha } = parsed.data;

    // Honeypot: pretend success if bot
    if (_gotcha && _gotcha.length > 0) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    // SMTP configuration removed - email notifications disabled
    // const host = process.env.SMTP_HOST ?? "";
    // const port = Number(process.env.SMTP_PORT ?? 587);
    // const user = process.env.SMTP_USER ?? "";
    // const pass = process.env.SMTP_PASS ?? "";
    // const to = (process.env.MAIL_TO ?? "").split(",").map(s => s.trim()).filter(Boolean);
    // const fromAddr = (process.env.MAIL_FROM ?? (user ? `Website <${user}>` : "")).trim();
    // const ccList = (process.env.MAIL_CC ?? "").split(",").map(s => s.trim()).filter(Boolean);

    // Add to Google Sheets first
    const leadData: LeadData = {
      timestamp: new Date().toISOString(),
      type: type === 'newsletter' ? 'newsletter' : 'contact',
      email,
      name,
      phone,
      neighborhoods,
      message,
      source: source || 'Website',
    };

    const sheetResult = await addLeadToSheet(leadData);
    if (!sheetResult.success) {
      console.warn('Failed to add lead to Google Sheets:', sheetResult.error);
      // Don't fail the request if Google Sheets fails, just log it
    }

    // Handle duplicate email case
    if (sheetResult.isDuplicate) {
      console.log('Duplicate email detected, skipping email notification');
      return NextResponse.json({ ok: true, duplicate: true });
    }

    // Email notifications disabled to avoid spam flags
    // TODO: Integrate with proper email marketing tool (Mailchimp, ConvertKit, etc.)
    console.log('Email notifications disabled - lead saved to Google Sheets only');
    
    // In development, return additional info
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        ok: true, 
        devMessage: 'Email notifications disabled - lead saved to Google Sheets only',
        sheetResult: sheetResult.success ? 'Lead saved to Google Sheets' : 'Google Sheets save failed'
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact route error:", err);
    const errorMessage = process.env.NODE_ENV === 'development' 
      ? `Server error: ${err instanceof Error ? err.message : 'Unknown error'}` 
      : "Server error";
    return NextResponse.json({ ok: false, error: errorMessage }, { status: 500 });
  }
}