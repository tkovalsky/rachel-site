"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SocialProof() {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) setShowMobile(true);
    };
    if (typeof window !== "undefined" && window.scrollY > 120) {
      setShowMobile(true);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LOGOS = [
    { src: "/logos/compass.png", alt: "Compass" },
    { src: "/logos/zillow.svg", alt: "Zillow" },
    { src: "/logos/realtor.svg", alt: "REALTOR®" },
  ] as const;

  return (
    <section aria-label="Trusted and featured" className="border-t section-alt">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <h2 className="text-sm font-medium tracking-widest text-ink-lighter uppercase">
          Trusted & Featured
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {Array.isArray(LOGOS) &&
            LOGOS.map(({ src, alt }) => (
              <div
                key={src}
                className="relative flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                style={{
                  width: "120px",
                  height: "60px",
                }}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
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