import { Article } from '@/app/content/types';
import { MarkdownContentService } from '@/lib/markdownContentService';
import Image from 'next/image';
import Link from 'next/link';

interface RelatedContentSectionProps {
  article: Article;
}

export default function RelatedContentSection({ article }: RelatedContentSectionProps) {
  const allArticles = MarkdownContentService.getAllArticles();

  const relatedArticles = allArticles
    .filter(a => a.id !== article.id &&
      (a.targetSegments.some(seg => article.targetSegments.includes(seg)) ||
       a.areas.some(area => article.areas.includes(area))))
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    return null; // Don't render if no related articles
  }

  return (
    <section className="py-20 bg-surface-subtle">
      <div className="section">
        <div className="max-w-6xl mx-auto">
          <h2 className="h2 text-deep mb-12 text-center">More Success Stories</h2>
          
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
      </div>
    </section>
  );
}
