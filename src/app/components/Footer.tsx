import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-divider bg-surface">
      <div className="section py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="h3 text-deep mb-4">Rachel Kovalsky</h3>
            <p className="body-small text-ink-soft mb-4">
              Your trusted real estate advisor in South Florida. Expert guidance for every buyer type.
            </p>
            <div className="space-y-2">
              <a
                href="mailto:hi@racheldelray.com"
                className="block text-champagne hover:underline body-small"
              >
                hi@racheldelray.com
              </a>
              <a
                href="tel:+15612878966"
                className="block text-champagne hover:underline body-small"
              >
                (561) 287-8966
              </a>
            </div>
          </div>

          {/* Areas */}
          <div>
            <h4 className="font-semibold text-ink mb-4">Areas</h4>
            <div className="space-y-2">
              <Link href="/areas" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                All Areas
              </Link>
              <Link href="/areas?segment=55-plus-cash-buyer" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Active Adult Areas
              </Link>
              <Link href="/areas?segment=family" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Family Neighborhoods
              </Link>
              <Link href="/areas?segment=investor" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Investment Areas
              </Link>
            </div>
          </div>

          {/* Communities */}
          <div>
            <h4 className="font-semibold text-ink mb-4">Communities</h4>
            <div className="space-y-2">
              <Link href="/developments" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                All Communities
              </Link>
              <Link href="/developments?amenity=golf" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Golf Communities
              </Link>
              <Link href="/developments?amenity=country-club" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Country Clubs
              </Link>
              <Link href="/developments?amenity=pickleball" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Active Adult
              </Link>
            </div>
          </div>

          {/* Buyer Types */}
          <div>
            <h4 className="font-semibold text-ink mb-4">For Buyers</h4>
            <div className="space-y-2">
              <Link href="/buyers/55-plus-cash-buyer" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Active Adults
              </Link>
              <Link href="/buyers/family" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Families
              </Link>
              <Link href="/buyers/investor" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Investors
              </Link>
              <Link href="/buyers/relocating" className="block text-ink-lighter hover:text-champagne transition-colors body-small">
                Relocating
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-divider">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="body-small text-ink-lighter text-center md:text-left">
              © {new Date().getFullYear()} Rachel Kovalsky, Realtor® — Florida License #SL3620970.
              <br />
              Affiliated with Compass Florida, LLC (Koolik Group). Independent site. Equal Housing Opportunity.
            </div>
            <div className="flex gap-6">
              <a
                href="https://www.compass.com/agents/rachel-kovalsky/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne hover:underline body-small"
                aria-label="View Compass Profile (opens in new tab)"
              >
                Compass Profile
              </a>
              <a
                href="https://koolik.com/meet-rachel-kovalsky/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne hover:underline body-small"
                aria-label="View Koolik Group team profile (opens in new tab)"
              >
                Koolik Team
              </a>
              <Link href="/privacy" className="text-ink-lighter hover:text-champagne transition-colors body-small">
                Privacy
              </Link>
              <Link href="/terms" className="text-ink-lighter hover:text-champagne transition-colors body-small">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}