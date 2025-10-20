// src/app/components/NeighborhoodGrid.tsx
import Link from "next/link";
import Image from "next/image";
import type { Neighborhood } from "@/app/content/neighborhoods";

type Props = { items?: Neighborhood[] };

export default function NeighborhoodGrid({ items }: Props) {
  const list = Array.isArray(items) ? items : [];

  return (
    <section aria-label="Featured Areas" className="border-t border-slate-200 bg-white">
      <div className="group panel overflow-hidden transition hover:shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Featured Areas</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {list.map((n) => {
            const url = n.href ?? `/areas/${n.slug}`;
            return (
              <Link
                key={n.slug}
                href={url}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden">
                  <Image
                    src={n.imageSrc}
                    alt={`${n.title} neighborhood`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                </div>

                {/* Text */}
                <div className="p-4">
                  <h3 className="font-semibold text-ink group-hover:text-brand-700 transition">
                    {n.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-lighter">{n.blurb}</p>
                </div>
              </Link>
            );
          })}

          {list.length === 0 && (
            <p className="text-sm text-slate-500">More neighborhoods coming soon.</p>
          )}
        </div>
      </div>
    </section>
  );
}