import "server-only";
import { createTransport } from "nodemailer";

type SendArgs = {
  subject: string;
  text: string;
  to?: string[];   // falls back to MAIL_TO
  cc?: string[];   // falls back to MAIL_CC
  from?: string;   // falls back to MAIL_FROM or SMTP_USER
};
type SendResult = { ok: true; skipped?: true } | { ok: false; error: string };

function envList(v?: string | string[]) {
  if (!v) return [] as string[];
  return Array.isArray(v)
    ? v.map(s => s.trim()).filter(Boolean)
    : v.split(",").map(s => s.trim()).filter(Boolean);
}

export async function sendMail({ subject, text, to, cc, from }: SendArgs): Promise<SendResult> {
  const mailTo = to && to.length ? to : envList(process.env.MAIL_TO);
  const mailCc = cc && cc.length ? cc : envList(process.env.MAIL_CC);

  if (!mailTo.length) {
    console.warn("sendMail: MAIL_TO not set; skipping send.");
    return { ok: true, skipped: true };
  }

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.warn("sendMail: SMTP env missing; skipping send.");
    return { ok: true, skipped: true };
  }

  const transporter = createTransport({
    host,
    port,
    secure: false, // Titan on 587 (STARTTLS)
    auth: { user, pass },
  });

  const fromAddr = from || process.env.MAIL_FROM || (user ? `Website <${user}>` : "Website <noreply@localhost>");

  await transporter.sendMail({
    from: fromAddr,
    to: mailTo,
    cc: mailCc.length ? mailCc : undefined,
    subject,
    text,
  });

  return { ok: true };
}
