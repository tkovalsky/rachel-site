import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(5).max(5000).trim(),
  gotcha: z.string().max(0).optional(),           // honeypot must be empty
  t: z.number().int().optional(),                 // simple time trap
});

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const gotcha = String(data.get("_gotcha") || "");
    const started = Number(data.get("_t") || 0);

    // Basic time-trap: require at least 3 seconds from render → submit
    const now = Date.now();
    const minDelayMs = 3000;
    if (!started || now - started < minDelayMs) {
      return NextResponse.json({ ok: true }, { status: 200 }); // pretend success to starve bots
    }

    const parsed = schema.safeParse({ email, message, gotcha, t: started });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form." }, { status: 400 });
    }
    if (gotcha) {
      return NextResponse.json({ ok: true }, { status: 200 }); // honeypot filled → ignore
    }

    // Send email
    await resend.emails.send({
      from: "Website Contact <noreply@mail.racheldelray.com>",
      to: process.env.CONTACT_TO!,
      subject: "New site lead",
      text: `From: ${email}\n\n${message}`,
    });

    return NextResponse.redirect("https://racheldelray.com/thanks", 303);
  } catch (e) {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}