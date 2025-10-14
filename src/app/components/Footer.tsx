export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-600 text-center leading-relaxed">
        © {new Date().getFullYear()} Rachel Kovalsky, Realtor® — Florida License #SL3620970.
        <br />
        Affiliated with Compass Florida, LLC (Koolik Group). Independent site. Equal Housing Opportunity.
        <br />
        <a
          href="mailto:hi@racheldelray.com"
          className="underline underline-offset-4 hover:text-slate-800"
          aria-label="Email Rachel Kovalsky"
        >
          hi@racheldelray.com
        </a>
        {" • "}
        <a
          href="https://www.compass.com/agents/rachel-kovalsky/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-slate-800"
          aria-label="View Compass Profile (opens in new tab)"
        >
          Compass Profile
        </a>
        {" • "}
        <a
          href="https://koolik.com/meet-rachel-kovalsky/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-slate-800"
          aria-label="View Koolik Group team profile (opens in new tab)"
        >
          Koolik Team Profile
        </a>
        <div className="mt-3 space-x-4">
          <a className="underline underline-offset-4 hover:text-slate-800" href="/privacy">
            Privacy
          </a>
          <a className="underline underline-offset-4 hover:text-slate-800" href="/terms">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}