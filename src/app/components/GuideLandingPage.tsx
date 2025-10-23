interface GuideArticle {
  slug: string;
  title: string;
  subtitle: string;
  bullets: string[];
  contentHtml: string;
  developments?: Array<{
    title: string;
    description: string;
    url: string;
    image: string;
    imageAlt?: string;
  }>;
  relatedArticles?: Array<{
    title: string;
    description: string;
    url: string;
  }>;
}

import Image from 'next/image';

interface GuideLandingPageProps {
  article: GuideArticle;
}

export default function GuideLandingPage({ article }: GuideLandingPageProps) {
  return (
    <>
      <main className="min-h-screen bg-paper" role="main">
        {/* Hero: StoryBrand Headline + CTA */}
        <section className="py-20 bg-gradient-to-br from-paper to-surface-subtle">
          <div className="section">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="h1 text-deep mb-6">{article.title}</h1>
              <p className="lead mb-8 text-ink-soft">{article.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+15612878966"
                  aria-label="Call Rachel Now"
                  className="btn-primary"
                >
                  Call Rachel Now
                </a>
                <a
                  href="https://calendly.com/rachel-realestate/consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  Schedule a Free Call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body Section */}
        <section className="py-20">
          <div className="section">
            <div className="max-w-3xl mx-auto">
              <h2 className="h2 text-deep mb-8">Key Takeaways</h2>
              <ul className="space-y-4 mb-12">
                {article.bullets.map((point, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-champagne mr-3 mt-1">•</span>
                    <span className="body text-ink-soft">{point}</span>
                  </li>
                ))}
              </ul>
              <article aria-labelledby="article-title" className="prose prose-lg max-w-none">
                <h2 id="article-title" className="sr-only">{article.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
              </article>
            </div>
          </div>
        </section>

        {/* Developments Section (Grid Style) */}
        {article.developments && (
          <section className="py-20 bg-surface-subtle">
            <div className="section">
              <div className="text-center mb-16">
                <h3 className="h2 text-deep mb-4">Explore Featured Developments</h3>
                <p className="body-large text-ink-soft max-w-2xl mx-auto">
                  Discover communities that match your needs and lifestyle
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {article.developments.map((dev, i) => (
                  <a
                    key={i}
                    href={dev.url}
                    aria-label={`Read more about ${dev.title}`}
                    className="group card overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <Image 
                      src={dev.image} 
                      alt={dev.imageAlt || dev.title} 
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-6">
                      <h4 className="h3 text-deep group-hover:text-champagne transition-colors mb-2">{dev.title}</h4>
                      <p className="body text-ink-soft">{dev.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Articles */}
        {article.relatedArticles && (
          <section className="py-20">
            <div className="section">
              <div className="text-center mb-16">
                <h3 className="h2 text-deep mb-4">Related Articles</h3>
                <p className="body-large text-ink-soft max-w-2xl mx-auto">
                  Continue learning with these expert insights
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {article.relatedArticles.map((rel, i) => (
                  <a
                    key={i}
                    href={rel.url}
                    aria-label={`Read related article: ${rel.title}`}
                    className="group card p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="h3 text-deep group-hover:text-champagne transition-colors mb-3">{rel.title}</h4>
                    <p className="body text-ink-soft">{rel.description}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact CTA Again */}
        <section id="contact" className="py-20 bg-deep">
          <div className="section text-center">
            <h2 className="h2 text-white mb-6">Not Sure Where to Start?</h2>
            <p className="body-large text-white/90 mb-10 max-w-2xl mx-auto">
              Rachel can help you evaluate where to buy, what to avoid, and how to make the most of your investment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15612878966"
                aria-label="Call Rachel Now"
                className="btn-gold"
              >
                Call Rachel Now
              </a>
              <a
                href="https://calendly.com/rachel-realestate/consult"
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-white text-white hover:bg-white hover:text-deep focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Schedule a Free Call
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-50 bg-deep text-white text-center py-3 px-4 shadow md:hidden">
        <a
          href="tel:+15612878966"
          className="font-semibold underline focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Call Rachel Now from mobile footer CTA"
        >
          Call Rachel Now
        </a>
      </div>
    </>
  );
}