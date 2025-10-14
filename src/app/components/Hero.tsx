import Image from "next/image";
import Link from "next/link";

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
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-4 text-slate-600 text-lg">{subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" aria-label="Start your home search" className="rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-black">
              Start your home search
            </a>
            <Link href={compassUrl} className="rounded-lg border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-50">
              View Compass profile
            </Link>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            {bullets.map((b) => <li key={b}>• {b}</li>)}
          </ul>
        </div>

        <div className="md:justify-self-center">
          <Image src={imageSrc} alt="Rachel Kovalsky" width={480} height={600}
                 className="rounded-xl border border-slate-200 object-cover shadow-sm" priority />
        </div>
      </div>
    </section>
  );
}