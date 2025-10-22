export default function Footer() {
  return (
    <footer className="border-t border-divider bg-surface">
      <div className="section py-8 body-small text-ink-lighter text-center leading-relaxed">
        © {new Date().getFullYear()} Rachel Kovalsky, Realtor® — Florida License #SL3620970.
        <br />
        Affiliated with Compass Florida, LLC (Koolik Group). Independent site. Equal Housing Opportunity.
        <br />
        <a
          href="mailto:hi@racheldelray.com"
          className="text-champagne hover:underline"
          aria-label="Email Rachel Kovalsky"
        >
          hi@racheldelray.com
        </a>
        {" • "}
        <a
          href="https://www.compass.com/agents/rachel-kovalsky/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-champagne hover:underline"
          aria-label="View Compass Profile (opens in new tab)"
        >
          Compass Profile
        </a>
        {" • "}
        <a
          href="https://koolik.com/meet-rachel-kovalsky/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-champagne hover:underline"
          aria-label="View Koolik Group team profile (opens in new tab)"
        >
          Koolik Team Profile
        </a>
        <div className="mt-4 space-x-6">
          <a className="text-ink-lighter hover:text-champagne transition-colors" href="/privacy">
            Privacy
          </a>
          <a className="text-ink-lighter hover:text-champagne transition-colors" href="/terms">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}