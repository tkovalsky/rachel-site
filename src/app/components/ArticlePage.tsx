import { Article } from '@/app/content/types';
import Image from 'next/image';
import { MarkdownContentService } from '@/lib/markdownContentService';

interface ArticlePageProps {
  article: Article;
}

export default function ArticlePage({ article }: ArticlePageProps) {
  // Extract first paragraph for hero quote
  const contentHtml = article.content;
  const firstParagraph = contentHtml.match(/<p[^>]*>([^<]+)<\/p>/)?.[1] || article.excerpt;
  
  return (
    <>
      <main className="min-h-screen bg-white" role="main">
        {/* Magazine Hero Section */}
        <section className="relative min-h-[80vh] bg-gradient-to-br from-deep via-deep/95 to-champagne/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          </div>
          
          <div className="relative z-10 container mx-auto px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
                
                {/* Left Column - Content */}
                <div className="text-white space-y-8">
                  {/* Story Type Badge */}
                  <div className="inline-flex items-center gap-2">
                    <div className="w-2 h-2 bg-champagne rounded-full"></div>
                    <span className="text-sm font-medium tracking-wider uppercase">
                      {article.storyType?.replace('-', ' ') || 'Success Story'}
                    </span>
                  </div>
                  
                  {/* Main Title */}
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-8">
                    {article.title}
                  </h1>
                  
                  {/* Author & Meta */}
                  <div className="flex flex-wrap items-center gap-6 body-large">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-champagne/20 rounded-full flex items-center justify-center">
                        <span className="text-champagne font-bold body-large">RK</span>
                      </div>
                      <div>
                        <div className="font-semibold body-large text-white">By {article.author}</div>
                        <div className="text-white/70 body">{new Date(article.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</div>
                      </div>
                    </div>
                    
                    {/* Reading Time */}
                    <div className="text-white/70 body">
                      {Math.ceil(article.content.split(' ').length / 200)} min read
                    </div>
                  </div>
                  
                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                        >
                          {tag.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Right Column - Hero Image */}
                <div className="relative">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={article.imageSrc || '/articles/wycliffe-success-story.jpg'}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Image Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-deep">
                      Success Story
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beautiful Landing Page Content */}
        <article className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Story Overview Cards */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {article.clientProfile && (
                  <div className="card p-8">
                    <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="h3 text-deep mb-4">Client Profile</h3>
                    <p className="body-large text-ink-soft mb-3">{article.clientProfile.ageRange} • {article.clientProfile.origin}</p>
                    <p className="body text-ink-lighter">{article.clientProfile.buyerType}</p>
                    {article.clientProfile.familyStructure && (
                      <p className="body-small text-ink-lighter mt-2">{article.clientProfile.familyStructure}</p>
                    )}
                  </div>
                )}
                
                {article.propertyDetails && (
                  <div className="card p-8">
                    <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 className="h3 text-deep mb-4">Property Details</h3>
                    <p className="body-large text-ink-soft mb-3">{article.propertyDetails.propertyType}</p>
                    <p className="body text-ink-lighter">{article.propertyDetails.priceRange}</p>
                    {article.propertyDetails.specialFeatures && (
                      <div className="mt-4">
                        <p className="body-small text-ink-lighter mb-2">Special Features:</p>
                        <ul className="space-y-1">
                          {article.propertyDetails.specialFeatures.slice(0, 3).map((feature, index) => (
                            <li key={index} className="body-small text-ink-lighter">• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="card p-8">
                  <div className="w-12 h-12 bg-champagne/20 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="h3 text-deep mb-4">Success Outcome</h3>
                  <p className="body-large text-ink-soft mb-3">Successful close</p>
                  <p className="body text-ink-lighter">Happy clients</p>
                  <div className="mt-4 p-4 bg-success/10 rounded-lg">
                    <p className="body-small text-success font-semibold">✓ Transaction completed successfully</p>
                  </div>
                </div>
              </div>
              
              {/* Main Story Content */}
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-2xl max-w-none">
                  <div 
                    className="article-content space-y-12"
                    dangerouslySetInnerHTML={{ 
                      __html: contentHtml
                          .replace(/<h2>/g, '<h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-deep mt-24 mb-12 border-b-2 border-divider pb-8" role="heading" aria-level="2">')
                          .replace(/<h3>/g, '<h3 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-deep mt-20 mb-10" role="heading" aria-level="3">')
                          .replace(/<p>/g, '<p class="text-2xl md:text-3xl lg:text-4xl text-ink leading-relaxed mb-10 max-w-4xl">')
                          .replace(/<blockquote>/g, '<blockquote class="border-l-6 border-champagne pl-10 my-20 italic text-3xl md:text-4xl lg:text-5xl text-ink-soft bg-surface-subtle py-12 rounded-r-2xl">')
                          .replace(/<ul>/g, '<ul class="space-y-8 my-16">')
                          .replace(/<li>/g, '<li class="flex items-start gap-6"><span class="w-6 h-6 bg-champagne rounded-full mt-4 flex-shrink-0"></span><span class="text-2xl md:text-3xl lg:text-4xl text-ink leading-relaxed">')
                        .replace(/<\/li>/g, '</span></li>')
                    }}
                  />
                </div>
              </div>
              
              {/* Key Highlights and Testimonial - Below Content */}
              <div className="grid md:grid-cols-2 gap-8 mt-16">
                {/* Key Highlights */}
                <div className="card p-8">
                  <h3 className="h3 text-deep mb-8">Key Highlights</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-champagne rounded-full mt-4 flex-shrink-0"></div>
                      <p className="body-large text-ink">Expert guidance throughout the process</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-champagne rounded-full mt-4 flex-shrink-0"></div>
                      <p className="body-large text-ink">Smooth transition from Northeast</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-champagne rounded-full mt-4 flex-shrink-0"></div>
                      <p className="body-large text-ink">Perfect community match</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 bg-champagne rounded-full mt-4 flex-shrink-0"></div>
                      <p className="body-large text-ink">Maintenance-free lifestyle</p>
                    </div>
                  </div>
                </div>
                
                {/* Client Quote */}
                {article.clientProfile && (
                  <div className="card p-8">
                    <div className="text-4xl text-champagne mb-4">"</div>
                    <blockquote className="lead italic text-ink leading-relaxed mb-6">
                      "Rachel didn't just help us find a house—she helped us find our family's Florida home."
                    </blockquote>
                    <cite className="block body font-semibold text-deep">
                      — {article.clientProfile.buyerType}
                    </cite>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Related Content Section */}
        <section className="py-20 bg-surface-subtle">
          <div className="section">
            <div className="max-w-6xl mx-auto">
              <h2 className="h2 text-deep mb-12 text-center">Related Content</h2>
              
              {/* Related Articles */}
              <div className="mb-12">
                <h3 className="h3 text-deep mb-8">More Success Stories</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(() => {
                    const allArticles = MarkdownContentService.getAllArticles();
                    const relatedArticles = allArticles
                      .filter(a => a.id !== article.id && 
                        (a.targetSegments.some(seg => article.targetSegments.includes(seg)) ||
                         a.areas.some(area => article.areas.includes(area))))
                      .slice(0, 3);
                    
                        return relatedArticles.map((relatedArticle) => (
                          <a
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
                          </a>
                        ));
                  })()}
                </div>
              </div>

              {/* Related Areas */}
              {article.areas && article.areas.length > 0 && (
                <div>
                  <h3 className="h3 text-deep mb-8">Explore Related Areas</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {article.areas.map((area) => (
                      <div
                        key={area}
                        className="card p-6 group hover:shadow-lg transition-all duration-300"
                      >
                        <h4 className="h3 text-deep mb-3 group-hover:text-champagne transition-colors">
                          {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </h4>
                        <p className="body text-ink-soft">
                          Discover properties and communities in this beautiful area
                        </p>
                        <a 
                          href={`/areas/${area}`}
                          className="inline-flex items-center gap-2 text-champagne hover:text-champagne-dark font-semibold body mt-4"
                        >
                          Explore Area
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

            {/* Enhanced CTA Section - Single, More Impactful */}
            <section className="py-12 bg-gradient-to-br from-slate-900 to-black text-white">
          <div className="section">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="h1 text-white mb-8">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-3xl md:text-4xl lg:text-5xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Let Rachel help you find your perfect home in South Florida.
                {article.clientProfile?.buyerType && ` Whether you're a ${article.clientProfile.buyerType.toLowerCase()}, `}
                Rachel's expertise makes the difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <a
                  href="tel:+15612878966"
                  className="bg-deep text-white border-2 border-deep hover:bg-transparent hover:border-champagne hover:text-champagne hover:shadow-lg hover:shadow-champagne/25 px-8 py-4 text-xl rounded-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call (561) 287-8966
                  </div>
                </a>
                
                <a
                  href="mailto:hi@racheldelray.com"
                  className="btn-ghost border-2 border-white text-white hover:bg-white hover:text-deep px-8 py-4 text-xl"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white">Email Rachel</span>
                  </div>
                </a>
              </div>
              
              {/* Trust Indicators */}
              <div className="pt-8 border-t border-white/20">
                <div className="flex flex-wrap justify-center items-center gap-8 body-large text-white/80">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Licensed Realtor®
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-champagne" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    South Florida Expert
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Compass Florida
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
