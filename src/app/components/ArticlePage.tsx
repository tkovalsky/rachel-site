import { Article } from '@/app/content/types';
import Image from 'next/image';

interface ArticlePageProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <>
      <main className="min-h-screen bg-paper" role="main">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-deep to-champagne">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {article.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                {article.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <span>By {article.author}</span>
                <span>•</span>
                <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                {article.tags && article.tags.length > 0 && (
                  <>
                    <span>•</span>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-white/20 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Article Image */}
        {article.imageSrc && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={article.imageSrc}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </section>

        {/* Related Content */}
        {article.areas && article.areas.length > 0 && (
          <section className="py-12 bg-ink-soft/5">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Related Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {article.areas.map((area) => (
                    <span
                      key={area}
                      className="px-4 py-2 bg-champagne/20 text-deep rounded-full text-sm font-medium"
                    >
                      {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-16 bg-deep text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Real Estate Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Let Rachel help you find your perfect home in South Florida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+15612878966"
                  className="px-8 py-3 bg-champagne text-deep rounded-lg font-semibold hover:bg-champagne/90 transition-colors"
                >
                  Call (561) 287-8966
                </a>
                <a
                  href="mailto:hi@racheldelray.com"
                  className="px-8 py-3 border-2 border-champagne text-champagne rounded-lg font-semibold hover:bg-champagne hover:text-deep transition-colors"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
