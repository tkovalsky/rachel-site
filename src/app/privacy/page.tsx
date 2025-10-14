// src/app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Rachel Kovalsky Real Estate",
  description:
    "Privacy Policy for Rachel Kovalsky, Realtor® affiliated with Compass Florida, LLC (Koolik Group). Explains forms, cookies, and pixels (Meta/Reddit).",
};

export default function PrivacyPage() {
  const effective = "October 14, 2025"; // update when you materially change this page

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-slate-800">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Effective date: {effective}</p>

      <p className="mt-6 leading-relaxed">
        This independent site markets real estate services for{" "}
        <strong>Rachel Kovalsky, Realtor® (FL License #SL3620970)</strong>, affiliated with{" "}
        <strong>Compass Florida, LLC (Koolik Group)</strong>. This Privacy Policy explains what
        we collect, how we use it, and your choices.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">1) Information We Collect</h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed">
        <li>
          <strong>Form submissions:</strong> name, email, phone (optional), message, and any details
          you share when you request information.
        </li>
        <li>
          <strong>Usage data:</strong> basic analytics and advertising events (page views, button
          clicks) collected via cookies/pixels (see below).
        </li>
        <li>
          <strong>Device/technical data:</strong> IP address, browser type, and similar diagnostics
          provided by your device or browser.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">2) How We Use Information</h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed">
        <li>Respond to your inquiries and provide real estate guidance.</li>
        <li>Improve the site’s content, usability, and performance.</li>
        <li>Measure marketing effectiveness and reach interested audiences.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">
        3) Contact Forms and Email (Formspree)
      </h2>
      <p className="mt-3 leading-relaxed">
        Our contact form is processed by{" "}
        <a
          href="https://formspree.io/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Formspree
        </a>
        . When you submit the form, your information is transmitted to Formspree and forwarded to our
        designated email inbox. Do not submit sensitive personal information via the form. We use a
        “honeypot” field to reduce spam.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">4) Cookies & Advertising Pixels</h2>
      <p className="mt-3 leading-relaxed">
        We may use cookies and similar technologies to measure traffic and improve marketing.
        Specifically, we may use:
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed">
        <li>
          <strong>Meta (Facebook) Pixel:</strong> tracks page views and conversions to help us
          understand ad performance on Meta platforms. Learn more and manage your ad preferences at{" "}
          <a
            href="https://www.facebook.com/adpreferences/ad_settings"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            Facebook Ad Preferences
          </a>
          .
        </li>
        <li>
          <strong>Reddit Pixel:</strong> measures visits and conversion events from Reddit ads. You
          can manage Reddit advertising preferences at{" "}
          <a
            href="https://www.reddit.com/personalization"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            reddit.com/personalization
          </a>
          .
        </li>
      </ul>
      <p className="mt-3 leading-relaxed">
        You can control cookies via your browser settings (block, delete, or limit cookies). If you
        block cookies, some features may not work as intended. If we add other tools (e.g., Google
        Analytics, Pinterest Tag, or Microsoft Clarity), we will update this Policy.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">5) Your Choices</h2>
      <ul className="mt-3 list-disc pl-5 space-y-2 leading-relaxed">
        <li>
          <strong>Opt out of targeted ads:</strong> use the platform controls linked above and your
          mobile device ad settings; you can also visit{" "}
          <a
            href="https://optout.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            optout.aboutads.info
          </a>{" "}
          and{" "}
          <a
            href="https://www.networkadvertising.org/choices/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            networkadvertising.org/choices
          </a>
          .
        </li>
        <li>
          <strong>Email:</strong> to stop receiving emails, reply and request removal or email{" "}
          <a href="mailto:hi@racheldelray.com" className="underline underline-offset-4">
            hi@racheldelray.com
          </a>
          .
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">6) Data Sharing</h2>
      <p className="mt-3 leading-relaxed">
        We do not sell your personal information. We share data with service providers who help run
        this Site (e.g., hosting, form processing, analytics/ads), subject to contractual
        confidentiality and security obligations, and as required by law.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">7) Data Retention</h2>
      <p className="mt-3 leading-relaxed">
        We keep form submissions and related communications for as long as needed to respond and for
        reasonable business records, unless you request deletion (see Contact below).
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">8) Security</h2>
      <p className="mt-3 leading-relaxed">
        We use reasonable administrative, technical, and physical safeguards appropriate for a small
        business website. No method of transmission or storage is 100% secure.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">9) Children’s Privacy</h2>
      <p className="mt-3 leading-relaxed">
        This Site is intended for adults interested in real estate. We do not knowingly collect
        personal information from children under 13.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">10) Links to Third Parties</h2>
      <p className="mt-3 leading-relaxed">
        Links to third-party sites (e.g., Compass, Koolik, lenders, inspection resources) are
        provided for convenience. We are not responsible for their content or privacy practices.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">11) Changes to This Policy</h2>
      <p className="mt-3 leading-relaxed">
        We may update this Policy from time to time. The “Effective date” above will indicate the
        latest revision. Your continued use of the Site after changes are posted means you accept
        the revised Policy.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">12) Contact</h2>
      <p className="mt-3 leading-relaxed">
        Questions or requests (access/deletion)? Email{" "}
        <a href="mailto:hi@racheldelray.com" className="underline underline-offset-4">
          hi@racheldelray.com
        </a>
        .
      </p>

      <p className="mt-10 text-xs text-slate-500">
        © {new Date().getFullYear()} Rachel Kovalsky. Realtor® — Florida License #SL3620970.
        Affiliated with Compass Florida, LLC (Koolik Group). Equal Housing Opportunity.
      </p>
    </main>
  );
}