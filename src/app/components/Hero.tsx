import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  bullets: string[];
  imageSrc: string;
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
    <section className="bg-paper">
      <div className="section grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
        {/* Copy */}
        <div>
          <h1 className="h1 text-deep">{title}</h1>
          <p className="lead mt-6 max-w-2xl">{subtitle}</p>
          <ul className="mt-8 space-y-3 body-large">
            {bullets.map((b) => <li key={b}>• {b}</li>)}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href={`tel:${phone}`} className="btn-primary text-lg font-semibold">Call Rachel {phoneLabel}</a>
            <Link href={compassUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-lg font-semibold">
              Compass profile
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="md:justify-self-center">
          <div className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-divider shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={imageSrc}
              alt="Rachel Kovalsky"
              width={520}
              height={650}
              priority={true}
              className="block h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 520px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}