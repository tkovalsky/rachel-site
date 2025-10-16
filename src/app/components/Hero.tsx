import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  imageSrc: string;        // e.g. "/hero-home-exterior.jpg"
  compassUrl: string;
  phone?: string;          // tel uri value — defaulted below
  phoneLabel?: string;     // human-readable number
  serviceNote?: string;    // e.g. "Delray • Boca • Boynton"
  serviceThumbSrc?: string; // e.g. "/coverage-map.jpeg" (small chip)
};

export default function Hero({
  title,
  subtitle,
  bullets,
  imageSrc,
  compassUrl,
  phone = "+15612878966",
  phoneLabel = "(561) 287-8966",
  serviceNote = "Delray • Boca • Boynton",
  serviceThumbSrc,
}: Props) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        {/* Copy side */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            {subtitle}
          </p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            {bullets.map((b) => (
              <li key={b} className="leading-relaxed">• {b}</li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {/* Primary CTA: Call */}
            <a
              href={`tel:${phone}`}
              aria-label={`Call Rachel at ${phoneLabel}`}
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-white shadow-sm transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
            >
              Call Rachel {phoneLabel}
            </a>

            {/* Secondary: Compass profile */}
            <Link
              href={compassUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Compass profile (opens in new tab)"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10"
            >
              Compass profile
            </Link>
          </div>

          {/* Small trust/service chip (optional) */}
          <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
            {serviceThumbSrc ? (
              <span className="inline-flex items-center gap-2">
                <span className="relative block h-6 w-10 overflow-hidden rounded">
                  <Image
                    src={serviceThumbSrc}
                    alt="Service area"
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span aria-label="Primary service areas">{serviceNote}</span>
              </span>
            ) : (
              <span aria-label="Primary service areas">{serviceNote}</span>
            )}
          </div>
        </div>

        {/* Image side */}
        <div className="md:justify-self-center">
          <div className="relative aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src={imageSrc}
              alt="South Florida coastal home"
              fill
              priority
              sizes="(min-width: 768px) 520px, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}