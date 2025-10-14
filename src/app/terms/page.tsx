// src/app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Rachel Kovalsky Real Estate",
  description:
    "Terms of Use for Rachel Kovalsky, Realtor® affiliated with Compass Florida, LLC (Koolik Group). Equal Housing Opportunity.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-slate-800">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
        Terms of Use
      </h1>
      <p className="mt-2 text-sm text-slate-500">Effective date: October 14, 2025</p>

      <p className="mt-6 leading-relaxed">
        Welcome to this website (the “Site”), owned and operated as an independent marketing
        site for <strong>Rachel Kovalsky, Realtor® (FL License #SL3620970)</strong>, affiliated
        with <strong>Compass Florida, LLC (Koolik Group)</strong>. By accessing or using the
        Site, you agree to these Terms of Use (“Terms”). If you do not agree, please do not use
        the Site.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-slate-900">1) Not a Brokerage Website</h2>
      <p className="mt-3 leading-relaxed">
        This Site is for general information and marketing. It is not an offer to represent you
        nor a substitute for the official Compass/Koolik brokerage websites. Brokerage services
        are provided only after you and the brokerage sign the required agreements.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">2) No Agency Created</h2>
      <p className="mt-3 leading-relaxed">
        Viewing the Site or contacting us via the Site does not create a client, customer,
        agency, or fiduciary relationship. Any such relationship will be formed only by a
        written agreement signed by you and the brokerage.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">3) Equal Housing & Fair Housing</h2>
      <p className="mt-3 leading-relaxed">
        We support the principles of the{" "}
        <a
          href="https://www.hud.gov/program_offices/fair_housing_equal_opp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Fair Housing Act
        </a>{" "}
        and provide housing information without regard to race, color, religion, sex, disability,
        familial status, national origin, sexual orientation, or gender identity.{" "}
        <strong>Equal Housing Opportunity.</strong>
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">4) Accuracy; No Guarantees</h2>
      <p className="mt-3 leading-relaxed">
        Information on neighborhoods, communities, schools, insurance, taxes, HOA rules, and
        financing is provided for convenience only and may change without notice. You should
        independently verify any item material to your decision. Nothing on the Site is legal,
        tax, or financial advice.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">5) Availability & Offers</h2>
      <p className="mt-3 leading-relaxed">
        Photos, descriptions, prices, timelines, and availability are illustrative and subject to
        change. <strong>No offer to buy or sell real property is made</strong>. Any real estate
        transaction will be governed by separate written contracts and disclosures.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">6) Testimonials & Results</h2>
      <p className="mt-3 leading-relaxed">
        Testimonials reflect individual experiences and do not guarantee future outcomes. Results
        vary by client, property, market conditions, and timing.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">
        7) Contact, Consent & Communications
      </h2>
      <p className="mt-3 leading-relaxed">
        By submitting a form or otherwise providing your contact details, you consent to be
        contacted by email, phone, and/or text message by Rachel and/or the brokerage team, even
        if your number is on a do-not-call registry. Message/data rates may apply. You can opt
        out at any time by replying STOP to texts or by emailing{" "}
        <a href="mailto:hi@racheldelray.com" className="underline underline-offset-4">
          hi@racheldelray.com
        </a>
        .
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">8) Third-Party Links</h2>
      <p className="mt-3 leading-relaxed">
        The Site may link to third-party sites (e.g., Compass, Koolik, lenders, inspection
        resources). We don’t control or endorse those sites and are not responsible for their
        content or policies. Use third-party sites at your own risk.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">9) Intellectual Property</h2>
      <p className="mt-3 leading-relaxed">
        All Site materials (text, graphics, layout, and branding) are owned by Rachel or used
        with permission and are protected by copyright and other laws. You may view and print
        pages for personal use only. Any other use requires prior written permission.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">10) Accessibility</h2>
      <p className="mt-3 leading-relaxed">
        We strive to make the Site accessible. If you experience difficulty, please email{" "}
        <a href="mailto:hi@racheldelray.com" className="underline underline-offset-4">
          hi@racheldelray.com
        </a>{" "}
        with a description of the issue and a way to contact you. We will make reasonable efforts
        to assist.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">11) Privacy</h2>
      <p className="mt-3 leading-relaxed">
        Your use of the Site is also governed by our{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        , which explains what data we collect and how we use it.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">12) Limitation of Liability</h2>
      <p className="mt-3 leading-relaxed">
        To the maximum extent permitted by law, the Site is provided “as is,” and we disclaim all
        warranties. We are not liable for indirect, incidental, or consequential damages arising
        from your use of the Site.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">13) Governing Law</h2>
      <p className="mt-3 leading-relaxed">
        These Terms are governed by the laws of the State of Florida, without regard to conflict
        of laws principles. Venue for any dispute shall be in state or federal courts located in
        Palm Beach County, Florida.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">14) Changes to These Terms</h2>
      <p className="mt-3 leading-relaxed">
        We may update these Terms from time to time by posting a revised version on the Site.
        Your continued use of the Site after changes are posted constitutes acceptance of the
        revised Terms.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Contact</h2>
      <p className="mt-3 leading-relaxed">
        Questions about these Terms? Email{" "}
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