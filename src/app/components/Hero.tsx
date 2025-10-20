import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  imageSrc: string;        // e.g. "/rachel.jpeg"
  compassUrl: string;
  phone?: string;
  phoneLabel?: string;
};

export default function Hero({
  title,
  subtitle,
  bullets,
  imageSrc,
  compassUrl,
  phone = "+15612878966",
  phoneLabel = "(561) 287-8966",
}: Props) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        {/* Copy */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-lg text-slate-600">{subtitle}</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            {bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          {/* Primary CTA: Call */}
          <a href={`tel:${phone}`} className="btn-primary">
          Call Rachel Now {phoneLabel}
        </a>
          {/* Secondary: Compass profile */}
          <Link
            href={compassUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Compass profile (opens in new tab)"
            className="btn-ghost"
          >
            Compass profile
          </Link>
        </div>
        </div>

        {/* Image — plain <img> so we bypass Next/Image completely */}
        <div className="md:justify-self-center">
          <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <img
              src={imageSrc}
              alt="Rachel Kovalsky"
              width={520}
              height={650}
              loading="eager"
              style={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}