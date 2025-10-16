import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  imageSrc: string;         // e.g. "/hero-home-exterior.jpg"
  compassUrl: string;
  phone?: string;           // tel uri value
  phoneLabel?: string;      // human-readable number
  serviceNote?: string;     // e.g. "Delray • Boca • Boynton"
  serviceThumbSrc?: string; // e.g. "/coverage-map.jpeg"
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
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-10 md:py-24">
        {/* Text section */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            {title}
          </h1>

          <p className="mt-4 text-base text-slate-600 md:text-lg">{subtitle}</p>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            {bullets.map((b) => (
              <li key={b} className="leading-relaxed">
                • {b}
              </li>
            ))}
          </ul>

          {/* CTAs — stack on mobile, row on md+ */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${phone}`}
              aria-label={`Call Rachel at ${phoneLabel}`}
              className="w-full rounded-lg bg-slate-900 px-5 py-3 text-center text-white shadow-sm transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 sm:w-auto"
            >
              Call Rachel {phoneLabel}
            </a>

            <Link
              href={compassUrl}
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
              aria-label="View Compass profile (opens in new tab)"
              className="w-full rounded-lg border border-slate-300 px-5 py-3 text-center text-slate-700 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10 sm:w-auto"
            >
              Compass Profile
            </Link>
          </div>

          {/* Optional service area chip */}
          <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
            {serviceThumbSrc ? (
              <span className="inline-flex items-center gap-2">
                <span className="relative block h-6 w-10 overflow-hidden rounded">
                  <Image
                    src={serviceThumbSrc}
                    alt="Service area map"
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

        {/* Image section */}
        <div className="md:justify-self-center">
          <div className="relative aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src={imageSrc}
              alt="South Florida coastal home"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}