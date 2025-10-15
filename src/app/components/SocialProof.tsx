import Image from "next/image";

export default function SocialProof() {
  return (
    <section aria-label="Trusted by" className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <p className="text-center text-xs uppercase tracking-widest text-slate-500">Trusted & Featured</p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6 opacity-80">
          <Image src="/logos/compass.svg" alt="Compass" width={96} height={24} />
          <Image src="/logos/zillow.svg" alt="Zillow" width={72} height={24} />
          <Image src="/logos/realtor.svg" alt="Realtor" width={72} height={24} />
          <Image src="/logos/eho.svg" alt="Equal Housing Opportunity" width={72} height={24} />
        </div>
      </div>
    </section>
  );
}