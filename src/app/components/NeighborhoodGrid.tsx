import Image from "next/image";
import Link from "next/link";

type Item = { name: string; blurb: string; imageSrc: string; href?: string };

export default function NeighborhoodGrid({ items }: { items: Item[] }) {
  return (
    <section id="areas" className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Featured Areas</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => {
            const Card = (
              <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white">
                <div className="relative h-40 w-full">
                  <Image
                    src={n.imageSrc}
                    alt={`${n.name} neighborhood`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width:768px) 100vw, 33vw"
                    priority={false}
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">{n.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{n.blurb}</p>
                </div>
              </article>
            );
            return n.href ? (
              <Link key={n.name} href={n.href} aria-label={`Explore ${n.name}`}>
                {Card}
              </Link>
            ) : (
              <div key={n.name}>{Card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}