// src/app/components/NeighborhoodGrid.tsx
import Link from "next/link";
import Image from "next/image";
import type { Neighborhood } from "@/app/content/neighborhoods";

type Props = { items?: Neighborhood[] };

export default function NeighborhoodGrid({ items }: Props) {
  const list = Array.isArray(items) ? items : [];

  return (
    <section aria-label="Featured Areas" className="border-t border-divider bg-surface">
      <div className="section py-16">
        <h2 className="h2 text-deep text-center">Featured Areas</h2>
        <p className="mt-4 body-large text-ink-soft text-center max-w-2xl mx-auto">
          Discover the best neighborhoods in South Florida
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {list.map((n) => {
            const url = n.href ?? `/areas/${n.slug}`;
            return (
              <Link
                key={n.slug}
                href={url}
                className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={n.imageSrc}
                    alt={`${n.title} neighborhood`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={false}
                  />
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3 className="h3 text-deep group-hover:text-champagne transition-colors">
                    {n.title}
                  </h3>
                  <p className="mt-3 body text-ink-soft">{n.blurb}</p>
                </div>
              </Link>
            );
          })}

          {list.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="body-small text-ink-lighter">More neighborhoods coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}