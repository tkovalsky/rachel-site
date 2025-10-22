"use client";
import Image from "next/image";

export default function SocialProof() {
  const LOGOS = [
    { src: "/logos/compass.png", alt: "Compass" },
    { src: "/logos/zillow.svg",  alt: "Zillow" },
    { src: "/logos/realtor.svg", alt: "REALTOR®" },
  ] as const;

  return (
    <section aria-label="Trusted and featured" className="border-t bg-surface">
      <div className="section py-12 text-center">
        <h2 className="eyebrow">
          Trusted & Featured
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {LOGOS.map(({ src, alt }) => (
            <div
              key={src}
              className="relative flex items-center justify-center grayscale hover:grayscale-0 transition"
              style={{ width: "130px", height: "44px" }}
              aria-hidden
            >
              <Image src={src} alt={alt} fill sizes="130px" className="object-contain" />
            </div>
          ))}
        </div>

        <p className="sr-only">
          Compass, Zillow, and REALTOR® marks are the property of their respective owners.
        </p>
      </div>
    </section>
  );
}