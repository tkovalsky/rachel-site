import Image from "next/image";

const LOGOS = [
  { src: "/logos/compass.svg", alt: "Compass" },
  { src: "/logos/zillow.svg", alt: "Zillow" },
  { src: "/logos/realtor.svg", alt: "REALTOR®" },
];

export default function SocialProof() {
  return (
    <section className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <h3 className="text-center text-sm tracking-[0.2em] text-slate-500">TRUSTED &amp; FEATURED</h3>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:flex sm:justify-center">
          {LOGOS.map((l) => (
            <div key={l.alt} className="rounded-xl border border-slate-200 bg-white p-6 w-[140px] h-[100px] flex items-center justify-center">
              {/* If an asset is missing, Next/Image throws; use a plain img as a safe fallback */}
              <img src={l.src} alt={l.alt} width={120} height={36} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}