// src/app/components/Hero.tsx
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  imageSrc: string;
  compassUrl: string;
};

export default function Hero({ title, subtitle, bullets, imageSrc, compassUrl }: Props) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>

          <p className="mt-4 text-slate-700 text-lg">{subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              aria-label="Start your home search"
              className="rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Start your home search
            </a>

            {/* External link with a11y + security */}
            <a
              href={compassUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-300 px-5 py-3 text-slate-800 hover:bg-slate-50 inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span>View Compass profile</span>
              {/* external-link icon (decorative) */}
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4">
                <path
                  d="M11 3h6v6m0-6L9 11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 7v10h10v-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          {/* Bullets with icons and proper list semantics */}
          <ul className="mt-6 space-y-2 text-slate-700" role="list">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-5 w-5 text-green-600">
                  <path
                    d="M7.5 10.5l2 2 4.5-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:justify-self-center">
          <Image
            src={imageSrc}
            alt="Rachel Kovalsky"
            width={480}
            height={600}
            priority
            className="rounded-xl border border-slate-200 object-cover shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}