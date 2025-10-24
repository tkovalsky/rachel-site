// Use fallback content service for client components
import { contentService } from '@/lib/contentService';
import { TargetSegment } from '@/app/content/types';
import Link from 'next/link';
import Image from 'next/image';

interface DynamicContentProps {
  targetSegment?: TargetSegment;
  area?: string;
  limit?: number;
  randomize?: boolean;
  showImages?: boolean;
}

export async function DynamicAreas({ 
  targetSegment, 
  area, 
  limit = 3, 
  randomize = true,
  showImages = true 
}: DynamicContentProps) {
  const areas = await contentService.getAreas();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {areas.map((area) => (
        <Link
          key={area.id}
          href={`/areas/${area.slug}`}
          className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          {showImages && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={area.imageSrc || '/areas/default.jpg'}
                alt={`${area.name || 'Area'} neighborhood`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-8">
            <h3 className="text-3xl md:text-4xl font-bold text-deep group-hover:text-champagne transition-colors mb-4">
              {area.name}
            </h3>
            <p className="text-xl md:text-2xl text-ink-soft leading-relaxed">{area.description}</p>
            {targetSegment && area.targetSegments && (
              <div className="mt-4 flex flex-wrap gap-2">
                {area.targetSegments.map((segment) => (
                  <span
                    key={segment}
                    className="px-2 py-1 text-xs bg-champagne/10 text-champagne rounded-full"
                  >
                    {segment.replace('-', ' ')}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function DynamicDevelopments({ 
  targetSegment, 
  area, 
  limit = 3, 
  randomize = true,
  showImages = true 
}: DynamicContentProps) {
  const developments = await contentService.getDevelopments();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {developments.map((development) => (
        <Link
          key={development.id}
          href={`/developments/${development.slug}`}
          className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          {showImages && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={development.imageSrc || '/developments/default.jpg'}
                alt={`${development.name || 'Development'} development`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-8">
            <h3 className="text-3xl md:text-4xl font-bold text-deep group-hover:text-champagne transition-colors mb-4">
              {development.name}
            </h3>
            <p className="text-xl md:text-2xl text-ink-soft leading-relaxed">{development.description}</p>
            {development.amenities && development.amenities.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {development.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="px-2 py-1 text-xs bg-champagne/10 text-champagne rounded-full"
                >
                  {amenity.replace('-', ' ')}
                </span>
              ))}
              {development.amenities.length > 3 && (
                <span className="px-2 py-1 text-xs bg-ink-lighter/10 text-ink-lighter rounded-full">
                  +{development.amenities.length - 3} more
                </span>
              )}
              </div>
            )}
            <div className="mt-6 text-2xl md:text-3xl font-bold text-deep">
              {development.priceRange ? 
                `$${development.priceRange.min.toLocaleString()} - $${development.priceRange.max.toLocaleString()}` :
                'Price on request'
              }
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export async function DynamicArticles({ 
  targetSegment, 
  area, 
  limit = 3, 
  randomize = true,
  showImages = true 
}: DynamicContentProps) {
  const articles = await contentService.getArticles();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/articles/${article.slug}`}
          className="group card overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
        >
          {showImages && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={article.imageSrc || '/articles/default.jpg'}
                alt={article.title || 'Article'}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
          <div className="p-8">
            <h3 className="text-3xl md:text-4xl font-bold text-deep group-hover:text-champagne transition-colors mb-4">
              {article.title}
            </h3>
            <p className="text-xl md:text-2xl text-ink-soft leading-relaxed">{article.excerpt}</p>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg text-ink-lighter">
                {new Date(article.publishDate).toLocaleDateString()}
              </span>
              <span className="text-lg font-semibold text-champagne">Read More →</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function DynamicTestimonials({ 
  targetSegment, 
  limit = 2, 
  randomize = true 
}: DynamicContentProps) {
  // const testimonials = await contentService.getTestimonials();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* {testimonials.map((testimonial) => (
        <blockquote key={testimonial.id} className="card p-6 text-ink">
          <p className="body-large leading-relaxed">"{testimonial.quote}"</p>
          <footer className="mt-4 body-small text-ink-lighter">
            — {testimonial.author}
            {testimonial.role && `, ${testimonial.role}`}
            {testimonial.location && ` • ${testimonial.location}`}
          </footer>
          {testimonial.rating && (
            <div className="mt-2 flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${
                    i < testimonial.rating! ? 'text-champagne' : 'text-ink-lighter'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </blockquote>
      ))} */}
    </div>
  );
}

export function DynamicMarketData({ 
  area, 
  limit = 3, 
  randomize = true 
}: DynamicContentProps) {
  // const marketData = await contentService.getMarketData();

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* {marketData.map((data) => {
        const value = data.format === 'currency'
          ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
              .format(Number(data.value))
          : data.format === 'percent'
          ? `${Number(data.value).toFixed(0)}%`
          : data.format === 'integer'
          ? new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(data.value))
          : String(data.value);

        return (
          <div key={data.id} className="card p-6">
            <div className="text-5xl md:text-6xl font-bold tracking-tight text-deep">{value}</div>
            <div className="mt-3 body-large text-ink">{data.metric}</div>
            <div className="mt-4 body-small text-ink-lighter">{data.period}</div>
          </div>
        );
      })} */}
    </div>
  );
}
