import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json(); // { name, email, phone, address, details }
    // TODO: send an email via Resend/Mailgun/SES. For now, just log.
    console.log("[contact] form submission:", data);

    // Return a success so the UI can show the green message.
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}




