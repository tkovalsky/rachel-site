import { Development } from '@/app/content/types';
import { MarkdownContentService } from '@/lib/markdownContentService';
import Image from 'next/image';
import Link from 'next/link';

interface DevelopmentsSectionProps {
  areaId?: string;
  limit?: number;
}

export default function DevelopmentsSection({ areaId, limit = 6 }: DevelopmentsSectionProps) {
  const allDevelopments = MarkdownContentService.getDevelopments();
  
  // Filter by area if specified
  const developments = areaId 
    ? allDevelopments.filter(dev => dev.area === areaId)
    : allDevelopments;
  
  const displayDevelopments = developments.slice(0, limit);

  if (displayDevelopments.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-surface-subtle">
      <div className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="h2 text-deep mb-12 text-center">Developments & Communities</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayDevelopments.map((development) => (
              <Link
                key={development.id}
                href={`/developments/${development.slug}`}
                className="card p-6 group hover:shadow-lg transition-all duration-300 block"
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-6">
                  <Image
                    src={development.imageSrc || '/developments/default.jpg'}
                    alt={development.name || 'Development'}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="h3 text-deep mb-4 group-hover:text-champagne transition-colors">
                  {development.name}
                </h3>
                
                <p className="body text-ink-soft mb-4">{development.description}</p>
                
                {/* Amenities */}
                {development.amenities && development.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {development.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1 bg-champagne/20 text-champagne text-sm rounded-full"
                      >
                        {amenity.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Price Range */}
                <div className="text-2xl font-bold text-deep mb-4">
                  {development.priceRange ? 
                    `$${development.priceRange.min.toLocaleString()} - $${development.priceRange.max.toLocaleString()}` :
                    'Price on request'
                  }
                </div>
                
                <div className="inline-flex items-center gap-2 text-champagne hover:text-champagne-dark font-semibold body">
                  View Development
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
