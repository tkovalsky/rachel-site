export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-600">
        © {new Date().getFullYear()} Rachel Kovalsky. Realtor® — Florida License #XXXXXX.
        Affiliated with Compass Florida, LLC (Koolik Group). Independent site. Equal Housing Opportunity.
        <div className="mt-2 space-x-4">
          <a className="underline underline-offset-4" href="/privacy">Privacy</a>
          <a className="underline underline-offset-4" href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}