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
    <section
      aria-label="Trusted and featured"
      className={`border-t border-slate-200 bg-white ${showMobile ? "block" : "hidden"} md:block`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 py-10 text-center transition-all duration-500
        ${showMobile ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 md:opacity-100 md:translate-y-0"}`}
      >
        <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500 mb-6">
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