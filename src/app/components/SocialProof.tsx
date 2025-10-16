"use client";
import Image from "next/image";
import Link from "next/link";

export default function SocialProof() {
  return (
    <section aria-label="Trusted and featured" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <h2 className="text-sm font-medium uppercase tracking-widest text-slate-500">
          Trusted & Featured
        </h2>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-10 opacity-85">
          <Link
            href="https://www.compass.com/agents/rachel-kovalsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Compass profile (opens in new tab)"
          >
            <Image
              src="/logos/compass.png"
              alt="Compass"
              width={110}
              height={40}
              className="object-contain grayscale hover:grayscale-0 transition"
            />
          </Link>

          <Link
            href="https://www.zillow.com/profile/rachel-kovalsky4/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Zillow profile (opens in new tab)"
          >
            <Image
              src="/logos/zillow.svg"
              alt="Zillow"
              width={90}
              height={30}
              className="object-contain grayscale hover:grayscale-0 transition"
            />
          </Link>

          <Link
            href="https://www.realtor.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View REALTOR® profile (opens in new tab)"
          >
            <Image
              src="/logos/realtor.svg"
              alt="REALTOR®"
              width={80}
              height={30}
              className="object-contain grayscale hover:grayscale-0 transition"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}