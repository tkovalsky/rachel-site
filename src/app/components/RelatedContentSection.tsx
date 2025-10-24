import { Article, Area } from '@/app/content/types';
import { MarkdownContentService } from '@/lib/markdownContentService';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedContentSectionProps {
  article: Article;
}

export default function RelatedContentSection({ article }: RelatedContentSectionProps) {
  const allArticles = MarkdownContentService.getAllArticles();
  const allAreas = MarkdownContentService.getAreas();

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id &&
      (a.targetSegments.some(seg => article.targetSegments.includes(seg)) ||
       a.areas.some(area => article.areas.includes(area))))
    .slice(0, 3);

  const relatedAreas = allAreas
    .filter(area => article.areas.includes(area.id))
    .slice(0, 3);

  if (relatedArticles.length === 0 && relatedAreas.length === 0) {
    return null; // Don't render if no related content
  }

  return (
    <section className="py-20 bg-surface-subtle">
      <div className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="h2 text-deep mb-12 text-center">Explore Related Areas & Stories</h2>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mb-12">
              <h3 className="h3 text-deep mb-8">More Success Stories</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.id}
                    href={`/articles/${relatedArticle.slug}`}
                    className="card p-6 group hover:shadow-lg transition-all duration-300 block"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={relatedArticle.imageSrc || '/articles/default.jpg'}
                        alt={relatedArticle.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="h3 text-deep mb-3 group-hover:text-champagne transition-colors">
                      {relatedArticle.title}
                    </h4>
                    <p className="body text-ink-soft mb-4">{relatedArticle.excerpt}</p>
                    <div className="inline-flex items-center gap-2 text-champagne hover:text-champagne-dark font-semibold body">
                      Read Story
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Areas */}
          {relatedAreas.length > 0 && (
            <div>
              <h3 className="h3 text-deep mb-8">Explore Areas</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedAreas.map((area) => (
                  <Link
                    key={area.id}
                    href={`/areas/${area.slug}`}
                    className="card p-6 group hover:shadow-lg transition-all duration-300 block"
                  >
                    <h4 className="h3 text-deep mb-3 group-hover:text-champagne transition-colors">
                      {area.name}
                    </h4>
                    <p className="body text-ink-soft">
                      Discover properties and communities in this beautiful area
                    </p>
                    <div className="inline-flex items-center gap-2 text-champagne hover:text-champagne-dark font-semibold body mt-4">
                      Explore Area
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
