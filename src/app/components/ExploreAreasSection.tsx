import { Area } from '@/app/content/types';
import { MarkdownContentService } from '@/lib/markdownContentService';
import Image from 'next/image';
import Link from 'next/link';

interface ExploreAreasSectionProps {
  currentArticle?: {
    areas?: string[];
  };
}

export default function ExploreAreasSection({ currentArticle }: ExploreAreasSectionProps) {
  const allAreas = MarkdownContentService.getAreas();
  
  // If we have a current article, show related areas, otherwise show featured areas
  const areasToShow = currentArticle?.areas?.length 
    ? allAreas.filter(area => currentArticle.areas?.includes(area.id || ''))
    : allAreas.filter(area => area.featured).slice(0, 3);

  if (areasToShow.length === 0) {
    return null; // Don't render if no areas to show
  }

  return (
    <section className="py-20 bg-surface-subtle">
      <div className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="h2 text-deep mb-12 text-center">Explore Areas</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areasToShow.map((area) => (
              <Link
                key={area.id}
                href={`/areas/${area.slug}`}
                className="card p-8 group hover:shadow-lg transition-all duration-300 block"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6">
                  <Image
                    src={area.imageSrc || '/areas/default.jpg'}
                    alt={area.name || 'Area'}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="h3 text-deep mb-4 group-hover:text-champagne transition-colors">
                  {area.name}
                </h3>
                <p className="body text-ink-soft mb-6">{area.description}</p>
                <div className="inline-flex items-center gap-2 text-champagne hover:text-champagne-dark font-semibold body">
                  Explore Area
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
